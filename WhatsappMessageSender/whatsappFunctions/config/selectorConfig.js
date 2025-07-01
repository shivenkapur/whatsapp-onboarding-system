export default {
  newMessageButton:
    "html > body > div:nth-child(1) > div > div > div:nth-child(3) > div > header > div:nth-child(2) > div > span > div:nth-child(2) > div",
  searchContactTextArea:
    "html > body > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > span > div > span > div > div:nth-child(2) > div > label > div > div:nth-child(2)",

  messageBoxArea:
    "html > body > div:nth-child(1) > div > div > div:nth-child(4) > div > footer > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(2)",
  sendMessageButton:
    "html > body > div:nth-child(1) > div > div > div:nth-child(4) > div > footer > div:nth-child(1) > div:nth-child(3) > button",

  selectSearchedContact: {
    allContactsBox:
      "html > body > div > div > div > div:nth-child(2) > div > span > div > span > div > div:nth-child(3) > div > div > div > div",
    contactMatchedText: "div > div > div:nth-child(2) > div > div > span",
    getSearchedContact: (contactIndex) => {
      return (
        "html > body > div > div > div > div:nth-child(2) > div > span > div > span > div > div:nth-child(3) > div > div > div > div:nth-child(" +
        contactIndex.toString() +
        ")"
      );
    },
  },

  waMeInvalidPhoneNumberDialogButton:
    "html > body > div:nth-child(1) > div > span:nth-child(2) > div > span > div > div > div > div > div > div:nth-child(2) > div",
};
