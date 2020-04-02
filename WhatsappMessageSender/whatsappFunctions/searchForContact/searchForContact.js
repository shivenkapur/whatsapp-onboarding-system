import selectors from '../config/selectorConfig.js'
import pageFunctions from '../../puppeteer_page.js'

export default async function searchForContact(page, contactName){
    let searchContactTextArea = selectors.searchContactTextArea
    let contactSearched = await pageFunctions.addInput(page, searchContactTextArea, contactName, 1000)

    await page.waitFor(2000);

    return contactSearched
}

