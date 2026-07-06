import db from "../config/database.js";

export const getAllMessages = () => {
  return db.prepare(`
        SELECT *
        FROM messages
        ORDER BY created_at DESC
    `).all();
};

export const getMessageById = (id) => {
  return db.prepare(`
        SELECT *
        FROM messages
        WHERE id=?
    `).get(id);
};

export const createMessage = (message) => {
  const result = db.prepare(`
        INSERT INTO messages
        (
            name,
            email,
            subject,
            message
        )

        VALUES(?,?,?,?)
    `).run(
        message.name,
        message.email,
        message.subject,
        message.message
    );

    return Number(result.lastInsertRowid);
};

export const markAsRead = (id) => {
  db.prepare(`
        UPDATE messages
        SET is_read=1
        WHERE id=?
    `).run(id);
};

export const deleteMessage = (id) => {
  db.prepare(`
        DELETE FROM messages
        WHERE id=?
    `).run(id);
};