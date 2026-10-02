"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList, FiGrid, FiUsers, FiMonitor } from "react-icons/fi";

const ALL_MENU_ITEMS = [
  { name: "Overview", icon: FiHome, path: "/", roles: ["Admin", "Manager"] },
  { name: "Orders (POS)", icon: FiMonitor, path: "/orders", roles: ["Admin", "Manager", "Staff"] },
  { name: "Menu & Categories", icon: FiGrid, path: "/menu", roles: ["Admin", "Manager", "Staff"] },
  { name: "Tables", icon: FiList, path: "/tables", roles: ["Admin", "Manager", "Staff"] },
  { name: "Customers", icon: FiUsers, path: "/customers", roles: ["Admin", "Manager"] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState("Admin");

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
    <aside className="w-64 bg-brand-dark flex flex-col h-full border-r border-black/10">
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
        <h2 className="text-brand-bg font-bold text-xl tracking-tight">RestoManage</h2>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-accent text-brand-dark">
          {role}
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1.5">
        {visibleItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
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
