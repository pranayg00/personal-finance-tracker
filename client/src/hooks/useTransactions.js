import { useState, useEffect } from 'react';
import { getTransactions, getTransactionSummary } from '../utils/api';

const useTransactions = (filters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expenses: 0,
    net_balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentDate = new Date();
  const month = filters.month || currentDate.getMonth() + 1;
  const year = filters.year || currentDate.getFullYear();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txRes, summaryRes] = await Promise.all([
        getTransactions(filters),
        getTransactionSummary({ month, year }),
      ]);
      setTransactions(txRes.data.transactions);
      setSummary(summaryRes.data.summary);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.month, filters.year, filters.type]);

  return { transactions, summary, loading, error, refetch: fetchData };
};

export default useTransactions;