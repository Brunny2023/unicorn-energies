
import React from "react";
import { User, Bot } from "lucide-react";

interface TicketMessageContentProps {
  title: string;
  content: string;
  authorType: "user" | "ai" | "admin";
  timestamp?: string;
}

const TicketMessageContent: React.FC<TicketMessageContentProps> = ({ 
  title, 
  content, 
  authorType,
  timestamp
}) => {
  return (
    <div className={`
      ${authorType === 'user' ? 'bg-unicorn-darkPurple border-unicorn-gold/20' : ''}
      ${authorType === 'ai' ? 'bg-unicorn-purple/10 border-unicorn-gold/10' : ''}
      ${authorType === 'admin' ? 'bg-unicorn-gold/10 border-unicorn-gold/20' : ''}
      border rounded-lg p-4
    `}>
      <div className="flex items-start mb-3">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-unicorn-gold/20 text-unicorn-gold mr-3">
          {authorType === 'user' && <User className="h-5 w-5" />}
          {authorType === 'ai' && <Bot className="h-5 w-5" />}
          {authorType === 'admin' && <User className="h-5 w-5" />}
        </div>
        <div>
          <div className="font-medium text-unicorn-gold">{title}</div>
          {timestamp && <div className="text-xs text-gray-400">{timestamp}</div>}
        </div>
      </div>
      <div className="text-white whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};

export default TicketMessageContent;
