"use client";

import { useState } from "react";
import { FiPlus, FiFilter, FiSearch, FiClock, FiTrash2, FiCheck, FiShoppingBag, FiX } from "react-icons/fi";

const AVAILABLE_FOODS = [
  { id: 101, name: "Classic Beef Burger", price: 8.99, category: "Burgers" },
  { id: 102, name: "Double Cheese Smash", price: 11.50, category: "Burgers" },
  { id: 103, name: "Margherita Supreme", price: 14.00, category: "Pizzas" },
  { id: 104, name: "Pepperoni Feast", price: 16.50, category: "Pizzas" },
  { id: 105, name: "Iced Caramel Macchiato", price: 5.50, category: "Drinks" },
  { id: 106, name: "Fresh Mint Lemonade", price: 4.25, category: "Drinks" },
  { id: 107, name: "Warm Chocolate Lava Cake", price: 7.50, category: "Desserts" },
];

const INITIAL_ORDERS = [
  {
    id: "1041",
    customerName: "Walk-in Customer",
    tableNumber: "Table 1",
    time: "10 mins ago",
    items: [
      { id: 101, name: "Classic Beef Burger", price: 8.99, quantity: 2 },
      { id: 106, name: "Fresh Mint Lemonade", price: 4.25, quantity: 2 },
    ],
    total: 26.48,
    status: "Preparing",
  },
  {
    id: "1042",
    customerName: "Rahim Chowdhury",
    tableNumber: "Table 3",
    time: "25 mins ago",
    items: [
      { id: 103, name: "Margherita Supreme", price: 14.00, quantity: 1 },
      { id: 105, name: "Iced Caramel Macchiato", price: 5.50, quantity: 1 },
    ],
    total: 19.50,
    status: "Completed",
  },
  {
    id: "1043",
    customerName: "Karim Mia",
    tableNumber: "Takeaway",
    time: "40 mins ago",
    items: [
      { id: 104, name: "Pepperoni Feast", price: 16.50, quantity: 2 },
    ],
    total: 33.00,
    status: "Completed",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [cart, setCart] = useState([
    { id: 101, name: "Classic Beef Burger", price: 8.99, quantity: 1 },
    { id: 105, name: "Iced Caramel Macchiato", price: 5.50, quantity: 2 },
  ]);
  const [selectedTable, setSelectedTable] = useState("Table 4");
  const [customerName, setCustomerName] = useState("Walk-in Customer");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const addToCart = (food) => {
    const existing = cart.find((i) => i.id === food.id);
    if (existing) {
      setCart(cart.map((i) => (i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: String(Math.floor(1000 + Math.random() * 9000)),
      customerName: customerName || "Walk-in Customer",
      tableNumber: selectedTable,
      time: "Just now",
      items: [...cart],
      total: parseFloat(total.toFixed(2)),
      status: "Preparing",
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  const handleToggleStatus = (id) => {
    setOrders(
      orders.map((o) =>
        o.id === id
          ? { ...o, status: o.status === "Preparing" ? "Completed" : "Preparing" }
          : o
      )
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.includes(search) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.tableNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Orders & POS</h1>
          <p className="text-brand-dark/60 text-sm">Manage live restaurant orders and instant checkout.</p>
        </div>
        <button 
          onClick={() => setIsPickerOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Food to Cart</span>
        </button>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 bg-brand-white rounded-2xl shadow-sm border border-black/5 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-black/5 flex items-center justify-between gap-4 bg-brand-bg/50">
            <div className="flex items-center gap-3 bg-brand-white px-4 py-2 rounded-xl border border-black/5 flex-1 max-w-sm">
              <FiSearch className="text-brand-dark/40" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, table or customer..." 
                className="bg-transparent border-none outline-none text-sm w-full text-brand-dark placeholder:text-brand-dark/40" 
              />
            </div>
            <div className="flex items-center gap-2">
              {["All", "Preparing", "Completed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === st
                      ? "bg-brand-dark text-brand-bg"
                      : "bg-brand-white text-brand-dark/60 border border-black/5 hover:text-brand-dark"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-transparent hover:border-black/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${order.status === "Preparing" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-brand-dark text-base">Order #{order.id}</h4>
                      <span className="text-xs text-brand-dark/50">• {order.time}</span>
                    </div>
                    <p className="text-xs text-brand-dark/70 font-medium">
                      {order.tableNumber} • {order.customerName}
                    </p>
                    <p className="text-xs text-brand-dark/50 line-clamp-1 mt-0.5">
                      {order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                    </p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                  <p className="font-bold text-lg text-brand-dark">${order.total.toFixed(2)}</p>
                  <button
                    onClick={() => handleToggleStatus(order.id)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      order.status === "Preparing" 
                        ? "bg-amber-200/60 text-amber-900 hover:bg-amber-300/80" 
                        : "bg-emerald-200/60 text-emerald-900 hover:bg-emerald-300/80"
                    }`}
                  >
                    {order.status}
                  </button>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="py-16 text-center text-brand-dark/40 text-sm">
                No orders found.
              </div>
            )}
          </div>
        </div>

        <div className="bg-brand-white rounded-2xl shadow-sm border border-black/5 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-black/5 bg-brand-bg/20">
            <h3 className="font-bold text-xl text-brand-dark">Current Order</h3>
            <div className="flex items-center gap-2 mt-2">
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="bg-brand-white text-xs font-semibold text-brand-dark border border-black/10 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
                <option value="Table 4">Table 4</option>
                <option value="Takeaway">Takeaway</option>
              </select>

              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="bg-brand-white text-xs text-brand-dark border border-black/10 rounded-lg px-2.5 py-1.5 outline-none flex-1"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-brand-bg rounded-xl">
                <div className="flex-1 pr-2">
                  <h4 className="font-semibold text-brand-dark text-sm leading-tight">{item.name}</h4>
                  <p className="font-bold text-brand-dark/80 text-xs mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-brand-white rounded-lg border border-black/10 px-2 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-brand-dark/60 hover:text-brand-dark font-bold text-sm px-1 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-brand-dark w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-brand-dark/60 hover:text-brand-dark font-bold text-sm px-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-brand-dark/40 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="py-12 text-center text-brand-dark/40 text-sm flex flex-col items-center gap-2">
                <FiShoppingBag className="w-8 h-8 stroke-1" />
                <span>Cart is empty. Add food items to begin.</span>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-black/5 bg-brand-bg/30 space-y-2">
            <div className="flex justify-between text-xs text-brand-dark/70">
              <span>Subtotal</span>
              <span className="font-semibold text-brand-dark">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-dark/70">
              <span>Tax (5%)</span>
              <span className="font-semibold text-brand-dark">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-brand-dark pt-2 border-t border-black/5">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full py-3.5 mt-3 bg-brand-accent text-brand-dark font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              Place Order (${total.toFixed(2)})
            </button>
          </div>
        </div>
      </div>

      {isPickerOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-black/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-brand-dark">Select Food to Add</h3>
              <button onClick={() => setIsPickerOpen(false)} className="text-brand-dark/50 hover:text-brand-dark cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {AVAILABLE_FOODS.map((food) => (
                <div 
                  key={food.id}
                  className="flex items-center justify-between p-3.5 bg-brand-bg rounded-xl hover:bg-brand-bg/80 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">{food.name}</h4>
                    <p className="text-xs text-brand-dark/60">{food.category} • ${food.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(food);
                      setIsPickerOpen(false);
                    }}
                    className="px-4 py-2 bg-brand-accent text-brand-dark font-semibold text-xs rounded-lg hover:shadow cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
