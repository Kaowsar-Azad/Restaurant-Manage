import { FiPlus, FiFilter, FiSearch, FiCheck, FiClock, FiX } from "react-icons/fi";

export default function OrdersPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Orders & POS</h1>
          <p className="text-brand-dark/60 text-sm">Manage incoming orders or create a new one.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <FiPlus className="w-5 h-5" />
          <span>New Order</span>
        </button>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Order List Column */}
        <div className="lg:col-span-2 bg-brand-white rounded-2xl shadow-sm border border-black/5 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-black/5 flex items-center justify-between bg-brand-bg/50">
            <div className="flex items-center gap-4 bg-brand-white px-4 py-2 rounded-lg border border-black/5 w-64">
              <FiSearch className="text-brand-dark/40" />
              <input type="text" placeholder="Search orders..." className="bg-transparent border-none outline-none text-sm w-full text-brand-dark" />
            </div>
            <button className="p-2 text-brand-dark/60 hover:text-brand-dark hover:bg-brand-bg rounded-lg transition-colors">
              <FiFilter className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Order Item */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-transparent hover:border-black/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-brand-accent/20 text-brand-dark' : 'bg-brand-dark text-brand-accent'}`}>
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark group-hover:text-brand-dark transition-colors">Order #104{i}</h4>
                    <p className="text-xs text-brand-dark/60">Table {i} • 3 items • 10 mins ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-brand-dark">$45.00</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md ${i % 2 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {i % 2 === 0 ? 'Preparing' : 'Completed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Order / POS Column */}
        <div className="bg-brand-white rounded-2xl shadow-sm border border-black/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-black/5">
            <h3 className="font-bold text-xl text-brand-dark">Current Order</h3>
            <p className="text-brand-dark/60 text-sm">Table 4 • Walk-in Customer</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Cart Items */}
            {[1, 2].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="w-16 h-16 bg-brand-bg rounded-xl border border-black/5"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-brand-dark text-sm">Spicy Chicken Burger</h4>
                    <p className="font-bold text-brand-dark text-sm">$12.50</p>
                  </div>
                  <p className="text-xs text-brand-dark/50 mt-1">No onions, extra sauce</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-brand-bg rounded-lg px-2 py-1">
                      <button className="text-brand-dark/50 hover:text-brand-dark">-</button>
                      <span className="text-xs font-bold">1</span>
                      <button className="text-brand-dark/50 hover:text-brand-dark">+</button>
                    </div>
                    <button className="text-red-400 hover:text-red-500"><FiX /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-brand-bg/50 border-t border-black/5">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-brand-dark/60">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-dark">$25.00</span>
              </div>
              <div className="flex justify-between text-brand-dark/60">
                <span>Tax (10%)</span>
                <span className="font-semibold text-brand-dark">$2.50</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-brand-dark pt-2 border-t border-black/10">
                <span>Total</span>
                <span>$27.50</span>
              </div>
            </div>
            
            <button className="w-full py-4 bg-brand-dark text-brand-bg font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
              <FiCheck className="w-5 h-5" />
              <span>Complete Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
