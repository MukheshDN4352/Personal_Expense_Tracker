import React from "react";
import NavBar from "./NavBar"
import SideMenu from "./SideMenu";
import { useAuthStore } from "../../store/useAuthStore";

const Dashboardlayout = ({ children, activeMenu }) => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4">

      {/* Rounded Main Container */}
      <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/5">

        <NavBar activeMenu={activeMenu} />

        {authUser && (
          <div className="flex">

            <SideMenu activeMenu={activeMenu} />

            {/* Content Area */}
            <div className="flex-1 p-8">
              {children}
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboardlayout;