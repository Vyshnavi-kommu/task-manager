# TaskManager - Full Stack Task Manager Web App

A modern, responsive, and feature-rich Task Manager application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

-   **Secure Authentication**: JWT-based login and registration.
-   **Task CRUD**: Create, read, update, and delete tasks with ease.
-   **Advanced Filtering**: Filter by status and priority, and search by title.
-   **Optimized Queries**: MongoDB indexing for better performance.
-   **Analytics Dashboard**: Visual insights into productivity using Recharts.
-   **Dark Mode**: Sleek dark interface with persistence.
-   **Responsive Design**: Fully functional on mobile and desktop.
-   **Global Error Handling**: Robust backend error management.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts, React Hot Toast.
-   **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcryptjs.

## ⚙️ Setup Instructions

### Prerequisites

-   Node.js (v16+)
-   MongoDB (Running locally or an Atlas URI)

### Backend Setup

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables in `.env`:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 📡 API Endpoints

| Method | Path | Auth | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/tasks` | Yes | Get tasks (filtered/paginated) |
| POST | `/api/tasks` | Yes | Create a new task |
| GET | `/api/tasks/:id` | Yes | Get a single task |
| PUT | `/api/tasks/:id` | Yes | Update a task |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |
| GET | `/api/tasks/analytics` | Yes | Get task statistics |

## 🧠 Design Decisions

-   **JWT Auth Strategy**: Stateless authentication using secure tokens stored in `localStorage` and attached via Axios interceptors.
-   **Per-User Scoping**: Every task record is linked to a `User` ObjectId, ensuring data privacy and security.
-   **MongoDB Indexing**: Indexes on `{ user, status }` and `{ user, priority }` optimize common query patterns.
-   **Aggregation Pipeline**: Used MongoDB's `$facet` and `$group` for efficient single-query analytics calculation.
-   **Glassmorphism & Modern UI**: Used Tailwind CSS's backdrop-blur and vibrant gradients for a premium "WOW" factor.
