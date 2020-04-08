import cellData from '../../utils/cellData.js'

export default async function messageTrackerValidation(messageType, messageTrackerCaregiver){
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