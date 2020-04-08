var assert = require('chai').assert;
import api from '../../api.js';
import TestData from './TestData.js'
import googleSheets from '../../../Google-Sheets/prod/api.js'

let INTERNAL_TOKEN = 'hldv5rft1d60szrdox1ryvf';

describe('Update Message Tracker Main Sheet', async function() {
    this.timeout(50000);

    for(let testIndex in TestData){
        let testCase = TestData[testIndex].TestCases;
        
        it('update message tracker Test Case: ' + testIndex.toString(), async function() {
            let date = new Date();
            api.updateMessageTracker(testCase, date);

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
        let confirmData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN, '!B' + row + ':F' + row);
        
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