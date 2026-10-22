/**
 * অর্ডার কন্ট্রোলার (Order Controller):
 * - POS ও লাইভ অর্ডার ফেচিং, নতুন অর্ডার সাবমিশন এবং স্ট্যাটাস পরিবর্তনের রিকোয়েস্ট হ্যান্ডেল করে।
 * - order.service এক্সিকিউট করে ক্লায়েন্টকে সফল রেসপন্স প্রদান করে।
 */

const orderService = require("./order.service");
const asyncHandler = require("../../utils/asyncHandler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrders(req.query, req.tenantId);
  return res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.tenantId);
  return res.status(201).json({
    success: true,
    data: order,
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const status = req.body.status || req.body.orderStatus;
  const order = await orderService.updateOrderStatus(req.params.id, status);
  return res.status(200).json({
    success: true,
    data: order,
  });
});

const getStaffSales = asyncHandler(async (req, res) => {
  const data = await orderService.getStaffSalesAnalytics(req.tenantId, req.query.date);
  return res.status(200).json({
    success: true,
    data,
  });
});

module.exports = { getOrders, createOrder, updateOrderStatus, getStaffSales };

