import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const GlassTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="
          backdrop-blur-xl
          bg-white/10
          border border-white/20
          rounded-xl
          px-4 py-2
          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
        "
      >
        <p className="text-slate-200 text-sm font-medium">
          {payload[0].name}
        </p>
        <p className="text-slate-100 text-lg font-semibold">
          ${payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {

  // Convert totalAmount to number safely
  const numericTotal =
    typeof totalAmount === "string"
      ? Number(totalAmount.replace(/[^0-9.-]+/g, ""))
      : totalAmount;

  const isNegative = numericTotal < 0;

  // 🔴 If negative → override chart data
  const chartData = isNegative
    ? [{ name: "Negative Balance", amount: Math.abs(numericTotal) }]
    : data;

  const chartColors = isNegative ? ["#ef4444"] : colors;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
                style={{
                  filter: isNegative
                    ? "drop-shadow(0px 0px 12px rgba(239,68,68,0.6))"
                    : "drop-shadow(0px 0px 8px rgba(255,255,255,0.08))",
                }}
              />
            ))}
          </Pie>

          {!isNegative && (
            <Legend
              wrapperStyle={{
                color: "#94a3b8",
                paddingTop: "20px",
              }}
            />
          )}

          <Tooltip content={<GlassTooltip />} cursor={false} />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-20}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="14px"
              >
                {label}
              </text>

              <text
                x="50%"
                y="50%"
                dy={12}
                textAnchor="middle"
                fill={isNegative ? "#ef4444" : "#f8fafc"}
                fontSize="26px"
                fontWeight="600"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
    </motion.div>
  );
};

export default CustomPieChart;