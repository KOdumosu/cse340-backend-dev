import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { testConnection } from './src/models/db.js';

import { fileURLToPath } from 'url';
import path from 'path';

import { getAllOrganizations } from './src/models/organizations.js';

// Environment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// Create dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express
const app = express();

/*** Middleware*/

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, 'src/views'));

console.log(path.join(__dirname, 'src/views'));

/*** Routes */

// Home Route
app.get('/', (req, res) => {
    console.log('HOME ROUTE');

    res.render('home', {
        title: 'Home'
    });
});

// Organizations Route
app.get('/organizations', async (req, res) => {
    console.log('ORGANIZATIONS ROUTE');

    const organizations = await getAllOrganizations();

    console.log(organizations);

    res.render('organizations', {
        title: 'Our Partner Organizations',
        organizations
    });
});

// Projects Route
app.get('/projects', (req, res) => {
    console.log('PROJECTS ROUTE');

    res.render('projects', {
        title: 'Service Projects'
    });
});

// Categories Route
app.get('/categories', (req, res) => {
    console.log('CATEGORIES ROUTE');

    res.render('categories', {
        title: 'Project Categories'
    });
});


// Start server
app.listen(PORT, async () => {

  try {

    await testConnection();

    console.log(
      `Server is running at http://127.0.0.1:${PORT}`
    );

  } catch (error) {

    console.error(
      'Error connecting to database:',
      error
    );
  }
});