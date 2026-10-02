"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Tanvir Ahmed", phone: "+880 1711 002233", email: "tanvir.ahmed@example.com", totalOrders: 14, totalSpent: 285.50, lastOrder: "Oct 01, 2026" },
  { id: 2, name: "Nusrat Jahan", phone: "+880 1822 334455", email: "nusrat.jahan@example.com", totalOrders: 8, totalSpent: 164.20, lastOrder: "Sep 28, 2026" },
  { id: 3, name: "Farhan Kabir", phone: "+880 1933 556677", email: "farhan.k@example.com", totalOrders: 21, totalSpent: 490.00, lastOrder: "Oct 02, 2026" },
  { id: 4, name: "Sabrina Mostafa", phone: "+880 1644 778899", email: "sabrina.m@example.com", totalOrders: 5, totalSpent: 98.75, lastOrder: "Sep 25, 2026" },
  { id: 5, name: "Arif Hossain", phone: "+880 1555 112233", email: "arif.hossain@example.com", totalOrders: 11, totalSpent: 210.30, lastOrder: "Sep 30, 2026" },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", email: "" });

  const fetchLiveCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customers");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((c) => ({
            id: c._id,
            name: c.name,
            phone: c.phone,
            email: c.email || "N/A",
            totalOrders: c.totalOrders || 0,
            totalSpent: c.totalSpent || 0,
            lastOrder: c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : "Recent",
          }));
          setCustomers(mapped);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchLiveCustomers();
  }, []);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) return;

    const payload = {
      name: newCustomer.name.trim(),
      phone: newCustomer.phone.trim(),
      email: newCustomer.email?.trim() || "",
    };

    try {
      const res = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const created = {
          id: json.data._id,
          name: json.data.name,
          phone: json.data.phone,
          email: json.data.email || "N/A",
          totalOrders: 0,
          totalSpent: 0,
          lastOrder: "Today",
        };
        setCustomers([created, ...customers]);
      } else {
        setCustomers([{ id: Date.now(), ...payload, totalOrders: 0, totalSpent: 0, lastOrder: "Today" }, ...customers]);
      }
    } catch (err) {
      setCustomers([{ id: Date.now(), ...payload, totalOrders: 0, totalSpent: 0, lastOrder: "Today" }, ...customers]);
    }

    setNewCustomer({ name: "", phone: "", email: "" });
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
    try {
      await fetch(`http://localhost:5000/api/customers/${id}`, { method: "DELETE" });
    } catch (e) {}
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Customers</h1>
          <p className="text-brand-dark/60 text-sm">View and manage regular diners and loyalty profiles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer self-start sm:self-auto text-sm"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </header>

      <div className="bg-brand-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-brand-bg/30">
          <div className="flex items-center gap-3 bg-brand-white px-4 py-2 rounded-xl border border-black/5 w-full max-w-sm">
            <FiSearch className="text-brand-dark/40" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone or email..." 
              className="bg-transparent border-none outline-none text-sm w-full text-brand-dark placeholder:text-brand-dark/40" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-brand-bg/50 text-brand-dark/60 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold text-center">Orders</th>
                <th className="px-6 py-4 font-semibold text-right">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Last Visit</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((c) => {
                const initials = c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={c.id} className="hover:bg-brand-bg/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-accent flex items-center justify-center font-bold text-xs">
                          {initials}
                        </div>
                        <span className="font-semibold text-brand-dark text-sm">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-brand-dark">{c.phone}</p>
                      <p className="text-xs text-brand-dark/50">{c.email}</p>
                    </td>
                    <td className="px-6 py-4 text-brand-dark text-sm font-semibold text-center">{c.totalOrders}</td>
                    <td className="px-6 py-4 text-brand-dark text-sm font-bold text-right">${c.totalSpent.toFixed(2)}</td>
                    <td className="px-6 py-4 text-brand-dark/60 text-xs font-medium">{c.lastOrder}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(c.id)}
                        title="Delete customer"
                        className="text-brand-dark/40 hover:text-red-500 p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-brand-dark/40 text-sm">
                    No customers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-black/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-brand-dark">Add New Customer</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-dark/50 hover:text-brand-dark cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="e.g. Asif Mahmud" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+880 1700 000000" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Email (Optional)</label>
                <input 
                  type="email" 
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="customer@email.com" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 mt-4 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Create Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
