// generateSecret.js
import crypto from "crypto";

// Generate a random 64-character hex string
const secret = crypto.randomBytes(32).toString("hex");
console.log("Your new secret is:", secret);
// Save this secret in your .env file as JWT_SECRET and JWT_REFRESH_SECRET

// Example output: Your new secret is: 9f1c8b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t

// Note: Make sure to keep this secret safe and do not share it publicly.

// Usage: Run this script to generate a new secret, then copy the output and update your .env file.
// You can run this script using Node.js: `node generateSecret.js`
// After updating your .env file, restart your server to apply the changes.
// This will ensure that your JWT tokens are signed with a secure secret.
// Make sure to also update your .env file with the new secrets:
console.log("Update your .env file with the following:");
console.log(`JWT_SECRET=${secret}`);
console.log(`JWT_REFRESH_SECRET=${secret}`);
console.log("Remember to restart your server after updating the .env file.");

// This script is useful for generating secure secrets for JWT authentication.
// You can run it whenever you need to rotate your JWT secrets for better security.
// Make sure to keep your secrets private and never expose them in your codebase.
// If you need to generate a new secret, simply run this script again.
// This will help you maintain a secure authentication system in your application.
