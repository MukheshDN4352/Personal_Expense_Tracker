import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 backdrop-blur-md
          "
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              relative
              w-full max-w-2xl
              rounded-2xl
              backdrop-blur-3xl
              bg-white/[0.05]
              border border-white/[0.08]
              shadow-[0_30px_80px_rgba(0,0,0,0.6)]
             overflow-visible
            "
          >
            {/* Subtle reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {title}
              </h3>

              <button
                onClick={onClose}
                className="
                  p-2 rounded-lg
                  bg-white/[0.06]
                  border border-white/[0.1]
                  text-gray-300
                  hover:bg-white/[0.1]
                  transition-all duration-200
                "
              >
                <LuX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="relative z-10 px-6 py-6 text-gray-200">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;