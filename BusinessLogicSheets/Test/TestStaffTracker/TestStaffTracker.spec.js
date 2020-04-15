var assert = require('chai').assert;
import getMessagesFromStaffTracker from '../../staffTracker/index.js'
import TestData from './TestData.js'


describe('Get Messages from Staff Tracker', async function() {
    this.timeout(50000);

    it('get messages', async function() {
        let messages = await getMessagesFromStaffTracker();

        let testMessages = []
        for(let messageIndex in messages){
            let message = messages[messageIndex];
            if(message['searchName'].includes('Test'))
                testMessages.push(message);
        }

        console.log(testMessages)

    });
});