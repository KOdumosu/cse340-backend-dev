import db from './db.js';

/* Add Volunteer */
export const addVolunteer = async (
    userId,
    projectId
) => {

    const sql = `
        INSERT INTO volunteer_projects
        (
            user_id,
            project_id
        )
        VALUES ($1,$2)
        ON CONFLICT (user_id, project_id)
        DO NOTHING
    `;

    await db.query(sql, [
        userId,
        projectId
    ]);
};

/* Remove Volunteer */
export const removeVolunteer = async (
    userId,
    projectId
) => {

    const sql = `
        DELETE FROM volunteer_projects
        WHERE user_id = $1
        AND project_id = $2
    `;

    await db.query(sql, [
        userId,
        projectId
    ]);
};

/* Check Volunteer Status */
export const isVolunteer = async (
    userId,
    projectId
) => {

    const sql = `
        SELECT *
        FROM volunteer_projects
        WHERE user_id = $1
        AND project_id = $2
    `;

    const result = await db.query(sql, [
        userId,
        projectId
    ]);

    return result.rows.length > 0;
};

/* Dashboard Volunteer List */
export const getUserVolunteerProjects = async (
    userId
) => {

    const sql = `
        SELECT
            p.project_id,
            p.project_name,
            o.name AS organization_name
        FROM volunteer_projects vp
        JOIN projects p
            ON vp.project_id = p.project_id
        JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE vp.user_id = $1
        ORDER BY p.project_name
    `;

    const result = await db.query(sql, [userId]);

    return result.rows;
};