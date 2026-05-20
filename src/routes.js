const express = require('express');

const { showHomePage } = require('./controllers/index');
const { showOrganizationsPage } = require('./controllers/organizations');
const { showProjectsPage } = require('./controllers/projects');
const { showCategoriesPage } = require('./controllers/categories');
const { testErrorPage } = require('./controllers/errors');

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/test-error', testErrorPage);

module.exports = router;