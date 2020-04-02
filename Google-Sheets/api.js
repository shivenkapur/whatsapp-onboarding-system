import sheets from './config/sheets-config.js'
import callGoogleAPI from './callGoogleAPI/callGoogleAPI.js'

export default { 
  getGoogleSheetData: async function getGoogleSheetData(internal_token, range = ""){
    return await callGoogleAPI.getGoogleSheetData(sheets[internal_token], range)
  },
  appendGoogleSheet: async function appendGoogleSheet(internal_token, rows){
    return await callGoogleAPI.appendGoogleSheet(sheets[internal_token], rows)
  },
  batchUpdateGoogleSheet: async function batchUpdateGoogleSheet(internal_token, data){
    return await callGoogleAPI.batchUpdateGoogleSheet(sheets[internal_token], data)
  },
  batchGetGoogleSheetData: async function batchGetGoogleSheetData(internal_token){
    return await callGoogleAPI.batchGetGoogleSheetData(sheets[internal_token])
  }
}
  

