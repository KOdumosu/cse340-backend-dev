require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./src/models/db');
const router = require('./src/routes');

const app = express();

const PORT = process.env.PORT || 3000;

/*** Middleware ***/

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware: log requests
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Middleware: expose NODE_ENV to templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

/*** ROUTES (MVC CORE FIX) ***/
app.use(router);

/*** 404 Catch-all ***/
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

/*** GLOBAL ERROR HANDLER ***/
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error(err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    res.status(status).render(`errors/${template}`, {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    });
});

/*** START SERVER ***/
app.listen(PORT, async () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);

    try {
        await db.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
});