-- ==============================================================================
-- GANACUTS VISUALS — PRODUCTION-GRADE SUPABASE SETUP & HARDENED RLS POLICIES
-- Copy and run this script in your Supabase Dashboard:
-- Supabase -> SQL Editor -> New Query -> Paste & Click 'Run'
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
  assigned_project JSONB DEFAULT NULL,
  submitted_draft JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was already created
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS assigned_project JSONB DEFAULT NULL;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS submitted_draft JSONB DEFAULT NULL;

-- Enable Row Level Security (RLS) on applicants
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

-- Applicants RLS: Allow anyone to view applicants and submit applications
DROP POLICY IF EXISTS "Allow public read access on applicants" ON public.applicants;
CREATE POLICY "Allow public read access on applicants" ON public.applicants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on applicants" ON public.applicants;
CREATE POLICY "Allow public insert on applicants" ON public.applicants FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on applicants" ON public.applicants;
CREATE POLICY "Allow public update on applicants" ON public.applicants FOR UPDATE USING (true);

-- CRITICAL SECURITY FIX: Revoke public delete so no anonymous script can wipe your applicants!
DROP POLICY IF EXISTS "Allow public delete on applicants" ON public.applicants;


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

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on messages" ON public.messages;
CREATE POLICY "Allow public read access on messages" ON public.messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on messages" ON public.messages;
CREATE POLICY "Allow public insert on messages" ON public.messages FOR INSERT WITH CHECK (true);

-- CRITICAL SECURITY FIX: Chat history cannot be modified or deleted by visitors!
DROP POLICY IF EXISTS "Allow public update on messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public delete on messages" ON public.messages;


-- 3. Categories Table (Permanent Category Structure across all devices)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT,
  subtitle TEXT DEFAULT '',
  aspect TEXT DEFAULT '9:16',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS label TEXT;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS subtitle TEXT DEFAULT '';
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS aspect TEXT DEFAULT '9:16';
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on categories" ON public.categories;
CREATE POLICY "Allow public insert on categories" ON public.categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on categories" ON public.categories;
CREATE POLICY "Allow public update on categories" ON public.categories FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete on categories" ON public.categories;
CREATE POLICY "Allow public delete on categories" ON public.categories FOR DELETE USING (true);


-- 4. Portfolio Videos Table (Permanent Video Links across all devices)
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

ALTER TABLE public.portfolio_videos ADD COLUMN IF NOT EXISTS client TEXT DEFAULT 'GanaCuts Visuals';
ALTER TABLE public.portfolio_videos ADD COLUMN IF NOT EXISTS aspect TEXT DEFAULT '9:16';
ALTER TABLE public.portfolio_videos ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '0:45';
ALTER TABLE public.portfolio_videos ADD COLUMN IF NOT EXISTS views TEXT DEFAULT '';
ALTER TABLE public.portfolio_videos ADD COLUMN IF NOT EXISTS thumbnail TEXT DEFAULT '';
ALTER TABLE public.portfolio_videos ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

ALTER TABLE public.portfolio_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public read access on portfolio_videos" ON public.portfolio_videos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public insert on portfolio_videos" ON public.portfolio_videos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public update on portfolio_videos" ON public.portfolio_videos FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public delete on portfolio_videos" ON public.portfolio_videos FOR DELETE USING (true);


-- 5. Seed Real Categories (Motion Graphics, Talking Head, Real Estate)
INSERT INTO public.categories (id, name, label, subtitle, aspect, order_index)
VALUES 
  ('cat_motion_graphics', 'Motion Graphics', 'Motion Graphics', '3D TYPOGRAPHY, VISUAL HOOKS & KINETIC INFOGRAPHICS', '9:16', 1),
  ('cat_talking_head', 'Talking Head', 'Talking Head', 'HIGH-RETENTION HORMOZI-STYLE SUBTITLES, ZOOM CUTS & STORYTELLING', '9:16', 2),
  ('cat_real_estate', 'Real Estate', 'Real Estate', 'LUXURY VILLA TOURS, DRONE TRANSITIONS & ARCHITECTURAL PACING', '9:16', 3)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  label = EXCLUDED.label,
  subtitle = EXCLUDED.subtitle,
  aspect = EXCLUDED.aspect,
  order_index = EXCLUDED.order_index;


-- 6. Seed Real YouTube Shorts (GanaCuts Visuals Active Portfolio)
INSERT INTO public.portfolio_videos (id, category, title, client, aspect, src, duration, thumbnail, order_index)
VALUES
  ('v_1793060167914', 'cat_motion_graphics', '3D MOTION GRAPHICS', 'GanaCuts Visuals', '9:16', 'https://youtube.com/shorts/kYpdBPpvym0?si=wWdLZBnaU7L5Kdes', '0:45', '', 1),
  ('v_1793060379878', 'cat_motion_graphics', '3D MOTION GRAPHICS', 'GanaCuts Visuals', '9:16', 'https://youtube.com/shorts/3Gf_8827t7o?si=n_JygrV75BwWDtuN', '0:45', '', 2),
  ('v_1793060563673', 'cat_talking_head', 'TALKING HEAD', 'GanaCuts Visuals', '9:16', 'https://youtube.com/shorts/YPnq6HFbsto?si=XO0SyAK6Ov513tDK', '0:45', '', 3),
  ('v_1793060598803', 'cat_talking_head', 'TALKING HEAD', 'GanaCuts Visuals', '9:16', 'https://youtube.com/shorts/KtXQpmIUoMU?si=iWcetWxJMPTGImUb', '0:45', '', 4),
  ('v_1793060675390', 'cat_real_estate', 'REAL ESTATES', 'GanaCuts Visuals', '9:16', 'https://youtube.com/shorts/RxRiWnXKXHc?si=k4TnmpAwEqw9WTja', '0:45', '', 5),
  ('v_1793060747160', 'cat_real_estate', 'REAL ESTATE', 'GanaCuts Visuals', '9:16', 'https://youtube.com/shorts/E0Ng5JR3_WM?si=RrylIgNUnqsqtY7l', '0:45', '', 6)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  src = EXCLUDED.src,
  category = EXCLUDED.category,
  thumbnail = EXCLUDED.thumbnail,
  order_index = EXCLUDED.order_index;


-- 7. Add Tables to Realtime Publication (Safe Idempotent Setup)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'applicants'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.applicants;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'categories'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'portfolio_videos'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_videos;
  END IF;
END $$;
