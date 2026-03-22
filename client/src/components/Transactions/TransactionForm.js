import React, { useState, useEffect } from 'react';
import { createTransaction, getCategories } from '../../utils/api';

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category_id: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.categories))
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await createTransaction(form);
      onAdd(res.data.transaction);
      setForm({
        title: '',
        amount: '',
        type: 'expense',
        category_id: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form-card">
      <h3>Add Transaction</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Grocery Shopping"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Notes (optional)</label>
          <input
            type="text"
            name="notes"
            placeholder="Any additional notes"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : '+ Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;