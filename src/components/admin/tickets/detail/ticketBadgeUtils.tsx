
import React from "react";
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open':
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Open</Badge>;
    case 'in_progress':
    case 'in-progress':
      return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">In Progress</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Resolved</Badge>;
    case 'closed':
      return <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">Closed</Badge>;
    case 'replied':
      return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">Replied</Badge>;
    default:
      return null;
  }
};

export const getPriorityBadge = (priority: string) => {
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
