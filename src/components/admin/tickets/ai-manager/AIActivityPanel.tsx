
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AI_ASSISTANT_NAME } from '@/utils/ticket/aiTicketService';

interface AIActivityPanelProps {
  recentActivity: { 
    id: string; 
    subject: string; 
    status: string; 
    responded_at: string; 
  }[];
  loading: boolean;
}

const AIActivityPanel: React.FC<AIActivityPanelProps> = ({ recentActivity, loading }) => {
  return (
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
  );
};

export default AIActivityPanel;
