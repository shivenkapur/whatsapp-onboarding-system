var assert = require('chai').assert;
import getMessagesFromCalendly from '../../calendly/index.js'
import TestData from './TestData.js'


describe('Get Messages from Calendly', async function() {
    this.timeout(50000);

    it('get messages', async function() {
        let messages = await getMessagesFromCalendly();

        let testMessages = []
        for(let messageIndex in messages){
            let message = messages[messageIndex];
            if(message['searchName'].includes('Test'))
                testMessages.push(message);
        }


    });
});