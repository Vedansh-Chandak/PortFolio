import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

import db from "../config/database.js";
import { env } from "../config/env.js";

const schemaPath = path.join(process.cwd(), "src/database/schema.sql");

export const initializeDatabase = () => {
  console.log("📦 Initializing database...");
  console.log("Schema Path:", schemaPath);

  try {
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("Schema Length:", schema.length);

    db.exec(schema);

    console.log("✅ Schema executed");
  } catch (error) {
    console.error("❌ Schema execution failed");
    console.error(error);
    process.exit(1);
  }

  seedAdmin();
  seedProfile();

  console.log("✅ Database initialized");
};

function seedAdmin() {
  const admin = db
    .prepare(
      `
      SELECT *
      FROM admin
      WHERE username = ?
      `
    )
    .get(env.ADMIN_USERNAME);

  if (admin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = bcrypt.hashSync(env.ADMIN_PASSWORD, 12);

  db.prepare(
    `
      INSERT INTO admin(username, password_hash)
      VALUES (?, ?)
      `
  ).run(env.ADMIN_USERNAME, hashedPassword);

  console.log("✅ Default admin created");
}

function seedProfile() {
  const profile = db
    .prepare(
      `
      SELECT *
      FROM profile
      WHERE id = 1
      `
    )
    .get();

  if (profile) {
    console.log("✅ Profile already exists");
    return;
  }

  db.prepare(
    `
      INSERT INTO profile(id)
      VALUES (1)
      `
  ).run();

  console.log("✅ Default profile created");
}