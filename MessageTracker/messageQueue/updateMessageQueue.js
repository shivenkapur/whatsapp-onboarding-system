import googleSheets from "googlesheets";
import convertSheetDatatoDict from "../utils/convertSheetDatatoDict.js";
import cellData from "../utils/cellData.js";

const INTERNAL_TOKEN = "";
const MAX_REMINDERS = 3;

export default async function updateMessageQueue(newMessages, messagePriority) {
  let messageQueueData = await googleSheets.getGoogleSheetData(
    INTERNAL_TOKEN,
    "",
    global.test
  );
  let columns = {
    "Old #": -1,
    Name: -1,
    "Message Type": -1,
    Phone: -1,
    Sent: -1,
    "Reminder Number": -1,
  };

  messageQueueData = await convertSheetDatatoDict(messageQueueData, columns);

  let batchUpdate = {};
  let append = {};

  for (let newMessageIndex in newMessages) {
    let newMessage = newMessages[newMessageIndex];

    let found = false;

    if (
      !Object.keys(batchUpdate).includes(newMessage["Old #"]) ||
      messagePriority[newMessage["messageType"]] >
        messagePriority[batchUpdate[newMessage["Old #"]]["messageType"]]
    ) {
      for (let messageQueueIndex in messageQueueData) {
        let messageQueueRow = messageQueueData[messageQueueIndex];

        if (messageQueueRow["Old #"] == newMessage["Old #"]) {
          newMessage["Row"] = (parseInt(messageQueueIndex) + 1).toString();
          newMessage["Message Type from MQ"] = messageQueueRow["Message Type"];
          newMessage["Reminder Number"] = messageQueueRow["Reminder Number"];
          batchUpdate[newMessage["Old #"]] = newMessage;
          found = true;
        }
      }

      if (
        !found &&
        (!Object.keys(append).includes(newMessage["Old #"]) ||
          messagePriority[newMessage["messageType"]] >
            messagePriority[append[newMessage["Old #"]]["messageType"]])
      )
        append[newMessage["Old #"]] = newMessage;
    }
  }

  await batchUpdateSheet(batchUpdate);
  await appendSheet(append);

  return [batchUpdate, append];
}

async function batchUpdateSheet(batchUpdate) {
  let sheetData = [];
  for (let mesageIndex in batchUpdate) {
    let message = batchUpdate[mesageIndex];

    let reminderNumber = message["Reminder Number"];

    let update = true;
    if (cellData.hasNoData(message["Reminder Number"])) reminderNumber = 1;
    else if (message["messageType"] != message["Message Type from MQ"])
      reminderNumber = 1;
    else if (parseInt(message["Reminder Number"]) < MAX_REMINDERS)
      reminderNumber = (parseInt(message["Reminder Number"]) + 1).toString();
    else update = false;

    if (update) {
      sheetData.push({
        range: global.test + "Message Queue!E" + message["Row"],
        values: [[""]],
      });
      sheetData.push({
        range: global.test + "Message Queue!C" + message["Row"],
        values: [[message["messageType"]]],
      });
      sheetData.push({
        range: global.test + "Message Queue!F" + message["Row"],
        values: [[reminderNumber]],
      });
    }
  }

  await googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData);
}

async function appendSheet(append) {
  let sheetData = [];
  console.log(append);
  for (let mesageIndex in append) {
    console.log(mesageIndex);
    let message = append[mesageIndex];

    sheetData.push([
      message["Old #"],
      message["searchName"],
      message["messageType"],
      message["Phone"],
      "",
      "1",
    ]);
  }

  console.log(sheetData);
  await googleSheets.appendGoogleSheet(INTERNAL_TOKEN, sheetData, global.test);
}
