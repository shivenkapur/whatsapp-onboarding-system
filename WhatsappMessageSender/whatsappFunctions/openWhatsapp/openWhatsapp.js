import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

export default async function openWhatsapp(){
    let browser = await puppeteer.launch({ args: ['--disable-features=site-per-process', "--disable-popup-blocking"],  headless: false, userDataDir: "./user_data_whatsapp" })
    const page = await browser.newPage();
    await page.goto('http://web.whatsapp.com');
    return page
}