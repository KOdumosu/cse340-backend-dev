const {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId,
    createOrganization
} = require('../models/organizations');

/**
 * Show all organizations
 */
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

/**
 * Show one organization details page
 */
const showOrganizationDetailsPage = async (req, res, next) => {

    try {

        const organizationId = req.params.id;

        const organization = await getOrganizationById(
            organizationId
        );

        const projects = await getProjectsByOrganizationId(
            organizationId
        );

        res.render('organization', {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {

        next(error);
    }
};

/**
 * Show new organization form
 */
const showNewOrganizationForm = (req, res) => {
    res.render('new-organization', {
        title: 'New Organization',
        errors: [],
        name: '',
        description: '',
        contact_email: '',
        logo_filename: ''
    });
};
/**
 * Process new organization form
 */
const processNewOrganizationForm = async (
    req,
    res,
    next
) => {

    try {

        const {
            name,
            description,
            contactEmail
        } = req.body;

        const logoFilename = 'placeholder-logo.png';

        const organizationId =
            await createOrganization(
                name,
                description,
                contactEmail,
                logoFilename
            );

        res.redirect(
            `/organization/${organizationId}`
        );

    } catch (error) {

        next(error);
    }
};

module.exports = {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
};