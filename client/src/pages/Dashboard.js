import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SummaryCard from '../components/Dashboard/SummaryCard';
import SpendingChart from '../components/Charts/SpendingChart';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import useTransactions from '../hooks/useTransactions';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { summary, transactions, loading, error } = useTransactions();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>💰 Finance Tracker</h1>
        <div className="header-right">
          <span>Hello, {user?.name} 👋</span>
          <button onClick={() => navigate('/transactions')} className="nav-btn">Transactions</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <h2>This Month's Overview</h2>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="summary-cards">
              <SummaryCard title="Total Income" amount={summary.total_income} type="income" />
              <SummaryCard title="Total Expenses" amount={summary.total_expenses} type="expense" />
              <SummaryCard title="Net Balance" amount={summary.net_balance} type="balance" />
            </div>
            <div className="charts-grid">
              <SpendingChart transactions={transactions} />
              <CategoryPieChart transactions={transactions} />
            </div>
            <div className="recent-transactions">
              <h2>Recent Transactions</h2>
              {transactions.length === 0 ? (
                <p className="empty-state">No transactions yet. Start by adding one!</p>
              ) : (
                <ul className="transaction-list">
                  {transactions.slice(0, 5).map((tx) => (
                    <li key={tx.id} className="transaction-item">
                      <div className="tx-info">
                        <span className="tx-title">{tx.title}</span>
                        <span className="tx-date">{new Date(tx.date).toLocaleDateString()}</span>
                      </div>
                      <span className={`tx-amount ${tx.type}`}>
                        {tx.type === 'expense' ? '-' : '+'}${parseFloat(tx.amount).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;