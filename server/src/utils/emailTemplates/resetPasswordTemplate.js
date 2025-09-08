// utils/emailTemplates/resetPasswordTemplate.js
import { baseTemplate } from "./baseTemplate.js";

export const resetPasswordTemplate = (name, resetLink) => {
  return baseTemplate(
    "Reset Your Password",
    `
    <p>Hi <strong>${name}</strong>,</p>
    <p>We received a request to reset your password. Click the button below to set a new password:</p>
    <a href="${resetLink}" class="btn">Reset Password</a>
    <p>If you didn’t request this, you can ignore this email.</p>
    `
  );
};
