/**
 * অ্যানালিটিক্স রাউটস (Analytics Routes):
 * - GET /overview ➔ ড্যাশবোর্ডের ৭ দিনের সেলস গ্রাফ, মোট রেভিনিউ, মোট অর্ডার ও AOV সামারি।
 */

const express = require("express");
const { getOverviewAnalytics } = require("./analytics.controller");

const router = express.Router();

router.get("/overview", getOverviewAnalytics);

module.exports = router;
