import db from "../config/database.js";

export const getAllCategories = () => {
  return db.prepare(`
        SELECT *
        FROM tech_stack
        ORDER BY sort_order ASC,id ASC
    `).all();
};

export const getCategoryById = (id) => {
  return db.prepare(`
        SELECT *
        FROM tech_stack
        WHERE id=?
    `).get(id);
};

export const createCategory = (category) => {

    const result=db.prepare(`
        INSERT INTO tech_stack
        (
            category,
            items,
            sort_order
        )

        VALUES(?,?,?)
    `).run(
        category.category,
        JSON.stringify(category.items),
        category.sort_order
    );

    return Number(result.lastInsertRowid);
};

export const updateCategory = (id, category) => {

    db.prepare(`
        UPDATE tech_stack

        SET
            category=?,
            items=?,
            sort_order=?

        WHERE id=?
    `).run(
        category.category,
        JSON.stringify(category.items),
        category.sort_order,
        id
    );
};

export const deleteCategory = (id) => {
    return db.prepare(`
        DELETE FROM tech_stack
        WHERE id=?
    `).run(id);
};