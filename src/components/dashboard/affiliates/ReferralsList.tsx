
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

interface ReferralsListProps {
  referrals: any[];
  loading: boolean;
}

const ReferralsList = ({ referrals, loading }: ReferralsListProps) => {
  const getLevelBadge = (level: number) => {
    switch (level) {
      case 1:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Level 1</Badge>;
      case 2:
        return <Badge className="bg-purple-500 hover:bg-purple-600">Level 2</Badge>;
      case 3:
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">Level 3</Badge>;
      default:
        return <Badge>Level {level}</Badge>;
    }
  };

  // Sort referrals by level (ascending) and then by date (descending)
  const sortedReferrals = [...referrals].sort((a, b) => {
    if (a.level !== b.level) {
      return a.level - b.level;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Your Referrals</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
          </div>
        ) : sortedReferrals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">You haven't referred anyone yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-unicorn-gold/30">
                  <TableHead className="text-unicorn-gold">User</TableHead>
                  <TableHead className="text-unicorn-gold">Level</TableHead>
                  <TableHead className="text-unicorn-gold">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReferrals.map((referral) => (
                  <TableRow key={referral.id} className="border-unicorn-gold/20">
                    <TableCell className="font-medium text-white">
                      {referral.user?.email || "Anonymous"}
                    </TableCell>
                    <TableCell>{getLevelBadge(referral.level)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDistanceToNow(new Date(referral.created_at), { addSuffix: true })}
                    </TableCell>
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

export default ReferralsList;
