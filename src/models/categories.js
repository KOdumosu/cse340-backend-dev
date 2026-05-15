import pool from './db.js';

export const getAllCategories = async () => {

    const sql = `
        SELECT *
        FROM categories
        ORDER BY category_name
    `;

    const [rows] = await pool.query(sql);

    return rows;
};