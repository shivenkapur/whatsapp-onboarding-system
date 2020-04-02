import vCardsJS from 'vcards-js'
import fs from 'fs'

export default {
    importContacts : async function getContacts (page) {
        try{
            console.log("REACHED HEREEEE _____1")
            console.log("REACHED HEREEEE _____")
            let settingsElement = await page.findByXpath('//div[@title="Show Actions Menu"]')
            await settingsElement.click()

            let importVcard = await page.findByXpath('//input[@name="sc2054"]')
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

        console.log(messages)
        for(let messageIndex = 0; messageIndex < messages.length; messageIndex++){
            let message = messages[messageIndex]
            var vCard = vCardsJS();

            vCard.firstName = message['Name']
            
            vCard.organization = '';
            vCard.workPhone = '+852' + message['Phone'];
            
            let vCardString = vCard.getFormattedString()
            vCards.push(vCardString)
            //console.log(vCards)
            fs.appendFileSync('contacts.vcf', vCardString, { encoding: 'utf8' });
          
        }
        return vCards
      },

    checkIfContactExists: async function checkIfContactExists(page, message){
        
        try{
            
            let contactInputElement = await page.findByXpath('//*[@id="sc1684"]/div[1]/input')

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