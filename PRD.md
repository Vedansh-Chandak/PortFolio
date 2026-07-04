# Product Requirements Document (PRD)
## Dynamic Developer Portfolio

**Version:** 0.1 (draft for review)
**Reference design:** ayush-saksena.vercel.app (layout & flow reference only — content, copy, and
photos will be original)

---

## 1. Problem & Goal

A static portfolio requires a code change and redeploy every time the owner wants to add a
project, update their bio, or tweak their experience section. The goal is a portfolio that looks
and feels like a polished static site, but where all content lives in a database and is editable
through a private admin panel — no code edits required to update text, add a project, or remove
an old job.

## 2. Users

| User | Needs |
|---|---|
| **Owner (admin)** | Log in privately, edit every section's content, view contact-form submissions |
| **Visitor** | View the portfolio, read about the owner, browse projects/experience, send a message, download the resume |

## 3. Scope — Sections

| Section | Content | Editable by admin |
|---|---|---|
| Hero | Name, title, tagline, social links (GitHub/LinkedIn/Twitter/email) | Yes |
| About | Bio paragraph(s) | Yes |
| Experience | Timeline of roles: company, role, duration, description, tech tags | Yes — add/edit/delete/reorder |
| Tech Stack | Categories (e.g. Languages, Frontend, Backend, Tools) each with a list of items | Yes — add/edit/delete/reorder |
| Projects | Cards: title, description, status badge (Live/In progress/Archived), feature list, tech tags, live link, GitHub link | Yes — add/edit/delete/reorder |
| Resume | Link/file for visitors to view or download | Yes |
| Contact | Form (name, email, message) that visitors submit | Submissions viewable/deletable by admin |

## 4. Functional Requirements

### 4.1 Public site
- FR1: Loads all section content dynamically from the backend on page load (no hardcoded content in the frontend).
- FR2: Renders gracefully with placeholder/empty states if a section has no data yet.
- FR3: Contact form validates required fields client-side and shows success/error feedback.
- FR4: Resume link opens/downloads the file the admin has configured.
- FR5: Fully responsive (mobile → desktop); smooth-scroll single-page navigation between sections, matching the reference site's flow.

### 4.2 Admin panel
- FR6: Login screen, single admin account, password-protected.
- FR7: Session persists via token; expires after a set period (12h) and requires re-login.
- FR8: Dashboard with one editing view per section (Profile, Experience, Tech Stack, Projects, Resume).
- FR9: Add / edit / delete entries for Experience, Tech Stack, and Projects; changes reflect on the public site immediately (no rebuild/redeploy).
- FR10: View list of contact-form submissions, mark read, delete.
- FR11: Change admin password from within the panel.

### 4.3 Non-goals (out of scope for v1)
- Multiple admin users / roles
- Public comments or likes
- Blog/CMS-style rich text editor (plain text/markdown only)
- Multi-language support

## 5. Success Criteria

- Owner can go from "empty profile" to a fully populated, live-looking portfolio using only the admin panel.
- Owner can add a new project and see it live on the public site within seconds, with zero code changes or redeploys.
- Visitor experience (load time, look, feel, responsiveness) is indistinguishable from a static site.

## 6. Open Questions for Review

1. Should the resume be an uploaded file (stored on the server) or just a link the admin pastes (e.g. Google Drive)? *(v1 default: a link, to keep the backend simple — can upgrade to file upload later.)*
2. Should contact-form submissions trigger an email notification to the owner, or is in-panel viewing enough for v1? *(v1 default: in-panel only.)*
3. Any specific sections from the reference site to exclude, or additional sections (e.g. Blog) to include?

---
*Once this PRD is approved, `TRD.md` defines how it gets built.*
