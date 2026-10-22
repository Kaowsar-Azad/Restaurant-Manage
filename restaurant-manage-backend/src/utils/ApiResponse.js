/**
 * স্ট্যান্ডার্ড API রেসপন্স ক্লাস:
 * - যেকোনো কন্ট্রোলার থেকে সফল ডেটা ক্লায়েন্টকে পাঠানোর সময় একই সুন্দর ফরম্যাট নিশ্চিত করে।
 * - রেসপন্সে statusCode, data, message এবং success (true/false) প্রপার্টি থাকে।
 */

class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

module.exports = ApiResponse;
