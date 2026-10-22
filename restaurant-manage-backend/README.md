# 🍽️ RestoManage Backend — টিম আর্কিটেকচার ও কোডবেস গাইডলাইন

এই ডকুমেন্টেশনে `restaurant-manage-backend`-এর বর্তমান সম্পূর্ণ আর্কিটেকচার, ফোল্ডার স্ট্রাকচার এবং প্রতিটি ফাইলের সুনির্দিষ্ট কাজ বিস্তারিতভাবে ব্যাখ্যা করা হয়েছে। টিমের যেকোনো সদস্য এই গাইড দেখে সহজেই বুঝতে পারবেন কোন ফাইলে কী লেখা আছে এবং কীভাবে কাজ করতে হবে।

---

## 📁 বর্তমান ফোল্ডার ও ফাইল ডিরেক্টরি (File Tree)

```plaintext
restaurant-manage-backend/
├── .env.example                       # পরিবেশ ভেরিয়েবলের টেমপ্লেট
├── README.md                          # টিমের জন্য সম্পূর্ণ আর্কিটেকচার ও গাইডলাইন (এই ফাইল)
├── ARCHITECTURE.md                    # আর্কিটেকচারাল রেফারেন্স ফাইল
├── package.json                       # ডিপেন্ডেন্সি ও রান স্ক্রিপ্ট
├── vercel.json                        # Vercel সার্ভারলেস ডিপ্লয়মেন্ট কনফিগারেশন
├── seedData.js                        # টেস্ট ডেটা পপুলেট করার স্ক্রিপ্ট
├── server.js                          # রুট সার্ভার এন্ট্রি পয়েন্ট (src/server.js-এ ডেলিগেট করে)
└── src/
    ├── server.js                      # সার্ভার বুটস্ট্র্যাপ ও পোর্ট লিসেনিং
    ├── app.js                         # এক্সপ্রেস কনফিগারেশন, CORS, গ্লোবাল মিডলওয়্যার ও রুট মাউন্টিং
    │
    ├── config/                        # সিস্টেম কনফিগারেশন
    │   ├── db.js                      # MongoDB কানেকশন ও রি-কানেকশন হ্যান্ডলার
    │   └── constants.js               # সিস্টেম রোল, অর্ডার, টেবিল ও পেমেন্ট কনস্ট্যান্টস
    │
    ├── middlewares/                   # শেয়ার্ড এক্সপ্রেস মিডলওয়্যার
    │   ├── auth.middleware.js         # JWT অথেন্টিকেশন ও রোল পারমিশন গার্ড
    │   ├── tenant.middleware.js       # মাল্টি-টেন্যান্ট আইসোলেশন ও স্কোপিং মিডলওয়্যার
    │   └── error.middleware.js        # সেন্ট্রালাইজড গ্লোবাল এরর হ্যান্ডলার
    │
    ├── utils/                         # রিইউজেবল হেল্পার ক্লাস ও ইউটিলিটি
    │   ├── ApiResponse.js             # স্ট্যান্ডার্ড সফল রেসপন্স ক্লাস
    │   ├── ApiError.js                # কাস্টম এরর ক্লাস (স্ট্যাটাস কোড ও এরর লিস্ট সহ)
    │   └── asyncHandler.js            # কন্ট্রোলারের try-catch রিপিটেশন দূর করার র‍্যাপার
    │
    ├── models/                        # Mongoose ডেটাবেজ স্কিমা
    │   ├── User.js                    # ইউজার ক্রেডেনশিয়াল, রোল ও টেন্যান্ট রেফারেন্স
    │   ├── Restaurant.js              # রেস্টুরেন্ট টেন্যান্ট প্রোফাইল ও সেটিংস
    │   ├── Order.js                   # অর্ডার, ফুড আইটেম লিস্ট, ট্যাক্স ও পেমেন্ট স্ট্যাটাস
    │   ├── MenuItem.js                # মেনু আইটেম, দাম, কস্ট ও ক্যাটাগরি
    │   ├── Category.js                # খাদ্য ক্যাটাগরি
    │   ├── RestaurantTable.js         # ডাইনিং টেবিল, ক্যাপাসিটি ও অকুপেন্সি স্ট্যাটাস
    │   └── Customer.js                # কাস্টমার প্রোফাইল, ফোন ও স্পেন্ডিং হিস্ট্রি
    │
    ├── modules/                       # 🎯 ডোমেন ভিত্তিক মডিউল (টিমের কাজের মূল জায়গা)
    │   ├── auth/                      # অথেন্টিকেশন মডিউল
    │   │   ├── auth.routes.js         # রুট ডেফিনিশন (POST /register, POST /login, GET /me)
    │   │   ├── auth.controller.js     # HTTP রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │   │   └── auth.service.js        # ইউজার তৈরি, পাসওয়ার্ড হ্যাশিং, টোকেন জেনারেশন লজিক
    │   │
    │   ├── orders/                    # POS ও অর্ডার ম্যানেজমেন্ট মডিউল
    │   │   ├── order.routes.js        # রুট ডেফিনিশন (GET /, POST /, PATCH /:id/status)
    │   │   ├── order.controller.js    # রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │   │   └── order.service.js       # অর্ডার তৈরি, টেবিল অকুপাই/ফ্রি করা, কাস্টমার হিস্ট্রি আপডেট
    │   │
    │   ├── menu/                      # মেনু আইটেম মডিউল
    │   │   ├── menu.routes.js         # রুট ডেফিনিশন (GET /, POST /, PUT /:id, DELETE /:id)
    │   │   ├── menu.controller.js     # রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │   │   └── menu.service.js        # মেনু সার্চ, ফিল্টারিং, তৈরি, আপডেট ও ডিলিট লজিক
    │   │
    │   ├── categories/                # ক্যাটাগরি মডিউল
    │   │   ├── category.routes.js     # রুট ডেফিনিশন (GET /, POST /, DELETE /:id)
    │   │   ├── category.controller.js # রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │   │   └── category.service.js    # ক্যাটাগরি ফেচিং, তৈরি ও ডুপ্লিকেট রোধ লজিক
    │   │
    │   ├── tables/                    # টেবিল ম্যানেজমেন্ট মডিউল
    │   │   ├── table.routes.js        # রুট ডেফিনিশন (GET /, POST /, DELETE /:id, PATCH /:id/status)
    │   │   ├── table.controller.js    # রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │   │   └── table.service.js       # টেবিল তৈরি, স্ট্যাটাস সাইকেল ও ডিলিট লজিক
    │   │
    │   ├── customers/                 # কাস্টমার ডিরেক্টরি মডিউল
    │   │   ├── customer.routes.js     # রুট ডেফিনিশন (GET /, POST /, DELETE /:id)
    │   │   ├── customer.controller.js # রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │   │   └── customer.service.js    # কাস্টমার সার্চ, ফোন ভ্যালিডেশন ও প্রোফাইল লজিক
    │   │
    │   └── analytics/                 # সেলস অ্যানালিটিক্স মডিউল
    │       ├── analytics.routes.js    # রুট ডেফিনিশন (GET /overview)
    │       ├── analytics.controller.js# রিকোয়েস্ট ও রেসপন্স হ্যান্ডলার
    │       └── analytics.service.js   # MongoDB অ্যাগ্রিগেশন পাইপলাইন দিয়ে ৭ দিনের সেলস ও KPI
    │
    └── routes/
        └── index.js                   # সেন্ট্রাল রুট অ্যাগ্রিগেটর (/api/...)
```

