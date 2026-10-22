/**
 * অথেন্টিকেশন কন্ট্রোলার (Auth Controller):
 * - ক্লায়েন্ট রিকোয়েস্ট রিসিভ করে auth.service-কে কল করে এবং প্রসেসিংয়ের পর স্ট্যান্ডার্ড ApiResponse পাঠায়।
 * - রেজিস্টার, লগইন এবং কারেন্ট প্রোফাইল ডেটা পাঠানোর রেসপন্স হ্যান্ডেল করে।
 */

const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(201).json(
    new ApiResponse(201, result, "User registered successfully")
  );
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(200).json(
    new ApiResponse(200, result, "User logged in successfully")
  );
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user);
  return res.status(200).json(
    new ApiResponse(200, { user }, "User profile fetched successfully")
  );
});

module.exports = { register, login, getMe };
