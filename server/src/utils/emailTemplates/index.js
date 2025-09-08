// emailTemplates/index.js

import { changePasswordTemplate } from "./changePasswordTemplate.js";
import { forgotPasswordTemplate } from "./forgotPasswordTemplate.js";
import { resetPasswordTemplate } from "./resetPasswordTemplate.js";
import { verifyEmailTemplate } from "./verifyEmailTemplate.js";

// Import reusable base template (wrapper styles, header, footer, etc.)
export * from "./baseTemplate.js";

// Export all templates in one object (good for bulk access)
const templates = {
  changePasswordTemplate,
  verifyEmailTemplate,
  resetPasswordTemplate,
  forgotPasswordTemplate,
};

export default templates;

// Export individual templates (for direct imports)
export {
  changePasswordTemplate,
  forgotPasswordTemplate,
  resetPasswordTemplate,
  verifyEmailTemplate,
};
