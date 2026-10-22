/**
 * কাস্টম API এরর ক্লাস:
 * - জাভাস্ক্রিপ্টের বিল্ট-ইন Error ক্লাসকে এক্সটেন্ড করে তৈরি করা হয়েছে।
 * - এর মাধ্যমে যেকোনো ভ্যালিডেশন বা সার্ভার এররে নির্দিষ্ট HTTP স্ট্যাটাস কোড ও বিস্তারিত মেসেজ পাঠানো যায়।
 */

class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
