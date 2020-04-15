import sheets from './config/sheets-config.js'
import callGoogleAPI from './callGoogleAPI/callGoogleAPI.js'

export default { 
  getGoogleSheetData: async function getGoogleSheetData(internal_token, range = "", test = ""){
    return await callGoogleAPI.getGoogleSheetData(sheets[internal_token], range, test)
  },
  appendGoogleSheet: async function appendGoogleSheet(internal_token, rows, test = ""){
    return await callGoogleAPI.appendGoogleSheet(sheets[internal_token], rows, test)
  },
  batchUpdateGoogleSheet: async function batchUpdateGoogleSheet(internal_token, data, test = ""){
    return await callGoogleAPI.batchUpdateGoogleSheet(sheets[internal_token], data, test)
  },
  batchGetGoogleSheetData: async function batchGetGoogleSheetData(internal_token, test = ""){
    return await callGoogleAPI.batchGetGoogleSheetData(sheets[internal_token], test)
  }
}
  

