"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign, FiRefreshCw, FiCalendar, FiArrowUpRight, FiActivity, FiBarChart2 } from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { API_BASE } from "@/lib/api";

const DEFAULT_SALES_DATA = [
  { day: "Sat", date: "2026-09-26", sales: 151.45, orders: 5 },
  { day: "Sun", date: "2026-09-27", sales: 188.69, orders: 6 },
  { day: "Mon", date: "2026-09-28", sales: 208.64, orders: 7 },
  { day: "Tue", date: "2026-09-29", sales: 188.69, orders: 6 },
  { day: "Wed", date: "2026-09-30", sales: 250.64, orders: 8 },
  { day: "Thu", date: "2026-10-01", sales: 312.05, orders: 9 },
  { day: "Fri", date: "2026-10-02", sales: 208.64, orders: 7 },
];

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      if (u?.role === "Staff") {
        setIsAuthorized(false);
        router.replace("/orders");
      } else {
        setIsAuthorized(true);
      }
    } catch (e) {
      setIsAuthorized(false);
      router.replace("/orders");
    }
  }, [router]);

  const [chartData, setChartData] = useState(DEFAULT_SALES_DATA);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [metricView, setMetricView] = useState("sales");
  const [chartStyle, setChartStyle] = useState("area");
  const [summary, setSummary] = useState({
    totalSales: 1508.80,
    totalOrders: 48,
    totalCustomers: 5,
    avgOrderValue: 31.43,
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/analytics/overview`);
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        setSummary({
          totalSales: d.totalSales || 0,
          totalOrders: d.totalOrders || 0,
          totalCustomers: d.totalCustomers || 0,
          avgOrderValue: d.avgOrderValue || 0,
        });
        if (Array.isArray(d.salesChart) && d.salesChart.length > 0) {
          setChartData(d.salesChart);
        }
        if (Array.isArray(d.recentOrders)) {
          setRecentOrders(d.recentOrders);
        }
        setIsLive(true);
      }
    } catch (e) {
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchAnalytics();
    }
  }, [isAuthorized]);

  if (isAuthorized !== true) {
    return null;
  }

  const stats = [
    {
      title: "Total Sales",
      value: `$${summary.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: FiDollarSign,
      trend: isLive ? "Live" : "Syncing",
      trendColor: "bg-emerald-100 text-emerald-800",
      accentBg: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Total Orders",
      value: summary.totalOrders.toString(),
      icon: FiShoppingBag,
      trend: `${summary.totalOrders} tickets`,
      trendColor: "bg-brand-accent text-brand-dark",
      accentBg: "bg-brand-accent text-brand-dark",
    },
    {
      title: "Total Customers",
      value: summary.totalCustomers.toString(),
      icon: FiUsers,
      trend: "Registered",
      trendColor: "bg-blue-100 text-blue-800",
      accentBg: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Avg Order Value",
      value: `$${summary.avgOrderValue.toFixed(2)}`,
      icon: FiTrendingUp,
      trend: "Dynamic",
      trendColor: "bg-purple-100 text-purple-800",
      accentBg: "bg-purple-500/10 text-purple-600",
    },
  ];

  const bestDay = chartData.reduce(
    (max, cur) => (cur.sales > max.sales ? cur : max),
    chartData[0] || { day: "N/A", sales: 0 }
  );

  const totalWeeklyRevenue = chartData.reduce((sum, item) => sum + (item.sales || 0), 0);
  const avgDailyRevenue = chartData.length > 0 ? totalWeeklyRevenue / chartData.length : 0;

  const CustomChartTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-[#0f172a] text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700/60 text-xs min-w-[180px] backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <FiCalendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{dataPoint.day}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{dataPoint.date}</span>
          </div>
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Revenue:
            </span>
            <span className="font-bold text-emerald-400 text-sm font-mono">
              ${dataPoint.sales?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Orders:
            </span>
            <span className="font-bold text-indigo-300 font-mono">
              {dataPoint.orders} tickets
            </span>
          </div>
          {dataPoint.orders > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-700/40 text-[10px] text-slate-400 flex justify-between">
              <span>Avg Ticket:</span>
              <span className="font-semibold text-slate-200">${(dataPoint.sales / dataPoint.orders).toFixed(2)}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark mb-1">Overview</h1>
          <p className="text-brand-dark/60 text-sm">Your restaurant's real-time sales and service metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-brand-white border border-black/5 rounded-xl shadow-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="text-xs font-bold text-brand-dark">
              {isLive ? "Live Charts" : "Syncing..."}
            </span>
          </div>

          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-3 py-2 bg-brand-white border border-black/5 hover:border-black/20 rounded-xl text-brand-dark transition-all cursor-pointer shadow-xs text-xs font-bold"
            title="Refresh Live Data"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-brand-white p-5 sm:p-6 rounded-2xl shadow-xs border border-black/5 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.accentBg} transition-transform group-hover:scale-105`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${stat.trendColor}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-brand-dark/60 text-xs font-semibold uppercase tracking-wider mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-brand-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-brand-white p-6 sm:p-7 rounded-2xl shadow-xs border border-black/5 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-brand-dark">Revenue Performance</h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Live Feed
                </span>
              </div>
              <p className="text-xs text-brand-dark/50 mt-0.5">
                Dynamic 7-day revenue & sales analytics
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-black/5">
                <button
                  onClick={() => setChartStyle("area")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    chartStyle === "area"
                      ? "bg-brand-dark text-brand-bg shadow-xs"
                      : "text-brand-dark/60 hover:text-brand-dark"
                  }`}
                >
                  <FiActivity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Area Wave</span>
                </button>
                <button
                  onClick={() => setChartStyle("bar")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    chartStyle === "bar"
                      ? "bg-brand-dark text-brand-bg shadow-xs"
                      : "text-brand-dark/60 hover:text-brand-dark"
                  }`}
                >
                  <FiBarChart2 className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Bar Pillars</span>
                </button>
              </div>

              <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-black/5">
                <button
                  onClick={() => setMetricView("sales")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    metricView === "sales"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-brand-dark/60 hover:text-brand-dark"
                  }`}
                >
                  Revenue ($)
                </button>
                <button
                  onClick={() => setMetricView("orders")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    metricView === "orders"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-brand-dark/60 hover:text-brand-dark"
                  }`}
                >
                  Orders (#)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6 bg-brand-bg/50 p-3.5 rounded-xl border border-black/5">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-dark/50">7-Day Total</span>
              <p className="text-base sm:text-lg font-bold text-brand-dark mt-0.5">${totalWeeklyRevenue.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-dark/50">Daily Average</span>
              <p className="text-base sm:text-lg font-bold text-brand-dark mt-0.5">${avgDailyRevenue.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-dark/50">Peak Day</span>
              <p className="text-base sm:text-lg font-bold text-brand-dark mt-0.5 flex items-center gap-1">
                <span>{bestDay.day}</span>
                <span className="text-xs text-emerald-600 font-bold">(${bestDay.sales?.toFixed(2)})</span>
                <FiArrowUpRight className="w-4 h-4 text-emerald-600" />
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartStyle === "area" ? (
                <AreaChart data={chartData} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="emeraldSalesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.45} />
                      <stop offset="60%" stopColor="#10B981" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="indigoOrdersGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.45} />
                      <stop offset="60%" stopColor="#6366F1" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => (metricView === "sales" ? `$${v}` : `${v}`)}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <ReferenceLine
                    y={metricView === "sales" ? avgDailyRevenue : 7}
                    stroke="#10B981"
                    strokeDasharray="4 4"
                    strokeOpacity={0.5}
                    label={{
                      value: metricView === "sales" ? `Avg: $${avgDailyRevenue.toFixed(0)}` : "Avg Orders",
                      fill: "#059669",
                      fontSize: 10,
                      fontWeight: 700,
                      position: "top",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={metricView === "sales" ? "sales" : "orders"}
                    stroke={metricView === "sales" ? "#10B981" : "#6366F1"}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill={metricView === "sales" ? "url(#emeraldSalesGrad)" : "url(#indigoOrdersGrad)"}
                    dot={{ r: 4, fill: "#ffffff", stroke: metricView === "sales" ? "#10B981" : "#6366F1", strokeWidth: 2.5 }}
                    activeDot={{ r: 7, fill: metricView === "sales" ? "#10B981" : "#6366F1", stroke: "#ffffff", strokeWidth: 3 }}
                  />
                </AreaChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => (metricView === "sales" ? `$${v}` : `${v}`)}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar
                    dataKey={metricView === "sales" ? "sales" : "orders"}
                    radius={[10, 10, 4, 4]}
                    maxBarSize={48}
                  >
                    {chartData.map((entry, index) => {
                      const isPeak = entry.day === bestDay.day && metricView === "sales";
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={isPeak ? "#10B981" : "#0F172A"}
                          stroke={isPeak ? "#059669" : "transparent"}
                          strokeWidth={isPeak ? 2 : 0}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-brand-white p-6 sm:p-7 rounded-2xl shadow-xs border border-black/5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-brand-dark">Recent Orders</h3>
              <p className="text-xs text-brand-dark/50">Live feed from POS</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-bg rounded-md text-brand-dark">
              Real-time
            </span>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[380px]">
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-brand-dark/50 bg-brand-bg/40 rounded-xl">
                No orders registered yet.
              </div>
            ) : (
              recentOrders.map((item) => (
                <div
                  key={item._id || item.orderNumber}
                  className="flex items-center justify-between p-3.5 bg-brand-bg rounded-xl border border-black/5 hover:border-black/15 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-brand-dark text-xs truncate">
                      Order #{item.orderNumber}
                    </p>
                    <p className="text-[11px] text-brand-dark/60 font-medium truncate mt-0.5">
                      {item.customerName || "Customer"} • {item.tableNumber}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-brand-dark text-xs">${item.total?.toFixed(2)}</p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 ${
                        item.orderStatus === "Preparing"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
