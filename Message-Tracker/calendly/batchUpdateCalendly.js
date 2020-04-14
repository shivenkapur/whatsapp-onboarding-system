import googleSheets from '../../Google-Sheets/prod/api.js'
let INTERNAL_TOKEN = 'ligm3nfxdlek7ruplnglsg';
let SHEET_NAME = 'backend'
export default function batchUpdateCalendly(caregivers, date) {
    let data = [];
    
    for (let caregiverIndex in caregivers)
    {
        let caregiver = caregivers[caregiverIndex]
        if(caregiver['messageType'] == 'videoCallReminder')
        {
            let data_value = {range: SHEET_NAME + "!" + 'I' + caregiver['Row'], values: [[ date ]]}
            data.push(data_value)
        }

        
    }
    let calendlyData = googleSheets.batchUpdateGoogleSheet(INTERNAL_TOKEN, data);
    return calendlyData;
}