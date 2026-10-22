/**
 * টেবিল কন্ট্রোলার (Table Controller):
 * - ডাইনিং টেবিল লিস্ট, নতুন টেবিল এন্ট্রি ও স্ট্যাটাস টগল রিকোয়েস্ট রিসিভ করে।
 * - table.service কল করে ডেটাবেজ আপডেট নিশ্চিত করে এবং ক্লায়েন্টকে রেসপন্স পাঠায়।
 */

const tableService = require("./table.service");
const asyncHandler = require("../../utils/asyncHandler");

const getTables = asyncHandler(async (req, res) => {
  const tables = await tableService.getTables(req.query, req.tenantId);
  return res.status(200).json({
    success: true,
    count: tables.length,
    data: tables,
  });
});

const createTable = asyncHandler(async (req, res) => {
  const table = await tableService.createTable(req.body, req.tenantId);
  return res.status(201).json({
    success: true,
    data: table,
  });
});

const updateTableStatus = asyncHandler(async (req, res) => {
  const table = await tableService.updateTableStatus(req.params.id, req.body.status);
  return res.status(200).json({
    success: true,
    data: table,
  });
});

const deleteTable = asyncHandler(async (req, res) => {
  await tableService.deleteTable(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Table deleted",
  });
});

module.exports = { getTables, createTable, updateTableStatus, deleteTable };
