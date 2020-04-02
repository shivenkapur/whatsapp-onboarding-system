import selectors from '../config/selectorConfig.js'
import pageFunctions from '../../puppeteer_page.js'

export default async function selectSearchedContact(page){
    let contactIndexes = await getContactIndexes(page); //get div index of searched contact
    
    let selectSearchedContact = selectors.selectSearchedContact.getSearchedContact(contactIndexes[0] + 1);
    
    let contactSelected = await pageFunctions.click(page, selectSearchedContact); //boolean
    
    return contactSelected
}

async function getContactIndexes(page){
    let allContactsBox = selectors.selectSearchedContact.allContactsBox;
    let contactMatchedText = selectors.selectSearchedContact.contactMatchedText

    let contactIndexes = await page.evaluate((allContactsBox, contactMatchedText) => {
        let contacts = document.querySelectorAll(allContactsBox);
        
        let contactIndexes = [];
        for(let contactIndex = 0; contactIndex < contacts.length; contactIndex++)
        {
            let contact = contacts[contactIndex];
            if(contact.querySelector(contactMatchedText))
                contactIndexes.push(contactIndex)
        }
        return contactIndexes
    }, allContactsBox, contactMatchedText); // [ 0, 16 ] check length > 1 maybe

    return contactIndexes
}