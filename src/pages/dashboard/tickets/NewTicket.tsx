
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NewTicketForm from "@/components/tickets/NewTicketForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserTickets } from "@/hooks/tickets";
import { Ticket } from "@/types/investment";

const NewTicket = () => {
  const { createTicket } = useUserTickets();

  // Wrap the createTicket function to match the expected interface
  const handleCreateTicket = async (
    subject: string,
    message: string,
    priority: string,
    category: string
  ): Promise<Ticket | null> => {
    const success = await createTicket(subject, message, priority, category);
    // If successful, we should return a Ticket object, but since our current implementation
    // returns a boolean, we'll need to handle this difference
    if (success) {
      // Create a temporary ticket object to satisfy the interface
      // In production, createTicket should be updated to return the created ticket
      return {
        id: "temp-" + Date.now(),
        user_id: "current-user",
        subject,
        message,
        priority: priority as "high" | "medium" | "low",
        category,
        status: "open",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm" className="text-gray-400">
            <Link to="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
            </Link>
          </Button>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-xl text-white">Create New Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <NewTicketForm onCreateTicket={handleCreateTicket} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewTicket;
