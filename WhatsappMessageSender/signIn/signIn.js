export default {
  signIn: async function (page, timeout = 5000000) {
    await page.waitForSelector(
      "#side > div.rRAIq > div > label > div > div._2S1VP.copyable-text.selectable-text",
      {
        timeout: timeout,
      }
    );
  },
};
