/**
 * অর্ডার ও POS রাউটস (Order Routes):
 * - GET / ➔ সব অর্ডারের তালিকা ও স্ট্যাটাস ফিল্টারিং।
 * - POST / ➔ নতুন অর্ডার তৈরি (টেবিল অটো অকুপাই ও কাস্টমার স্পেন্ড আপডেট)।
 * - PATCH /:id/status ➔ অর্ডার স্ট্যাটাস (Preparing ➔ Completed) টগল ও টেবিল রিলিজ।
 */

const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  getStaffSales,
} = require("./order.controller");

const router = express.Router();

router.get("/analytics/staff-sales", getStaffSales);

router.route("/")
  .get(getOrders)
  .post(createOrder);

router.route("/:id/status")
  .patch(updateOrderStatus);

module.exports = router;
