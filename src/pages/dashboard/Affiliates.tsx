
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AffiliateReward } from "@/types/investment";
import { getUserAffiliateRewards, getUserReferralCode, getUserReferrals } from "@/utils/affiliateUtils";
import AffiliateHeader from "@/components/dashboard/affiliates/AffiliateHeader";
import AffiliateStats from "@/components/dashboard/affiliates/AffiliateStats";
import ReferralLink from "@/components/dashboard/affiliates/ReferralLink";
import AffiliateRewardsTable from "@/components/dashboard/affiliates/AffiliateRewardsTable";
import ReferralsList from "@/components/dashboard/affiliates/ReferralsList";

const Affiliates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [rewards, setRewards] = useState<AffiliateReward[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pendingRewards: 0,
    totalEarned: 0,
    level1Count: 0,
    level2Count: 0,
    level3Count: 0
  });

  useEffect(() => {
    if (user?.id) {
      fetchAffiliateData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAffiliateData = async () => {
    setLoading(true);
    try {
      const [codeResult, rewardsResult, referralsResult] = await Promise.all([
        getUserReferralCode(user?.id || ''),
        getUserAffiliateRewards(user?.id || ''),
        getUserReferrals(user?.id || '')
      ]);

      setReferralCode(codeResult);
      setRewards(rewardsResult);
      setReferrals(referralsResult);
      
      calculateStats(rewardsResult, referralsResult);
    } catch (error) {
      console.error("Error fetching affiliate data:", error);
      toast({
        title: "Error",
        description: "Failed to load affiliate data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (rewardsData: AffiliateReward[], referralsData: any[]) => {
    const pendingRewards = rewardsData
      .filter(reward => reward.status === 'pending')
      .reduce((sum, reward) => sum + Number(reward.amount), 0);
      
    const totalEarned = rewardsData
      .filter(reward => reward.status === 'processed')
      .reduce((sum, reward) => sum + Number(reward.amount), 0);
      
    const level1Count = referralsData.filter(ref => ref.level === 1).length;
    const level2Count = referralsData.filter(ref => ref.level === 2).length;
    const level3Count = referralsData.filter(ref => ref.level === 3).length;

    setStats({
      pendingRewards,
      totalEarned,
      level1Count,
      level2Count,
      level3Count
    });
  };

  return (
    <div className="space-y-6">
      <AffiliateHeader />
      
      <AffiliateStats
        loading={loading}
        stats={stats}
      />
      
      <ReferralLink
        referralCode={referralCode}
        loading={loading}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AffiliateRewardsTable
          rewards={rewards}
          loading={loading}
        />
        
        <ReferralsList
          referrals={referrals}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Affiliates;
