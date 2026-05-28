const express = require('express');
const router = express.Router();

const {
    showHomePage
} = require('./controllers/home');

const {
    showOrganizationsPage,
    showOrganizationDetailsPage
} = require('./controllers/organizations');

const {
    showProjectsPage,
    showProjectDetailsPage
} = require('./controllers/projects');

const {
    showCategoriesPage,
    showCategoryDetailsPage
} = require('./controllers/categories');

// Home
router.get('/', showHomePage);

// Organizations
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Projects
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Categories
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

module.exports = router;