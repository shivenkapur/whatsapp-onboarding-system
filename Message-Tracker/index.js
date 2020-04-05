import calendly from './calendly/index.js'
import staffTracker from './staffTracker/index.js'
import getCaregiversAfterDate from './utils/getCaregiversAfterDate.js'
import messageTracker from './messageTracker/index.js'

import updateMainMessageTracker from '../messageTracker/updateMessageTracker.js'
import batchUpdateCalendly from '../calendly/batchUpdateCalendly.js'
import updateMessageQueue from '../messageQueue/updateMessageQueue.js'

let caregiversAfterDate = new Date(2020, 0, 1) //Year, Month, date

/*
 Gets data from the Staff Tracker Google Sheet and uses that to find out which
 messages to send to caregivers. 

 The Calendly sheet is used to see if a video call has been booked
 The Message Tracker Sheet is used to keep track of messages to send out
*/
async function start(){

    console.log('Getting Staff Tracker Data ...')
    let staffTrackerCaregivers = await staffTracker();

    //get caregivers after a specific date
    let caregiversRegisteredThisYear = await getCaregiversAfterDate(staffTrackerCaregivers, caregiversAfterDate)

    console.log('Getting Calendly Data ...')
    //getting messages from calendly data
    let videoCallReminderMessage = await calendly(caregiversRegisteredThisYear);

    //getting messages from staff tracker
    let allOtherMessages = await messageTracker(caregiversRegisteredThisYear)
    
    let messagesToSend = await getMessagesfromData(allOtherMessages, videoCallReminderMessage);

    updateSheets(messagesToSend)
    console.log("Messages to Send: ", messagesToSend)

}

start();

async function getMessagesfromData(allOtherMessages, videoCallReminderMessage){
    
    let messagesToSend = {};

    let calendlyData = await getCalendlyData();
    
    for(let messageIndex in allOtherMessages){
        let caregiverMessage = allOtherMessages[messageIndex];
        
        //if a video call has been scheduled don't send a phoneInterview message
        if(calendlyData[caregiverMessage['Old #']] != undefined)
            continue
        let searchName = getSearchName(caregiverMessage)

        let messageSender = {'Old #': caregiverMessage['Old #'], 
        'searchName': searchName, 'messageType': caregiverMessage['Message Type'], 'Phone': caregiverMessage['Phone'] }

        messagesToSend[caregiverMessage['Old #']] = messageSender;
    }

    for(let messageIndex in videoCallReminderMessage){
        let caregiverMessage = videoCallReminderMessage[messageIndex];
        let searchName = getSearchName(caregiverMessage);
        let messageSender = {'Old #': caregiverMessage['Old #'], 
        'searchName': searchName, 'messageType': 'videoCallReminder', 'Phone': caregiverMessage['Phone'], 'Row':  caregiverMessage['Row']}
        messagesToSend[caregiverMessage['Old #']] = messageSender;
    }

    return messagesToSend
}



async function updateSheets(messages){
    let date = new Date();
    updateMainMessageTracker(messages, date);
    batchUpdateCalendly(messages, date);
    updateMessageQueue(messages, date);
}

function getSearchName(caregiver){
    let searchName = caregiver['Old #'] + ' , ' + caregiver['Chi Name'] + ' ' + caregiver['Eng Name']
    if(caregiver['EC Rank'] == caregiver['Actual Rank'])
        searchName += ' ' + '(' + caregiver['EC Rank'] + ')';
    else{
        searchName +=' ' + caregiver['EC Rank'] + '(' + caregiver['Actual Rank'] + ')';
    }

    return searchName
}
