const express = require('express');
const router = express.Router();

/*** HOME CONTROLLER*/
const {
  showHomePage
} = require('./controllers/home');

/***----------ORGANIZATION CONTROLLER-------*/
const {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm
} = require('./controllers/organizations');

/***--------- PROJECT CONTROLLER--------*/
const {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm
} = require('./controllers/projects');

/***---------CATEGORY CONTROLLER---------*/
const {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm
} = require('./controllers/categories');


/* =========================HOME ROUTE========================= */
router.get('/', showHomePage);


/* =========================ORGANIZATION ROUTES======================== */

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationForm);

router.post('/new-organization', processNewOrganizationForm);

/* ---------------EDIT ORGANIZATION------------------- */
router.get('/edit-organization/:id', showEditOrganizationForm);

router.post('/edit-organization/:id', processEditOrganizationForm);


/* =========================PROJECT ROUTES========================= */

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

/*--------------- NEW PROJECT------------- */
router.get('/new-project', showNewProjectForm);

router.post('/new-project', processNewProjectForm);

/*---------- EDIT PROJECT----------- */
router.get('/edit-project/:id', showEditProjectForm);

router.post('/edit-project/:id',processEditProjectForm);


/* =========================  CATEGORY ROUTES========================= */

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

/* NEW CATEGORY */
router.get('/new-category', showNewCategoryForm);

router.post('/new-category', processNewCategoryForm);

/* EDIT CATEGORY */
router.get('/edit-category/:id', showEditCategoryForm);

router.post('/edit-category/:id',processEditCategoryForm);


module.exports = router;