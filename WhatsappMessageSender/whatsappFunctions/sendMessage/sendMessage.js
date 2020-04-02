import selectors from '../config/selectorConfig.js'
import pageFunctions from '../../puppeteer_page.js'

export default async function sendMessage(page, messageText, contactClicked, test = false){
    try{
        if(!contactClicked)
            return false
            
        let split_message = messageText.split('\n')

        page.waitForSelector(selectors.messageBoxArea)
        for(let line in split_message)
        {
            await page.waitFor(500)
            await page.type(selectors.messageBoxArea, split_message[line], { delay: 1 })
            //await page.keyboard.down('Shift');
            if(!test)
                await page.keyboard.press('Enter');
        }
        
        await page.waitFor(1000)

        if(!test)
            await pageFunctions.click(page, selectors.sendMessageButton)
        await page.waitFor(1000)

        return true
    } catch(error){
        console.log(error)
        return false
    }
}

