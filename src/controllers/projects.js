import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });

    } catch (error) {
        next(error);
    }
};

export { showProjectsPage };