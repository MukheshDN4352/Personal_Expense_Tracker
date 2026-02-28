import React, { useEffect, useState } from "react";

const WaterLimitIndicator = ({ upperLimit, totalExpenses }) => {
  const [explode, setExplode] = useState(false);

  const rawPercentage = (totalExpenses / upperLimit) * 100;
  const percentage = Math.min(rawPercentage, 100);
  const isExceeded = rawPercentage >= 100;

  useEffect(() => {
    if (isExceeded) {
      setExplode(true);
      const timer = setTimeout(() => setExplode(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isExceeded]);

  // Smooth color transition
  const getWaterColor = () => {
    if (rawPercentage < 60) return "#10b981"; // green
    if (rawPercentage < 85) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  return (
    <div className="flex flex-col items-center space-y-6">

      {/* Glass */}
      <div
        className="
          relative w-44 h-[420px]
          rounded-[40px]
          backdrop-blur-3xl
          bg-white/[0.05]
          border border-white/[0.1]
          shadow-[0_25px_80px_rgba(0,0,0,0.55)]
          overflow-hidden
        "
      >
        {/* Water Container */}
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-700"
          style={{ height: `${percentage}%` }}
        >
          {/* SVG Wave */}
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-[200%] h-20 animate-wave"
          >
            <path
              d="M0,40 C150,80 350,0 500,40 L500,150 L0,150 Z"
              fill={getWaterColor()}
            />
          </svg>

          {/* Solid Fill Below Wave */}
          <div
            style={{ background: getWaterColor() }}
            className="absolute bottom-0 w-full h-full"
          />
        </div>

        {/* Glass shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 pointer-events-none" />
      </div>

      {/* Status */}
      <div className="text-center">
        {isExceeded ? (
          <p className="text-red-400 text-sm font-medium">
            ⚠ Budget Limit Reached
            <br/>
            Use only for emergency purposes
          </p>
        ) : rawPercentage > 75 ? (
          <p className="text-orange-400 text-sm font-medium">
            ⚠ Approaching Limit
          </p>
        ) : (
          <p className="text-emerald-400 text-sm font-medium">
            Safe Spending Zone
          </p>
        )}
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-wave {
            animation: wave 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default WaterLimitIndicator;