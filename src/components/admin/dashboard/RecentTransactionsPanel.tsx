
import { Button, Card, CardContent } from "@/components/admin/AdminImports";
import { TransactionItem } from "@/types/admin";
import { formatCurrency } from "@/utils/investmentUtils";

interface RecentTransactionsPanelProps {
  transactions: TransactionItem[];
  loading: boolean;
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
}

const RecentTransactionsPanel = ({ 
  transactions, 
  loading, 
  onApproveWithdrawal, 
  onRejectWithdrawal 
}: RecentTransactionsPanelProps) => {
  return (
    <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
        
        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-400">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-400">No recent transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">{transaction.user_id.substring(0, 8)}...</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white">{formatCurrency(transaction.amount)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : transaction.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {transaction.type === 'withdrawal' && transaction.status === 'pending' && (
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-400 hover:bg-green-500/20"
                            onClick={() => onApproveWithdrawal(transaction.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-400 hover:bg-red-500/20"
                            onClick={() => onRejectWithdrawal(transaction.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-4 text-right">
          <Button 
            variant="outline" 
            className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/20"
            asChild
          >
            <a href="/admin/transactions">View All Transactions</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsPanel;
