/**
 * অ্যানালিটিক্স কন্ট্রোলার (Analytics Controller):
 * - ড্যাশবোর্ড ওভারভিউ সংক্রান্ত রিকোয়েস্ট রিসিভ করে analytics.service কল করে।
 * - ক্লায়েন্টকে গত ৭ দিনের গ্রাফ এবং KPI ডেটা রেসপন্স হিসেবে পাঠায়।
 */

const analyticsService = require("./analytics.service");
const asyncHandler = require("../../utils/asyncHandler");

const getOverviewAnalytics = asyncHandler(async (req, res) => {
  const data = await analyticsService.getOverviewAnalytics(req.tenantId);
  return res.status(200).json({
    success: true,
    data,
  });
});

module.exports = { getOverviewAnalytics };
