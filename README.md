# 🗂️ TaskManager — Full Stack Productivity App

<div align="center">

### 🚀 [**Live Demo → task-manager-mauve-xi.vercel.app**](https://task-manager-mauve-xi.vercel.app)

</div>

---

A modern, full-stack Task Manager built with the **MERN stack** — featuring a professional UI, real-time analytics, dark mode, and downloadable reports.

## ✨ Features

- 🔐 **Secure Auth** — JWT-based login & registration
- ✅ **Task CRUD** — Create, update, delete, and filter tasks
- 📊 **Analytics Dashboard** — Visual charts (bar + donut) via Recharts
- 📥 **Download Reports** — Export analytics as CSV or formatted text
- 🌙 **Dark Mode** — Full dark/light theme toggle
- 📱 **Responsive** — Works on mobile and desktop
- ⚡ **Real-time Filtering** — Filter by status, priority, and search by title

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + Bcryptjs |
| Charts | Recharts |
| Deployment | Vercel (frontend) + Render (backend) |

## ⚙️ Local Setup

### Backend
```bash
cd backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, PORT=5001
npm start
```

### Frontend
```bash
cd frontend
npm install
# Create .env.local with VITE_API_URL=http://localhost:5001/api
npm run dev
```

## 📡 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login & get JWT |
| GET | `/api/tasks` | ✅ | List tasks (filter/paginate) |
| POST | `/api/tasks` | ✅ | Create task |
| PUT | `/api/tasks/:id` | ✅ | Update task |
| DELETE | `/api/tasks/:id` | ✅ | Delete task |
| GET | `/api/tasks/analytics` | ✅ | Get stats |

## 🎨 Design Highlights

- Indigo-based design system with consistent light/dark surfaces
- Glassmorphism cards with hover micro-animations
- Inter font, rounded-3xl cards, and gradient banners
- Professional analytics export (CSV + formatted .txt)
