
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LoanApplication } from "@/types/investment";
import { getUserLoanApplications } from "@/utils/loan/fetchLoans";
import { createLoanApplication } from "@/utils/loan/createLoan";
import LoanApplicationForm from "@/components/dashboard/loans/LoanApplicationForm";
import LoanApplicationsList from "@/components/dashboard/loans/LoanApplicationsList";
import LoanStatsCards from "@/components/dashboard/loans/LoanStatsCards";
import LoanHeader from "@/components/dashboard/loans/LoanHeader";
import LoanTerms from "@/components/dashboard/loans/LoanTerms";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Loans = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    totalApproved: 0
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchLoanApplications();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchLoanApplications = async () => {
    setLoading(true);
    try {
      const data = await getUserLoanApplications(user?.id || '');
      setLoanApplications(data);
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

  const calculateStats = (applications: LoanApplication[]) => {
    const pending = applications.filter(app => app.status === 'pending').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    const totalApproved = applications
      .filter(app => app.status === 'approved')
      .reduce((sum, app) => sum + Number(app.amount), 0);

    setStats({
      pending,
      approved,
      rejected,
      totalApproved
    });
  };

  const handleSubmitApplication = async (amount: number, purpose: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for a loan",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const result = await createLoanApplication(user.id, amount, purpose);
      if (result) {
        toast({
          title: "Application Submitted",
          description: "Your loan application has been submitted successfully. The commitment fee has been deducted from your wallet.",
        });
        fetchLoanApplications();
      } else {
        throw new Error("Failed to submit loan application");
      }
    } catch (error: any) {
      console.error("Error submitting loan application:", error);
      setError(error.message || "There was an error submitting your loan application");
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your loan application",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb and Navigation */}
        <LoanHeader />
        
        {/* Stats Cards */}
        <LoanStatsCards 
          loading={loading} 
          stats={stats}
        />
        
        {/* Error display */}
        {error && (
          <Alert className="bg-red-500/10 text-red-500 border-red-500/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* Loan Terms Information Alert */}
        <LoanTerms />
        
        {/* Loan Application Form */}
        <LoanApplicationForm 
          onSubmit={handleSubmitApplication}
          submitting={submitting}
        />
        
        {/* Loan Applications List */}
        <LoanApplicationsList 
          applications={loanApplications}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
};

export default Loans;
