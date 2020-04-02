var fs = require('fs');
var { google } = require('googleapis')

import getNewToken from './getNewToken.js'

export default async function authorize(SCOPES, TOKEN_PATH) {
  let credentials = await fs.readFileSync(__dirname + '/../credentials/credentials.json');
  credentials = JSON.parse(credentials)

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  let oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  try{
    let token =  await fs.readFileSync(TOKEN_PATH);
    await oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch(error){
      console.log(error)
      await getNewToken(oAuth2Client, SCOPES, TOKEN_PATH);
    return false;
  }
}