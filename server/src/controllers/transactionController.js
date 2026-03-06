const pool = require('../config/db');

// @GET /api/transactions
const getTransactions = async (req, res) => {
  const { type, category_id, start_date, end_date, limit = 50, offset = 0 } = req.query;
  try {
    let query = `
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = $1
    `;
    const params = [req.user.id];
    let paramIndex = 2;

    if (type) {
      query += ` AND t.type = $${paramIndex++}`;
      params.push(type);
    }
    if (category_id) {
      query += ` AND t.category_id = $${paramIndex++}`;
      params.push(category_id);
    }
    if (start_date) {
      query += ` AND t.date >= $${paramIndex++}`;
      params.push(start_date);
    }
    if (end_date) {
      query += ` AND t.date <= $${paramIndex++}`;
      params.push(end_date);
    }

    query += ` ORDER BY t.date DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    res.json({ transactions: result.rows, count: result.rows.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @POST /api/transactions
const createTransaction = async (req, res) => {
  const { title, amount, type, category_id, date, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transactions (user_id, title, amount, type, category_id, date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.id, title, amount, type, category_id, date, notes]
    );
    res.status(201).json({ transaction: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, category_id, date, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE transactions
       SET title=$1, amount=$2, type=$3, category_id=$4, date=$5, notes=$6
       WHERE id=$7 AND user_id=$8 RETURNING *`,
      [title, amount, type, category_id, date, notes, id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ transaction: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id=$1 AND user_id=$2 RETURNING id',
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @GET /api/transactions/summary
const getSummary = async (req, res) => {
  const { month, year } = req.query;
  try {
    const result = await pool.query(
      `SELECT
        SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as total_expenses,
        SUM(CASE WHEN type='income' THEN amount ELSE -amount END) as net_balance
       FROM transactions
       WHERE user_id=$1
       AND EXTRACT(MONTH FROM date)=$2
       AND EXTRACT(YEAR FROM date)=$3`,
      [req.user.id, month, year]
    );
    res.json({ summary: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
};