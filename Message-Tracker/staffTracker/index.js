import getStaffTrackerData from './getStaffTrackerData.js'
export default async function start(){
    let staffTrackerCaregivers = await getStaffTrackerData();
    return staffTrackerCaregivers;
}