"use client";

import { useState } from "react";
import { FiPlus, FiTrash2, FiSearch, FiX } from "react-icons/fi";

const INITIAL_CATEGORIES = ["All", "Burgers", "Pizzas", "Drinks", "Desserts"];

const INITIAL_MENU_ITEMS = [
  { id: 1, name: "Classic Beef Burger", category: "Burgers", price: 8.99, description: "Juicy beef patty with lettuce, tomato, cheddar cheese and special sauce.", status: "Active" },
  { id: 2, name: "Double Cheese Smash", category: "Burgers", price: 11.50, description: "Two crispy smash patties, caramelized onions and melted American cheese.", status: "Active" },
  { id: 3, name: "Margherita Supreme", category: "Pizzas", price: 14.00, description: "San Marzano tomato sauce, fresh buffalo mozzarella and fresh basil.", status: "Active" },
  { id: 4, name: "Pepperoni Feast", category: "Pizzas", price: 16.50, description: "Generous pepperoni slices with spicy marinara and parmesan cheese.", status: "Active" },
  { id: 5, name: "Iced Caramel Macchiato", category: "Drinks", price: 5.50, description: "Freshly brewed espresso with steamed milk and Madagascar vanilla syrup.", status: "Active" },
  { id: 6, name: "Fresh Mint Lemonade", category: "Drinks", price: 4.25, description: "Zesty freshly squeezed lemons with crushed garden mint and soda.", status: "Active" },
  { id: 7, name: "Warm Chocolate Lava Cake", category: "Desserts", price: 7.50, description: "Molten chocolate center served warm with French vanilla bean gelato.", status: "Active" },
  { id: 8, name: "Classic Tiramisu", category: "Desserts", price: 6.75, description: "Italian ladyfingers soaked in dark espresso with sweet mascarpone cream.", status: "Active" },
];

export default function MenuPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(INITIAL_MENU_ITEMS);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "Burgers",
    price: "",
    description: "",
    status: "Active",
  });

  const [newCatName, setNewCatName] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const item = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      price: parseFloat(newItem.price),
      description: newItem.description || "Freshly made signature dish.",
      status: newItem.status,
    };

    setItems([item, ...items]);
    setNewItem({ name: "", category: categories[1] || "Burgers", price: "", description: "", status: "Active" });
    setIsItemModalOpen(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (!categories.includes(newCatName.trim())) {
      setCategories([...categories, newCatName.trim()]);
    }
    setNewCatName("");
    setIsCatModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Menu & Categories</h1>
          <p className="text-brand-dark/60 text-sm">Manage your restaurant's food items and menu pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsCatModalOpen(true)}
            className="px-5 py-2.5 bg-brand-white text-brand-dark font-semibold rounded-xl border border-black/5 hover:bg-brand-bg transition-colors cursor-pointer text-sm"
          >
            Add Category
          </button>
          <button 
            onClick={() => setIsItemModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer text-sm"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Menu Item</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat 
                  ? "bg-brand-dark text-brand-bg" 
                  : "bg-brand-white text-brand-dark/70 border border-black/5 hover:text-brand-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-brand-white px-4 py-2 rounded-xl border border-black/5 w-full md:w-72">
          <FiSearch className="text-brand-dark/40" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food item..." 
            className="bg-transparent border-none outline-none text-sm w-full text-brand-dark placeholder:text-brand-dark/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-brand-white rounded-2xl shadow-sm border border-black/5 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
            <div className="h-44 bg-brand-bg relative flex items-center justify-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-dark/5 flex items-center justify-center text-brand-dark font-bold text-xl">
                {item.name.charAt(0)}
              </div>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                title="Delete item"
                className="absolute top-3 right-3 p-2 text-red-500 bg-white/90 hover:bg-red-50 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-brand-dark text-base leading-snug">{item.name}</h3>
                  <span className="font-bold text-brand-dark text-base whitespace-nowrap ml-2">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-brand-dark/60 text-xs line-clamp-2 mb-4">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5">
                <span className="text-xs font-semibold px-2.5 py-1 bg-brand-bg text-brand-dark rounded-md">{item.category}</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#52c41a]">
                  <span className="w-2 h-2 rounded-full bg-[#52c41a]"></span>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-brand-dark/40 font-medium">
            No menu items found.
          </div>
        )}
      </div>

      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-black/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-brand-dark">Add New Menu Item</h3>
              <button onClick={() => setIsItemModalOpen(false)} className="text-brand-dark/50 hover:text-brand-dark cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Item Name</label>
                <input 
                  type="text" 
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g. Crispy Chicken Burger" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Category</label>
                  <select 
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark cursor-pointer"
                  >
                    {categories.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    required
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    placeholder="9.99" 
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Description</label>
                <textarea 
                  rows="3"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Ingredients, recipe details, etc." 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 mt-4 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Create Item
              </button>
            </form>
          </div>
        </div>
      )}

      {isCatModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-black/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-brand-dark">Add New Category</h3>
              <button onClick={() => setIsCatModalOpen(false)} className="text-brand-dark/50 hover:text-brand-dark cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Category Name</label>
                <input 
                  type="text" 
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Salads" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 mt-4 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
