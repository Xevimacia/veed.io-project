> 🛡️ This repository was made public temporarily for evaluation purposes.  
> It contains no sensitive data, and will be made private again after the review period.

# VEED Video Library Dashboard

A full-stack application to browse, sort, and manage your video library. Built with React, Vite, TypeScript, Tailwind CSS, daisyUI, and Node.js + Express backend.

---

## 🚀 Introduction

This project is a take-home engineering challenge for VEED. It demonstrates a modern, modular, and well-typed approach to building a video library dashboard with a focus on code quality, UX, and maintainability.

---

## 🏗️ Project Goal & Scope

Build a fast, compact, and visually polished full-stack application that allows users to browse, sort, and create entries in a video library. The application demonstrates sound architecture, UX/UI excellence, proper validation, and clean code.

---

## 📦 Tech Stack

**Frontend:**
- React + Vite + TypeScript
- Tailwind CSS
- daisyUI
- React Router
- React Testing Library + Vitest

**Backend:**
- Node.js + Express (TypeScript)
- SQLite (better-sqlite3)
- zod (validation)
- CORS, body-parser
- Vitest + Supertest

---

## 🛠️ Setup Instructions

### 1. Clone the repository

You can use either HTTPS or SSH:

**HTTPS:**
```bash
git clone https://github.com/Xevimacia/veed.io-project.git
cd veed.io-project
```

### 2. Install dependencies (for all workspaces)
```bash
# Install root, frontend, and backend dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

---

## 🚦 Running the App: Two Options

### Option 1: Run Both Frontend & Backend Together (Recommended)

From the project root, run:

```sh
npm run dev
```

- This will start both the backend (http://localhost:4000) and frontend (http://localhost:5173) in development mode using `concurrently`.
- You will see output from both servers in your terminal.

### Option 2: Run Frontend and Backend Separately

**Start the backend:**
```sh
cd backend
npm install # if not already done
npm run dev
```
The API will be available at [http://localhost:4000](http://localhost:4000)

**Start the frontend:**
```sh
cd frontend
npm install # if not already done
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173)

- On first run, the backend will automatically create a SQLite database in `backend/data/videos.db` and seed it with data from `backend/videos.json` if the table is empty.
- No manual migration or seeding steps are required.

---

## 📁 Directory Structure

```
veed.io-project/
  frontend/      # React + Vite + TS + Tailwind + daisyUI (UI)
    src/
      pages/     # Route components (VideoListPage, NewVideoPage)
      components/
      hooks/
      ...
    public/      # Static assets (favicon, etc.)
    ...
  backend/       # Node.js + Express + SQLite (API)
    data/        # SQLite database file (videos.db)
    src/
      db/        # DB connection and seeding logic
      routes/    # API route handlers
      models/    # Video type/interface
      utils/
      ...
    videos.json  # Seed data for backend
    tests/       # Vitest + Supertest API tests
  task.md        # Task tracking and changelog
  planning.md    # Architecture and planning notes
  context.md     # Challenge context and requirements
```

---

## ✨ Features Delivered

- Responsive video grid with thumbnail, title, date, and tags
- Sort videos by creation date (newest/oldest)
- Create new video form (title required, tags optional)
- Auto-generated ID, thumbnail, created_at, duration, and views
- Loading indicators for data fetch and form submission
- Toast notifications for success and error
- Global error boundary for graceful fallback UI
- Polished empty state for video list
- Accessibility: focus states, ARIA roles
- Robust backend API with validation and error handling
- Modular, typed codebase with clear separation of concerns

---

## 🛡️ API Documentation

### `GET /api/videos`
- **Description:** Returns a list of all videos from the SQLite database
- **Query Parameters:** `sort=asc|desc` (optional, default: newest first)
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "v-001",
      "title": "Sample Video",
      "thumbnail_url": "...",
      "created_at": "2024-06-01T12:00:00Z",
      "duration": 0,
      "views": 0,
      "tags": ["tag1", "tag2"]
    },
    ...
  ]
  ```
- **Errors:**  
  - `400 Bad Request` (invalid sort param)
  - `500 Internal Server Error` (unexpected error)

### `POST /api/videos`
- **Description:** Create a new video entry
- **Payload:**
  ```json
  {
    "title": "My New Video",
    "tags": ["tag1", "tag2"] // optional
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "id": "v-052",
    "title": "My New Video",
    "thumbnail_url": "...",
    "created_at": "2024-07-01T12:00:00Z",
    "duration": 0,
    "views": 0,
    "tags": ["tag1", "tag2"]
  }
  ```
- **Errors:**  
  - `400 Bad Request` (missing title, invalid input)
    ```json
    { "error": "Title is required" }
    ```
  - `500 Internal Server Error` (unexpected error)

---

## 🧪 Testing

### Backend
- Uses **Vitest** and **Supertest** for API tests.
- Tests cover:
  - GET /api/videos (normal, sort, error cases)
  - POST /api/videos (normal, edge, failure cases)
- Tests use an in-memory SQLite DB seeded from videos.json for isolation.

**To run backend tests:**
```sh
cd backend
npm install
npm run test
```

### Frontend
- (Future tests) Use **React Testing Library** + **Vitest** for UI tests.
- Suggested tests:
  - VideoCard renders with correct props
  - Loading state on video list fetch
  - Form validation and error display

---

## ♿ Accessibility & UX

- All interactive elements have focus states and ARIA roles where appropriate.
- Layout is fully responsive and visually polished.
- Loading, error, and empty states are handled gracefully.
- Toasts and error boundaries provide clear user feedback.

---

## 📝 Architecture & Decisions

- **Monorepo**: `/frontend` and `/backend` for clear separation.
- **TypeScript everywhere**: Ensures type safety and maintainability.
- **Single source of truth for Video type**: Consistent interface across backend and frontend.
- **Test isolation**: Backend tests use in-memory DB, never pollute production data.
- **No global state libraries**: Simple custom hooks for data fetching (scalable for small projects).
- **Tailwind + daisyUI**: For rapid, consistent, and accessible UI development.

---

## 🚧 Future Improvements

- Add tag filter dropdown (filter videos by tag)
- Paginate video list (e.g., 12 per page)
- Persist sort preference in localStorage
- Add light/dark theme toggle
- More frontend tests (VideoCard, loading, error, empty states)
- Advanced responsive tweaks for edge cases
- Per-component error boundaries
- Premium tags & gated access (show "Premium" badge, simulate entitlement, CTA for upgrade)
- Highlight high-value videos ("Trending" badge for high views, guide users to top content)
- Add global state management (Redux Toolkit) if app complexity grows—enables scalable, predictable state across features

---