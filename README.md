# 💎 Finance Tracker Dashboard

A production-grade, portfolio-quality **Finance Management Application** built with React, TypeScript, TanStack Query, Zustand, Tailwind CSS, Express.js, and MongoDB.

Designed with a modern fintech aesthetic, interactive Recharts visualizations, strict type safety, layered backend architecture, and a fully responsive sidebar layout for mobile, tablet, and desktop devices.

---

## 🏗 System Architecture Overview

```
                          ┌────────────────────────┐
                          │   React 19 + Vite UI   │
                          └───────────┬────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │  Zustand + React Query  │
                         └────────────┬────────────┘
                                      │ (Axios + Interceptors)
                                      ▼
                        ┌───────────────────────────┐
                        │   Express 5 REST Server   │
                        │ (Zod, Helmet, Rate Limit) │
                        └─────────────┬─────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │   MongoDB Aggregation   │
                         └─────────────────────────┘
```

---

## 📁 Scalable Directory Structure

### Frontend (`/client`)
```
client/src/
├── app/                  # App entry setup, providers, QueryClient, router
├── components/
│   ├── ui/               # Reusable primitives (Button, Card, Input, Modal, Badge, Skeleton)
│   ├── layout/           # Responsive AppLayout, Sidebar, Topbar, MobileNav
│   └── charts/           # Interactive Recharts (AreaChart, DonutChart, BarChart, Sparkline)
├── features/             # Feature-based module architecture
│   ├── auth/             # Authentication API, hooks, components & types
│   ├── dashboard/        # Dashboard metrics API, hooks, components & types
│   ├── transactions/     # Paginated transactions API, hooks & modal form
│   ├── income/           # Income management API, hooks & Excel export
│   └── expenses/         # Expense management API, hooks & Excel export
├── hooks/                # Shared cross-feature hooks (useMediaQuery, useDebounce)
├── lib/                  # Centralized Axios client, Query key factory, formatters
├── store/                # Zustand stores (uiStore for theme & sidebar, authStore)
├── types/                # Strict TypeScript interface definitions
└── pages/                # Top-level route pages (Dashboard, Income, Expenses, Transactions, Settings)
```

### Backend (`/backend`)
```
backend/src/
├── config/               # Zod validated env vars & Mongoose database connection
├── controllers/          # Thin HTTP request controllers
├── services/             # Core business logic & MongoDB Aggregation Pipelines
├── models/               # Mongoose data schemas (User, Income, Expense)
├── middlewares/          # Auth guard, Zod request validator, Error handler, Rate limiters
├── validators/           # Zod validation schemas
├── routes/               # API route definitions (/auth, /income, /expense, /transactions, /dashboard)
└── utils/                # ApiError, ApiResponse, asyncHandler helpers
```

---

## ✨ Features

- 📊 **Interactive Analytics**: Income vs Expense trends over time (7d / 30d / 60d / 12m toggles), Expense category percentage breakdowns, and monthly bar charts.
- 📱 **Adaptive Responsive Sidebar**: Collapsible desktop sidebar, icon mode on tablet, and off-canvas drawer overlay on mobile.
- 🌓 **Light & Dark Theme Toggle**: Persistent theme mode switcher powered by Zustand and Tailwind CSS tokens.
- 🔐 **Layered Security**: JWT auth with cookie/bearer support, Zod request payload validation, Helmet headers, and Express rate limiters.
- ⚡ **Optimized Aggregation Pipelines**: Dedicated MongoDB aggregation pipelines returning cash flow summaries, trends, and breakdowns in a single optimized payload.
- 📥 **Excel Export**: Export income and expense logs to Excel spreadsheets.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB server or MongoDB Atlas URI

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 📸 Screenshots Placeholders

| Dashboard Overview | Interactive Analytics | Mobile Off-Canvas |
|---|---|---|
| ![Dashboard](https://placehold.co/600x400/18181b/ffffff?text=Dashboard+Overview) | ![Analytics](https://placehold.co/600x400/18181b/ffffff?text=Recharts+Analytics) | ![Mobile](https://placehold.co/300x500/18181b/ffffff?text=Mobile+Drawer) |

---

## 🧪 Build Verification

To compile both frontend and backend without errors:

```bash
# Verify Frontend Build
cd client && npm run build && npm run lint

# Verify Backend Build
cd backend && npm run build
```
