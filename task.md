# ✅ task.md — VEED Video Library Dashboard (4h Take-Home Project)

---

## 🚀 Phase 1 — Project Setup

### 📁 Monorepo & Scaffolding
- [x] Create root folder with `/frontend` and `/backend`
- [x] Initialize Git, set up `.gitignore`, add `README.md`
- [x] Copy `videos.json` into `/backend/data` or `/public`

### ⚛️ Frontend Setup
- [x] Create Vite + React + TS project in `/frontend`
- [x] Install and configure Tailwind CSS (v3.4.3 due to CLI issues with v4)
- [x] Add daisyUI plugin to Tailwind
- [x] Set up React Router with two routes: `/` and `/new`
- [x] Add favicon and basic HTML metadata

### 🔧 Backend Setup
- [x] Create Node.js + TypeScript backend in `/backend`
- [x] Install Express, CORS, `better-sqlite3`, body-parser
- [x] Initialize TS config, nodemon/ts-node-dev for dev run
- [x] Seed `videos.json` into SQLite on server start

---

## 📺 Phase 2 — Video Grid Page (List View)

### 🧠 Logic & State
- [x] Fetch videos from `GET /api/videos` (backend implemented and tested, ready for frontend fetch)
- [x] Implement local sort toggle (ASC/DESC) by `created_at` (backend supports, ready for frontend UI)
- [x] Parse and format video metadata (date, tags) (backend returns all data, ready for frontend formatting)

### 💅 UI & UX
- [x] Display videos in responsive Tailwind grid
- [x] Use daisyUI `card` for each video
- [x] Show thumbnail, title, date, tags (badges)
- [x] Add hover state: zoom or shadow on card
- [x] Add sort control: dropdown or toggle with sort icon
- [x] Show loading state during fetch (spinner or skeleton)
- [x] Show empty state message if no videos

### 🔗 Navigation
- [x] Add "Create New Video" button/link to `/new`

---

## ✍️ Phase 3 — Create New Video Page (Form View)

### 🔤 Form Input
- [x] Input: `title` (required)
- [x] Input: `tags` (comma-separated or chip UI)
- [x] Add client-side validation (required field)

### 📤 Submission Logic
- [x] POST to `/api/videos`
- [x] Generate fallback values on backend (`id`, `views`, etc.)
- [x] Show loading state on submit
- [x] Show success confirmation (toast or redirect)
- [x] Show error if submission fails

### 🎨 UI/UX
- [x] Use daisyUI form controls (input, textarea, buttons)
- [x] Style as a card or centered panel
- [x] Include Cancel button (go back to list)

## 🧪 Phase 4 — Backend API Implementation

### 🗂 `GET /api/videos`
- [x] Return list from SQLite
- [x] Support optional `?sort=asc|desc`
- [x] Return proper 200 or 500 with message

### ✍️ `POST /api/videos`
- [x] Validate required fields (`title`)
- [x] Generate:
  - `id`: auto-incremental (`v-051`, etc.)
  - `created_at`: now
  - `thumbnail_url`: fallback to `picsum.photos`
  - `duration` & `views`: 0
- [x] Insert into SQLite
- [x] Return 201 or 400 with error message

### 🔐 Error Handling
- [x] Add try/catch to all routes
- [x] Return structured errors with status codes
- [x] Log backend errors in console

### **Notes on Test Isolation:**
  - Previously, tests and production shared the same database file, causing data pollution and unpredictable test failures (especially for sorting).
  - Now, all backend tests use an in-memory SQLite DB that is reseeded before each test, ensuring a clean, known dataset every time.
  - This guarantees reliable, repeatable test results and prevents test data from affecting production or other tests.
  - Sorting and list tests now always pass because the data is always in a consistent state.

---

## 🧪 Phase 5 — Testing (Light)

