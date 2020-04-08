import getMessageType from './getMessageType.js'
import getSearchName from '../../utils/getSearchName.js'

export default async function getMessages(caregiversRegisteredThisYear, messageTrackerData){

    let caregivers = await caregiverstoSendMessages(caregiversRegisteredThisYear, messageTrackerData)
    //console.log(caregivers.length)
    let messagesToSend = await getMessagesFromCaregivers(caregivers);

    //console.log(messagesToSend.length)
    return messagesToSend;
}

async function caregiverstoSendMessages(caregiversRegisteredThisYear, messageTrackerData){

    let caregivers = []

    for(let caregiverIndex in caregiversRegisteredThisYear)
    {
        let caregiver = caregiversRegisteredThisYear[caregiverIndex]

        let messageTrackerCaregiver = messageTrackerData[caregiver['Old #']]

        let type = await getMessageType(caregiver, messageTrackerCaregiver)
        if(type){
            caregiver['Message Type'] = type;
            caregivers.push(caregiver)
        }
    }

    return caregivers;
}

async function getMessagesFromCaregivers(caregivers){

    let messages = []
    for(let caregiverIndex in caregivers){
        let caregiver = caregivers[caregiverIndex];
        
        //if a video call has been scheduled don't send a phoneInterview message
        //if(calendlyData[caregiver['Old #']] != undefined)
        //    continue
        let searchName = getSearchName(caregiver)

        let messageSender = {'Old #': caregiver['Old #'], 
        'searchName': searchName, 'messageType': caregiver['Message Type'], 'Phone': caregiver['Phone'] }

        messages.push(messageSender);
    }

    return messages;
}



