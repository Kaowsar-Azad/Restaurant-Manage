import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";

export default function AnalyticsDashboard() {
  const stats = [
    { title: "Total Sales", value: "$12,426", icon: FiDollarSign, trend: "+14%" },
    { title: "Total Orders", value: "842", icon: FiShoppingBag, trend: "+8%" },
    { title: "Total Customers", value: "324", icon: FiUsers, trend: "+2%" },
    { title: "Avg Order Value", value: "$48.50", icon: FiTrendingUp, trend: "+5%" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark mb-2">Overview</h1>
        <p className="text-brand-dark/60">Your restaurant's performance at a glance.</p>
      </header>

      {/* Grid using our Giats-inspired custom gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-brand-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-bg rounded-xl text-brand-dark">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-brand-dark bg-brand-accent px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-brand-dark/60 text-sm font-semibold uppercase tracking-wider mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-brand-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-brand-white p-8 rounded-2xl shadow-sm border border-black/5 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-brand-dark mb-6">Sales Activity</h3>
          <div className="flex-1 border-2 border-dashed border-brand-dark/10 rounded-xl flex items-center justify-center">
            <p className="text-brand-dark/40 font-medium">[ Sales Chart UI goes here ]</p>
          </div>
        </div>

        {/* Recent Orders Placeholder */}
        <div className="bg-brand-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col">
          <h3 className="text-lg font-bold text-brand-dark mb-6">Recent Orders</h3>
          <div className="flex-1 space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-brand-bg rounded-xl">
                <div>
                  <p className="font-semibold text-brand-dark">Order #{1042 + item}</p>
                  <p className="text-xs text-brand-dark/60">2 items • Table {item}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-dark">${(item * 12.5).toFixed(2)}</p>
                  <p className="text-xs text-[#52c41a] font-semibold">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
