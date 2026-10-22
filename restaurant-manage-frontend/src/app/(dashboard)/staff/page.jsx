/**
 * --------------------------------------------------------------------------
 * পেজ: টিম ও ম্যানেজার পারমিশন কন্ট্রোল (src/app/(dashboard)/staff/page.jsx)
 * রিকোয়ারমেন্ট: সেকশন ৬ (রেস্টুরেন্টের ৩টি প্রধান রোল ও ম্যানেজারের পারমিশন নিয়ন্ত্রণ)
 * --------------------------------------------------------------------------
 * 📌 এই পেজের মূল দায়িত্ব:
 *    ১. রেস্টুরেন্টে কর্মরত সমস্ত স্টাফ, শেফ ও ম্যানেজারদের তালিকা প্রদর্শন।
 *    ২. ম্যানেজারের পারমিশন নিয়ন্ত্রণ (খুবই গুরুত্বপূর্ণ মালিকের জন্য):
 *       - [টগল ১] মেনু বদলানোর অনুমতি (canManageMenu):
 *         মালিক চাইলে ম্যানেজারকে খাবারের দাম/মেনু পরিবর্তনের ক্ষমতা দেবে, নইলে বন্ধ রাখবে।
 *       - [টগল ২] বিক্রির হিসাব দেখার অনুমতি (canViewSalesDashboard):
 *         মালিক চাইলে ম্যানেজারকে সারাদিনের মোট লাভ ও বিক্রির ড্যাশবোর্ড দেখার ক্ষমতা দেবে,
 *         নইলে বন্ধ রাখবে (যাতে ব্যবসার গোপন আর্থিক হিসাব গোপন থাকে)।
 *    ৩. স্টাফের রোল পরিবর্তন বা রেস্টুরেন্ট থেকে রিমুভ করার অ্যাকশন।
 * 
 * 🔌 কানেক্টেড সার্ভিস:
 *    - staffService.getStaffRoster() -> GET /api/restaurants/staff
 *    - staffService.updateManagerPermissions() -> PATCH /api/restaurants/staff/:id/permissions
 *    - staffService.removeStaff() -> DELETE /api/restaurants/staff/:id
 * --------------------------------------------------------------------------
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { FiUsers, FiShield, FiUserPlus, FiLock, FiUnlock, FiTrash2, FiSliders } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";

const DEMO_STAFF = [
  {
    id: "stf-1",
    uniqueId: "MGR-230911",
    name: "তানভীর আহমেদ",
    role: "Manager",
    phone: "01711223344",
    joinedDate: "০১ অক্টোবর, ২০২৬",
    permissions: {
      canManageMenu: false, // মেনু বদলানোর অনুমতি (মালিক বন্ধ রেখেছে)
      canViewSalesDashboard: true, // সেলস দেখার অনুমতি অন
    },
  },
  {
    id: "stf-2",
    uniqueId: "STF-780148",
    name: "মো: রফিকুল ইসলাম",
    role: "Waiter",
    phone: "01811556677",
    joinedDate: "০৫ অক্টোবর, ২০২৬",
    permissions: {},
  },
  {
    id: "stf-3",
    uniqueId: "STF-554120",
    name: "সাকিব হাসান",
    role: "Waiter",
    phone: "01911889900",
    joinedDate: "০৮ অক্টোবর, ২০২৬",
    permissions: {},
  },
];

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState(DEMO_STAFF);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isPermModalOpen, setIsPermModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    role: "Waiter",
    pin: "",
  });

  const handleOpenPermModal = (manager) => {
    setSelectedManager({ ...manager });
    setIsPermModalOpen(true);
  };

  const handleSavePermissions = () => {
    setStaffList(
      staffList.map((s) => (s.id === selectedManager.id ? selectedManager : s))
    );
    setIsPermModalOpen(false);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.phone.trim()) return;

    const prefix = newStaff.role === "Manager" ? "MGR" : "STF";
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const createdMember = {
      id: `stf-${Date.now()}`,
      uniqueId: `${prefix}-${randomNum}`,
      name: newStaff.name.trim(),
      phone: newStaff.phone.trim(),
      role: newStaff.role,
      joinedDate: "আজকে",
      permissions: {
        canManageMenu: false,
        canViewSalesDashboard: false,
      },
    };

    setStaffList([createdMember, ...staffList]);
    setNewStaff({ name: "", phone: "", role: "Waiter", pin: "" });
    setIsAddModalOpen(false);
  };

  const handleRemoveStaff = (id) => {
    if (confirm("আপনি কি নিশ্চিত এই কর্মীকে টিম থেকে সরাতে চান?")) {
      setStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">টিম ম্যানেজমেন্ট</h1>
          <p className="text-sm text-brand-dark/60 mt-1">
            কর্মরত কর্মীদের তালিকা দেখুন, নতুন কর্মী যুক্ত করুন এবং ম্যানেজারের জন্য পারমিশন অন/অফ করুন।
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2"
        >
          <FiUserPlus className="w-4 h-4" /> নতুন কর্মী যুক্ত করুন
        </Button>
      </div>

      {/* Staff Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-dark">
            <thead className="bg-[#f0f4f1]/60 text-xs font-bold uppercase tracking-wider text-brand-dark/60 border-b border-black/5">
              <tr>
                <th className="py-4 px-6">ইউনিক আইডি</th>
                <th className="py-4 px-6">নাম ও মোবাইল</th>
                <th className="py-4 px-6">পদবী (Role)</th>
                <th className="py-4 px-6">যুক্ত হওয়ার তারিখ</th>
                <th className="py-4 px-6">বিশেষ অনুমতি (Permissions)</th>
                <th className="py-4 px-6 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-black/[0.01] transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-xs">
                    <span className="bg-black/5 px-2.5 py-1 rounded-md">{member.uniqueId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-brand-dark">{member.name}</p>
                    <p className="text-xs text-brand-dark/50">{member.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    {member.role === "Manager" ? (
                      <Badge variant="accent">👔 Manager (ক্যাশিয়ার)</Badge>
                    ) : (
                      <Badge variant="info">🏃‍♂️ Waiter (স্টাফ)</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-xs text-brand-dark/70 font-medium">{member.joinedDate}</td>
                  <td className="py-4 px-6">
                    {member.role === "Manager" ? (
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="flex items-center gap-1.5 font-medium">
                          {member.permissions?.canManageMenu ? (
                            <span className="text-emerald-600 font-bold">✓ মেনু কন্ট্রোল অন</span>
                          ) : (
                            <span className="text-rose-500 font-bold">✕ মেনু কন্ট্রোল লক</span>
                          )}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          {member.permissions?.canViewSalesDashboard ? (
                            <span className="text-emerald-600 font-bold">✓ সেলস দেখা অন</span>
                          ) : (
                            <span className="text-rose-500 font-bold">✕ সেলস দেখা লক</span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-brand-dark/40">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {member.role === "Manager" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleOpenPermModal(member)}
                        className="gap-1.5"
                      >
                        <FiSliders className="w-3.5 h-3.5" /> অনুমতি বদলান
                      </Button>
                    )}
                    <button
                      title="কর্মী রিমুভ করুন"
                      onClick={() => handleRemoveStaff(member.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Manager Permission Modal */}
      <Modal
        isOpen={isPermModalOpen}
        onClose={() => setIsPermModalOpen(false)}
        title={`ম্যানেজার পারমিশন কন্ট্রোল: ${selectedManager?.name || ""}`}
        description="মালিক হিসেবে আপনি নির্ধারণ করুন এই ম্যানেজার কোন কোন সংবেদনশীল ডাটা দেখতে বা পরিবর্তন করতে পারবে।"
      >
        {selectedManager && (
          <div className="space-y-5">
            {/* Permission 1: Menu Management */}
            <div className="flex items-start justify-between p-4 rounded-xl border border-black/5 bg-[#f0f4f1]/50">
              <div className="pr-4">
                <p className="text-sm font-bold text-brand-dark">১. মেনু ও দাম পরিবর্তনের অনুমতি</p>
                <p className="text-xs text-brand-dark/60 mt-0.5">
                  অন থাকলে ম্যানেজার নতুন খাবারের আইটেম বা রেট পরিবর্তন করতে পারবে। অফ থাকলে খাবারের মেনু এডিট বন্ধ থাকবে।
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={selectedManager.permissions?.canManageMenu || false}
                  onChange={(e) =>
                    setSelectedManager({
                      ...selectedManager,
                      permissions: {
                        ...selectedManager.permissions,
                        canManageMenu: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Permission 2: Sales Dashboard */}
            <div className="flex items-start justify-between p-4 rounded-xl border border-black/5 bg-[#f0f4f1]/50">
              <div className="pr-4">
                <p className="text-sm font-bold text-brand-dark">২. মোট বিক্রি ও লাভ দেখার অনুমতি</p>
                <p className="text-xs text-brand-dark/60 mt-0.5">
                  অন থাকলে ম্যানেজার রেস্টুরেন্টের মোট দৈনিক সেলস ও লাভ দেখতে পাবে। অফ থাকলে ব্যবসার সংবেদনশীল আর্থিক তথ্য গোপন থাকবে।
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={selectedManager.permissions?.canViewSalesDashboard || false}
                  onChange={(e) =>
                    setSelectedManager({
                      ...selectedManager,
                      permissions: {
                        ...selectedManager.permissions,
                        canViewSalesDashboard: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-black/5">
              <Button variant="secondary" onClick={() => setIsPermModalOpen(false)}>
                বাতিল
              </Button>
              <Button variant="primary" onClick={handleSavePermissions}>
                অনুমতি সংরক্ষণ করুন
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="নতুন কর্মী / টিম মেম্বার যুক্ত করুন"
        description="আপনার রেস্টুরেন্টের ম্যানেজার, শেফ বা ওয়েটারের তথ্য দিন।"
      >
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">
              কর্মীর নাম *
            </label>
            <input
              type="text"
              required
              placeholder="উদা: মো: রফিক উদ্দিন"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">
              মোবাইল নম্বর *
            </label>
            <input
              type="tel"
              required
              placeholder="017XXXXXXXX"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">
              পদবী (Role) *
            </label>
            <select
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary bg-white"
            >
              <option value="Waiter">🏃‍♂️ Waiter (সার্ভিস স্টাফ / ওয়েটার)</option>
              <option value="Manager">👔 Manager (ম্যানেজার / ক্যাশিয়ার)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">
              লগইন পিন / পাসওয়ার্ড *
            </label>
            <input
              type="password"
              required
              placeholder="উদা: 123456"
              value={newStaff.pin}
              onChange={(e) => setNewStaff({ ...newStaff, pin: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-brand-primary"
            />
            <p className="text-[11px] text-brand-dark/50 mt-1">
              এই মোবাইল নম্বর ও পিন দিয়ে কর্মী সরাসরি লগইন করে কাজ শুরু করতে পারবে।
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-black/5">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" variant="primary">
              কর্মী যুক্ত করুন
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
