
import { LoanApplication } from "@/types/investment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Check, X } from "lucide-react";
import LoanStatusBadge from "./LoanStatusBadge";

interface LoanActionDialogProps {
  selectedApplication: LoanApplication | null;
  actionType: "approve" | "reject" | null;
  adminNotes: string;
  processingId: string | null;
  setAdminNotes: (notes: string) => void;
  onClose: () => void;
  onAction: () => Promise<void>;
}

const LoanActionDialog = ({
  selectedApplication,
  actionType,
  adminNotes,
  processingId,
  setAdminNotes,
  onClose,
  onAction,
}: LoanActionDialogProps) => {
  if (!selectedApplication) return null;
  
  return (
    <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && onClose()}>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Amount</p>
              <p className="text-white font-bold">${Number(selectedApplication.amount).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <div><LoanStatusBadge status={selectedApplication.status} /></div>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400">Purpose</p>
              <p className="text-white">{selectedApplication.purpose || "N/A"}</p>
            </div>
          </div>

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
            onClick={onClose}
            className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onAction}
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
  );
};

export default LoanActionDialog;
