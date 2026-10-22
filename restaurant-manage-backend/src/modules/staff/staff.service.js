/**
 * --------------------------------------------------------------------------
 * স্টাফ ও টিম ম্যানেজমেন্ট সার্ভিস (src/modules/staff/staff.service.js)
 * --------------------------------------------------------------------------
 * 📌 এই সার্ভিসের মূল দায়িত্ব:
 *    ১. রেস্টুরেন্টের সমস্ত কর্মরত কর্মীদের তালিকা ফেচ করা।
 *    ২. ইউনিক আইডি দিয়ে কর্মী সরাসরি হায়ার করে রোস্টারে যুক্ত করা।
 *    ৩. রেস্টুরেন্টের নিজস্ব পরিচিত ইন-হাউস কর্মী সরাসরি যুক্ত করা।
 *    ৪. ম্যানেজারের জন্য বিশেষ পারমিশন (canManageMenu, canViewSalesDashboard) আপডেট করা।
 *    ৫. কর্মী রিমুভ করা।
 * --------------------------------------------------------------------------
 */

const StaffMember = require("../../models/StaffMember");
const ApiError = require("../../utils/ApiError");

const staffService = {
  // রেস্টুরেন্টের সমস্ত স্টাফের তালিকা
  async getStaffRoster(restaurantId) {
    return await StaffMember.find({ restaurantId }).sort({ createdAt: -1 });
  },

  // রেস্টুরেন্টের নিজস্ব ইন-হাউস কর্মী যোগ করা
  async addInHouseStaff(restaurantId, { name, phone, role, salary }) {
    const member = new StaffMember({
      restaurantId,
      name: name.trim(),
      phone: phone.trim(),
      role: role || "Waiter",
      salary: salary || 0,
      uniqueId: `STF-${Math.floor(1000 + Math.random() * 9000)}`,
      isInHouse: true,
      permissions: {
        canManageMenu: false,
        canViewSalesDashboard: false,
      },
    });

    return await member.save();
  },

  // রেস্টুরেন্টের নিজস্ব ইন-হাউস কর্মী যোগ করা
  async addInHouseStaff(restaurantId, { name, phone, role, salary }) {
    const member = new StaffMember({
      restaurantId,
      name: name.trim(),
      phone: phone.trim(),
      role: role || "Waiter",
      salary: salary || 0,
      uniqueId: `LOCAL-${Math.floor(1000 + Math.random() * 9000)}`,
      isInHouse: true,
      permissions: {
        canManageMenu: false,
        canViewSalesDashboard: false,
      },
    });

    return await member.save();
  },

  // ম্যানেজারের পারমিশন টগল করা (Owner Only)
  async updateManagerPermissions(restaurantId, staffId, permissions) {
    const member = await StaffMember.findOne({ _id: staffId, restaurantId });
    if (!member) {
      throw new ApiError(404, "স্টাফ খুঁজে পাওয়া যায়নি");
    }

    if (member.role !== "Manager") {
      throw new ApiError(400, "শুধুমাত্র ম্যানেজার রোলের ক্ষেত্রে পারমিশন প্রযোজ্য");
    }

    if (typeof permissions.canManageMenu === "boolean") {
      member.permissions.canManageMenu = permissions.canManageMenu;
    }
    if (typeof permissions.canViewSalesDashboard === "boolean") {
      member.permissions.canViewSalesDashboard = permissions.canViewSalesDashboard;
    }

    return await member.save();
  },

  // কর্মী মুছে ফেলা
  async removeStaff(restaurantId, staffId) {
    const member = await StaffMember.findOneAndDelete({ _id: staffId, restaurantId });
    if (!member) {
      throw new ApiError(404, "স্টাফ খুঁজে পাওয়া যায়নি");
    }
    return member;
  },
};

module.exports = staffService;
