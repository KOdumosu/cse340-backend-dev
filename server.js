require('dotenv').config();

const express = require('express');
const path = require('path');

const db = require('./src/models/db');

const orgModel = require('./src/models/organizations');
const projectModel = require('./src/models/projects');
const categoriesModel = require('./src/models/categories');

const app = express();

// Environment
const PORT = process.env.PORT || 3000;

/*** Middleware ***/

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/*** Middleware ***/

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {

    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    next();
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {

    res.locals.NODE_ENV = process.env.NODE_ENV;

    next();
});

/*** ROUTES ***/

// Home
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Organizations
app.get('/organizations', async (req, res) => {

    try {

        const organizations =
            await orgModel.getAllOrganizations();

        res.render('organizations', {
            title: 'Organizations',
            organizations
        });

    } catch (err) {

        console.error('Organizations error:', err.message);

        res.status(500).send('Server Error');
    }
});

// Projects
app.get('/projects', async (req, res) => {

    try {

        const projects =
            await projectModel.getAllProjects();

        res.render('projects', {
            title: 'Projects',
            projects
        });

    } catch (err) {

        console.error('Projects error:', err.message);

        res.status(500).send('Server Error');
    }
});

// Categories
app.get('/categories', async (req, res) => {

    try {

        const categories =
            await categoriesModel.getAllCategories();

        res.render('categories', {
            title: 'Categories',
            categories
        });

    } catch (err) {

        console.error('Categories error:', err.message);

        res.status(500).send('Server Error');
    }
});

/*** START SERVER ***/
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);

    db.query('SELECT NOW()')
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.error('Database connection error:', error.message);
        });
});