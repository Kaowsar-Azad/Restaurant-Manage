/**
 * সার্ভার বুটস্ট্র্যাপ ফাইল (Server Bootstrapper):
 * - ডেটাবেজ সংযোগ নিশ্চিত করে এবং পোর্ট (PORT)-এ এক্সপ্রেস সার্ভার চালু করে।
 * - লোকাল ডেভেলপমেন্ট এবং Vercel সার্ভারলেস উভয় পরিবেশে এক্সিকিউট করার জন্য প্রস্তুত।
 */

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🚀 RestoManage Server running on port ${PORT} (http://localhost:${PORT})`);
      });
    }
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
