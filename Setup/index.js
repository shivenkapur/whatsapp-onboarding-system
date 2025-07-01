//if HKID or CERT is 0 then everything can be empty
//if HKID and CERT are 1 and caledly booked then schedule Interview and welcome Message are sent
//if all of the above and date of interview < today then video call sent
//if on boarded then all sent

import getStaffTrackerData from "./getStaffTrackerData.js";
import getCalendlyData from "./getCalendlyData.js";
import messagetracker from "messagetracker";

export default async function start() {
  let date = new Date();

  let staffTrackerData = await getStaffTrackerData("Old #");
  let calendlyData = await getCalendlyData("Staff");

  let messages = [];
  for (let staffTrackerCaregiverIndex in staffTrackerData) {
    let staffTrackerCaregiver = staffTrackerData[staffTrackerCaregiverIndex];

    if (staffTrackerCaregiver["Status"] == "Onboarded") {
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "welcomeMessage",
      });
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "scheduleInterview",
      });
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "videoCallReminder",
      });

      let today = new Date();
      let dateOfOnboarding = new Date(staffTrackerCaregiver["Date"]);

      if (today - dateOfOnboarding >= 1000 * 3600 * 24 * 1)
        messages.push({
          "Old #": staffTrackerCaregiver["Old #"],
          messageType: "nextSteps",
        });
    } else if (staffTrackerCaregiver["Status"] != "Not Onboarded") {
      //Do Something in the future
    } else if (
      staffTrackerCaregiver["HKID"] == 1 &&
      staffTrackerCaregiver["Cert"] == 1 &&
      calendlyData[staffTrackerCaregiver["Old #"]]
    ) {
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "welcomeMessage",
      });
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "scheduleInterview",
      });

      let scheduledDate = new Date(
        calendlyData[staffTrackerCaregiver["Old #"]]["Scheduled Date"]
      );
      let today = new Date();

      if (scheduledDate.getTime() < today.getTime()) {
        messages.push({
          "Old #": staffTrackerCaregiver["Old #"],
          messageType: "videoCallReminder",
        });
      }
    } else if (
      staffTrackerCaregiver["HKID"] == 1 &&
      staffTrackerCaregiver["Cert"] == 1
    ) {
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "welcomeMessage",
      });
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "scheduleInterview",
      });
    } else {
      messages.push({
        "Old #": staffTrackerCaregiver["Old #"],
        messageType: "welcomeMessage",
      });
    }
  }
  console.log(messages);
  await messagetracker.updateMessageTracker(messages, date);
}
global.test = "";
start();
