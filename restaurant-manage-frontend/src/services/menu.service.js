/**
 * --------------------------------------------------------------------------
 * মেনু ও দৈনিক স্টক সার্ভিস (src/services/menu.service.js)
 * --------------------------------------------------------------------------
 * 📌 এই সার্ভিসের দায়িত্ব:
 *    - খাবারের মেনু আইটেম ও ক্যাটাগরি ফেচ করা।
 *    - নতুন খাবার আইটেম যোগ, এডিট ও ডিলিট করা।
 *    - আজকের দৈনিক প্রস্তুত স্টক লিমিট (Daily Stock Quantity) আপডেট করা।
 *    - খাবার আউট-অফ-স্টক বা অ্যাভেইলেবল টগল করা।
 * --------------------------------------------------------------------------
 */

import { apiClient } from "./api";

export const menuService = {
  // সমস্ত মেনু আইটেম ফেচ
  async getMenuItems() {
    return apiClient("/menu");
  },

  // সমস্ত ক্যাটাগরি ফেচ
  async getCategories() {
    return apiClient("/categories");
  },

  // নতুন খাবার যোগ করা
  async createMenuItem(itemData) {
    return apiClient("/menu", {
      method: "POST",
      body: itemData,
    });
  },

  // খাবারের তথ্য বা দৈনিক স্টক সংখ্যা আপডেট
  async updateMenuItem(itemId, updateData) {
    // updateData: { price, dailyStock, isAvailable, ... }
    return apiClient(`/menu/${itemId}`, {
      method: "PUT",
      body: updateData,
    });
  },

  // সরাসরি দৈনিক স্টক সংখ্যা সেট করা
  async setDailyStock(itemId, dailyStock) {
    return apiClient(`/menu/${itemId}/stock`, {
      method: "PATCH",
      body: { dailyStock },
    });
  },

  // খাবার মুছে ফেলা
  async deleteMenuItem(itemId) {
    return apiClient(`/menu/${itemId}`, {
      method: "DELETE",
    });
  },
};
