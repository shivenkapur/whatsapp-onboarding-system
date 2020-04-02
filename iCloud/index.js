import Page from './page.js'
import signIn from './signIn/signIn.js'
import contacts from './contacts/contacts.js'
import caregiversHandler from '../caregivers/caregivers.js'
export default {
    start: async function start(messagesToSend, callback){
        
        try{
            let page = await new Page();
            await page.visit('https://www.icloud.com/contacts');
            await signIn(page)
            await page.switchToFrame("contacts")
            await page.findByXpath('//div[contains(@class, "atv4 contacts sc1618 sc-view headered-list-header sticky")]', 50000)
            let caregiverstoAdd = await getCaregiversToAdd(page, messagesToSend)
            

            await contacts.getvCards(caregiverstoAdd)
            await contacts.importContacts(page);
            callback()
        }catch(error){
            console.log('HIII iCloud start', error)
        }
    }
}

async function getCaregiversToAdd(page, messagesToSend){
    //console.log(messagesToSend)
    let caregiverstoAdd = []
    try{
        for(let messageIndex in messagesToSend){
            let message = messagesToSend[messageIndex]
            
            try{
                let exists = await contacts.checkIfContactExists(page, message)
                console.log(message['Name'], exists)
                if(!exists)
                    caregiverstoAdd.push(message)
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch(error){console.log('HIII getCaregiversToAdd')}

            
        }
    }
    catch(error){console.log('HIII getCaregiversToAdd')}
    

    return caregiverstoAdd
}