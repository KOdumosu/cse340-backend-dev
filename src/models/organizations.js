const db = require('./db');

/**
 * Get all organizations
 */
const getAllOrganizations = async () => {

    const result = await db.query(`
        SELECT *
        FROM organizations
        ORDER BY organization_id;
    `);

    return result.rows;
};

/**
 * Get single organization by ID
 */
const getOrganizationById = async (organizationId) => {

    const result = await db.query(`
        SELECT *
        FROM organizations
        WHERE organization_id = $1;
    `, [organizationId]);

    return result.rows[0];
};

/**
 * Get all projects for one organization
 */
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

/**
 * Create a new organization
 */
const createOrganization = async (
    name,
    description,
    contactEmail,
    logoFilename
) => {

    const sql = `
        INSERT INTO organizations
        (
            name,
            description,
            contact_email,
            logo_filename
        )
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id;
    `;

    const result = await db.query(sql, [
        name,
        description,
        contactEmail,
        logoFilename
    ]);

    // Optional logging
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(
            'Created organization:',
            result.rows[0].organization_id
        );
    }

    return result.rows[0].organization_id;
};

module.exports = {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId,
    createOrganization
};