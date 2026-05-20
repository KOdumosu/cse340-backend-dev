require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./src/models/db');
const router = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// static
console.log('router:', router);
app.use(express.static(path.join(__dirname, 'public')));

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// middleware
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

app.use((req, res, next) => {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

// ✅ MVC ROUTES HERE
app.use(router);

// 404
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    res.status(status).render(`errors/${template}`, {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    });
});

// start
app.listen(PORT, async () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);

    try {
        await db.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (err) {
        console.error('DB connection error:', err.message);
    }
});