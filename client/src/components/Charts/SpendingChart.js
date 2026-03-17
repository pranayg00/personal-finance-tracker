import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SpendingChart = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (tx.type === 'income') acc[month].income += parseFloat(tx.amount);
    if (tx.type === 'expense') acc[month].expense += parseFloat(tx.amount);
    return acc;
  }, {});

  const data = Object.values(monthlyData);

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3>Monthly Overview</h3>
        <p className="empty-state">No data yet to display chart.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;