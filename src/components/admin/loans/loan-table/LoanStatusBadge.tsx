
import { Badge } from "@/components/ui/badge";

interface LoanStatusBadgeProps {
  status: string;
}

const LoanStatusBadge = ({ status }: LoanStatusBadgeProps) => {
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

export default LoanStatusBadge;
