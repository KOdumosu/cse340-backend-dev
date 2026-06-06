import db from './db.js';

/**
 * Get all categories
 */
const getAllCategories = async () => {
    const result = await db.query(
        "SELECT * FROM categories ORDER BY category_name"
    );
    return result.rows;
};

/**
 * Get categories for a project
 */
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name
        FROM categories c
        JOIN project_categories pc
        ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

/**
 * Assign categories to project (replace all)
 */
const updateCategoryAssignments = async (projectId, categoryIds) => {

    await db.query(
        `DELETE FROM project_categories WHERE project_id = $1`,
        [projectId]
    );

    if (!categoryIds || categoryIds.length === 0) return;

    for (const categoryId of categoryIds) {
        await db.query(
            `INSERT INTO project_categories (project_id, category_id)
             VALUES ($1, $2)`,
            [projectId, categoryId]
        );
    }
};

/**
 * Get category by ID
 */
const getCategoryById = async (id) => {
    const result = await db.query(
        "SELECT * FROM categories WHERE category_id = $1",
        [id]
    );
    return result.rows[0];
};

/**
 * Create category
 */
const createCategory = async (categoryName) => {
    const result = await db.query(
        `INSERT INTO categories (category_name)
         VALUES ($1)
         RETURNING *`,
        [categoryName]
    );
    return result.rows[0];
};

/**
 * Update category
 */
const updateCategory = async (id, categoryName) => {
    const result = await db.query(
        `UPDATE categories
         SET category_name = $1
         WHERE category_id = $2
         RETURNING *`,
        [categoryName, id]
    );
    return result.rows[0];
};

/**
 * Get projects under category
 */
const getProjectsByCategoryId = async (categoryId) => {
    const result = await db.query(
        `
        SELECT
            p.project_id,
            p.project_name,
            p.description,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN project_categories pc ON p.project_id = pc.project_id
        JOIN organizations o ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.project_name
        `,
        [categoryId]
    );

    return result.rows;
};

export {
    getAllCategories,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    getCategoryById,
    createCategory,
    updateCategory,
    getProjectsByCategoryId
};