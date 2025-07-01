export default {
  goTo: async function (page, URL, timeout = 3000) {
    await page.goto(URL);
    await page.waitFor(timeout);
  },
  findBySelector: async function (page, selector, timeout = 5000) {
    try {
      let wait = await page.waitForSelector(selector, {
        timeout: timeout,
      });
      return wait;
    } catch (error) {
      return false;
    }
  },

  addInput: async function (
    page,
    selector,
    text,
    timeout = 15000,
    delay = 200
  ) {
    try {
      page.waitForSelector(selector);
      let found = await this.findBySelector(page, selector, timeout);
      if (found) {
        await page.click(selector, { clickCount: 3 });
        await page.waitFor(500);
        await page.type(selector, text, { delay: delay });

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  click: async function (page, selector, timeout = 5000) {
    try {
      await page.waitFor(500);
      const element = await page.waitForSelector(selector, {
        timeout: timeout,
      });
      await page.click(selector, { clickCount: 3 });
      element.click();
      return true;
    } catch (error) {
      return false;
    }
  },

  double_click: async function (page, selector, timeout = 5000) {
    try {
      await page.waitFor(500);
      const element = await page.waitForSelector(selector, {
        timeout: timeout,
      });
      await page.click(selector, { clickCount: 4 });
      return true;
    } catch (error) {
      return false;
    }
  },
};
