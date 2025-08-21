const { auth } = require('firebase-admin');
const functions = require('firebase-functions');
const google = require('googleapis');
const { version } = require('react');
const cors = require('cors')({ origin: true });

//credenciais gmail definidas no terminal cmd
const CLIENT_ID = functions.config().gmail.client_id;
const CLIENT_SECRET = functions.config().gmail.client_secret;
const REFRESH_TOKEN = functions.config().gmail.refresh_token;
const USER_EMAIL = functions.config().gmail.user_email;

const oAuth2Client = google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

function createEmailRaw(to, subject, htmlBody, fromEmail) {
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
        'From: Professor(a) '
    ]
}




