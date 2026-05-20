const db = require('./db');

async function getAllCategories() {
    const sql = `
        SELECT *
        FROM categories
        ORDER BY category_id;
    `;

    const result = await db.query(sql);
    return result.rows;
}

module.exports = {
    getAllCategories
};