const {
    getAllCategories,
    getCategoryById,
    categoryModel,
    getProjectsByCategoryId
} = require('../models/categories');


const showNewCategoryForm = (req, res) => {
  res.render("new-category", {
    title: "New Category",
    errors: []
  })
}

/**process category form */
const processNewCategoryForm = async (req, res) => {
  const { category_name } = req.body
  const errors = []

  if (!category_name)
    errors.push("Category name is required.")

  if (category_name.length > 100)
    errors.push("Category name must be less than 100 characters.")

  if (category_name.length < 3)
    errors.push("Category name must be at least 3 characters.")

  if (errors.length > 0) {
    return res.render("new-category", {
      title: "New Category",
      errors,
      category_name
    })
  }

  await categoryModel.createCategory(category_name)

  res.redirect("/categories")
}

const showEditCategoryForm = async (req, res) => {
  const category = await categoryModel.getCategoryById(
    req.params.id
  )

  res.render("edit-category", {
    title: "Edit Category",
    category,
    errors: []
  })
}


const processEditCategoryForm = async (req, res) => {
  const { category_name } = req.body
  const id = req.params.id

  const errors = []

  if (!category_name)
    errors.push("Category name is required.")

  if (category_name.length > 100)
    errors.push("Category name must be less than 100 characters.")

  if (category_name.length < 3)
    errors.push("Category name must be at least 3 characters.")

  if (errors.length > 0) {
    return res.render("edit-category", {
      title: "Edit Category",
      category: {
        category_id: id,
        category_name
      },
      errors
    })
  }

  await categoryModel.updateCategory(
    id,
    category_name
  )

  res.redirect("/categories")
}
/*** Show all categories*/
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


/**
 * Show single category details
 */
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


module.exports = {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};

