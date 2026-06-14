
import pg from 'pg';
const { Pool } = pg;

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.query('SELECT NOW()')
    .then(res => {
        console.log("Database connected successfully");
        console.log(res.rows[0]);
    })
    .catch(err => {
        console.error("DB connection error:", err.message);
    });

export default {
    async query(text, params) {
        return await pool.query(text, params);
    }
};