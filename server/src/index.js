// server/index.js
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import config from "./config/config.js";

// Import routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

// Load environment variables
dotenv.config();

const app = express();

// --- Swagger Setup ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Money Drip API",
      version: "1.0.0",
      description: "MVP API documentation for xfundz.",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // base path
      },
    ],
  },
  apis: ["./src/routes/*.js"], // 👈 update path to your actual routes folder
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Optionally serve raw swagger.json
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

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

// Health check
app.get("/", (req, res) => {
  res.send("NairaWorks Backend is running 🚀");
});

// Auth routes
app.use("/api/auth", authRoute);

// User Management routes
app.use("/api/user", userRoute);

// Placeholder for future modules
// app.use("/api/tasks", (await import("./routes/tasks.js")).default);
// app.use("/api/withdrawals", (await import("./routes/withdrawals.js")).default);
// app.use("/api/admin", (await import("./routes/admin.js")).default);

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
