import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { env } from "./env.js";

// Ensure storage directory exists
const dbDirectory = path.dirname(env.DB_PATH);

if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Create/Open database
const db = new Database(env.DB_PATH);

// SQLite Performance & Safety
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("synchronous = NORMAL");

console.log("✅ SQLite connected successfully");

export default db;