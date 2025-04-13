
import { useState } from "react";
import { LoanApplication } from "@/types/investment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Loader, Edit } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

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
                      <TableCell>{getLoanStatusBadge(application.status)}</TableCell>
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
                              onClick={() => openDialog(application, "approve")}
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
                              onClick={() => openDialog(application, "reject")}
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
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval/Rejection Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
          <DialogHeader>
            <DialogTitle className="text-white">
              {actionType === "approve" ? "Approve Loan Application" : "Reject Loan Application"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {actionType === "approve"
                ? "This will approve the loan application and add funds to the user's account."
                : "This will reject the loan application."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedApplication && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Amount</p>
                  <p className="text-white font-bold">${Number(selectedApplication.amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <div>{getLoanStatusBadge(selectedApplication.status)}</div>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400">Purpose</p>
                  <p className="text-white">{selectedApplication.purpose || "N/A"}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="adminNotes" className="text-white">
                Admin Notes
              </label>
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes for this application..."
                className="bg-unicorn-black/30 border-unicorn-gold/30 text-white min-h-24"
              />
            </div>
          </div>

          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAction}
              className={
                actionType === "approve"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }
              disabled={!!processingId}
            >
              {processingId ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : actionType === "approve" ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <X className="h-4 w-4 mr-2" />
              )}
              {actionType === "approve" ? "Approve Loan" : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanApplicationsTable;
