/**
 * মেনু রাউটস (Menu Routes):
 * - GET / ➔ ক্যাটাগরি ও সার্চ ফিল্টারিং সহ খাবারের তালিকা দেখা।
 * - POST / ➔ নতুন মেনু আইটেম তৈরি করা।
 * - PUT /:id ➔ মেনু আইটেমের তথ্য (নাম, দাম, ছবি, স্ট্যাটাস) আপডেট করা।
 * - DELETE /:id ➔ মেনু আইটেম ডিলিট করা।
 */

const express = require("express");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setDailyStock,
} = require("./menu.controller");

const router = express.Router();

router.route("/")
  .get(getMenuItems)
  .post(createMenuItem);

router.route("/:id")
  .put(updateMenuItem)
  .delete(deleteMenuItem);

router.patch("/:id/stock", setDailyStock);

module.exports = router;
