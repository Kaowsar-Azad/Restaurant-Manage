/**
 * --------------------------------------------------------------------------
 * পেজ: স্টাফভিত্তিক সেলস ও পারফরম্যান্স রিপোর্ট (src/app/(dashboard)/analytics/staff-sales/page.jsx)
 * রিকোয়ারমেন্ট: সেকশন ৮ (স্টাফভিত্তিক অর্ডার ও সেলস ট্র্যাকিং)
 * --------------------------------------------------------------------------
 * 📌 এই পেজের মূল দায়িত্ব:
 *    ১. আজকের দিনে কোন স্টাফ সর্বমোট কত টাকার অর্ডার কেটেছে তার তালিকা।
 *    ২. স্টাফের নামের ওপর ক্লিক করলে তার কাটা সমস্ত অর্ডারের টাইমস্ট্যাম্পড হিস্ট্রি:
 *       - কোন কোন সময়ে অর্ডার নেওয়া হয়েছে (যেমন: দুপুর ১:১৫, দুপুর ২:৩০)।
 *       - প্রতিটা অর্ডারে কী কী খাবারের আইটেম ছিল এবং প্রতিটি খাবারের পরিমাণ (Quantity) কত ছিল।
 *    ৩. তারিখ অনুযায়ী ফিল্টার করে বিগত দিনের স্টাফ সেলস রিপোর্ট পর্যালোচনা করা।
 * 
 * 🔌 কানেক্টেড সার্ভিস:
 *    - orderService.getStaffSalesReport(date) -> GET /api/orders/analytics/staff-sales
 * --------------------------------------------------------------------------
 */

"use client";

import { useState } from "react";
import { FiTrendingUp, FiUser, FiClock, FiShoppingBag, FiCalendar, FiEye, FiCheckCircle } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";

const DEMO_STAFF_SALES = [
  {
    staffId: "stf-3",
    staffUniqueId: "STF-554120",
    staffName: "সাকিব হাসান",
    role: "Waiter",
    totalOrders: 18,
    totalSales: 14250,
    orders: [
      {
        orderNumber: "ORD-9901",
        time: "দুপুর ০১:১৫ PM",
        table: "Table 4",
        total: 1250,
        items: [
          { name: "চিকেন বিরিয়ানি", quantity: 2, price: 500 },
          { name: "বোরহানি", quantity: 2, price: 125 },
        ],
      },
      {
        orderNumber: "ORD-9908",
        time: "দুপুর ০২:৩০ PM",
        table: "Table 2",
        total: 2100,
        items: [
          { name: "কাচ্চি বিরিয়ানি স্পেশাল", quantity: 3, price: 650 },
          { name: "ফিরনি", quantity: 3, price: 50 },
        ],
      },
    ],
  },
  {
    staffId: "stf-4",
    staffUniqueId: "STF-661290",
    staffName: "জামাল হোসেন",
    role: "Cashier",
    totalOrders: 24,
    totalSales: 21800,
    orders: [
      {
        orderNumber: "ORD-9904",
        time: "দুপুর ০১:৪০ PM",
        table: "Takeaway",
        total: 950,
        items: [{ name: "বিফ তেহারি", quantity: 2, price: 475 }],
      },
    ],
  },
];

export default function StaffSalesReportPage() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-10-12");

  const handleViewOrders = (staff) => {
    setSelectedStaff(staff);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">স্টাফভিত্তিক সেলস ও পারফরম্যান্স</h1>
          <p className="text-sm text-brand-dark/60 mt-1">
            আজকের দিনে কোন কর্মী কত টাকার অর্ডার নিয়েছে, কোন কোন সময়ে অর্ডার হয়েছে এবং কী কী খাবার ছিল তা দেখুন।
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-black/10 self-start sm:self-center">
          <FiCalendar className="text-brand-dark/40" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-semibold text-brand-dark focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Staff Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMO_STAFF_SALES.map((staff) => (
          <Card key={staff.staffId} className="p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between border-b border-black/5 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-brand-dark/50 bg-black/5 px-2 py-0.5 rounded">
                  {staff.staffUniqueId}
                </span>
                <h3 className="text-lg font-bold text-brand-dark mt-1">{staff.staffName}</h3>
                <p className="text-xs text-brand-dark/50 font-medium">রোল: {staff.role}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-brand-dark/50 font-medium">আজকের মোট সেলস</p>
                <p className="text-xl font-black text-emerald-600">৳{staff.totalSales.toLocaleString()}</p>
                <p className="text-[11px] text-brand-dark/60">মোট {staff.totalOrders} টি অর্ডার</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-brand-dark/70">
                গড় অর্ডার মূল্য: ৳{Math.round(staff.totalSales / staff.totalOrders)}
              </span>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleViewOrders(staff)}
                className="gap-1.5"
              >
                <FiEye className="w-4 h-4" /> অর্ডারের বিস্তারিত দেখুন
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Detail Modal: Staff Orders & Items Breakdown */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`অর্ডার ও আইটেম হিস্ট্রি: ${selectedStaff?.staffName || ""}`}
        description={`আইডি: ${selectedStaff?.staffUniqueId || ""} • আজকের সম্পন্ন সমস্ত অর্ডার ও খাবারের তালিকা`}
        maxWidth="max-w-2xl"
      >
        {selectedStaff && (
          <div className="space-y-4">
            {selectedStaff.orders.map((ord, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-black/10 bg-[#f0f4f1]/50 space-y-3">
                <div className="flex items-center justify-between border-b border-black/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-black/5">
                      {ord.orderNumber}
                    </span>
                    <Badge variant="default">{ord.table}</Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-brand-dark/70">
                    <span className="flex items-center gap-1 text-brand-dark/50">
                      <FiClock className="w-3.5 h-3.5" /> {ord.time}
                    </span>
                    <span className="font-bold text-brand-dark">৳{ord.total}</span>
                  </div>
                </div>

                {/* Items in this order */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-dark/40 mb-1.5">
                    অর্ডার করা খাবার ও পরিমাণ:
                  </p>
                  <div className="space-y-1">
                    {ord.items.map((it, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-black/5"
                      >
                        <span className="font-medium text-brand-dark">
                          • {it.name} <b className="text-emerald-700 font-bold ml-1">× {it.quantity}</b>
                        </span>
                        <span className="text-brand-dark/70 font-semibold">৳{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={() => setIsDetailModalOpen(false)}>
                বন্ধ করুন
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
