var assert = require('chai').assert;
import getMessagesFromCalendly from '../../calendly/index.js'
import messagetracker from 'messagetracker'
import TestData from './TestData.js'


describe('Get Messages from Calendly', async function() {
    this.timeout(50000);

    it('get messages', async function() {
        let messageTrackerData = await messagetracker.getMessageTrackerData('Old #');
        let messages = await getMessagesFromCalendly(messageTrackerData);

        let testMessages = [];
        for(let messageIndex in messages){
            let message = messages[messageIndex];
            if(message['searchName'].includes('Test'))
                testMessages.push(message);
        }

        console.log(testMessages);


    });
});