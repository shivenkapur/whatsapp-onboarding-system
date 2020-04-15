import messageTracker from './messageTracker/index.js'
import messageQueue from './messageQueue/index.js'

/*
    Message Format:
    {
        'Old #': caregiverMessage['Old #'], 
        'searchName': searchName, 'messageType': 'videoCallReminder', 
        'Phone': caregiverMessage['Phone']
    }
*/
export default{
    
    updateMessageTracker: messageTracker.updateMessageTracker,
    getMessageTrackerData: messageTracker.getMessageTrackerData,
    updateMessageQueue: messageQueue.updateMessageQueue,
    

}