/**
 * রেস্টুরেন্ট টেন্যান্ট মডেল (Restaurant Schema):
 * - রেস্টুরেন্টের নাম, ইউনিক স্লাগ, ঠিকানা, ফোন ও মালিকের ইউজার রেফারেন্স।
 * - কারেন্সি (BDT ৳), ভ্যাট রেট, রসিদ হেডার/ফুটার ও বিলিং প্ল্যানের সেটিংস ধারণ করে।
 */

const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "Dhaka",
    },
    settings: {
      currency: { type: String, default: "BDT" },
      currencySymbol: { type: String, default: "৳" },
      language: { type: String, enum: ["bn", "en"], default: "bn" },
      timezone: { type: String, default: "Asia/Dhaka" },
      vatRate: { type: Number, default: 0 },
      vatInclusive: { type: Boolean, default: false },
      serviceChargeRate: { type: Number, default: 0 },
      binNumber: { type: String, default: "" },
      receiptHeader: { type: String, default: "" },
      receiptFooter: { type: String, default: "Thank you for dining with us!" },
      receiptWidth: { type: String, enum: ["58mm", "80mm"], default: "80mm" },
    },
    planKey: {
      type: String,
      enum: ["free", "starter", "pro", "business", "trial"],
      default: "trial",
    },
    status: {
      type: String,
      enum: ["active", "suspended", "closed", "trial"],
      default: "trial",
    },
    trialEndsAt: {
      type: Date,
      default: () => new Date(+new Date() + 14 * 24 * 60 * 60 * 1000), // 14 days
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
