
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface TicketsHeaderProps {
  title: string;
  onRefresh: () => void;
}

const TicketsHeader = ({ title, onRefresh }: TicketsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <Button
        variant="outline"
        className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20"
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};

export default TicketsHeader;
