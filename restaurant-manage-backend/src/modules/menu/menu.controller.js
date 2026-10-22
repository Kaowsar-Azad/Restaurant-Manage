/**
 * মেনু কন্ট্রোলার (Menu Controller):
 * - খাবারের তালিকা ফেচ, নতুন খাবার তৈরি, এডিট এবং ডিলিট সংক্রান্ত রিকোয়েস্ট হ্যান্ডেল করে।
 * - menu.service কল করে ডেটাবেজ আপডেট নিশ্চিত করে এবং ক্লায়েন্টকে স্ট্যান্ডার্ড রেসপন্স দেয়।
 */

const menuService = require("./menu.service");
const asyncHandler = require("../../utils/asyncHandler");

const getMenuItems = asyncHandler(async (req, res) => {
  const items = await menuService.getMenuItems(req.query, req.tenantId);
  return res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
});

const createMenuItem = asyncHandler(async (req, res) => {
  const item = await menuService.createMenuItem(req.body, req.tenantId);
  return res.status(201).json({
    success: true,
    data: item,
  });
});

const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await menuService.updateMenuItem(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    data: item,
  });
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  await menuService.deleteMenuItem(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Menu item deleted",
  });
});

const setDailyStock = asyncHandler(async (req, res) => {
  const item = await menuService.setDailyStock(req.params.id, req.body.dailyStock);
  return res.status(200).json({
    success: true,
    data: item,
  });
});

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, setDailyStock };

