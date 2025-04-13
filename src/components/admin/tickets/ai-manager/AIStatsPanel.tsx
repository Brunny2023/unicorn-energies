
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, RefreshCw, Play } from 'lucide-react';
import { AI_ASSISTANT_NAME } from '@/utils/ticket/aiTicketService';

interface AIStatsPanelProps {
  stats: {
    total: number;
    aiResponded: number;
    open: number;
    lastProcessed: string | null;
  };
  loading: boolean;
  processing: boolean;
  onProcess: () => Promise<void>;
  onRefresh: () => Promise<void>;
}

const AIStatsPanel: React.FC<AIStatsPanelProps> = ({ 
  stats, 
  loading, 
  processing, 
  onProcess, 
  onRefresh 
}) => {
  const getAIResponseRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.aiResponded / stats.total) * 100);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
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
          onClick={onProcess}
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
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIStatsPanel;
