
import { useState } from "react";
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
import LoanTableRow from "./loan-table/LoanTableRow";
import LoanActionDialog from "./loan-table/LoanActionDialog";

interface LoanApplicationsTableProps {
  applications: LoanApplication[];
  loading: boolean;
  processingId: string | null;
  onApprove: (application: LoanApplication, notes?: string) => Promise<void>;
  onReject: (application: LoanApplication, notes?: string) => Promise<void>;
}

const LoanApplicationsTable = ({
  applications,
  loading,
  processingId,
  onApprove,
  onReject,
}: LoanApplicationsTableProps) => {
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const openDialog = (application: LoanApplication, action: "approve" | "reject") => {
    setSelectedApplication(application);
    setActionType(action);
    setAdminNotes(application.admin_notes || "");
  };

  const closeDialog = () => {
    setSelectedApplication(null);
    setActionType(null);
    setAdminNotes("");
  };

  const handleAction = async () => {
    if (!selectedApplication) return;

    if (actionType === "approve") {
      await onApprove(selectedApplication, adminNotes);
    } else if (actionType === "reject") {
      await onReject(selectedApplication, adminNotes);
    }

    closeDialog();
  };

  // Filter only pending applications to the top
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const otherApplications = applications.filter(app => app.status !== 'pending');
  const sortedApplications = [...pendingApplications, ...otherApplications];

  return (
    <>
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">All Loan Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full bg-gray-700" />
              <Skeleton className="h-20 w-full bg-gray-700" />
              <Skeleton className="h-20 w-full bg-gray-700" />
            </div>
          ) : sortedApplications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No loan applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-unicorn-gold/30">
                    <TableHead className="text-unicorn-gold">Date</TableHead>
                    <TableHead className="text-unicorn-gold">User ID</TableHead>
                    <TableHead className="text-unicorn-gold">Amount</TableHead>
                    <TableHead className="text-unicorn-gold">Status</TableHead>
                    <TableHead className="text-unicorn-gold">Purpose</TableHead>
                    <TableHead className="text-unicorn-gold">Admin Notes</TableHead>
                    <TableHead className="text-unicorn-gold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedApplications.map((application) => (
                    <LoanTableRow 
                      key={application.id}
                      application={application}
                      processingId={processingId}
                      onOpenApproveDialog={() => openDialog(application, "approve")}
                      onOpenRejectDialog={() => openDialog(application, "reject")}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval/Rejection Dialog */}
      <LoanActionDialog
        selectedApplication={selectedApplication}
        actionType={actionType}
        adminNotes={adminNotes}
        processingId={processingId}
        setAdminNotes={setAdminNotes}
        onClose={closeDialog}
        onAction={handleAction}
      />
    </>
  );
};

export default LoanApplicationsTable;
