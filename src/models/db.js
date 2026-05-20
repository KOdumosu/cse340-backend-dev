const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const db = {

    async query(text, params) {
        try {
            const start = Date.now();

            const res = await pool.query(text, params);

            const duration = Date.now() - start;

            console.log('Executed query:', {
                text: text.replace(/\s+/g, ' ').trim(),
                duration: `${duration}ms`,
                rows: res.rowCount
            });

            return res;

        } catch (error) {
            console.error('Database query error:', {
                text: text.replace(/\s+/g, ' ').trim(),
                error: error.message
            });

            throw error;
        }
    },

    async close() {
        await pool.end();
    }
};

module.exports = db;