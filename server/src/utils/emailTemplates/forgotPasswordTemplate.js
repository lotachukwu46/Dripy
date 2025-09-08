// utils/emailTemplates/forgotPasswordTemplate.js
import { baseTemplate } from "./baseTemplate.js";

export const forgotPasswordTemplate = (name, resetLink) => {
  return baseTemplate(
    "Reset Your Password",
    `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#333;">
      <h1 style="text-align:center; color:#4f46e5;">Naira Works</h1>
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <div style="text-align:center; margin:30px 0;">
        <a href="${resetLink}" 
           style="
              background-color:#4f46e5;
              color:#fff;
              text-decoration:none;
              padding:12px 24px;
              border-radius:6px;
              display:inline-block;
              font-weight:bold;
           ">
          Reset Password
        </a>
      </div>
      <p>If you didn’t request a password reset, you can safely ignore this email.</p>
      <p style="font-size:12px; color:#666;">This link will expire in 1 hour.</p>
    </div>
    `
  );
};
