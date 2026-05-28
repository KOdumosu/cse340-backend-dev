const {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} = require('../models/categories');

// Show all categories
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

// Show single category details
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    showCategoriesPage,
    showCategoryDetailsPage
};