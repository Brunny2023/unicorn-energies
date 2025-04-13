
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LoanApplication } from "@/types/investment";
import { 
  getAllLoanApplications, 
  approveLoanApplication, 
  rejectLoanApplication 
} from "@/utils/loanUtils";
import { sendLoanStatusNotification } from "@/utils/notificationUtils";
import LoanApplicationsTable from "@/components/admin/loans/LoanApplicationsTable";
import LoanApplicationsHeader from "@/components/admin/loans/LoanApplicationsHeader";
import LoanStatsCards from "@/components/admin/loans/LoanStatsCards";

const LoanApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0
  });
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await getAllLoanApplications();
      setApplications(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching loan applications:", error);
      toast({
        title: "Error",
        description: "Failed to load loan applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: LoanApplication[]) => {
    const total = data.length;
    const pending = data.filter(app => app.status === 'pending').length;
    const approved = data.filter(app => app.status === 'approved').length;
    const rejected = data.filter(app => app.status === 'rejected').length;
    const totalAmount = data.reduce((sum, app) => sum + Number(app.amount), 0);

    setStats({
      total,
      pending,
      approved,
      rejected,
      totalAmount
    });
  };

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

  return (
    <div className="space-y-6">
      <LoanApplicationsHeader />
      
      <LoanStatsCards stats={stats} loading={loading} />
      
      <LoanApplicationsTable
        applications={applications}
        loading={loading}
        processingId={processingId}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default LoanApplications;
