/**
 * ক্যাটাগরি কন্ট্রোলার (Category Controller):
 * - ক্যাটাগরি সংক্রান্ত HTTP রিকোয়েস্ট রিসিভ করে এবং category.service-এর মাধ্যমে ডেটাবেজ অপারেশন সম্পন্ন করে।
 * - ক্যাটাগরি লিস্ট, নতুন ক্যাটাগরি তৈরি ও ডিলিটের রেসপন্স পাঠায়।
 */

const categoryService = require("./category.service");
const asyncHandler = require("../../utils/asyncHandler");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories(req.tenantId);
  return res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body, req.tenantId);
  return res.status(201).json({
    success: true,
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Category deleted",
  });
});

module.exports = { getCategories, createCategory, deleteCategory };
