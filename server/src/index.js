import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import config from "./config/config.js";
import swaggerSetup from "./config/swagger.js";

// Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: config.cors.origin,
    methods: config.cors.methods,
    allowedHeaders: config.cors.allowedHeaders,
  })
);
app.use(express.json());
app.use(cookieParser());

// --- Routes ---
app.get("/", (req, res) => res.send("Dripy Backend is running 🚀"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// --- Swagger ---
swaggerSetup(
  app,
  process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`
);

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: ${BASE_URL}`);
  console.log(`📄 API docs available at: ${BASE_URL}/api-docs`);
});
