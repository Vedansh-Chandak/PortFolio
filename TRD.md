# Technical Requirements Document (TRD)
## Dynamic Developer Portfolio

**Version:** 0.1 (draft for review) — companion to `PRD.md`

---

## 1. Architecture Overview

```
┌─────────────────────┐        HTTPS/JSON        ┌──────────────────────┐
│   Frontend (SPA)     │ ───────────────────────► │   Backend (REST API)  │
│   React + Vite +     │ ◄─────────────────────── │   Node.js + Express   │
│   Tailwind CSS        │                          │                        │
│                       │                          │   ┌────────────────┐   │
│  - Public site        │                          │   │ SQLite database │   │
│  - Admin panel (/admin)│                         │   └────────────────┘   │
└─────────────────────┘                           └──────────────────────┘
```

- **Frontend** is a pure client — no content hardcoded, everything fetched from the API.
- **Backend** exposes public read-only endpoints for site content, and JWT-protected
  read/write endpoints for the admin panel.
- **Database** is a single SQLite file — no external DB service to provision, easy to back up
  (it's just a file), sufficient for single-admin, low-write-volume use.

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | React (Vite) | Fast dev server, simple build, matches earlier discussion |
| Styling | Tailwind CSS | Rapid, consistent styling; easy responsive utilities |
| Backend runtime | Node.js + Express | Minimal, well understood, easy to deploy anywhere |
| Database | SQLite via `better-sqlite3` | Zero-config, file-based, no hosting dependency |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` for password hashing | Stateless, simple single-admin auth |
| Cross-origin | `cors` | Frontend and backend run on different ports/domains |

## 3. Data Model

```
profile           (singleton row)
  id, name, title, tagline, bio, email, github, linkedin, twitter, resume_url

experience
  id, company, role, duration, description, tech (JSON array), sort_order

tech_categories
  id, category, items (JSON array), sort_order

projects
  id, title, description, status, features (JSON array), tech (JSON array),
  live_url, github_url, sort_order

messages
  id, name, email, message, created_at, read

admin
  id, username, password_hash
```

Notes:
- `tech`, `items`, `features` are stored as JSON-encoded text columns — simplest fit for
  SQLite, adequate at this scale.
- `sort_order` drives display order for Experience/Tech Stack/Projects so the admin can
  reorder entries.

## 4. API Contract (high level)

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | — | Admin login, returns JWT |
| POST | `/api/auth/change-password` | Bearer token | Change admin password |
| GET | `/api/content/profile` | — | Public: fetch profile/hero/about data |
| PUT | `/api/content/profile` | Bearer token | Admin: update profile |
| GET | `/api/content/experience` | — | Public: list experience entries |
| POST/PUT/DELETE | `/api/content/experience[/:id]` | Bearer token | Admin: manage experience |
| GET | `/api/content/tech-stack` | — | Public: list tech categories |
| POST/PUT/DELETE | `/api/content/tech-stack[/:id]` | Bearer token | Admin: manage tech stack |
| GET | `/api/content/projects` | — | Public: list projects |
| POST/PUT/DELETE | `/api/content/projects[/:id]` | Bearer token | Admin: manage projects |
| POST | `/api/messages` | — | Public: submit contact form |
| GET | `/api/messages` | Bearer token | Admin: list submissions |
| PUT | `/api/messages/:id/read` | Bearer token | Admin: mark read |
| DELETE | `/api/messages/:id` | Bearer token | Admin: delete submission |

All protected routes require `Authorization: Bearer <token>`; middleware rejects missing/expired
tokens with `401`.

## 5. Frontend Structure

```
src/
  api.js                 -- fetch wrapper for all API calls
  App.jsx                -- routes: "/" (public site), "/admin" (panel)
  components/
    Hero.jsx  About.jsx  Experience.jsx  TechStack.jsx
    Projects.jsx  Resume.jsx  Contact.jsx
  admin/
    Login.jsx
    Dashboard.jsx
    editors/ ProfileEditor.jsx  ExperienceEditor.jsx
             TechStackEditor.jsx  ProjectsEditor.jsx  Messages.jsx
```

- Public site fetches all section data on mount; each section renders its own loading/empty
  state independently so one slow/missing section doesn't block the rest of the page.
- Admin panel stores the JWT in memory + sessionStorage-equivalent app state (not
  `localStorage`, to keep behavior consistent across environments); redirects to login on `401`.

## 6. Security Considerations

- Passwords hashed with bcrypt, never stored or logged in plain text.
- JWT secret and admin credentials supplied via environment variables (`.env`), never committed.
- CORS restricted to the deployed frontend origin.
- Input validation on all write endpoints (required fields checked server-side, not just in the UI).
- Contact form has no auth (public by design) — basic server-side validation guards against empty/malformed submissions; rate-limiting can be added later if spam becomes an issue.

## 7. Deployment Shape

- **Backend:** any Node host with persistent disk for the SQLite file (e.g. Render, Railway, a small VPS). Not deployable to purely serverless/edge platforms without swapping SQLite for a hosted DB.
- **Frontend:** static build (`vite build`) deployable to Vercel/Netlify, pointed at the backend's public URL via an environment variable.
- **Local dev:** backend on `:4000`, frontend dev server on `:5173`, `CORS_ORIGIN` set accordingly.

## 8. Build Order

1. Backend: DB schema + seed data → REST API (content routes, auth, messages)
2. Admin panel: login → dashboard → per-section editors → messages inbox
3. Public site: section components wired to the API, styled to match the agreed visual design
4. Polish: responsive pass, empty/loading states, deploy instructions

---
*Once PRD and TRD are reviewed, implementation proceeds in the order in Section 8.*
