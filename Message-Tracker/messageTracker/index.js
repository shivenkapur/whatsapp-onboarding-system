import getMessageTrackerData from './getMessageTrackerData.js';
import messageType from '../utils/messageType.js'

export default async function start(caregiversRegisteredThisYear){

    let messageTrackerData = await getMessageTrackerData();

    let caregiverstoSendMessages = []
    for(let caregiverIndex in caregiversRegisteredThisYear)
    {
        let caregiver = caregiversRegisteredThisYear[caregiverIndex]
        let messageTrackerCaregiver = messageTrackerData[caregiver['Old #']]
        let type = messageType(caregiver, messageTrackerCaregiver)
        console.log(type, caregiver['Old #'])
        if(type){
            caregiver['Message Type'] = type;
            caregiverstoSendMessages.push(caregiver)
            //messageTrackerUpdate.push({'Row' : (parseInt(caregiver['Old #']) + 1).toString(), 'Time': new Date(), 'messageType': type})
        }
    }
    
    return caregiverstoSendMessages;
}