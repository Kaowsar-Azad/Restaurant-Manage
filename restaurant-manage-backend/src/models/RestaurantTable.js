/**
 * ডাইনিং টেবিল মডেল (RestaurantTable Schema):
 * - টেবিল নম্বর, আসন ক্ষমতা (capacity) এবং লাইভ অকুপেন্সি স্ট্যাটাস (Available, Occupied, Reserved, Cleaning)।
 * - বর্তমানে টেবিলে চলমান অর্ডারের রেফারেন্স এবং সেলফ-অর্ডারিংয়ের জন্য QR টোকেন ধারণ করে।
 */

const mongoose = require("mongoose");

const restaurantTableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Reserved", "Cleaning"],
      default: "Available",
    },
    currentOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    qrToken: {
      type: String,
      default: null,
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

module.exports = mongoose.model("RestaurantTable", restaurantTableSchema);
