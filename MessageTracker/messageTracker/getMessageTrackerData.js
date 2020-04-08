import googleSheets from 'googlesheets'
import convertSheetDatatoDict from '../utils/convertSheetDatatoDict.js'

let INTERNAL_TOKEN = 'hldv5rft1d60szrdox1ryvf';

export default async function getMessageTrackerData(identifier = ""){
    let messageTrackerData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN, "", global.test);

    let columns = {'Old #' : -1, 'Sent HKID Message to MQ': -1, 'Sent CERT Message to MQ': -1, 'Sent Schedule Interview Message to MQ': -1, 'Sent Video Call Reminder Message to MQ': -1,'Sent Video Call Reminder Message to MQ': -1, 'Sent Next Steps to MQ': -1}

    messageTrackerData = await convertSheetDatatoDict(messageTrackerData, columns, identifier);
    return messageTrackerData;
}

