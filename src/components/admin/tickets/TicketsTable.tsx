
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Ticket } from "@/types/investment";

interface TicketsTableProps {
  loading: boolean;
  filteredTickets: Ticket[];
}

const TicketsTable = ({ loading, filteredTickets }: TicketsTableProps) => {
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
      case "in_progress":
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
  );
};

export default TicketsTable;
