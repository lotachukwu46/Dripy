import prisma from "../prismaClient.js";

export const getAllUsers = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;
    page = Math.max(parseInt(page), 1);
    limit = Math.min(parseInt(limit), 100); // max 100

    if (
      !["createdAt", "username", "nc", "usdBalance", "level"].includes(sortBy)
    ) {
      sortBy = "createdAt";
    }
    if (!["asc", "desc"].includes(order)) order = "desc";

    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        role: true,
        status: true,
        isVerified: true,
        nc: true,
        usdBalance: true,
        level: true,
        league: true,
        streak: true,
        leaderboardRank: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalUsers = await prisma.user.count();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- GET SINGLE USER ----------------
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Admins can view anyone, users can view themselves only
    if (req.user.role !== "ADMIN" && req.user.userId !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        role: true,
        status: true,
        isVerified: true,
        nc: true,
        usdBalance: true,
        level: true,
        league: true,
        streak: true,
        leaderboardRank: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- UPDATE USER PROFILE ----------------
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, avatarUrl } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(username && { username }),
        ...(avatarUrl && { avatarUrl }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        role: true,
        status: true,
        isVerified: true,
        nc: true,
        usdBalance: true,
        level: true,
        league: true,
        streak: true,
        leaderboardRank: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- DELETE USER ----------------
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });

    await prisma.user.delete({ where: { id } });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- UPDATE USER ROLE ----------------
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id, username, email, role },
    });

    res.json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    console.error("Update role error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- UPDATE USER STATUS ----------------
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "SUSPENDED", "BANNED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: { id, username, email, status },
    });

    res.json({ message: "Status updated", user: updatedUser });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- GET USER STATS ----------------
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { status: "ACTIVE" },
    });
    const verifiedUsers = await prisma.user.count({
      where: { isVerified: true },
    });
    const totalUSD = await prisma.user.aggregate({
      _sum: { usdBalance: true },
    });

    res.json({
      totalUsers,
      activeUsers,
      verifiedUsers,
      totalUSD: totalUSD._sum.usdBalance || 0,
    });
  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- GET LEADERBOARD ----------------
export const getLeaderboard = async (req, res) => {
  try {
    let { limit = 10, sortBy = "nc" } = req.query;
    limit = Math.min(parseInt(limit), 50); // max 50

    if (!["nc", "usdBalance", "level"].includes(sortBy)) sortBy = "nc";

    const topUsers = await prisma.user.findMany({
      take: limit,
      orderBy: { [sortBy]: "desc" },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        nc: true,
        usdBalance: true,
        level: true,
        league: true,
        streak: true,
        leaderboardRank: true,
      },
    });

    res.json({ leaderboard: topUsers });
  } catch (err) {
    console.error("Get leaderboard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------- GET REFERRAL REPORT ----------------
export const getReferralReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Admins can view anyone, users only themselves
    if (req.user.role !== "ADMIN" && req.user.userId !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        referralCode: true,
        referredUsers: {
          select: { id: true, username: true, usdBalance: true, nc: true },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const totalReferred = user.referredUsers.length;
    const totalUsdEarnedFromReferrals = user.referredUsers.reduce(
      (sum, u) => sum + parseFloat(u.usdBalance || 0),
      0
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        referralCode: user.referralCode,
      },
      totalReferred,
      totalUsdEarnedFromReferrals,
      referredUsers: user.referredUsers,
    });
  } catch (err) {
    console.error("Get referral report error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
