
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, User, UserPlus, DollarSign, Clock } from "lucide-react";

interface AffiliateStatsProps {
  loading: boolean;
  stats: {
    pendingRewards: number;
    totalEarned: number;
    level1Count: number;
    level2Count: number;
    level3Count: number;
  };
}

const AffiliateStats = ({ loading, stats }: AffiliateStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Direct Referrals</CardTitle>
          <User className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.level1Count}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Level 2 Referrals</CardTitle>
          <UserPlus className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.level2Count}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Level 3 Referrals</CardTitle>
          <Users className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">{stats.level3Count}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Pending Rewards</CardTitle>
          <Clock className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">${stats.pendingRewards.toLocaleString()}</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-unicorn-gold">Total Earned</CardTitle>
          <DollarSign className="h-4 w-4 text-unicorn-gold" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20 bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-white">${stats.totalEarned.toLocaleString()}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateStats;
