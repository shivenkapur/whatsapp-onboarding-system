import getCalendlyData from './getCalendlyData.js'
import getMessagesfromData from './Rules/getMessages.js'
import getStaffTrackerData from '../staffTracker/getStaffTrackerData.js';

export default async function start(messageTrackerData){
    let calendlyCaregivers = await getCalendlyData();
    let staffTrackerCaregivers = await getStaffTrackerData('Old #');
    
    delete calendlyCaregivers['Staff'];

    let messagesToSend = await getMessagesfromData(calendlyCaregivers, staffTrackerCaregivers, messageTrackerData)

    return messagesToSend;
}