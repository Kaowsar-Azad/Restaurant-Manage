/**
 * ইউজার মডেল (User Schema):
 * - রেস্টুরেন্টের সব ব্যবহারকারী ও কর্মচারীদের তথ্য (নাম, ইমেইল, পাসওয়ার্ড, ফোন)।
 * - রোল ম্যানেজমেন্ট (Admin, Manager, Staff ইত্যাদি) এবং মাল্টি-টেন্যান্ট restaurantId সংরক্ষণ করে।
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "Admin", "OWNER", "Manager", "CASHIER", "WAITER", "Staff", "KITCHEN"],
      default: "Staff",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
    phone: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
