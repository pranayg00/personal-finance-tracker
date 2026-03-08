import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TransactionItem from '../components/Transactions/TransactionItem';
import TransactionForm from '../components/Transactions/TransactionForm';
import useTransactions from '../hooks/useTransactions';

const Transactions = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const { transactions, setTransactions, loading, error, refetch } = useTransactions();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAdd = (newTransaction) => {
    refetch();
  };

  const handleDelete = (id) => {
    refetch();
  };

  const filtered = filter === 'all'
    ? transactions
    : transactions.filter((tx) => tx.type === filter);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>💰 Finance Tracker</h1>
        <div className="header-right">
          <button onClick={() => navigate('/dashboard')} className="nav-btn">Dashboard</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <TransactionForm onAdd={handleAdd} />

        <div className="transactions-header">
          <h2>All Transactions</h2>
          <div className="filter-buttons">
            {['all', 'income', 'expense'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading transactions...</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">No transactions found.</p>
        ) : (
          <ul className="transaction-list">
            {filtered.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Transactions;