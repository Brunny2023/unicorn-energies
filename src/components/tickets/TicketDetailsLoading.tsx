
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const TicketDetailsLoading = () => {
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <div className="h-6 bg-unicorn-gold/20 rounded w-1/3 animate-pulse mb-2"></div>
        <div className="h-4 bg-unicorn-gold/10 rounded w-1/2 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 bg-unicorn-gold/10 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-unicorn-gold/10 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-unicorn-gold/10 rounded w-3/4 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDetailsLoading;
