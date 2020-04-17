var assert = require('chai').assert;
import startWhatsapp from '../../index.js'

describe('Open Whatsapp', async function() {
    this.timeout(50000); 
    global.Test = "Test_";
    startWhatsapp()
    
});