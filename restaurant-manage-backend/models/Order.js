const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  name: { type: String, required: true }, 
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }, 
  category: { type: String, default: "General" }, 
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
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Paid",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Served", "Completed", "Cancelled"],
      default: "Completed",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Order", orderSchema);
