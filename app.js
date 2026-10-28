/**
 * CUTSCALE MEDIA — Video Editing Agency & Creative Operations Engine
 * Founder: Ganesh
 * Dynamic Category Engine + Editor Recruitment & Roster Management
 */

// Default Categories
const DEFAULT_CATEGORIES = [
  {
    id: "cat_motion_graphics",
    name: "Motion Graphics",
    subtitle: "3D TYPOGRAPHY, VISUAL HOOKS & KINETIC INFOGRAPHICS",
    aspect: "9:16",
    order: 1
  },
  {
    id: "cat_real_estate",
    name: "Real Estate",
    subtitle: "LUXURY VILLA TOURS, DRONE TRANSITIONS & ARCHITECTURAL PACING",
    aspect: "9:16",
    order: 2
  },
  {
    id: "cat_talking_head",
    name: "Talking Head",
    subtitle: "HIGH-RETENTION HORMOZI-STYLE SUBTITLES, ZOOM CUTS & STORYTELLING",
    aspect: "9:16",
    order: 3
  },
  {
    id: "cat_podcasts",
    name: "Podcast Reels",
    subtitle: "STUDIO INTERVIEWS, DUAL-SPEAKER SWITCHING & DRAMATIC PACING",
    aspect: "9:16",
    order: 4
  },
  {
    id: "cat_long_form",
    name: "Long Form",
    subtitle: "DEEP NARRATIVE EXPERIENCES & DOCUMENTARY YOUTUBE EDITS",
    aspect: "16:9",
    order: 5
  }
];

// Default Videos
const DEFAULT_VIDEOS = [
  // 1. Motion Graphics (3 Edits)
  {
    id: "v_mg_1",
    categoryId: "cat_motion_graphics",
    title: "3D Kinetic Typography & Cyberpunk Overlays",
    duration: "0:35",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v_mg_2",
    categoryId: "cat_motion_graphics",
    title: "SaaS Product UI Explainer & Data Infographics",
    duration: "0:45",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v_mg_3",
    categoryId: "cat_motion_graphics",
    title: "Abstract Brand Visual Identity & 3D Logo Reveal",
    duration: "0:30",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80"
  },

  // 2. Real Estate (2 Edits)
  {
    id: "v_re_1",
    categoryId: "cat_real_estate",
    title: "Ultra-Luxury Kokapet Sky-Villa Architectural Tour",
    duration: "0:42",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v_re_2",
    categoryId: "cat_real_estate",
    title: "Modern Minimalist Penthouse Walkthrough & Interior Details",
    duration: "0:38",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
  },

  // 3. Talking Head (2 Edits)
  {
    id: "v_th_1",
    categoryId: "cat_talking_head",
    title: "Alex Hormozi Style Retention Hook Edit",
    duration: "0:40",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v_th_2",
    categoryId: "cat_talking_head",
    title: "Founder Authority & High-Ticket Storytelling",
    duration: "0:50",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },

  // 4. Podcasts (2 Edits)
  {
    id: "v_pod_1",
    categoryId: "cat_podcasts",
    title: "The Million Dollar Mindset Shift (Dual-Cam Cut)",
    duration: "0:48",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v_pod_2",
    categoryId: "cat_podcasts",
    title: "Uncensored Startup Truths & Fast Multi-Angle Cuts",
    duration: "0:55",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },

  // 5. Long Form (2 Edits)
  {
    id: "v_lf_1",
    categoryId: "cat_long_form",
    title: "Deep Narrative: The Architecture of Human Psychology",
    duration: "14:20",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "v_lf_2",
    categoryId: "cat_long_form",
    title: "Silicon Valley Tech Bubble: An Investigative Video Essay",
    duration: "18:45",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80"
  }
];

// Real Applicants (Loaded dynamically from Supabase database)
const DEFAULT_APPLICANTS = [];

const DEFAULT_PROFILE = {
  name: "GANACUTS VISUALS",
  badge: "POST-PRODUCTION & VISUALS",
  tagline: "High-retention video editing, cinematic color grading, and dynamic motion graphics by <strong>GanaCuts Visuals</strong>. Crafted with <strong>DaVinci Resolve</strong>, <strong>Premiere Pro</strong> & <strong>After Effects</strong>.",
  photo: "assets/logo.jpg",
  waUrl: "https://wa.me/917075081947?text=Hi%20Ganesh,%20I%20saw%20your%20portfolio%20on%20GanaCuts%20Visuals%20and%20would%20like%20to%20hire%20you%20for%20a%20video%20editing%20project.",
  instaUrl: "https://www.instagram.com/gana_cuts_visuals?dlrf=aXJlY3lsazhraHl4"
};

// Real Messages (Loaded dynamically from Supabase database)
const DEFAULT_MESSAGES = [];

// Storage Keys
const STORAGE_KEY_CATS = "cutscale_cats_v6";
const STORAGE_KEY_VIDS = "cutscale_vids_v6";
const STORAGE_KEY_PROF = "ganacuts_prof_v2";
const STORAGE_KEY_APPS = "cutscale_apps_v6";
const STORAGE_KEY_MSGS = "cutscale_msgs_v1";
const ADMIN_PIN = "7075";

// Supabase Cloud Authentication & Realtime Database Configuration
const SUPABASE_URL = "https://urrvvmmurxjwqocrpxct.supabase.co";
const SUPABASE_ANON = "sb_publishable_pef_sQ4erO4VhiILPGo6Rw_HgRXR496";
const MASTER_ADMIN_EMAIL = "designsbygani@gmail.com";
let globalSupabase = null;

if (typeof window !== "undefined" && window.supabase) {
  try {
    globalSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } catch (supaInitErr) {
    console.warn("Supabase global initialization:", supaInitErr);
  }
}

// Supabase Database Sync Operations
async function syncApplicantToSupabase(app) {
  if (!globalSupabase || !app) return;
  try {
    const payload = {
      id: app.id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      city: app.city || "Remote",
      tools: app.tools || "",
      portfolio: app.portfolio || "",
      specialization: app.specialization || "Video Editing",
      rate: app.rate || "Negotiable",
      password: app.password || "1234",
      status: app.status || "pending",
      admin_feedback: app.adminFeedback || "",
      applied_at: app.appliedAt || new Date().toISOString()
    };
    if (app.assignedProject) {
      payload.assigned_project = app.assignedProject;
    }
    if (app.submittedDraft) {
      payload.submitted_draft = app.submittedDraft;
    }
    await globalSupabase.from('applicants').upsert(payload, { onConflict: 'id' });
  } catch (err) {
    // Non-blocking catch for offline/paused Supabase projects
    console.warn("Supabase applicant sync notice:", err.message || err);
  }
}

async function syncAllApplicantsToSupabase() {
  if (!globalSupabase || !Array.isArray(applicants)) return;
  for (const app of applicants) {
    await syncApplicantToSupabase(app);
  }
}

async function syncMessageToSupabase(msg) {
  if (!globalSupabase || !msg) return;
  try {
    const payload = {
      id: msg.id,
      editor_id: msg.editorId,
      sender: msg.sender,
      sender_name: msg.senderName,
      text: msg.text,
      timestamp: msg.timestamp,
      time_str: msg.timeStr
    };
    await globalSupabase.from('messages').insert(payload);
  } catch (err) {
    console.warn("Supabase message sync notice:", err.message || err);
  }
}

async function syncAllCategoriesToSupabase() {
  if (!globalSupabase || !Array.isArray(categories)) return;
  try {
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      await globalSupabase.from('categories').upsert({
        id: c.id,
        label: c.name || c.label,
        order_index: c.order || i + 1
      }, { onConflict: 'id' });
    }
  } catch (err) {
    console.warn("Supabase categories sync notice:", err.message || err);
  }
}

async function syncAllVideosToSupabase() {
  if (!globalSupabase || !Array.isArray(videos)) return;
  try {
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      await globalSupabase.from('portfolio_videos').upsert({
        id: v.id,
        category: v.categoryId,
        title: v.title,
        client: v.client || "GanaCuts Visuals",
        aspect: v.aspect || "9:16",
        src: v.videoUrl,
        duration: v.duration || "",
        views: v.views || "",
        order_index: i
      }, { onConflict: 'id' });
    }
  } catch (err) {
    console.warn("Supabase videos sync notice:", err.message || err);
  }
}

async function fetchSupabaseCategories() {
  if (!globalSupabase) return;
  try {
    const { data, error } = await globalSupabase.from('categories').select('*').order('order_index', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) {
      categories = data.map(c => ({
        id: c.id,
        name: c.label,
        subtitle: c.subtitle || "HIGH-RETENTION EDITING & PACING",
        aspect: c.aspect || "9:16",
        order: c.order_index
      }));
      localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
      if (typeof renderPortfolio === 'function') renderPortfolio();
      if (typeof updateAdminUI === 'function') updateAdminUI();
    }
  } catch (err) {
    console.warn("Supabase fetch categories notice:", err.message || err);
  }
}

async function fetchSupabaseVideos() {
  if (!globalSupabase) return;
  try {
    const { data, error } = await globalSupabase.from('portfolio_videos').select('*').order('order_index', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) {
      videos = data.map(v => ({
        id: v.id,
        categoryId: v.category,
        title: v.title,
        duration: v.duration,
        videoUrl: v.src,
        thumbnail: v.thumbnail || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      }));
      localStorage.setItem(STORAGE_KEY_VIDS, JSON.stringify(videos));
      if (typeof renderPortfolio === 'function') renderPortfolio();
      if (typeof updateAdminUI === 'function') updateAdminUI();
    }
  } catch (err) {
    console.warn("Supabase fetch videos notice:", err.message || err);
  }
}

