import cellData from '../../utils/cellData.js'
import getSearchName from '../../utils/getSearchName.js'

export default async function getMessages(calendlyCaregivers, staffTrackerCaregivers, messageTrackerData){
    
    let caregivers = await caregiverstoSendMessages(calendlyCaregivers, staffTrackerCaregivers, messageTrackerData);

    let messagesToSend = await getMessagesFromCaregivers(caregivers);

    return messagesToSend
}

async function caregiverstoSendMessages(calendlyCaregivers, staffTrackerCaregivers, messageTrackerData){

    let caregivers = [];
    let row = 1;

    for(let caregiverIndex in calendlyCaregivers){
        let calendlyCaregiver = calendlyCaregivers[caregiverIndex];

        let scheduledData = new Date(calendlyCaregiver['Scheduled Date']); scheduledData.setHours(0,0,0,0);

        let today = new Date(); today.setHours(0,0,0,0);
        
        let staffNumber = calendlyCaregiver['Staff'];

        if(scheduledData.getTime() >= today.getTime() && 
            staffTrackerCaregivers[staffNumber] != undefined){

            let staffTrackerCaregiver = staffTrackerCaregivers[staffNumber]

            if(cellData.hasData(staffNumber) && 
            cellData.hasData(calendlyCaregiver['Potential CG']) &&
            cellData.hasNoData(messageTrackerData[calendlyCaregiver['Staff']]['Sent Video Call Reminder Message to MQ']) && 
                staffTrackerCaregiver['Status'] == 'Not Onboarded')
            {  
                staffTrackerCaregiver['Row'] = row.toString()
                caregivers.push(staffTrackerCaregiver)
            }
        }

        row++;
    }
    console.log(caregivers)
    return caregivers;
}

async function getMessagesFromCaregivers(staffTrackerCaregivers){

    let messages = []
    for(let staffTrackerCaregiverIndex in staffTrackerCaregivers){
        let staffTrackerCaregiver = staffTrackerCaregivers[staffTrackerCaregiverIndex];

        let searchName = getSearchName(staffTrackerCaregiver);
        
        let messageSender = {'Old #': staffTrackerCaregiver['Old #'], 
        'searchName': searchName, 'messageType': 'videoCallReminder', 'Phone': staffTrackerCaregiver['Phone'] }

        messages.push(messageSender);
    }

    return messages;
}



