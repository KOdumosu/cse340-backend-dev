import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// Environment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// Create dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express
const app = express();

/**
 * Middleware
 */

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, 'src/views'));

/*** Routes*/

app.get('/', (req, res) => {
    console.log('HOME ROUTE');

    res.render('home', {
        title: 'Home'
    });
});

app.get('/organizations', (req, res) => {
    console.log('ORGANIZATIONS ROUTE');

    res.render('organizations', {
        title: 'Our Partner Organizations'
    });
});

app.get('/projects', (req, res) => {
    console.log('PROJECTS ROUTE');

    res.render('projects', {
        title: 'Service Projects'
    });
});

app.get('/categories', (req, res) => {
    console.log('CATEGORIES ROUTE');

    res.render('categories', {
        title: 'Project Categories'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});