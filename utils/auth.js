import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'
import readline from 'readline'
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_DIR = path.join(process.cwd(), 'tokens')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

export function authorize(user, callback) {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH))
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  const tokenPath = path.join(TOKEN_DIR, `${user}.json`)
  if (fs.existsSync(tokenPath)) {
    const token = fs.readFileSync(tokenPath)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  } else {
    getAccessToken(oAuth2Client, tokenPath, callback)
  }
}

function getAccessToken(oAuth2Client, tokenPath, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
  console.log(`Authorize this app by visiting this url: ${authUrl}`)
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      fs.mkdirSync(path.dirname(tokenPath), { recursive: true })
      fs.writeFileSync(tokenPath, JSON.stringify(token))
      callback(oAuth2Client)
    })
  })
}
