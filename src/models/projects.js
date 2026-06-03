const db = require('./db');

// Get all projects
const getAllProjects = async () => {
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
};

// Get project details
const getProjectDetails = async (projectId) => {
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
    WHERE p.project_id = $1;
  `;

  const result = await db.query(sql, [projectId]);
  return result.rows[0];
};

// Get categories for a project
const getCategoriesByProjectId = async (projectId) => {
  const sql = `
    SELECT
      c.category_id,
      c.category_name
    FROM categories c
    JOIN project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.category_name;
  `;

  const result = await db.query(sql, [projectId]);
  return result.rows;
};

module.exports = {
  getAllProjects,
  getProjectDetails,
  getCategoriesByProjectId
};