---

## 🔍 প্রতিটি ফোল্ডার ও ফাইলের বিস্তারিত বিবরণ

### ১. রুট ফাইলসমূহ
* **`server.js` (রুট):**  
  এটি অ্যাপ্লিকেশনের প্রধান এন্ট্রি পয়েন্ট। এটি `dotenv.config()` লোড করে এবং ক্লিন আর্কিটেকচারের `src/server.js`-কে কল করে। Vercel সার্ভারলেস ফাংশন এবং লোকাল `node server.js` উভয় জায়গাতেই এটি কাজ করে।
* **`seedData.js`:**  
  ডেভেলপমেন্টের জন্য ইনিশিয়াল মেনু, টেবিল, ক্যাটাগরি, কাস্টমার এবং অর্ডারের ডামি ডেটা মঙ্গোডিবিতে ইনসার্ট করার জন্য ব্যবহৃত স্ক্রিপ্ট।

---

### ২. `src/` কোর ফাইলসমূহ
* **`src/server.js`:**  
  সার্ভারের লাইফসাইকেল হ্যান্ডলার। এটি `connectDB()` কল করে ডেটাবেজ কানেক্ট করে এবং `PORT` (ডিফল্ট 5000)-এ `app.listen()` দিয়ে সার্ভার চালু করে।
