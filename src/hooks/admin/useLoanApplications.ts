
import { useState, useEffect } from "react";
import { LoanApplication } from "@/types/investment";
import { getAllLoanApplications } from "@/utils/loanUtils";
import { useToast } from "@/hooks/use-toast";

export interface LoanStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalAmount: number;
}

export const useLoanApplications = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [stats, setStats] = useState<LoanStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0
  });
  const [processingId, setProcessingId] = useState<string | null>(null);

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

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    loading,
    applications,
    stats,
    processingId,
    setProcessingId,
    fetchApplications
  };
};
