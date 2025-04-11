
import React from "react";
import { Calendar, Clock } from "lucide-react";

interface InvestmentDetailTimelineProps {
  startDate: string;
  endDate: string;
  duration: number;
}

const InvestmentDetailTimeline: React.FC<InvestmentDetailTimelineProps> = ({ 
  startDate, 
  endDate, 
  duration 
}) => {
  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-unicorn-gold mb-4">Timeline</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400">Start Date</span>
          </div>
          <span>{formatDate(startDate)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400">End Date</span>
          </div>
          <span>{formatDate(endDate)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400">Duration</span>
          </div>
          <span>{duration} days</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetailTimeline;
