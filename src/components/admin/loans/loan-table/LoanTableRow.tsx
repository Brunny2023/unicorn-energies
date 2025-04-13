
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LoanApplication } from "@/types/investment";
import { Check, X, Loader, Edit } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import LoanStatusBadge from "./LoanStatusBadge";

interface LoanTableRowProps {
  application: LoanApplication;
  processingId: string | null;
  onOpenApproveDialog: (application: LoanApplication) => void;
  onOpenRejectDialog: (application: LoanApplication) => void;
}

const LoanTableRow = ({
  application,
  processingId,
  onOpenApproveDialog,
  onOpenRejectDialog,
}: LoanTableRowProps) => {
  return (
    <TableRow key={application.id} className="border-unicorn-gold/20">
      <TableCell className="text-gray-300">
        <div className="flex flex-col">
          <span>{format(new Date(application.created_at), "MMM d, yyyy")}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-gray-300 font-mono text-xs">
        {application.user_id}
      </TableCell>
      <TableCell className="font-medium text-white">
        ${Number(application.amount).toLocaleString()}
      </TableCell>
      <TableCell><LoanStatusBadge status={application.status} /></TableCell>
      <TableCell className="text-gray-300 max-w-xs truncate">
        {application.purpose || "N/A"}
      </TableCell>
      <TableCell className="text-gray-300">
        {application.admin_notes || "N/A"}
      </TableCell>
      <TableCell>
        {application.status === "pending" ? (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => onOpenApproveDialog(application)}
              disabled={!!processingId}
            >
              {processingId === application.id ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => onOpenRejectDialog(application)}
              disabled={!!processingId}
            >
              {processingId === application.id ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
            disabled={true}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LoanTableRow;
