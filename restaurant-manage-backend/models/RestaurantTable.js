const mongoose = require("mongoose");


const restaurantTableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: String, 
      required: true, 
      unique: true,
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
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("RestaurantTable", restaurantTableSchema);

