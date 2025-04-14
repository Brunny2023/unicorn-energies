
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTicketDetails } from "@/hooks/tickets";
import TicketDetails from "@/components/tickets/TicketDetails";
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
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TicketView = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error, fetchTicket } = useTicketDetails(id);
  
  useEffect(() => {
    // Add debugging logs
    console.log("TicketView component loaded. ID:", id);
    console.log("Ticket data:", ticket);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
  }, [id, ticket, loading, error]);

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
              <BreadcrumbPage className="text-unicorn-gold">Ticket #{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Ticket Details</h1>
          <Button asChild variant="outline" size="sm" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Tickets
            </Link>
          </Button>
        </div>
        
        {/* Dashboard navigation tabs */}
        <DashboardTopNav />
        
        <TicketDetails 
          ticket={ticket} 
          loading={loading} 
          error={error} 
        />
      </div>
    </DashboardLayout>
  );
};

export default TicketView;
