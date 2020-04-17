export default{
    contactList: '/html/body/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]',
    importContactsMenu: '//div[@title="Show Actions Menu"]',
    importContacts: '//input[@title="Import vCard…"]',
    contactSearch : '//input[@aria-label="Search All Contacts"]',
    contactSelected: '/html/body/div[2]/div[1]/div[1]/div[2]/div[1]/div[3]/div/div[1]/div/div'
}
/*
function getElementByXpath(document, path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
getElementByXpath(window.frames[0].document,'/html/body/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]')
*/

