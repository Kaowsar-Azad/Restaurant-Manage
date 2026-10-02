const Order = require("../models/Order");
const RestaurantTable = require("../models/RestaurantTable");
const Customer = require("../models/Customer");

const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    if (status && status !== "All") {
      query.orderStatus = status;
    }
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { tableNumber: { $regex: search, $options: "i" } },
      ];
    }
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { customerName, tableNumber, items, subtotal, tax, discount, total, paymentStatus, orderStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must have at least one item" });
    }

    const orderNum = req.body.orderNumber || `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await Order.create({
      orderNumber: orderNum,
      customerName: customerName || "Walk-in Customer",
      tableNumber: tableNumber || "Takeaway",
      items,
      subtotal: parseFloat(subtotal) || 0,
      tax: parseFloat(tax) || 0,
      discount: parseFloat(discount) || 0,
      total: parseFloat(total) || 0,
      paymentStatus: paymentStatus || "Paid",
      orderStatus: orderStatus || "Preparing",
    });

    if (tableNumber && tableNumber !== "Takeaway") {
      await RestaurantTable.findOneAndUpdate(
        { tableNumber },
        { status: "Occupied", currentOrder: order._id }
      );
    }

    if (customerName && customerName !== "Walk-in Customer") {
      await Customer.findOneAndUpdate(
        { name: customerName },
        {
          $inc: { totalOrders: 1, totalSpent: parseFloat(total) || 0 },
          $set: { lastOrderDate: new Date() },
        }
      );
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if ((status === "Completed" || status === "Cancelled") && order.tableNumber && order.tableNumber !== "Takeaway") {
      await RestaurantTable.findOneAndUpdate(
        { tableNumber: order.tableNumber },
        { status: "Available", currentOrder: null }
      );
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus };
