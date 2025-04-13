
import { LoanApplication } from "@/types/investment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface LoanApplicationsListProps {
  applications: LoanApplication[];
  loading: boolean;
}

const LoanApplicationsList = ({ applications, loading }: LoanApplicationsListProps) => {
  const getLoanStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Your Loan Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">You have not submitted any loan applications yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-unicorn-gold/30">
                  <TableHead className="text-unicorn-gold">Date</TableHead>
                  <TableHead className="text-unicorn-gold">Amount</TableHead>
                  <TableHead className="text-unicorn-gold">Status</TableHead>
                  <TableHead className="text-unicorn-gold">Purpose</TableHead>
                  <TableHead className="text-unicorn-gold">Admin Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id} className="border-unicorn-gold/20">
                    <TableCell className="text-gray-300">
                      {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      ${Number(application.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>{getLoanStatusBadge(application.status)}</TableCell>
                    <TableCell className="text-gray-300 max-w-xs truncate">
                      {application.purpose || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {application.admin_notes || "N/A"}
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

export default LoanApplicationsList;
