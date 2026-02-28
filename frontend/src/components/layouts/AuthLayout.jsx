import React from "react";
import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* ===== Background Glow ===== */}
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* ===== Top Branding Section ===== */}
      <div className="absolute top-16 left-0 w-full flex flex-col items-center z-20 text-center px-4">

        {/* Glass Brand Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            px-14 py-5
            rounded-2xl
            backdrop-blur-2xl
            bg-white/5
            border border-white/15
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
        >
          <h1 className="text-4xl tracking-[8px] font-semibold text-slate-100">
            ARTHAVYA
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed"
        >
          Smart financial tracking built for clarity and control.
          <br />
          Designed to simplify the way you manage your money.
        </motion.p>

      </div>

      {/* ===== Centered Form Content ===== */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-48">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;