### 🧮 Unit Tests (Vitest)
- [x] Backend API tests for GET /api/videos (list, sort, error cases)
- [x] Backend API tests for POST /api/videos (normal, edge, failure cases)
- [ ] Write test for date-sorting helper
- [ ] Write test for ID generation (e.g. `v-001` to `v-051`)

### 📦 Component Tests (React Testing Library)
- [ ] Render `VideoCard` with props, check for title/tag/date
- [ ] Test list shows loading state on fetch

### 🎯 Edge / Failure
- [x] Submit form with missing title, assert error (backend)
- [ ] Fetch fails → show error UI

**Note:** All basic backend API tests (GET/POST, validation, and error cases) are implemented and passing.

---

## 🎨 Phase 6 — UX Polish & Error States

- [ ] Add toast/snackbar for success/fail
- [ ] Add global error fallback
- [ ] Add "no videos found" UX for edge cases
- [ ] Ensure consistent spacing, padding, and breakpoints
- [ ] Ensure accessibility: focus states, ARIA roles

---

## 📝 Phase 7 — Docs & Final Touches

- [ ] Finalize `README.md` with:
  - Tech stack
  - Setup instructions
  - Dev commands (backend + frontend)
  - Notes on architecture and decisions
  - Future improvement ideas
- [ ] Add `.env.example` if any config used
- [ ] Lint all code with ESLint + Prettier
- [ ] Confirm typesafety, test pass, no runtime errors
- [ ] Final commit + review structure

---

## 🌟 Stretch Goals & Bonus (Optional)

- [ ] Add tag filter dropdown (filter videos by tag)
- [ ] Paginate list (show 12 per page with navigation)
- [ ] Persist sort preference in localStorage
- [ ] Add light/dark toggle via daisyUI theme

---

## 🧠 Discovered During Work

_Add new tasks or insights here as they come up during implementation._

---

### 2024-06-09 — Project Setup
- Created `/frontend` and `/backend` folders
- Initialized Git, added `.gitignore`, and `README.md`
- Copied `videos.json` to `/backend/videos.json`
- Reason: Phase 1 monorepo and scaffolding setup
- Success: All initial structure created successfully
- Updated `.gitignore` to exclude context.md, planning.md, task.md, and .cursor/rules/veedio-rules.mdc
- Committed initial project structure and .gitignore
- Reason: Ensure sensitive/planning files are not tracked and establish clean repo base
- Success: Git commit successful

---

### 2024-06-09 — Frontend Setup
- Created Vite + React + TS project in `/frontend`
- Installed Tailwind CSS v3.4.3 and daisyUI after troubleshooting CLI issues
- Updated Tailwind config and CSS entry point
- Confirmed working setup with test button
- Reason: Complete frontend environment setup for further development
- Success: Tailwind and daisyUI working, dev server runs, styles apply
- Discovered: Tailwind v4.x CLI not present, v3.4.3 works; need to add React Router, favicon, and HTML metadata
- 2024-06-09 — Frontend Routing & Favicon
- Set up React Router with `/` and `/new` routes, created `pages/` directory for route components
- Added navigation bar with daisyUI links
- Updated `index.html` with favicon, title, and meta description
- Added favicon image as `public/favicon.png`
- Reason: Complete all initial frontend setup tasks for navigation and branding
- Success: Navigation and favicon/meta working as expected

---

### 2024-06-09 — Backend Setup
- Initialized Node.js + TypeScript backend in `/backend`
- Installed Express, CORS, better-sqlite3, body-parser, and type definitions
- Created TypeScript config and project folder structure (`src/routes`, `src/db`, etc.)
- Set up SQLite database with `videos` table and seeding from `videos.json` on first run
- Added dev and start scripts to `package.json`
- Reason: Complete all backend setup tasks for API and DB foundation
- Success: Backend ready for API implementation

---

