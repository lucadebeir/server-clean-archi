import * as nodemailer from "nodemailer";
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.AUTH_CLIENT,
  process.env.AUTH_CLIENT_PASSWORD, // Client Secret
  process.env.AUTH_URL // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: "Your Refresh Token Here",
});
const accessToken = oauth2Client.getAccessToken();

export const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  from: `"Marine's Recipes" <marinesrecipes@gmail.com>`,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    type: "OAuth2",
    user: process.env.AUTH_USER,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_PASSWORD,
    refreshToken: process.env.AUTH_REFRESH_TOKEN,
    accessToken: accessToken,

    /*user: process.env.USER_MAIL,
          pass: process.env.PASS_MAIL*/
  },
});
