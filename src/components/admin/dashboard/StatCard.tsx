
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  subtitle?: {
    label: string;
    value: string;
  };
}

const StatCard = ({ title, value, icon: Icon, iconColor, bgColor, subtitle }: StatCardProps) => {
  return (
    <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
            {subtitle && (
              <div className="mt-2 flex text-sm text-gray-400">
                <span>{subtitle.label} </span>
                <span className="ml-1 text-unicorn-gold">{subtitle.value}</span>
              </div>
            )}
          </div>
          <div className={`h-12 w-12 rounded-full ${bgColor} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