### 2024-06-09 — Backend API Implementation
- Implemented `GET /api/videos` endpoint in Express (now using v4 for stable TypeScript support)
- Returns all videos from SQLite, supports `?sort=asc|desc`, validates input with zod
- Added error handling and proper status codes
- Fixed persistent linter/type errors by downgrading to Express 4 and matching types
- Files touched: `src/routes/videos.ts`, `src/server.ts`, `package.json`
- Reason: Complete backend API for video list, ensure robust and type-safe backend
- Success: Endpoint returns 50 videos, passes type checks, ready for frontend integration

---

### 2024-06-09 — Backend API Testing
- Implemented robust backend API tests for `GET /api/videos` using Supertest and Vitest
- Tests cover: root route, video list, sort order (asc/desc), invalid sort param, and error handling
- Refactored server to export app for testability
- Files touched: `src/server.ts`, `tests/server.test.ts`, `package.json`
- Reason: Ensure backend API is reliable, type-safe, and robust before adding POST endpoint
- Success: All GET endpoint tests pass, no unhandled errors, ready for further backend/POST work

---

### 2024-06-10 — Frontend Data Fetching Pattern
- Decided to use a custom React hook with useEffect and an inner async function for fetching videos in the frontend
- This is the idiomatic React approach for simple projects and keeps dependencies minimal
- Note: For larger or production apps, I prefer Redux Toolkit (RTK Query) or React Query for data fetching, caching, and state management, but useEffect is used here for simplicity and clarity
- Reason: Maintain separation of concerns, keep the project lean, and follow React best practices for a take-home challenge

---

### 2024-06-10 — Frontend UI/UX Polish & Layout Stability
- Refactored layout to use a fixed nav bar, isolated from page content
- Removed all global and legacy CSS, relying solely on Tailwind and daisyUI utility classes
- Ensured stable, flicker-free layout by moving the main container to App.tsx and always showing the vertical scrollbar
- Added a smooth fade transition to the video grid when toggling sort order (Newest/Oldest)
- Result: Professional, stable, and modern UI/UX with no layout shift or flicker
- Files touched: `App.tsx`, `index.css`, `VideoListPage.tsx`, `NewVideoPage.tsx`, removed `App.css`

---

### 2024-06-28 — Backend POST Endpoint & Test Isolation
- Implemented `POST /api/videos` endpoint with zod validation, fallback value generation, and robust error handling.
- Refactored DB connection to allow custom/in-memory DB for tests.
- Created test DB helper to use in-memory SQLite and seed from videos.json for isolated, repeatable tests.
- Refactored Express app and router to support dependency injection for DB instance.
- Updated all backend tests to use the in-memory DB, ensuring no test data pollutes production DB.
- Updated tsconfig.json to support tests/ folder and resolve linter errors.
  
**Files touched:**
  - backend/src/routes/videos.ts
  - backend/src/server.ts
  - backend/src/db/index.ts
  - backend/tests/server.test.ts
  - backend/tests/testDb.ts (new)
  - backend/tsconfig.json

**Reason:**
  - Complete Phase 4 (POST endpoint)
  - Ensure robust, isolated, and repeatable backend tests

**Success:**
  - All backend tests pass
  - No test data in production DB
  - Production and test code are cleanly separated

---

---

### 2024-07-01 — Phase 3: Create New Video Page (Form View)
- Implemented the create video form with required title and optional tags, using daisyUI controls and card layout.
- Added client-side validation for required fields.
- Integrated POST logic to `/api/videos` with loading state and error handling.
- Added toast notifications for both success (shown on list page after redirect) and error (shown on form page).
- Improved toast styling and UX (bottom-right, larger text, modern look).
- Autofocus on title input when page loads.
- Cleaned up unused error state from form logic.
- Files touched: `frontend/src/pages/NewVideoPage.tsx`, `frontend/src/components/Toast.tsx`, `frontend/src/pages/VideoListPage.tsx`, `frontend/src/hooks/useVideos.ts`
- Reason: Complete all requirements for Phase 3, ensure robust, user-friendly, and visually polished form experience.
- Success: All Phase 3 tasks complete, form works as intended, UX and error handling are modern and clear.

---