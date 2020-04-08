import googleSheets from 'googlesheets'
let INTERNAL_TOKEN = 'hldv5rft1d60szrdox1ryvf';

export default async function updateMessageTracker(messages, date){

    let sheetData = []

    for(let messageIndex in messages){
        let message = messages[messageIndex];
        
        let rowNumber = (parseInt(message['Old #']) + 1).toString();
        if(message['messageType'] == 'welcomeMessage'){
            sheetData.push({range: global.test + 'Main!B' + rowNumber + ':C' + rowNumber, values: [[ date, date ]]});
        } else if(message['messageType'] == 'scheduleInterview'){
            sheetData.push({range: global.test + 'Main!D' + rowNumber, values: [[ date ]]})
        } else if(message['messageType'] == 'videoCallReminder'){
            sheetData.push({range: global.test + 'Main!E' + rowNumber, values: [[ date ]]})
        } else if(message['messageType'] == 'nextSteps'){
            sheetData.push({range: global.test + 'Main!F' + rowNumber, values: [[ date ]]})
        }
    }


    googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData)

}