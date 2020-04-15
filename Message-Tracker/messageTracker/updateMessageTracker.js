import googleSheets from '../../Google-Sheets/prod/api.js'
let INTERNAL_TOKEN = 'hldv5rft1d60szrdox1ryvf';

export default async function updateMessageTracker(messages, date){
    let sheetData = []

    for(let messageIndex in messages){
        let message = messages[messageIndex];
        
        let rowNumber = (parseInt(message['Old #']) + 1).toString();
        if(message['messageType'] == 'welcomeMessage'){
            sheetData.push({range: 'Main!B' + rowNumber + ':C' + rowNumber, values: [[ date, date ]]});
        } else if(message['messageType'] == 'scheduleInterview'){
            sheetData.push({range: 'Main!D' + rowNumber, values: [[ date ]]})
        } else if(message['messageType'] == 'nextSteps'){
            sheetData.push({range: 'Main!E' + rowNumber, values: [[ date ]]})
        }
    }


    googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData)

}