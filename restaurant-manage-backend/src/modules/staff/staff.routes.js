/**
 * --------------------------------------------------------------------------
 * স্টাফ ও টিম রাউটস (src/modules/staff/staff.routes.js)
 * --------------------------------------------------------------------------
 * 📌 এই ফাইলের দায়িত্ব:
 *    - /api/restaurants/staff এন্ডপয়েন্টগুলোকে প্রটেক্টেড মিডলওয়্যার সহ রাউট করা।
 * --------------------------------------------------------------------------
 */

const express = require("express");
const staffController = require("./staff.controller");
const { protect } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(protect); // সমস্ত স্টাফ অপারেশনের জন্য লগইন আবশ্যক

router.get("/", staffController.getRoster);
router.post("/", staffController.addInHouseStaff);
router.post("/in-house", staffController.addInHouseStaff);
router.patch("/:id/permissions", staffController.updatePermissions);
router.delete("/:id", staffController.removeStaff);

module.exports = router;
