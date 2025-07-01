import messageTrackerValidation from "./messageTrackerValidation.js";

export default async function getMessageType(
  caregiver,
  messageTrackerCaregiver
) {
  let messageType = "";

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let dateOfOnboarding = new Date(caregiver["Date"]);
  dateOfOnboarding.setHours(0, 0, 0, 0);

  if (
    caregiver["Status"] == "Onboarded" &&
    today - dateOfOnboarding <= 1000 * 3600 * 24 * 3
  ) {
    messageType = "nextSteps";
  } else if (
    caregiver["Status"] == "Not Onboarded" &&
    caregiver["HKID"] == 1 &&
    caregiver["Cert"] == 1
  ) {
    messageType = "scheduleInterview";
  } else if (
    caregiver["Status"] == "Not Onboarded" &&
    (caregiver["HKID"] == 0 || caregiver["Cert"] != 1)
  ) {
    messageType = "welcomeMessage";
  } else {
    return false;
  }

  let valid = await messageTrackerValidation(
    messageType,
    messageTrackerCaregiver
  );

  if (valid) return messageType;
  else return false;
}
