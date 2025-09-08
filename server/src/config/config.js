import dotenv from "dotenv";
dotenv.config(); // Load .env variables

const config = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
    serverUrl: process.env.SERVER_URL || "http://localhost:5000",
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiry: "15m",
    refreshTokenExpiry: "7d",
    loginMaxFailed: Number(process.env.LOGIN_MAX_FAILED || 5),
    loginLockMinutes: Number(process.env.LOGIN_LOCK_MINUTES || 15),
  },
  referral: {
    Nc: Number(process.env.REFERRAL_XP || 50),
    welcomeNc: Number(process.env.REFERRAL_WELCOME_XP || 100),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: (
      process.env.CORS_METHODS || "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    ).split(","),
    allowedHeaders: (
      process.env.CORS_ALLOWED_HEADERS || "Content-Type,Authorization"
    ).split(","),
  },
  email: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || "MyApp <no-reply@myapp.com>",
    service: process.env.EMAIL_SERVICE || "gmail", // optional for nodemailer
    service_secure: process.env.EMAIL_SERVICE_SECURE, // set to false if using custom SMTP
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || null,
    db: Number(process.env.REDIS_DB) || 0,
  },
};

export default config;
