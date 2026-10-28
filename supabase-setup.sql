-- ==============================================================================
-- GANACUTS VISUALS — COMPLETE SUPABASE DATABASE SCHEMA SETUP
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
  assigned_project JSONB DEFAULT NULL,
  submitted_draft JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was already created
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS assigned_project JSONB DEFAULT NULL;
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS submitted_draft JSONB DEFAULT NULL;

-- Enable RLS and add public access policies for applicants
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on applicants" ON public.applicants;
CREATE POLICY "Allow public read access on applicants" ON public.applicants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on applicants" ON public.applicants;
CREATE POLICY "Allow public insert on applicants" ON public.applicants FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on applicants" ON public.applicants;
CREATE POLICY "Allow public update on applicants" ON public.applicants FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete on applicants" ON public.applicants;
CREATE POLICY "Allow public delete on applicants" ON public.applicants FOR DELETE USING (true);


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

DROP POLICY IF EXISTS "Allow public update on messages" ON public.messages;
CREATE POLICY "Allow public update on messages" ON public.messages FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete on messages" ON public.messages;
CREATE POLICY "Allow public delete on messages" ON public.messages FOR DELETE USING (true);


-- 3. Categories Table (Permanent Category Structure across all devices)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

ALTER TABLE public.portfolio_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on portfolio_videos" ON public.portfolio_videos;
CREATE POLICY "Allow public read access on portfolio_videos" ON public.portfolio_videos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on portfolio_videos" ON public.portfolio_videos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on portfolio_videos" ON public.portfolio_videos FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete on portfolio_videos" ON public.portfolio_videos FOR DELETE USING (true);


-- 5. Seed Initial Categories (Only if not already populated)
INSERT INTO public.categories (id, label, order_index)
VALUES 
  ('cat_motion_graphics', 'Motion Graphics', 1),
  ('cat_real_estate', 'Real Estate', 2),
  ('cat_talking_head', 'Talking Head', 3),
  ('cat_podcasts', 'Podcast Reels', 4),
  ('cat_long_form', 'Long Form', 5)
ON CONFLICT (id) DO UPDATE SET 
  label = EXCLUDED.label, 
  order_index = EXCLUDED.order_index;


-- 6. Seed Initial Videos (Only if not already populated)
INSERT INTO public.portfolio_videos (id, category, title, client, aspect, src, duration, thumbnail, order_index)
VALUES
  ('v_mg_1', 'cat_motion_graphics', '3D Kinetic Typography & Cyberpunk Overlays', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:35', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', 1),
  ('v_mg_2', 'cat_motion_graphics', 'SaaS Product UI Explainer & Data Infographics', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:45', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', 2),
  ('v_mg_3', 'cat_motion_graphics', 'Abstract Brand Visual Identity & 3D Logo Reveal', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:30', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80', 3),
  ('v_re_1', 'cat_real_estate', 'Ultra-Luxury Kokapet Sky-Villa Architectural Tour', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:42', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', 4),
  ('v_re_2', 'cat_real_estate', 'Modern Minimalist Penthouse Walkthrough & Interior Details', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:38', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', 5),
  ('v_th_1', 'cat_talking_head', 'Alex Hormozi Style Retention Hook Edit', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:40', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', 6),
  ('v_th_2', 'cat_talking_head', 'Founder Authority & High-Ticket Storytelling', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:50', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', 7),
  ('v_pod_1', 'cat_podcasts', 'The Million Dollar Mindset Shift (Dual-Cam Cut)', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:48', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80', 8),
  ('v_pod_2', 'cat_podcasts', 'Uncensored Startup Truths & Fast Multi-Angle Cuts', 'GanaCuts Visuals', '9:16', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '0:55', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', 9),
  ('v_lf_1', 'cat_long_form', 'Deep Narrative: The Architecture of Human Psychology', 'GanaCuts Visuals', '16:9', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '14:20', 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=900&q=80', 10),
  ('v_lf_2', 'cat_long_form', 'Silicon Valley Tech Bubble: An Investigative Video Essay', 'GanaCuts Visuals', '16:9', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', '18:45', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', 11)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  src = EXCLUDED.src,
  category = EXCLUDED.category,
  thumbnail = EXCLUDED.thumbnail;


-- 7. Add Tables to Realtime Publication (Safe handling)
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
