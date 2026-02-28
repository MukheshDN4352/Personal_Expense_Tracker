import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

// Currency formatter
const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Premium Glass Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, amount } = payload[0].payload;

    return (
      <div
        className="
          backdrop-blur-xl
          bg-white/10
          border border-white/20
          rounded-xl
          px-4 py-2
          shadow-xl
        "
      >
        <p className="text-xs text-gray-300">{month}</p>
        <p className="text-sm font-semibold text-white mt-1">
          {formatAmount(amount)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="text-center text-gray-400 py-16">
        No data available.
      </div>
    );
  }

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 0, left: -10 }}
        >
          {/* Premium Gradient */}
          <defs>
            <linearGradient id="fintechGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.02} />
            </linearGradient>

            {/* Soft glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle grid */}
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(139,92,246,0.3)", strokeWidth: 1 }}
          />

        <Area
  type="monotone"
  dataKey="amount"
  stroke="#8B5CF6"
  strokeWidth={3}
  fill="url(#fintechGradient)"
  filter="url(#glow)"
  dot={{
    r: 4,
    stroke: "#8B5CF6",
    strokeWidth: 2,
    fill: "#0f172a", // dark inner to match glass background
  }}
  activeDot={{
    r: 7,
    stroke: "#ffffff",
    strokeWidth: 2,
    fill: "#8B5CF6",
  }}
/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;