async function fetchSupabaseApplicants() {
  if (!globalSupabase) return;
  try {
    const { data, error } = await globalSupabase.from('applicants').select('*');
    if (!error && Array.isArray(data) && data.length > 0) {
      data.forEach(remote => {
        // Skip any legacy fake accounts
        if (remote.id === 'app_1' || remote.id === 'app_2' || remote.id === 'app_3') return;
        const localIdx = applicants.findIndex(a => a.id === remote.id || (remote.email && a.email && a.email.toLowerCase() === remote.email.toLowerCase()));
        const mapped = {
          id: remote.id,
          name: remote.name,
          email: remote.email,
          phone: remote.phone,
          city: remote.city,
          tools: remote.tools,
          portfolio: remote.portfolio,
          specialization: remote.specialization,
          rate: remote.rate,
          password: remote.password || "1234",
          status: remote.status,
          adminFeedback: remote.admin_feedback || remote.adminFeedback || "",
          appliedAt: remote.applied_at || remote.appliedAt,
          assignedProject: remote.assigned_project || remote.assignedProject || null,
          submittedDraft: remote.submitted_draft || remote.submittedDraft || null
        };
        if (localIdx >= 0) {
          applicants[localIdx] = { ...applicants[localIdx], ...mapped };
        } else {
          applicants.push(mapped);
        }
      });
      // Purge fake demo entries
      applicants = applicants.filter(a => a && a.id !== "app_1" && a.id !== "app_2" && a.id !== "app_3");
      localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applicants));
      if (typeof updateAdminUI === 'function') updateAdminUI();
    }
  } catch (err) {
    console.warn("Supabase fetch applicants notice:", err.message || err);
  }
}

async function fetchSupabaseMessages() {
  if (!globalSupabase) return;
  try {
    const { data, error } = await globalSupabase.from('messages').select('*').order('timestamp', { ascending: true });
    if (!error && Array.isArray(data) && data.length > 0) {
      const merged = [...messages];
      data.forEach(remote => {
        if (!merged.some(m => m.id === remote.id)) {
          merged.push({
            id: remote.id,
            editorId: remote.editor_id || remote.editorId,
            sender: remote.sender,
            senderName: remote.sender_name || remote.senderName,
            text: remote.text,
            timestamp: remote.timestamp,
            timeStr: remote.time_str || remote.timeStr
          });
        }
      });
      messages = merged.filter(m => m && !["msg_1", "msg_2", "msg_3", "msg_4", "msg_5"].includes(m.id));
      localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
      if (typeof renderAdminChatMessages === 'function') renderAdminChatMessages();
      if (typeof renderEditorChat === 'function') renderEditorChat();
    }
  } catch (err) {
    console.warn("Supabase fetch messages notice:", err.message || err);
  }
}

// Background persist to server disk (data/portfolio.json)
async function persistPortfolioToServer() {
  try {
    const payload = { categories, videos, profile };
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Non-blocking in serverless/static environments
  }
}

async function fetchRemotePortfolioData() {
  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const data = await res.json();
      let changed = false;
      if (data && Array.isArray(data.videos) && data.videos.length > 0) {
        videos = data.videos;
        localStorage.setItem(STORAGE_KEY_VIDS, JSON.stringify(videos));
        changed = true;
      }
      if (data && Array.isArray(data.categories) && data.categories.length > 0) {
        categories = data.categories;
        localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
        changed = true;
      }
      if (data && data.profile) {
        profile = { ...DEFAULT_PROFILE, ...data.profile };
        localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
        changed = true;
      }
      if (changed) {
        if (typeof renderPortfolio === 'function') renderPortfolio();
        if (typeof updateAdminUI === 'function') updateAdminUI();
      }
    }
  } catch (e) {
    try {
      const res2 = await fetch('/data/portfolio.json');
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && Array.isArray(data2.videos) && data2.videos.length > 0 && !localStorage.getItem(STORAGE_KEY_VIDS)) {
          videos = data2.videos;
          localStorage.setItem(STORAGE_KEY_VIDS, JSON.stringify(videos));
        }
        if (data2 && Array.isArray(data2.categories) && data2.categories.length > 0 && !localStorage.getItem(STORAGE_KEY_CATS)) {
          categories = data2.categories;
          localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
        }
      }
    } catch (e2) {}
  }
}

if (typeof window !== "undefined") {
  window.syncApplicantToSupabase = syncApplicantToSupabase;
  window.syncMessageToSupabase = syncMessageToSupabase;
  window.syncAllCategoriesToSupabase = syncAllCategoriesToSupabase;
  window.syncAllVideosToSupabase = syncAllVideosToSupabase;
  window.fetchSupabaseApplicants = fetchSupabaseApplicants;
  window.fetchSupabaseMessages = fetchSupabaseMessages;
  window.fetchSupabaseVideos = fetchSupabaseVideos;
  window.fetchSupabaseCategories = fetchSupabaseCategories;
  window.SUPABASE_CLIENT = globalSupabase;
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON = SUPABASE_ANON;
  window.MASTER_ADMIN_EMAIL = MASTER_ADMIN_EMAIL;
}

// Application State
let categories = [];
let videos = [];
let applicants = [];
let messages = [];
let profile = { ...DEFAULT_PROFILE };
let currentlyPlayingCardId = null;

// Initialize Storage
function initData() {
  const storedCats = localStorage.getItem(STORAGE_KEY_CATS);
  categories = storedCats ? JSON.parse(storedCats) : [...DEFAULT_CATEGORIES];
  if (!storedCats) saveCategories();

  const storedVids = localStorage.getItem(STORAGE_KEY_VIDS);
  videos = storedVids ? JSON.parse(storedVids) : [...DEFAULT_VIDEOS];
  if (!storedVids) saveVideos();

  const storedProf = localStorage.getItem(STORAGE_KEY_PROF);
  profile = storedProf ? JSON.parse(storedProf) : { ...DEFAULT_PROFILE };
  if (!profile.instaUrl) {
    profile.instaUrl = DEFAULT_PROFILE.instaUrl;
  }
  if (!profile.name || profile.name === "CUTSCALE MEDIA") {
    profile.name = DEFAULT_PROFILE.name;
    profile.tagline = DEFAULT_PROFILE.tagline;
  }
  saveProfile();

  const storedApps = localStorage.getItem(STORAGE_KEY_APPS);
  applicants = storedApps ? JSON.parse(storedApps) : [...DEFAULT_APPLICANTS];
  // Purge any legacy fake applicants (Suresh, Arjun, Kavya)
  applicants = applicants.filter(a => a && a.id !== "app_1" && a.id !== "app_2" && a.id !== "app_3");
  localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applicants));

  const storedMsgs = localStorage.getItem(STORAGE_KEY_MSGS);
  messages = storedMsgs ? JSON.parse(storedMsgs) : [...DEFAULT_MESSAGES];
  messages = messages.filter(m => m && !["msg_1", "msg_2", "msg_3", "msg_4", "msg_5"].includes(m.id));
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));

  // Asynchronously fetch latest permanent data from Server Disk & Supabase Cloud
  fetchRemotePortfolioData();
  fetchSupabaseCategories();
  fetchSupabaseVideos();
  fetchSupabaseApplicants();
  fetchSupabaseMessages();

  // Set up live real-time listeners on Supabase
  if (globalSupabase) {
    try {
      globalSupabase
        .channel('realtime_live_chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          const remote = payload.new;
          if (remote && !messages.some(m => m.id === remote.id)) {
            messages.push({
              id: remote.id,
              editorId: remote.editor_id,
              sender: remote.sender,
              senderName: remote.sender_name,
              text: remote.text,
              timestamp: remote.timestamp,
              timeStr: remote.time_str
            });
            localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
            if (typeof renderAdminChatMessages === 'function') renderAdminChatMessages();
            if (typeof renderEditorChat === 'function') renderEditorChat();
          }
        })
        .subscribe();

      globalSupabase
        .channel('realtime_applicants_tracker')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'applicants' }, () => {
          fetchSupabaseApplicants();
        })
        .subscribe();
    } catch (rtErr) {
      console.warn("Supabase realtime subscription notice:", rtErr);
    }
  }
}

function saveCategories() {
  localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
  syncAllCategoriesToSupabase();
  persistPortfolioToServer();
}

function saveVideos() {
  localStorage.setItem(STORAGE_KEY_VIDS, JSON.stringify(videos));
  syncAllVideosToSupabase();
  persistPortfolioToServer();
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
  persistPortfolioToServer();
}

function saveApplicants() {
  applicants = applicants.filter(a => a && a.id !== "app_1" && a.id !== "app_2" && a.id !== "app_3");
  localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applicants));
  if (typeof syncAllApplicantsToSupabase === 'function') {
    syncAllApplicantsToSupabase();
  }
}

function saveStoredMessages() {
  messages = messages.filter(m => m && !["msg_1", "msg_2", "msg_3", "msg_4", "msg_5"].includes(m.id));
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
}

function getStoredMessages() {
  const stored = localStorage.getItem(STORAGE_KEY_MSGS);
  return stored ? JSON.parse(stored) : [...DEFAULT_MESSAGES];
}

function sendAdminMessage(editorId, text) {
  const all = getStoredMessages();
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });

  const newMsg = {
    id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    editorId,
    sender: "admin",
    senderName: "Ganesh (Admin)",
    text,
    timestamp: Date.now(),
    timeStr
  };

  all.push(newMsg);
  messages = all;
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(all));
  syncMessageToSupabase(newMsg);
  return newMsg;
}

function sendEditorMessage(editorId, text, senderName = "Editor") {
  const all = getStoredMessages();
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });

  const newMsg = {
    id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    editorId,
    sender: "editor",
    senderName,
    text,
    timestamp: Date.now(),
    timeStr
  };

  all.push(newMsg);
  messages = all;
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(all));
  syncMessageToSupabase(newMsg);
  return newMsg;
}

if (typeof window !== "undefined") {
  window.getStoredMessages = getStoredMessages;
  window.sendAdminMessage = sendAdminMessage;
  window.sendEditorMessage = sendEditorMessage;
  window.saveApplicants = saveApplicants;
  window.saveStoredMessages = saveStoredMessages;
}

