import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import config from "../config/config.js";
import prisma from "../prismaClient.js";
import {
  generateAndSetTokens,
  generateReferralCode,
} from "../utils/authUtils.js";
import { sendEmail } from "../utils/emailService.js";
import {
  forgotPasswordTemplate,
  verifyEmailTemplate,
} from "../utils/emailTemplates/index.js";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validators.js";

function isLocked(user) {
  return user.lockUntil && user.lockUntil > new Date();
}

function lockUntilFromNow(minutes) {
  const d = new Date();
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

// ------------------ REGISTER ------------------
export const register = async (req, res) => {
  try {
    let { email, password, username, referredBy } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: "Username, email and password required" });
    }

    email = email.trim().toLowerCase();
    username = username.trim();
    referredBy = referredBy?.trim().toUpperCase();

    if (!validateEmail(email))
      return res.status(400).json({ error: "Invalid email" });
    if (!validateUsername(username))
      return res.status(400).json({ error: "Invalid username" });
    if (!validatePassword(password))
      return res.status(400).json({ error: "Invalid password" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Unique referral code
    let referralCode;
    while (true) {
      referralCode = generateReferralCode();
      const exists = await prisma.user.findUnique({ where: { referralCode } });
      if (!exists) break;
    }

    // Verification code + expiry (1 hour)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    const verificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    // Convert referral code -> userId
    let referredById = null;
    if (referredBy) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referredBy },
        select: { id: true },
      });
      if (referrer) referredById = referrer.id;
    }

    // Avatar URL
    const avatarUrl = `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(
      username
    )}`;

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        referralCode,
        verificationToken: hashedToken,
        verificationTokenExpiry,
        isVerified: false,
        referredById,
        avatarUrl,
      },
    });

    const verificationTokenLink = `${
      process.env.CLIENT_URL
    }/reset-password?token=${verificationToken}&email=${encodeURIComponent(
      email
    )}`;
    const emailHtml = verifyEmailTemplate(username, verificationTokenLink);
    await sendEmail(email, "Verify your email address", emailHtml);

    const { accessToken } = generateAndSetTokens(res, newUser.id, newUser.role);

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        avatarUrl: newUser.avatarUrl,
        referralCode: newUser.referralCode,
        isVerified: newUser.isVerified,
      },
      accessToken,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------ VERIFY / RESEND EMAIL ------------------
