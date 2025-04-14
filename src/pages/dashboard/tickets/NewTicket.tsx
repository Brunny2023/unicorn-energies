
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import NewTicketForm from "@/components/tickets/NewTicketForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserTickets } from "@/hooks/tickets";
import { Ticket } from "@/types/investment";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardTopNav from "@/components/dashboard/layout/DashboardTopNav";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const NewTicket = () => {
  const { createTicket } = useUserTickets();

  const handleCreateTicket = async (
    subject: string,
    message: string,
    priority: string,
    category: string
  ): Promise<Ticket | null> => {
    const success = await createTicket(subject, message, priority, category);
    if (success) {
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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="text-gray-400 hover:text-unicorn-gold">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard/tickets" className="text-gray-400 hover:text-unicorn-gold">Support Tickets</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-unicorn-gold">New Ticket</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Create Support Ticket</h1>
          <Button asChild variant="outline" size="sm" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
            </Link>
          </Button>
        </div>
        
        {/* Dashboard navigation tabs */}
        <DashboardTopNav />

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
