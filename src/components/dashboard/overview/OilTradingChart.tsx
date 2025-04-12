
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for oil trading chart
const generateMockData = (days = 30, startPrice = 75, volatility = 0.02) => {
  const data = [];
  let currentPrice = startPrice;
  let brentPrice = startPrice + 5;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Random walk with some correlation between WTI and Brent
    const wtiChange = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice = Math.max(20, currentPrice + wtiChange);
    
    const brentChange = wtiChange + (Math.random() - 0.5) * volatility * brentPrice * 0.5;
    brentPrice = Math.max(22, brentPrice + brentChange);
    
    data.push({
      date: date.toISOString().split('T')[0],
      wti: parseFloat(currentPrice.toFixed(2)),
      brent: parseFloat(brentPrice.toFixed(2)),
    });
  }
  
  return data;
};

const timeRanges = [
  { label: '1D', value: '1d', days: 1 },
  { label: '1W', value: '1w', days: 7 },
  { label: '1M', value: '1m', days: 30 },
  { label: '3M', value: '3m', days: 90 },
  { label: 'YTD', value: 'ytd', days: 120 },
  { label: '1Y', value: '1y', days: 365 },
];

const OilTradingChart = () => {
  const [timeRange, setTimeRange] = React.useState('1m');
  const [chartData, setChartData] = React.useState(() => 
    generateMockData(timeRanges.find(r => r.value === '1m')?.days || 30)
  );
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    const range = timeRanges.find(r => r.value === value);
    if (range) {
      setChartData(generateMockData(range.days));
    }
  };
  
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-white">Oil Trading Prices</CardTitle>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[100px] h-8 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
            <SelectValue placeholder="1M" />
          </SelectTrigger>
          <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="h-[300px] mt-4">
          <ChartContainer
            config={{
              wti: {
                label: "WTI Crude",
                color: "#38BDF8"
              },
              brent: {
                label: "Brent Crude",
                color: "#FB923C"
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: "#9CA3AF" }}
                  tickLine={{ stroke: "#4B5563" }}
                  axisLine={{ stroke: "#4B5563" }}
                  tickFormatter={(date) => {
                    if (timeRange === '1d') {
                      return date.substring(11, 16);
                    }
                    if (timeRange === '1w' || timeRange === '1m') {
                      return date.substring(5);
                    }
                    return date.substring(5, 10);
                  }}
                />
                <YAxis 
                  tick={{ fill: "#9CA3AF" }}
                  tickLine={{ stroke: "#4B5563" }}
                  axisLine={{ stroke: "#4B5563" }}
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-unicorn-darkPurple/90 border border-unicorn-gold/30 p-2 rounded text-xs">
                          <p className="text-gray-300 mb-1">{payload[0].payload.date}</p>
                          <p className="text-[#38BDF8]">
                            WTI: ${payload[0].value}
                          </p>
                          <p className="text-[#FB923C]">
                            Brent: ${payload[1].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="top"
                  wrapperStyle={{
                    paddingBottom: "10px",
                    fontSize: "12px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wti"
                  strokeWidth={2}
                  stroke="#38BDF8"
                  dot={false}
                  activeDot={{ r: 5, fill: "#38BDF8", stroke: "#FFFFFF" }}
                />
                <Line
                  type="monotone"
                  dataKey="brent"
                  strokeWidth={2}
                  stroke="#FB923C"
                  dot={false}
                  activeDot={{ r: 5, fill: "#FB923C", stroke: "#FFFFFF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="bg-unicorn-darkPurple/50 rounded p-2">
            <p className="text-xs text-gray-400">WTI Crude</p>
            <p className="text-lg font-semibold text-white">${chartData[chartData.length - 1].wti}</p>
            <p className="text-xs text-green-400">
              +${(chartData[chartData.length - 1].wti - chartData[0].wti).toFixed(2)} (+{((chartData[chartData.length - 1].wti / chartData[0].wti - 1) * 100).toFixed(2)}%)
            </p>
          </div>
          <div className="bg-unicorn-darkPurple/50 rounded p-2">
            <p className="text-xs text-gray-400">Brent Crude</p>
            <p className="text-lg font-semibold text-white">${chartData[chartData.length - 1].brent}</p>
            <p className="text-xs text-green-400">
              +${(chartData[chartData.length - 1].brent - chartData[0].brent).toFixed(2)} (+{((chartData[chartData.length - 1].brent / chartData[0].brent - 1) * 100).toFixed(2)}%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OilTradingChart;
