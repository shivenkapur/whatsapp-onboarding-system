import calendly from './calendly/index.js'
import staffTracker from './staffTracker/index.js'
import getCaregivers from './utils/getCaregivers.js'
import messagetracker from 'messagetracker'
import messagePriority from './messagePriority.js'
let caregiversAfterDate = new Date(2020, 0, 1) //Year, Month, date

/*
 Gets data from the Staff Tracker Google Sheet and uses that to find out which
 messages to send to caregivers. 

 The Calendly sheet is used to see if a video call has been booked
 The Message Tracker Sheet is used to keep track of messages to send out
*/
export default async function start(){

    
    let date = new Date();
    
    let messageTrackerData = await messagetracker.getMessageTrackerData('Old #');
    console.log('Getting Staff Tracker Data ...')
    let staffTrackerMessages = await staffTracker(messageTrackerData);

    console.log('Getting Calendly Data ...')
    let calendlyMessages = await calendly(messageTrackerData);

    if(global.test){
        staffTrackerMessages = staffTrackerMessages.filter(message => {return message['searchName'].includes('Test')});
        calendlyMessages = calendlyMessages.filter(message => {return message['searchName'].includes('Test')});
    }
        
    await messagetracker.updateMessageTracker(staffTrackerMessages, date);
    await messagetracker.updateMessageTracker(calendlyMessages, date);

    let messages = staffTrackerMessages.concat(calendlyMessages)
    let ret = await messagetracker.updateMessageQueue(messages, messagePriority);
    return ret
    
}
global.test = ""
start()
