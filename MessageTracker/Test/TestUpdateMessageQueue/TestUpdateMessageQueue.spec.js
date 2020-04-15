var assert = require('chai').assert;
import api from '../../api.js';
import TestData from './TestData.js'
import googleSheets from '../../../Google-Sheets/prod/api.js'

let INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';

describe('Update Message Queue Sheet', async function() {
    this.timeout(50000);

    for(let testIndex in TestData){
        let testCase = TestData[testIndex].TestCases;
        
        it('update message queue Test Case: ' + testIndex.toString(), async function() {
            let date = new Date();
            api.updateMessageQueue(testCase, date, "Test_");

            await new Promise(resolve => setTimeout(resolve, 1000));
            let result = await validate(testCase, date);

            if(TestData[testIndex].Assert)
                assert.isOk(result);
            else
                assert.isNotOk(result);
        });
    }
    
});

async function validate (testCase, date) {

    for(let testCaseIndex in testCase){
        let test = testCase[testCaseIndex];
        let row = (parseInt(test['Old #']) + 1).toString();
        let confirmData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN, '!B' + row + ':F' + row, test = "Test_");
        
        if(!confirmData)
            return false

        confirmData.forEach(row => {
            row = row.filter((rowElement) => rowElement != '')

            console.log(row, date)
            if(new Date(row[0]) - date != 0)
                return false
        })
    }

    return true
}