import { FiPlus, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";

export default function MenuPage() {
  const categories = ["All", "Burgers", "Pizzas", "Drinks", "Desserts"];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Menu & Categories</h1>
          <p className="text-brand-dark/60 text-sm">Manage your restaurant's food items and categories.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2.5 bg-brand-white text-brand-dark font-semibold rounded-xl border border-black/5 hover:bg-brand-bg transition-colors">
            Add Category
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <FiPlus className="w-5 h-5" />
            <span>Add Menu Item</span>
          </button>
        </div>
      </header>

      {/* Categories Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={cat} 
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              i === 0 
                ? 'bg-brand-dark text-brand-bg' 
                : 'bg-brand-white text-brand-dark/60 border border-black/5 hover:border-black/20 hover:text-brand-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-brand-white rounded-2xl shadow-sm border border-black/5 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
            <div className="h-48 bg-brand-bg relative flex items-center justify-center">
              <span className="text-brand-dark/30 font-medium">Image Placeholder</span>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 shadow-sm">
                <button className="p-2 text-brand-dark hover:bg-brand-bg rounded-md"><FiEdit2 className="w-4 h-4" /></button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-md"><FiTrash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-brand-dark text-lg leading-tight">Classic Beef Burger</h3>
                  <span className="font-bold text-brand-dark text-lg whitespace-nowrap ml-2">$8.99</span>
                </div>
                <p className="text-brand-dark/60 text-xs line-clamp-2 mb-4">Juicy beef patty with lettuce, tomato, cheese, and our special house sauce.</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold px-2.5 py-1 bg-brand-bg text-brand-dark rounded-md">Burgers</span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#52c41a]">
                  <span className="w-2 h-2 rounded-full bg-[#52c41a]"></span> Available
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
