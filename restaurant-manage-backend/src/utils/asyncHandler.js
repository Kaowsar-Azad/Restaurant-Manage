/**
 * অ্যাসিনক্রোনাস হ্যান্ডলার র‍্যাপার:
 * - কন্ট্রোলারের ভেতর বারবার বিশৃঙ্খল try-catch ব্লক লেখার ঝামেলা দূর করে।
 * - যেকোনো async অপারেশনে ভুল হলে তা স্বয়ংক্রিয়ভাবে গ্লোবাল এরর মিডলওয়্যারে পাঠিয়ে দেয়।
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