export const verifyEmail = async (req, res) => {
  try {
    const { email, token, resend } = req.body;

    if (!email) return res.status(400).json({ error: "Email required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    // ---------------- RESEND ----------------
    if (resend) {
      if (user.isVerified)
        return res.status(400).json({ error: "User already verified" });

      // Generate a secure token
      const newToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(newToken)
        .digest("hex");
      const verificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.user.update({
        where: { email },
        data: { verificationToken: hashedToken, verificationTokenExpiry },
      });

      const newTokenLink = `${
        process.env.CLIENT_URL
      }/reset-password?token=${newToken}&email=${encodeURIComponent(email)}`;

      const emailHtml = verifyEmailTemplate(user.username, newTokenLink);
      await sendEmail(email, "Verify your email address", emailHtml);

      return res.json({ message: "Verification email resent successfully" });
    }

    // ---------------- VERIFY ----------------
    if (user.isVerified)
      return res.status(400).json({ error: "User already verified" });

    if (!token) return res.status(400).json({ error: "Token required" });
    const code = token.trim();
    if (!code)
      return res.status(400).json({ error: "Verification code required" });

    // Hash incoming code to compare with DB
    const hashedInput = crypto.createHash("sha256").update(code).digest("hex");

    if (user.verificationToken !== hashedInput)
      return res.status(400).json({ error: "Invalid verification code" });

    if (
      !user.verificationTokenExpiry ||
      new Date() > user.verificationTokenExpiry
    )
      return res.status(400).json({ error: "Verification code expired" });

    // ---------------- UPDATE USER ----------------
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    // ---------------- REFERRAL REWARDS ----------------
    if (user.referredById) {
      await prisma.user.update({
        where: { id: updatedUser.id },
        data: { nc: { increment: config.referral.welcomeNc || 100 } },
      });

      await prisma.user.update({
        where: { id: user.referredById },
        data: {
          nc: { increment: config.referral.Nc || 50 },
          referredUsers: { connect: { id: updatedUser.id } },
        },
      });
    }

    // ---------------- GENERATE ACCESS TOKEN ----------------
    const { accessToken } = generateAndSetTokens(
      res,
      updatedUser.id,
      updatedUser.role
    );

    return res.json({
      message: "Email verified successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        avatarUrl: updatedUser.avatarUrl,
        referralCode: updatedUser.referralCode,
        isVerified: updatedUser.isVerified,
      },
      accessToken,
    });
  } catch (err) {
    console.error("Verify email error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    email = email.trim().toLowerCase();
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    // don't leak which part failed
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Check lock state
    if (isLocked(user)) {
      const retryAt = user.lockUntil.toISOString();
      return res.status(423).json({
        error: "Account temporarily locked due to too many failed attempts.",
        retryAt,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // increment failed attempts
      const nextFailed = user.failedLoginAttempts + 1;
      const updates = {
        failedLoginAttempts: { increment: 1 },
      };

      // lock if threshold reached
      if (nextFailed >= config.auth.loginMaxFailed) {
        updates["lockUntil"] = lockUntilFromNow(config.auth.loginLockMinutes);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updates,
      });

      const remaining = Math.max(config.auth.loginMaxFailed - nextFailed, 0);

      return res.status(400).json({
        error:
          remaining > 0
            ? `Invalid credentials. ${remaining} attempt(s) left before temporary lock.`
            : "Too many failed attempts. Account temporarily locked.",
      });
    }

    // Require email verification
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your email before logging in." });
    }

    // success → reset counters, clear lock, update lastLogin (+ optional IP/UA)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockUntil: null,
        lastLogin: new Date(),
        ipAddress: req.ip || null,
        userAgent: req.get("user-agent") || null,
      },
    });

    // Generate tokens + set cookies
    const { accessToken } = generateAndSetTokens(res, user.id, user.role);

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
        referralCode: user.referralCode,
        role: user.role,
        isVerified: user.isVerified,
      },
      accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (req, res) => {
  // Clear cookies
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });

  // Nuke Authorization header for this response
  res.setHeader("Authorization", "");

  // If you ever persist refresh tokens in DB, also delete them here.
  // await prisma.refreshToken.deleteMany({ where: { userId: req.user.id } });

  res.json({ message: "Logout successful" });
};

// ------------------ REFRESH TOKEN ------------------
export const refreshToken = async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  if (!oldRefreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    // Verify old refresh token
    const payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate and set new tokens (rotates refresh token automatically)
    const { accessToken } = generateAndSetTokens(
      res,
      payload.userId,
      payload.role
    );

    return res.json({ accessToken });
  } catch (err) {
    console.error("Refresh error:", err.message);
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

// ------------------ GET PROFILE ------------------
export const getMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        referralCode: true,
        referredById: true,
        totalEarnings: true,
        nc: true,
        level: true,
        league: true,
        streak: true,
        badges: true,
        leaderboardRank: true,
        isVerified: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ FORGOT PASSWORD ------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: expiry,
      },
    });

    // Send email with original (non-hashed) token
    const resetLink = `${
      process.env.CLIENT_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const emailHtml = forgotPasswordTemplate(user.username, resetLink);
    await sendEmail(email, "Verify your email address", emailHtml);

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------ RESET PASSWORD ------------------
export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email, token, and new password required" });
    }

    // Hash the incoming token to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        email,
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
          gte: new Date(), // token not expired
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Validate password strength if you want (optional)
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------ CHANGE PASSWORD ------------------
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new password required" });
    }

    // Optional: Validate new password strength
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "New password must be at least 8 characters" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Incorrect old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
