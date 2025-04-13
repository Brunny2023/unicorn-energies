
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LoanApplication } from "@/types/investment";
import { getUserLoanApplications, createLoanApplication } from "@/utils/loanUtils";
import LoanApplicationForm from "@/components/dashboard/loans/LoanApplicationForm";
import LoanApplicationsList from "@/components/dashboard/loans/LoanApplicationsList";
import LoanStatsCards from "@/components/dashboard/loans/LoanStatsCards";

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
    try {
      const result = await createLoanApplication(user.id, amount, purpose);
      if (result) {
        toast({
          title: "Application Submitted",
          description: "Your loan application has been submitted successfully",
        });
        fetchLoanApplications();
      } else {
        throw new Error("Failed to submit loan application");
      }
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your loan application",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Investment Loans</h1>
      
      {/* Stats Cards */}
      <LoanStatsCards 
        loading={loading} 
        stats={stats}
      />
      
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
  );
};

export default Loans;
