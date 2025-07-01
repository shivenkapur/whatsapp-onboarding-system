var assert = require("chai").assert;
import updateMessageQueue from "../index.js";

describe("Get Messages from Staff Tracker", async function () {
  this.timeout(50000);

  it("get messages", async function () {
    global.test = "Test_";
    let messages = await updateMessageQueue();
    console.log(messages);
  });
});
