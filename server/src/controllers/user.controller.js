export const getAllUsers = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 20,
      role,
      status,
      isVerified,
      league,
      sort = "createdAt",
      order = "desc",
      search,
      includeRelations,
    } = req.query;

    page = parseInt(page);
    limit = Math.min(parseInt(limit), 100);

    const filters = {};

    if (role) filters.role = role.toUpperCase();
    if (status) filters.status = status.toUpperCase();
    if (isVerified !== undefined) filters.isVerified = isVerified === "true";
    if (league) filters.league = league.toUpperCase();

    if (search) {
      filters.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { referralCode: { contains: search, mode: "insensitive" } },
      ];
    }

    // Whitelist sort fields
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "username",
      "email",
      "nc",
      "level",
      "league",
    ];
    if (!allowedSortFields.includes(sort)) sort = "createdAt";

    const total = await prisma.user.count({ where: filters });

    const users = await prisma.user.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: order.toLowerCase() === "asc" ? "asc" : "desc" },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        role: true,
        status: true,
        isVerified: true,
        nc: true,
        level: true,
        league: true,
        streak: true,
        leaderboardRank: true,
        createdAt: true,
        updatedAt: true,
        ...(includeRelations === "true" && {
          _count: {
            select: { referredUsers: true, tasks: true, withdrawals: true },
          },
        }),
      },
    });

    res.json({
      results: users,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {};
export const getUserById = async (req, res) => {};
export const getUserStats = async (req, res) => {};
export const updateUser = async (req, res) => {};
export const updateUserRole = async (req, res) => {};
export const updateUserStatus = async (req, res) => {};
