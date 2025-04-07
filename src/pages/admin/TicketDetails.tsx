
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  User,
  Bot,
  Sparkles,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Ticket } from "@/types/investment";

const AdminTicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTicketDetails();
    }
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setTicket(data);
      
      // If there's already an AI response, populate it
      if (data.ai_response) {
        setAiResponse(data.ai_response);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleGenerateAIResponse = async () => {
    if (!ticket) return;

    setIsGenerating(true);
    
    try {
      // Here we'd call an API or edge function to generate a response
      // For now, we'll simulate it
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example response based on ticket subject and message
      let response = "";
      
      if (ticket.subject.toLowerCase().includes("withdraw")) {
        response = "Thank you for contacting our support team. I understand you're having an issue with withdrawals.\n\nTo process your withdrawal, please ensure:\n\n1. You have sufficient accrued profits in your account\n2. You're aware of the withdrawal fee which is calculated based on your account tier\n3. Withdrawals are processed within 24-48 hours\n\nIf you're still having issues, please provide your transaction ID and we'll investigate further.";
      } else if (ticket.subject.toLowerCase().includes("investment")) {
        response = "Thank you for reaching out about your investment. I'd be happy to help.\n\nRegarding your investment inquiry:\n\n- All investments are processed immediately when confirmed\n- Daily returns are calculated at 00:00 UTC\n- Your investment will complete automatically at the end of its term\n\nIf you have specific questions about your returns or investment terms, please let us know.";
      } else {
        response = "Thank you for contacting Unicorn Energies support. We've received your inquiry and I'm here to help.\n\nBased on your message, I understand your concern regarding " + ticket.subject + ".\n\nOur team is reviewing your case and will provide personalized assistance shortly. In the meantime, you can check our FAQ section for similar issues and solutions.\n\nPlease feel free to provide any additional details that might help us resolve your issue more efficiently.";
      }
      
      setAiResponse(response);
      toast({
        title: "AI Response Generated",
        description: "You can edit the response before sending",
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI response",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendResponse = async () => {
    if (!ticket || !aiResponse.trim()) {
      toast({
        title: "Missing Response",
        description: "Please generate or write a response",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("tickets")
        .update({
          ai_response: aiResponse,
          ai_responded_at: new Date().toISOString(),
          status: "in-progress",
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Response Sent",
        description: "AI response has been sent to the user",
      });
      
      fetchTicketDetails();
    } catch (error) {
      console.error("Error sending AI response:", error);
      toast({
        title: "Error",
        description: "Failed to send AI response",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!ticket) return;

    try {
      const { error } = await supabase
        .from("tickets")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Ticket status changed to ${newStatus}`,
      });
      
      fetchTicketDetails();
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update ticket status",
        variant: "destructive",
      });
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
      <DashboardLayout>
        <div className="flex justify-center p-8">
          <div className="animate-pulse space-y-4 w-full max-w-4xl">
            <div className="h-8 bg-gray-700/50 rounded w-1/3"></div>
            <div className="h-64 bg-gray-700/50 rounded w-full"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <h3 className="text-xl text-white mb-4">Ticket not found</h3>
          <Button
            onClick={() => navigate("/admin/tickets")}
            className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tickets
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/tickets")}
            className="text-white hover:text-unicorn-gold mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h2 className="text-2xl font-bold text-white">
            Ticket #{ticket.id.substring(0, 8)}
          </h2>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <CardTitle className="text-xl text-white">
                  {ticket.subject}
                </CardTitle>
                <div className="flex mt-2 space-x-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
              <div className="text-right text-sm text-gray-400">
                <div>User ID: {ticket.user_id}</div>
                <div>Created: {new Date(ticket.created_at).toLocaleString()}</div>
                <div>Last Updated: {new Date(ticket.updated_at).toLocaleString()}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-unicorn-darkPurple border border-unicorn-gold/20 rounded-lg p-4">
                <div className="flex items-start mb-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-purple/20 text-unicorn-gold mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-unicorn-gold">User Message</div>
                    <div className="text-xs text-gray-400">
                      {new Date(ticket.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-white whitespace-pre-line">
                  {ticket.message}
                </div>
              </div>

              {ticket.ai_response ? (
                <div className="bg-unicorn-purple/10 border border-unicorn-gold/10 rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-gold/20 text-unicorn-gold mr-3">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-unicorn-gold">AI Response</div>
                      <div className="text-xs text-gray-400">
                        {ticket.ai_responded_at
                          ? new Date(ticket.ai_responded_at).toLocaleString()
                          : "Automated Response"}
                      </div>
                    </div>
                  </div>
                  <div className="text-white whitespace-pre-line">
                    {ticket.ai_response}
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-response" className="text-white text-lg">
                      AI Response
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center text-unicorn-gold border-unicorn-gold/30 hover:bg-unicorn-gold/10"
                      onClick={handleGenerateAIResponse}
                      disabled={isGenerating}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate AI Response"}
                    </Button>
                  </div>
                  <Textarea
                    id="ai-response"
                    value={aiResponse}
                    onChange={(e) => setAiResponse(e.target.value)}
                    placeholder="Generate or write an AI response..."
                    className="min-h-[200px] bg-unicorn-darkPurple/60 border-unicorn-gold/30 text-white"
                  />
                  <Button
                    onClick={handleSendResponse}
                    disabled={!aiResponse.trim() || isSubmitting}
                    className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Response"}
                  </Button>
                </div>
              )}

              <div className="pt-6 border-t border-unicorn-gold/20">
                <h3 className="text-lg font-medium text-white mb-4">
                  Ticket Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
                    onClick={() => handleStatusUpdate("resolved")}
                    disabled={ticket.status === "resolved"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border-gray-500/20"
                    onClick={() => handleStatusUpdate("closed")}
                    disabled={ticket.status === "closed"}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Close Ticket
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTicketDetails;
