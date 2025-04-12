
import { useState, useEffect } from 'react';
import { useDashboardStats } from './useDashboardStats';
import { useRecentTransactions } from './useRecentTransactions';

export const useDashboardData = () => {
  const { 
    loading: statsLoading, 
    stats, 
    chartData, 
    fetchDashboardStats 
  } = useDashboardStats();
  
  const { 
    loading: transactionsLoading, 
    recentTransactions, 
    fetchRecentTransactions 
  } = useRecentTransactions();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(statsLoading || transactionsLoading);
  }, [statsLoading, transactionsLoading]);

  const fetchDashboardData = () => {
    fetchDashboardStats();
    fetchRecentTransactions();
  };

  return {
    loading,
    stats,
    recentTransactions,
    chartData,
    fetchDashboardData
  };
};
