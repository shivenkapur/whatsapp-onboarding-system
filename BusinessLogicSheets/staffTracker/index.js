import getStaffTrackerData from './getStaffTrackerData.js';
import getMessagesfromData from './Rules/getMessages.js';
import getCaregivers from '../utils/getCaregivers.js';

export default async function start(messageTrackerData){
    let staffTrackerCaregivers = await getStaffTrackerData();

    let caregiversAfterDate = new Date(2020, 0, 1)
    let caregiversRegisteredThisYear = await getCaregivers.getCaregiversAfterDate(staffTrackerCaregivers, caregiversAfterDate)
    
    let messagesToSend = await getMessagesfromData(caregiversRegisteredThisYear, messageTrackerData)
    
    return messagesToSend;
}