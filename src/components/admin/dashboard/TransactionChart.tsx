
import { Card, CardContent } from "@/components/ui/card";
import { ChartDataPoint } from "@/types/admin";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TransactionChartProps {
  data: ChartDataPoint[];
  loading: boolean;
}

const TransactionChart = ({ data, loading }: TransactionChartProps) => {
  return (
    <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Transaction Overview (Last 7 Days)</h3>
        <div className="h-80">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400">Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    borderColor: '#444',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="deposits" name="Deposits" fill="#10B981" />
                <Bar dataKey="withdrawals" name="Withdrawals" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionChart;
