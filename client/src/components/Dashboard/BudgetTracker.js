import React, { useState, useEffect } from 'react';
import { getCategories } from '../../utils/api';

const BudgetTracker = ({ transactions }) => {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {};
  });
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.categories))
      .catch(() => setCategories([]));
  }, []);

  const getSpent = (categoryName) => {
    return transactions
      .filter((tx) => tx.type === 'expense' && tx.category_name === categoryName)
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  };

  const handleSaveBudget = (categoryName) => {
    const updated = { ...budgets, [categoryName]: parseFloat(inputValue) || 0 };
    setBudgets(updated);
    localStorage.setItem('budgets', JSON.stringify(updated));
    setEditing(null);
    setInputValue('');
  };

  const getPercentage = (spent, budget) => {
    if (!budget) return 0;
    return Math.min((spent / budget) * 100, 100);
  };

  const getBarColor = (percent) => {
    if (percent >= 90) return '#ef4444';
    if (percent >= 70) return '#f59e0b';
    return '#22c55e';
  };

  if (categories.length === 0) {
    return (
      <div className="chart-card">
        <h3>Budget Tracker</h3>
        <p className="empty-state">No categories yet. Add categories to track budgets.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>Budget Tracker</h3>
      <div className="budget-list">
        {categories.map((cat) => {
          const spent = getSpent(cat.name);
          const budget = budgets[cat.name] || 0;
          const percent = getPercentage(spent, budget);
          const barColor = getBarColor(percent);

          return (
            <div key={cat.id} className="budget-item">
              <div className="budget-header">
                <span className="budget-name">
                  <span
                    className="budget-dot"
                    style={{ backgroundColor: cat.color || '#6366f1' }}
                  />
                  {cat.name}
                </span>
                {editing === cat.name ? (
                  <div className="budget-edit">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Set budget"
                      min="0"
                    />
                    <button onClick={() => handleSaveBudget(cat.name)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <span
                    className="budget-amount"
                    onClick={() => { setEditing(cat.name); setInputValue(budget); }}
                  >
                    ${spent.toFixed(2)} / {budget ? `$${budget}` : 'Set budget'}
                  </span>
                )}
              </div>
              <div className="budget-bar-bg">
                <div
                  className="budget-bar-fill"
                  style={{ width: `${percent}%`, backgroundColor: barColor }}
                />
              </div>
              {percent >= 90 && budget > 0 && (
                <p className="budget-warning">⚠️ Near or over budget!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;