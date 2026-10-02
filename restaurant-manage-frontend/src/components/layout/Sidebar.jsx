"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList, FiGrid, FiUsers, FiMonitor, FiX } from "react-icons/fi";

const ALL_MENU_ITEMS = [
  { name: "Overview", icon: FiHome, path: "/", roles: ["Admin", "Manager"] },
  { name: "Orders (POS)", icon: FiMonitor, path: "/orders", roles: ["Admin", "Manager", "Staff"] },
  { name: "Menu & Categories", icon: FiGrid, path: "/menu", roles: ["Admin", "Manager", "Staff"] },
  { name: "Tables", icon: FiList, path: "/tables", roles: ["Admin", "Manager", "Staff"] },
  { name: "Customers", icon: FiUsers, path: "/customers", roles: ["Admin", "Manager"] },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();
  const [role, setRole] = useState("Staff");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u?.role) setRole(u.role);
      }
    } catch (e) {}
  }, []);

  const visibleItems = ALL_MENU_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-brand-dark flex flex-col h-full border-r border-black/10 transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0 ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-brand-bg font-bold text-xl tracking-tight">RestoManage</h2>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-accent text-brand-dark">
            {role}
          </span>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-brand-bg/60 hover:text-brand-bg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-brand-accent text-brand-dark font-bold shadow-sm"
                  : "text-brand-bg/70 hover:bg-white/5 hover:text-brand-bg"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-brand-dark" : "text-brand-bg/70"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-brand-bg/40 text-xs mb-1">RestoManage POS</p>
          <p className="text-brand-bg/80 font-medium text-xs">Role: {role}</p>
        </div>
      </div>
    </aside>
  );
}