// Helpers
function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getThumbnail(video) {
  if (video.thumbnail && video.thumbnail.trim() !== "") return video.thumbnail;
  const ytId = extractYouTubeId(video.videoUrl);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80";
}

function getCategoryName(catId) {
  const cat = categories.find(c => c.id === catId);
  return cat ? cat.name : "Portfolio Reel";
}

// Render Entire Website
function renderPortfolio() {
  // 1. Profile Sync
  const navBrandEl = document.getElementById("nav-brand-name");
  if (navBrandEl) navBrandEl.textContent = "GANACUTS";
  const heroNameEl = document.getElementById("hero-name");
  if (heroNameEl) heroNameEl.textContent = profile.name || "GANACUTS VISUALS";
  const heroBadgeEl = document.getElementById("hero-badge");
  if (heroBadgeEl) heroBadgeEl.textContent = profile.badge || "POST-PRODUCTION & VISUALS";
  const heroTaglineEl = document.getElementById("hero-tagline");
  if (heroTaglineEl) heroTaglineEl.innerHTML = profile.tagline;
  const heroImgEl = document.getElementById("hero-profile-img");
  if (heroImgEl) heroImgEl.src = profile.photo;
  const heroWaEl = document.getElementById("hero-wa-btn");
  if (heroWaEl) heroWaEl.href = profile.waUrl;
  const navWaEl = document.getElementById("nav-wa-btn");
  if (navWaEl) navWaEl.href = profile.waUrl;
  const navHireBtn = document.getElementById("nav-hire-insta-btn");
  if (navHireBtn) navHireBtn.href = profile.instaUrl || DEFAULT_PROFILE.instaUrl;
  const heroInstaBtn = document.getElementById("hero-insta-btn");
  if (heroInstaBtn) heroInstaBtn.href = profile.instaUrl || DEFAULT_PROFILE.instaUrl;
  const footerInstaBtn = document.getElementById("footer-insta-btn");
  if (footerInstaBtn) footerInstaBtn.href = profile.instaUrl || DEFAULT_PROFILE.instaUrl;
  const modalInstaCta = document.getElementById("modal-insta-cta");
  if (modalInstaCta) modalInstaCta.href = profile.instaUrl || DEFAULT_PROFILE.instaUrl;

  // 2. Sort categories
  categories.sort((a, b) => a.order - b.order);

  // 3. Render Navbar Links
  const navContainer = document.getElementById("dynamic-nav-links");
  if (navContainer) {
    navContainer.innerHTML = categories.map(cat => `
      <a href="#section-${cat.id}" class="nav-link">${cat.name}</a>
    `).join("");
  }

  // 4. Render Dynamic Category Sections
  const mainContainer = document.getElementById("dynamic-categories-container");
  if (!mainContainer) {
    // Safe exit if not on main portfolio page
    updateAdminUI();
    return;
  }
  
  if (categories.length === 0) {
    mainContainer.innerHTML = `
      <section class="category-stream-section">
        <div class="container">
          <div class="empty-cat-box">
            <h3>No categories created yet</h3>
            <p>Open Admin Studio to create your first video category.</p>
          </div>
        </div>
      </section>
    `;
    return;
  }

  mainContainer.innerHTML = categories.map((cat, idx) => {
    const isAltBg = idx % 2 === 1 ? "alt-bg" : "";
    const badgeNum = String(idx + 1).padStart(2, '0');
    const catVideos = videos.filter(v => v.categoryId === cat.id);
    const isVertical = cat.aspect === "9:16";

    const gridClass = isVertical 
      ? (catVideos.length <= 2 ? "reels-feed-grid col-2-layout" : "reels-feed-grid")
      : "long-form-feed-grid";

    const cardClass = isVertical ? "reel-frame-card" : "long-frame-card";

    let gridContent = "";
    if (catVideos.length === 0) {
      gridContent = `
        <div class="empty-cat-box" style="grid-column: 1 / -1;">
          No videos published in this category yet. Click <strong>Admin Studio</strong> to add reels.
        </div>
      `;
    } else {
      gridContent = catVideos.map(v => createFrameHTML(v, cardClass, cat)).join("");
    }

    return `
      <section class="category-stream-section ${isAltBg}" id="section-${cat.id}">
        <div class="container">
          <div class="category-header">
            <div class="category-badge">CATEGORY ${badgeNum}</div>
            <h2 class="category-title">
              ${cat.name} <span class="accent-text">STYLES</span>
            </h2>
            <p class="category-subtitle">${cat.subtitle || ""}</p>
          </div>

          <div class="${gridClass}" id="grid-${cat.id}">
            ${gridContent}
          </div>
        </div>
      </section>
    `;
  }).join("");

  // 5. In-Card Instant Play
  document.querySelectorAll(".reel-frame-card, .long-frame-card").forEach(card => {
    const id = card.getAttribute("data-id");
    card.addEventListener("click", (e) => {
      if (e.target.closest(".ctrl-btn") || e.target.closest(".modal-hire-btn")) return;
      playVideoInCard(id, card);
    });
  });

  // 6. Update Admin UI
  updateAdminUI();
}

function createFrameHTML(v, cardClass, cat) {
  return `
    <div class="${cardClass}" data-id="${v.id}" id="card-${v.id}">
      <img src="${getThumbnail(v)}" alt="${v.title}" class="reel-thumbnail-img" loading="lazy">
      
      <div class="reel-overlay">
        <span class="reel-tag-badge">${v.duration || (cat.aspect === '9:16' ? '0:45' : '10:00')}</span>
        
        <div class="play-btn-circle" title="Play Video Immediately">
          <div class="play-triangle"></div>
        </div>

        <div class="reel-info-bottom">
          <h4 class="reel-title">${v.title}</h4>
        </div>
      </div>
    </div>
  `;
}

// In-Card Instant Player
function playVideoInCard(id, card) {
  const video = videos.find(v => v.id === id);
  if (!video) return;

  if (currentlyPlayingCardId && currentlyPlayingCardId !== id) {
    stopCardVideo(currentlyPlayingCardId);
  }

  const existingContainer = card.querySelector(".active-video-container");
  if (existingContainer) {
    const nativeVid = existingContainer.querySelector("video");
    if (nativeVid) {
      if (nativeVid.paused) {
        const p = nativeVid.play();
        if (p !== undefined) p.catch(() => {});
      } else {
        nativeVid.pause();
      }
      return;
    }
  }

  currentlyPlayingCardId = id;
  const ytId = extractYouTubeId(video.videoUrl);

  const container = document.createElement("div");
  container.className = "active-video-container";

  if (ytId) {
    container.innerHTML = `
      <div class="clean-yt-crop-box">
        <iframe 
          id="yt-player-${id}"
          src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <div class="video-control-overlay">
        <div class="video-control-top">
          <button type="button" class="ctrl-btn" onclick="openCinemaModal('${id}')" title="Full Cinema View" aria-label="Expand">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </button>
          <button type="button" class="ctrl-btn" onclick="stopCardVideo('${id}')" title="Close Video" aria-label="Close">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="video-control-bottom">
          <span class="playing-badge">▶ Playing</span>
          <a href="${profile.instaUrl || 'https://www.instagram.com/gana_cuts_visuals?dlrf=aXJlY3lsazhraHl4'}" target="_blank" rel="noopener" class="modal-hire-btn insta-modal-btn">
            <span>Hire ↗</span>
          </a>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <video class="clean-native-video" src="${video.videoUrl}" autoplay playsinline webkit-playsinline muted loop preload="auto"></video>
      <div class="video-control-overlay">
        <div class="video-control-top">
          <button type="button" class="ctrl-btn sound-toggle" title="Unmute Audio" aria-label="Toggle Sound">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          </button>
          <button type="button" class="ctrl-btn" onclick="openCinemaModal('${id}')" title="Full Cinema View" aria-label="Expand">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </button>
          <button type="button" class="ctrl-btn" onclick="stopCardVideo('${id}')" title="Close Video" aria-label="Close">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="video-control-bottom">
          <span class="playing-badge">▶ Playing</span>
          <a href="${profile.instaUrl || 'https://www.instagram.com/gana_cuts_visuals?dlrf=aXJlY3lsazhraHl4'}" target="_blank" rel="noopener" class="modal-hire-btn insta-modal-btn">
            <span>Hire ↗</span>
          </a>
        </div>
      </div>
    `;

    const vid = container.querySelector("video");
    const soundBtn = container.querySelector(".sound-toggle");
    if (vid) {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) p.catch(() => {});
    }

    if (soundBtn && vid) {
      soundBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        vid.muted = !vid.muted;
        if (vid.muted) {
          soundBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
          soundBtn.style.background = "rgba(0,0,0,0.7)";
          soundBtn.title = "Unmute Audio";
        } else {
          soundBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
          soundBtn.style.background = "rgba(16, 185, 129, 0.85)";
          soundBtn.title = "Mute Audio";
        }
      });
    }
  }

  card.appendChild(container);
}

window.stopCardVideo = function(id) {
  const card = document.getElementById(`card-${id}`);
  if (card) {
    const container = card.querySelector(".active-video-container");
    if (container) {
      const vid = container.querySelector("video");
      if (vid) {
        vid.pause();
        vid.src = "";
        vid.load();
      }
      container.remove();
    }
  }
  if (currentlyPlayingCardId === id) currentlyPlayingCardId = null;
};

