require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/Category");
const MenuItem = require("./models/MenuItem");
const Customer = require("./models/Customer");
const RestaurantTable = require("./models/RestaurantTable");
const Order = require("./models/Order");

const categories = [
  { name: "Burgers", description: "Juicy handcrafted burgers" },
  { name: "Pizzas", description: "Authentic wood-fired stone pizzas" },
  { name: "Drinks", description: "Refreshing beverages and handcrafted mocktails" },
  { name: "Desserts", description: "Artisan sweet treats and desserts" },
];

const tables = [
  { tableNumber: "Table 1", capacity: 4, status: "Occupied" },
  { tableNumber: "Table 2", capacity: 2, status: "Available" },
  { tableNumber: "Table 3", capacity: 6, status: "Available" },
  { tableNumber: "Table 4", capacity: 4, status: "Reserved" },
  { tableNumber: "Table 5", capacity: 8, status: "Available" },
  { tableNumber: "Takeaway", capacity: 1, status: "Available" },
  { tableNumber: "VIP Lounge", capacity: 10, status: "Available" },
];

const customers = [
  { name: "Walk-in Customer", phone: "+8801700000000", email: "walkin@restomanage.local", totalOrders: 28, totalSpent: 780.50 },
  { name: "Rahim Chowdhury", phone: "+8801711223344", email: "rahim@gmail.com", totalOrders: 12, totalSpent: 385.00 },
  { name: "Karim Mia", phone: "+8801822334455", email: "karim@gmail.com", totalOrders: 9, totalSpent: 264.50 },
  { name: "Nusrat Jahan", phone: "+8801933445566", email: "nusrat@gmail.com", totalOrders: 8, totalSpent: 242.00 },
  { name: "Tanvir Ahmed", phone: "+8801555667788", email: "tanvir@gmail.com", totalOrders: 6, totalSpent: 195.00 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    await Customer.deleteMany({});
    await RestaurantTable.deleteMany({});
    await Order.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    const catMap = {};
    createdCategories.forEach((c) => {
      catMap[c.name] = c._id;
    });

    const menuItems = [
      {
        name: "Classic Beef Burger",
        category: catMap["Burgers"],
        price: 8.99,
        description: "Juicy grilled beef patty with cheddar cheese, lettuce, and secret sauce.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Double Cheese Smash",
        category: catMap["Burgers"],
        price: 11.50,
        description: "Twin smashed patties, crispy smoked bacon, double melted American cheddar.",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Margherita Supreme",
        category: catMap["Pizzas"],
        price: 14.00,
        description: "San Marzano tomatoes, fresh buffalo mozzarella, aromatic basil, and olive oil.",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Pepperoni Feast",
        category: catMap["Pizzas"],
        price: 16.50,
        description: "Loaded with spicy Italian pepperoni, melted mozzarella, and chili honey drizzle.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Iced Caramel Macchiato",
        category: catMap["Drinks"],
        price: 5.50,
        description: "Freshly brewed espresso with steamed milk and Madagascar caramel syrup.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Fresh Mint Lemonade",
        category: catMap["Drinks"],
        price: 4.25,
        description: "Cold-pressed zesty lemon juice infused with garden fresh crushed mint.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Belgian Chocolate Lava",
        category: catMap["Desserts"],
        price: 7.50,
        description: "Warm molten chocolate cake served with Madagascar vanilla bean gelato.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
      {
        name: "Vanilla Bean Sundae",
        category: catMap["Desserts"],
        price: 6.00,
        description: "Rich vanilla bean gelato topped with roasted almond flakes and salted caramel.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
        status: "Active",
      },
    ];

    const createdMenuItems = await MenuItem.insertMany(menuItems);
    await Customer.insertMany(customers);
    await RestaurantTable.insertMany(tables);

    const generatedOrders = [];
    let orderSeq = 1000;

    const dayRevenueTargets = [
      { daysAgo: 6, count: 5, target: 280 },
      { daysAgo: 5, count: 6, target: 360 },
      { daysAgo: 4, count: 7, target: 430 },
      { daysAgo: 3, count: 6, target: 390 },
      { daysAgo: 2, count: 8, target: 540 },
      { daysAgo: 1, count: 9, target: 680 },
      { daysAgo: 0, count: 7, target: 510 },
    ];

    const sampleCustomers = ["Walk-in Customer", "Rahim Chowdhury", "Karim Mia", "Nusrat Jahan", "Tanvir Ahmed"];
    const sampleTables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Takeaway", "VIP Lounge"];

    for (const plan of dayRevenueTargets) {
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() - plan.daysAgo);

      for (let i = 0; i < plan.count; i++) {
        orderSeq++;
        const orderDate = new Date(baseDate);
        orderDate.setHours(12 + Math.floor(i * 1.5), (i * 17) % 60, 0, 0);

        const item1 = createdMenuItems[i % createdMenuItems.length];
        const item2 = createdMenuItems[(i + 3) % createdMenuItems.length];
        const q1 = (i % 2) + 1;
        const q2 = (i % 3) + 1;

        const sub = item1.price * q1 + item2.price * q2;
        const tx = sub * 0.05;
        const tot = sub + tx;

        generatedOrders.push({
          orderNumber: String(orderSeq),
          customerName: sampleCustomers[(i + plan.daysAgo) % sampleCustomers.length],
          tableNumber: sampleTables[(i * 2) % sampleTables.length],
          items: [
            { menuItem: item1._id, name: item1.name, price: item1.price, quantity: q1, category: item1.category },
            { menuItem: item2._id, name: item2.name, price: item2.price, quantity: q2, category: item2.category },
          ],
          subtotal: parseFloat(sub.toFixed(2)),
          tax: parseFloat(tx.toFixed(2)),
          total: parseFloat(tot.toFixed(2)),
          paymentStatus: "Paid",
          orderStatus: plan.daysAgo === 0 && i === plan.count - 1 ? "Preparing" : "Completed",
          createdAt: orderDate,
        });
      }
    }

    await Order.insertMany(generatedOrders);

    console.log("Database seeded with full 7-day realistic orders!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
