// utils/redisUtils.js
import client from "./redisClient.js";

/* -------------------- Base Helpers -------------------- */
export async function setValue(key, value, ttl = null) {
  value = JSON.stringify(value);
  if (ttl) {
    await client.setEx(key, ttl, value);
  } else {
    await client.set(key, value);
  }
}

export async function getValue(key) {
  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
}

export async function deleteValue(key) {
  await client.del(key);
}

/* -------------------- Code / Token Store -------------------- */
/**
 * Generic: Store any short-lived code (OTP, verification, reset, etc.)
 */
export async function storeCode(type, userId, code, ttl = 300) {
  await setValue(`${type}:${userId}`, code, ttl);
}

export async function validateCode(type, userId, code) {
  const key = `${type}:${userId}`;
  const stored = await getValue(key);
  if (stored && stored === code) {
    await deleteValue(key); // consume once
    return true;
  }
  return false;
}

/* -------------------- Session Management -------------------- */
const MAX_DEVICES_PER_USER = 4; // TODO: move to env later
const MAX_USERS_PER_DEVICE = 4;

/**
 * Add session: user <-> device
 * Quietly kicks out the oldest session if limits are exceeded
 */
export async function addSession(userId, deviceId, token, ttl = 86400) {
  const userSessionsKey = `user:sessions:${userId}`;
  const deviceSessionsKey = `device:sessions:${deviceId}`;

  // Get current sessions
  let userSessions = (await getValue(userSessionsKey)) || [];
  let deviceSessions = (await getValue(deviceSessionsKey)) || [];

  const now = Date.now();
  const newSession = { userId, deviceId, token, createdAt: now };

  // --- Enforce max devices per user ---
  if (!userSessions.find((s) => s.deviceId === deviceId)) {
    if (userSessions.length >= MAX_DEVICES_PER_USER) {
      // Kick out oldest session (LRU)
      userSessions.sort((a, b) => a.createdAt - b.createdAt);
      const oldest = userSessions.shift();
      await removeSession(userId, oldest.deviceId);
    }
  }

  // --- Enforce max users per device ---
  if (!deviceSessions.find((s) => s.userId === userId)) {
    if (deviceSessions.length >= MAX_USERS_PER_DEVICE) {
      // Kick out oldest user session on this device
      deviceSessions.sort((a, b) => a.createdAt - b.createdAt);
      const oldest = deviceSessions.shift();
      await removeSession(oldest.userId, deviceId);
    }
  }

  // Remove any existing session between this user <-> device
  userSessions = userSessions.filter((s) => s.deviceId !== deviceId);
  deviceSessions = deviceSessions.filter((s) => s.userId !== userId);

  // Add new session
  userSessions.push({ deviceId, token, createdAt: now });
  deviceSessions.push({ userId, token, createdAt: now });

  await setValue(userSessionsKey, userSessions, ttl);
  await setValue(deviceSessionsKey, deviceSessions, ttl);
}

/**
 * Get sessions
 */
export async function getUserSessions(userId) {
  return (await getValue(`user:sessions:${userId}`)) || [];
}

export async function getDeviceSessions(deviceId) {
  return (await getValue(`device:sessions:${deviceId}`)) || [];
}

/**
 * Remove a single session (also good place to revoke refresh token!)
 */
export async function removeSession(userId, deviceId) {
  const userSessionsKey = `user:sessions:${userId}`;
  const deviceSessionsKey = `device:sessions:${deviceId}`;

  let userSessions = await getValue(userSessionsKey);
  let deviceSessions = await getValue(deviceSessionsKey);

  if (userSessions) {
    userSessions = userSessions.filter((s) => s.deviceId !== deviceId);
    await setValue(userSessionsKey, userSessions);
  }

  if (deviceSessions) {
    deviceSessions = deviceSessions.filter((s) => s.userId !== userId);
    await setValue(deviceSessionsKey, deviceSessions);
  }

  // TODO: revoke refresh token from DB/Redis if you store them separately
}

/**
 * Clear all sessions for a user (logout everywhere)
 */
export async function clearUserSessions(userId) {
  const userSessions = await getUserSessions(userId);
  for (const s of userSessions) {
    await removeSession(userId, s.deviceId);
  }
}

/**
 * Clear all sessions for a device (kick all users off)
 */
export async function clearDeviceSessions(deviceId) {
  const deviceSessions = await getDeviceSessions(deviceId);
  for (const s of deviceSessions) {
    await removeSession(s.userId, deviceId);
  }
}

/* -------------------- Refresh Token Handling -------------------- */
export async function storeRefreshToken(
  userId,
  deviceId,
  refreshToken,
  ttl = 7 * 24 * 60 * 60
) {
  const key = `refresh:${userId}:${deviceId}`;
  await setValue(key, refreshToken, ttl);
}

export async function getRefreshToken(userId, deviceId) {
  return await getValue(`refresh:${userId}:${deviceId}`);
}

export async function deleteRefreshToken(userId, deviceId) {
  await deleteValue(`refresh:${userId}:${deviceId}`);
}
