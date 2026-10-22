/**
 * --------------------------------------------------------------------------
 * রেস্টুরেন্ট স্টাফ ও টিম মেম্বার মডেল (StaffMember Schema):
 * --------------------------------------------------------------------------
 * 📌 এই মডেলের দায়িত্ব:
 *    - নির্দিষ্ট রেস্টুরেন্টে কর্মরত কর্মী, শেফ ও ম্যানেজারদের ডাটা সংরক্ষণ।
 *    - ইউনিক আইডি দিয়ে হায়ার করা কর্মী কিংবা লোকাল ইন-হাউস কর্মীদের রেকর্ড রাখা।
 *    - ম্যানেজারের বিশেষ পারমিশন সেটিংস (canManageMenu, canViewSalesDashboard)।
 * --------------------------------------------------------------------------
 */

const mongoose = require("mongoose");

const staffMemberSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    uniqueId: {
      type: String,
      default: "",
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Manager", "Chef", "Cashier", "Waiter", "Staff"],
      default: "Waiter",
    },
    salary: {
      type: Number,
      default: 0,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    isInHouse: {
      type: Boolean,
      default: false, // true হলে বাইরে থেকে হায়ার ছাড়া লোকাল এন্ট্রি
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "OnLeave"],
      default: "Active",
    },
    // মালিক কর্তৃক ম্যানেজারের জন্য নির্ধারিত বিশেষ পারমিশনসমূহ
    permissions: {
      canManageMenu: {
        type: Boolean,
        default: false, // ডিফল্টভাবে খাবারের মেনু পরিবর্তন বন্ধ থাকবে
      },
      canViewSalesDashboard: {
        type: Boolean,
        default: false, // ডিফল্টভাবে মোট সেলস ও লাভের হিসাব বন্ধ থাকবে
      },
      canApproveDiscounts: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

staffMemberSchema.index({ restaurantId: 1, role: 1 });
staffMemberSchema.index({ restaurantId: 1, uniqueId: 1 });

module.exports = mongoose.model("StaffMember", staffMemberSchema);
