/**
 * সেন্ট্রাল রুট অ্যাগ্রিগেটর (Central API Routes Index):
 * - অ্যাপ্লিকেশনের সমস্ত মডিউলের রুটগুলোকে একত্রিত করে এক্সপ্রেস অ্যাপের জন্য মাউন্ট করে।
 * - /api প্রিফিক্সে auth, categories, menu, tables, customers, orders ও analytics রুট রেজিস্টার করে।
 */

const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const categoryRoutes = require("../modules/categories/category.routes");
const menuRoutes = require("../modules/menu/menu.routes");
const tableRoutes = require("../modules/tables/table.routes");
const orderRoutes = require("../modules/orders/order.routes");
const analyticsRoutes = require("../modules/analytics/analytics.routes");
const staffRoutes = require("../modules/staff/staff.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/menu", menuRoutes);
router.use("/tables", tableRoutes);
router.use("/orders", orderRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/restaurants/staff", staffRoutes);

module.exports = router;

