
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  date: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: Error | null;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  loading, 
  error 
}) => {
  if (error) {
    return (
      <div className="rounded-lg bg-unicorn-darkPurple p-6 text-center">
        <p className="text-red-400">Error loading transactions: {error.message}</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case 'pending':
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case 'failed':
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      case 'withdrawal':
        return "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30";
      case 'investment':
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case 'profit':
        return "bg-unicorn-gold/20 text-unicorn-gold hover:bg-unicorn-gold/30";
      case 'fee':
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-unicorn-purple/20 bg-unicorn-darkPurple/30">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="rounded-lg border border-unicorn-purple/20 bg-unicorn-darkPurple/30 p-8 text-center">
        <p className="text-gray-400">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-unicorn-purple/20 bg-unicorn-darkPurple/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-unicorn-purple/10">
            <TableHead className="text-unicorn-gold">Date</TableHead>
            <TableHead className="text-unicorn-gold">Description</TableHead>
            <TableHead className="text-unicorn-gold">Type</TableHead>
            <TableHead className="text-unicorn-gold">Amount</TableHead>
            <TableHead className="text-unicorn-gold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-unicorn-purple/10">
              <TableCell className="font-medium text-white">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell className="text-gray-300">
                {transaction.description}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className={transaction.type === 'deposit' || transaction.type === 'profit' ? 'text-green-400' : 'text-white'}>
                {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
