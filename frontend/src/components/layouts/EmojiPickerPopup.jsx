import React, { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="
          w-14 h-14
          flex items-center justify-center
          text-2xl
          rounded-xl
          bg-white/[0.05]
          border border-white/[0.1]
          backdrop-blur-md
        ">
          {icon ? (
            <img src={icon} alt="Icon" className="w-10 h-10" />
          ) : (
            <LuImage className="text-gray-400" />
          )}
        </div>
        <p className="text-sm text-gray-400 font-medium">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="
              relative mt-4
              rounded-2xl
              backdrop-blur-3xl
              bg-white/[0.05]
              border border-white/[0.08]
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
              p-4
            "
          >
            <button
              onClick={() => setIsOpen(false)}
              className="
                absolute top-3 right-3
                p-2 rounded-lg
                bg-white/[0.06]
                border border-white/[0.1]
                text-gray-300
              "
            >
              <LuX size={16} />
            </button>

            <EmojiPicker
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
              lazyLoadEmojis
              skinTonesDisabled
              theme="dark"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiPickerPopup;