import db from './db.js';
import bcrypt from 'bcrypt';

/*** Find user by email (includes role_name)*/
const findUserByEmail = async (email) => {
    const query = `
        SELECT 
            u.user_id,
            u.name,
            u.email,
            u.password_hash,
            r.role_name
        FROM users u
        LEFT JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;

    const result = await db.query(query, [email]);

    return result.rows[0] || null;
};

/*** Verify password*/
const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

/*** Authenticate user */
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) return null;

    const valid = await verifyPassword(password, user.password_hash);

    if (!valid) return null;

    delete user.password_hash;

    return user;
};

/*** Create user*/
const createUser = async (name, email, passwordHash) => {
    const result = await db.query(
        `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING user_id, name, email
        `,
        [name, email, passwordHash]
    );

    return result.rows[0];
};

/*** Get all users*/
const getAllUsers = async () => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            COALESCE(r.role_name, 'user') AS role_name
        FROM users u
        LEFT JOIN roles r
            ON u.role_id = r.role_id
        ORDER BY u.user_id
    `;

    const result = await db.query(query);

    return result.rows;
};

export {
    findUserByEmail,
    authenticateUser,
    createUser,
    getAllUsers
};