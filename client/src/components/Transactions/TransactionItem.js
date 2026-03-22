import React from 'react';
import { deleteTransaction } from '../../utils/api';

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, title, amount, type, date, category_name, category_color } = transaction;

  const handleDelete = async () => {
    if (window.confirm('Delete this transaction?')) {
      try {
        await deleteTransaction(id);
        onDelete(id);
      } catch (err) {
        alert('Failed to delete transaction');
      }
    }
  };

  return (
    <li className="transaction-item">
      <div className="tx-category-dot" style={{ backgroundColor: category_color || '#6366f1' }} />
      <div className="tx-info">
        <span className="tx-title">{title}</span>
        <span className="tx-meta">
          {category_name || 'Uncategorized'} • {new Date(date).toLocaleDateString()}
        </span>
      </div>
      <div className="tx-right">
        <span className={`tx-amount ${type}`}>
          {type === 'expense' ? '-' : '+'}${parseFloat(amount).toFixed(2)}
        </span>
        <button className="delete-btn" onClick={handleDelete}>✕</button>
      </div>
    </li>
  );
};

export default TransactionItem;