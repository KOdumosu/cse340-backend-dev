import * as organizationModel from "../models/organizations.js";

/*** GET /organizations*/
const showOrganizationsPage = async (req, res, next) => {
  try {
    const organizations = await organizationModel.getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /organization/:id
 */
const showOrganizationDetailsPage = async (req, res, next) => {
  try {
    const organizationId = req.params.id;

    const organization =
      await organizationModel.getOrganizationById(organizationId);

    const projects =
      await organizationModel.getProjectsByOrganizationId(organizationId);

    res.render("organization", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /new-organization
 */
const showNewOrganizationForm = (req, res) => {
  res.render("new-organization", {
    title: "Create Organization",
    errors: [],
    organization: {},
  });
};

/**
 * POST /new-organization
 */
const processNewOrganizationForm = async (req, res, next) => {
  try {
    const { name, description, contact_email, logo_filename } = req.body;

    const errors = [];

    if (!name) errors.push("Organization name is required");

    if (errors.length > 0) {
      return res.render("new-organization", {
        title: "Create Organization",
        errors,
        organization: req.body,
      });
    }

    await organizationModel.createOrganization(
      name,
      description,
      contact_email,
      logo_filename
    );

    res.redirect("/organizations");
  } catch (error) {
    next(error);
  }
};

/**
 * GET /edit-organization/:id
 */
const showEditOrganizationForm = async (req, res, next) => {
  try {
    const organization =
      await organizationModel.getOrganizationById(req.params.id);

    res.render("edit-organization", {
      title: "Edit Organization",
      organization,
      errors: [],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /edit-organization/:id
 */
const processEditOrganizationForm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, contact_email, logo_filename } = req.body;

    const errors = [];

    if (!name) errors.push("Organization name is required");

    if (errors.length > 0) {
      return res.render("edit-organization", {
        title: "Edit Organization",
        organization: {
          organization_id: id,
          name,
          description,
          contact_email,
          logo_filename,
        },
        errors,
      });
    }

    await organizationModel.updateOrganization(
      id,
      name,
      description,
      contact_email,
      logo_filename
    );

    res.redirect("/organizations");
  } catch (error) {
    next(error);
  }
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm
};