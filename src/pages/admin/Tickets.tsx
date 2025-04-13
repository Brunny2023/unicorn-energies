
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminTickets } from "@/hooks/tickets";
import TicketsHeader from "@/components/admin/tickets/TicketsHeader";
import TicketsFilters from "@/components/admin/tickets/TicketsFilters";
import TicketsTable from "@/components/admin/tickets/TicketsTable";
import AIProcessingPanel from "@/components/admin/tickets/AIProcessingPanel";
import AIAdminManager from "@/components/admin/tickets/AIAdminManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Ticket } from "lucide-react";

const AdminTickets = () => {
  const { tickets, loading, error, fetchAllTickets } = useAdminTickets();
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  // Update filtered tickets whenever filters change
  useEffect(() => {
    filterTickets();
  }, [searchTerm, tickets, selectedStatuses, selectedPriorities]);

  const filterTickets = () => {
    let filtered = [...tickets];

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((ticket) =>
        selectedStatuses.includes(ticket.status)
      );
    }

    if (selectedPriorities.length > 0) {
      filtered = filtered.filter((ticket) =>
        selectedPriorities.includes(ticket.priority)
      );
    }

    setFilteredTickets(filtered);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <TicketsHeader title="Support Tickets" onRefresh={fetchAllTickets} />
        
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="bg-unicorn-darkPurple/50 border border-unicorn-gold/20">
            <TabsTrigger 
              value="tickets" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Tickets
            </TabsTrigger>
            <TabsTrigger 
              value="ai-admin" 
              className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              <Server className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets" className="space-y-6">
            <AIProcessingPanel onRefreshTickets={fetchAllTickets} />
            
            <TicketsFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              selectedPriorities={selectedPriorities}
              setSelectedPriorities={setSelectedPriorities}
            />
            
            <TicketsTable 
              loading={loading} 
              filteredTickets={filteredTickets} 
            />
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-red-500">
                {error}. <button 
                  className="underline"
                  onClick={() => fetchAllTickets()}
                >
                  Try again
                </button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai-admin">
            <AIAdminManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminTickets;
