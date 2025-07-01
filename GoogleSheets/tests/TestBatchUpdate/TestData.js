let date = new Date();

exports.date = date;
export default {
  "4wki6drdwh4ictyc12vltl": {
    TestCases: [
      { range: "Main!B2:C2", values: [[date, date]] },
      { range: "Main!D3", values: [[date]] },
      { range: "Main!E4", values: [[date]] },
    ],
    Assert: false,

    //SHEET_IDENTIFIER: 'StaffTrackerSheet'
  },

  hldv5rft1d60szrdox1ryvf: {
    TestCases: [
      { range: "Main!B2:C2", values: [[date, date]] },
      { range: "Main!D3", values: [[date]] },
      { range: "Main!E4", values: [[date]] },
    ],
    Assert: true,

    //SHEET_IDENTIFIER: 'MessageTrackerSheet' //Main
  },

  "700o2k0hnl7fvwv8kb0o6p": {
    TestCases: [
      { range: "Message Queue!E2", values: [[date]] },
      { range: "Message Queue!E3", values: [[date]] },
      { range: "Message Queue!E4", values: [[date]] },
      { range: "Message Queue!E5", values: [[date]] },
      { range: "Message Queue!E6", values: [[date]] },
    ],
    Assert: true,

    //SHEET_IDENTIFIER: 'MessageTrackerSheet' //MessageQueue
  },

  ligm3nfxdlek7ruplnglsg: {
    TestCases: [
      //[Old#, searchName, messageType, Phone]
      { range: "backend!I2", values: [[date]] },
      { range: "backend!I3", values: [[date]] },
      { range: "backend!I4", values: [[date]] },
      { range: "backend!I5", values: [[date]] },
      { range: "backend!I6", values: [[date]] },
    ],
    Assert: true,

    //SHEET_IDENTIFIER: 'CalendlySheet'
  },
};
