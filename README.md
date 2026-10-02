# 🍽️ RestoManage - Full-Stack Restaurant Management & POS Analytics System

[![Live Frontend](https://img.shields.io/badge/Live_Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://restaurant-manage-front.vercel.app)
[![Live Backend API](https://img.shields.io/badge/Live_API-Vercel_Serverless-black?style=for-the-badge&logo=express)](https://restaurant-manage-43zz.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js & Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=node.js)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Database-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 1. Project Overview

**RestoManage** is a modern, high-performance, full-stack Restaurant Management and Point of Sale (POS) system. Designed with a sleek, high-contrast aesthetic and intuitive interface, it streamlines restaurant operations from table management and digital menu ordering to customer loyalty tracking and real-time executive sales analytics.

The application is deployed on **Vercel** with a decoupled serverless architecture, featuring an Express backend operating via `@vercel/node` and a Next.js 16 App Router frontend equipped with interactive **Recharts** analytics and responsive navigation across all mobile, tablet, and desktop devices.

* **Live Frontend:** [https://restaurant-manage-front.vercel.app](https://restaurant-manage-front.vercel.app)
* **Live Backend API:** [https://restaurant-manage-43zz.vercel.app](https://restaurant-manage-43zz.vercel.app)

---

## 🚀 2. Features

* **Real-Time POS (Point of Sale):**
  * Instant ticket creation with food category filters and modal search.
  * Live subtotal, tax calculation (5%), and total bill tally.
  * Real-time order status toggling between `Preparing` and `Completed`.
* **Dynamic Sales Analytics (Recharts):**
  * Interactive 7-day revenue performance with **Area Wave** (Emerald gradient `#10B981`) and **Bar Pillars** visualization.
  * Key Performance Indicators (KPIs): Total Revenue, Total Orders, Active Tables, and Average Order Value (AOV).
  * Dynamic calculation of daily average revenue with interactive dashed reference guides and glassmorphic floating tooltips.
* **Menu & Category Management:**
  * Categorized menu browsing (Burgers, Pizzas, Drinks, Desserts, and custom categories).
  * Modal creation for new menu items with image upload (base64) or direct image URL support.
  * Active dish status badges and single-click item removal.
* **Table Occupancy Tracker:**
  * Real-time table status cycling (`Available` ➔ `Occupied` ➔ `Reserved` ➔ `Cleaning`).
  * Dynamic visual color-coded badges and guest capacity indicators.
  * Table creation and status management.
* **Customer Directory & Loyalty:**
  * Customer directory tracking total orders, cumulative spending, and last visit date.
  * Real-time search across customer names, phone numbers, and emails.
* **Role-Based Access Control (RBAC):**
  * Multi-role user permissions: **Admin**, **Manager**, and **Staff**.
  * Dynamic sidebar navigation filtering routes based on authenticated role.
* **Fully Responsive UI / UX:**
  * Mobile slide-over drawer with backdrop blur and hamburger toggle.
  * Adaptive multi-column grid layouts and horizontal scrolling tables for small screen devices.

---

## 💻 3. Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router), React 19, JavaScript |
| **Styling & Icons** | Tailwind CSS v4, React Icons (`react-icons/fi`) |
| **Data Visualization** | Recharts (ResponsiveContainer, AreaChart, BarChart) |
| **Backend Framework** | Node.js, Express.js |
| **Database & ODM** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js password hashing |
| **Serverless & Hosting** | Vercel (`@vercel/node`, Next.js Edge Rewrites) |

---

## ⚙️ 4. Installation & Local Setup

Follow these steps to run both backend and frontend on your local development machine:

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (or yarn/pnpm)
* **MongoDB Atlas** account (or local MongoDB server)
* **Git**

### Step 1: Clone Repository
```bash
git clone https://github.com/Kaowsar-Azad/Restaurant-Manage.git
cd Restaurant-Manage
```

### Step 2: Setup Backend
```bash
cd restaurant-manage-backend
npm install
```
Create a `.env` file inside `restaurant-manage-backend/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run seed script to populate realistic 7-day orders, menu items, tables, and customers:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### Step 3: Setup Frontend
Open a new terminal window:
```bash
cd restaurant-manage-frontend
npm install
```

Create a `.env.local` file inside `restaurant-manage-frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
# Next.js will run on http://localhost:3000
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔐 5. Environment Variables

### Backend (`restaurant-manage-backend/.env`)
| Variable | Description | Example / Required |
| :--- | :--- | :--- |
| `PORT` | Local Express listening port | `5000` |
| `MONGODB_URI` | MongoDB Atlas cluster connection URI | `mongodb+srv://<user>:<password>@cluster0...` |
| `JWT_SECRET` | Secret key used for signing authentication tokens | `myrestaurant_secret_key_148` |

### Frontend (`restaurant-manage-frontend/.env.local` or Vercel Settings)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL of the backend API server | `http://localhost:5000` (Local) / `https://restaurant-manage-43zz.vercel.app` (Production) |

---

## 🗄️ 6. Database Structure

The application data is modeled using Mongoose across 6 primary collections:

```
┌──────────────┐       ┌───────────────┐       ┌─────────────────┐
│     User     │       │   Category    │       │    MenuItem     │
├──────────────┤       ├───────────────┤       ├─────────────────┤
│ _id          │       │ _id           │       │ _id             │
│ name         │       │ name          │◄──────│ category (ref)  │
│ email        │       │ description   │       │ name            │
│ password     │       │ createdAt     │       │ price           │
│ role (enum)  │       └───────────────┘       │ image           │
│ createdAt    │                               │ description     │
└──────────────┘                               │ status (enum)   │
                                               └────────┬────────┘
┌──────────────────┐       ┌──────────────┐             │
│ RestaurantTable  │       │   Customer   │             │
├──────────────────┤       ├──────────────┤             ▼
│ _id              │       │ _id          │     ┌───────────────┐
│ tableNumber      │       │ name         │     │     Order     │
│ capacity         │       │ phone        │     ├───────────────┤
│ status (enum)    │       │ email        │     │ orderNumber   │
│ createdAt        │       │ totalOrders  │     │ customerName  │
└──────────────────┘       │ totalSpent   │     │ tableNumber   │
                           │ lastOrderDate│     │ items [ref]   │
                           └──────────────┘     │ subtotal      │
                                                │ tax           │
                                                │ total         │
                                                │ paymentStatus │
                                                │ orderStatus   │
                                                │ createdAt     │
                                                └───────────────┘
```

### Schema Definitions:
1. **User Schema:** `name` (String), `email` (String, unique), `password` (String, hashed), `role` (Enum: `['Admin', 'Manager', 'Staff']`).
2. **Category Schema:** `name` (String, unique), `description` (String).
3. **MenuItem Schema:** `name` (String), `category` (ObjectId ref Category), `price` (Number), `image` (String), `description` (String), `status` (Enum: `['Active', 'Inactive']`).
4. **RestaurantTable Schema:** `tableNumber` (String, unique), `capacity` (Number), `status` (Enum: `['Available', 'Occupied', 'Reserved', 'Cleaning']`).
5. **Customer Schema:** `name` (String), `phone` (String), `email` (String), `totalOrders` (Number), `totalSpent` (Number), `lastOrderDate` (Date).
6. **Order Schema:** `orderNumber` (String), `customerName` (String), `tableNumber` (String), `items` (Array of items with MenuItem ref, price, qty), `subtotal` (Number), `tax` (Number), `total` (Number), `paymentStatus` (Enum: `['Paid', 'Unpaid']`), `orderStatus` (Enum: `['Preparing', 'Completed']`), `createdAt` (Date).

---

## 📡 7. API Documentation

Base API URL: `https://restaurant-manage-43zz.vercel.app/api` (or `/api` via Next.js proxy)

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new staff or manager | No |
| `POST` | `/api/auth/login` | Authenticate credentials and receive JWT | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes (Bearer Token) |

### Orders & Analytics Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | Retrieve list of all orders | No |
| `POST` | `/api/orders` | Create a new order ticket | No |
| `PATCH` | `/api/orders/:id/status` | Update order status (`Preparing` / `Completed`) | No |
| `GET` | `/api/analytics/overview` | Fetch 7-day sales, KPI aggregates, and peak days | No |

### Menu & Category Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/menu` | List all menu dishes with category population | No |
| `POST` | `/api/menu` | Create a new menu dish item | No |
| `DELETE` | `/api/menu/:id` | Delete a menu item by ID | No |
| `GET` | `/api/categories` | Retrieve all food categories | No |
| `POST` | `/api/categories` | Create a new food category | No |

### Tables & Customers Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tables` | Fetch all table occupancy statuses | No |
| `POST` | `/api/tables` | Create a new restaurant table | No |
| `PATCH` | `/api/tables/:id/status` | Cycle table status (`Available`, `Occupied`, etc.) | No |
| `DELETE` | `/api/tables/:id` | Remove table by ID | No |
| `GET` | `/api/customers` | Retrieve customer directory and loyalty data | No |
| `POST` | `/api/customers` | Register a new customer profile | No |
| `DELETE` | `/api/customers/:id` | Delete a customer record | No |

---

## 🔑 8. Demo Credentials

The evaluator can test each role's permissions directly using the following pre-configured credentials:

| Role | Email Address | Password | Accessible Routes / Permissions |
| :--- | :--- | :--- | :--- |
| 🛡️ **Super Admin** | `admin@gmail.com` | `123456` | **Full Access** (Overview, POS, Menu, Tables, Customers) |
| 🛡️ **Personal Admin** | `kaowsar@gmail.com` | `123456` | **Full Access** (Overview, POS, Menu, Tables, Customers) |
| 👔 **Manager** | `manager@gmail.com` | `123456` | Overview, POS Orders, Menu, Tables, Customers |
| 🧑‍🍳 **Service Staff** | `staff@gmail.com` | `123456` | POS Orders, Menu & Dishes, Tables |

> **Note:** Upon signing in with any of the accounts above, the sidebar will dynamically adapt according to the role permissions stored in the JWT authentication payload.

---

## 👨‍💻 Author

* **Developer:** Kaowsar Azad
* **GitHub:** [@Kaowsar-Azad](https://github.com/Kaowsar-Azad)
* **Repository:** [https://github.com/Kaowsar-Azad/Restaurant-Manage](https://github.com/Kaowsar-Azad/Restaurant-Manage)
