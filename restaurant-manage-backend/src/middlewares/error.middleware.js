/**
 * সেন্ট্রাল গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার:
 * - অ্যাপ্লিকেশনের যেকোনো জায়গায় ভুল বা এরর হলে তা স্বয়ংক্রিয়ভাবে এখানে ধরা পড়ে।
 * - ক্লায়েন্টকে সুন্দর ও সুসংগঠিতভাবে এরর কোড ও মেসেজ রেসপন্স পাঠায়।
 */

const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    statusCode: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
