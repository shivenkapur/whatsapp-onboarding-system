import getCalendlyData from '../calendly/getCalendlyData.js'
export default async function getMessagesfromCaregivers(allOtherMessages, videoCallReminderMessage){
    
    let messagesToSend = {};

    let calendlyData = await getCalendlyData();
    let getCalendlyDict = calendlyToDict(calendlyData)
    
    for(let messageIndex in allOtherMessages){
        let caregiverMessage = allOtherMessages[messageIndex];
        if(caregiverMessage['Message Type'] == 'scheduleInterview' && getCalendlyDict[caregiverMessage['Old #']] != undefined)
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

function getSearchName(caregiver){
    let searchName = caregiver['Old #'] + ' , ' + caregiver['Chi Name'] + ' ' + caregiver['Eng Name']
    if(caregiver['EC Rank'] == caregiver['Actual Rank'])
        searchName += ' ' + '(' + caregiver['EC Rank'] + ')';
    else{
        searchName +=' ' + caregiver['EC Rank'] + '(' + caregiver['Actual Rank'] + ')';
    }

    return searchName
}

function calendlyToDict(calendlyData){
    let return_dict = {};
    for(let dataIndex in calendlyData){
        let data = calendlyData[dataIndex];
        return_dict[data['Staff']] = data;
    }

    return return_dict;
}