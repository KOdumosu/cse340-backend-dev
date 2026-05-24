const express = require('express');

const { showHomePage } = require('./controllers/index');
const { showOrganizationsPage } = require('./controllers/organizations');
const { showProjectsPage, showProjectDetailsPage } = require('./controllers/projects');

const {
    showCategoriesPage,
    showCategoryDetailsPage
} = require('./controllers/categories');

const { testErrorPage } = require('./controllers/errors');

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/test-error', testErrorPage);

module.exports = router;