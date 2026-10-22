/**
 * --------------------------------------------------------------------------
 * সাইডবার নেভিগেশন কম্পোনেন্ট (src/components/layout/Sidebar.jsx)
 * --------------------------------------------------------------------------
 * 📌 ফিল্টার্ড কোর মেনু আইটেমস:
 *    ১. Staff: Orders (POS), Tables
 *    ২. Manager: Orders, Menu & Stock, Tables, Staff Sales
 *    ৩. Admin / Owner: Overview, Orders, Menu & Stock, Tables, Staff Sales, Team & Roles
 * --------------------------------------------------------------------------
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiList,
  FiGrid,
  FiMonitor,
  FiTrendingUp,
  FiShield,
  FiX,
} from "react-icons/fi";

const CORE_MENU_ITEMS = [
  { name: "Overview", icon: FiHome, path: "/", roles: ["OWNER", "Admin", "Owner"] },
  { name: "Orders (POS)", icon: FiMonitor, path: "/orders", roles: ["OWNER", "Admin", "Owner", "Manager", "Staff"] },
  { name: "Menu & Stock", icon: FiGrid, path: "/menu", roles: ["OWNER", "Admin", "Owner", "Manager"] },
  { name: "Tables", icon: FiList, path: "/tables", roles: ["OWNER", "Admin", "Owner", "Manager", "Staff"] },
  { name: "Staff Sales", icon: FiTrendingUp, path: "/analytics/staff-sales", roles: ["OWNER", "Admin", "Owner", "Manager"] },
  { name: "Team Management", icon: FiShield, path: "/staff", roles: ["OWNER", "Admin", "Owner"] },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();
  const [role, setRole] = useState("OWNER");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u?.role) setRole(u.role);
      }
    } catch (e) {}
  }, []);

  const normRole = (role || "").toUpperCase();
  const visibleItems = CORE_MENU_ITEMS.filter((item) =>
    item.roles.some((r) => r.toUpperCase() === normRole)
  );

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

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-brand-accent text-brand-dark font-bold shadow-sm"
                  : "text-brand-bg/70 hover:bg-white/5 hover:text-brand-bg"
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-brand-dark" : "text-brand-bg/70"}`} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-brand-bg/40 text-[11px] mb-0.5">Restroniti Cloud POS</p>
          <p className="text-brand-bg/80 font-medium text-xs">
            {normRole === "OWNER" || normRole === "ADMIN"
              ? "👔 রেস্টুরেন্ট ওনার (Owner)"
              : normRole === "MANAGER"
              ? "📋 ম্যানেজার (Manager)"
              : "🏃 স্টাফ / ওয়েটার (Staff)"}
          </p>
        </div>
      </div>
    </aside>
  );
}
