const { google } = require('googleapis')

import authorize from '../authorisation/auth.js'

export default { 
  getGoogleSheetData: async function getGoogleSheetData(sheetDetails, range = "", test = ""){
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    let oAuthToken = await authorize(SCOPES, sheetDetails['TOKEN_PATH_READ']);

    if(oAuthToken){
      let sheets = await google.sheets('v4');
      let sheetData = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetDetails.SHEET_ID,
        range: test + sheetDetails.SHEET_NAME + range,
        auth: oAuthToken
      });

      sheetData = sheetData.data.values
      return sheetData
    }

  },

  appendGoogleSheet: async function appendGoogleSheet(sheetDetails, rows, test = ""){
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

    if( sheetDetails['TOKEN_PATH_WRITE'] == undefined)
      return false
    let oAuthToken = await authorize(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

    let resource = { values: rows }
    
    if(oAuthToken){
      let sheets = google.sheets('v4');

      let result = await sheets.spreadsheets.values.append({
        spreadsheetId: sheetDetails.SHEET_ID,
        range: test + sheetDetails.SHEET_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: resource,
        auth: oAuthToken
      });
      return result
    }
  },

  batchUpdateGoogleSheet: async function batchUpdateGoogleSheet(sheetDetails, data, test = ""){

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    if( sheetDetails['TOKEN_PATH_WRITE'] == undefined)
      return false
      
    const resource = {
      data: data,
      valueInputOption: 'USER_ENTERED'
    }

    let oAuthToken = await authorize(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);
    if(oAuthToken){
      let sheets = google.sheets('v4');

      let result = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: sheetDetails.SHEET_ID,
        resource: resource,
        auth: oAuthToken
      });

      return result;
    }
    
  },

  batchGetGoogleSheetData: async function batchGetGoogleSheetData(sheetDetails, data, test = ""){
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    let oAuthToken = await authorize(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);
    if(oAuthToken){
      let sheets = google.sheets('v4');

      let result = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: sheetDetails.SHEET_ID,
        ranges: data,
        auth: oAuthToken,
      });

      return result;
    }
  }
  
}
