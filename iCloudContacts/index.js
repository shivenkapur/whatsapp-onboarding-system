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

    let caregiverstoAdd = messageQueueNotAdded(messageQueueData);
    console.log(caregiverstoAdd)
    if(caregiverstoAdd.length > 0){
        let page = await new Page();
        try{
            await page.visit('https://www.icloud.com/contacts');
            await signIn(page)
            await page.switchToFrame("contacts")
            await page.findByXpath('//div[contains(@class, "atv4 contacts sc1619 sc-view headered-list-header sticky")]', 50000)
            
            caregiverstoAdd = await getCaregiversToAdd(page, caregiverstoAdd);
            console.log(caregiverstoAdd)

            if(caregiverstoAdd.length > 0)
            {
                await updateMessageQueue(caregiverstoAdd)

                await contacts.getvCards(caregiverstoAdd)
                await contacts.importContacts(page);
            }
           
        
        }catch(error){
            if (err.code === 'ENOENT'){

            }
            console.log('HIII iCloud start', error)
            page.driver.quit()
        }
        page.driver.quit()
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    process.exit()
}

start()

function messageQueueNotAdded(messageQueueData){

    let caregiverstoAdd = []
    for(let messageIndex in messageQueueData){
        let message = messageQueueData[messageIndex]
        if(!message['Added to iCloud'].includes('Added')){
            caregiverstoAdd.push(message)
        }
    }

    return caregiverstoAdd;
}
async function getCaregiversToAdd(page, caregivers){
    //console.log(messagesToSend)
    let caregiverstoAdd = []
    try{
        for(let caregiverIndex in caregivers){
            let message = caregivers[caregiverIndex]
            
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
