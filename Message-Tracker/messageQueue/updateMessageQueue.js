import googleSheets from '../../Google-Sheets/prod/api.js'
import convertSheetDatatoDict from '../utils/convertSheetDatatoDict.js'
import cellData from '../utils/cellData.js'
let INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';
let SHEET_NAME = 'Message Queue'
export default async function updateMessageQueue(caregivers, date) {
    let data = [];
    
    let messageQueueData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN);
    let columns = {'Old #': -1, 'Name': -1, 'Message Type': -1, 'Phone': -1, 'Sent': -1, 'Sent Number': -1};
    
    messageQueueData = await convertSheetDatatoDict(messageQueueData, columns)

    
    let batchUpdate = []
    let append = []

    for (let caregiverIndex in caregivers)
    {
        let caregiver = caregivers[caregiverIndex];
        let found = false;
        for(let messageQueueIndex in messageQueueData)
        {
            let messageQueueRow = messageQueueData[messageQueueIndex];

            if(messageQueueRow['Old #'] == caregiver['Old #']){
                caregiver['Row'] = (parseInt(messageQueueIndex) + 1).toString()
                caregiver['Message Type from Sheet'] = messageQueueRow['Message Type']
                caregiver['Sent Number'] = messageQueueRow['Sent Number']
                batchUpdate.push(caregiver)
                found = true;
            }
        }

        if(!found){
            append.push(caregiver)
        }
    }

    batchUpdateSheet(batchUpdate, date);
    appendSheet(append, date);
}

async function batchUpdateSheet(batchUpdate, date){

    let sheetData = []
    for(let caregiverMesageIndex in batchUpdate){
        let caregiverMessage = batchUpdate[caregiverMesageIndex];

        sheetData.push({range: 'Message Queue!E' + caregiverMessage['Row'], values: [[ '' ]]})

        let sentNumber = caregiverMessage['Sent Number'];
        
        if(cellData.hasNoData(caregiverMessage['Sent Number']))
            sentNumber = 1;
        else if(caregiverMessage['messageType'] != caregiverMessage['Message Type from Sheet'])
            sentNumber = 1;
        else
            sentNumber = (parseInt(caregiverMessage['Sent Number']) + 1).toString()
        
        sheetData.push({range: 'Message Queue!C' + caregiverMessage['Row'], values: [[ caregiverMessage['messageType'] ]]})
        sheetData.push({range: 'Message Queue!F' + caregiverMessage['Row'], values: [[ sentNumber ]]})
    }

    googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData);
}

async function appendSheet(append, date){

    let sheetData = []
    for(let caregiverMesageIndex in append){
        let caregiverMessage = append[caregiverMesageIndex];

        sheetData.push([caregiverMessage['Old #'], caregiverMessage['searchName'], caregiverMessage['messageType']
                        , caregiverMessage['Phone'], '', '1' ])

    }
    googleSheets.appendGoogleSheet(INTERNAL_TOKEN, sheetData);
}