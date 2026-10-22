/**
 * ডেটাবেজ কনফিগারেশন ও কানেকশন:
 * - Mongoose দিয়ে MongoDB Atlas-এর সাথে সংযোগ স্থাপন করে।
 * - কানেকশন ক্যাশ করে রাখে যেন লোকাল এবং সার্ভারলেস দুই জায়গাতেই দ্রুত ও স্মুথ কাজ করে।
 */

const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("⚠️ MONGODB_URI is not defined in environment variables");
      return;
    }
    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
