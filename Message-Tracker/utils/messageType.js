import cellData from './cellData.js'
export default function getMessageType(caregiver, messageTrackerCaregiver){
        let messageType = "";

        let today = new Date();
        today.setHours(0,0,0,0);
        let dateOfOnboarding = new Date(caregiver['Date']);
        dateOfOnboarding.setHours(0,0,0,0);

        if(caregiver['Status'] == 'Onboarded' && (today - dateOfOnboarding) <= 1000*3600*24*3){
            messageType = 'nextSteps'
        }
        else if(caregiver['Status'] == 'Not Onboarded' && caregiver['HKID'] == 1 && caregiver['Cert'] == 1)
        {
            messageType = 'scheduleInterview'
        }
        else if(caregiver['Status'] == 'Not Onboarded' && (caregiver['HKID'] == 0 || caregiver['Cert'] != 1)){
            messageType = 'welcomeMessage'
        }
        else{
            return false
        }

        let valid = validateMessage(messageType, messageTrackerCaregiver);

        if(valid)
            return messageType;
        else
            return false;
    }

function validateMessage(messageType, messageTrackerCaregiver){

    switch(messageType){
        case 'nextSteps':
            if(cellData.hasNoData(messageTrackerCaregiver['Sent Next Steps to MQ'])){
                return true;
            }
            return false;
        case 'scheduleInterview':
            
            if(cellData.hasNoData(messageTrackerCaregiver['Sent Schedule Interview Message to MQ'])){
                return true;
            }
            else{
                let today = new Date();
                let lastMessageDate = new Date(messageTrackerCaregiver['Sent Schedule Interview Message to MQ']);

                if( (today - lastMessageDate) > 1000*3600*24*3 )
                    return true;
            }
            return false;
        case 'welcomeMessage':
            if(cellData.hasNoData(messageTrackerCaregiver['Sent HKID Message to MQ'])){
                return true;
            }
            else{
                let today = new Date();
                let lastMessageDate = new Date(messageTrackerCaregiver['Sent HKID Message to MQ']);
                
                if( (today - lastMessageDate) > 1000*3600*24*3 )
                    return true;
            }
            return false;
    }
}
