-- Schema SQL per Lumina (Rebuild clean-room di Sophia : Cultura Generale)
-- Compatibile con SQLite (node:sqlite) e PostgreSQL / Supabase

PRAGMA foreign_keys = ON;

-- 1. Categorie / Materie di Cultura Generale
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);

-- 2. Profili Utente (Utente principale + Amici)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT NOT NULL,
  avatar_emoji TEXT NOT NULL DEFAULT '🦉',
  auth_provider TEXT NOT NULL DEFAULT 'local' CHECK (auth_provider IN ('local', 'email', 'google', 'apple')),
  age_range TEXT NOT NULL DEFAULT '25-34',
  daily_goal_minutes INTEGER NOT NULL DEFAULT 10 CHECK (daily_goal_minutes IN (5, 10, 15)),
  preferred_locale TEXT NOT NULL DEFAULT 'it',
  reader_theme TEXT NOT NULL DEFAULT 'paper' CHECK (reader_theme IN ('paper', 'sepia', 'night')),
  reader_font_size TEXT NOT NULL DEFAULT 'md' CHECK (reader_font_size IN ('sm', 'md', 'lg')),
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  streak_freeze_count INTEGER NOT NULL DEFAULT 2,
  last_streak_date TEXT,
  notification_time TEXT NOT NULL DEFAULT '08:30',
  focus_lock_enabled INTEGER NOT NULL DEFAULT 0,
  focus_blocked_apps TEXT NOT NULL DEFAULT '["Instagram","TikTok","X / Twitter","YouTube Shorts"]',
  onboarding_completed INTEGER NOT NULL DEFAULT 0,
  friend_code TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_streak ON users(current_streak DESC);

-- 3. Interessi Utente (Relazione N:M tra users e categories)
CREATE TABLE IF NOT EXISTS user_interests (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_user_interests_user ON user_interests(user_id);

-- 4. Corsi / Percorsi Tematici
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  synopsis TEXT NOT NULL,
  difficulty_level TEXT NOT NULL DEFAULT 'base' CHECK (difficulty_level IN ('base', 'intermedio', 'avanzato')),
  estimated_total_minutes INTEGER NOT NULL DEFAULT 20,
  lessons_count INTEGER NOT NULL DEFAULT 2,
  cover_badge TEXT NOT NULL DEFAULT '🏛️',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category_id, sort_order);

-- 5. Lezioni di Micro-Apprendimento
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  hook_subtitle TEXT NOT NULL,
  reading_time_minutes INTEGER NOT NULL DEFAULT 7,
  content_blocks TEXT NOT NULL, -- JSON array di schede: {title, body, quote, takeaway, year}
  key_takeaways TEXT NOT NULL,  -- JSON array di punti chiave riassuntivi
  audio_duration_seconds INTEGER NOT NULL DEFAULT 360,
  order_in_course INTEGER NOT NULL DEFAULT 1,
  is_daily_featured INTEGER NOT NULL DEFAULT 0,
  published_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id, order_in_course);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_daily ON lessons(is_daily_featured);

-- 6. Domande del Quiz di Fine Lezione
CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options TEXT NOT NULL, -- JSON array di 4 stringhe
  correct_option_index INTEGER NOT NULL CHECK (correct_option_index BETWEEN 0 AND 3),
  explanation_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_lesson ON quiz_questions(lesson_id, sort_order);

-- 7. Progresso Lezioni per Utente
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  reading_progress_pct INTEGER NOT NULL DEFAULT 0 CHECK (reading_progress_pct BETWEEN 0 AND 100),
  last_audio_position_sec INTEGER NOT NULL DEFAULT 0,
  quiz_score INTEGER NOT NULL DEFAULT 0,
  quiz_total INTEGER NOT NULL DEFAULT 0,
  personal_note TEXT DEFAULT '',
  completed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_status ON user_lesson_progress(user_id, status);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON user_lesson_progress(lesson_id);

-- 8. Storico Risposte Quiz & Ripasso Attivo (Spaced Repetition)
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  selected_option_index INTEGER NOT NULL,
  is_correct INTEGER NOT NULL DEFAULT 0,
  next_review_date TEXT NOT NULL,
  answered_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_attempts_user_review ON user_quiz_attempts(user_id, next_review_date);

-- 9. Preferiti / Salvati (Lezioni e Corsi)
CREATE TABLE IF NOT EXISTS user_favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, lesson_id),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON user_favorites(user_id);

-- 10. Registro Attività Giornaliera & Sblocco Focus
CREATE TABLE IF NOT EXISTS daily_activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_date TEXT NOT NULL, -- YYYY-MM-DD
  lessons_completed_count INTEGER NOT NULL DEFAULT 0,
  minutes_studied INTEGER NOT NULL DEFAULT 0,
  goal_met INTEGER NOT NULL DEFAULT 0,
  focus_unlocked_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date ON daily_activity_logs(user_id, activity_date DESC);
