var assert = require('chai').assert;
import getMessagesFromStaffTracker from '../../staffTracker/index.js'
import messagetracker from 'messagetracker'
import TestData from './TestData.js'


describe('Get Messages from Staff Tracker', async function() {
    this.timeout(50000);

    global.test = "Test_"
    it('get messages', async function() {
        let messageTrackerData = await messagetracker.getMessageTrackerData('Old #');
        
        let messages = await getMessagesFromStaffTracker(messageTrackerData);

        let testMessages = []
        for(let messageIndex in messages){
            let message = messages[messageIndex];
            if(message['searchName'].includes('Test'))
                testMessages.push(message);
        }

        console.log(testMessages)

    });
});