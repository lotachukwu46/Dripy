// server/lib/redisClient.js
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("🔌 Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis client is ready!");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err.message);
});

redisClient.on("end", () => {
  console.log("🛑 Redis connection closed");
});

export default redisClient;
