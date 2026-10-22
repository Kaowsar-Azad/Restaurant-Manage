/**
 * অথেন্টিকেশন ও পারমিশন মিডলওয়্যার:
 * - protect: ইউজারের JWT টোকেন যাচাই করে এবং লগইন করা ইউজারের ডাটা req.user ও req.tenantId-তে সেট করে।
 * - authorize: নির্দিষ্ট রুটে ইউজারের রোল (Admin, Manager, Staff ইত্যাদি) এক্সেস করার অনুমতি আছে কি না তা নিশ্চিত করে।
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, token required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      throw new ApiError(401, "User not found or token invalid");
    }

    if (decoded.restaurantId) {
      req.tenantId = decoded.restaurantId;
    }

    next();
  } catch (error) {
    throw new ApiError(401, "Not authorized, token failed or expired");
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role (${req.user?.role || "Unknown"}) is not authorized to access this resource`
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
