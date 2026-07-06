import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

function parseCorsOrigins(value) {
  if (!value) {
    return ["http://localhost:5173", "http://localhost:5174"];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const env = {
  PORT: process.env.PORT || 4000,

  NODE_ENV: process.env.NODE_ENV || "development",

  JWT_SECRET: process.env.JWT_SECRET,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "12h",

  ADMIN_USERNAME: process.env.ADMIN_USERNAME,

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

  DB_PATH:
    process.env.DB_PATH ||
    path.join(__dirname, "../../storage/portfolio.db"),

  CORS_ORIGIN: parseCorsOrigins(process.env.CORS_ORIGIN),

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,

  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

// Validate required environment variables
const requiredEnv = [
  "JWT_SECRET",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
];

for (const key of requiredEnv) {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}