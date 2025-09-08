import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.cookies.accessToken;
  if (!authHeader) {
    return res.status(401).json({ error: "No access token provided" });
  }

  // Support "Bearer <token>" or raw cookie token
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired access token" });
  }
};
export const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    authenticate,
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    },
  ];
};
