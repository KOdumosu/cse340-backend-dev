import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const db = {
    async query(text, params) {
        const res = await pool.query(text, params);
        return res;
    },

    async close() {
        await pool.end();
    }
};

export default db;