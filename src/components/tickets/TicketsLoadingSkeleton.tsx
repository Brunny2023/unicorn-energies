
import React from "react";

const TicketsLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="p-4 border border-unicorn-gold/20 rounded-lg bg-unicorn-darkPurple/50 animate-pulse"
        >
          <div className="flex justify-between mb-2">
            <div className="h-6 bg-unicorn-gold/20 rounded-md w-1/3"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-unicorn-gold/20 rounded-md w-16"></div>
              <div className="h-6 bg-unicorn-gold/20 rounded-md w-16"></div>
            </div>
          </div>
          <div className="h-4 bg-unicorn-gold/10 rounded-md w-full mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-unicorn-gold/10 rounded-md w-1/4"></div>
            <div className="h-8 bg-unicorn-gold/10 rounded-md w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketsLoadingSkeleton;
