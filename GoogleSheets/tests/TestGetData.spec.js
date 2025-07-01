var assert = require("chai").assert;
import sheets from "../sheets-config.js";
import api from "../api.js";

//internal_files

describe("Get Data from Google Sheet", async function () {
  this.timeout(50000);

  for (let sheetIndex in sheets) {
    let sheet = sheets[sheetIndex];

    it(
      "get Data from " + sheet.SHEET_IDENTIFIER + " " + sheet.SHEET_NAME,
      async function () {
        let sheetData = await api.getGoogleSheetData(sheetIndex);

        console.log(sheetData.length, "");
        assert.isOk(sheetData.length);
      }
    );
  }
});
