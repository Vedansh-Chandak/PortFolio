import db from "../config/database.js";

export const findAdminByUsername = (username) => {
  return db
    .prepare(
      `
      SELECT *
      FROM admin
      WHERE username = ?
      `
    )
    .get(username);
};

export const findAdminById = (id) => {
  return db
    .prepare(
      `
      SELECT id, username
      FROM admin
      WHERE id = ?
      `
    )
    .get(id);
};

export const findAdminCredentialsById = (id) => {
  return db
    .prepare(
      `
      SELECT id, username, password_hash
      FROM admin
      WHERE id = ?
      `
    )
    .get(id);
};

export const updateAdminUsername = (id, username) => {
  return db
    .prepare(
      `
      UPDATE admin
      SET username = ?
      WHERE id = ?
      `
    )
    .run(username, id);
};

export const updateAdminPassword = (id, passwordHash) => {
  return db
    .prepare(
      `
      UPDATE admin
      SET password_hash = ?
      WHERE id = ?
      `
    )
    .run(passwordHash, id);
};