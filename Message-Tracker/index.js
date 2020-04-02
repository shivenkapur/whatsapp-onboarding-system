import calendly from './calendly/index.js'
import staffTracker from './staffTracker/index.js'
import getCaregiversAfterDate from './utils/getCaregiversAfterDate.js'
import messageTracker from './messageTracker/index.js'
import getMessagesfromCaregivers from './utils/getMessagesfromCaregivers.js'
import updateSheets from './utils/updateSheets.js'
let caregiversAfterDate = new Date(2020, 0, 1) //Year, Month, date
async function start(){

    console.log('Getting Staff Tracker Data ...')
    let staffTrackerCaregivers = await staffTracker();

    
    let caregiversRegisteredThisYear = await getCaregiversAfterDate(staffTrackerCaregivers, caregiversAfterDate)

    console.log('Getting Calendly Data ...')
    let videoCallReminderMessage = await calendly(caregiversRegisteredThisYear);

    let allOtherMessages = await messageTracker(caregiversRegisteredThisYear)
    //console.log('Updating Calendly Sheet...')
    //console.log(videoCallReminderMessage)
    //console.log(allOtherMessages)
    let messagesToSend = await getMessagesfromCaregivers(allOtherMessages, videoCallReminderMessage);

    updateSheets(messagesToSend)

}

start();

