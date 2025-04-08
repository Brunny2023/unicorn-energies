
import { 
  Button,
  Card, 
  CardContent,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Clock,
  ExternalLink,
  LineChart
} from "@/components/admin/AdminImports";
import { TransactionItem } from "@/types/admin";
import { formatCurrency } from "@/utils/investmentUtils";

interface TransactionsTableProps {
  transactions: TransactionItem[];
  loading: boolean;
}

const TransactionsTable = ({ transactions, loading }: TransactionsTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case "investment":
        return <LineChart className="h-4 w-4 text-blue-500" />;
      case "credit":
        return <CircleDollarSign className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return "bg-green-900/30 text-green-400";
      case "withdrawal":
        return "bg-red-900/30 text-red-400";
      case "investment":
        return "bg-blue-900/30 text-blue-400";
      case "credit":
        return "bg-purple-900/30 text-purple-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead className="bg-unicorn-darkPurple/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Transaction</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-unicorn-gold/20">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-700/50 rounded w-20"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-700/50 rounded w-40"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 bg-gray-700/50 rounded w-20"></div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="h-4 bg-gray-700/50 rounded ml-auto w-24"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-700/50 rounded w-16"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-700/50 rounded w-32"></div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="h-8 bg-gray-700/50 rounded w-8 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-unicorn-darkPurple/30">
                    <td className="px-4 py-4">
                      <div className="text-white font-mono text-xs">
                        #{transaction.id.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-white">
                          {transaction.user?.full_name || "No Name"}
                        </div>
                        <div className="text-xs text-gray-400">{transaction.user?.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                          transaction.type
                        )}`}
                      >
                        {getTransactionIcon(transaction.type)}
                        <span className="ml-1 capitalize">{transaction.type}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      <span className={transaction.type === "withdrawal" ? "text-red-400" : "text-green-400"}>
                        {transaction.type === "withdrawal" ? "-" : "+"}${formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`capitalize ${getTransactionStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-unicorn-gold"
                        title="View details"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    No transactions found
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

export default TransactionsTable;
