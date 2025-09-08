// utils/emailTemplates/changePasswordTemplate.js
import { baseTemplate } from "./baseTemplate.js";

export const changePasswordTemplate = (name) => {
  return baseTemplate(
    "Password Changed",
    `
    <p>Hi <strong>${name}</strong>,</p>
    <p>This is a confirmation that your password has been successfully changed.</p>
    <p>If you did not do this, please contact support immediately.</p>
    `
  );
};
