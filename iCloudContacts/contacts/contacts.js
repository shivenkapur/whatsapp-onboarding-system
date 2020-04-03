import vCardsJS from 'vcards-js'
import fs from 'fs'

export default {
    importContacts : async function getContacts (page) {
        try{
            let settingsElement = await page.findByXpath('//div[@title="Show Actions Menu"]')
            await settingsElement.click()

            let importVcard = await page.findByXpath('//input[@title="Import vCard…"]')
            importVcard.sendKeys(process.cwd() + '/contacts.vcf')

            await new Promise(resolve => setTimeout(resolve, 10000));
        }
        catch(error) {
            console.error(error);
        }
        
    },
    getvCards : function getvCards(messages){
        let vCards = []

        try{
          fs.unlinkSync('contacts.vcf')
        }catch(error){} 

        for(let messageIndex = 0; messageIndex < messages.length; messageIndex++){
            let message = messages[messageIndex]
            var vCard = vCardsJS();

            vCard.firstName = message['Name']
            
            vCard.organization = '';
            vCard.workPhone = '+852' + message['Phone'];
            
            let vCardString = vCard.getFormattedString()
            vCards.push(vCardString)
            fs.appendFileSync('contacts.vcf', vCardString, { encoding: 'utf8' });
          
        }
        return vCards
      },

    checkIfContactExists: async function checkIfContactExists(page, message){
        
        try{
            
            let contactInputElement = await page.findByXpath('//*[@id="sc1686"]/div[1]/input')

            await contactInputElement.clear()
            await contactInputElement.sendKeys(message['Name'])
            await new Promise(resolve => setTimeout(resolve, 1000));
            let exists = await page.findByXpath('//*[@id="sc1361"]', 1000)
            if(exists)
                return true
            else
                return false

        }
        catch(error) {
            return false
        }
      }
      

} //npm install <package>@<version>