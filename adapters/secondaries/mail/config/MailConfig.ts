import * as nodemailer from "nodemailer";
import {getEnvironment} from "./environmentFile";

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const environment: any = getEnvironment();

const oauth2Client = new OAuth2(
  environment.AUTH_CLIENT,
  environment.AUTH_CLIENT_PASSWORD, // Client Secret
  environment.AUTH_URL // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: environment.AUTH_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

export const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    type: "OAuth2",
    user: environment.AUTH_USER,
    clientId: environment.AUTH_CLIENT_ID,
    clientSecret: environment.AUTH_CLIENT_PASSWORD,
    refreshToken: environment.AUTH_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});
