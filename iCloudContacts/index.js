import Page from './page.js'
import signIn from './signIn/signIn.js'
import contacts from './contacts/contacts.js'
import googleSheets from '../Google-Sheets/prod/api.js'
import convertSheetDatatoDict from './utils/convertSheetDatatoDict.js';

const INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';
async function start(){
    let messageQueueData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN)
    
    let columns = {'Old #' : -1, 'Name': -1, 'Message Type': -1, 'Phone': -1, 'Sent': -1,'Sent Number': -1, 'Added to iCloud': -1}
    messageQueueData = await convertSheetDatatoDict(messageQueueData, columns);

    try{
        let page = await new Page();
        await page.visit('https://www.icloud.com/contacts');
        await signIn(page)
        await page.switchToFrame("contacts")
        await page.findByXpath('//div[contains(@class, "atv4 contacts sc1618 sc-view headered-list-header sticky")]', 50000)
        let caregiverstoAdd = await getCaregiversToAdd(page, messageQueueData)
        
        await updateMessageQueue(caregiverstoAdd)

        await contacts.getvCards(caregiverstoAdd)
        await contacts.importContacts(page);
        
    }catch(error){
        if (err.code === 'ENOENT'){

        }
        console.log('HIII iCloud start', error)
    }
}

start()

async function getCaregiversToAdd(page, messageQueueData){
    //console.log(messagesToSend)
    let caregiverstoAdd = []
    try{
        for(let messageIndex in messageQueueData){
            let message = messageQueueData[messageIndex]
            
            if(!message['Added to iCloud'].includes('Added')){
                try{
                    let exists = await contacts.checkIfContactExists(page, message)
                    console.log(message['Name'], exists)
                    if(!exists)
                    {
                        caregiverstoAdd.push(message)
                        message['Row'] = (parseInt(messageIndex) + 1).toString()
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch(error){console.log('HIII getCaregiversToAdd')}
            }
        }
    }
    catch(error){console.log('HIII getCaregiversToAdd')}
    

    return caregiverstoAdd
}

async function updateMessageQueue(messageQueueData){
    let sheetData = [];

    for(let messageIndex in messageQueueData){
        let message = messageQueueData[messageIndex];
        let data_row = {range: 'Message Queue!G' + message['Row'], values: [[ 'Added' ]]};
        console.log(data_row);
        sheetData.push(data_row);
    }
    googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData);
}
