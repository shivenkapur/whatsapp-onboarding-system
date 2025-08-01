import googleSheets from "googlesheets";
import convertSheetDatatoDict from "./utils/convertSheetDatatoDict.js";
let INTERNAL_TOKEN = "";

export default async function getCalendlyData() {
  let calendlyData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN);
  let columns = {
    "Potential CG": -1,
    "Sent to MQ": -1,
    Staff: -1,
    "Scheduled Date": -1,
    "True Phone": -1,
  };

  calendlyData = await convertSheetDatatoDict(calendlyData, columns, "Staff");
  return calendlyData;
}
