import { getCategoriesByProjectId } from '../models/projects.js';
import {
    getAllProjects,
    getProjectDetails
} from '../models/projects.js';

import {
    getAllOrganizations
} from '../models/organizations.js';
/* =========================
   PROJECT LIST PAGE
========================= */
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

/* =========================
   PROJECT DETAILS PAGE
========================= */
export const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render('errors/404', {
                title: 'Project Not Found'
            });
        }

        const categories =
            await getCategoriesByProjectId(projectId);

        res.render('project', {
            title: project.project_name,
            project,
            categories
        });

    } catch (error) {
        next(error);
    }
};

/* =========================
   NEW PROJECT FORM
========================= */
export const showNewProjectForm = (req, res) => {
    res.render('new-project', {
        title: 'Create New Project'
    });
};

/* =========================
   EDIT PROJECT FORM
========================= */
export const showEditProjectForm = async (req, res, next) => {
    try {

        const project = await getProjectDetails(req.params.id);

        const organizations = await getAllOrganizations();

        res.render('edit-project', {
            title: 'Edit Project',
            project,
            organizations,
            errors: []
        });

    } catch (error) {
        next(error);
    }
};

/* =========================
   PROCESS EDIT PROJECT
========================= */
export const processEditProjectForm = async (req, res, next) => {
    try {

        // Placeholder until updateProject() exists
        req.flash('success', 'Project updated successfully');

        res.redirect('/projects');

    } catch (error) {
        next(error);
    }
};