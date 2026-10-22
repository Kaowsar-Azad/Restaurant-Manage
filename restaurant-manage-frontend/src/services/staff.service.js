/**
 * --------------------------------------------------------------------------
 * টিম ও হায়ার ম্যানেজমেন্ট সার্ভিস (src/services/staff.service.js)
 * --------------------------------------------------------------------------
 * 📌 এই সার্ভিসের দায়িত্ব:
 *    - রেস্টুরেন্টে কর্মরত সমস্ত স্টাফদের তালিকা আনা।
 *    - ইউনিক আইডি দিয়ে কর্মী সরাসরি হায়ার করা।
 *    - রেস্টুরেন্টের নিজস্ব লোকাল কর্মী যোগ করা।
 *    - ম্যানেজারের পারমিশন (মেনু পরিবর্তন ও সেলস ড্যাশবোর্ড দেখার অনুমতি) আপডেট করা।
 * --------------------------------------------------------------------------
 */

import { apiClient } from "./api";

export const staffService = {
  // রেস্টুরেন্টের বর্তমান স্টাফ তালিকা
  async getStaffRoster() {
    return apiClient("/restaurants/staff");
  },

  // নতুন কর্মী সরাসরি যুক্ত করা
  async addStaff(payload) {
    // payload: { name, phone, role, salary }
    return apiClient("/restaurants/staff", {
      method: "POST",
      body: payload,
    });
  },

  // ম্যানেজারের পারমিশন টগল (Owner Only)
  async updateManagerPermissions(managerId, permissions) {
    // permissions: { canManageMenu: boolean, canViewSalesDashboard: boolean }
    return apiClient(`/restaurants/staff/${managerId}/permissions`, {
      method: "PATCH",
      body: permissions,
    });
  },

  // কর্মী রিমুভ করা
  async removeStaff(staffId) {
    return apiClient(`/restaurants/staff/${staffId}`, {
      method: "DELETE",
    });
  },
};
