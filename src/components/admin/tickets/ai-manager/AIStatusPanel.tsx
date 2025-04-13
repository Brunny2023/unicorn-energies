
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Server, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { aiTicketService, AI_ASSISTANT_NAME } from '@/utils/ticket/aiTicketService';
import AIProcessingButton from './AIProcessingButton';

interface AIStatusPanelProps {
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

const AIStatusPanel = ({ stats, loading, processing, onProcess, onRefresh }: AIStatusPanelProps) => {
  // Calculate percentage of tickets that have AI responses
  const responsePercentage = stats.total > 0 
    ? Math.round((stats.aiResponded / stats.total) * 100) 
    : 0;
    
  return (
    <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-white flex items-center">
            <Server className="h-5 w-5 mr-2 text-unicorn-gold" />
            {AI_ASSISTANT_NAME} Status
          </CardTitle>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-unicorn-gold/30 text-unicorn-gold" 
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full bg-gray-700" />
            <Skeleton className="h-20 w-full bg-gray-700" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">AI Response Coverage</span>
                <span className="text-white font-medium">{responsePercentage}%</span>
              </div>
              <Progress value={responsePercentage} className="h-2 bg-gray-700" />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-unicorn-darkPurple/70 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">Total Tickets</div>
                <div className="text-white text-xl font-semibold">{stats.total}</div>
              </div>
              <div className="bg-unicorn-darkPurple/70 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">AI Responded</div>
                <div className="text-white text-xl font-semibold">{stats.aiResponded}</div>
              </div>
              <div className="bg-unicorn-darkPurple/70 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">Open Tickets</div>
                <div className="text-white text-xl font-semibold">
                  <span className={stats.open > 0 ? "text-yellow-400" : "text-green-400"}>
                    {stats.open}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-unicorn-gold" />
                  <span className="text-gray-400">Last Processing</span>
                </div>
                <Badge className="bg-unicorn-darkPurple text-white border border-unicorn-gold/30">
                  {stats.lastProcessed 
                    ? formatDistanceToNow(new Date(stats.lastProcessed), { addSuffix: true }) 
                    : "Never"}
                </Badge>
              </div>
              
              <AIProcessingButton 
                processing={processing} 
                onProcess={onProcess}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIStatusPanel;
