
import { AffiliateReward } from "@/types/investment";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistanceToNow } from "date-fns";

interface AffiliateRewardsTableProps {
  rewards: AffiliateReward[];
  loading: boolean;
}

const AffiliateRewardsTable = ({ rewards, loading }: AffiliateRewardsTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "processed":
        return <Badge className="bg-green-500 hover:bg-green-600">Processed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getLevelBadge = (level: number) => {
    switch (level) {
      case 1:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Level 1 (5%)</Badge>;
      case 2:
        return <Badge className="bg-purple-500 hover:bg-purple-600">Level 2 (2%)</Badge>;
      case 3:
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">Level 3 (1%)</Badge>;
      default:
        return <Badge>Level {level}</Badge>;
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Reward History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
          </div>
        ) : rewards.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">You haven't earned any affiliate rewards yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-unicorn-gold/30">
                  <TableHead className="text-unicorn-gold">Date</TableHead>
                  <TableHead className="text-unicorn-gold">Amount</TableHead>
                  <TableHead className="text-unicorn-gold">Level</TableHead>
                  <TableHead className="text-unicorn-gold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rewards.map((reward) => (
                  <TableRow key={reward.id} className="border-unicorn-gold/20">
                    <TableCell className="text-gray-300">
                      <div className="flex flex-col">
                        <span>{format(new Date(reward.created_at), "MMM d, yyyy")}</span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(reward.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      ${Number(reward.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>{getLevelBadge(reward.level)}</TableCell>
                    <TableCell>{getStatusBadge(reward.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffiliateRewardsTable;
