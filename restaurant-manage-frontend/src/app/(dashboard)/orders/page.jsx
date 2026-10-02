"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiClock, FiTrash2, FiPlus, FiCheck, FiX, FiShoppingBag } from "react-icons/fi";
import { INITIAL_MENU_ITEMS, INITIAL_CATEGORIES } from "@/data/menuData";
import { API_BASE } from "@/lib/api";

const INITIAL_ORDERS = [
  {
    id: "1041",
    customerName: "Walk-in Customer",
    tableNumber: "Table 1",
    time: "10 mins ago",
    items: [
      { id: 1, name: "Classic Beef Burger", price: 8.99, quantity: 2 },
      { id: 6, name: "Fresh Mint Lemonade", price: 4.25, quantity: 2 },
    ],
    subtotal: 26.48,
    tax: 1.32,
    total: 27.80,
    paymentStatus: "Paid",
    orderStatus: "Preparing",
  },
  {
    id: "1042",
    customerName: "Rahim Chowdhury",
    tableNumber: "Table 3",
    time: "25 mins ago",
    items: [
      { id: 3, name: "Margherita Supreme", price: 14.00, quantity: 1 },
      { id: 5, name: "Iced Caramel Macchiato", price: 5.50, quantity: 1 },
    ],
    subtotal: 19.50,
    tax: 0.98,
    total: 20.48,
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "1043",
    customerName: "Karim Mia",
    tableNumber: "Takeaway",
    time: "40 mins ago",
    items: [
      { id: 4, name: "Pepperoni Feast", price: 16.50, quantity: 2 },
    ],
    subtotal: 33.00,
    tax: 1.65,
    total: 34.65,
    paymentStatus: "Pending",
    orderStatus: "Completed",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [availableFoods, setAvailableFoods] = useState(INITIAL_MENU_ITEMS || []);
  const [foodCategories, setFoodCategories] = useState(INITIAL_CATEGORIES || ["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [foodSearch, setFoodSearch] = useState("");

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("Table 1");
  const [customerName, setCustomerName] = useState("Walk-in Customer");
  const [cart, setCart] = useState([
    { id: 1, name: "Classic Beef Burger", price: 8.99, quantity: 1 },
  ]);

  const fetchLiveOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const formatted = json.data.map((o) => ({
          id: o.orderNumber || o._id,
          _id: o._id,
          customerName: o.customerName || "Walk-in Customer",
          tableNumber: o.tableNumber || "Takeaway",
          time: new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          items: o.items || [],
          subtotal: o.subtotal,
          tax: o.tax,
          total: o.total,
          paymentStatus: o.paymentStatus || "Paid",
          orderStatus: o.orderStatus || "Preparing",
        }));
        setOrders(formatted);
      }
    } catch (e) {}
  };

  const fetchMenuAndCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/menu`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mappedFoods = json.data.map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            category: item.category?.name || "General",
            image: item.image,
            description: item.description,
          }));
          setAvailableFoods(mappedFoods);
          const dynamicCats = ["All", ...new Set(mappedFoods.map((i) => i.category).filter(Boolean))];
          setFoodCategories(dynamicCats);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchLiveOrders();
    fetchMenuAndCategories();
  }, []);

  const handleAddToCart = (food) => {
    if (!food) return;
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

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const getItemCartQuantity = (foodId) => {
    const item = cart.find((i) => i.id === foodId);
    return item ? item.quantity : 0;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const payload = {
      customerName: customerName.trim() || "Walk-in Customer",
      tableNumber: selectedTable,
      items: cart.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        category: i.category || "General",
      })),
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      paymentStatus: "Paid",
      orderStatus: "Preparing",
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const created = json.data;
        const newOrder = {
          id: created.orderNumber,
          _id: created._id,
          customerName: created.customerName,
          tableNumber: created.tableNumber,
          time: "Just now",
          items: created.items || [...cart],
          subtotal: created.subtotal,
          tax: created.tax,
          total: created.total,
          paymentStatus: created.paymentStatus,
          orderStatus: created.orderStatus,
        };
        setOrders([newOrder, ...orders]);
      } else {
        const fallback = {
          id: String(Math.floor(1000 + Math.random() * 9000)),
          ...payload,
          time: "Just now",
        };
        setOrders([fallback, ...orders]);
      }
    } catch (err) {
      const fallback = {
        id: String(Math.floor(1000 + Math.random() * 9000)),
        ...payload,
        time: "Just now",
      };
      setOrders([fallback, ...orders]);
    }

    setCart([]);
    setCustomerName("Walk-in Customer");
  };

  const handleToggleStatus = async (id, mongoId) => {
    const target = orders.find((o) => o.id === id);
    if (!target) return;
    const nextStatus = target.orderStatus === "Preparing" ? "Completed" : "Preparing";

    setOrders(
      orders.map((o) => (o.id === id ? { ...o, orderStatus: nextStatus } : o))
    );

    if (mongoId) {
      try {
        await fetch(`${API_BASE}/api/orders/${mongoId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus, orderStatus: nextStatus }),
        });
      } catch (e) {}
    }
  };

  const filteredOrders = (orders || []).filter((o) => {
    const matchSearch =
      o.id.includes(search) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.tableNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredFoods = (availableFoods || []).filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchQ =
      f.name?.toLowerCase().includes(foodSearch.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(foodSearch.toLowerCase()));
    return matchCat && matchQ;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Orders & POS</h1>
        <p className="text-brand-dark/60 text-sm">Manage live restaurant orders and create new tickets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-white p-3.5 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center gap-2 bg-brand-bg px-3.5 py-2 rounded-xl flex-1 border border-black/5">
              <FiSearch className="text-brand-dark/40 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, table or customer..."
                className="bg-transparent border-none outline-none text-xs w-full text-brand-dark placeholder:text-brand-dark/40"
              />
            </div>

            <div className="flex items-center gap-1">
              {["All", "Preparing", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-brand-dark text-brand-bg shadow-sm"
                      : "bg-transparent text-brand-dark/60 hover:text-brand-dark hover:bg-black/5"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredOrders.length === 0 ? (
              <div className="bg-brand-white rounded-2xl p-10 text-center border border-black/5">
                <FiShoppingBag className="w-8 h-8 mx-auto text-brand-dark/30 mb-2" />
                <p className="text-xs font-bold text-brand-dark/60">No orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-brand-white rounded-2xl p-4 border border-black/5 shadow-sm hover:border-black/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        order.orderStatus === "Preparing"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {order.orderStatus === "Preparing" ? (
                        <FiClock className="w-5 h-5" />
                      ) : (
                        <FiCheck className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-brand-dark text-sm">Order #{order.id}</h4>
                        <span className="text-[11px] text-brand-dark/40 font-medium">• {order.time}</span>
                      </div>
                      <p className="text-xs text-brand-dark/70 font-semibold mt-0.5">
                        {order.tableNumber} <span className="text-brand-dark/30">•</span> {order.customerName}
                      </p>
                      <p className="text-[11px] text-brand-dark/50 mt-1 line-clamp-1">
                        {order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-black/5">
                    <div className="flex items-center gap-2 sm:mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          order.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                      <span className="font-bold text-brand-dark text-sm sm:text-base">${Number(order.total || 0).toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => handleToggleStatus(order.id, order._id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        order.orderStatus === "Preparing"
                          ? "bg-amber-100/80 text-amber-800 hover:bg-amber-200"
                          : "bg-emerald-100/80 text-emerald-800 hover:bg-emerald-200"
                      }`}
                    >
                      {order.orderStatus}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-brand-white rounded-2xl p-5 border border-black/5 shadow-sm sticky top-6">
          <div className="border-b border-black/5 pb-4 mb-4">
            <h3 className="font-bold text-brand-dark text-base">New Order</h3>
            <p className="text-brand-dark/50 text-xs mt-0.5">Select table, customer, and menu items to create ticket.</p>
          </div>

          <form onSubmit={handleCreateOrder} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider block mb-1">
                  Table
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full bg-brand-bg px-3 py-2 rounded-xl text-xs font-semibold text-brand-dark border border-black/5 outline-none cursor-pointer"
                >
                  <option value="Table 1">Table 1</option>
                  <option value="Table 2">Table 2</option>
                  <option value="Table 3">Table 3</option>
                  <option value="Table 4">Table 4</option>
                  <option value="Table 5">Table 5</option>
                  <option value="Takeaway">Takeaway</option>
                  <option value="VIP Lounge">VIP Lounge</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider block mb-1">
                  Customer
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Walk-in Customer"
                  className="w-full bg-brand-bg px-3 py-2 rounded-xl text-xs font-semibold text-brand-dark border border-black/5 outline-none placeholder:text-brand-dark/40"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider">
                  Menu Items
                </label>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="text-[10px] text-rose-500 font-bold hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-brand-bg hover:bg-brand-bg/60 border border-dashed border-black/20 hover:border-black/40 py-2.5 px-4 rounded-xl text-xs font-bold text-brand-dark transition-all cursor-pointer shadow-sm group"
              >
                <div className="w-5 h-5 rounded-full bg-brand-dark text-brand-bg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlus className="w-3.5 h-3.5" />
                </div>
                <span>+ Add Item / Choose Food</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-brand-dark/50 uppercase tracking-wider">
                Order Items ({cart.length})
              </span>

              {cart.length === 0 ? (
                <div className="bg-brand-bg/50 border border-dashed border-black/10 rounded-xl p-4 text-center">
                  <p className="text-xs text-brand-dark/50 font-medium">No items added yet.</p>
                  <p className="text-[11px] text-brand-dark/40 mt-0.5">Click "+ Add Item" above to pick foods.</p>
                </div>
              ) : (
                <div className="max-h-56 overflow-y-auto flex flex-col gap-2 pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 bg-brand-bg rounded-xl border border-black/5"
                    >
                      <div className="min-w-0 pr-2">
                        <h5 className="font-bold text-brand-dark text-xs truncate">{item.name}</h5>
                        <span className="text-[11px] text-brand-dark/60 font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex items-center bg-brand-white rounded-lg border border-black/10 overflow-hidden shadow-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-black/5 transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-brand-dark">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-black/5 transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-brand-dark/40 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-black/5 pt-3 flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between text-brand-dark/60">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-dark/60">
                <span>Tax (5%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-brand-dark text-sm pt-1.5 border-t border-black/5">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full bg-brand-accent hover:brightness-105 disabled:opacity-40 disabled:hover:brightness-100 text-brand-dark font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer mt-1"
            >
              Create Order Ticket (${total.toFixed(2)})
            </button>
          </form>
        </div>
      </div>

      {isPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-brand-white w-full max-w-2xl rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-4 sm:p-5 border-b border-black/5 flex items-center justify-between bg-brand-bg/40">
              <div>
                <h3 className="font-bold text-brand-dark text-lg">Select Food Items</h3>
                <p className="text-xs text-brand-dark/60">Click on any food to add it to your current order ticket.</p>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-brand-white hover:bg-black/5 border border-black/5 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark transition-colors cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-black/5 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-brand-bg px-3.5 py-2 rounded-xl flex-1 border border-black/5">
                <FiSearch className="text-brand-dark/40 text-xs" />
                <input
                  type="text"
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Filter foods..."
                  className="bg-transparent border-none outline-none text-xs w-full text-brand-dark placeholder:text-brand-dark/40"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {(foodCategories || []).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? "bg-brand-dark text-brand-bg"
                        : "bg-brand-bg text-brand-dark/70 hover:text-brand-dark border border-black/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {filteredFoods.map((food) => {
                const qtyInCart = getItemCartQuantity(food.id);
                return (
                  <div
                    key={food.id}
                    onClick={() => handleAddToCart(food)}
                    className={`rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between group relative ${
                      qtyInCart > 0
                        ? "bg-brand-accent/15 border-brand-dark/40 shadow-xs"
                        : "bg-brand-bg/50 hover:bg-brand-bg border-black/5 hover:border-black/20"
                    }`}
                  >
                    {qtyInCart > 0 && (
                      <span className="absolute top-2 right-2 z-10 bg-brand-dark text-brand-bg text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        {qtyInCart} in ticket
                      </span>
                    )}

                    <div className="h-24 rounded-xl overflow-hidden mb-2 bg-white relative">
                      {food.image ? (
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-lg text-brand-dark/30">
                          {food.name?.charAt(0)}
                        </div>
                      )}
                      <span className="absolute bottom-1.5 left-1.5 bg-brand-dark/85 backdrop-blur text-brand-accent text-[11px] font-bold px-2 py-0.5 rounded-md">
                        ${food.price?.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-brand-dark text-xs leading-snug line-clamp-1">{food.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-brand-dark/60 font-medium">{food.category}</span>
                        <span className="text-[11px] font-bold text-brand-dark bg-brand-accent px-2 py-0.5 rounded-md group-hover:shadow-xs">
                          + Add
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-black/5 bg-brand-bg/40 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-brand-dark">{cart.length}</span> items in cart • Total:{" "}
                <span className="font-bold text-brand-dark">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="bg-brand-dark text-brand-bg font-bold text-xs px-5 py-2 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
