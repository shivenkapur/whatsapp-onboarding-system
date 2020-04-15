//internal_files
import openWhatsapp from './whatsappFunctions/openWhatsapp/openWhatsapp.js'
import signIntoWhatsapp from './whatsappFunctions/signIntoWhatsapp/signIntoWhatsapp.js'
import searchForContact from './whatsappFunctions/searchForContact/searchForContact.js'
import selectSearchedContact from './whatsappFunctions/selectSearchedContact/selectSearchedContact.js'
import sendMessage from './whatsappFunctions/sendMessage/sendMessage.js'
import clickNewMessageButton from './whatsappFunctions/clickNewMessageButton/clickNewMessageButton.js'
import getContactViaWaMe from './whatsappFunctions/getContactViaWaMe/getContactViaWaMe.js';
import googleSheets from '../Google-Sheets/prod/api.js'
import convertSheetDatatoDict from './utils/convertSheetDatatoDict.js';

import pageFunctions from './puppeteer_page.js'
const fs = require('fs');
const INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';
const date = new Date();
const MAX_MESSAGE_LIMIT = 30;
export default async function start (){
    
    let values = await openWhatsapp();
    let page = values[0];
    let browser = values[1];


    let contactSearch = await signIntoWhatsapp(page);

    let index = 1;
    /*const pageDownload = await browser.newPage();
    page.bringToFront()
    page.on('response', async response => {
        if(response.url().startsWith("blob")){
            console.log(response.url());
            var viewSource = await pageDownload.goto(response.url());

            pageDownload.bringToFront()
            console.log(await viewSource.buffer())
            require("fs").writeFile(imageSrc.toString() + ".png", await viewSource.buffer(), 'base64', function(err) {
                console.log(err);
              });
            page.bringToFront()

        }
            
      });*/

    let contactNumber = await page.evaluate(() => {
        let contacts = document.querySelectorAll('html > body > div:nth-child(1) > div > div > div:nth-child(3) > div > div:nth-child(4) > div > div > div > div');
        return contacts.length;
    });
    
    console.log(contactNumber, 'HIIIIIIII')
    const pageDownload = await browser.newPage();
    page.bringToFront()
    for(index = 1;index <= contactNumber;index++){
        let contactSelector = 'html > body > div:nth-child(1) > div > div > div:nth-child(3) > div > div:nth-child(4) > div > div > div > div:nth-child(' + index.toString() + ')';
        pageFunctions.click(page, contactSelector);

        let loadingMedia = 1;
        await page.waitFor(1500)
        while(loadingMedia > 0)
        {
            
            await page.waitFor(500)
            loadingMedia = await page.evaluate(() => {
                let loadingMedia = document.querySelectorAll('span[data-icon="media-cancel"]');
                let loadingMessages = document.querySelectorAll('div[title="loading messages…"]');
                
                return loadingMedia.length || loadingMessages.length;
            });
        }

        await page.waitFor(500)
        let return_value = await page.evaluate(() => {
            let message = document.querySelector('html > body > div:nth-child(1) > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div > div[tabindex="-1"] > div[class*="message-in"] > div');
            
            
            let number = ""
            if(message)
                number = message.getAttribute('data-id');
            else
                number = document.querySelector('html > body > div:nth-child(1) > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div > div[tabindex="-1"] > div[class*="message-out"] > div').getAttribute('data-id');

            let images = document.querySelector('html > body > div:nth-child(1) > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div > div[tabindex="-1"]').querySelectorAll('img[class*="_1YbLB"]');
            let name = document.querySelector('html > body > div:nth-child(1) > div > div > div:nth-child(4) > div > header > div:nth-child(2) > div > div > span').innerText;

            images = Array.from(images)
            let urls = [];
            for(let imageIndex in images){
                if(images[imageIndex].src.includes('blob'))
                    urls.push(images[imageIndex].src)
            }

            return [urls,number, name];
        });

        let urls = return_value[0];
        let number = return_value[1];
        console.log(return_value[2])

        for(let urlIndex in urls){
            let url = urls[urlIndex];

            var viewSource = await pageDownload.goto(url);

            pageDownload.bringToFront()
            //console.log(await viewSource.buffer())
            await fs.writeFileSync(number.toString() + urlIndex.toString() + ".png", await viewSource.buffer());
            page.bringToFront()
        }
        
    }

    
    
    
    
}

start()


