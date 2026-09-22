import nodemailer from "nodemailer";
import { EMAIL_ACCOUNT, EMAIL_PASSWORD } from "./.env.js";

const transporter = nodemailer.createTransport({
    service: gmail,
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD
    },
});

export default transporter;