// Cinema Modal
window.openCinemaModal = function(id) {
  const video = videos.find(v => v.id === id);
  if (!video) return;

  if (currentlyPlayingCardId) stopCardVideo(currentlyPlayingCardId);

  const cat = categories.find(c => c.id === video.categoryId);
  const isLongForm = cat && cat.aspect === "16:9";

  const modal = document.getElementById("video-modal");
  if (!modal) return;
  const card = modal.querySelector(".modal-card");
  const playerWrapper = document.getElementById("modal-player-wrapper");
  const titleEl = document.getElementById("modal-title");
  const categoryEl = document.getElementById("modal-category");
  const waCta = document.getElementById("modal-wa-cta");
  const instaCta = document.getElementById("modal-insta-cta");

  if (card) {
    if (isLongForm) card.classList.add("wide");
    else card.classList.remove("wide");
  }

  if (titleEl) titleEl.textContent = video.title;
  if (categoryEl) categoryEl.textContent = `${getCategoryName(video.categoryId)} • ${video.duration || '0:45'}`;
  if (waCta) waCta.href = `https://wa.me/917075081947?text=Hi%20Ganesh,%20I%20like%20this%20edit:%20"${encodeURIComponent(video.title)}".%20I%20would%20like%20to%20hire%20you%20for%20a%20video%20editing%20project.`;
  if (instaCta) instaCta.href = profile.instaUrl || "https://www.instagram.com/gana_cuts_visuals?dlrf=aXJlY3lsazhraHl4";

  const ytId = extractYouTubeId(video.videoUrl);
  if (ytId) {
    playerWrapper.innerHTML = `
      <div class="clean-yt-crop-box" style="top:-55px; height:calc(100% + 110px); pointer-events:auto;">
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  } else {
    playerWrapper.innerHTML = `
      <video controls autoplay playsinline webkit-playsinline style="width:100%;height:100%;object-fit:contain;" preload="auto">
        <source src="${video.videoUrl}" type="video/mp4">
      </video>
    `;
    const mVid = playerWrapper.querySelector("video");
    if (mVid) {
      const p = mVid.play();
      if (p !== undefined) p.catch(() => {});
    }
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

function closeCinemaModal() {
  const modal = document.getElementById("video-modal");
  const playerWrapper = document.getElementById("modal-player-wrapper");
  if (modal) modal.classList.remove("active");
  if (playerWrapper) {
    const vid = playerWrapper.querySelector("video");
    if (vid) {
      vid.pause();
      vid.src = "";
      vid.load();
    }
    playerWrapper.innerHTML = "";
  }
  document.body.style.overflow = "";
}

// ==========================================================================
// ADMIN DASHBOARD & APPLICANTS MANAGEMENT
// ==========================================================================

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updateAdminUI() {
  const totalCats = categories.length;
  const totalVids = videos.length;
  const totalApps = applicants.length;
  const pendingApps = applicants.filter(a => a.status === "pending").length;
  const selectedApps = applicants.filter(a => a.status === "selected").length;
  const trialApps = applicants.filter(a => a.status === "trial").length;

  safeSetText("stat-total-categories", totalCats);
  safeSetText("stat-total-videos", totalVids);
  safeSetText("stat-total-applicants", `${totalApps} Total`);
  safeSetText("stat-selected-count", `${selectedApps} Selected`);
  safeSetText("dash-category-count", totalCats);
  safeSetText("dash-video-count", totalVids);
  safeSetText("dash-applicants-badge", totalApps);
  safeSetText("dash-applicants-total", totalApps);
  safeSetText("dash-sheet-badge", `${selectedApps} Selected`);
  safeSetText("cta-sheet-selected-count", selectedApps);
  safeSetText("cta-app-count", pendingApps);
  safeSetText("dash-list-count", totalVids);

  safeSetText("sheet-kpi-selected", selectedApps);
  safeSetText("sheet-kpi-total", totalApps);
  safeSetText("sheet-kpi-trial", trialApps);
  safeSetText("sheet-kpi-pending", pendingApps);
  safeSetText("sheet-count-all", totalApps);
  safeSetText("sheet-count-selected", selectedApps);
  safeSetText("sheet-count-trial", trialApps);
  safeSetText("sheet-count-pending", pendingApps);

  // Video select
  const catSelect = document.getElementById("dash-video-category");
  if (catSelect) {
    catSelect.innerHTML = categories.map((c, i) => `
      <option value="${c.id}">${i + 1}. ${c.name} (${c.aspect})</option>
    `).join("");
  }

  // Profile Settings Form fields sync
  const profNameInput = document.getElementById("profile-name");
  if (profNameInput) profNameInput.value = profile.name || "GANACUTS VISUALS";
  const profBadgeInput = document.getElementById("profile-badge");
  if (profBadgeInput) profBadgeInput.value = profile.badge || "POST-PRODUCTION & VISUALS";
  const profTaglineInput = document.getElementById("profile-tagline");
  if (profTaglineInput) profTaglineInput.value = profile.tagline || "";
  const profPhotoInput = document.getElementById("profile-photo-url");
  if (profPhotoInput) profPhotoInput.value = profile.photo || "assets/logo.jpg";
  const profWaInput = document.getElementById("profile-wa-url");
  if (profWaInput) profWaInput.value = profile.waUrl || "";
  const profInstaInput = document.getElementById("profile-insta-url");
  if (profInstaInput) profInstaInput.value = profile.instaUrl || "https://www.instagram.com/gana_cuts_visuals?dlrf=aXJlY3lsazhraHl4";

  renderCategoriesManager();
  renderVideosManager();
  renderApplicantsManager();
  renderAgencySheet();
}

// Render Applicants Roster in Admin Studio
function renderApplicantsManager() {
  const listEl = document.getElementById("applicants-manage-list");
  if (!listEl) return;

  if (applicants.length === 0) {
    listEl.innerHTML = `
      <div class="empty-cat-box">
        <h4>No editor applications received yet</h4>
        <p>When video editors click "Join as Editor" on your website and submit their details, they appear here.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = applicants.map(app => {
    const statusClass = `status-${app.status || 'pending'}`;
    const cleanPhone = (app.phone || "").replace(/\D/g, "");

    // Dynamic tailored WhatsApp text based on stage
    let waTextMsg = `Hi ${app.name}, this is Ganesh. We reviewed your editor portfolio (${app.specialization}) and wanted to connect with you.`;
    if (app.status === 'trial') {
      waTextMsg = `Hi ${app.name}, this is Ganesh. Great news! Your portfolio passed our initial review. We have a paid trial video project ready for you. Let's discuss details and footage delivery.`;
    } else if (app.status === 'selected') {
      waTextMsg = `Hi ${app.name}, congratulations! You've been officially selected to join our creative editing team. We have projects lined up and want to coordinate your availability.`;
    }

    const waLink = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(waTextMsg)}`;

    return `
      <div class="applicant-card" id="app-card-${app.id}">
        <div class="applicant-top-bar">
          <div class="applicant-name-group">
            <span class="applicant-name">${app.name}</span>
            <span class="status-badge ${statusClass}">${app.status || 'pending'}</span>
            <span style="font-size:11px; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:6px; color:#888;">PIN: ${app.password || '1234'}</span>
          </div>
          <span class="applied-date">${app.appliedAt || 'Recently Applied'}</span>
        </div>

        <div class="applicant-details-grid">
          <div class="applicant-detail-item">
            <strong>Location & Contact</strong>
            <span>📍 ${app.city} • 📞 ${app.phone}</span>
          </div>
          <div class="applicant-detail-item">
            <strong>Specialization & Tools</strong>
            <span>🎬 ${app.specialization} (${app.tools})</span>
          </div>
          <div class="applicant-detail-item">
            <strong>Expected Pay</strong>
            <span>💰 ${app.rate || 'Negotiable'}</span>
          </div>
        </div>

        ${app.notes ? `<div style="font-size:12px;color:var(--text-secondary);background:rgba(0,0,0,0.03);padding:8px 12px;border-radius:8px;"><strong>Applicant Note:</strong> ${app.notes}</div>` : ''}

        <!-- Active Assigned Project View -->
        ${app.assignedProject ? `
          <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:10px 12px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong style="color:#10b981;">PROJECT ASSIGNED: ${app.assignedProject.title}</strong>
              <span style="font-weight:700; color:#10b981;">${app.assignedProject.payout || app.rate || '₹1,000'}</span>
            </div>
            <div style="color:var(--text-secondary); margin-bottom:6px;">${app.assignedProject.instructions || ''}</div>
            <a href="${app.assignedProject.footageUrl}" target="_blank" style="color:var(--accent-orange); font-weight:700; text-decoration:none;">Inspect Raw Footage Link ↗</a>
          </div>
        ` : ''}

        <!-- Submitted Draft for Ganesh to Review -->
        ${app.submittedDraft ? `
          <div style="background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.3); border-radius:8px; padding:10px 12px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong style="color:#60a5fa;">🎬 SUBMITTED VIDEO DRAFT FOR REVIEW:</strong>
              <span style="color:#94a3b8; font-size:11px;">${app.submittedDraft.date}</span>
            </div>
            <div style="margin-bottom:6px;"><strong>Note:</strong> ${app.submittedDraft.notes || 'None'}</div>
            <div style="display:flex; gap:10px; align-items:center;">
              <a href="${app.submittedDraft.url}" target="_blank" class="primary-btn" style="padding:4px 10px; font-size:11px; text-decoration:none;">Review Video Cut ↗</a>
              <button onclick="approveEditorDraft('${app.id}')" class="secondary-btn" style="padding:4px 10px; font-size:11px; color:#10b981; border-color:#10b981;">Approve Cut & Hire to Roster ✓</button>
            </div>
          </div>
        ` : ''}

        <!-- Admin Feedback for applicant status view -->
        <div style="background:rgba(217,78,40,0.05);border:1px solid rgba(217,78,40,0.2);padding:10px 12px;border-radius:8px;margin-top:4px;">
          <label style="font-size:11px;font-weight:700;color:var(--accent-orange);display:block;margin-bottom:4px;">ADMIN FEEDBACK (Visible to Editor in Status Tracker):</label>
          <div style="display:flex;gap:8px;">
            <input type="text" id="admin-feedback-${app.id}" placeholder="e.g. Sent sample raw footage on WhatsApp. Submit rough cut by 27 Oct" value="${app.adminFeedback || ''}" style="flex:1;padding:6px 10px;font-size:12px;border-radius:6px;border:1px solid var(--border-subtle);background:#fff;">
            <button class="primary-btn" style="padding:6px 12px;font-size:11px;white-space:nowrap;" onclick="saveApplicantFeedback('${app.id}')">Save Note</button>
          </div>
        </div>

        <div class="applicant-actions-bar">
          <div class="applicant-action-left" style="flex-wrap:wrap;">
            <a href="${app.portfolio}" target="_blank" rel="noopener" class="portfolio-link-btn" title="Inspect Editor Work">
              <span>View Portfolio ↗</span>
            </a>
            <a href="${waLink}" target="_blank" rel="noopener" class="wa-msg-btn" title="Contact on WhatsApp">
              <span>Chat on WhatsApp</span>
            </a>
            <button class="primary-btn" onclick="openChatWithEditor('${app.id}')" style="padding:6px 12px; font-size:11px; background:linear-gradient(135deg, var(--accent-orange), #ea580c); color:#fff;" title="Chat directly in Portal">💬 Chat / Send Notes</button>
            <button class="secondary-btn light-btn" onclick="assignProjectToEditor('${app.id}')" style="padding:6px 12px; font-size:11px;" title="Assign test clip or client video">+ Assign Project</button>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <select class="status-select" onchange="updateApplicantStatus('${app.id}', this.value)">
              <option value="pending" ${app.status === 'pending' ? 'selected' : ''}>⏳ Pending Review</option>
              <option value="trial" ${app.status === 'trial' ? 'selected' : ''}>🎯 Trial Clip Sent</option>
              <option value="selected" ${app.status === 'selected' ? 'selected' : ''}>✅ Selected / Hired</option>
              <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
            </select>
            <button class="delete-btn" onclick="deleteApplicant('${app.id}')">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Update Applicant Status
window.updateApplicantStatus = function(id, newStatus) {
  const app = applicants.find(a => a.id === id);
  if (app) {
    app.status = newStatus;
    if (newStatus === "selected") {
      app.adminFeedback = "Congratulations! You have been officially selected and hired into the GanaCuts Visuals active agency roster.";
    } else if (newStatus === "trial") {
      app.adminFeedback = "Trial video project in progress. Raw footage and timeline details shared.";
    }
    saveApplicants();
    updateAdminUI();
  }
};

// ==========================================================================
// AGENCY GOOGLE SPREADSHEET ENGINE & SELECTION TRACKER
// Target Admin Account: designsbygani@gmail.com
// ==========================================================================

let currentSheetFilter = "all";
let currentSheetSearch = "";

window.filterSheetByStatus = function(status) {
  currentSheetFilter = status;
  document.querySelectorAll(".sheet-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === status);
  });
  renderAgencySheet(currentSheetFilter, currentSheetSearch);
};

window.handleSheetSearch = function(query) {
  currentSheetSearch = (query || "").trim().toLowerCase();
  renderAgencySheet(currentSheetFilter, currentSheetSearch);
};

window.updateApplicantStatusFromSheet = function(id, newStatus) {
  const app = applicants.find(a => a.id === id);
  if (app) {
    app.status = newStatus;
    if (newStatus === "selected") {
      app.adminFeedback = "Congratulations! You have been officially selected and hired into the GanaCuts Visuals active agency roster.";
    } else if (newStatus === "trial") {
      app.adminFeedback = "Trial video project approved / in progress. Keep up the high standard!";
    }
    saveApplicants();
    updateAdminUI();
  }
};

window.renderAgencySheet = function(filter = currentSheetFilter, searchQuery = currentSheetSearch) {
  const tbody = document.getElementById("agency-spreadsheet-body");
  if (!tbody) return;

  const totalApps = applicants.length;
  const selectedApps = applicants.filter(a => a.status === "selected").length;
  const trialApps = applicants.filter(a => a.status === "trial").length;
  const pendingApps = applicants.filter(a => a.status === "pending").length;

  safeSetText("sheet-count-all", totalApps);
  safeSetText("sheet-count-selected", selectedApps);
  safeSetText("sheet-count-trial", trialApps);
  safeSetText("sheet-count-pending", pendingApps);
  safeSetText("sheet-kpi-selected", selectedApps);
  safeSetText("sheet-kpi-total", totalApps);
  safeSetText("sheet-kpi-trial", trialApps);
  safeSetText("sheet-kpi-pending", pendingApps);
  safeSetText("stat-selected-count", `${selectedApps} Selected`);
  safeSetText("dash-sheet-badge", `${selectedApps} Selected`);
  safeSetText("cta-sheet-selected-count", selectedApps);

  // Filter list
  let filtered = [...applicants];
  if (filter !== "all") {
    filtered = filtered.filter(a => (a.status || "pending") === filter);
  }

  if (searchQuery) {
    filtered = filtered.filter(a => {
      const q = searchQuery.toLowerCase();
      return (a.name || "").toLowerCase().includes(q) ||
        (a.email || "").toLowerCase().includes(q) ||
        (a.phone || "").includes(q) ||
        (a.tools || "").toLowerCase().includes(q) ||
        (a.specialization || "").toLowerCase().includes(q) ||
        (a.city || "").toLowerCase().includes(q) ||
        (a.notes || "").toLowerCase().includes(q);
    });
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" style="text-align:center; padding:36px 20px; color:#888894; font-size:13px;">
          No agency editors found matching filter "<strong>${escapeHtml(filter)}</strong>"${searchQuery ? ` and search query "<strong>${escapeHtml(searchQuery)}</strong>"` : ""}.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((app, idx) => {
    const status = app.status || "pending";
    const cleanPhone = (app.phone || "").replace(/\D/g, "");
    const waPhone = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;
    const email = app.email || `${(app.name || "editor").toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`;
    const isSelected = status === "selected";
    const rowClass = isSelected ? "row-selected" : "";

    let waText = `Hi ${app.name}, this is Ganesh from GanaCuts Visuals.`;
    if (isSelected) {
      waText = `Hi ${app.name}, this is Ganesh from GanaCuts Visuals. Congratulations on being selected in our agency roster! Let's connect on upcoming client projects.`;
    }

    return `
      <tr class="${rowClass}">
        <td style="color:#71717a; font-weight:700;">${idx + 1}</td>
        <td>
          <select class="sheet-status-select ${status}" onchange="updateApplicantStatusFromSheet('${app.id}', this.value)">
            <option value="selected" ${status === "selected" ? "selected" : ""}>✓ Selected & Hired</option>
            <option value="trial" ${status === "trial" ? "selected" : ""}>⚡ Paid Trial</option>
            <option value="pending" ${status === "pending" ? "selected" : ""}>⏳ Pending Review</option>
            <option value="rejected" ${status === "rejected" ? "selected" : ""}>✕ Rejected</option>
          </select>
        </td>
        <td>
          <div style="font-weight:700; color:#fff;">${escapeHtml(app.name)}</div>
          <div style="font-size:11px; color:#888;">${escapeHtml(app.city || "Remote")}</div>
        </td>
        <td>
          <a href="mailto:${encodeURIComponent(email)}" style="color:#60a5fa; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
            <span>${escapeHtml(email)}</span>
          </a>
        </td>
        <td>
          <a href="https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener" style="color:#34d399; text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-weight:600;">
            <span>💬 +${waPhone}</span>
          </a>
        </td>
        <td style="color:#d4d4d8;">${escapeHtml(app.tools || "Premiere Pro / DaVinci")}</td>
        <td style="font-weight:600; color:#e4e4e7;">${escapeHtml(app.specialization || "Video Editing")}</td>
        <td style="color:#fbbf24; font-weight:700;">${escapeHtml(app.rate || "₹800")}</td>
        <td>
          <a href="${app.portfolio}" target="_blank" rel="noopener" class="portfolio-link-btn" style="padding:4px 10px; font-size:11px;">
            <span>Drive / Links ↗</span>
          </a>
        </td>
        <td style="font-size:11px; color:#a1a1aa;">${escapeHtml(app.appliedAt || "Recent")}</td>
        <td>
          <div style="display:flex; gap:6px;">
            <button type="button" class="quick-reply-pill" onclick="openChatWithEditor('${app.id}')" title="Chat directly in Admin Studio" style="padding:4px 8px; font-size:11px;">
              Chat 💬
            </button>
            <button type="button" class="quick-reply-pill" onclick="assignProjectToEditor('${app.id}')" title="Assign project to this editor" style="padding:4px 8px; font-size:11px; background:rgba(59,130,246,0.15); color:#60a5fa; border-color:rgba(59,130,246,0.3);">
              Task +
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
};

// Export to CSV for Google Sheets
window.exportAgencyRosterToCSV = function() {
  if (applicants.length === 0) {
    alert("No editors currently in agency roster to export.");
    return;
  }

  const headers = [
    "Row No.",
    "Status",
    "Editor Name",
    "Gmail / Email",
    "WhatsApp Phone",
    "City / Location",
    "Editing Software",
    "Specialization Style",
    "Expected Rate",
    "Portfolio Link",
    "Applied Date",
    "Admin Feedback & Notes"
  ];

  const rows = applicants.map((app, index) => {
    const cleanPhone = (app.phone || "").replace(/\D/g, "");
    const email = app.email || `${(app.name || "editor").toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`;
    return [
      index + 1,
      app.status || "pending",
      app.name || "",
      email,
      cleanPhone ? `+${cleanPhone}` : "",
      app.city || "",
      app.tools || "",
      app.specialization || "",
      app.rate || "",
      app.portfolio || "",
      app.appliedAt || "",
      app.adminFeedback || app.notes || ""
    ];
  });

  const csvContent = "\uFEFF" + [headers, ...rows]
    .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().slice(0, 10);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ganacuts_agency_roster_designsbygani_${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert(`✓ Google Sheet CSV downloaded!\nFile: ganacuts_agency_roster_designsbygani_${dateStr}.csv\n\nYou can upload or open this directly in Google Drive under designsbygani@gmail.com.`);
};

// Copy TSV for 1-Click Paste into Google Sheets
window.copySheetDataForGoogleSheets = function() {
  if (applicants.length === 0) {
    alert("No editors to copy.");
    return;
  }

  const headers = [
    "No.",
    "Status",
    "Editor Name",
    "Gmail / Email",
    "WhatsApp Phone",
    "City",
    "Editing Tools",
    "Specialization",
    "Rate",
    "Portfolio Link",
    "Applied Date"
  ];

  const rows = applicants.map((app, index) => {
    const cleanPhone = (app.phone || "").replace(/\D/g, "");
    const email = app.email || `${(app.name || "editor").toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`;
    return [
      index + 1,
      app.status || "pending",
      app.name || "",
      email,
      cleanPhone ? `+${cleanPhone}` : "",
      app.city || "",
      app.tools || "",
      app.specialization || "",
      app.rate || "",
      app.portfolio || "",
      app.appliedAt || ""
    ];
  });

  const tsv = [headers, ...rows]
    .map(row => row.map(val => String(val).replace(/[\t\r\n]/g, " ")).join("\t"))
    .join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(tsv).then(() => {
      alert("✓ Copied to Clipboard in Google Sheets format!\n\nOpen your Google Sheet under designsbygani@gmail.com and press Ctrl+V to paste all columns and rows.");
    }).catch(() => {
      prompt("Copy table data below and paste into Google Sheets:", tsv);
    });
  } else {
    prompt("Copy table data below and paste into Google Sheets:", tsv);
  }
};

// Email Summary Report to designsbygani@gmail.com
window.sendSheetEmailToGani = function() {
  const selectedList = applicants.filter(a => a.status === "selected");
  const trialList = applicants.filter(a => a.status === "trial");
  const pendingList = applicants.filter(a => a.status === "pending");

  const subject = encodeURIComponent(`GanaCuts Visuals — Agency Editor Roster Report (${selectedList.length} Selected Editors)`);

  let body = `GANACUTS VISUALS — AGENCY ROSTER REPORT\n`;
  body += `Founder: Ganesh (designsbygani@gmail.com)\n`;
  body += `Generated: ${new Date().toLocaleString()}\n`;
  body += `===================================================\n\n`;
  body += `SELECTED & HIRED IN AGENCY (${selectedList.length}):\n`;
  if (selectedList.length === 0) {
    body += `None marked as selected yet.\n`;
  } else {
    selectedList.forEach((e, i) => {
      body += `${i + 1}. ${e.name} — ${e.email || 'N/A'} — Phone: ${e.phone} — Rate: ${e.rate || '₹800'} — Style: ${e.specialization}\n   Portfolio: ${e.portfolio}\n`;
    });
  }

  body += `\nIN PAID TRIAL (${trialList.length}):\n`;
  trialList.forEach((e, i) => {
    body += `${i + 1}. ${e.name} — Phone: ${e.phone} — Style: ${e.specialization}\n`;
  });

  body += `\nAWAITING REVIEW (${pendingList.length}):\n`;
  pendingList.forEach((e, i) => {
    body += `${i + 1}. ${e.name} — Phone: ${e.phone} — Style: ${e.specialization}\n`;
  });

  body += `\n===================================================\n`;
  body += `Total Editors in Database: ${applicants.length}\n`;
  body += `Open Admin Studio: http://localhost:3000/admin\n`;

  window.location.href = `mailto:designsbygani@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
};

// Toggle Google Sync instructions dropdown
window.toggleGoogleSyncInstructions = function() {
  const box = document.getElementById("google-sync-instructions");
  const icon = document.getElementById("sync-toggle-icon");
  if (!box) return;
  const isHidden = box.classList.contains("hidden");
  if (isHidden) {
    box.classList.remove("hidden");
    if (icon) icon.textContent = "▲";
    const webhookInput = document.getElementById("google-sheet-webhook-url");
    if (webhookInput) {
      webhookInput.value = localStorage.getItem("cutscale_gsheet_webhook") || "";
    }
  } else {
    box.classList.add("hidden");
    if (icon) icon.textContent = "▼";
  }
};

// Save Webhook URL
window.saveGoogleSheetWebhook = function() {
  const input = document.getElementById("google-sheet-webhook-url");
  const statusEl = document.getElementById("webhook-save-status");
  if (!input) return;
  const url = input.value.trim();
  localStorage.setItem("cutscale_gsheet_webhook", url);
  if (statusEl) {
    statusEl.style.display = "block";
    statusEl.textContent = url ? "✓ Webhook URL saved! New applicants will automatically sync to your Google Sheet." : "✓ Webhook cleared.";
    setTimeout(() => { statusEl.style.display = "none"; }, 4000);
  }
};

// Auto-sync single applicant to Google Sheet Webhook if configured
function syncApplicantToGoogleSheet(applicant) {
  const webhookUrl = localStorage.getItem("cutscale_gsheet_webhook");
  if (!webhookUrl) return;
  try {
    fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicant)
    }).catch(err => console.log("Google Sheet sync notice:", err));
  } catch (e) {}
}

// Assign Project / Paid Trial to Editor
window.assignProjectToEditor = function(id) {
  const app = applicants.find(a => a.id === id);
  if (!app) return;

  const title = prompt(`Assign project title to ${app.name} (e.g. Kokapet Luxury Villa 30s Reel):`, "Real Estate Luxury Villa Reel");
  if (!title) return;

  const footageUrl = prompt("Enter Google Drive / Dropbox raw footage link for editor to download:", "https://drive.google.com/drive/folders/sample-footage");
  if (!footageUrl) return;

  const payout = prompt(`Enter payout amount for this edit (e.g. ₹800 - ₹1,200):`, app.rate || "₹1,000");
  const instructions = prompt("Enter editing instructions / music / style notes:", "Cut to 128 BPM beat, add kinetic subtitles, color grade in DaVinci.");

  app.assignedProject = {
    title,
    footageUrl,
    payout: payout || "₹1,000",
    instructions: instructions || "High-retention video edit.",
    deadline: "24-48 Hours"
  };
  app.status = "trial";
  app.adminFeedback = `Project assigned: "${title}". Raw footage link added to your workspace.`;

  saveApplicants();
  updateAdminUI();
  alert(`✓ Project "${title}" successfully assigned to ${app.name}! They will see the raw footage link and instructions inside their Editor Portal.`);
};

// Approve submitted draft
window.approveEditorDraft = function(id) {
  const app = applicants.find(a => a.id === id);
  if (app) {
    app.status = "selected";
    app.adminFeedback = "Congratulations! Your video cut has been approved with distinction. You are now an active editor on the GanaCuts Visuals roster!";
    saveApplicants();
    updateAdminUI();
    alert(`✓ ${app.name}'s draft approved! Status upgraded to Selected / Hired.`);
  }
};

// Save Admin Feedback for Applicant
window.saveApplicantFeedback = function(id) {
  const input = document.getElementById(`admin-feedback-${id}`);
  if (!input) return;
  const app = applicants.find(a => a.id === id);
  if (app) {
    app.adminFeedback = input.value.trim();
    saveApplicants();
    alert(`✓ Note saved for ${app.name}! They will see this message when checking their status.`);
  }
};

window.deleteApplicant = function(id) {
  if (confirm("Remove this applicant from the agency roster?")) {
    applicants = applicants.filter(a => a.id !== id);
    saveApplicants();
    updateAdminUI();
  }
};

// Category Manager (List, Reorder, Edit, Delete)
function renderCategoriesManager() {
  const listEl = document.getElementById("categories-manage-list");
  if (!listEl) return;

  if (categories.length === 0) {
    listEl.innerHTML = `<p style="padding:16px;text-align:center;color:var(--text-muted);">No categories created. Add one above.</p>`;
    return;
  }

  listEl.innerHTML = categories.map((cat, idx) => {
    const vCount = videos.filter(v => v.categoryId === cat.id).length;
    const isFirst = idx === 0;
    const isLast = idx === categories.length - 1;

    return `
      <div class="cat-item-card" data-cat-id="${cat.id}">
        <div class="cat-left-info">
          <div class="cat-order-badge">${idx + 1}</div>
          <div class="cat-titles">
            <h5>${cat.name}</h5>
            <small>${cat.subtitle || "No subtitle"} • <span class="badge-pill">${cat.aspect}</span> • ${vCount} Reels</small>
          </div>
        </div>

        <div class="cat-right-actions">
          <button class="reorder-btn" onclick="moveCategory('${cat.id}', 'up')" ${isFirst ? 'disabled style="opacity:0.3;"' : ''} title="Move Up">↑</button>
          <button class="reorder-btn" onclick="moveCategory('${cat.id}', 'down')" ${isLast ? 'disabled style="opacity:0.3;"' : ''} title="Move Down">↓</button>
          <button class="edit-btn" onclick="editCategory('${cat.id}')">Edit</button>
          <button class="delete-btn" onclick="deleteCategory('${cat.id}')">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

// Category Submit
const dashCatForm = document.getElementById("dash-category-form");
if (dashCatForm) {
  dashCatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("edit-cat-id").value;
    const name = document.getElementById("cat-name").value.trim();
    const subtitle = document.getElementById("cat-subtitle").value.trim();
    const aspect = document.getElementById("cat-aspect").value;

    if (editId) {
      const cat = categories.find(c => c.id === editId);
      if (cat) {
        cat.name = name;
        cat.subtitle = subtitle;
        cat.aspect = aspect;
        saveCategories();
        alert(`✓ Category "${name}" updated successfully!`);
      }
      cancelEditCategory();
    } else {
      categories.push({
        id: "cat_" + Date.now(),
        name,
        subtitle,
        aspect,
        order: categories.length + 1
      });
      saveCategories();
      dashCatForm.reset();
      alert(`✓ Category "${name}" created and added to live website!`);
    }
    renderPortfolio();
  });
}

window.editCategory = function(id) {
  const cat = categories.find(c => c.id === id);
  if (!cat) return;

  document.getElementById("edit-cat-id").value = cat.id;
  document.getElementById("cat-name").value = cat.name;
  document.getElementById("cat-subtitle").value = cat.subtitle;
  document.getElementById("cat-aspect").value = cat.aspect;

  document.getElementById("cat-form-title").textContent = `Edit Category: ${cat.name}`;
  document.getElementById("cat-submit-btn").textContent = "Save Changes";
  document.getElementById("cat-cancel-btn").classList.remove("hidden");
  document.getElementById("dash-category-form").scrollIntoView({ behavior: 'smooth' });
};

window.cancelEditCategory = function() {
  document.getElementById("edit-cat-id").value = "";
  document.getElementById("dash-category-form").reset();
  document.getElementById("cat-form-title").textContent = "+ Add New Portfolio Category";
  document.getElementById("cat-submit-btn").textContent = "Create Category";
  document.getElementById("cat-cancel-btn").classList.add("hidden");
};

window.deleteCategory = function(id) {
  const cat = categories.find(c => c.id === id);
  if (!cat) return;
  const vCount = videos.filter(v => v.categoryId === id).length;
  if (confirm(`Delete category "${cat.name}" and remove its section from the website? (${vCount} video(s) will also be removed)`)) {
    categories = categories.filter(c => c.id !== id);
    videos = videos.filter(v => v.categoryId !== id);
    categories.forEach((c, i) => c.order = i + 1);
    saveCategories();
    saveVideos();
    renderPortfolio();
  }
};

window.moveCategory = function(id, direction) {
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) return;

  if (direction === "up" && idx > 0) {
    const temp = categories[idx];
    categories[idx] = categories[idx - 1];
    categories[idx - 1] = temp;
  } else if (direction === "down" && idx < categories.length - 1) {
    const temp = categories[idx];
    categories[idx] = categories[idx + 1];
    categories[idx + 1] = temp;
  }

  categories.forEach((c, i) => c.order = i + 1);
  saveCategories();
  renderPortfolio();
};

// Video Manager
function renderVideosManager() {
  const listEl = document.getElementById("dash-manage-list");
  if (!listEl) return;

  if (videos.length === 0) {
    listEl.innerHTML = `<p style="padding:16px;text-align:center;color:var(--text-muted);">No videos currently published.</p>`;
    return;
  }

  listEl.innerHTML = videos.map(v => `
    <div class="manage-item">
      <div class="manage-item-info">
        <img src="${getThumbnail(v)}" class="manage-thumb" alt="">
        <div>
          <div class="manage-item-title">${v.title}</div>
          <div class="manage-item-meta">${getCategoryName(v.categoryId)} • ${v.duration || '0:45'}</div>
        </div>
      </div>
      <button class="delete-btn" onclick="deleteVideo('${v.id}')">Delete</button>
    </div>
  `).join("");
}

window.deleteVideo = function(id) {
  if (confirm("Remove this video from your live portfolio?")) {
    videos = videos.filter(v => v.id !== id);
    saveVideos();
    renderPortfolio();
  }
};

// Tab Switching
window.switchAdminTab = function(tabName) {
  document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".admin-tab-pane").forEach(p => p.classList.remove("active"));

  const tabBtn = document.querySelector(`.admin-tab[data-tab="${tabName}"]`);
  const targetPane = document.getElementById(`pane-${tabName}`);
  if (tabBtn) tabBtn.classList.add("active");
  if (targetPane) targetPane.classList.add("active");
  if (tabName === "sheet" && typeof renderAgencySheet === "function") {
    renderAgencySheet();
  }
};

// ==========================================================================
// EDITOR PORTAL & REAL-TIME STATUS TRACKER ENGINE
// ==========================================================================

// Switch between Submit Application and Check Status tabs
window.switchPortalTab = function(tab) {
  const btnApply = document.getElementById("tab-btn-apply");
  const btnTrack = document.getElementById("tab-btn-track");
  const viewApply = document.getElementById("portal-view-apply");
  const viewTrack = document.getElementById("portal-view-track");

  if (!btnApply || !btnTrack || !viewApply || !viewTrack) return;

  if (tab === "apply") {
    btnApply.classList.add("active");
    btnTrack.classList.remove("active");
    viewApply.classList.add("active");
    viewApply.classList.remove("hidden");
    viewTrack.classList.remove("active");
    viewTrack.classList.add("hidden");
  } else {
    btnTrack.classList.add("active");
    btnApply.classList.remove("active");
    viewTrack.classList.add("active");
    viewTrack.classList.remove("hidden");
    viewApply.classList.remove("active");
    viewApply.classList.add("hidden");

    const input = document.getElementById("lookup-phone");
    if (input) setTimeout(() => input.focus(), 150);
  }
};

// Modal helpers with tab selection
window.openJoinModal = function(tab = 'apply') {
  const modal = document.getElementById("join-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    switchPortalTab(tab);
  }
};

window.closeJoinModal = function() {
  const modal = document.getElementById("join-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Real-Time Application Status Lookup & Stepper Renderer
function performStatusLookup(query) {
  const resultArea = document.getElementById("status-result-area");
  if (!resultArea) return;

  const rawQuery = (query || "").trim().toLowerCase();
  const cleanDigits = rawQuery.replace(/\D/g, "");
  const isEmail = rawQuery.includes("@");

  if (!isEmail && cleanDigits.length < 8) {
    resultArea.innerHTML = `
      <div style="background:#fee2e2; border:1px solid #fca5a5; border-radius:12px; padding:16px; color:#991b1b; font-size:13px; text-align:center;">
        Please enter a valid 10-digit WhatsApp number or email address to check status.
      </div>
    `;
    return;
  }

  // Match against applicants by email or phone digits
  const last10 = cleanDigits.slice(-10);
  const match = applicants.find(a => {
    if (isEmail && a.email && a.email.toLowerCase() === rawQuery) return true;
    const appDigits = (a.phone || "").replace(/\D/g, "");
    return cleanDigits && appDigits && (appDigits === cleanDigits || appDigits.endsWith(last10) || cleanDigits.endsWith(appDigits.slice(-10)));
  });

  if (!match) {
    resultArea.innerHTML = `
      <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:14px; padding:22px; text-align:center; color:#92400e;">
        <div style="font-size:32px; margin-bottom:8px;">🔍</div>
        <h4 style="font-size:16px; font-weight:700; margin-bottom:6px; color:#92400e;">No Application Found for "${rawQuery}"</h4>
        <p style="font-size:13px; color:#b45309; margin-bottom:16px; line-height:1.4;">
          We couldn't locate an application submitted under this account. Please check your details, or submit a new application below to join our editor team.
        </p>
        <button class="primary-btn" onclick="switchPortalTab('apply')" style="padding:10px 20px; font-size:13px; margin:0 auto;">
          <span>Submit Application Now →</span>
        </button>
      </div>
    `;
    return;
  }

  // Determine stage & styling
  const status = match.status || "pending";

  let step1Class = "completed";
  let step2Class = status === "pending" ? "active" : (status === "rejected" ? "rejected" : "completed");
  let step3Class = status === "pending" ? "" : (status === "trial" ? "active" : (status === "selected" ? "completed" : "rejected"));
  let step4Class = status === "selected" ? "completed" : (status === "rejected" ? "rejected" : "");

  let statusBadgeLabel = "⏳ Under Review";
  let statusBadgeClass = "status-pending";
  let alertMessage = "";

  if (status === "pending") {
    statusBadgeLabel = "⏳ Under Review";
    statusBadgeClass = "status-pending";
    alertMessage = `
      <div class="status-msg-box pending">
        <h5 style="font-weight:700; margin-bottom:4px; font-size:14px;">⏳ Step 2: Portfolio Review in Progress</h5>
        <p>Hi <strong>${match.name}</strong>, your application and <strong>${match.specialization}</strong> portfolio are currently being assessed by Ganesh and the GanaCuts Visuals team. We review submissions within 24–48 hours. Keep your WhatsApp notifications active!</p>
      </div>
    `;
  } else if (status === "trial") {
    statusBadgeLabel = "🎯 Paid Trial Assigned";
    statusBadgeClass = "status-trial";
    alertMessage = `
      <div class="status-msg-box trial">
        <h5 style="font-weight:700; margin-bottom:4px; font-size:14px;">🎯 Step 3: Paid Trial Video Assigned!</h5>
        <p>Congratulations <strong>${match.name}</strong>! Your portfolio passed initial screening. Ganesh has assigned you a paid trial clip. Please check your WhatsApp messages or message Ganesh directly below to receive raw footage.</p>
      </div>
    `;
  } else if (status === "selected") {
    statusBadgeLabel = "✅ Official Agency Roster";
    statusBadgeClass = "status-selected";
    alertMessage = `
      <div class="status-msg-box selected">
        <h5 style="font-weight:700; margin-bottom:4px; font-size:14px;">🎉 Step 4: Welcome to CutScale Media Roster!</h5>
        <p>Outstanding work, <strong>${match.name}</strong>! You are officially onboarded to the CutScale Media editor roster. We route paying creator and corporate video projects to you with guaranteed project-based or monthly payouts.</p>
      </div>
    `;
  } else if (status === "rejected") {
    statusBadgeLabel = "❌ Closed";
    statusBadgeClass = "status-rejected";
    alertMessage = `
      <div class="status-msg-box rejected">
        <h5 style="font-weight:700; margin-bottom:4px; font-size:14px;">Application Status: Not Selected at This Time</h5>
        <p>Thank you for submitting your work, <strong>${match.name}</strong>. While we don't have open client slots matching your current style, your portfolio remains on file as our client roster expands.</p>
      </div>
    `;
  }

  const cleanPhone = (match.phone || "").replace(/\D/g, "");
  const waContactLink = `https://wa.me/917075081947?text=${encodeURIComponent(`Hi Ganesh, I am checking the status of my CutScale editor application (${match.name} - ${cleanPhone}).`)}`;

  resultArea.innerHTML = `
    <div class="status-tracker-card">
      <div class="tracker-header">
        <div>
          <div class="tracker-name-title">${match.name}</div>
          <div class="tracker-specialization">🎬 ${match.specialization} • 📍 ${match.city}</div>
        </div>
        <span class="status-badge ${statusBadgeClass}">${statusBadgeLabel}</span>
      </div>

      <!-- 4-Stage Stepper -->
      <div class="status-stepper">
        <div class="step-item ${step1Class}">
          <div class="step-circle">${step1Class === 'completed' ? '✓' : '1'}</div>
          <div class="step-label">Application Received</div>
        </div>

        <div class="step-item ${step2Class}">
          <div class="step-circle">${step2Class === 'completed' ? '✓' : (step2Class === 'rejected' ? '✕' : '2')}</div>
          <div class="step-label">Portfolio Review</div>
        </div>

        <div class="step-item ${step3Class}">
          <div class="step-circle">${step3Class === 'completed' ? '✓' : (step3Class === 'rejected' ? '✕' : '3')}</div>
          <div class="step-label">Paid Trial Clip</div>
        </div>

        <div class="step-item ${step4Class}">
          <div class="step-circle">${step4Class === 'completed' ? '✓' : (step4Class === 'rejected' ? '✕' : '4')}</div>
          <div class="step-label">Agency Roster</div>
        </div>
      </div>

      ${alertMessage}

      ${match.adminFeedback ? `
        <div style="margin-top:14px; background:#fff; border:1px solid #fed7aa; border-left:4px solid var(--accent-orange); padding:12px 14px; border-radius:10px;">
          <strong style="color:var(--accent-orange); font-size:12px; display:block; margin-bottom:4px;">DIRECT NOTE FROM GANESH / GANACUTS VISUALS:</strong>
          <p style="font-size:13px; color:var(--text-primary); margin:0;">"${match.adminFeedback}"</p>
        </div>
      ` : ''}

      ${match.assignedProject ? `
        <div style="margin-top:14px; background:#ecfdf5; border:1px solid #a7f3d0; border-left:4px solid #10b981; padding:14px; border-radius:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="color:#065f46; font-size:13px;">ASSIGNED WORK: ${match.assignedProject.title}</strong>
            <span style="font-size:12px; font-weight:700; color:#065f46;">${match.assignedProject.payout || match.rate || '₹1,000'}</span>
          </div>
          <p style="font-size:12px; color:#047857; margin-bottom:10px;">${match.assignedProject.instructions || ''}</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
            <a href="${match.assignedProject.footageUrl}" target="_blank" class="primary-btn" style="padding:6px 12px; font-size:11px; text-decoration:none;">Download Raw Footage ↗</a>
            <a href="/editor" target="_blank" class="secondary-btn" style="padding:6px 12px; font-size:11px; text-decoration:none;">Open Full Editor Workspace to Submit Draft ↗</a>
          </div>
        </div>
      ` : ''}

      <div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--border-subtle); display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px;">
        <div style="font-size:12px; color:var(--text-secondary);">
          <div><strong>Tools:</strong> ${match.tools}</div>
          <div><strong>Expected Pay:</strong> ${match.rate || 'Negotiable'}</div>
          <div><strong>Account PIN:</strong> ${match.password || '1234'}</div>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <a href="/editor" target="_blank" class="secondary-btn light-btn" style="padding:8px 14px; font-size:12px; text-decoration:none;">
            <span>Editor Portal Dashboard ↗</span>
          </a>
          <a href="${waContactLink}" target="_blank" rel="noopener" class="primary-btn" style="padding:8px 14px; font-size:12px;">
            <span>Message Ganesh on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// DOM Handlers
document.addEventListener("DOMContentLoaded", () => {
  initData();
  renderPortfolio();

  // Video cinema modal
  const modalClose = document.getElementById("modal-close");
  if (modalClose) modalClose.addEventListener("click", closeCinemaModal);
  const videoModal = document.getElementById("video-modal");
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target.id === "video-modal") closeCinemaModal();
    });
  }

  // Wire all Join & Status Tracking triggers
  const triggerMap = [
    { id: "join-agency-nav-btn", tab: "apply" },
    { id: "hero-join-team-btn", tab: "apply" },
    { id: "hiring-apply-btn", tab: "apply" },
    { id: "hiring-track-btn", tab: "track" },
    { id: "footer-join-btn", tab: "apply" },
    { id: "footer-track-btn", tab: "track" }
  ];

  triggerMap.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openJoinModal(item.tab);
      });
    }
  });

  const joinCloseBtn = document.getElementById("join-close-btn");
  if (joinCloseBtn) joinCloseBtn.addEventListener("click", closeJoinModal);

  const joinModal = document.getElementById("join-modal");
  if (joinModal) {
    joinModal.addEventListener("click", (e) => {
      if (e.target.id === "join-modal") closeJoinModal();
    });
  }

  // Status Lookup Form Handler
  const statusLookupForm = document.getElementById("status-lookup-form");
  if (statusLookupForm) {
    statusLookupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = document.getElementById("lookup-phone").value.trim();
      performStatusLookup(phone);
    });
  }

  // Editor Application Submit
  const applyForm = document.getElementById("editor-apply-form");
  if (applyForm) {
    applyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("apply-name").value.trim();
      const emailInput = document.getElementById("apply-email");
      const email = emailInput ? emailInput.value.trim() : "";
      const phone = document.getElementById("apply-phone").value.trim();
      const city = document.getElementById("apply-city").value.trim();
      const tools = document.getElementById("apply-tools").value.trim();
      const portfolio = document.getElementById("apply-portfolio").value.trim();
      const specialization = document.getElementById("apply-specialization").value;
      const rate = document.getElementById("apply-rate") ? document.getElementById("apply-rate").value.trim() : "";
      const notes = document.getElementById("apply-notes") ? document.getElementById("apply-notes").value.trim() : "";

      const now = new Date();
      const dateFormatted = now.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) + ", " + now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });

      const newApp = {
        id: "app_" + Date.now(),
        name,
        email: email || `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`,
        phone,
        city,
        tools,
        portfolio,
        specialization,
        rate,
        notes,
        password: (document.getElementById("apply-password") ? document.getElementById("apply-password").value.trim() : "1234") || "1234",
        adminFeedback: "Application received. Portfolio queued for review.",
        status: "pending",
        appliedAt: dateFormatted
      };

      applicants.unshift(newApp);
      saveApplicants();
      syncApplicantToGoogleSheet(newApp);
      updateAdminUI();
      applyForm.reset();

      // Save editor session
      localStorage.setItem("cutscale_editor_session", JSON.stringify({ phone: newApp.phone, name: newApp.name, ts: Date.now() }));

      // Automatically transition to track tab and immediately display applicant status!
      switchPortalTab('track');
      const lookupInput = document.getElementById("lookup-phone");
      if (lookupInput) lookupInput.value = phone;
      performStatusLookup(phone);
    });
  }

  // Admin Tab Switcher
  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      switchAdminTab(tab.getAttribute("data-tab"));
    });
  });

  // Add Video Form Submit
  const addVideoForm = document.getElementById("dash-add-video-form");
  if (addVideoForm) {
    addVideoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("dash-video-title").value.trim();
      const categoryId = document.getElementById("dash-video-category").value;
      const duration = document.getElementById("dash-video-duration").value.trim();
      const thumbnail = document.getElementById("dash-video-thumbnail").value.trim();
      const videoUrl = document.getElementById("dash-video-url").value.trim();

      const cat = categories.find(c => c.id === categoryId);
      const isLongForm = cat ? cat.aspect === "16:9" : false;

      videos.unshift({
        id: "v_" + Date.now(),
        categoryId,
        title,
        duration: duration || (isLongForm ? "12:00" : "0:45"),
        videoUrl,
        thumbnail
      });

      saveVideos();
      renderPortfolio();
      addVideoForm.reset();
      alert("✓ Video published to live portfolio!");
    });
  }

  // Profile Form Submit
  const profileForm = document.getElementById("dash-profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      profile.name = document.getElementById("profile-name").value.trim();
      profile.badge = document.getElementById("profile-badge").value.trim();
      profile.tagline = document.getElementById("profile-tagline").value.trim();
      profile.photo = document.getElementById("profile-photo-url").value.trim();
      profile.waUrl = document.getElementById("profile-wa-url").value.trim();
      const instaInput = document.getElementById("profile-insta-url");
      if (instaInput) profile.instaUrl = instaInput.value.trim();

      saveProfile();
      renderPortfolio();
      alert("✓ Brand profile settings updated successfully!");
    });
  }

  // Backup & Reset
  const exportBtn = document.getElementById("dash-export-json");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ profile, categories, videos, applicants }, null, 2));
      const a = document.createElement("a");
      a.href = dataStr;
      a.download = "cutscale_agency_full_backup.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  const resetBtn = document.getElementById("dash-reset-defaults");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset to default curated CutScale Agency data?")) {
        categories = [...DEFAULT_CATEGORIES];
        videos = [...DEFAULT_VIDEOS];
        applicants = [...DEFAULT_APPLICANTS];
        profile = { ...DEFAULT_PROFILE };
        saveCategories();
        saveVideos();
        saveApplicants();
        saveProfile();
        renderPortfolio();
        alert("Reset complete.");
      }
    });
  }

  // Escape to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCinemaModal();
      closeJoinModal();
      const adminModal = document.getElementById("admin-modal");
      if (adminModal) adminModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
