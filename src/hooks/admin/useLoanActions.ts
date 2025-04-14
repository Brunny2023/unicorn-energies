
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoanApplication } from "@/types/investment";
import { approveLoanApplication, rejectLoanApplication } from "@/utils/loanUtils";
import { sendLoanStatusNotification } from "@/utils/notificationUtils";
import { useToast } from "@/hooks/use-toast";

export const useLoanActions = (
  fetchApplications: () => Promise<void>,
  setProcessingId: (id: string | null) => void
) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleApprove = async (application: LoanApplication, notes?: string) => {
    if (!user?.id) return;
    
    setProcessingId(application.id);
    try {
      const success = await approveLoanApplication(application.id, user.id, notes);
      
      if (success) {
        // Send email notification
        await sendLoanStatusNotification(
          application.user_id, 
          application.id, 
          'approved', 
          Number(application.amount),
          notes
        );
        
        toast({
          title: "Application Approved",
          description: `Loan for $${Number(application.amount).toLocaleString()} has been approved`,
        });
        
        fetchApplications();
      } else {
        throw new Error("Failed to approve loan application");
      }
    } catch (error) {
      console.error("Error approving loan application:", error);
      toast({
        title: "Action Failed",
        description: "There was an error approving the loan application",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (application: LoanApplication, notes?: string) => {
    if (!user?.id) return;
    
    setProcessingId(application.id);
    try {
      const success = await rejectLoanApplication(application.id, user.id, notes);
      
      if (success) {
        // Send email notification
        await sendLoanStatusNotification(
          application.user_id, 
          application.id, 
          'rejected',
          undefined,
          notes
        );
        
        toast({
          title: "Application Rejected",
          description: `Loan application has been rejected`,
        });
        
        fetchApplications();
      } else {
        throw new Error("Failed to reject loan application");
      }
    } catch (error) {
      console.error("Error rejecting loan application:", error);
      toast({
        title: "Action Failed",
        description: "There was an error rejecting the loan application",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  return {
    handleApprove,
    handleReject
  };
};
