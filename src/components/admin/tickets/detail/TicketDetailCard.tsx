
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ticket } from "@/types/investment";
import TicketHeaderInfo from "./TicketHeaderInfo";
import TicketMessageContent from "./TicketMessageContent";

interface TicketDetailCardProps {
  ticket: Ticket;
}

const TicketDetailCard = ({ ticket }: TicketDetailCardProps) => {
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <TicketHeaderInfo ticket={ticket} />
      </CardHeader>
      <CardContent>
        <TicketMessageContent ticket={ticket} />
      </CardContent>
    </Card>
  );
};

export default TicketDetailCard;
