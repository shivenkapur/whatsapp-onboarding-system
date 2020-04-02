import selectors from '../config/selectorConfig.js'
import pageFunctions from '../../puppeteer_page.js'
import waitForWhatsappPageLoad from '../signIntoWhatsapp/signIntoWhatsapp.js'
export default async function getContactViaWaMe(page, phone){
    try{
        //accept any dialog in page
        try{
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
        } catch(error){
            return false
        }

        await page.goto('http://web.whatsapp.com/send?phone=852' + phone + '&text=&source=&data=');
        await waitForWhatsappPageLoad(page)

        let wrongNumber = await pageFunctions.click(page, selectors.waMeInvalidPhoneNumberDialogButton)
        

        if(wrongNumber)
            return false
    
        return true
    } catch(error){
        return false
    }
}