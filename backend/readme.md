# 💰 FinanceTracer – Personal Finance Management Backend (MERN)

FinanceTracer is a **Node.js + Express + MongoDB** backend that helps users **track their income, expenses, and view financial summaries** through a simple, secure API.  
It includes authentication, CRUD operations, and dashboard analytics routes.

---

## 🚀 Features

### 🔐 Authentication (`/api/v1/auth`)
- **Register a new user**
- **Login with JWT authentication**
- **Secure routes using access tokens**
- **Logout and refresh token support**

---

### 💸 Income Management (`/api/v1/income`)
- ➕ Add new income source (with `icon`, `source`, `amount`, and `date`)
- 📜 Fetch all income entries (sorted by date)
- ✏️ Update or delete existing income
- 📤 Export income data to Excel

---

### 💰 Expense Management (`/api/v1/expense`)
- ➕ Add new expense (with `icon`, `category`, and `amount`)
- 📜 Fetch all expenses (sorted by date)
- ✏️ Update or delete existing expense
- 📤 Export expense data to Excel

---

### 📊 Dashboard Analytics (`/api/v1/dashboard`)
- 📅 Get total **income and expenses over the last 60 days**
- 📈 Calculate **balance trends**
- 🔢 View categorized expense/income summary
- 🧾 Aggregated data for charts and insights

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Utility | Multer, Cookie-parser, dotenv, xlsx |
| TypeScript | For type safety and maintainability |

---



