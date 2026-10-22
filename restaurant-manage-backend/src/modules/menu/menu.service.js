/**
 * মেনু সার্ভিস (Menu Service):
 * - মেনু আইটেমের কুয়েরি ও ক্যাটাগরি পপুলেশন লজিক।
 * - নতুন খাবারের নাম ও ক্যাটাগরি তৈরি, বিদ্যমান আইটেম আপডেট ও ভ্যালিডেশন চেক সম্পন্ন করে।
 */

const mongoose = require("mongoose");
const MenuItem = require("../../models/MenuItem");
const Category = require("../../models/Category");
const ApiError = require("../../utils/ApiError");

class MenuService {
  async getMenuItems({ category, search }, tenantId = null) {
    let query = tenantId ? { $or: [{ restaurantId: tenantId }, { restaurantId: null }] } : {};

    if (category && category !== "All") {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.category = category;
      } else {
        const catDoc = await Category.findOne({
          name: { $regex: new RegExp(`^${category.trim()}$`, "i") },
        });
        if (catDoc) {
          query.category = catDoc._id;
        } else {
          return [];
        }
      }
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    return await MenuItem.find(query)
      .populate("category", "name nameBn")
      .sort({ createdAt: -1 });
  }

  async createMenuItem({ name, nameBn, category, price, costPrice, description, image, status }, tenantId = null) {
    if (!name || !price || !category) {
      throw new ApiError(400, "Name, price, and category are required");
    }

    let categoryId = category;
    if (!mongoose.Types.ObjectId.isValid(category)) {
      let catDoc = await Category.findOne({
        name: { $regex: new RegExp(`^${category.trim()}$`, "i") },
      });
      if (!catDoc) {
        catDoc = await Category.create({ name: category.trim(), restaurantId: tenantId });
      }
      categoryId = catDoc._id;
    }

    const item = await MenuItem.create({
      name: name.trim(),
      nameBn: nameBn || "",
      category: categoryId,
      price: parseFloat(price),
      costPrice: parseFloat(costPrice) || 0,
      description: description || "",
      image: image || "",
      status: status || "Active",
      restaurantId: tenantId,
    });

    return await MenuItem.findById(item._id).populate("category", "name nameBn");
  }

  async updateMenuItem(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(404, "Invalid menu item ID");
    }

    let data = { ...updateData };
    if (data.category && !mongoose.Types.ObjectId.isValid(data.category)) {
      let catDoc = await Category.findOne({
        name: { $regex: new RegExp(`^${data.category.trim()}$`, "i") },
      });
      if (!catDoc) {
        catDoc = await Category.create({ name: data.category.trim() });
      }
      data.category = catDoc._id;
    }

    const item = await MenuItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("category", "name nameBn");

    if (!item) {
      throw new ApiError(404, "Menu item not found");
    }
    return item;
  }

  async deleteMenuItem(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(404, "Invalid menu item ID");
    }
    const item = await MenuItem.findByIdAndDelete(id);
    if (!item) {
      throw new ApiError(404, "Menu item not found");
    }
    return item;
  }

  async setDailyStock(id, dailyStock) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(404, "Invalid menu item ID");
    }
    const stock = Math.max(0, Number(dailyStock) || 0);
    const item = await MenuItem.findByIdAndUpdate(
      id,
      { dailyStock: stock, outOfStock: stock <= 0 },
      { new: true }
    ).populate("category", "name nameBn");

    if (!item) {
      throw new ApiError(404, "Menu item not found");
    }
    return item;
  }
}

module.exports = new MenuService();
