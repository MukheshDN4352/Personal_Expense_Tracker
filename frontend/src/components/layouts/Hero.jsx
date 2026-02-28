import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Hero= ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div
        className="
        mx-4 mt-4
        rounded-2xl
        backdrop-blur-2xl
        bg-white/5
        border border-white/10
        shadow-[0_15px_40px_rgba(0,0,0,0.4)]
        px-8 py-5
        flex items-center justify-between
        relative
      "
      >
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <button
            className="block lg:hidden text-slate-200"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          <h2 className="text-xl font-semibold text-slate-100 tracking-wide">
            ARTHAVYA
          </h2>
        </div>

        {/* Center Quote (hidden on small screens) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
          <p
            className="
              text-sm
              text-slate-300
              italic
              tracking-wide
              text-center
              max-w-xl
              opacity-80
            "
          >
            “It’s not about having lots of money. It’s knowing how to manage it.”
          </p>
        </div>

        {/* Right Spacer (keeps symmetry) */}
        <div className="w-[120px] hidden lg:block" />
      </div>

      {openSideMenu && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden">
          <div className="absolute top-[100px] left-4 rounded-2xl overflow-hidden shadow-2xl bg-slate-900/95 border border-white/10">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;