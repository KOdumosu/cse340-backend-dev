require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const db = require('./src/models/db');
const router = require('./src/routes');

const flash = require('./src/middleware/flash.js'); // IMPORTANT: change export style if needed

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * --------------------
 * VIEW ENGINE SETUP
 * --------------------
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

/**
 * --------------------
 * MIDDLEWARES
 * --------------------
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.flash = req.flash ? req.flash.bind(req) : () => ({});
    next();
});
/**
 * SESSION MIDDLEWARE (MUST BE FIRST)
 */
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

/**
 * FLASH MIDDLEWARE (MUST BE AFTER SESSION)
 */
app.use(flash);

/**
 * DEV LOGGER
 */
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

/**
 * GLOBAL VARIABLES
 */
app.use((req, res, next) => {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

/**
 * ROUTES
 */
app.use(router);

/**
 * 404 HANDLER
 */
app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Page Not Found',
        error: 'The page you are looking for does not exist.'
    });
});

/**
 * ERROR HANDLER
 */
app.use((err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);

    const status = err.status || 500;

    res.status(status).render('errors/500', {
        title: 'Server Error',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
});

/**
 * START SERVER
 */
app.listen(PORT, async () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);

    try {
        await db.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (err) {
        console.error('DB connection error:', err.message);
    }
});