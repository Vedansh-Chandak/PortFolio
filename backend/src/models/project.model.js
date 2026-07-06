import db from "../config/database.js";

export const getAllProjects = () => {
  return db.prepare(`
        SELECT *
        FROM projects
        ORDER BY sort_order ASC,id DESC
    `).all();
};

export const getProjectById = (id) => {
  return db.prepare(`
        SELECT *
        FROM projects
        WHERE id=?
    `).get(id);
};

export const getProjectBySlug = (slug) => {
  return db.prepare(`
        SELECT *
        FROM projects
        WHERE slug=?
    `).get(slug);
};

export const createProject = (project) => {

    const result=db.prepare(`
        INSERT INTO projects
        (
            title,
            slug,
            short_description,
            description,
            status,
            cover_image_url,
            cover_image_public_id,
            features,
            tech,
            live_url,
            github_url,
            is_featured,
            sort_order
        )

        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
    `).run(
        project.title,
        project.slug,
        project.short_description,
        project.description,
        project.status,
        project.cover_image_url,
        project.cover_image_public_id,
        JSON.stringify(project.features),
        JSON.stringify(project.tech),
        project.live_url,
        project.github_url,
        project.is_featured ? 1 : 0,
        project.sort_order
    );

    return Number(result.lastInsertRowid);
};

export const updateProject = (id, project) => {

    db.prepare(`
        UPDATE projects

        SET
            title=?,
            slug=?,
            short_description=?,
            description=?,
            status=?,
            cover_image_url=?,
            cover_image_public_id=?,
            features=?,
            tech=?,
            live_url=?,
            github_url=?,
            is_featured=?,
            sort_order=?,
            updated_at=CURRENT_TIMESTAMP

        WHERE id=?
    `).run(
        project.title,
        project.slug,
        project.short_description,
        project.description,
        project.status,
        project.cover_image_url,
        project.cover_image_public_id,
        JSON.stringify(project.features),
        JSON.stringify(project.tech),
        project.live_url,
        project.github_url,
        project.is_featured ? 1 : 0,
        project.sort_order,
        id
    );
};

export const deleteProject=(id)=>{
    return db.prepare(`
        DELETE FROM projects
        WHERE id=?
    `).run(id);
};