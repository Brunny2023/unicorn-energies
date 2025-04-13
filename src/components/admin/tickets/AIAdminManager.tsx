
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

  const getAIResponseRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.aiResponded / stats.total) * 100);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Server className="mr-2 h-5 w-5 text-unicorn-gold" />
              AI Assistant Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              {AI_ASSISTANT_NAME} automated ticket handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <>
                <Skeleton className="h-16 w-full bg-gray-700" />
                <Skeleton className="h-16 w-full bg-gray-700" />
                <Skeleton className="h-16 w-full bg-gray-700" />
              </>
            ) : (
              <>
                <div className="bg-unicorn-black/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Response Rate</span>
                    <span className="text-white font-medium">{getAIResponseRate()}%</span>
                  </div>
                  <Progress value={getAIResponseRate()} className="h-2 bg-gray-600" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-unicorn-black/30 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">{stats.aiResponded}</div>
                    <div className="text-gray-400 text-sm">AI Responded</div>
                  </div>
                  
                  <div className="bg-unicorn-black/30 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-1">{stats.open}</div>
                    <div className="text-gray-400 text-sm">Open Tickets</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 mb-1">Last Activity</div>
                  <div className="text-sm text-white">{formatDate(stats.lastProcessed)}</div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
              onClick={processOpenTickets}
              disabled={processing || loading}
            >
              {processing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Process Open Tickets
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
              onClick={fetchStats}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Stats
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="mr-2 h-5 w-5 text-unicorn-gold" />
              Recent AI Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Last 5 tickets handled by {AI_ASSISTANT_NAME}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-14 w-full bg-gray-700" />
                <Skeleton className="h-14 w-full bg-gray-700" />
                <Skeleton className="h-14 w-full bg-gray-700" />
                <Skeleton className="h-14 w-full bg-gray-700" />
                <Skeleton className="h-14 w-full bg-gray-700" />
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((ticket) => (
                  <div key={ticket.id} className="bg-unicorn-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-white">{ticket.subject}</span>
                      <Badge 
                        variant={ticket.status === 'open' ? 'destructive' : ticket.status === 'in-progress' ? 'secondary' : 'default'}
                        className={
                          ticket.status === 'open' 
                            ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                            : ticket.status === 'in-progress' 
                            ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>Responded at: {new Date(ticket.responded_at).toLocaleString()}</span>
                      <a 
                        href={`/admin/tickets/${ticket.id}`} 
                        className="ml-auto text-unicorn-gold hover:underline flex items-center"
                      >
                        View Ticket
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-unicorn-black/30 p-6 rounded-lg text-center">
                <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-400">No AI activity found.</p>
                <p className="text-sm text-gray-500 mt-1">
                  {AI_ASSISTANT_NAME} hasn't processed any tickets yet.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="link" 
              className="text-unicorn-gold hover:text-unicorn-lightGold mx-auto"
              asChild
            >
              <a href="/admin/tickets">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                View All Tickets
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AIAdminManager;
