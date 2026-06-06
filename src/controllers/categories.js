
import { getProjectDetails } from '../models/projects.js';

import {
    getAllCategories,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    getCategoryById,
    createCategory,
    updateCategory,
    getProjectsByCategoryId
} from '../models/categories.js';

/* -------------------------
   GET ALL CATEGORIES PAGE
--------------------------*/
const getCategories = async (req, res) => {
    const categories = await getAllCategories();

    res.render('categories', {
        title: 'Categories',
        categories
    });
};

/* -------------------------
   ASSIGN CATEGORIES FORM
--------------------------*/
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
   const assignedCategories = await getCategoriesByProjectId(projectId);

    res.render('assign-categories', {
        title: 'Assign Categories to Project',
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

/* -------------------------
   PROCESS ASSIGN FORM
--------------------------*/
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    let categoryIds = req.body.categoryIds || [];

    if (!Array.isArray(categoryIds)) {
        categoryIds = [categoryIds];
    }

    await updateCategoryAssignments(projectId, categoryIds);

    req.flash('success', 'Categories updated successfully');
    res.redirect(`/project/${projectId}`);
};

/* -------------------------
   NEW CATEGORY FORM
--------------------------*/
const showNewCategoryForm = (req, res) => {
    res.render("new-category", {
        title: "New Category",
        errors: [],
        category_name: ""
    });
};

/* -------------------------
   CREATE CATEGORY
--------------------------*/
const processNewCategoryForm = async (req, res) => {
    const { category_name } = req.body;
    const errors = [];

    if (!category_name) errors.push("Category name is required.");
    if (category_name && category_name.length > 100)
        errors.push("Category name must be less than 100 characters.");
    if (category_name && category_name.length < 3)
        errors.push("Category name must be at least 3 characters.");

    if (errors.length > 0) {
        return res.render("new-category", {
            title: "New Category",
            errors,
            category_name
        });
    }

    await createCategory(category_name);

    res.redirect("/categories");
};

/* -------------------------
   EDIT CATEGORY FORM
--------------------------*/
const showEditCategoryForm = async (req, res) => {
    const category = await getCategoryById(req.params.id);

    res.render("edit-category", {
        title: "Edit Category",
        category,
        errors: []
    });
};

/* -------------------------
   UPDATE CATEGORY
--------------------------*/
const processEditCategoryForm = async (req, res) => {
    const { category_name } = req.body;
    const id = req.params.id;

    const errors = [];

    if (!category_name) errors.push("Category name is required.");
    if (category_name && category_name.length > 100)
        errors.push("Category name must be less than 100 characters.");
    if (category_name && category_name.length < 3)
        errors.push("Category name must be at least 3 characters.");

    if (errors.length > 0) {
        return res.render("edit-category", {
            title: "Edit Category",
            category: {
                category_id: id,
                category_name
            },
            errors
        });
    }

    await updateCategory(id, category_name);

    res.redirect("/categories");
};

/* -------------------------
   CATEGORIES LIST PAGE
--------------------------*/
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Categories',
            categories
        });
    } catch (error) {
        next(error);
    }
};
/* -------------------------
   CATEGORY DETAILS PAGE
--------------------------*/
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);
        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.category_name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};


export {
    getCategories,
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};
