/**
 * অর্ডার ও POS মডেল (Order Schema):
 * - গ্রাহকের অর্ডার নম্বর, টেবিল নম্বর, খাবারের তালিকা ও পরিমাণ সংরক্ষণ করে।
 * - সাবটোটাল, ভ্যাট/ট্যাক্স, ডিসকাউন্ট, মোট বিল এবং পেমেন্ট ও ডেলিভারি স্ট্যাটাস ট্র্যাক করে।
 */

const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: false,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  category: { type: String, default: "General" },
  note: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      default: "Walk-in Customer",
    },
    tableNumber: {
      type: String,
      default: "Takeaway",
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "bKash", "Nagad", "Rocket", "Card", "Mixed", "Other"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Paid",
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Served", "Completed", "Cancelled"],
      default: "Completed",
    },
    orderType: {
      type: String,
      enum: ["dine_in", "takeaway", "delivery"],
      default: "dine_in",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    staffName: {
      type: String,
      default: "Counter Staff",
      trim: true,
    },
    staffUniqueId: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
