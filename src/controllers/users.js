import bcrypt from 'bcrypt';
import {
    createUser,
    authenticateUser,
    getAllUsers
} from '../models/users.js';

import {
    getUserVolunteerProjects
}
from '../models/volunteers.js';

/* ---------------- REGISTER ---------------- */

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        await createUser(name, email, passwordHash);

        req.flash('success', 'Registration successful! Please login.');
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Registration failed');
        res.redirect('/register');
    }
};

/* ---------------- LOGIN ---------------- */

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);

        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        req.session.user = user;
        console.log(req.session.user);
        req.flash('success', 'Login successful!');
        console.log('User logged in:', user);

        return res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Login error');
        res.redirect('/login');
    }
};

/** ------USERS PAGE-------*/
const showUsersPage = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        res.render('users', {
            title: 'Users',
            users
        });

    } catch (error) {
        next(error);
    }
};

/* ---------------- LOGOUT ---------------- */

const processLogout = (req, res) => {
    req.session.destroy(() => {
        req.flash('success', 'Logged out successfully');
        res.redirect('/login');
    });
};

/* ---------------- DASHBOARD ---------------- */

const showDashboard = async (req, res) => {

    const user = req.session.user;

    const volunteerProjects =
        await getUserVolunteerProjects(
            user.user_id
        );

    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        volunteerProjects
    });
};
/* ---------------- PROTECTED MIDDLEWARE ---------------- */

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    next();
};

/*** ROLE MIDDLEWARE (ADMIN PROTECTION)*/
const requireRole = (role) => {
    return (req, res, next) => {

        console.log('Required Role:', role);
        console.log('User Session:', req.session.user);

        if (!req.session || !req.session.user) {
            req.flash('error', 'Login required');
            return res.redirect('/login');
        }

        if (req.session.user.role_name !== role) {
    return res.status(403).render('errors/403', {
        title: 'Access Denied'
        });
     }
        console.log('ROLE CHECK PASSED');

        next();
    };
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    showUsersPage,
    requireLogin,
    requireRole
};