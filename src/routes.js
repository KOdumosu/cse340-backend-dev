import express from 'express';

import {
    showOrganizationsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    getCategories,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    requireLogin,
    requireRole
} from './controllers/users.js';

import {
    showProjectsPage,
    showNewProjectForm
} from './controllers/projects.js';

const router = express.Router();

/* ================= HOME ================= */

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

/* ================= AUTH ================= */

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);

router.get('/logout', processLogout);

/* ================= DASHBOARD ================= */

router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

/* ================= ORGANIZATIONS ================= */

router.get(
    '/organizations',
    showOrganizationsPage
);

router.get(
    '/new-organization',
    requireRole('admin'),
    showNewOrganizationForm
);

router.post(
    '/new-organization',
    requireRole('admin'),
    processNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    requireRole('admin'),
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    processEditOrganizationForm
);

/* ================= PROJECTS ================= */

router.get(
    '/projects',
    showProjectsPage
);

router.get(
    '/new-project',
    requireRole('admin'),
    showNewProjectForm
);

/* ================= CATEGORIES ================= */

router.get(
    '/categories',
    getCategories
);

router.get(
    '/categories/:id',
    showCategoryDetailsPage
);

router.get(
    '/new-category',
    requireRole('admin'),
    showNewCategoryForm
);

router.post(
    '/new-category',
    requireRole('admin'),
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    requireRole('admin'),
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
    requireRole('admin'),
    processEditCategoryForm
);

router.get(
    '/assign-categories/:projectId',
    requireRole('admin'),
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    requireRole('admin'),
    processAssignCategoriesForm
);

export default router;