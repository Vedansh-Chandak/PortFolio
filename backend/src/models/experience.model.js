import db from "../config/database.js";

export const getAllExperiences = () => {
  return db
    .prepare(
      `
      SELECT *
      FROM experience
      ORDER BY sort_order ASC, id DESC
      `
    )
    .all();
};

export const getExperienceById = (id) => {
  return db
    .prepare(
      `
      SELECT *
      FROM experience
      WHERE id = ?
      `
    )
    .get(id);
};

export const createExperience = (experience) => {
  const result = db
    .prepare(
      `
      INSERT INTO experience
      (
        company,
        role,
        duration,
        description,
        tech,
        sort_order
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `
    )
    .run(
      experience.company,
      experience.role,
      experience.duration,
      experience.description,
      JSON.stringify(experience.tech || []),
      experience.sort_order || 0
    );

  return result.lastInsertRowid;
};

export const updateExperience = (id, experience) => {
  db.prepare(
    `
    UPDATE experience
    SET
      company = ?,
      role = ?,
      duration = ?,
      description = ?,
      tech = ?,
      sort_order = ?
    WHERE id = ?
    `
  ).run(
    experience.company,
    experience.role,
    experience.duration,
    experience.description,
    JSON.stringify(experience.tech || []),
    experience.sort_order || 0,
    id
  );
};

export const deleteExperience = (id) => {
  return db
    .prepare(
      `
      DELETE FROM experience
      WHERE id = ?
      `
    )
    .run(id);
};