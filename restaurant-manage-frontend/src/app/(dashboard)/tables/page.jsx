"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";

const INITIAL_TABLES = [
  { id: 1, tableNumber: "Table 1", capacity: 2, status: "Available" },
  { id: 2, tableNumber: "Table 2", capacity: 4, status: "Occupied" },
  { id: 3, tableNumber: "Table 3", capacity: 4, status: "Available" },
  { id: 4, tableNumber: "Table 4", capacity: 6, status: "Occupied" },
  { id: 5, tableNumber: "Table 5", capacity: 2, status: "Reserved" },
  { id: 6, tableNumber: "Table 6", capacity: 8, status: "Available" },
  { id: 7, tableNumber: "Table 7", capacity: 4, status: "Cleaning" },
  { id: 8, tableNumber: "Table 8", capacity: 2, status: "Available" },
];

const STATUS_CYCLE = ["Available", "Occupied", "Reserved", "Cleaning"];

export default function TablesPage() {
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTable, setNewTable] = useState({ tableNumber: "", capacity: 4, status: "Available" });

  const fetchLiveTables = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tables");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((t) => ({
            id: t._id,
            tableNumber: t.tableNumber,
            capacity: t.capacity,
            status: t.status,
          }));
          setTables(mapped);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchLiveTables();
  }, []);

  const handleAddTable = async (e) => {
    e.preventDefault();
    if (!newTable.tableNumber) return;

    const payload = {
      tableNumber: newTable.tableNumber.trim(),
      capacity: parseInt(newTable.capacity) || 2,
      status: newTable.status,
    };

    try {
      const res = await fetch("http://localhost:5000/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const created = {
          id: json.data._id,
          tableNumber: json.data.tableNumber,
          capacity: json.data.capacity,
          status: json.data.status,
        };
        setTables([...tables, created]);
      } else {
        setTables([...tables, { id: Date.now(), ...payload }]);
      }
    } catch (err) {
      setTables([...tables, { id: Date.now(), ...payload }]);
    }

    setNewTable({ tableNumber: "", capacity: 4, status: "Available" });
    setIsModalOpen(false);
  };

  const handleCycleStatus = async (id) => {
    const target = tables.find((t) => t.id === id);
    if (!target) return;
    const nextIndex = (STATUS_CYCLE.indexOf(target.status) + 1) % STATUS_CYCLE.length;
    const nextStatus = STATUS_CYCLE[nextIndex];

    setTables(
      tables.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );

    try {
      await fetch(`http://localhost:5000/api/tables/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch (e) {}
  };

  const handleDeleteTable = async (id) => {
    setTables(tables.filter((t) => t.id !== id));
    try {
      await fetch(`http://localhost:5000/api/tables/${id}`, { method: "DELETE" });
    } catch (e) {}
  };

  const filteredTables = tables.filter((t) => filter === "All" || t.status === filter);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Occupied":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Reserved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cleaning":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-brand-accent text-brand-dark border-brand-dark/10";
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark mb-1">Restaurant Tables</h1>
          <p className="text-brand-dark/60 text-sm">Monitor table occupancy in real time. Click a table badge to change its status.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer self-start sm:self-auto text-sm"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Table</span>
        </button>
      </header>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Available", "Occupied", "Reserved", "Cleaning"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === st
                ? "bg-brand-dark text-brand-bg shadow-sm"
                : "bg-brand-white text-brand-dark/70 border border-black/5 hover:text-brand-dark"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTables.map((table) => {
          const isOccupied = table.status === "Occupied";
          return (
            <div 
              key={table.id} 
              className={`relative bg-brand-white rounded-2xl border ${isOccupied ? "border-brand-dark/30 shadow-md" : "border-black/5 shadow-sm"} overflow-hidden group transition-all flex flex-col justify-between`}
            >
              <div className={`h-2 ${isOccupied ? "bg-brand-dark" : "bg-brand-bg"}`}></div>
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 font-bold text-xl ${isOccupied ? "bg-brand-dark text-brand-accent" : "bg-brand-bg text-brand-dark"}`}>
                  {table.tableNumber.replace(/[^0-9]/g, "") || table.tableNumber.charAt(0)}
                </div>
                <h3 className="font-bold text-brand-dark text-lg">{table.tableNumber}</h3>
                <p className="text-xs text-brand-dark/60 mt-1">Capacity: {table.capacity} guests</p>
                
                <div className="mt-5">
                  <button
                    onClick={() => handleCycleStatus(table.id)}
                    title="Click to cycle status"
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full inline-block border transition-transform hover:scale-105 cursor-pointer ${getStatusBadge(table.status)}`}
                  >
                    {table.status}
                  </button>
                </div>
              </div>

              <div className="p-3 border-t border-black/5 bg-brand-bg/30 flex justify-end">
                <button 
                  onClick={() => handleDeleteTable(table.id)}
                  title="Delete table"
                  className="p-1.5 text-brand-dark/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTables.length === 0 && (
          <div className="col-span-full py-16 text-center text-brand-dark/40 text-sm">
            No tables match the selected status.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-black/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-brand-dark">Create New Table</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-dark/50 hover:text-brand-dark cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTable} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Table Name / Number</label>
                <input 
                  type="text" 
                  required
                  value={newTable.tableNumber}
                  onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                  placeholder="e.g. Table 9" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Guest Capacity</label>
                <input 
                  type="number" 
                  min="1"
                  max="20"
                  required
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                  placeholder="4" 
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-brand-dark/70 mb-1 block">Initial Status</label>
                <select 
                  value={newTable.status}
                  onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-brand-bg/40 focus:border-brand-dark outline-none text-sm text-brand-dark cursor-pointer"
                >
                  {STATUS_CYCLE.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 mt-4 bg-brand-accent text-brand-dark font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Add Table
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
