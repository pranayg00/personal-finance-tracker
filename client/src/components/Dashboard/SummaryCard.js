import React from 'react';

const SummaryCard = ({ title, amount, type }) => {
  const colorMap = {
    income: '#22c55e',
    expense: '#ef4444',
    balance: '#6366f1',
  };

  const formatAmount = (val) => {
    const num = parseFloat(val) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  return (
    <div className="summary-card" style={{ borderTop: `4px solid ${colorMap[type]}` }}>
      <p className="card-title">{title}</p>
      <h3 className="card-amount" style={{ color: colorMap[type] }}>
        {formatAmount(amount)}
      </h3>
    </div>
  );
};

export default SummaryCard;