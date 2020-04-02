import accountInfo from '../configuration/accountInfo.js'
export default async function signIn (page) {
    
    
    try{
        page.switchToFrame("auth-frame")
        let usernameElement = await page.findById('account_name_text_field')
        await page.write(usernameElement, accountInfo.iCloud.appleID)

        const signInButton = await page.findById('sign-in')
        signInButton.click()

        await new Promise(resolve => setTimeout(resolve, 1500));

        let passwordElement = await page.findById('password_text_field')
        await page.write(passwordElement, accountInfo.iCloud.password)

        signInButton.click()
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        page.refresh()
    }catch(error){}

}