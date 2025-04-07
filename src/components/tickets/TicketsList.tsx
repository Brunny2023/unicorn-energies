
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/components/ui/ticket';
import { MessageSquare, Clock, AlertTriangle, CheckCircle, Plus, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserTickets } from '@/utils/investmentUtils';
import { Ticket as TicketType } from '@/types/investment'; 

const TicketsList = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getUserTickets(user?.id as string);
      setTickets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Open</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">Closed</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Support Tickets</h2>
        <Link to="/dashboard/tickets/new">
          <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
            <Plus className="h-4 w-4 mr-2" /> New Ticket
          </Button>
        </Link>
      </div>

      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-24 bg-gray-700/50 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : tickets.length > 0 ? (
            <div className="divide-y divide-unicorn-gold/30">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 hover:bg-unicorn-purple/10 transition-colors">
                  <Link to={`/dashboard/tickets/${ticket.id}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          <MessageSquare className="h-5 w-5 text-unicorn-gold" />
                        </div>
                        <div>
                          <div className="font-medium text-white text-lg mb-1">
                            {ticket.subject}
                          </div>
                          <div className="text-sm text-gray-400 mb-2">
                            Created on {new Date(ticket.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center text-gray-400">
                        <span className="text-sm mr-2">{ticket.ai_response ? 'Responded' : 'Awaiting response'}</span>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <MessageSquare className="h-10 w-10 text-unicorn-gold/40 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">No support tickets yet</p>
              <Link to="/dashboard/tickets/new">
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                  Create Your First Ticket
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketsList;
