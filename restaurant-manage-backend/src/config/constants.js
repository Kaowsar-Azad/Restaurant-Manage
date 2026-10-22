/**
 * সিস্টেম কনস্ট্যান্টস ফাইল:
 * - ইউজারদের রোল, অর্ডার স্ট্যাটাস, পেমেন্ট স্ট্যাটাস এবং টেবিল স্ট্যাটাসের ফিক্সড নামগুলো এখানে থাকে।
 * - কোডে কোথাও সরাসরি টেক্সট হার্ডকোড না করে এখান থেকে কনস্ট্যান্ট ব্যবহার করা হয়।
 */

module.exports = {
  ROLES: {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "Admin",
    OWNER: "OWNER",
    MANAGER: "Manager",
    CASHIER: "Cashier",
    WAITER: "Waiter",
    STAFF: "Staff",
    KITCHEN: "Kitchen",
  },
  ORDER_STATUS: {
    PENDING: "Pending",
    PREPARING: "Preparing",
    READY: "Ready",
    SERVED: "Served",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  },
  PAYMENT_STATUS: {
    PENDING: "Pending",
    PAID: "Paid",
    FAILED: "Failed",
  },
  TABLE_STATUS: {
    AVAILABLE: "Available",
    OCCUPIED: "Occupied",
    RESERVED: "Reserved",
    CLEANING: "Cleaning",
  },
};
