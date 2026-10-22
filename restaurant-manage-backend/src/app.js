/**
 * এক্সপ্রেস অ্যাপ্লিকেশন কনফিগারেশন ফাইল (App Setup):
 * - CORS হেডার পলিসি, JSON ও URL-encoded বডি পার্সিং কনফিগার করে।
 * - সেন্ট্রাল API রুট (/api), রুট হেলথ চেক, 404 হ্যান্ডলার এবং গ্লোবাল এরর মিডলওয়্যার মাউন্ট করে।
 */

const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const connectDB = require("./config/db");

const app = express();

// CORS Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless DB connection middleware
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Mount Central API Routes (/api)
app.use("/api", apiRoutes);

// Root / Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🍽️ RestoManage SaaS API is running smoothly!",
    version: "2.0.0",
    docs: "/api/docs",
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

// Centralized Global Error Handler
app.use(errorHandler);

module.exports = app;
