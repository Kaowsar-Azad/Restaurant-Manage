import { FiBell, FiSearch, FiLogOut } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className="h-16 bg-brand-bg flex items-center justify-between px-8 border-b border-black/5">
      <div className="flex items-center gap-4 text-brand-dark/50">
        <FiSearch className="w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search anywhere..." 
          className="bg-transparent border-none outline-none text-sm placeholder:text-brand-dark/40 text-brand-dark w-64"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-brand-dark/60 hover:text-brand-dark transition-colors">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-brand-accent border-2 border-brand-bg rounded-full"></span>
        </button>
        
        <div className="h-8 w-px bg-brand-dark/10"></div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-dark text-brand-bg flex items-center justify-center text-sm font-bold">
            A
          </div>
          <span className="text-sm font-semibold text-brand-dark">Admin User</span>
        </div>

        <button className="text-brand-dark/50 hover:text-red-500 transition-colors ml-2">
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
