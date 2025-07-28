import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { name: "Aug 2023", total: 15, levies: 10, invoices: 5 },
  { name: "Sep 2023", total: 30, levies: 20, invoices: 10 },
  { name: "Oct 2023", total: 60, levies: 40, invoices: 20 },
  { name: "Nov 2023", total: 40, levies: 25, invoices: 15 },
  { name: "Dec 2023", total: 80, levies: 50, invoices: 30 },
  { name: "Jan 2024", total: 100, levies: 60, invoices: 40 },
];

// Solid Dot Component
const SolidDot = ({ cx, cy, fill }) => (
  <circle cx={cx} cy={cy} r={4} fill={fill} stroke="none" />
);

export default function AdminFinanceTrends() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-medium text-[#111827]">
            Revenue Trends
          </h3>
          <p className="text-xs text-[#4B5563]">
            Monthly financial performance overview
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fontSize: 12 }}
              axisLine={true}
            />
            <YAxis
              tickLine={false}
              tick={{ fontSize: 12 }}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `N${value}M`}
              axisLine={true}
            />
            <Tooltip
              formatter={(value, name) => [
                `N${value}M`,
                name === "total"
                  ? "Total Revenue"
                  : name === "levies"
                  ? "Levies Collected"
                  : "Invoice Payments",
              ]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#059669"
              fill="none"
              dot={<SolidDot fill="#059669" />}
            />
            <Area
              type="monotone"
              dataKey="levies"
              stroke="#2563EB"
              fill="none"
              dot={<SolidDot fill="#2563EB" />}
            />
            <Area
              type="monotone"
              dataKey="invoices"
              stroke="#CA8A04"
              fill="none"
              dot={<SolidDot fill="#CA8A04" />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#16A34A] mr-2"></div>
          <span className="text-sm text-gray-700">Total Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#2563EB] mr-2"></div>
          <span className="text-sm text-gray-700">Levies Collected</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#CA8A04] mr-2"></div>
          <span className="text-sm text-gray-700">Invoice Payments</span>
        </div>
      </div>
    </div>
  );
}
