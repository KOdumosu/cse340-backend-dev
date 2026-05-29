const express = require('express');
const router = express.Router();

/**
 * HOME CONTROLLER
 */
const {
    showHomePage
} = require('./controllers/home');

/**
 * ORGANIZATION CONTROLLER
 */
const {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
} = require('./controllers/organizations');

/**
 * PROJECT CONTROLLER
 */
const {
    showProjectsPage,
    showProjectDetailsPage
} = require('./controllers/projects');

/**
 * CATEGORY CONTROLLER
 */
const {
    showCategoriesPage,
    showCategoryDetailsPage
} = require('./controllers/categories');


/**
 * HOME ROUTE
 */
router.get('/', showHomePage);


/**
 * ORGANIZATION ROUTES
 */
router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationForm);

router.post('/new-organization', processNewOrganizationForm);


/**
 * PROJECT ROUTES
 */
router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);


/**
 * CATEGORY ROUTES
 */
router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);


module.exports = router;