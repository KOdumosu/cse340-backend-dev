const {
    getAllProjects,
    getProjectDetails,
    getCategoriesByProjectId
} = require('../models/projects');

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Our Service Projects',
            projects
        });

    } catch (error) {
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);

        const categories = await getCategoriesByProjectId(projectId);

        res.render('project', {
            title: project.project_name,
            project,
            categories
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    showProjectsPage,
    showProjectDetailsPage
};