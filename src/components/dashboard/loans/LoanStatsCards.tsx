
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCheck, Clock, Ban, DollarSign } from "lucide-react";

interface LoanStatsCardsProps {
  loading: boolean;
  stats: {
    pending: number;
    approved: number;
    rejected: number;
    totalApproved: number;
  };
}

const LoanStatsCards = ({ loading, stats }: LoanStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Pending Applications</CardTitle>
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
          <CardTitle className="text-sm font-medium text-unicorn-gold">Approved Applications</CardTitle>
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
          <CardTitle className="text-sm font-medium text-unicorn-gold">Rejected Applications</CardTitle>
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
          <CardTitle className="text-sm font-medium text-unicorn-gold">Total Approved</CardTitle>
          <DollarSign className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">${stats.totalApproved.toLocaleString()}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanStatsCards;
