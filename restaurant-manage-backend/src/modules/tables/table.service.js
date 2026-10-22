/**
 * টেবিল সার্ভিস (Table Service):
 * - ডাইনিং টেবিল লিস্ট ও রানিং অর্ডার পপুলেট করে নিয়ে আসার লজিক।
 * - নতুন টেবিল তৈরি, অকুপেন্সি স্ট্যাটাস (Available/Occupied/Reserved/Cleaning) আপডেট এবং টেবিল ডিলিট করার বিজনেস লজিক।
 */

const mongoose = require("mongoose");
const RestaurantTable = require("../../models/RestaurantTable");
const ApiError = require("../../utils/ApiError");

class TableService {
  async getTables({ status }, tenantId = null) {
    let query = tenantId ? { $or: [{ restaurantId: tenantId }, { restaurantId: null }] } : {};
    if (status && status !== "All") {
      query.status = status;
    }
    return await RestaurantTable.find(query)
      .populate("currentOrder")
      .sort({ tableNumber: 1 });
  }

  async createTable({ tableNumber, capacity, status }, tenantId = null) {
    if (!tableNumber) {
      throw new ApiError(400, "Table number is required");
    }

    const trimmed = tableNumber.trim();
    const existing = await RestaurantTable.findOne({
      tableNumber: trimmed,
      ...(tenantId ? { restaurantId: tenantId } : {}),
    });

    if (existing) {
      throw new ApiError(400, "Table already exists");
    }

    return await RestaurantTable.create({
      tableNumber: trimmed,
      capacity: parseInt(capacity) || 4,
      status: status || "Available",
      restaurantId: tenantId,
    });
  }

  async updateTableStatus(id, status) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(404, "Invalid table ID");
    }

    const table = await RestaurantTable.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!table) {
      throw new ApiError(404, "Table not found");
    }
    return table;
  }

  async deleteTable(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(404, "Invalid table ID");
    }
    const table = await RestaurantTable.findByIdAndDelete(id);
    if (!table) {
      throw new ApiError(404, "Table not found");
    }
    return table;
  }
}

module.exports = new TableService();
