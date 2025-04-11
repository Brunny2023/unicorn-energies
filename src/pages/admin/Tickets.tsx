
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminRoute from "@/components/auth/AdminRoute"; 
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  MessageSquare,
  ChevronRight,
  Filter,
  Calendar,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Ticket } from "@/types/investment";
import { getAllTickets } from "@/utils/ticketUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Development mode flag for testing
const DEVELOPMENT_MODE = true;

// Sample dummy tickets for development
const DUMMY_TICKETS = [
  {
    id: "ticket-1",
    user_id: "dev-user-id",
    subject: "Withdrawal Issue",
    message: "I'm having trouble with my recent withdrawal...",
    status: "open",
    priority: "high",
    category: "withdrawal",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-2",
    user_id: "dev-user-id",
    subject: "Investment Question",
    message: "Can you explain how the Gold plan works?",
    status: "closed",
    priority: "medium",
    category: "investment",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ticket-3",
    user_id: "dev-user-id",
    subject: "Account Verification",
    message: "I need to verify my account for larger withdrawals.",
    status: "in_progress",
    priority: "medium",
    category: "account",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const AdminTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [searchTerm, tickets, selectedStatuses, selectedPriorities]);

  const fetchTickets = async () => {
    console.log("Fetching tickets in admin panel");
    setLoading(true);
    try {
      // Use development data when in development mode
      if (DEVELOPMENT_MODE) {
        console.log("Using dummy tickets data for development");
        setTimeout(() => {
          setTickets(DUMMY_TICKETS as Ticket[]);
          setFilteredTickets(DUMMY_TICKETS as Ticket[]);
          setLoading(false);
        }, 1000); // Simulate loading delay
        return;
      }

      // Production mode - fetch real data
      const ticketsData = await getAllTickets();
      console.log("Tickets data fetched:", ticketsData);
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        title: "Error",
        description: "Failed to load tickets. Please try again.",
        variant: "destructive"
      });
      // Fall back to dummy data
      setTickets(DUMMY_TICKETS as Ticket[]);
      setFilteredTickets(DUMMY_TICKETS as Ticket[]);
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
          >
            Open
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 border-blue-500/20"
          >
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            Resolved
          </Badge>
        );
      case "closed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-500/10 text-gray-500 border-gray-500/20"
          >
            Closed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-500 border-red-500/20"
          >
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
          >
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-white">Support Tickets</h2>
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-unicorn-gold/30 text-unicorn-gold"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
                <DropdownMenuCheckboxItem
                  checked={selectedStatuses.includes("open")}
                  onCheckedChange={(checked) => {
                    setSelectedStatuses(
                      checked
                        ? [...selectedStatuses, "open"]
                        : selectedStatuses.filter((s) => s !== "open")
                    );
                  }}
                >
                  Open
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatuses.includes("in_progress")}
                  onCheckedChange={(checked) => {
                    setSelectedStatuses(
                      checked
                        ? [...selectedStatuses, "in_progress"]
                        : selectedStatuses.filter((s) => s !== "in_progress")
                    );
                  }}
                >
                  In Progress
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatuses.includes("resolved")}
                  onCheckedChange={(checked) => {
                    setSelectedStatuses(
                      checked
                        ? [...selectedStatuses, "resolved"]
                        : selectedStatuses.filter((s) => s !== "resolved")
                    );
                  }}
                >
                  Resolved
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatuses.includes("closed")}
                  onCheckedChange={(checked) => {
                    setSelectedStatuses(
                      checked
                        ? [...selectedStatuses, "closed"]
                        : selectedStatuses.filter((s) => s !== "closed")
                    );
                  }}
                >
                  Closed
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-unicorn-gold/30 text-unicorn-gold"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Priority
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-unicorn-darkPurple/90 border-unicorn-gold/30 text-white">
                <DropdownMenuCheckboxItem
                  checked={selectedPriorities.includes("high")}
                  onCheckedChange={(checked) => {
                    setSelectedPriorities(
                      checked
                        ? [...selectedPriorities, "high"]
                        : selectedPriorities.filter((p) => p !== "high")
                    );
                  }}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedPriorities.includes("medium")}
                  onCheckedChange={(checked) => {
                    setSelectedPriorities(
                      checked
                        ? [...selectedPriorities, "medium"]
                        : selectedPriorities.filter((p) => p !== "medium")
                    );
                  }}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedPriorities.includes("low")}
                  onCheckedChange={(checked) => {
                    setSelectedPriorities(
                      checked
                        ? [...selectedPriorities, "low"]
                        : selectedPriorities.filter((p) => p !== "low")
                    );
                  }}
                >
                  Low
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20"
              onClick={fetchTickets}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead className="bg-unicorn-darkPurple/50 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Priority</th>
                    <th className="px-4 py-3 text-left">Created At</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-unicorn-gold/20">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-4 py-4">
                          <div className="h-4 bg-gray-700/50 rounded w-64"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-6 bg-gray-700/50 rounded w-20"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-6 bg-gray-700/50 rounded w-20"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-4 bg-gray-700/50 rounded w-32"></div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="h-8 bg-gray-700/50 rounded w-8 ml-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-unicorn-darkPurple/30"
                      >
                        <td className="px-4 py-4">
                          <div className="text-white font-medium">
                            {ticket.subject}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="px-4 py-4">
                          {getPriorityBadge(ticket.priority)}
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-400">
                          {formatDate(ticket.created_at)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Link to={`/admin/tickets/${ticket.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-unicorn-gold"
                              title="View details"
                            >
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-400"
                      >
                        No tickets found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTickets;
