import dotenv from 'dotenv';
dotenv.config();

import db from './src/models/db.js';

const createTables = async () => {

    try {

        await db.query(`
            CREATE TABLE IF NOT EXISTS organizations (
                organization_id SERIAL PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                contact_email VARCHAR(255) NOT NULL,
                logo_filename VARCHAR(255) NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS projects (
                project_id SERIAL PRIMARY KEY,
                project_name VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                organization_id INT REFERENCES organizations(organization_id)
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS categories (
                category_id SERIAL PRIMARY KEY,
                category_name VARCHAR(100) NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS project_categories (
                project_id INT NOT NULL,
                category_id INT NOT NULL,

                PRIMARY KEY (project_id, category_id),

                FOREIGN KEY (project_id)
                    REFERENCES projects(project_id)
                    ON DELETE CASCADE,

                FOREIGN KEY (category_id)
                    REFERENCES categories(category_id)
                    ON DELETE CASCADE
            );
        `);

        console.log('Tables created successfully');

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);
    }
};

createTables();