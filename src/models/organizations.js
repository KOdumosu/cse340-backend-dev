import db from './db.js';

/*** Get all organizations*/
const getAllOrganizations = async () => {
  const result = await db.query(`
    SELECT *
    FROM organizations
    ORDER BY organization_id;
  `);

  return result.rows;
};

/*** Get single organization by ID*/
const getOrganizationById = async (organizationId) => {
  const result = await db.query(`
    SELECT *
    FROM organizations
    WHERE organization_id = $1;
  `, [organizationId]);

  return result.rows[0];
};

/*** Create a new organization*/
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

  return result.rows[0].organization_id;
};

export {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
};