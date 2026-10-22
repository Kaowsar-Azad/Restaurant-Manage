/**
 * খাদ্য ক্যাটাগরি মডেল (Category Schema):
 * - খাবারের বিভিন্ন বিভাগের নাম (ইংরেজি ও বাংলা), সংক্ষিপ্ত বিবরণ।
 * - মাল্টি-টেন্যান্ট সাপোর্টের জন্য সংশ্লিষ্ট restaurantId সংরক্ষণ করে।
 */

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: "",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
