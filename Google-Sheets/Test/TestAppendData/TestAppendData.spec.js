var assert = require('chai').assert;
import sheets from '../../config/sheets-config.js'
import api from '../../api.js';
import TestData from './TestData.js'
//internal_files

describe('Append Data to Google Sheet', async function() {
    this.timeout(50000);

    for(let sheetIndex in sheets){
        let sheet = sheets[sheetIndex];

        it('append Data to ' + sheet.SHEET_IDENTIFIER + ' ' + sheet.SHEET_NAME, async function() {

            if(Object.keys(TestData).includes(sheetIndex))
            {
                let sheetData = await api.appendGoogleSheet(sheetIndex, TestData[sheetIndex].TestCases)

                if(TestData[sheetIndex].Assert)
                    assert.isOk(sheetData)
                else
                    assert.isNotOk(sheetData)
            } else {

            } 
            
        })
        
    }
});