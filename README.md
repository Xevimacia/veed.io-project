# VEED Video Library Dashboard

A full-stack application to browse, sort, and manage your video library. Built with React, Vite, TypeScript, Tailwind CSS, daisyUI, and (upcoming) Node.js + Express backend.

---

## 🚀 Introduction
This project is a take-home engineering challenge for VEED. It demonstrates a modern, modular, and well-typed approach to building a video library dashboard with a focus on code quality, UX, and maintainability.

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd veed.io-project
```

### 2. Install dependencies (Frontend)
```bash
cd frontend
nvm use v20 # or install Node.js v20 LTS
npm install
```

### 3. Run the frontend app
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure
```
veed.io-project/
  frontend/      # React + Vite + TS + Tailwind + daisyUI (UI)
    src/
      pages/     # Route components (VideoListPage, NewVideoPage)
      ...
    public/      # Static assets (favicon, etc.)
    ...
  backend/       # (To be implemented) Node.js + Express + SQLite
  videos.json    # Seed data for backend
  task.md        # Task tracking and changelog
  planning.md    # Architecture and planning notes
  context.md     # Challenge context and requirements
```

---

## 📦 Packages Used
- **React**: UI library
- **Vite**: Fast dev/build tool
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **daisyUI**: Pre-styled Tailwind components
- **React Router**: Routing (`/`, `/new`)

---

## ✨ Features Implemented
- Frontend scaffolded with Vite + React + TS
- Tailwind CSS and daisyUI configured (v3.4.3)
- React Router with `/` and `/new` routes
- Favicon and meta tags set up
- Modular page structure

---

## 📝 Next Steps
- Backend API (Node.js + Express + SQLite)
- Video grid and form implementation
- API integration
- Testing (Vitest, React Testing Library)
- Further UI/UX improvements

---

## 📚 Documentation & References
- See `context.md` for challenge requirements
