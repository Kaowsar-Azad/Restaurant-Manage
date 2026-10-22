/**
 * মেনু আইটেম মডেল (MenuItem Schema):
 * - খাবারের নাম (ইংরেজি ও বাংলা), ক্যাটাগরি রেফারেন্স, বিক্রয়মূল্য ও খরচমূল্য।
 * - খাবারের ছবি, সংক্ষিপ্ত বিবরণ এবং সক্রিয়তা স্ট্যাটাস (Active/Inactive) ধারণ করে।
 */

const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameBn: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    costPrice: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
    dailyStock: {
      type: Number,
      default: 50,
      min: 0,
    },
    outOfStock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
