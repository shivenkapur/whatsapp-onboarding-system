import googleSheets from 'googlesheets'
import convertSheetDatatoDict from '../utils/convertSheetDatatoDict.js'
let INTERNAL_TOKEN = '4wki6drdwh4ictyc12vltl';

export default async function getStaffTrackerData(identifier = "") {
    let staffTrackerData = await googleSheets.getGoogleSheetData(INTERNAL_TOKEN);
    
    let columns = {'Old #' : -1, 'Chi Name': -1, 'Eng Name': -1, 'EC Rank': -1, 'Actual Rank': -1 , 'Phone': -1,'HKID': -1, 'Status': -1 , 'Cert': -1, 'Photo': -1, 'CG 2.0 Create Time': -1, 'Date': -1}
  
    staffTrackerData = await convertSheetDatatoDict(staffTrackerData, columns, identifier = identifier);
    return staffTrackerData;
}