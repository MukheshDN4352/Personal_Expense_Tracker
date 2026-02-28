import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "0px 15px 40px rgba(0,0,0,0.35)",
      }}
      transition={{ duration: 0.3 }}
      className="
        relative
        flex items-center gap-5
        p-6
        rounded-2xl
        backdrop-blur-2xl
        bg-white/[0.06]
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Accent Glow Background */}
      <div
        className={`absolute inset-0 opacity-20 blur-2xl ${color}`}
      />

      {/* Icon Container */}
      <div
        className={`
          relative z-10
          w-14 h-14
          flex items-center justify-center
          rounded-xl
          ${color}
          bg-opacity-20
          border border-white/10
        `}
      >
        <div className="text-white text-xl">
          {icon}
        </div>
      </div>

      {/* Text Section */}
      <div className="relative z-10">
        <p className="text-sm text-slate-400 mb-1 tracking-wide">
          {label}
        </p>

        <h3 className="text-2xl font-semibold text-slate-100 tracking-tight">
          ${value}
        </h3>
      </div>

      {/* Subtle Glass Shine */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent" />
    </motion.div>
  );
};

export default InfoCard;