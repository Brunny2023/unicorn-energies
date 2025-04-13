
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { aiTicketService, AI_ASSISTANT_NAME } from '@/utils/ticket/aiTicketService';
import { Activity, Server, RefreshCw, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import AIStatsPanel from './ai-manager/AIStatsPanel';
import AIActivityPanel from './ai-manager/AIActivityPanel';

const AIAdminManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    aiResponded: 0,
    open: 0,
    lastProcessed: null as string | null,
  });
  const [recentActivity, setRecentActivity] = useState<{ id: string; subject: string; status: string; responded_at: string }[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Get total tickets
      const { data: totalData, error: totalError } = await supabase
        .from('tickets')
        .select('count', { count: 'exact' });
      
      if (totalError) throw totalError;
      
      // Get AI responded tickets
      const { data: aiData, error: aiError } = await supabase
        .from('tickets')
        .select('count', { count: 'exact' })
        .not('ai_response', 'is', null);
      
      if (aiError) throw aiError;
      
      // Get open tickets
      const { data: openData, error: openError } = await supabase
        .from('tickets')
        .select('count', { count: 'exact' })
        .eq('status', 'open');
      
      if (openError) throw openError;
      
      // Get latest AI responded tickets
      const { data: recentData, error: recentError } = await supabase
        .from('tickets')
        .select('id, subject, status, ai_responded_at')
        .not('ai_response', 'is', null)
        .order('ai_responded_at', { ascending: false })
        .limit(5);
      
      if (recentError) throw recentError;

      setStats({
        total: totalData[0]?.count || 0,
        aiResponded: aiData[0]?.count || 0,
        open: openData[0]?.count || 0,
        lastProcessed: recentData[0]?.ai_responded_at || null,
      });
      
      // Fix for the build error - map ai_responded_at to responded_at
      const formattedRecentData = recentData?.map(ticket => ({
        id: ticket.id,
        subject: ticket.subject,
        status: ticket.status,
        responded_at: ticket.ai_responded_at
      })) || [];
      
      setRecentActivity(formattedRecentData);
    } catch (error) {
      console.error('Error fetching AI stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load AI assistant statistics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const processOpenTickets = async () => {
    setProcessing(true);
    toast({
      title: 'Processing tickets',
      description: `${AI_ASSISTANT_NAME} is analyzing open tickets...`,
    });
    
    try {
      const result = await aiTicketService.processOpenTickets();
      
      toast({
        title: 'Processing complete',
        description: `Processed ${result.processed} tickets: ${result.successful} successful, ${result.failed} failed.`,
      });
      
      // Refresh stats after processing
      await fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process open tickets',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <AIStatsPanel 
          stats={stats}
          loading={loading}
          processing={processing}
          onProcess={processOpenTickets}
          onRefresh={fetchStats}
        />
      </div>
      
      <div className="lg:col-span-2">
        <AIActivityPanel 
          recentActivity={recentActivity}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AIAdminManager;
