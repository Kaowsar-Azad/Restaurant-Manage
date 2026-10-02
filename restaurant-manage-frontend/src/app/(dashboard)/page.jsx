"use client";

import { useState } from "react";
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const SALES_DATA = [
  { day: "Mon", sales: 1450, orders: 42 },
  { day: "Tue", sales: 1820, orders: 55 },
  { day: "Wed", sales: 1600, orders: 48 },
  { day: "Thu", sales: 2100, orders: 68 },
  { day: "Fri", sales: 2850, orders: 94 },
  { day: "Sat", sales: 3420, orders: 112 },
  { day: "Sun", sales: 3100, orders: 98 },
];

export default function AnalyticsDashboard() {
  const [data] = useState(SALES_DATA);

  const stats = [
    { title: "Total Sales", value: "$16,340", icon: FiDollarSign, trend: "+18%" },
    { title: "Total Orders", value: "517", icon: FiShoppingBag, trend: "+12%" },
    { title: "Total Customers", value: "324", icon: FiUsers, trend: "+5%" },
    { title: "Avg Order Value", value: "$31.60", icon: FiTrendingUp, trend: "+6%" },
  ];

  return (
    <div className="space-y-10 pb-10">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark mb-2">Overview</h1>
        <p className="text-brand-dark/60 text-sm">Your restaurant's real-time sales and service metrics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-brand-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-bg rounded-xl text-brand-dark">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-brand-dark bg-brand-accent px-2.5 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-brand-dark/60 text-xs font-semibold uppercase tracking-wider mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-brand-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-brand-dark">Weekly Revenue</h3>
              <p className="text-xs text-brand-dark/50">Daily revenue over the past 7 days</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 bg-brand-bg rounded-lg text-brand-dark">
              This Week
            </span>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#28282b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#28282b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000a" />
                <XAxis dataKey="day" stroke="#28282b60" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#28282b60" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#28282b", borderRadius: "12px", border: "none", color: "#f0f4f1", fontSize: "12px", padding: "8px 12px" }}
                  itemStyle={{ color: "#f2ffbd" }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="sales" stroke="#28282b" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-brand-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-brand-dark">Recent Orders</h3>
            <span className="text-xs text-brand-dark/50">Live feed</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto">
            {[
              { id: "1045", table: "Table 4", items: "2 items", amount: "26.48", status: "Preparing" },
              { id: "1044", table: "Table 1", items: "3 items", amount: "38.50", status: "Completed" },
              { id: "1043", table: "Takeaway", items: "1 item", amount: "14.00", status: "Completed" },
              { id: "1042", table: "Table 3", items: "4 items", amount: "52.00", status: "Completed" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3.5 bg-brand-bg rounded-xl">
                <div>
                  <p className="font-semibold text-brand-dark text-sm">Order #{item.id}</p>
                  <p className="text-xs text-brand-dark/60">{item.items} • {item.table}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-dark text-sm">${item.amount}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${item.status === "Preparing" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
