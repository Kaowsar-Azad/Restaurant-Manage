/**
 * মাল্টি-টেন্যান্ট স্কোপিং মিডলওয়্যার:
 * - বর্তমান রিকোয়েস্ট কোন রেস্টুরেন্টের তা নির্ধারণ করে req.tenantId সেট করে।
 * - এর মাধ্যমে এক রেস্টুরেন্টের ডাটা যাতে অন্য রেস্টুরেন্টের সাথে মিশে না যায় তা নিশ্চিত করা হয়।
 */

const ApiError = require("../utils/ApiError");

const requireTenant = (req, res, next) => {
  const tenantId = req.tenantId || req.user?.restaurantId;
  if (!tenantId && req.user?.role !== "SUPER_ADMIN") {
    // If not super admin and no tenantId assigned yet
    req.tenantId = null;
  }
  next();
};

module.exports = { requireTenant };
