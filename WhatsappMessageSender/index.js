//internal_files
import openWhatsapp from './whatsappFunctions/openWhatsapp/openWhatsapp.js'
import signIntoWhatsapp from './whatsappFunctions/signIntoWhatsapp/signIntoWhatsapp.js'
import searchForContact from './whatsappFunctions/searchForContact/searchForContact.js'
import selectSearchedContact from './whatsappFunctions/selectSearchedContact/selectSearchedContact.js'
import sendMessage from './whatsappFunctions/sendMessage/sendMessage.js'
import clickNewMessageButton from './whatsappFunctions/clickNewMessageButton/clickNewMessageButton.js'
import getContactViaWaMe from './whatsappFunctions/getContactViaWaMe/getContactViaWaMe.js';
import googleSheets from '../Google-Sheets/prod/api.js'
import convertSheetDatatoDict from './utils/convertSheetDatatoDict.js';

let INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';
let date = new Date();
let MAX_MESSAGE_LIMIT = 1500;
export default async function start (test = false){
    let messageQueueData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN)
    
    let columns = {'Old #' : -1, 'Name': -1, 'Message Type': -1, 'Phone': -1, 'Sent': -1,'Sent Number': -1}
    messageQueueData = await convertSheetDatatoDict(messageQueueData, columns);

    let messages = await messagesToSend(messageQueueData)
    let page = await openWhatsapp();

    let contactSearch = await signIntoWhatsapp(page);

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
            //if(!test)
               
                if(contactClicked)
                    messageSent = await sendMessage(page, messageText, contactClicked, test)
                else
                {
                    contactClicked = await getContactViaWaMe(page, message['Phone'])
                    messageSent = await sendMessage(page, messageText, contactClicked, test);
                }
            
                if(messageSent){
                    let data_row = {range: 'Message Queue!E' + message['Row'], values: [[ date ]]};
                    
                    data.push(data_row);

                    data_row = {range: 'Message Queue!F' + message['Row'], values: [[ (parseInt(message['Sent Number']) + 1).toString() ]]};

                    data.push(data_row);
                }
        }
        await googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, data);
        
    } catch(error){
        console.log(error);
        await googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, data);
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

        if((message['Sent'] == '' && message['Sent Number'] < 3) || (timeDifference >= 1000*3600*24*3 && message['Sent Number'] < 3 && message['Message Type'] != 'nextSteps')){
            messages.push(message);
        }
    }
    return messages;
}
start(false)