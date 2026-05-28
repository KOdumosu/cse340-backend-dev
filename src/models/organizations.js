const db = require('./db');

// Get all organizations
const getAllOrganizations = async () => {
    const result = await db.query(`
        SELECT *
        FROM organizations
        ORDER BY organization_id;
    `);

    return result.rows;
};

// Get single organization
const getOrganizationById = async (organizationId) => {
    const result = await db.query(`
        SELECT *
        FROM organizations
        WHERE organization_id = $1;
    `, [organizationId]);

    return result.rows[0];
};

// Get projects for organization
const getProjectsByOrganizationId = async (organizationId) => {
    const result = await db.query(`
        SELECT
            project_id,
            project_name,
            description
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_name;
    `, [organizationId]);

    return result.rows;
};

module.exports = {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
};