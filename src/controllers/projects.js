import { getAllProjects } from '../models/projects.js';

export const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Projects',
            projects
        });

    } catch (error) {
        next(error);
    }
};

export const showNewProjectForm = (req, res) => {
    res.render('new-project', {
        title: 'Create New Project'
    });
};