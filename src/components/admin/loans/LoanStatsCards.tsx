
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Files, ClipboardCheck, Clock, Ban, DollarSign } from "lucide-react";

interface LoanStatsCardsProps {
  loading: boolean;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    totalAmount: number;
  };
}

const LoanStatsCards = ({ loading, stats }: LoanStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Total Applications</CardTitle>
          <Files className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Pending</CardTitle>
          <Clock className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.pending}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Approved</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.approved}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Rejected</CardTitle>
          <Ban className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.rejected}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Total Amount</CardTitle>
          <DollarSign className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">${stats.totalAmount.toLocaleString()}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanStatsCards;
