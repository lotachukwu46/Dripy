// src/routes/user.routes.js
import express from "express";
import {
  deleteUser,
  getAllUsers,
  getLeaderboard,
  getReferralReport,
  getUserById,
  getUserStats,
  updateUser,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Admin routes
 */
router.get("/", authenticate, authorize("ADMIN"), getAllUsers); // Admin only
router.delete("/:id", authenticate, authorize("ADMIN"), deleteUser); // Admin only
router.patch("/status/:id", authenticate, authorize("ADMIN"), updateUserStatus); // Admin updates user status
router.patch("/role/:id", authenticate, authorize("ADMIN"), updateUserRole); // Admin updates user role
router.get("/stats", authenticate, authorize("ADMIN"), getUserStats); // Example stats (admin)

/**
 * User routes
 */
router.get("/:id", authenticate, getUserById); // Get single user by ID
router.patch("/", authenticate, updateUser); // User updates own profile

// Leaderboard
router.get("/leaderboard", authenticate, getLeaderboard);

// Referral report
router.get("/referrals/:id", authenticate, getReferralReport);

export default router;
