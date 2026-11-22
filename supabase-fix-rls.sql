-- ==============================================================================
-- GANACUTS VISUALS — COMPLETE 1-CLICK SUPABASE DATABASE & RLS FIX
-- Run this script in your Supabase Dashboard:
-- 1. Open: https://supabase.com/dashboard/project/urrvvmmurxjwqocrpxct/sql
-- 2. Click 'New query'
-- 3. Paste this script and click 'Run'
-- ==============================================================================

-- 1. APPLICANTS TABLE: Create if not exists and add all required columns
CREATE TABLE IF NOT EXISTS public.applicants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT DEFAULT 'Remote',
  tools TEXT DEFAULT '',
  portfolio TEXT DEFAULT '',
  specialization TEXT DEFAULT 'Video Editing',
  rate TEXT DEFAULT 'Negotiable',
  password TEXT DEFAULT '1234',
  status TEXT DEFAULT 'pending',
  admin_feedback TEXT DEFAULT '',
  applied_at TEXT,
  assigned_project JSONB DEFAULT NULL,
  submitted_draft JSONB DEFAULT NULL,
  avatar_url TEXT DEFAULT NULL,
  role TEXT DEFAULT 'editor',
  is_manager BOOLEAN DEFAULT FALSE,
  editor_tier TEXT DEFAULT 'normal',
  admin_description TEXT DEFAULT '',
  is_approved BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  payouts JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist on applicants (safe if table already created)
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'Remote';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS tools TEXT DEFAULT '';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS portfolio TEXT DEFAULT '';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS specialization TEXT DEFAULT 'Video Editing';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS rate TEXT DEFAULT 'Negotiable';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS password TEXT DEFAULT '1234';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS admin_feedback TEXT DEFAULT '';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS applied_at TEXT;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS assigned_project JSONB DEFAULT NULL;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS submitted_draft JSONB DEFAULT NULL;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS avatar_url TEXT DEFAULT NULL;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'editor';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS is_manager BOOLEAN DEFAULT FALSE;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS editor_tier TEXT DEFAULT 'normal';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS admin_description TEXT DEFAULT '';
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS payouts JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. APPLICANTS ROW-LEVEL SECURITY (Fix 401 code 42501)
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on applicants" ON public.applicants;
DROP POLICY IF EXISTS "Allow public read access on applicants" ON public.applicants;
DROP POLICY IF EXISTS "Allow public insert on applicants" ON public.applicants;
DROP POLICY IF EXISTS "Allow public update on applicants" ON public.applicants;
DROP POLICY IF EXISTS "Allow public delete on applicants" ON public.applicants;

CREATE POLICY "Allow all on applicants" 
ON public.applicants 
FOR ALL 
TO public, anon, authenticated 
USING (true) 
WITH CHECK (true);


-- 3. MESSAGES TABLE (Live chat between Admin and Editors)
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

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public read access on messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public insert on messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public update on messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public delete on messages" ON public.messages;

CREATE POLICY "Allow all on messages" 
ON public.messages 
FOR ALL 
TO public, anon, authenticated 
USING (true) 
WITH CHECK (true);


-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT,
  subtitle TEXT DEFAULT '',
  aspect TEXT DEFAULT '9:16',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public insert on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public update on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public delete on categories" ON public.categories;

CREATE POLICY "Allow all on categories" 
ON public.categories 
FOR ALL 
TO public, anon, authenticated 
USING (true) 
WITH CHECK (true);


-- 5. PORTFOLIO VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_videos (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  client TEXT DEFAULT 'GanaCuts Visuals',
  aspect TEXT DEFAULT '9:16',
  src TEXT NOT NULL,
  duration TEXT DEFAULT '0:45',
  views TEXT DEFAULT '',
  thumbnail TEXT DEFAULT '',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.portfolio_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on portfolio_videos" ON public.portfolio_videos;
DROP POLICY IF EXISTS "Allow public read access on portfolio_videos" ON public.portfolio_videos;
DROP POLICY IF EXISTS "Allow public insert on portfolio_videos" ON public.portfolio_videos;
DROP POLICY IF EXISTS "Allow public update on portfolio_videos" ON public.portfolio_videos;
DROP POLICY IF EXISTS "Allow public delete on portfolio_videos" ON public.portfolio_videos;

CREATE POLICY "Allow all on portfolio_videos" 
ON public.portfolio_videos 
FOR ALL 
TO public, anon, authenticated 
USING (true) 
WITH CHECK (true);


-- 6. CLIENT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.client_inquiries (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  brand_name TEXT,
  contact TEXT NOT NULL,
  email TEXT,
  project_type TEXT NOT NULL,
  video_count TEXT,
  budget TEXT,
  footage_link TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on client_inquiries" ON public.client_inquiries;
DROP POLICY IF EXISTS "Allow public read on client_inquiries" ON public.client_inquiries;
DROP POLICY IF EXISTS "Allow public insert on client_inquiries" ON public.client_inquiries;

CREATE POLICY "Allow all on client_inquiries" 
ON public.client_inquiries 
FOR ALL 
TO public, anon, authenticated 
USING (true) 
WITH CHECK (true);


-- 7. ENABLE REALTIME ON ALL TABLES
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'applicants') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.applicants;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'messages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'categories') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'portfolio_videos') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_videos;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'client_inquiries') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.client_inquiries;
  END IF;
END $$;
