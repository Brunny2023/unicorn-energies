
import React from 'react';
import TransactionsPanel from '../TransactionsPanel';
import RecentActivities from '../RecentActivities';
import { Transaction } from '@/hooks/useTransactions';

interface ActivitySectionProps {
  loading: boolean;
  transactions: Transaction[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ 
  loading, 
  transactions 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TransactionsPanel 
        loading={loading}
        transactions={transactions}
      />
      <RecentActivities />
    </div>
  );
};

export default ActivitySection;
