import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>$0.00</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>$0.00</p>
        </div>
        <div className="card">
          <h3>Net Balance</h3>
          <p>$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;