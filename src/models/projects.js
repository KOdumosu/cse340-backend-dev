const db = require('./db');

async function getAllProjects() {
    const sql = `
        SELECT
            p.project_id,
            p.project_name,
            p.description,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organizations o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_id;
    `;

    const result = await db.query(sql);
    return result.rows;
}

module.exports = {
    getAllProjects
};