import Link from "next/link";
import { FiHome, FiList, FiGrid, FiUsers, FiMonitor } from "react-icons/fi";

export default function Sidebar() {
  const menuItems = [
    { name: "Overview", icon: FiHome, path: "/" },
    { name: "Orders (POS)", icon: FiMonitor, path: "/orders" },
    { name: "Menu & Categories", icon: FiGrid, path: "/menu" },
    { name: "Customers", icon: FiUsers, path: "/customers" },
    { name: "Tables", icon: FiList, path: "/tables" },
  ];

  return (
    <aside className="w-64 bg-brand-dark flex flex-col h-full border-r border-black/10">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <h2 className="text-brand-bg font-bold text-xl tracking-tight">RestoManage</h2>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = index === 0; // For demo purposes, hardcoding active state
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-brand-accent/10 text-brand-accent font-semibold"
                  : "text-brand-bg/70 hover:bg-white/5 hover:text-brand-bg"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-brand-accent" : "text-brand-bg/70"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-brand-bg/50 text-xs mb-2">Powered by</p>
          <p className="text-brand-bg font-medium text-sm tracking-wide">Giats Inspiration</p>
        </div>
      </div>
    </aside>
  );
}
