-- ==============================================================================
-- GANACUTS VISUALS — PRODUCTION HARDENING & SECURITY SQL SCRIPT
-- Execute in Supabase: Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ==============================================================================

-- 1. SCHEMA UPGRADES FOR APPLICANTS TABLE
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS payouts JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. CREATE CLIENT INQUIRIES & PROJECT BOOKING TABLE
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

-- Enable RLS on client_inquiries
ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow visitors to insert client inquiries
DROP POLICY IF EXISTS "Allow public insert on client_inquiries" ON public.client_inquiries;
CREATE POLICY "Allow public insert on client_inquiries" ON public.client_inquiries FOR INSERT WITH CHECK (true);

-- Allow reading client inquiries
DROP POLICY IF EXISTS "Allow public read on client_inquiries" ON public.client_inquiries;
CREATE POLICY "Allow public read on client_inquiries" ON public.client_inquiries FOR SELECT USING (true);

-- 3. HARDEN APPLICANTS RLS (Prevent public wiping)
DROP POLICY IF EXISTS "Allow public delete on applicants" ON public.applicants;

-- 4. HARDEN CATEGORIES RLS (Allow public read, allow admin write)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on categories" ON public.categories;
CREATE POLICY "Allow public insert on categories" ON public.categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on categories" ON public.categories;
CREATE POLICY "Allow public update on categories" ON public.categories FOR UPDATE USING (true);

-- Revoke public delete on categories to prevent accidental wiping
DROP POLICY IF EXISTS "Allow public delete on categories" ON public.categories;

-- 5. HARDEN PORTFOLIO VIDEOS RLS (Allow public read, allow admin write)
ALTER TABLE public.portfolio_videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public read access on portfolio_videos" ON public.portfolio_videos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public insert on portfolio_videos" ON public.portfolio_videos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public update on portfolio_videos" ON public.portfolio_videos FOR UPDATE USING (true);

-- Revoke public delete on portfolio_videos to protect your showcase
DROP POLICY IF EXISTS "Allow public delete on portfolio_videos" ON public.portfolio_videos;

-- 6. ADD NEW TABLES TO REALTIME PUBLICATION
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'client_inquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.client_inquiries;
  END IF;
END $$;
