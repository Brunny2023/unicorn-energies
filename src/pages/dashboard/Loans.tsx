
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LoanApplication } from "@/types/investment";
import { getUserLoanApplications, createLoanApplication } from "@/utils/loanUtils";
import LoanApplicationForm from "@/components/dashboard/loans/LoanApplicationForm";
import LoanApplicationsList from "@/components/dashboard/loans/LoanApplicationsList";
import LoanStatsCards from "@/components/dashboard/loans/LoanStatsCards";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home, Wallet, BarChart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb and Navigation */}
        <div className="flex flex-col space-y-2">
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="text-gray-400 hover:text-unicorn-gold">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-unicorn-gold">Loans</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Investment Loans</h1>
              <p className="text-gray-400">Apply for loans to boost your investment portfolio</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                <Link to="/dashboard">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                <Link to="/dashboard/investments">
                  <BarChart className="h-4 w-4 mr-1" />
                  Investments
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                <Link to="/dashboard/deposit">
                  <Wallet className="h-4 w-4 mr-1" />
                  Deposit
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation Pills */}
          <div className="flex overflow-x-auto gap-2 py-2 md:hidden">
            <Link to="/dashboard" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Dashboard
            </Link>
            <Link to="/dashboard/investments" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Investments
            </Link>
            <Link to="/dashboard/deposit" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Deposit
            </Link>
            <Link to="/dashboard/withdraw" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Withdraw
            </Link>
          </div>
        </div>
        
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
    </DashboardLayout>
  );
};

export default Loans;
