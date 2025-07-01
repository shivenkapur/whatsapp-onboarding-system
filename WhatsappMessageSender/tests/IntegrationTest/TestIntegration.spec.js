var assert = require("chai").assert;

//internal_files
import openWhatsapp from "../../whatsappFunctions/openWhatsapp/openWhatsapp.js";
import signIntoWhatsapp from "../../whatsappFunctions/signIntoWhatsapp/signIntoWhatsapp.js";
import searchForContact from "../../whatsappFunctions/searchForContact/searchForContact.js";
import selectSearchedContact from "../../whatsappFunctions/selectSearchedContact/selectSearchedContact.js";
import sendMessage from "../../whatsappFunctions/sendMessage/sendMessage.js";
import getContactViaWaMe from "../../whatsappFunctions/getContactViaWaMe/getContactViaWaMe.js";

import clickNewMessageButton from "../../whatsappFunctions/clickNewMessageButton/clickNewMessageButton.js";

import TestMessages from "./TestData/TestMessages.js";

describe("Open Whatsapp", async function () {
  this.timeout(50000);

  let page = "";
  it("should return the URL of the whatsapp page", async function () {
    page = await openWhatsapp();
    let pageURL = page["_target"]["_targetInfo"]["url"];
    assert.equal(pageURL, "https://web.whatsapp.com/");
  });

  it("Sign into Whatsapp", async function () {
    let contactSearch = await signIntoWhatsapp(page);
    assert.typeOf(contactSearch, "object");
    assert.equal(contactSearch.constructor.name, "ElementHandle");
  });

  describe("Send Messages to Contacts", async function () {
    for (let messageIndex in TestMessages) {
      let message = TestMessages[messageIndex];
      let assertValues = message["asserts"];

      it(
        "Create New Message" + " " + messageIndex.toString(),
        async function () {
          console.log("Contact " + messageIndex.toString());
          let newMessage = await clickNewMessageButton(page);
          assert.equal(newMessage, assertValues["Create New Message"]);
        }
      );

      it("Search Contact" + " " + messageIndex.toString(), async function () {
        let contactSearched = await searchForContact(
          page,
          message["message"]["Name"]
        );
        assert.equal(contactSearched, assertValues["Search Contact"]);
      });

      let contactClicked = false;
      it("Click Contact" + " " + messageIndex.toString(), async function () {
        contactClicked = await selectSearchedContact(page);
        assert.equal(contactClicked, assertValues["Click Contact"]);
      });

      let messageSent = false;
      it("Send Message" + " " + messageIndex.toString(), async function () {
        messageSent = await sendMessage(
          page,
          message["message"]["Text"],
          contactClicked
        );
        assert.equal(messageSent, assertValues["Send Message"]);
      });

      it(
        "Send Message Via WaMe" + " " + messageIndex.toString(),
        async function () {
          if (!messageSent) {
            let contactClicked = await getContactViaWaMe(
              page,
              message["message"]["Phone"]
            );
            assert.equal(contactClicked, assertValues["Send Message Via WaMe"]);
            messageSent = await sendMessage(
              page,
              message["message"]["Text"],
              contactClicked
            );
            assert.equal(messageSent, assertValues["Send Message Via WaMe"]);
          }
        }
      );
    }
  });
});
