import transporter from "../config/nodemailer.js";
import { EMAIL_ACCOUNT } from "../config/.env.js";

export const sendEmailRemainder = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error("Missing required Email parameters");

    const template = {
        subject: `⏰ Subscription Renewal Remainder: ${subscription.name}`,
        body:`
        <div style="font-family:Arial, sans-serif; padding:20px;color:#333;">
        <h2 style="color:#6366f1;">Upcoming Renewal Alert</h2>
        <p>Hello,</p>
        <p>Your Subscription for <strong>${subscription.name}</strong> is renewing soon!</p>
        <div style="background:##f3f4f6;padding:15px;border-radius:8px;margin:20px 0;">
        <p><strong>Plan:</strong>${subscription.name}</p>
        <p><strong>Price:</strong>${subscription.currency} ${subscription.price}</p>
        <p><strong>Frequency:</strong>${subscription.frequency}</p>
        <p><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toLocaleDateString()}</p>
        <p style="color:#e11d48;font-weight:bold;">Reminder:${type}</p>
        </div>
        <p>If you wish to cancel or modify your subscription, please visit your account dashboard.</p>
        <p>Best regards,<br/> Subscription Tracker Team</p>
        </div>
        `
    };
    const mailOptions = {
        from: EMAIL_ACCOUNT,
        to,
        subject: template.subject,
        html: template.body,
    };
    await transporter.sendMail(mailOptions);
};