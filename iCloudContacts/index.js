import Page from "./page.js";
import signIn from "./signIn/signIn.js";
import contacts from "./contacts/contacts.js";
import googleSheets from "../GoogleSheets/prod/api.js";
import convertSheetDatatoDict from "./utils/convertSheetDatatoDict.js";
import selectors from "./configuration/selectors.js";

const INTERNAL_TOKEN = "";
async function start() {
  let messageQueueData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN);

  let columns = {
    "Old #": -1,
    Name: -1,
    "Message Type": -1,
    Phone: -1,
    Sent: -1,
    "Added to iCloud": -1,
  };
  messageQueueData = await convertSheetDatatoDict(messageQueueData, columns);

  let caregiverstoAdd = messageQueueNotAdded(messageQueueData);
  console.log(caregiverstoAdd);
  if (caregiverstoAdd.length > 0) {
    let page = await new Page();
    try {
      await page.visit("https://www.icloud.com/contacts");
      await signIn(page);
      await page.switchToFrame("contacts");
      let el = await page.findByCssSelector(selectors.contactList, 50000);
      console.log("1", el);

      caregiverstoAdd = await getCaregiversToAdd(page, caregiverstoAdd);

      if (caregiverstoAdd.length > 0) {
        await contacts.getvCards(caregiverstoAdd);
        await contacts.importContacts(page);
      }
    } catch (error) {
      if (error.code === "ENOENT") {
      }
      console.log("HIII iCloud start", error);
      page.driver.quit();
    }
    page.driver.quit();
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));

  process.exit();
}

start();

function messageQueueNotAdded(messageQueueData) {
  let caregiverstoAdd = [];
  for (let messageIndex in messageQueueData) {
    let message = messageQueueData[messageIndex];
    if (!message["Added to iCloud"].includes("Added")) {
      message["Row"] = (parseInt(messageIndex) + 1).toString();
      caregiverstoAdd.push(message);
    }
  }

  return caregiverstoAdd;
}
async function getCaregiversToAdd(page, caregivers) {
  //console.log(messagesToSend)
  let caregiverstoAdd = [];
  try {
    for (let caregiverIndex in caregivers) {
      let message = caregivers[caregiverIndex];

      if (!message["Added to iCloud"].includes("Added")) {
        try {
          let exists = await contacts.checkIfContactExists(page, message);
          console.log(message["Name"], exists);
          if (!exists) {
            caregiverstoAdd.push(message);
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.log(error);
          console.log("HIII getCaregiversToAdd");
        }
      }
    }
    await updateMessageQueue(caregivers);
  } catch (error) {
    console.log("HIII getCaregiversToAdd");
  }

  return caregiverstoAdd;
}

async function updateMessageQueue(messageQueueData) {
  let sheetData = [];

  for (let messageIndex in messageQueueData) {
    let message = messageQueueData[messageIndex];
    if (message["Row"]) {
      let data_row = {
        range: "Message Queue!G" + message["Row"],
        values: [["Added"]],
      };
      console.log(data_row);
      sheetData.push(data_row);
    }
  }
  await googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData);
}
