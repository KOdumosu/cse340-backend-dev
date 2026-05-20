import { getAllOrganizations } from '../models/organizations.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render('organizations', {
        title: 'Our Partner Organizations',
        organizations
    });
};

export { showOrganizationsPage };