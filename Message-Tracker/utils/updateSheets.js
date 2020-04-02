
import updateMainMessageTracker from '../messageTracker/updateMessageTracker.js'
import batchUpdateCalendly from '../calendly/batchUpdateCalendly.js'
import updateMessageQueue from '../messageQueue/updateMessageQueue.js'
let date = new Date();
export default async function updateSheets(messages){

    updateMainMessageTracker(messages, date)
    batchUpdateCalendly(messages, date)
    updateMessageQueue(messages, date)
    //await googleSheets.updateGoogleSheet(spreadsheets.MessageTrackerSheet.TOKEN_PATH_WRITE, updateMessageQueue, [messagesToUpdate], spreadsheets.MessageTrackerSheet.SHEET_NAME_MESSAGE_QUEUE, ()=>{})
    //await googleSheets.updateGoogleSheet(spreadsheets.MessageTrackerSheet.TOKEN_PATH_WRITE, appendMessageQueue, [messagesToSend], spreadsheets.MessageTrackerSheet.SHEET_NAME_MESSAGE_QUEUE, ()=>{})
}