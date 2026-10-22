/**
 * --------------------------------------------------------------------------
 * স্টাফ ও টিম কন্ট্রোলার (src/modules/staff/staff.controller.js)
 * --------------------------------------------------------------------------
 * 📌 এই কন্ট্রোলারের দায়িত্ব:
 *    - রেস্টুরেন্টের স্টাফ রোস্টার, হায়ার ও পারমিশন রিকোয়েস্ট হ্যান্ডেল করা।
 * --------------------------------------------------------------------------
 */

const staffService = require("./staff.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");

const staffController = {
  // রোস্টার তালিকা
  getRoster: asyncHandler(async (req, res) => {
    const restaurantId = req.tenantId || req.user?.restaurantId;
    if (!restaurantId) {
      throw new ApiError(400, "রেস্টুরেন্ট আইডি পাওয়া যায়নি");
    }

    const roster = await staffService.getStaffRoster(restaurantId);
    return ApiResponse.success(res, roster, "স্টাফ তালিকা লোড হয়েছে");
  }),

  // ইন-হাউস কর্মী যুক্ত করা
  addInHouseStaff: asyncHandler(async (req, res) => {
    const restaurantId = req.tenantId || req.user?.restaurantId;
    const { name, phone, role, salary } = req.body;

    if (!name || !phone) {
      throw new ApiError(400, "নাম ও ফোন নম্বর আবশ্যক");
    }

    const member = await staffService.addInHouseStaff(restaurantId, { name, phone, role, salary });
    return ApiResponse.created(res, member, "ইন-হাউস কর্মী সফলভাবে যুক্ত হয়েছে");
  }),

  // ম্যানেজার পারমিশন আপডেট
  updatePermissions: asyncHandler(async (req, res) => {
    const restaurantId = req.tenantId || req.user?.restaurantId;
    const { id } = req.params;

    const member = await staffService.updateManagerPermissions(restaurantId, id, req.body);
    return ApiResponse.success(res, member, "ম্যানেজার পারমিশন সফলভাবে সংরক্ষিত হয়েছে");
  }),

  // কর্মী রিমুভ
  removeStaff: asyncHandler(async (req, res) => {
    const restaurantId = req.tenantId || req.user?.restaurantId;
    const { id } = req.params;

    const member = await staffService.removeStaff(restaurantId, id);
    return ApiResponse.success(res, member, "কর্মী সফলভাবে অপসারিত হয়েছে");
  }),
};

module.exports = staffController;
