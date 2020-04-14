import getCalendlyData from './getCalendlyData.js'
import cellData from './cellData.js'
export default async function start(staffTrackerCaregivers){
    let calendlyCaregivers = await getCalendlyData();


    let caregiversToSendMessage = [];
    for(let caregiverIndex = 1; caregiverIndex < calendlyCaregivers.length;caregiverIndex++){
        let calendlyCaregiver = calendlyCaregivers[caregiverIndex];
        let scheduledData = new Date(caregiver['Scheduled Date']);
        scheduledData.setHours(0,0,0,0);
        let today = new Date();
        today.setHours(0,0,0,0);
        
        let staffNumber = calendlyCaregiver['Staff']
        if(scheduledData.getTime() >= today.getTime() && 
            staffTrackerCaregivers[staffNumber] != undefined){

            let staffTrackerCaregiver = staffTrackerCaregivers[staffNumber]

            if(cellData.hasData(staffNumber) && 
            cellData.hasData(calendlyCaregiver['Potential CG']) &&
            cellData.hasNoData(calendlyCaregiver['Sent to MQ']) && 
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