const {google} = require('googleapis');
require('dotenv').config()

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const generateGoogleAuth = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
    ];
    
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    })
}

const retrieveGoogleToken = async (code) => {
    const {tokens} = await oauth2Client.getToken(code)
    // oauth2Client.setCredentials(tokens);

    // oauth2Client.on('tokens', (tokens) => {
    //     if (tokens.refresh_token) {
    //       // store the refresh_token in my database!
    //       console.log(tokens.refresh_token);
    //       oauth2Client.setCredentials({
    //         refresh_token: tokens.refresh_token
    //       });
    //     }
    //     console.log(tokens.access_token);
    //   });

    return tokens
}

module.exports = {
    generateGoogleAuth,
    retrieveGoogleToken
}