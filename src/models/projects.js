import pool from './db.js';

export const getAllProjects = async () => {

    const sql = `
        SELECT *
        FROM projects
        ORDER BY project_name
    `;

    const result = await pool.query(sql);

    return result.rows;
};