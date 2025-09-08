import rateLimit from "express-rate-limit";

// Limit login attempts: e.g. max 5 per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    status: 429,
    error: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});

// Limit register attempts: e.g. max 3 per hour
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    status: 429,
    error: "Too many accounts created from this IP. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const verifyEmailLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 mins
  max: 3,
  message: {
    status: 429,
    error: "Too many email verification attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
