/**
 * অথেন্টিকেশন রাউটস (Auth Routes):
 * - POST /register ➔ নতুন ইউজার ও রেস্টুরেন্ট রেজিস্ট্রেশন।
 * - POST /login ➔ ইমেইল ও পাসওয়ার্ড যাচাই করে JWT লগইন।
 * - GET /me ➔ বর্তমানে লগইন থাকা ইউজারের প্রোফাইল তথ্য (protect মিডলওয়্যার সুরক্ষিত)।
 */

const express = require("express");
const { register, login, getMe } = require("./auth.controller");
const { protect } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
