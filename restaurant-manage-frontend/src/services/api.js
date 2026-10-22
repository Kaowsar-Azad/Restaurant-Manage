/**
 * --------------------------------------------------------------------------
 * সেন্ট্রাল API ক্লায়েন্ট (src/services/api.js)
 * --------------------------------------------------------------------------
 * 📌 এই সার্ভিসের দায়িত্ব:
 *    - ব্যাকএন্ড সার্ভারের (http://localhost:5000/api) সাথে যোগাযোগ রক্ষা করা।
 *    - লোকালস্টোরেজ থেকে স্বয়ংক্রিয়ভাবে JWT টোকেন রিড করে Authorization হেডারে পাঠানো।
 *    - JSON পার্সিং এবং সাধারণ ত্রুটি (401 Unauthorized, 500 Server Error) নিয়ন্ত্রণ করা।
 * 
 * 💡 ব্যবহারবিধি (Example):
 *    import { apiClient } from "@/services/api";
 *    const data = await apiClient("/orders");
 *    const res = await apiClient("/orders", { method: "POST", body: orderData });
 * --------------------------------------------------------------------------
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiClient(endpoint, options = {}) {
  const { method = "GET", body, headers = {}, ...customConfig } = options;

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const config = {
    method,
    headers: defaultHeaders,
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...customConfig,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`, config);

  if (response.status === 401 && typeof window !== "undefined") {
    // সেশন শেষ হয়ে গেলে বা টোকেন ইনভ্যালিড হলে হ্যান্ডেল করার জায়গা
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `অনুরোধ ব্যর্থ হয়েছে (${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
