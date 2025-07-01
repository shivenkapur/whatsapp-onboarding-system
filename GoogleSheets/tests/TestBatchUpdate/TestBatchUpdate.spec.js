var assert = require("chai").assert;
import sheets from "../../sheets-config.js";
import api from "../../api.js";
import TestData from "./TestData.js";
import { date } from "./TestData.js";
//internal_files

describe("Batch Data to Google Sheet", async function () {
  this.timeout(50000);

  for (let sheetIndex in sheets) {
    let sheet = sheets[sheetIndex];

    it(
      "batch update Data to " + sheet.SHEET_IDENTIFIER + " " + sheet.SHEET_NAME,
      async function () {
        if (Object.keys(TestData).includes(sheetIndex)) {
          let sheetData = await api.batchUpdateGoogleSheet(
            sheetIndex,
            TestData[sheetIndex].TestCases
          );

          if (TestData[sheetIndex].Assert) {
            let testCases = TestData[sheetIndex].TestCases;
            for (let testCaseIndex in testCases) {
              let testCase = testCases[testCaseIndex];
              let confirmData = await api.getGoogleSheetData(
                sheetIndex,
                "!" + testCase.range.split("!")[1]
              );

              let result = await validate(confirmData);
              assert.isOk(result);
            }
          } else assert.isNotOk(sheetData);
        }
      }
    );
  }
});

function validate(sheetData) {
  for (let rowIndex in sheetData) {
    let row = sheetData[rowIndex];
    console.log(row[0], date);
    if (new Date(row[0]) - date != 0) return false;
  }
  return true;
}
