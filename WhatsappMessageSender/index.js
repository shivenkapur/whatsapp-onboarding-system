//internal_files
import openWhatsapp from './whatsappFunctions/openWhatsapp/openWhatsapp.js'
import signIntoWhatsapp from './whatsappFunctions/signIntoWhatsapp/signIntoWhatsapp.js'
import searchForContact from './whatsappFunctions/searchForContact/searchForContact.js'
import selectSearchedContact from './whatsappFunctions/selectSearchedContact/selectSearchedContact.js'
import sendMessage from './whatsappFunctions/sendMessage/sendMessage.js'
import clickNewMessageButton from './whatsappFunctions/clickNewMessageButton/clickNewMessageButton.js'
import getContactViaWaMe from './whatsappFunctions/getContactViaWaMe/getContactViaWaMe.js';
import googleSheets from 'googlesheets'
import convertSheetDatatoDict from './utils/convertSheetDatatoDict.js';
import cellData from './utils/cellData.js'

let INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';
let date = new Date();
let MAX_MESSAGE_LIMIT = 30;
export default async function start (){
    console.log(global.test)
    let messageQueueData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN, "", global.test)
    
    let columns = {'Old #' : -1, 'Name': -1, 'Message Type': -1, 'Phone': -1, 'Sent': -1,'Reminder Number': -1, 
    'Sent Number': -1, "Don't Send": -1}
    messageQueueData = await convertSheetDatatoDict(messageQueueData, columns);

    
    let messages = await messagesToSend(messageQueueData)
    console.log(messages)

    let values = await openWhatsapp();
    let page = values[0];

    let contactSearch = await signIntoWhatsapp(page);

    let messagesSent = []
    let data = []
    try{
        for(let messageIndex = 0; messageIndex < MAX_MESSAGE_LIMIT && messageIndex < messages.length; messageIndex++){
            let message = messages[messageIndex];
    
            let newMessage = await clickNewMessageButton(page)
    
            let contactName = message['Phone']
            let contactSearched = await searchForContact(page, contactName) // true or false
            let contactClicked = await selectSearchedContact(page)
    
            let messageText = '/' + message['Message Type'] + '\n';
            let messageSent = false;
            
            if(contactClicked)
                messageSent = await sendMessage(page, messageText, contactClicked, global.test)
            else
            {
                contactClicked = await getContactViaWaMe(page, message['Phone'])
                messageSent = await sendMessage(page, messageText, contactClicked, global.test);
            }
        
            if(messageSent){
                let data_row = {range: 'Message Queue!E' + message['Row'], values: [[ date ]]};
                data.push(data_row);

                if(cellData.hasNoData(message['Sent Number']))
                    data_row = {range: 'Message Queue!H' + message['Row'], values: [[ '1' ]]};
                else
                    data_row = {range: 'Message Queue!H' + message['Row'], values: 
                    [[ (parseInt(message['Sent Number']) + 1).toString() ]]};

                data.push(data_row);
            }
            
                
        }
        await googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, data, global.test);
        
    } catch(error){
        console.log(error);
        await googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, data,  global.test);
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
    process.exit()
}

async function messagesToSend(messageQueueData){
    let messages = [];
    for(let messageIndex in messageQueueData){
        let message = messageQueueData[messageIndex];

        message['Row'] = (parseInt(messageIndex) + 1).toString()
        let lastSentDate = new Date(message['Sent']);
        let today = new Date();
        let timeDifference = today - lastSentDate;

        if((message['Sent Number'] < 3 || cellData.hasNoData(message['Sent Number'])) && message["Don't Send"] != 'X' && message['Sent'] == ''){
            messages.push(message);
        }
    }
    return messages;
}

global.test = ""
start()