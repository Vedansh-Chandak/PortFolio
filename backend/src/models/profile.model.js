import db from "../config/database.js";

export const getProfile = () => {
  return db
    .prepare(
      `
      SELECT *
      FROM profile
      WHERE id = 1
      `
    )
    .get();
};

export const updateProfile = (profile) => {
  return db
    .prepare(
      `
      UPDATE profile
      SET
        name = ?,
        title = ?,
        tagline = ?,
        bio = ?,
        email = ?,
        github = ?,
        linkedin = ?,
        twitter = ?,
        avatar_url = ?,
        avatar_public_id = ?,
        resume_url = ?,
        resume_public_id = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      `
    )
    .run(
      profile.name,
      profile.title,
      profile.tagline,
      profile.bio,
      profile.email,
      profile.github,
      profile.linkedin,
      profile.twitter,
      profile.avatar_url,
      profile.avatar_public_id,
      profile.resume_url,
      profile.resume_public_id
    );
};