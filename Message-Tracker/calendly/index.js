import getCalendlyData from './getCalendlyData.js'
export default async function start(staffTrackerCaregivers){
    let calendlyCaregivers = await getCalendlyData();


    let caregiversToSendMessage = [];
    for(let caregiverIndex = 1; caregiverIndex < calendlyCaregivers.length;caregiverIndex++){
        let caregiver = calendlyCaregivers[caregiverIndex];
        let scheduledData = new Date(caregiver['Scheduled Date']);
        scheduledData.setHours(0,0,0,0);
        let today = new Date();
        today.setHours(0,0,0,0);
        
        let staffNumber = caregiver['Staff']
        if(scheduledData.getTime() >= today.getTime() && 
            staffTrackerCaregivers[staffNumber] != undefined){

            let staffTrackerCaregiver = staffTrackerCaregivers[staffNumber]

            if(hasData(staffNumber) && 
                hasData(caregiver['Potential CG']) &&
                hasNoData(caregiver['Sent to MQ']) && 
                staffTrackerCaregiver['Status'] == 'Not Onboarded')
            
            {  
                staffTrackerCaregiver['Row'] = (parseInt(caregiverIndex) + 1).toString()
                caregiversToSendMessage.push(staffTrackerCaregiver)
                //calendlyUpdate.push({'Row' : (parseInt(potentialCaregiverIndex) + 1).toString(), 'Time': new Date()})
            }
        }
    }

    return caregiversToSendMessage;
}

function hasData(dataPoint){
    if(dataPoint != '' && dataPoint != 'undefined' && dataPoint != undefined && dataPoint != '#N/A')
        return true
    return false
}

function hasNoData(dataPoint){
    if(dataPoint == '' || dataPoint == 'undefined' || dataPoint == undefined || dataPoint == '#N/A')
        return true
    return false
}