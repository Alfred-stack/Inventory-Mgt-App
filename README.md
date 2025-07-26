# InventoryPro - Full Stack Inventory Management System

A comprehensive inventory management application built with the MERN stack, featuring real-time updates, analytics, and a modern responsive UI.

## Features

### Completed (Frontend)
- **Modern Dashboard**: Real-time analytics and insights
- **Product Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Advanced Filtering**: Search by name, SKU, category, and stock status
- **Stock Monitoring**: Automatic low stock and out-of-stock alerts
- **Data Visualization**: Interactive charts and analytics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Export Functionality**: CSV export for product data
- **Real-time Updates**: Simulated real-time stock updates
- **Form Validation**: Comprehensive input validation and error handling

### Completed (Backend)
- **Express.js REST API**: CRUD endpoints for products
- **MongoDB/Mongoose**: Database and schema validation
- **Authentication**: JWT-based login/register, admin seeding
- **Authorization**: Role-based access (admin/user)
- **Socket.IO**: Real-time product updates
- **Validation & Security**: Middleware for validation, error handling, and security
- **Testing Ready**: Jest and Supertest setup
- **Environment Config**: .env for secrets and DB

### 🔄 Ready for Full Stack Integration
- **API Service Layer**: Connects frontend to backend
- **TypeScript Interfaces**: Complete type definitions for all data models
- **Error Handling**: Comprehensive error handling throughout the application

## 🛠 Tech Stack

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **React Router**
- **React Hook Form**
- **Recharts**
- **Lucide React**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Socket.IO**
- **JWT**
- **bcrypt**

## Project Structure

```
Updated PLP Final Project/
├── client/                  # Frontend source
├── server/               # Backend source
│   ├── src/              # Backend code
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
├── package.json          # Frontend dependencies and scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager
- MongoDB running locally or Atlas

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alfred-stack/wares-hub.git
   cd wares-hub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   - Copy `server/.env.example` to `server/.env`
   - Set your `JWT_SECRET` and MongoDB URI if needed

4. **Seed the admin user**
   ```bash
   pnpm exec node server/src/seedAdmin.js
   ```

5. **Start both frontend and backend**
   ```bash
   pnpm run dev
   ```
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000/api

6. **Test with Postman**
   - Real-time: Connect to Socket.IO at ws://localhost:5000

## ✅ Confirmation
- Both frontend and backend run together with `pnpm run dev`
- MongoDB must be running locally or use Atlas
- Admin user is seeded for immediate login
- All endpoints and real-time features are ready for production and testing



