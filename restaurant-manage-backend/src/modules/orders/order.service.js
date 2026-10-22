/**
 * অর্ডার সার্ভিস (Order Service):
 * - অর্ডার তৈরি ও লাইভ হিসাব (সাবটোটাল, ভ্যাট, ডিসকাউন্ট, মোট বিল)।
 * - স্মার্ট সিঙ্ক: নতুন অর্ডারে টেবিলকে Occupied করা ও কাস্টমারের খরচ বাড়ানো; অর্ডার Completed হলে টেবিলকে Available করা।
 */

const mongoose = require("mongoose");
const Order = require("../../models/Order");
const RestaurantTable = require("../../models/RestaurantTable");
const ApiError = require("../../utils/ApiError");

class OrderService {
  async getOrders({ status, search }, tenantId = null) {
    let query = tenantId ? { $or: [{ restaurantId: tenantId }, { restaurantId: null }] } : {};

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
    return await Order.find(query).sort({ createdAt: -1 });
  }

  async createOrder(orderData, tenantId = null) {
    const {
      customerName,
      tableNumber,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      paymentStatus,
      orderStatus,
      orderType,
    } = orderData;

    if (!items || items.length === 0) {
      throw new ApiError(400, "Order must have at least one item");
    }

    const orderNum = orderData.orderNumber || `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await Order.create({
      orderNumber: orderNum,
      customerName: customerName || "Walk-in Customer",
      tableNumber: tableNumber || "Takeaway",
      items,
      subtotal: parseFloat(subtotal) || 0,
      tax: parseFloat(tax) || 0,
      discount: parseFloat(discount) || 0,
      total: parseFloat(total) || 0,
      paymentMethod: paymentMethod || "Cash",
      paymentStatus: paymentStatus || "Paid",
      paidAmount: orderData.paidAmount !== undefined ? parseFloat(orderData.paidAmount) || 0 : (paymentStatus === "Paid" ? parseFloat(total) || 0 : 0),
      orderStatus: orderStatus || "Preparing",
      orderType: orderType || "dine_in",
      restaurantId: tenantId,
      staffId: orderData.staffId || null,
      staffName: orderData.staffName || "Counter Staff",
      staffUniqueId: orderData.staffUniqueId || "",
    });

    // খাবারের দৈনিক স্টক সংখ্যা অটোমেটিক মাইনাস করা
    const MenuItem = require("../../models/MenuItem");
    if (Array.isArray(items)) {
      for (const it of items) {
        if (it.menuItem) {
          const menuItemDoc = await MenuItem.findById(it.menuItem);
          if (menuItemDoc && typeof menuItemDoc.dailyStock === "number") {
            menuItemDoc.dailyStock = Math.max(0, menuItemDoc.dailyStock - (it.quantity || 1));
            if (menuItemDoc.dailyStock === 0) {
              menuItemDoc.outOfStock = true;
            }
            await menuItemDoc.save();
          }
        }
      }
    }

    if (tableNumber && tableNumber !== "Takeaway") {
      await RestaurantTable.findOneAndUpdate(
        { tableNumber, ...(tenantId ? { restaurantId: tenantId } : {}) },
        { status: "Occupied", currentOrder: order._id }
      );
    }

    return order;
  }

  // স্টাফভিত্তিক সেলস ও পারফরম্যান্স অ্যানালিটিক্স
  async getStaffSalesAnalytics(tenantId = null, targetDate = null) {
    let dateFilter = {};
    if (targetDate) {
      const start = new Date(targetDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(targetDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.createdAt = { $gte: start, $lte: end };
    }

    const query = {
      ...(tenantId ? { restaurantId: tenantId } : {}),
      ...dateFilter,
    };

    const orders = await Order.find(query).sort({ createdAt: -1 });

    const staffMap = {};

    orders.forEach((ord) => {
      const key = ord.staffUniqueId || ord.staffName || "Unknown Staff";
      if (!staffMap[key]) {
        staffMap[key] = {
          staffName: ord.staffName || "Counter Staff",
          staffUniqueId: ord.staffUniqueId || "N/A",
          totalOrders: 0,
          totalSales: 0,
          orders: [],
        };
      }

      staffMap[key].totalOrders += 1;
      staffMap[key].totalSales += ord.total || 0;
      staffMap[key].orders.push({
        orderNumber: ord.orderNumber,
        tableNumber: ord.tableNumber,
        total: ord.total,
        paymentMethod: ord.paymentMethod,
        createdAt: ord.createdAt,
        items: ord.items.map((it) => ({
          name: it.name,
          quantity: it.quantity,
          price: it.price,
        })),
      });
    });

    return Object.values(staffMap);
  }

  async updateOrderStatus(id, newStatus) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(404, "Invalid order ID");
    }

    if (!newStatus) {
      throw new ApiError(400, "Status is required");
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: newStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if ((newStatus === "Completed" || newStatus === "Cancelled") && order.tableNumber && order.tableNumber !== "Takeaway") {
      await RestaurantTable.findOneAndUpdate(
        { tableNumber: order.tableNumber },
        { status: "Available", currentOrder: null }
      );
    }

    return order;
  }
}

module.exports = new OrderService();
