import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';

import db from './src/models/db.js';
import router from './src/routes.js';
import flash from './src/middleware/flash.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

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


app.use((req, res, next) => {
    res.locals.isLoggedIn = false;

    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }

    res.locals.user = req.session.user || null;

    next();
}
);

/*** FLASH MIDDLEWARE (MUST BE AFTER SESSION)*/
app.use(flash);

/*** DEV LOGGER*/
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

/*** GLOBAL VARIABLES*/
app.use((req, res, next) => {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

/*** ROUTES*/
app.use(router);

/*** 404 HANDLER*/
app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Page Not Found',
        error: 'The page you are looking for does not exist.'
    });
});

/*** ERROR HANDLER*/
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

/*** START SERVER*/
app.listen(PORT, async () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);

    try {
        await db.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (err) {
        console.error('DB connection error:', err.message);
    }
});