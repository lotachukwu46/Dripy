// utils/authUtils.js
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, config.auth.jwtSecret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.auth.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};

// Unified function
export const generateAndSetTokens = (res, userId, role) => {
  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId);

  // Set refresh token in HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Optionally set access token in cookie if you want
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  return { accessToken, refreshToken };
};

// Generate short referral code
export const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const generateVerificationCode = (length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Password must contain: min 8 chars, uppercase, lowercase, number, special char
export const validateStrongPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}<>^#_+=~])[A-Za-z\d@$!%*?&()[\]{}<>^#_+=~]{8,}$/;
  return regex.test(password);
};
