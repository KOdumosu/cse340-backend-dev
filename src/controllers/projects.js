const {
  getAllProjects,
  getProjectDetails,
  getCategoriesByProjectId,
  createProject,
  updateProject
} = require('../models/projects');

const {
  getAllCategories
} = require('../models/categories');

const {
  getAllOrganizations
} = require('../models/organizations');


/* ----------------- LIST ----------------- */
const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getAllProjects();

    res.render('projects', {
      title: 'Projects',
      projects
    });
  } catch (err) {
    next(err);
  }
};


/* ----------------- DETAILS ----------------- */
const showProjectDetailsPage = async (req, res, next) => {
  try {
    const project = await getProjectDetails(req.params.id);
    const categories = await getCategoriesByProjectId(req.params.id);

    res.render('project', {
      title: project.project_name,
      project,
      categories
    });
  } catch (err) {
    next(err);
  }
};


/* ----------------- NEW FORM ----------------- */
const showNewProjectForm = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    const organizations = await getAllOrganizations();

    res.render("new-project", {
      title: "Add New Project",
      errors: [],
      project_name: "",
      description: "",
      organization_id: "",
      categories,
      organizations
    });
  } catch (error) {
    next(error);
  }
};


/* ----------------- PROCESS NEW ----------------- */
const processNewProjectForm = async (req, res, next) => {
  try {
    const { project_name, description, organization_id } = req.body;

    const errors = [];

    if (!project_name) {
      errors.push("Project name is required");
    }

    if (errors.length > 0) {
      const categories = await getAllCategories();
      const organizations = await getAllOrganizations();

      return res.render("new-project", {
        title: "Add New Project",
        errors,
        project_name,
        description,
        organization_id,
        categories,
        organizations
      });
    }

    const id = await createProject(
      project_name,
      description,
      organization_id
    );

    res.redirect(`/project/${id}`);
  } catch (err) {
    next(err);
  }
};


/* ----------------- EDIT FORM ----------------- */
const showEditProjectForm = async (req, res, next) => {
  try {
    const project = await getProjectDetails(req.params.id);

    const organizations = await getAllOrganizations();

    res.render("edit-project", {
      title: "Edit Project",
      project,
      organizations,
      errors: []
    });

  } catch (err) {
    next(err);
  }
};


/* ----------------- PROCESS EDIT ----------------- */
const processEditProjectForm = async (req, res, next) => {
  try {
    const { project_name, description, organization_id } = req.body;

    await updateProject(
      req.params.id,
      project_name,
      description,
      organization_id
    );

    res.redirect(`/project/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm
};