
import { useAuth } from "@/contexts/AuthContext";
import { useLoanApplications } from "@/hooks/admin/useLoanApplications";
import { useLoanActions } from "@/hooks/admin/useLoanActions";
import LoanApplicationsTable from "@/components/admin/loans/LoanApplicationsTable";
import LoanApplicationsHeader from "@/components/admin/loans/LoanApplicationsHeader";
import LoanStatsCards from "@/components/admin/loans/LoanStatsCards";

const LoanApplications = () => {
  const { user } = useAuth();
  const { 
    loading, 
    applications, 
    stats, 
    processingId, 
    setProcessingId, 
    fetchApplications 
  } = useLoanApplications();
  
  const { handleApprove, handleReject } = useLoanActions(fetchApplications, setProcessingId);

  return (
    <div className="space-y-6">
      <LoanApplicationsHeader onRefresh={fetchApplications} refreshing={loading} />
      
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
