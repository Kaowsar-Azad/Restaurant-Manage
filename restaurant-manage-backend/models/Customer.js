const mongoose = require("mongoose");


const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true,
      trim: true,
    },
    phone: {
      type: String, 
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    totalOrders: {
      type: Number, 
      default: 0,
    },
    totalSpent: {
      type: Number, 
      default: 0,
    },
    lastOrderDate: {
      type: Date, 
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Customer", customerSchema);

