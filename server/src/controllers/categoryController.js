const pool = require('../config/db');

// @GET /api/categories
const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY name ASC',
      [req.user.id]
    );
    res.json({ categories: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @POST /api/categories
const createCategory = async (req, res) => {
  const { name, type, color, icon } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO categories (user_id, name, type, color, icon)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.id, name, type, color, icon]
    );
    res.status(201).json({ category: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @PUT /api/categories/:id
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, color, icon } = req.body;
  try {
    const result = await pool.query(
      `UPDATE categories SET name=$1, color=$2, icon=$3
       WHERE id=$4 AND user_id=$5 RETURNING *`,
      [name, color, icon, id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ category: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM categories WHERE id=$1 AND user_id=$2 RETURNING id',
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };