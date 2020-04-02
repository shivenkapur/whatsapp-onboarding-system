import 'chromedriver';
import {Builder, By, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

let chrome_options = new chrome.Options();
// o.addArguments('start-fullscreen');
chrome_options.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
chrome_options.setUserPreferences({ credential_enable_service: false });
chrome_options.addArguments("--user-data-dir=user_data")
var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(chrome_options)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id, wait = 15000) {
        try{
            await this.driver.wait(until.elementLocated(By.id(id)), wait, 'Looking for element')
            let element = await this.driver.findElement(By.id(id));
            return element
        }
        catch(error){return false}
        
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    this.findByXpath = async function(xpath, wait = 15000){
        try{
            await this.driver.wait(until.elementLocated(By.xpath(xpath)), wait, 'Looking for element')
            let element = await this.driver.findElement(By.xpath(xpath));
            return element
        } catch(error){return false}
    }

    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };

    this.switchToFrame = async function (id) {
        let fr = await this.findById(id);
        await this.driver.switchTo().frame(this.findById(id));
        await console.log("Found Frame", fr)
    };

    this.refresh = async function(){
        this.driver.navigate().refresh();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    
};

module.exports = Page;