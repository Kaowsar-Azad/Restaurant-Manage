/**
 * অ্যানালিটিক্স সার্ভিস (Analytics Service):
 * - MongoDB Aggregation পাইপলাইন ব্যবহার করে বিগত ৭ দিনের সেলস ও অর্ডার ভলিউম হিসাব করা।
 * - মোট সেলস, মোট অর্ডার সংখ্যা, কাস্টমার সংখ্যা, AOV (গড় অর্ডার ভ্যালু) এবং সাম্প্রতিক অর্ডার জেনারেট করার লজিক।
 */

const Order = require("../../models/Order");

class AnalyticsService {
  async getOverviewAnalytics(tenantId = null) {
    const baseMatch = tenantId
      ? { $or: [{ restaurantId: tenantId }, { restaurantId: null }] }
      : {};

    const totalOrders = await Order.countDocuments(baseMatch);
    const uniqueCustomers = await Order.distinct("customerName", baseMatch);
    const totalCustomers = uniqueCustomers.length;

    const salesAggregate = await Order.aggregate([
      { $match: { ...baseMatch, paymentStatus: "Paid" } },
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSales = salesAggregate.length > 0 ? salesAggregate[0].totalSales : 0;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    const recentOrders = await Order.find(baseMatch).sort({ createdAt: -1 }).limit(5);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const chartAggregate = await Order.aggregate([
      {
        $match: {
          ...baseMatch,
          createdAt: { $gte: sevenDaysAgo },
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: "$total" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const salesChart = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = days[d.getDay()];

      const found = chartAggregate.find((item) => item._id === dateStr);
      salesChart.push({
        day: dayName,
        date: dateStr,
        sales: found ? found.sales : 0,
        orders: found ? found.orders : 0,
      });
    }

    return {
      totalSales,
      totalOrders,
      totalCustomers,
      avgOrderValue,
      recentOrders,
      salesChart,
    };
  }
}

module.exports = new AnalyticsService();
