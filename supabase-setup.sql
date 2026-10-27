-- ==============================================================================
-- GANACUTS VISUALS — SUPABASE DATABASE SCHEMA SETUP
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Applicants Table (Editors & Team Applications)
CREATE TABLE IF NOT EXISTS public.applicants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  tools TEXT,
  portfolio TEXT,
  specialization TEXT,
  rate TEXT,
  password TEXT,
  status TEXT DEFAULT 'pending',
  admin_feedback TEXT DEFAULT '',
  applied_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and add public access policies
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on applicants"
  ON public.applicants FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on applicants"
  ON public.applicants FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on applicants"
  ON public.applicants FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete on applicants"
  ON public.applicants FOR DELETE
  USING (true);

-- 2. Messages Table (Admin <-> Editor Live Chat)
CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  editor_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp BIGINT,
  time_str TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and add public access policies
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on messages"
  ON public.messages FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on messages"
  ON public.messages FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete on messages"
  ON public.messages FOR DELETE
  USING (true);

-- Enable Realtime for Messages & Applicants
ALTER PUBLICATION supabase_realtime ADD TABLE public.applicants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
