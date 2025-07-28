import React from "react";
import { FaChartLine, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function GroupAnalysis() {
  // Revenue data for bar chart
  const revenueData = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    chartData: [
      { name: "Jan", value: 12.5 },
      { name: "Feb", value: 15.2 },
      { name: "Mar", value: 18.7 },
      { name: "Apr", value: 22.1 },
      { name: "May", value: 24.8 },
      { name: "Jun", value: 25.3 },
    ],
    currentPeriod: {
      value: "N25.3M",
      description: "Current Period ",
      period: "+15.2% vs previous",
    },
    previousPeriod: {
      value: "N19.7M",
      description: "Previous Period ",
      period: "Average growth",
    },
    ytd: {
      value: "N127.6M",
      description: "Total YTD ",
      period: "Target: N150M",
    },
  };

  // Membership data for pie chart
  const membershipData = {
    categories: ["Unit Level", "State Level", "National Level"],
    total: 247,
    chartData: [
      { name: "Unit Level", value: 89, percentage: "36.1%", color: "#10B981" },
      {
        name: "State Level",
        value: 127,
        percentage: "51.4%",
        color: "#3B82F6",
      },
      {
        name: "National Level",
        value: 31,
        percentage: "12.5%",
        color: "#8B5CF6",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Revenue Trend Analysis Card */}
      <div className="bg-white rounded-lg  border border-gray-200 shadow-sm">
        <div className="flex flex-col px-6 py-3 border-b gap-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Revenue Trend Analysis
          </h2>
          <p className="text-sm text-gray-500">
            Track financial performance over time
          </p>
        </div>

        {/* Bar Chart */}
        <div className="h-64 px-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData.chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563" }} // <-- Correct color for months
              />

              {/* Removed YAxis */}

              <Tooltip
                formatter={(value) => [`N${value}M`, "Revenue"]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />

              <Bar
                dataKey="value"
                fill="url(#greenGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center p-6">
          <div className="">
            <div className="text-xl font-bold text-[#1F2937]">
              {revenueData.currentPeriod.value}
            </div>
            <div className="text-xs text-[#4B5563]">
              {revenueData.currentPeriod.description}
            </div>
            <div className="text-xs text-[#16A34A]">
              {revenueData.currentPeriod.period}
            </div>
          </div>

          <div className="">
            <div className="text-xl font-bold text-[#1F2937]">
              {revenueData.previousPeriod.value}
            </div>
            <div className="text-xs text-[#4B5563]">
              {revenueData.previousPeriod.description}
            </div>
            <div className="text-xs text-[#2563EB]">
              {revenueData.previousPeriod.period}
            </div>
          </div>

          <div className="">
            <div className="text-xl font-bold text-[#1F2937]">
              {revenueData.ytd.value}
            </div>
            <div className="text-xs text-[#4B5563]">
              {revenueData.ytd.description}
            </div>
            <div className="text-xs text-[#9333EA]">
              {revenueData.ytd.period}
            </div>
          </div>
        </div>
      </div>

      {/* Membership Category Breakdown Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
  <div className="flex flex-col px-6 py-3 border-b gap-2 mb-4">
    <h2 className="text-lg font-semibold text-gray-800">
      Membership Category Breakdown
    </h2>
    <p className="text-sm text-gray-500">
      Distribution of institutions by membership level
    </p>
  </div>

  {/* Chart Section */}
  <div className="relative h-64 px-6">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={membershipData.chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          stroke="#fff" // adds space between slices
          strokeWidth={2}
        >
          {membershipData.chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value, name, props) => [
            `${value} (${props.payload.percentage})`,
            name,
          ]}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>

    {/* Total in center circle */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center">
        <span className="text-base font-bold text-gray-800">
          {membershipData.total}
        </span>
        <span className="text-[10px] text-gray-500">Total</span>
      </div>
    </div>
  </div>

  {/* Legend */}
  <div className="flex flex-col px-6 pb-4">
    <div className="space-y-2">
      {membershipData.chartData.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-xs text-gray-600"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
          <span className="text-gray-800 font-medium">
            {item.value} ({item.percentage})
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
  );
}
