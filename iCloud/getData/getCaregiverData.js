const {google} = require('googleapis');
/**
* Prints the names and majors of students in a sample spreadsheet:
* @see https://docs.google.com/spreadsheets/d/12eBkgtVelc3xXvVMI1NPG7JvC2eK5tfHPba9coP_xb4
* @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
*/
export default function callGoogleSheetsAPI(auth, range, callback) {
 let sheets = google.sheets({version: 'v4', auth});
 sheets.spreadsheets.values.get({
   spreadsheetId: '12eBkgtVelc3xXvVMI1NPG7JvC2eK5tfHPba9coP_xb4',
   range: range,
 }, (err, res) => {
   
   if (err) return console.log('The API returned an error: ' + err);
   const rows = res.data.values;
   if (rows.length) {
     // Print columns A and E, which correspond to indices 0 and 4.
     let caregivers = {}
     let columns = {'Old #' : -1, 'Chi Name': -1, 'Eng Name': -1, 'EC Rank': -1, 'Actual Rank': -1 , 'Phone': -1,'HKID': -1, 'Status': -1 , 'Cert': -1, 'Photo': -1, 'CG 2.0 Create Time': -1, 'Date': -1}

     for(let index = 1; index <= rows[0].length;index++){

       let columnName = rows[0][index]

       if(columns[columnName] == -1)
         columns[columnName] = index

     }
     //console.log(columns)
     rows.map((row) => {
         //let sendReminderDate = Date.parse("01/01/2020") //Month/Day/Year
        let chosen_columns = {}
        Object.entries(columns).forEach(([key, value]) => {
          chosen_columns[key] = `${row[value]}`
        });
        caregivers[chosen_columns['Old #']] = chosen_columns
       }
     );

     
     //console.log(caregivers)
     callback(caregivers)
   } else {
     console.log('No data found.');
   }
 });
}