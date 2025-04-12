
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "deposit" | "withdrawal" | "investment" | "return";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface RecentActivitiesProps {
  loading?: boolean;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ loading = false }) => {
  // Sample data - would normally come from API/props
  const activities: ActivityItem[] = [
    {
      id: "tx-1",
      type: "deposit",
      amount: 2500,
      date: "2023-04-10T14:30:00Z",
      status: "completed"
    },
    {
      id: "tx-2",
      type: "investment",
      amount: 1000,
      date: "2023-04-08T09:15:00Z",
      status: "completed"
    },
    {
      id: "tx-3",
      type: "return",
      amount: 125,
      date: "2023-04-05T16:45:00Z",
      status: "completed"
    },
    {
      id: "tx-4",
      type: "withdrawal",
      amount: 500,
      date: "2023-04-02T11:20:00Z",
      status: "pending"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deposit":
      case "return":
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case "withdrawal":
      case "investment":
        return <ArrowUp className="h-4 w-4 text-unicorn-gold" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full bg-unicorn-purple/40" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-unicorn-purple/40" />
                  <Skeleton className="h-3 w-24 bg-unicorn-purple/40" />
                </div>
                <Skeleton className="h-4 w-16 ml-auto bg-unicorn-purple/40" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b border-unicorn-gold/10 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-unicorn-purple/30">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(activity.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    activity.type === 'deposit' || activity.type === 'return' 
                      ? 'text-green-500' 
                      : 'text-unicorn-gold'
                  }`}>
                    {activity.type === 'deposit' || activity.type === 'return' ? '+' : '-'}${activity.amount.toFixed(2)}
                  </p>
                  <p className={`text-xs ${
                    activity.status === 'completed' ? 'text-green-500' : 
                    activity.status === 'pending' ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
