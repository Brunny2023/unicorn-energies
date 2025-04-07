
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Ticket } from "@/types/investment";
import { MessageSquare, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const AdminTickets = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
    total: 0
  });

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      
      // Get all tickets
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setTickets(data || []);
      
      // Calculate stats
      const open = data?.filter(ticket => ticket.status === 'open').length || 0;
      const inProgress = data?.filter(ticket => ticket.status === 'in-progress').length || 0;
      const resolved = data?.filter(ticket => ticket.status === 'resolved' || ticket.status === 'closed').length || 0;
      
      setStats({
        open,
        inProgress,
        resolved,
        total: data?.length || 0
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        title: "Error",
        description: "Failed to load tickets",
        variant: "destructive"
      });
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
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Support Tickets</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{stats.total}</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{stats.open}</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{stats.inProgress}</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{stats.resolved}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tickets List */}
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-xl text-white">All Tickets</CardTitle>
          </CardHeader>
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
                    <Link to={`/admin/tickets/${ticket.id}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-white text-lg mb-1">
                            {ticket.subject}
                          </div>
                          <div className="text-sm text-gray-400 mb-2">
                            Created on {new Date(ticket.created_at).toLocaleDateString()} by User ID: {ticket.user_id.substring(0, 8)}...
                          </div>
                          <div className="flex space-x-2">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                            {!ticket.ai_response && (
                              <Badge variant="outline" className="bg-unicorn-gold/10 text-unicorn-gold border-unicorn-gold/20">
                                Needs Response
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          <Button
                            variant="outline"
                            className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/20"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/admin/tickets/${ticket.id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-400">No tickets found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTickets;
