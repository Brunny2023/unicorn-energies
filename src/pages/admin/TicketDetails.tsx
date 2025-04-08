import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminRoute from "@/components/auth/AdminRoute"; // Fix import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, User, Bot, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Ticket } from "@/types/investment";
import { getTicketDetails, updateTicket } from "@/utils/investmentUtils";

const AdminTicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTicketDetails();
    }
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const data = await getTicketDetails(id as string);
      setTicket(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!response.trim()) {
      toast({
        title: "Missing response",
        description: "Please enter a response message",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Update the ticket with the AI response
      const success = await updateTicket(id as string, {
        ai_response: response,
        ai_responded_at: new Date().toISOString(),
        status: 'resolved'
      });

      if (success) {
        toast({
          title: "Response Sent",
          description: "Your response has been added to the ticket"
        });

        // Refresh ticket data
        fetchTicketDetails();
        setResponse('');
      } else {
        throw new Error("Failed to update ticket");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast({
        title: "Response Failed",
        description: "There was a problem sending your response",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-gray-700/50 rounded w-1/3"></div>
          <div className="h-64 bg-gray-700/50 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl text-white mb-4">Ticket not found</h3>
        <Button
          onClick={() => navigate('/admin/tickets')}
          className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tickets
        </Button>
      </div>
    );
  }

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/tickets')}
            className="text-white hover:text-unicorn-gold mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h2 className="text-2xl font-bold text-white">Ticket #{ticket.id.substring(0, 8)}</h2>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <CardTitle className="text-xl text-white">{ticket.subject}</CardTitle>
                <div className="flex mt-2 space-x-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
              <div className="text-right text-sm text-gray-400">
                <div>Created: {new Date(ticket.created_at).toLocaleString()}</div>
                <div>Last Updated: {new Date(ticket.updated_at).toLocaleString()}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-unicorn-darkPurple border border-unicorn-gold/20 rounded-lg p-4">
                <div className="flex items-start mb-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-gold/20 text-unicorn-gold mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-unicorn-gold">User Message</div>
                    <div className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-white whitespace-pre-line">
                  {ticket.message}
                </div>
              </div>

              {ticket.ai_response && (
                <div className="bg-unicorn-purple/10 border border-unicorn-gold/10 rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-gold/20 text-unicorn-gold mr-3">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-unicorn-gold">AI Assistant</div>
                      <div className="text-xs text-gray-400">
                        {ticket.ai_responded_at ? new Date(ticket.ai_responded_at).toLocaleString() : 'Automated Response'}
                      </div>
                    </div>
                  </div>
                  <div className="text-white whitespace-pre-line">
                    {ticket.ai_response}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <form onSubmit={handleSubmitResponse}>
                  <Textarea
                    placeholder="Respond to this ticket..."
                    value={response}
                    onChange={handleResponseChange}
                    className="min-h-[100px] bg-unicorn-darkPurple/60 border-unicorn-gold/30 text-white mb-3"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Response"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTicketDetails;