* **`src/app.js`:**  
  এক্সপ্রেস অ্যাপ্লিকেশনের কনফিগারেশন ফাইল। এতে রয়েছে:
  * CORS হেডার কনফিগারেশন।
  * `express.json()` ও `express.urlencoded()` বডি পার্সার।
  * সার্ভারলেস রি-কানেকশন মিডলওয়্যার।
  * সেন্ট্রাল API রুট মাউন্টিং (`app.use("/api", apiRoutes)`।
  * রুট হেলথ চেক রুট (`GET /`)।
  * 404 নট-ফাউন্ড হ্যান্ডলার।
  * সেন্ট্রাল এরর মিডলওয়্যার (`app.use(errorHandler)`।

---

### ৩. `src/config/` (কনফিগারেশন)
* **`config/db.js`:**  
  Mongoose দিয়ে MongoDB Atlas কানেক্ট করার অপ্টিমাইজড হ্যান্ডলার। `mongoose.connection.readyState` চেক করে কানেকশন ক্যাশ করে, যাতে সার্ভারলেসে অপ্রয়োজনীয় ডুপ্লিকেট কানেকশন তৈরি না হয়।
* **`config/constants.js`:**  
  পুরো প্রজেক্টে ব্যবহৃত কনস্ট্যান্টগুলোর সেন্ট্রাল অবজেক্ট:
  * `ROLES`: `SUPER_ADMIN`, `Admin`, `OWNER`, `Manager`, `CASHIER`, `WAITER`, `Staff`, `KITCHEN`
  * `ORDER_STATUS`: `Pending`, `Preparing`, `Ready`, `Served`, `Completed`, `Cancelled`
  * `PAYMENT_STATUS`: `Pending`, `Paid`, `Failed`
  * `TABLE_STATUS`: `Available`, `Occupied`, `Reserved`, `Cleaning`

---

### ৪. `src/middlewares/` (মিডলওয়্যার)
* **`middlewares/auth.middleware.js`:**  
  * **`protect`:** রিকোয়েস্টের `Authorization: Bearer <token>` থেকে JWT টোকেন সংগ্রহ করে এবং ভেরিফাই করে। ইউজারের আইডি দিয়ে ডেটাবেজ থেকে ইউজার অবজেক্ট বের করে পাসওয়ার্ড ছাড়া `req.user`-এ সেট করে। টোকেনে `restaurantId` থাকলে তা `req.tenantId`-তে যুক্ত করে। টোকেন ভুল বা অনুপস্থিত থাকলে `ApiError(401)` থ্রো করে।
  * **`authorize(...roles)`:** ইউজারের রোল অনুমোদিত রোলের তালিকায় আছে কি না যাচাই করে। না থাকলে `ApiError(403)` থ্রো করে।
* **`middlewares/tenant.middleware.js`:**  
  * **`requireTenant`:** মাল্টি-টেন্যান্ট ডেটা ফিল্টারিংয়ের জন্য রিকোয়েস্টে `req.tenantId` অ্যাসাইন করে।
* **`middlewares/error.middleware.js`:**  
  * **`errorHandler`:** পুরো অ্যাপ্লিকেশনের সেন্ট্রালাইজড এরর হ্যান্ডলার। যেকোনো আনহ্যান্ডেল্ড এররকে `ApiError` ফরম্যাটে রূপান্তর করে ক্লায়েন্টকে স্ট্যান্ডার্ড JSON এরর রেসপন্স পাঠায় (`statusCode`, `message`, `errors`, ডেভেলপমেন্টে `stack` সহ)।

---

### ৫. `src/utils/` (ইউটিলিটি ক্লাস)
* **`utils/ApiResponse.js`:**  
  সফল API রেসপন্স পাঠানোর জন্য স্ট্যান্ডার্ড ক্লাস। এতে থাকে:  
  `{ statusCode, data, message, success: true }`
* **`utils/ApiError.js`:**  
  স্ট্যান্ডার্ড এরর ক্লাস (JavaScript এর `Error` এক্সটেন্ড করে তৈরি)। এতে থাকে:  
  `{ statusCode, message, errors: [], success: false, stack }`
* **`utils/asyncHandler.js`:**  
  হায়ার-অর্ডার ফাংশন যা যেকোনো async কন্ট্রোলারকে র‍্যাপ করে। ফলে কন্ট্রোলারের ভেতর বারবার বিশৃঙ্খল `try-catch` ব্লক লিখতে হয় না; কোনো এরর হলেই তা স্বয়ংক্রিয়ভাবে `next(error)` হয়ে গ্লোবাল এরর হ্যান্ডলারে চলে যায়।

---

### ৬. `src/models/` (ডেটাবেজ স্কিমা)
* **`User.js`:**  
  ইউজারের নাম, ইমেইল (ইউনিক), পাসওয়ার্ড (হ্যাশড), রোল, `restaurantId` (রেফারেন্স), ফোন এবং অ্যাক্টিভ স্ট্যাটাস।
* **`Restaurant.js`:**  
  রেস্টুরেন্টের নাম, ইউনিক স্লাগ, ওনার ইউজার আইডি, ঠিকানা, ফোন, সেটিংস (কারেন্সি BDT ৳, ভ্যাট রেট, রসিদ হেডার/ফুটার, রসিদ সাইজ ৫৮/৮০ মিমি), প্ল্যান ও ট্রায়াল ডেট।
* **`Category.js`:**  
  খাদ্য ক্যাটাগরির নাম, বাংলা নাম (`nameBn`), বিবরণ এবং `restaurantId`।
* **`MenuItem.js`:**  
  মেনু আইটেমের নাম, বাংলা নাম, ক্যাটাগরি আইডি (Category রেফারেন্স), বিক্রয়মূল্য (`price`), খরচমূল্য (`costPrice`), বিবরণ, ইমেজ URL/base64, স্ট্যাটাস (`Active`/`Inactive`) এবং `restaurantId`।
* **`RestaurantTable.js`:**  
  টেবিল নম্বর, আসন সংখ্যা (`capacity`), স্ট্যাটাস (`Available`, `Occupied`, `Reserved`, `Cleaning`), চলমান অর্ডারের রেফারেন্স (`currentOrder`), QR টোকেন এবং `restaurantId`।
* **`Customer.js`:**  
  কাস্টমারের নাম, ফোন নম্বর, ইমেইল, মোট অর্ডার সংখ্যা (`totalOrders`), সর্বমোট খরচ (`totalSpent`), শেষ ভিজিটের তারিখ (`lastOrderDate`) এবং `restaurantId`।
* **`Order.js`:**  
  ইউনিক `orderNumber`, কাস্টমারের নাম, টেবিল নম্বর, আইটেমস অ্যারে (নাম, দাম, পরিমাণ, ক্যাটাগরি, নোট), সাবটোটাল, ট্যাক্স, ডিসকাউন্ট, সর্বমোট বিল (`total`), পেমেন্ট মেথড (Cash/bKash/Nagad/Card ইত্যাদি), পেমেন্ট স্ট্যাটাস, অর্ডার স্ট্যাটাস এবং `restaurantId`।

---

### ৭. `src/modules/` (ডোমেন মডিউল — কন্ট্রোলার, সার্ভিস ও রুট)

প্রতিটি মডিউল ৩টি স্তরে বিভক্ত:
1. **`*.routes.js`:** এক্সপ্রেস রাউটার যা URL ও HTTP মেথড ডিফাইন করে।
2. **`*.controller.js`:** শুধু রিকোয়েস্ট ডাটা রিসিভ করে এবং সার্ভিসকে কল করে ক্লায়েন্টকে রেসপন্স পাঠায়।
3. **`*.service.js`:** সমস্ত কোর বিজনেস লজিক, ডেটাবেজ কোয়েরি ও ক্যালকুলেশন সম্পন্ন করে।

#### ক. Auth মডিউল (`src/modules/auth/`)
* **`auth.routes.js`:**  
  * `POST /api/auth/register` ➔ নতুন ইউজার ও অপশনাল রেস্টুরেন্ট তৈরি।
  * `POST /api/auth/login` ➔ ইমেইল ও পাসওয়ার্ড যাচাই করে JWT টোকেন প্রদান।
  * `GET /api/auth/me` ➔ প্রোফাইল ফেচ (লগইন করা ইউজার)।
* **`auth.service.js`:**  
  * `register()`: ইউজার ডুপ্লিকেট কি না চেক করে, প্রথম ইউজার হলে Admin রোল দেয়, পাসওয়ার্ড `bcrypt` দিয়ে হ্যাশ করে, এবং ৭ দিনের জন্য সাইন করা JWT টোকেন রিটার্ন করে।
  * `login()`: ইমেইল ও পাসওয়ার্ড ম্যাচ করে JWT টোকেন জেনারেট করে।
  * `getProfile()`: পাসওয়ার্ড বাদ দিয়ে ইউজারের সম্পূর্ণ প্রোফাইল দেয়।

#### খ. Categories মডিউল (`src/modules/categories/`)
* **`category.routes.js`:** `GET /api/categories`, `POST /api/categories`, `DELETE /api/categories/:id`
* **`category.service.js`:**  
  * `getCategories()`: রেস্টুরেন্ট অনুযায়ী ক্যাটাগরি তালিকা নাম অনুযায়ী শর্ট করে আনে।
  * `createCategory()`: নতুন ক্যাটাগরি তৈরি করে (ডুপ্লিকেট নাম থাকলে এরর দেয়)।
  * `deleteCategory()`: আইডি অনুযায়ী ক্যাটাগরি ডিলিট করে।

#### গ. Menu মডিউল (`src/modules/menu/`)
* **`menu.routes.js`:** `GET /api/menu`, `POST /api/menu`, `PUT /api/menu/:id`, `DELETE /api/menu/:id`
* **`menu.service.js`:**  
  * `getMenuItems()`: ক্যাটাগরি ও সার্চ কিউরি অনুযায়ী ফিল্টার করে খাবারের তালিকা আনে।
  * `createMenuItem()`: নতুন খাবার যুক্ত করে (ক্যাটাগরি না থাকলে অটো ক্রিয়েট করে)।
  * `updateMenuItem()`: দাম, নাম বা ছবি পরিবর্তন করে।
  * `deleteMenuItem()`: মেনু থেকে খাবার মুছে ফেলে।

#### ঘ. Tables মডিউল (`src/modules/tables/`)
* **`table.routes.js`:** `GET /api/tables`, `POST /api/tables`, `DELETE /api/tables/:id`, `PATCH /api/tables/:id/status`
* **`table.service.js`:**  
  * `getTables()`: টেবিলগুলোর তালিকা ও বর্তমান রানিং অর্ডার পপুলেট করে আনে।
  * `createTable()`: নতুন টেবিল তৈরি করে।
  * `updateTableStatus()`: স্ট্যাটাস (`Available`, `Occupied`, `Reserved`, `Cleaning`) আপডেট করে।
  * `deleteTable()`: টেবিল মুছে ফেলে।

#### ঙ. Customers মডিউল (`src/modules/customers/`)
* **`customer.routes.js`:** `GET /api/customers`, `POST /api/customers`, `DELETE /api/customers/:id`
* **`customer.service.js`:**  
  * `getCustomers()`: নাম, ফোন বা ইমেইল দিয়ে কাস্টমার সার্চ করে খরচের ভিত্তিতে তালিকা দেয়।
  * `createCustomer()`: নতুন কাস্টমার প্রোফাইল তৈরি করে।
  * `deleteCustomer()`: কাস্টমার মুছে ফেলে।

#### চ. Orders (POS) মডিউল (`src/modules/orders/`)
* **`order.routes.js`:** `GET /api/orders`, `POST /api/orders`, `PATCH /api/orders/:id/status`
* **`order.service.js`:**  
  * `getOrders()`: স্ট্যাটাস বা সার্চ ফিল্টার দিয়ে অর্ডারের তালিকা দেয়।
  * `createOrder()`: নতুন অর্ডার তৈরি করে। **অটো-সিঙ্ক লজিক:** অর্ডার তৈরি হওয়ার সাথে সাথে নির্দিষ্ট টেবিলের স্ট্যাটাস `Occupied` হয়ে যায় এবং কাস্টমারের মোট খরচ ও অর্ডার সংখ্যা বেড়ে যায়।
  * `updateOrderStatus()`: অর্ডার স্ট্যাটাস আপডেট করে। অর্ডার `Completed` বা `Cancelled` হলে সংশ্লিষ্ট টেবিল স্বয়ংক্রিয়ভাবে `Available` হয়ে যায়।

#### ছ. Analytics মডিউল (`src/modules/analytics/`)
* **`analytics.routes.js`:** `GET /api/analytics/overview`
* **`analytics.service.js`:**  
  * `getOverviewAnalytics()`: MongoDB Aggregation পাইপলাইনের মাধ্যমে বিগত ৭ দিনের সেলস ও অর্ডার ভলিউম গ্রাফ ডাটা, মোট সেলস, মোট অর্ডার সংখ্যা, কাস্টমার সংখ্যা, AOV (অ্যাভারেজ অর্ডার ভ্যালু) এবং সাম্প্রতিক অর্ডারের তথ্য একত্রিত করে।

---

### ৮. `src/routes/index.js` (সেন্ট্রাল রাউটার)
সমস্ত মডিউলের রাউটারগুলোকে সেন্ট্রালাইজ করে `/api` প্রিফিক্সে মাউন্ট করে:
* `/api/auth` ➔ `authRoutes`
* `/api/categories` ➔ `categoryRoutes`
* `/api/menu` ➔ `menuRoutes`
* `/api/tables` ➔ `tableRoutes`
* `/api/customers` ➔ `customerRoutes`
* `/api/orders` ➔ `orderRoutes`
* `/api/analytics` ➔ `analyticsRoutes`

---

## 👥 টিম মেম্বারদের জন্য কাজের বিভাজন নির্দেশিকা

| টিম মেম্বার | নির্ধারিত ফোল্ডার | কী কী কাজ করবেন |
| :--- | :--- | :--- |
| **Developer 1 (Auth & Security)** | `src/modules/auth/`, `src/middlewares/` | সাইন-আপ, লগইন, অনবোর্ডিং, পারমিশন ও টোকেন ভ্যালিডেশন। |
| **Developer 2 (POS & Tables)** | `src/modules/orders/`, `src/modules/tables/` | অর্ডার তৈরি, টেবিল অকুপেন্সি সিঙ্ক, বিল ও পেমেন্ট আপডেট। |
| **Developer 3 (Menu & Catalog)** | `src/modules/menu/`, `src/modules/categories/` | খাবারের দাম, ছবি, ক্যাটাগরি ফিল্টারিং ও স্টক স্ট্যাটাস। |
| **Developer 4 (Analytics & Customers)**| `src/modules/customers/`, `src/modules/analytics/`| সেলস গ্রাফ, KPI ক্যালকুলেশন ও কাস্টমার ডিরেক্টরি। |

এই আর্কিটেকচারের ফলে প্রত্যেকে যার যার নির্ধারিত মডিউলে কাজ করতে পারবেন এবং Git-এ কোনো ফাইল কনফ্লিক্ট তৈরি হবে না।
