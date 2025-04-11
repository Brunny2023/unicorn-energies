
import React from "react";

const InvestmentListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="p-4 border border-unicorn-gold/20 rounded-lg animate-pulse"
        >
          <div className="h-6 bg-unicorn-gold/20 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-unicorn-gold/10 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-unicorn-gold/10 rounded w-1/4"></div>
            <div className="h-4 bg-unicorn-gold/10 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentListSkeleton;
