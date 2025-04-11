
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WithdrawalHistoryItem {
  id: string;
  date: Date;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
}

interface WithdrawalHistoryProps {
  history: WithdrawalHistoryItem[];
  loading?: boolean;
}

const WithdrawalHistory: React.FC<WithdrawalHistoryProps> = ({ history, loading = false }) => {
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'completed':
          return 'bg-green-500/20 text-green-500';
        case 'pending':
          return 'bg-yellow-500/20 text-yellow-500';
        case 'processing':
          return 'bg-blue-500/20 text-blue-500';
        case 'rejected':
          return 'bg-red-500/20 text-red-500';
        default:
          return 'bg-gray-500/20 text-gray-500';
      }
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor()}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Withdrawal History</CardTitle>
        <CardDescription className="text-gray-400">
          Your recent withdrawal requests and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-unicorn-gold/20">
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Fee</th>
                <th className="px-4 py-3 text-left">Net Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton loading state
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-unicorn-gold/10">
                    <td className="px-4 py-3"><div className="h-4 bg-unicorn-gold/10 rounded w-24 animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 bg-unicorn-gold/10 rounded w-28 animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 bg-unicorn-gold/10 rounded w-20 animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 bg-unicorn-gold/10 rounded w-16 animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 bg-unicorn-gold/10 rounded w-20 animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 bg-unicorn-gold/10 rounded w-24 animate-pulse"></div></td>
                  </tr>
                ))
              ) : history.length > 0 ? (
                // Show actual data
                history.map((item) => (
                  <tr key={item.id} className="border-b border-unicorn-gold/10 hover:bg-unicorn-purple/10">
                    <td className="px-4 py-3 text-white">
                      {item.date.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-mono">{item.id}</td>
                    <td className="px-4 py-3 text-white">${item.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-red-400">${item.fee.toLocaleString()}</td>
                    <td className="px-4 py-3 text-unicorn-gold">${item.netAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))
              ) : (
                // Empty state
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No withdrawal history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WithdrawalHistory;
