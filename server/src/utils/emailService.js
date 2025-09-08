// utils/emailService.js
import nodemailer from "nodemailer";
import config from "../config/config.js";

/**
 * Create a reusable transporter object using SMTP
 * You can switch to services like Gmail, SendGrid, Mailgun, SES by changing transporter config
 */
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: Number(config.email.port) === 465, // auto-set based on port
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML supported)
 * @param {string} [from] - Optional sender (default = process.env.EMAIL_FROM)
 */
export async function sendEmail(to, subject, html, from = config.email.from) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
