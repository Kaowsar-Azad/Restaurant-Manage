const Order = require("../models/Order");
const Customer = require("../models/Customer");

const getOverviewAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    const salesAggregate = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, totalSales: { $sum: "$total" } } },
    ]);
    const totalSales = salesAggregate.length > 0 ? salesAggregate[0].totalSales : 0;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const chartAggregate = await Order.aggregate([
      {
        $match: {
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

    res.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        totalCustomers,
        avgOrderValue,
        recentOrders,
        salesChart,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getOverviewAnalytics };
