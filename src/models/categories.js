const db = require('./db');

const getAllCategories = async () => {
    const result = await db.query(`
        SELECT * FROM categories
        ORDER BY category_id;
    `);

    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const result = await db.query(`
        SELECT *
        FROM categories
        WHERE category_id = $1;
    `, [categoryId]);

    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {
    const result = await db.query(`
        SELECT
            p.project_id,
            p.project_name,
            p.description
        FROM projects p
        JOIN project_categories pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_name;
    `, [categoryId]);

    return result.rows;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
};