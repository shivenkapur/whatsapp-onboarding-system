import selectors from "../config/selectorConfig";
export default async function signIntoWhatsapp(page, timeout = 50000000) {
  let contactSearch = await page.waitForSelector(selectors.newMessageButton, {
    timeout: timeout,
  });

  return contactSearch;
}
