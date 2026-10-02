const express = require("express");
const router = express.Router();
const { getOverviewAnalytics } = require("../controllers/analyticsController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/overview", getOverviewAnalytics);

module.exports = router;
