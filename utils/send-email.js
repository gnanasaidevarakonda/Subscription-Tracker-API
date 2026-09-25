import transporter from "../config/nodemailer.js";
import { EMAIL_ACCOUNT } from "../config/.env.js";

export const sendEmailRemainder = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error("Missing required Email parameters");

    const renewalDateFormatted = new Date(subscription.renewalDate).toLocaleDateString();

    const template = {
        subject: `Renewal Reminder: Your ${subscription.name} subscription renews soon`,

        // 1. Plaintext fallback (Crucial for passing spam filters)
        text: `Hello,

Your subscription for ${subscription.name} is renewing soon!
Plan: ${subscription.name}
Price: ${subscription.currency} ${subscription.price}
Frequency: ${subscription.frequency}
Renewal Date: ${renewalDateFormatted}
Reminder: ${type}

If you wish to cancel or modify your subscription, please visit your account dashboard.

Best regards,
Subscription Tracker Team`,

        // 2. Clean HTML template
        body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto;">
            <h2 style="color: #6366f1;">Upcoming Renewal Alert</h2>
            <p>Hello,</p>
            <p>Your subscription for <strong>${subscription.name}</strong> is renewing soon!</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Plan:</strong> ${subscription.name}</p>
                <p><strong>Price:</strong> ${subscription.currency} ${subscription.price}</p>
                <p><strong>Frequency:</strong> ${subscription.frequency}</p>
                <p><strong>Renewal Date:</strong> ${renewalDateFormatted}</p>
                <p style="color: #e11d48; font-weight: bold;">Reminder: ${type}</p>
            </div>
            <p>If you wish to cancel or modify your subscription, please visit your account dashboard.</p>
            <p>Best regards,<br/>Subscription Tracker Team</p>
        </div>
        `
    };

    const mailOptions = {
        // Formatted sender name
        from: `"Subscription Tracker" <${EMAIL_ACCOUNT}>`,
        to,
        subject: template.subject,
        text: template.text,
        html: template.body,
    };

    await transporter.sendMail(mailOptions);
};