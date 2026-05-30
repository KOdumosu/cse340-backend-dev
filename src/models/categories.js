const db = require("./db")

async function getAllCategories() {
  const result = await db.query(
    "SELECT * FROM categories ORDER BY category_name"
  )
  return result.rows
}

async function getCategoryById(id) {
  const result = await db.query(
    "SELECT * FROM categories WHERE category_id = $1",
    [id]
  )

  return result.rows[0]
}

async function createCategory(categoryName) {
  const result = await db.query(
    `INSERT INTO categories (category_name)
     VALUES ($1)
     RETURNING *`,
    [categoryName]
  )

  return result.rows[0]
}

async function updateCategory(id, categoryName) {
  const result = await db.query(
    `UPDATE categories
     SET category_name = $1
     WHERE category_id = $2
     RETURNING *`,
    [categoryName, id]
  )

  return result.rows[0]
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory
}