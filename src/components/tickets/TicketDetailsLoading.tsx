
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const TicketDetailsLoading = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-unicorn-gold/20 rounded w-1/3 animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-unicorn-gold/20 rounded w-16 animate-pulse"></div>
              <div className="h-6 bg-unicorn-gold/20 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 bg-unicorn-gold/10 rounded w-1/2 animate-pulse mt-2"></div>
        </CardHeader>
      </Card>
      
      <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="h-24 bg-unicorn-gold/10 rounded w-full animate-pulse"></div>
            <div className="h-24 bg-unicorn-gold/10 rounded w-full animate-pulse"></div>
            <div className="pt-4 border-t border-unicorn-gold/20">
              <div className="h-10 bg-unicorn-gold/10 rounded w-1/3 animate-pulse mt-4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetailsLoading;
