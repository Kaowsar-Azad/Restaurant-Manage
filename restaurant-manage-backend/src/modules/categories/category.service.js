/**
 * ক্যাটাগরি সার্ভিস (Category Service):
 * - ক্যাটাগরি ফেচিং এবং নাম অনুযায়ী সাজিয়ে রিটার্ন করা।
 * - ডুপ্লিকেট ক্যাটাগরি প্রতিরোধ করে নতুন ক্যাটাগরি তৈরি ও আইডি অনুযায়ী ক্যাটাগরি ডিলিট করার বিজনেস লজিক।
 */

const Category = require("../../models/Category");
const ApiError = require("../../utils/ApiError");

class CategoryService {
  async getCategories(tenantId = null) {
    const query = tenantId ? { $or: [{ restaurantId: tenantId }, { restaurantId: null }] } : {};
    return await Category.find(query).sort({ name: 1 });
  }

  async createCategory({ name, description, nameBn }, tenantId = null) {
    if (!name || !name.trim()) {
      throw new ApiError(400, "Category name is required");
    }

    const trimmed = name.trim();
    const existing = await Category.findOne({
      name: trimmed,
      ...(tenantId ? { restaurantId: tenantId } : {}),
    });

    if (existing) {
      throw new ApiError(400, "Category already exists");
    }

    return await Category.create({
      name: trimmed,
      nameBn: nameBn || "",
      description: description || "",
      restaurantId: tenantId,
    });
  }

  async deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    return category;
  }
}

module.exports = new CategoryService();
