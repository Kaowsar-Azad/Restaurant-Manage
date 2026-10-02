"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiBell, FiSearch, FiLogOut, FiMenu } from "react-icons/fi";

export default function Topbar({ onMenuToggle = () => {} }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-brand-bg flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-black/5 shrink-0">
      <div className="flex items-center gap-3 text-brand-dark/50 flex-1 max-w-md">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-xl text-brand-dark hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 bg-brand-white/80 px-3 py-1.5 rounded-xl border border-black/5 w-full max-w-[180px] xs:max-w-[240px] sm:max-w-xs transition-all focus-within:border-brand-dark/20 focus-within:bg-brand-white">
          <FiSearch className="w-4 h-4 text-brand-dark/40 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-xs sm:text-sm placeholder:text-brand-dark/40 text-brand-dark w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-2 text-brand-dark/60 hover:text-brand-dark transition-colors cursor-pointer">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent border-2 border-brand-bg rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-brand-dark/10"></div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-dark text-brand-bg flex items-center justify-center text-xs sm:text-sm font-bold shadow-xs">
            {initial}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-brand-dark hidden sm:inline max-w-[120px] truncate">
            {displayName}
          </span>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="p-1.5 text-brand-dark/50 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-black/5"
        >
          <FiLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  );
}
