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

        let scheduledTime = new Date(calendlyCaregiver['Scheduled Date'] + ' '
        + calendlyCaregiver['Scheduled Time']); 

        let today = new Date(); 
        
        let staffNumber = calendlyCaregiver['Staff'];

        if(scheduledTime.getTime() >= today.getTime() && 
            staffTrackerCaregivers[staffNumber] != undefined){

            let staffTrackerCaregiver = staffTrackerCaregivers[staffNumber]

            staffTrackerCaregiver['Row'] = row.toString();
            if(cellData.hasData(staffNumber) && 
            cellData.hasData(calendlyCaregiver['Potential CG']) && 
                staffTrackerCaregiver['Status'] == 'Not Onboarded')
            {  
                if(cellData.hasNoData(messageTrackerData[calendlyCaregiver['Staff']]['Sent Video Call Reminder Message to MQ'])){
                    
                    staffTrackerCaregiver['Message Type'] = 'videoCallReminder';
                    caregivers.push(staffTrackerCaregiver);
                } else if(cellData.hasNoData(messageTrackerData[calendlyCaregiver['Staff']]['Sent 1 hour Before Video Call Reminder Message'])
                        && (scheduledTime - today) <= 2*60*60*1000){
                    staffTrackerCaregiver['Message Type'] = '10MinutesVideoCallReminder';
                    caregivers.push(staffTrackerCaregiver);
                }
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
        'searchName': searchName, 'messageType': staffTrackerCaregiver['Message Type'], 'Phone': staffTrackerCaregiver['Phone'] }

        messages.push(messageSender);
    }

    return messages;
}



