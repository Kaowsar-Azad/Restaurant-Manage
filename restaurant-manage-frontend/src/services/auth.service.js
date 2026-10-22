/**
 * --------------------------------------------------------------------------
 * অথেন্টিকেশন ও অনবোর্ডিং সার্ভিস (src/services/auth.service.js)
 * --------------------------------------------------------------------------
 * 📌 এই সার্ভিসের দায়িত্ব:
 *    - লগইন (/api/auth/login) ও সাধারণ সাইন-আপ (/api/auth/register)।
 *    - রেস্টুরেন্ট মালিকের নতুন রেস্টুরেন্ট অনবোর্ডিং রেজিস্ট্রেশন।
 *    - বর্তমান লগইন করা ব্যবহারকারীর প্রোফাইল তথ্য আনা।
 * --------------------------------------------------------------------------
 */

import { apiClient } from "./api";

export const authService = {
  // ব্যবহারকারী লগইন
  async login(credentials) {
    return apiClient("/auth/login", {
      method: "POST",
      body: credentials,
    });
  },

  // নতুন কর্মী/ব্যবহারকারী সাইন-আপ
  async register(userData) {
    return apiClient("/auth/register", {
      method: "POST",
      body: userData,
    });
  },

  // রেস্টুরেন্ট মালিকের রেস্টুরেন্ট তৈরি/অনবোর্ডিং
  async registerRestaurant(restaurantData) {
    return apiClient("/restaurants", {
      method: "POST",
      body: restaurantData,
    });
  },

  // বর্তমান লগইন ইউজারের প্রোফাইল
  async getMe() {
    return apiClient("/auth/me");
  },
};
