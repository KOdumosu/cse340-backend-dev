const db = require('./db');

/**
 * Get all categories
 */
const getAllCategories = async () => {
    const sql = `
        SELECT *
        FROM categories
        ORDER BY category_id;
    `;

    const result = await db.query(sql);

    return result.rows;
};

/**
 * Get single category by ID
 */
const getCategoryById = async (categoryId) => {
    const sql = `
        SELECT *
        FROM categories
        WHERE category_id = $1;
    `;

    const result = await db.query(sql, [categoryId]);

    return result.rows[0];
};

/**
 * Get projects by category
 */
const getProjectsByCategoryId = async (categoryId) => {
    const sql = `
        SELECT
            p.project_id,
            p.project_name,
            p.description
        FROM projects p
        JOIN project_categories pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_name;
    `;

    const result = await db.query(sql, [categoryId]);

    return result.rows;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
};