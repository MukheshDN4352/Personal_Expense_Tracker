import React, { useRef, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../cards/CharAvatar";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();
  const { authUser, logout, updateProfile, isUpdatingProfile } =
    useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  // ================= IMAGE UPLOAD =================
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      await updateProfile({ profilePic: base64Image });
    };
  };

  // ================= NAVIGATION =================
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className="
        w-72
        mt-4 ml-4
        rounded-2xl
        backdrop-blur-2xl
        bg-white/5
        border border-white/10
        shadow-[0_15px_40px_rgba(0,0,0,0.4)]
        p-6
      "
    >
      {/* ================= USER INFO ================= */}
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <div className="relative group">
          {/* Profile Image OR Avatar */}
          {selectedImg || authUser?.profilePic ? (
            <img
              src={selectedImg || authUser?.profilePic}
              alt="Profile"
              className="
                w-24 h-24
                rounded-full
                object-cover
                border border-white/20
                shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                transition-all duration-300
              "
            />
          ) : (
            <div
              className="
                w-24 h-24
                rounded-full
                flex items-center justify-center
                bg-gradient-to-br from-[#111827] to-[#1f2937]
                border border-white/20
                shadow-[0_10px_30px_rgba(0,0,0,0.6)]
              "
            >
              <CharAvatar
                fullName={authUser?.fullName}
                width="w-24"
                height="h-24"
                style="text-2xl text-white"
              />
            </div>
          )}

          {/* ===== Glass Camera Button ===== */}
          <button
            onClick={handleImageClick}
            disabled={isUpdatingProfile}
            className={`
              absolute bottom-1 right-1
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-white/10
              backdrop-blur-2xl
              border border-white/20
              shadow-lg
              hover:scale-110
              transition-all duration-300
              active:scale-95
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
            `}
          >
            <Camera size={18} className="text-white" />
          </button>

          {/* Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
          />
        </div>

        <h5 className="text-slate-200 font-medium text-sm tracking-wide">
          {authUser?.fullName || ""}
        </h5>
      </div>

      {/* ================= MENU ITEMS ================= */}
      <div className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <motion.button
              key={`menu_${index}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleClick(item.path)}
              className={`
                relative
                flex items-center gap-4
                px-5 py-3
                rounded-xl
                text-sm
                transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-500/20 border border-blue-400/30 text-slate-100 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
                }
              `}
            >
              <item.icon className="text-lg" />
              {item.label}

              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-r-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;