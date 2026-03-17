import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899'];

const CategoryPieChart = ({ transactions }) => {
  const categoryData = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      const name = tx.category_name || 'Uncategorized';
      if (!acc[name]) acc[name] = { name, value: 0 };
      acc[name].value += parseFloat(tx.amount);
      return acc;
    }, {});

  const data = Object.values(categoryData);

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3>Expenses by Category</h3>
        <p className="empty-state">No expense data yet.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;