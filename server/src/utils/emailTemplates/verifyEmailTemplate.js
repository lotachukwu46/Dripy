// utils/emailTemplates/verifyEmailTemplate.js
import { baseTemplate } from "./baseTemplate.js";

export const verifyEmailTemplate = (name, verificationLink) => {
  return baseTemplate(
    "Verify Your Email",
    `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
      
      <!-- Logo / Placeholder -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #2a9d8f;">Naira Works</h1>
      </div>

      <!-- Greeting -->
      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>

      <!-- Message -->
      <p style="font-size: 16px;">
        Thanks for signing up for <strong>Naira Works</strong>! Please verify your email by clicking the button below:
      </p>

      <!-- Verification Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="
          background-color: #2a9d8f;
          color: white;
          text-decoration: none;
          padding: 15px 25px;
          border-radius: 5px;
          font-weight: bold;
          display: inline-block;
          font-size: 16px;
        ">Verify Email</a>
      </div>

      <!-- Footer -->
      <p style="font-size: 14px; color: #777;">
        If you didn’t sign up for <strong>Naira Works</strong>, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #777;">&copy; ${new Date().getFullYear()} Naira Works. All rights reserved.</p>
    </div>
    `
  );
};
