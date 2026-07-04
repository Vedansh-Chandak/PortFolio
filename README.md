# Dynamic Developer Portfolio

A single-page developer portfolio, inspired by the layout and flow of
[ayush-saksena.vercel.app](https://ayush-saksena.vercel.app/#about), rebuilt as a **dynamic,
database-backed application** with an admin panel — so content (bio, experience, tech stack,
projects, resume link) can be updated without touching code or redeploying.

## Documents in this set

| File | Purpose |
|---|---|
| `PRD.md` | Product Requirements Document — what the product is, who it's for, what it must do |
| `TRD.md` | Technical Requirements Document — architecture, stack, data model, API contract |
| `README.md` | This file — a map of the other two |

## Why these first

Before writing any code, we're locking down:
1. **Scope** — which sections exist, what "dynamic" means, what the admin can/can't edit
2. **Architecture** — frontend/backend split, database, auth, hosting shape

Once these are reviewed and approved, the build proceeds in this order:
backend (DB + API) → admin panel → public-facing site → polish/deploy docs.

## At a glance

- **Frontend:** React (Vite) + Tailwind CSS — public site + admin panel
- **Backend:** Node.js + Express — REST API
- **Database:** SQLite (file-based, zero external service needed)
- **Auth:** JWT-based login, single admin account
- **Sections:** Hero/About, Experience timeline, Tech Stack, Projects, Resume, Contact form

See `PRD.md` for feature detail and `TRD.md` for the technical design.
