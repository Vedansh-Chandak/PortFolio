import db from "../config/database.js";

export const getDashboardStats = () => {

    const projects = db.prepare(`
        SELECT COUNT(*) AS count
        FROM projects
    `).get();

    const featuredProjects = db.prepare(`
        SELECT COUNT(*) AS count
        FROM projects
        WHERE is_featured = 1
    `).get();

    const experiences = db.prepare(`
        SELECT COUNT(*) AS count
        FROM experience
    `).get();

    const techCategories = db.prepare(`
        SELECT COUNT(*) AS count
        FROM tech_stack
    `).get();

    const messages = db.prepare(`
        SELECT COUNT(*) AS count
        FROM messages
    `).get();

    const unreadMessages = db.prepare(`
        SELECT COUNT(*) AS count
        FROM messages
        WHERE is_read = 0
    `).get();

    return {
        projects: projects.count,
        featuredProjects: featuredProjects.count,
        experiences: experiences.count,
        techCategories: techCategories.count,
        messages: messages.count,
        unreadMessages: unreadMessages.count,
    };
};