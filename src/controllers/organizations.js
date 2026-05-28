const {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
} = require('../models/organizations');

// Show all organizations
const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Show single organization details
const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const organization = await getOrganizationById(organizationId);

        const projects = await getProjectsByOrganizationId(organizationId);

        res.render('organization', {
            title: organization.name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    showOrganizationsPage,
    showOrganizationDetailsPage
};