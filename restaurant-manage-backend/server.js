/**
 * রুট সার্ভার এন্ট্রি পয়েন্ট:
 * - মডার্ন ও মডিউলার src/server.js আর্কিটেকচারে সরাসরি রিকোয়েস্ট ডেলিগেট করে।
 */
require("dotenv").config();
const app = require("./src/server");

module.exports = app;
