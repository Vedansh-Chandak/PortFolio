CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY CHECK (id = 1),

    name TEXT,
    title TEXT,
    tagline TEXT,
    bio TEXT,

    avatar_url TEXT,
    avatar_public_id TEXT,

    email TEXT,
    github TEXT,
    linkedin TEXT,
    twitter TEXT,

    resume_url TEXT,
    resume_public_id TEXT,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    company TEXT NOT NULL,
    role TEXT NOT NULL,
    duration TEXT,
    description TEXT,

    tech TEXT,

    sort_order INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tech_stack (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    category TEXT NOT NULL,

    items TEXT,

    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    slug TEXT NOT NULL UNIQUE,

    short_description TEXT,

    description TEXT NOT NULL,

    status TEXT NOT NULL,

    cover_image_url TEXT,

    cover_image_public_id TEXT,

    features TEXT,

    tech TEXT,

    live_url TEXT,

    github_url TEXT,

    is_featured INTEGER DEFAULT 0,

    sort_order INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT NOT NULL,

    subject TEXT,

    message TEXT NOT NULL,

    is_read INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

