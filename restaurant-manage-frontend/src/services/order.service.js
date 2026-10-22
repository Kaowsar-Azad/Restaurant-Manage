/**
 * --------------------------------------------------------------------------
 * অর্ডার ও পিওএস সার্ভিস (src/services/order.service.js)
 * --------------------------------------------------------------------------
 * 📌 এই সার্ভিসের দায়িত্ব:
 *    - টেবিলে বা কাউন্টারে নতুন অর্ডার সাবমিট করা (লগইন করা স্টাফের নাম ও ইউনিক আইডি সহ)।
 *    - চলমান ও বিগত অর্ডারের তালিকা ফেচ করা।
 *    - অর্ডারের পেমেন্ট ও ডেলিভারি স্ট্যাটাস আপডেট করা।
 *    - স্টাফভিত্তিক সেলস অ্যানালিটিক্স ডাটা আনা।
 * --------------------------------------------------------------------------
 */

import { apiClient } from "./api";

export const orderService = {
  // সমস্ত অর্ডার ফেচ
  async getOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/orders${query ? `?${query}` : ""}`);
  },

  // নতুন অর্ডার তৈরি (স্টাফ ট্যাগিং সহ)
  async createOrder(orderPayload) {
    // orderPayload এ অবশ্যই staffName ও staffUniqueId থাকবে
    return apiClient("/orders", {
      method: "POST",
      body: orderPayload,
    });
  },

  // অর্ডারের স্ট্যাটাস আপডেট
  async updateOrderStatus(orderId, status) {
    return apiClient(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: { status },
    });
  },

  // স্টাফভিত্তিক সেলস ও পারফরম্যান্স রিপোর্ট
  async getStaffSalesReport(date) {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return apiClient(`/orders/analytics/staff-sales${query}`);
  },
};
