import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Currency formatter
const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Professional Monochromatic Palette (Fintech style)
const COLORS = [
  "#6366F1",  // Indigo
  "#10B981",  // Emerald
  "#06B6D4",  // Cyan
  "#8B5CF6",  // Violet
  "#F43F5E",  // Rose
];

// Glass Tooltip
const GlassTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount } = payload[0].payload;

    return (
      <div className="
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        rounded-xl
        px-4 py-2
        shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      ">
        <p className="text-xs text-slate-400 font-medium">
          {category}
        </p>
        <p className="text-sm text-slate-100 font-semibold">
          {formatAmount(amount)}
        </p>
      </div>
    );
  }
  return null;
};

const Barchart= ({
  data = [],
  xAxisKey = "month",
  barKey = "amount",
}) => {
  if (!data.length) {
    return (
      <div className="text-center text-slate-400 py-10">
        No data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          stroke="rgba(255,255,255,0.08)"
          vertical={false}
        />

        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `₹${value}`}
        />

        <Tooltip content={<GlassTooltip />} cursor={false} />
        <defs>
  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#6366F1" stopOpacity={1}/>
    <stop offset="100%" stopColor="#312E81" stopOpacity={0.9}/>
  </linearGradient>
</defs>

      <Bar
  dataKey={barKey}
  barSize={34}
  radius={[10, 10, 0, 0]}
>
  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
      style={{
        filter: "drop-shadow(0px 6px 14px rgba(0,0,0,0.35))",
      }}
    />
  ))}
</Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;