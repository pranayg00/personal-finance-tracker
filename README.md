# 💰 Personal Finance Tracker

A full stack personal finance dashboard built with React, Node.js, and PostgreSQL. Track income and expenses, visualize spending patterns, and manage budgets by category.

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)

## 🌐 Live Demo

**[View Live App](https://personal-finance-tracker-seven-amber.vercel.app/)** | **[API Health Check](https://personal-finance-tracker-production-55ed.up.railway.app/api/health)**

## ✨ Features

- 🔐 JWT-based authentication (register & login)
- 📊 Dashboard with income, expense & balance summary
- 📈 Monthly spending bar chart & category pie chart
- 💳 Add, filter, and delete transactions
- 🎯 Budget tracker with progress bars per category
- 🛡️ Protected routes for authenticated users

## 🛠 Tech Stack

**Frontend:**
- React 18, React Router v6
- Recharts for data visualization
- Context API for state management
- Axios for API calls

**Backend:**
- Node.js + Express
- PostgreSQL with raw SQL queries
- JWT authentication with bcrypt
- RESTful API design

## 📁 Project Structure
```
personal-finance-tracker/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/        # Auth context
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       └── utils/          # API service layer
├── server/                 # Node.js backend
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth middleware
│       ├── models/         # Database schema
│       ├── routes/         # API routes
│       └── config/         # DB connection
└── docs/                   # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Installation

1. Clone the repository
```bash
git clone https://github.com/pranayg00/personal-finance-tracker
cd personal-finance-tracker
```

2. Setup backend
```bash
cd server
npm install
cp .env.example .env
# Fill in your database credentials in .env
npm run dev
```

3. Setup frontend
```bash
cd client
npm install
npm start
```

4. Setup database
```bash
# Run the schema file in your PostgreSQL client
psql -U postgres -d finance_tracker -f server/src/models/schema.sql
```

## 🔑 Environment Variables
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_tracker
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/transactions | Get all transactions |
| POST | /api/transactions | Create transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |
| GET | /api/transactions/summary | Get monthly summary |
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create category |

## 📌 Roadmap

- [ ] Export transactions to CSV
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Mobile responsive improvements
- [ ] Deploy to Railway + Vercel

## 📄 License

MIT License — feel free to use this project as a reference.
