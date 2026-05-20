const db = require('./db');

async function getAllOrganizations() {
    const sql = `
        SELECT *
        FROM organizations
        ORDER BY organization_id;
    `;

    const result = await db.query(sql);
    return result.rows;
}

module.exports = {
    getAllOrganizations
};