
// Universal 1-Click Google Sign-In Handler
window.handleGoogleSignIn = async function() {
  const sb = window.supabaseClient || window.globalSupabase;
  const redirectTarget = window.location.origin + '/editor';
  if (sb && sb.auth) {
    try {
      const { data, error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTarget
        }
      });
      if (!error) return;
      console.warn("Supabase Google Auth warning:", error);
    } catch (e) {
      console.warn("Supabase OAuth error:", e);
    }
  }
  window.location.href = '/editor';
};

window.toggleModalPhoneLookup = function() {
  const box = document.getElementById("modal-phone-lookup-box");
  if (box) {
    box.style.display = box.style.display === "none" ? "block" : "none";
  }
};

/**
 * CUTSCALE MEDIA — Video Editing Agency & Creative Operations Engine
 * GanaCuts Visuals Studio
 * Dynamic Category Engine + Editor Recruitment & Roster Management
 */

// Default Categories
const DEFAULT_CATEGORIES = [
  {
    id: "cat_motion_graphics",
    name: "Motion Graphics",
    subtitle: "3D TYPOGRAPHY, VISUAL HOOKS & MOTION INFOGRAPHICS",
    aspect: "9:16",
    order: 1
  },
  {
    id: "cat_talking_head",
    name: "Talking Head",
    subtitle: "HIGH-RETENTION HORMOZI-STYLE SUBTITLES, ZOOM CUTS & STORYTELLING",
    aspect: "9:16",
    order: 2
  },
  {
    id: "cat_real_estate",
    name: "Real Estate",
    subtitle: "LUXURY VILLA TOURS, DRONE TRANSITIONS & ARCHITECTURAL PACING",
    aspect: "9:16",
    order: 3
  }
];

// Default Real Videos (GanaCuts Visuals Live Portfolio)
const DEFAULT_VIDEOS = [
  {
    id: "v_1793060167914",
    categoryId: "cat_motion_graphics",
    title: "3D MOTION GRAPHICS",
    duration: "0:45",
    videoUrl: "https://youtube.com/shorts/kYpdBPpvym0?si=wWdLZBnaU7L5Kdes",
    thumbnail: ""
  },
  {
    id: "v_1793060379878",
    categoryId: "cat_motion_graphics",
    title: "3D MOTION GRAPHICS",
    duration: "0:45",
    videoUrl: "https://youtube.com/shorts/3Gf_8827t7o?si=n_JygrV75BwWDtuN",
    thumbnail: ""
  },
  {
    id: "v_1793060563673",
    categoryId: "cat_talking_head",
    title: "TALKING HEAD",
    duration: "0:45",
    videoUrl: "https://youtube.com/shorts/YPnq6HFbsto?si=XO0SyAK6Ov513tDK",
    thumbnail: ""
  },
  {
    id: "v_1793060598803",
    categoryId: "cat_talking_head",
    title: "TALKING HEAD",
    duration: "0:45",
    videoUrl: "https://youtube.com/shorts/KtXQpmIUoMU?si=iWcetWxJMPTGImUb",
    thumbnail: ""
  },
  {
    id: "v_1793060675390",
    categoryId: "cat_real_estate",
    title: "REAL ESTATES",
    duration: "0:45",
    videoUrl: "https://youtube.com/shorts/RxRiWnXKXHc?si=k4TnmpAwEqw9WTja",
    thumbnail: ""
  },
  {
    id: "v_1793060747160",
    categoryId: "cat_real_estate",
    title: "REAL ESTATE",
    duration: "0:45",
    videoUrl: "https://youtube.com/shorts/E0Ng5JR3_WM?si=RrylIgNUnqsqtY7l",
    thumbnail: ""
  }
];

// Real Applicants (Loaded dynamically from Supabase database)
const DEFAULT_APPLICANTS = [];

const DEFAULT_TOOLS = [
  { id: "tool_davinci", name: "DaVinci Resolve", role: "Color & Finish", icon: "🎨", color: "#f59e0b" },
  { id: "tool_premiere", name: "Premiere Pro", role: "Timeline & Narrative", icon: "🎬", color: "#a855f7" },
  { id: "tool_ae", name: "After Effects", role: "VFX & Motion Graphics", icon: "⚡", color: "#38bdf8" },
  { id: "tool_capcut", name: "CapCut Pro", role: "Fast Social Retention", icon: "✂️", color: "#06b6d4" },
  { id: "tool_blender", name: "Blender 3D", role: "3D Modeling & Animation", icon: "🧊", color: "#f97316" }
];

const DEFAULT_PROFILE = {
  name: "GANACUTS VISUALS",
  badge: "AGENCY TEAM",
  tagline: "High-retention video editing, cinematic color grading, and dynamic motion graphics by GanaCuts Visuals. Crafted with DaVinci Resolve, Premiere Pro & After Effects.",
  photo: "assets/logo.jpg",
  waUrl: "https://wa.me/917075081947?text=Hi%20GanaCuts%20Visuals,%20I%20saw%20your%20portfolio%20on%20GanaCuts%20Visuals%20and%20would%20like%20to%20hire%20you%20for%20a%20video%20editing%20project.",
  instaUrl: "https://www.instagram.com/gana_cuts_visuals?dlrf=aXJlY3lsazhraHl4",
  agencyFolders: [],
  tools: DEFAULT_TOOLS,
  featuredEditors: []
};

// Real Messages (Loaded dynamically from Supabase database)
const DEFAULT_MESSAGES = [];

// Storage Keys
const STORAGE_KEY_CATS = "cutscale_cats_v6";
const STORAGE_KEY_VIDS = "cutscale_vids_v6";
const STORAGE_KEY_PROF = "ganacuts_prof_v2";
const STORAGE_KEY_APPS = "cutscale_apps_v6";
const STORAGE_KEY_TRASH_APPS = "cutscale_trash_apps_v1";
const STORAGE_KEY_MSGS = "cutscale_msgs_v1";
const STORAGE_KEY_PRACTICE_ASGS = "cutscale_practice_asgs_v1";
const STORAGE_KEY_CLIENT_PROJS = "cutscale_client_projs_v1";
const STORAGE_KEY_AGENCY_FOLDERS = "cutscale_agency_folders_v1";
const STORAGE_KEY_DELETED_VAULT_IDS = "ganacuts_deleted_vault_ids_v1";
// No client-side administrator PIN is used.

let practiceAssignments = [];
let clientProjects = [];

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

// Circular Avatar Helper for Editors (Google photo -> Uploaded photo -> DiceBear initial avatar)
function getEditorAvatarSrc(app) {
  if (app && (app.avatarUrl || app.avatar_url)) {
    return app.avatarUrl || app.avatar_url;
  }
  const seed = (app && app.name) ? encodeURIComponent(app.name) : 'Editor';
  return 'https://api.dicebear.com/7.x/initials/svg?seed=' + seed + '&backgroundColor=d94e28,3b82f6,10b981,8b5cf6,ec4899&fontSize=42';
}

// Deletion tracker to ensure deleted items never revive
function recordDeletedVaultId(id) {
  if (!id) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS);
    const arr = raw ? JSON.parse(raw) : [];
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem(STORAGE_KEY_DELETED_VAULT_IDS, JSON.stringify(arr));
    }
  } catch (e) {}
}

// Supabase Agency Vault (Asset Folders, Practice Tasks & Client Projects)
async function syncAgencyVaultToSupabase() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));

  let rawFolders = (profile && Array.isArray(profile.agencyFolders))
    ? profile.agencyFolders
    : (typeof window !== "undefined" && window.profile && Array.isArray(window.profile.agencyFolders))
      ? window.profile.agencyFolders
      : [];
  if (rawFolders.length === 0) {
    try {
      const sf = localStorage.getItem(STORAGE_KEY_AGENCY_FOLDERS);
      if (sf) rawFolders = JSON.parse(sf);
    } catch (e) {}
  }
  rawFolders = (rawFolders || []).filter(f => f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));

  let rawPractice = (Array.isArray(practiceAssignments))
    ? practiceAssignments
    : (typeof window !== "undefined" && Array.isArray(window.practiceAssignments))
      ? window.practiceAssignments
      : [];
  if (rawPractice.length === 0) {
    try {
      const sp = localStorage.getItem(STORAGE_KEY_PRACTICE_ASGS);
      if (sp) rawPractice = JSON.parse(sp);
    } catch (e) {}
  }
  rawPractice = (rawPractice || []).filter(a => a && a.id && a.id !== "asg_practice_default" && !deletedIds.has(a.id));

  let rawClient = (Array.isArray(clientProjects))
    ? clientProjects
    : (typeof window !== "undefined" && Array.isArray(window.clientProjects))
      ? window.clientProjects
      : [];
  if (rawClient.length === 0) {
    try {
      const sc = localStorage.getItem(STORAGE_KEY_CLIENT_PROJS);
      if (sc) rawClient = JSON.parse(sc);
    } catch (e) {}
  }
  rawClient = (rawClient || []).filter(p => p && p.id && p.id !== "proj_client_default" && !deletedIds.has(p.id));

  const vaultPayload = {
    agencyFolders: rawFolders,
    practiceAssignments: rawPractice,
    clientProjects: rawClient,
    tools: (profile && Array.isArray(profile.tools)) ? profile.tools : DEFAULT_TOOLS,
    featuredEditors: (profile && Array.isArray(profile.featuredEditors)) ? profile.featuredEditors : [],
    updatedAt: Date.now()
  };

  const dbRow = {
    name: 'GanaCuts Visuals System Vault',
    status: 'active',
    assigned_project: vaultPayload,
    applied_at: new Date().toISOString()
  };

  let writeSuccess = false;

  // 1. Primary Write: Supabase Client update with eq filter (direct PATCH)
  if (globalSupabase) {
    try {
      const { data, error } = await globalSupabase
        .from('applicants')
        .update(dbRow)
        .eq('id', '__agency_system_vault__')
        .select();

      if (!error && Array.isArray(data) && data.length > 0) {
        writeSuccess = true;
      } else {
        // If row doesn't exist yet, insert it cleanly
        const { error: insErr } = await globalSupabase
          .from('applicants')
          .insert({
            id: '__agency_system_vault__',
            ...dbRow
          });
        if (!insErr) writeSuccess = true;
      }
    } catch (err) {
      console.warn("Supabase client update exception:", err);
    }
  }

  // 2. Guaranteed Fallback: Direct HTTP PATCH via PostgREST endpoint
  if (!writeSuccess && typeof fetch !== 'undefined') {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/applicants?id=eq.__agency_system_vault__`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${SUPABASE_ANON}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(dbRow)
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          writeSuccess = true;
        } else {
          // Fallback insert
          await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
            method: 'POST',
            headers: {
              'apikey': SUPABASE_ANON,
              'Authorization': `Bearer ${SUPABASE_ANON}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              id: '__agency_system_vault__',
              ...dbRow
            })
          });
          writeSuccess = true;
        }
      }
    } catch (fetchErr) {
      console.warn("Direct fetch vault notice:", fetchErr);
    }
  }

  persistPortfolioToServer();
  return writeSuccess;
}

async function fetchSupabaseAgencyVault() {
  let vault = null;

  // 1. Fetch via Supabase Client
  if (globalSupabase) {
    try {
      const { data, error } = await globalSupabase
        .from('applicants')
        .select('*')
        .eq('id', '__agency_system_vault__')
        .maybeSingle();
      if (!error && data && data.assigned_project) {
        vault = data.assigned_project;
      }
    } catch (e) {}
  }

  // 2. Direct HTTP GET Fallback
  if (!vault && typeof fetch !== 'undefined') {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/applicants?id=eq.__agency_system_vault__`, {
        headers: {
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${SUPABASE_ANON}`
        }
      });
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0 && list[0].assigned_project) {
          vault = list[0].assigned_project;
        }
      }
    } catch (e) {}
  }

  if (!vault) return;

  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  let needPushToRemote = false;

  // --- 1. SYNC AGENCY FOLDERS ---
  const remoteFolders = (Array.isArray(vault.agencyFolders) ? vault.agencyFolders : [])
    .filter(f => f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));

  let localFolders = [];
  try {
    const sf = localStorage.getItem(STORAGE_KEY_AGENCY_FOLDERS);
    if (sf) localFolders = JSON.parse(sf);
  } catch (e) {}
  if (!Array.isArray(localFolders) || localFolders.length === 0) {
    if (profile && Array.isArray(profile.agencyFolders)) localFolders = profile.agencyFolders;
  }
  localFolders = (localFolders || []).filter(f => f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));

  const folderMap = new Map();
  remoteFolders.forEach(f => folderMap.set(f.id, f));
  localFolders.forEach(lf => {
    if (!folderMap.has(lf.id)) {
      folderMap.set(lf.id, lf);
      needPushToRemote = true;
    }
  });
  const finalFolders = Array.from(folderMap.values());
  if (!profile) profile = { ...DEFAULT_PROFILE };
  profile.agencyFolders = finalFolders;
  localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
  localStorage.setItem(STORAGE_KEY_AGENCY_FOLDERS, JSON.stringify(finalFolders));
  if (typeof window !== "undefined") window.profile = profile;

  // --- 2. SYNC PRACTICE TASKS ---
  const remotePractice = (Array.isArray(vault.practiceAssignments) ? vault.practiceAssignments : [])
    .filter(a => a && a.id && a.id !== "asg_practice_default" && !deletedIds.has(a.id));

  let localPractice = [];
  try {
    const sp = localStorage.getItem(STORAGE_KEY_PRACTICE_ASGS);
    if (sp) localPractice = JSON.parse(sp);
  } catch (e) {}
  if (!Array.isArray(localPractice) || localPractice.length === 0) {
    if (Array.isArray(practiceAssignments)) localPractice = practiceAssignments;
  }
  localPractice = (localPractice || []).filter(a => a && a.id && a.id !== "asg_practice_default" && !deletedIds.has(a.id));

  const practiceMap = new Map();
  remotePractice.forEach(p => practiceMap.set(p.id, p));
  localPractice.forEach(lp => {
    if (!practiceMap.has(lp.id)) {
      practiceMap.set(lp.id, lp);
      needPushToRemote = true;
    } else {
      const remoteItem = practiceMap.get(lp.id);
      if (lp.submissions && Object.keys(lp.submissions).length > 0) {
        remoteItem.submissions = { ...(remoteItem.submissions || {}), ...lp.submissions };
      }
    }
  });
  practiceAssignments = Array.from(practiceMap.values());
  window.practiceAssignments = practiceAssignments;
  localStorage.setItem(STORAGE_KEY_PRACTICE_ASGS, JSON.stringify(practiceAssignments));

  // --- 3. SYNC CLIENT PROJECTS ---
  const remoteClient = (Array.isArray(vault.clientProjects) ? vault.clientProjects : [])
    .filter(p => p && p.id && p.id !== "proj_client_default" && !deletedIds.has(p.id));

  let localClient = [];
  try {
    const sc = localStorage.getItem(STORAGE_KEY_CLIENT_PROJS);
    if (sc) localClient = JSON.parse(sc);
  } catch (e) {}
  if (!Array.isArray(localClient) || localClient.length === 0) {
    if (Array.isArray(clientProjects)) localClient = clientProjects;
  }
  localClient = (localClient || []).filter(p => p && p.id && p.id !== "proj_client_default" && !deletedIds.has(p.id));

  const clientMap = new Map();
  remoteClient.forEach(p => clientMap.set(p.id, p));
  localClient.forEach(lc => {
    if (!clientMap.has(lc.id)) {
      clientMap.set(lc.id, lc);
      needPushToRemote = true;
    } else {
      const remoteItem = clientMap.get(lc.id);
      if (lc.submissions && Object.keys(lc.submissions).length > 0) {
        remoteItem.submissions = { ...(remoteItem.submissions || {}), ...lc.submissions };
      }
    }
  });
  clientProjects = Array.from(clientMap.values());
  window.clientProjects = clientProjects;
  localStorage.setItem(STORAGE_KEY_CLIENT_PROJS, JSON.stringify(clientProjects));

  // Sync tools & featured editors if remote has them
  if (Array.isArray(vault.tools) && vault.tools.length > 0) {
    if (!profile) profile = { ...DEFAULT_PROFILE };
    profile.tools = vault.tools;
    localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
    if (typeof window !== "undefined") window.profile = profile;
  }
  if (Array.isArray(vault.featuredEditors)) {
    if (!profile) profile = { ...DEFAULT_PROFILE };
    profile.featuredEditors = vault.featuredEditors;
    localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
    if (typeof window !== "undefined") window.profile = profile;
  }

  // Persist synced state to server disk
  persistPortfolioToServer();

  if (needPushToRemote) {
    syncAgencyVaultToSupabase();
  }

  // Refresh all UI components in Admin Studio and Editor Dashboard
  if (typeof renderAdminFolders === 'function') renderAdminFolders();
  if (typeof renderAdminToolsList === 'function') renderAdminToolsList();
  if (typeof renderAdminFeaturedEditorsList === 'function') renderAdminFeaturedEditorsList();
  if (typeof renderAdminPracticeTasksTable === 'function') renderAdminPracticeTasksTable();
  if (typeof renderAdminClientProjectsTable === 'function') renderAdminClientProjectsTable();
  if (typeof renderAdminSubmissionsQueue === 'function') renderAdminSubmissionsQueue();
  if (typeof renderAgencyFolders === 'function') renderAgencyFolders();
  if (typeof renderEditorStudio === 'function' && typeof currentEditor !== 'undefined' && currentEditor) renderEditorStudio();
  if (typeof renderPracticeAssignments === 'function' && typeof currentEditor !== 'undefined' && currentEditor) renderPracticeAssignments(currentEditor);
  if (typeof renderClientProjects === 'function' && typeof currentEditor !== 'undefined' && currentEditor) renderClientProjects(currentEditor);
}

// Supabase Database Sync Operations
async function syncApplicantToSupabase(app) {
  if (!globalSupabase || !app) return;
  if (app.id === '__agency_system_vault__' || (typeof app.id === 'string' && app.id.startsWith('__'))) return;
  try {
    const payload = {
      id: app.id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      city: app.city || "Remote",
      tools: [app.tools, app.otherTools].filter(Boolean).join(", ") || "Video Editor",
      portfolio: app.portfolio || "",
      specialization: app.specialization || "Video Editing",
      rate: app.rate || "Negotiable",
      auth_user_id: app.authUserId || app.auth_user_id || null,
      profile_review_status: app.profileReviewStatus || app.profile_review_status || "not_submitted",
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
    if (app.avatarUrl || app.avatar_url) {
      payload.avatar_url = app.avatarUrl || app.avatar_url;
    }

    const { error } = await globalSupabase.from('applicants').upsert(payload, { onConflict: 'id' });
    if (error && error.code === '42703') {
      // If avatar_url does not exist yet in Supabase schema, omit and retry smoothly
      delete payload.avatar_url;
      await globalSupabase.from('applicants').upsert(payload, { onConflict: 'id' });
    }
  } catch (err) {
    // Non-blocking catch for offline/paused Supabase projects
    console.warn("Supabase applicant sync notice:", err.message || err);
  }
}

async function syncAllApplicantsToSupabase() {
  if (!globalSupabase || !Array.isArray(applicants)) return;
  for (const app of applicants) {
    if (!app || app.id === '__agency_system_vault__' || (typeof app.id === 'string' && app.id.startsWith('__'))) continue;
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
        name: c.name || c.label,
        label: c.name || c.label,
        subtitle: c.subtitle || "",
        aspect: c.aspect || "9:16",
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
        thumbnail: v.thumbnail || "",
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
        name: c.name || c.label,
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
        thumbnail: v.thumbnail || ""
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
        // Skip any legacy fake accounts or items in trash bin
        if (remote.id === 'app_1' || remote.id === 'app_2' || remote.id === 'app_3' || remote.id === '__agency_system_vault__') return;
        if (typeof trashApplicants !== 'undefined' && Array.isArray(trashApplicants) && trashApplicants.some(t => t.id === remote.id)) return;

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
          authUserId: remote.auth_user_id || null,
          profileReviewStatus: remote.profile_review_status || "not_submitted",
          status: remote.status || "pending",
          adminFeedback: remote.admin_feedback || remote.adminFeedback || "",
          appliedAt: remote.applied_at || remote.appliedAt,
          assignedProject: remote.assigned_project || remote.assignedProject || null,
          submittedDraft: remote.submitted_draft || remote.submittedDraft || null,
          avatarUrl: remote.avatar_url || remote.avatarUrl || null
        };
        if (localIdx >= 0) {
          const local = applicants[localIdx];
          applicants[localIdx] = { ...local, ...mapped };
        } else {
          applicants.push(mapped);
        }
      });
      // Purge fake demo entries
      applicants = applicants.filter(a => a && a.id !== "app_1" && a.id !== "app_2" && a.id !== "app_3");
      localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applicants));
      if (typeof window !== "undefined") window.applicants = applicants;
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
    const rawFolders = (profile && Array.isArray(profile.agencyFolders)) ? profile.agencyFolders : [];
    const payload = { 
      categories, 
      videos, 
      profile, 
      agencyFolders: rawFolders,
      practiceAssignments: practiceAssignments || [],
      clientProjects: clientProjects || []
    };
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
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
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
      if (data && Array.isArray(data.practiceAssignments) && data.practiceAssignments.length > 0) {
        const pMap = new Map();
        (practiceAssignments || []).forEach(a => { if (a && a.id && !deletedIds.has(a.id)) pMap.set(a.id, a); });
        data.practiceAssignments.forEach(a => { if (a && a.id && !deletedIds.has(a.id)) pMap.set(a.id, a); });
        practiceAssignments = Array.from(pMap.values());
        window.practiceAssignments = practiceAssignments;
        localStorage.setItem(STORAGE_KEY_PRACTICE_ASGS, JSON.stringify(practiceAssignments));
        changed = true;
      }
      if (data && Array.isArray(data.clientProjects) && data.clientProjects.length > 0) {
        const cMap = new Map();
        (clientProjects || []).forEach(p => { if (p && p.id && !deletedIds.has(p.id)) cMap.set(p.id, p); });
        data.clientProjects.forEach(p => { if (p && p.id && !deletedIds.has(p.id)) cMap.set(p.id, p); });
        clientProjects = Array.from(cMap.values());
        window.clientProjects = clientProjects;
        localStorage.setItem(STORAGE_KEY_CLIENT_PROJS, JSON.stringify(clientProjects));
        changed = true;
      }
      if (data && data.profile) {
        let serverFolders = Array.isArray(data.profile.agencyFolders)
          ? data.profile.agencyFolders
          : (Array.isArray(data.agencyFolders) ? data.agencyFolders : []);
        serverFolders = serverFolders.filter(f => f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));

        const fMap = new Map();
        (profile && profile.agencyFolders ? profile.agencyFolders : []).forEach(f => {
          if (f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id)) fMap.set(f.id, f);
        });
        serverFolders.forEach(f => fMap.set(f.id, f));
        const currentFolders = Array.from(fMap.values());

        const incomingTools = Array.isArray(data.profile.tools) && data.profile.tools.length > 0
          ? data.profile.tools
          : (profile && Array.isArray(profile.tools) && profile.tools.length > 0 ? profile.tools : [...DEFAULT_TOOLS]);

        const incomingFeatured = Array.isArray(data.profile.featuredEditors)
          ? data.profile.featuredEditors
          : (profile && Array.isArray(profile.featuredEditors) ? profile.featuredEditors : []);

        profile = { ...DEFAULT_PROFILE, ...data.profile, agencyFolders: currentFolders, tools: incomingTools, featuredEditors: incomingFeatured };
        if (!profile.photo || profile.photo.includes("ganesh.jpg")) {
          profile.photo = "assets/logo.jpg";
        }
        localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
        localStorage.setItem(STORAGE_KEY_AGENCY_FOLDERS, JSON.stringify(currentFolders));
        if (typeof window !== "undefined") window.profile = profile;
        changed = true;
      }
      if (changed) {
        if (typeof renderPortfolio === 'function') renderPortfolio();
        if (typeof renderTools === 'function') renderTools();
        if (typeof renderFeaturedEditors === 'function') renderFeaturedEditors();
        if (typeof renderAdminFolders === 'function') renderAdminFolders();
        if (typeof renderAgencyFolders === 'function') renderAgencyFolders();
        if (typeof renderAdminPracticeTasksTable === 'function') renderAdminPracticeTasksTable();
        if (typeof renderAdminClientProjectsTable === 'function') renderAdminClientProjectsTable();
        if (typeof renderAdminToolsList === 'function') renderAdminToolsList();
        if (typeof renderAdminFeaturedEditorsList === 'function') renderAdminFeaturedEditorsList();
        if (typeof updateAdminUI === 'function') updateAdminUI();
        if (typeof currentEditor !== 'undefined' && currentEditor) {
          if (typeof renderPracticeAssignments === 'function') renderPracticeAssignments(currentEditor);
          if (typeof renderClientProjects === 'function') renderClientProjects(currentEditor);
        }
      }
    }
  } catch (e) {
    try {
      const res2 = await fetch('/data/portfolio.json');
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && Array.isArray(data2.videos) && data2.videos.length > 0) {
          videos = data2.videos;
          localStorage.setItem(STORAGE_KEY_VIDS, JSON.stringify(videos));
        }
        if (data2 && Array.isArray(data2.categories) && data2.categories.length > 0) {
          categories = data2.categories;
          localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
        }
        if (data2 && Array.isArray(data2.practiceAssignments)) {
          practiceAssignments = data2.practiceAssignments.filter(a => a && a.id && !deletedIds.has(a.id));
          window.practiceAssignments = practiceAssignments;
          localStorage.setItem(STORAGE_KEY_PRACTICE_ASGS, JSON.stringify(practiceAssignments));
        }
        if (data2 && Array.isArray(data2.clientProjects)) {
          clientProjects = data2.clientProjects.filter(p => p && p.id && !deletedIds.has(p.id));
          window.clientProjects = clientProjects;
          localStorage.setItem(STORAGE_KEY_CLIENT_PROJS, JSON.stringify(clientProjects));
        }
        if (data2 && data2.profile) {
          let currentFolders = Array.isArray(data2.profile.agencyFolders)
            ? data2.profile.agencyFolders
            : (Array.isArray(data2.agencyFolders) ? data2.agencyFolders : (profile && profile.agencyFolders ? profile.agencyFolders : []));
          currentFolders = currentFolders.filter(f => f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));
          profile = { ...DEFAULT_PROFILE, ...data2.profile, agencyFolders: currentFolders };
          if (!Array.isArray(profile.tools) || profile.tools.length === 0) profile.tools = [...DEFAULT_TOOLS];
          if (!Array.isArray(profile.featuredEditors)) profile.featuredEditors = [];
          localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
          localStorage.setItem(STORAGE_KEY_AGENCY_FOLDERS, JSON.stringify(currentFolders));
          if (typeof window !== "undefined") window.profile = profile;
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
  window.STORAGE_KEY_AGENCY_FOLDERS = STORAGE_KEY_AGENCY_FOLDERS;
  window.syncAgencyVaultToSupabase = syncAgencyVaultToSupabase;
  window.fetchSupabaseAgencyVault = fetchSupabaseAgencyVault;
  window.getEditorAvatarSrc = getEditorAvatarSrc;
  window.saveAgencyFoldersAndSync = saveAgencyFoldersAndSync;
  window.savePracticeAssignmentsAndSync = savePracticeAssignmentsAndSync;
  window.saveClientProjectsAndSync = saveClientProjectsAndSync;
}

// Application State
let categories = [];
let videos = [];
let applicants = [];
let trashApplicants = [];
let messages = [];
let profile = { ...DEFAULT_PROFILE };
let currentlyPlayingCardId = null;

// Initialize Storage
function initData() {
  const storedCats = localStorage.getItem(STORAGE_KEY_CATS);
  if (storedCats) {
    try {
      const parsed = JSON.parse(storedCats);
      if (parsed.some(c => c.id === 'cat_podcasts' || c.id === 'cat_long_form')) {
        categories = [...DEFAULT_CATEGORIES];
        saveCategories();
      } else {
        categories = parsed;
      }
    } catch (e) {
      categories = [...DEFAULT_CATEGORIES];
    }
  } else {
    categories = [...DEFAULT_CATEGORIES];
    saveCategories();
  }

  const storedVids = localStorage.getItem(STORAGE_KEY_VIDS);
  if (storedVids) {
    try {
      const parsedV = JSON.parse(storedVids);
      if (parsedV.some(v => v.videoUrl && v.videoUrl.includes('flower.mp4'))) {
        videos = [...DEFAULT_VIDEOS];
        saveVideos();
      } else {
        videos = parsedV;
      }
    } catch (e) {
      videos = [...DEFAULT_VIDEOS];
    }
  } else {
    videos = [...DEFAULT_VIDEOS];
    saveVideos();
  }

  const storedProf = localStorage.getItem(STORAGE_KEY_PROF);
  profile = storedProf ? JSON.parse(storedProf) : { ...DEFAULT_PROFILE };
  if (!profile.instaUrl) {
    profile.instaUrl = DEFAULT_PROFILE.instaUrl;
  }
  if (!profile.name || profile.name === "CUTSCALE MEDIA") {
    profile.name = DEFAULT_PROFILE.name;
    profile.tagline = DEFAULT_PROFILE.tagline;
  }
  if (!profile.photo || profile.photo.includes("ganesh.jpg")) {
    profile.photo = "assets/logo.jpg";
  }
  if (!Array.isArray(profile.agencyFolders) || profile.agencyFolders.length === 0) {
    try {
      const storedFolders = localStorage.getItem(STORAGE_KEY_AGENCY_FOLDERS);
      if (storedFolders) profile.agencyFolders = JSON.parse(storedFolders);
    } catch (e) {}
  }
  if (!Array.isArray(profile.agencyFolders)) {
    profile.agencyFolders = [];
  }
  // Strip legacy demo folder
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  profile.agencyFolders = profile.agencyFolders.filter(f => f && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));
  if (!Array.isArray(profile.tools) || profile.tools.length === 0) {
    profile.tools = [...DEFAULT_TOOLS];
  }
  if (!Array.isArray(profile.featuredEditors)) {
    profile.featuredEditors = [];
  }
  localStorage.setItem(STORAGE_KEY_AGENCY_FOLDERS, JSON.stringify(profile.agencyFolders));
  localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
  if (typeof window !== "undefined") window.profile = profile;

  const storedApps = localStorage.getItem(STORAGE_KEY_APPS);
  applicants = storedApps ? JSON.parse(storedApps) : [...DEFAULT_APPLICANTS];
  // Purge any legacy fake applicants (Suresh, Arjun, Kavya) or system vault row
  applicants = applicants.filter(a => a && a.id !== "app_1" && a.id !== "app_2" && a.id !== "app_3" && a.id !== '__agency_system_vault__' && !a.id.startsWith('__'));
  localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applicants));
  if (typeof window !== "undefined") window.applicants = applicants;

  const storedTrash = localStorage.getItem(STORAGE_KEY_TRASH_APPS);
  trashApplicants = storedTrash ? JSON.parse(storedTrash) : [];
  localStorage.setItem(STORAGE_KEY_TRASH_APPS, JSON.stringify(trashApplicants));

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
  fetchSupabaseAgencyVault();

  // Set up live real-time listeners on Supabase
  if (globalSupabase) {
    try {
      globalSupabase
        .channel('realtime_live_chat')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
          if (payload.eventType === 'INSERT') {
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
              if (typeof renderAdminConversation === 'function') renderAdminConversation();
              if (typeof renderEditorChatThread === 'function') renderEditorChatThread();
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old?.id;
            if (deletedId) {
              messages = messages.filter(m => m.id !== deletedId);
              localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
              if (typeof renderAdminConversation === 'function') renderAdminConversation();
              if (typeof renderEditorChatThread === 'function') renderEditorChatThread();
            }
          }
        })
        .subscribe();

      globalSupabase
        .channel('realtime_applicants_tracker')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'applicants' }, () => {
          fetchSupabaseApplicants();
        })
        .subscribe();

      globalSupabase
        .channel('realtime_vault_tracker')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'applicants', filter: 'id=eq.__agency_system_vault__' }, () => {
          fetchSupabaseAgencyVault();
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
  if (profile && Array.isArray(profile.agencyFolders)) {
    localStorage.setItem(STORAGE_KEY_AGENCY_FOLDERS, JSON.stringify(profile.agencyFolders));
  }
  if (typeof window !== "undefined") window.profile = profile;
  persistPortfolioToServer();
}

function saveApplicants() {
  applicants = applicants.filter(a => a && a.id !== "app_1" && a.id !== "app_2" && a.id !== "app_3" && a.id !== '__agency_system_vault__' && !a.id.startsWith('__'));
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

// Parse Instagram-style reply metadata from text payload
function parseMessageContent(rawText) {
  if (typeof rawText === "string" && rawText.startsWith('{"replyTo":')) {
    try {
      const parsed = JSON.parse(rawText);
      return {
        replyTo: parsed.replyTo || null,
        body: parsed.body || parsed.text || ""
      };
    } catch (e) {}
  }
  return { replyTo: null, body: rawText || "" };
}

// Convert direct URLs into clickable link badges (Google Drive, YouTube, Instagram)
function renderMessageBodyHtml(text) {
  if (!text) return "";
  const safe = escapeHtml(text);
  const urlRegex = /(https?:\/\/[^\s<]+)/gi;
  return safe.replace(urlRegex, (url) => {
    let icon = "🔗";
    let label = "Link";
    if (url.includes("drive.google.com")) {
      icon = "📁";
      label = "Google Drive Link";
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      icon = "▶";
      label = "YouTube Video / Reel";
    } else if (url.includes("instagram.com")) {
      icon = "📸";
      label = "Instagram Reel / Post";
    } else if (url.includes("canva.com")) {
      icon = "🎨";
      label = "Canva Portfolio";
    }
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link-badge"><span>${icon} ${label} ↗</span></a>`;
  });
}

// Send Admin Message (with optional quoted reply)
function sendAdminMessage(editorId, text, replyToObj = null) {
  const all = getStoredMessages();
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });

  let textPayload = text;
  if (replyToObj) {
    textPayload = JSON.stringify({
      replyTo: {
        id: replyToObj.id,
        sender: replyToObj.senderName || replyToObj.sender,
        text: (replyToObj.body || replyToObj.text || "").slice(0, 120)
      },
      body: text
    });
  }

  const newMsg = {
    id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    editorId,
    sender: "admin",
    senderName: "GanaCuts Visuals (Admin)",
    text: textPayload,
    timestamp: Date.now(),
    timeStr
  };

  all.push(newMsg);
  messages = all;
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(all));
  syncMessageToSupabase(newMsg);
  return newMsg;
}

// Send Editor Message (with optional quoted reply)
function sendEditorMessage(editorId, text, senderName = "Editor", replyToObj = null) {
  const all = getStoredMessages();
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });

  let textPayload = text;
  if (replyToObj) {
    textPayload = JSON.stringify({
      replyTo: {
        id: replyToObj.id,
        sender: replyToObj.senderName || replyToObj.sender,
        text: (replyToObj.body || replyToObj.text || "").slice(0, 120)
      },
      body: text
    });
  }

  const newMsg = {
    id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    editorId,
    sender: "editor",
    senderName,
    text: textPayload,
    timestamp: Date.now(),
    timeStr
  };

  all.push(newMsg);
  messages = all;
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(all));
  syncMessageToSupabase(newMsg);
  return newMsg;
}

// Unsend / Delete Message (Instagram Style — removes locally and deletes from Supabase)
function deleteStoredMessage(msgId) {
  const all = getStoredMessages();
  const filtered = all.filter(m => m.id !== msgId);
  messages = filtered;
  localStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(filtered));

  if (globalSupabase) {
    globalSupabase.from('messages').delete().eq('id', msgId).then(() => {}).catch(() => {});
  }
  return filtered;
}

// Seen / Read Receipt Tracker (Instagram Style)
function markChatSeen(editorId, viewer) {
  if (!editorId || !viewer) return;
  try {
    localStorage.setItem(`gcv_seen_${editorId}_${viewer}`, Date.now().toString());
  } catch (e) {}
}

function getChatSeenTime(editorId, viewer) {
  if (!editorId || !viewer) return null;
  try {
    const val = localStorage.getItem(`gcv_seen_${editorId}_${viewer}`);
    return val ? parseInt(val, 10) : null;
  } catch (e) {
    return null;
  }
}

function formatSeenRelativeTime(ts) {
  if (!ts) return "now";
  const diffSec = Math.floor((Date.now() - ts) / 1000);
  if (diffSec < 45) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  const d = new Date(ts);
  return d.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });
}

if (typeof window !== "undefined") {
  window.getStoredMessages = getStoredMessages;
  window.parseMessageContent = parseMessageContent;
  window.renderMessageBodyHtml = renderMessageBodyHtml;
  window.sendAdminMessage = sendAdminMessage;
  window.sendEditorMessage = sendEditorMessage;
  window.deleteStoredMessage = deleteStoredMessage;
  window.markChatSeen = markChatSeen;
  window.getChatSeenTime = getChatSeenTime;
  window.formatSeenRelativeTime = formatSeenRelativeTime;
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
  if (ytId) return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
  return "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80";
}

function getCategoryName(catId) {
  const cat = categories.find(c => c.id === catId);
  return cat ? cat.name : "Portfolio Reel";
}

// Render Tools on Main Portfolio Page
function renderTools() {
  const toolsRow = document.getElementById("tools-row");
  if (!toolsRow) return;
  const tools = (profile && Array.isArray(profile.tools) && profile.tools.length > 0)
    ? profile.tools
    : DEFAULT_TOOLS;

  toolsRow.innerHTML = tools.map(t => `
    <div class="tool-badge" style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.9); border:1px solid ${t.color ? t.color + '44' : 'rgba(18,18,20,0.1)'}; padding:6px 14px; border-radius:9999px; box-shadow:0 3px 12px rgba(18,18,20,0.04); margin:4px 6px 4px 0;">
      <span class="tool-dot" style="background:${t.color || '#d94e28'}; width:8px; height:8px; border-radius:50%; box-shadow:0 0 6px ${t.color || '#d94e28'}; display:inline-block;"></span>
      <span style="font-size:14px; line-height:1;">${t.icon || '🎬'}</span>
      <strong style="color:var(--text-primary); font-size:13px; font-weight:700;">${escapeHtml(t.name)}</strong>
      ${t.role ? `<small style="color:var(--text-muted); font-size:11.5px; margin-left:2px;">• ${escapeHtml(t.role)}</small>` : ''}
    </div>
  `).join('');
}

// Render Featured Curated Editors Spotlight on Main Website
function renderFeaturedEditors() {
  const container = document.getElementById("featured-editors-container");
  if (!container) return;
  const featured = (profile && Array.isArray(profile.featuredEditors)) ? profile.featuredEditors : [];
  if (featured.length === 0) {
    container.style.display = "none";
    return;
  }
  container.style.display = "block";
  const listEl = document.getElementById("featured-editors-list");
  if (!listEl) return;
  listEl.innerHTML = featured.map(fe => {
    const avatar = fe.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(fe.name || 'Editor') + '&backgroundColor=d94e28,3b82f6,10b981,8b5cf6,ec4899&fontSize=42';
    return `
      <div class="featured-editor-card" style="background:#ffffff; border:1px solid rgba(18,18,20,0.08); border-radius:20px; padding:22px; box-shadow:0 12px 30px rgba(18,18,20,0.05); display:flex; flex-direction:column; gap:12px; transition:transform 0.25s ease;">
        <div style="display:flex; align-items:center; gap:14px;">
          <img src="${avatar}" alt="${escapeHtml(fe.name)}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-orange); box-shadow:0 0 12px rgba(217,78,40,0.25);">
          <div>
            <h4 style="margin:0; font-size:16px; font-weight:800; color:#121214;">${escapeHtml(fe.name)}</h4>
            <span style="display:inline-block; font-size:11px; font-weight:700; color:#d94e28; background:rgba(217,78,40,0.1); padding:2px 8px; border-radius:9999px; margin-top:3px;">${escapeHtml(fe.roleTitle || 'Creative Video Editor')}</span>
          </div>
        </div>
        <p style="margin:0; font-size:13px; color:#5a5a62; line-height:1.5;">${escapeHtml(fe.customBio || 'Core post-production artist at GanaCuts Visuals.')}</p>
      </div>
    `;
  }).join('');
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

  // 1b. Dynamic Tools & Featured Team
  renderTools();
  renderFeaturedEditors();

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
    card.addEventListener("mouseenter", () => prewarmVideoPlayer(id), { once: true });
    card.addEventListener("touchstart", () => prewarmVideoPlayer(id), { passive: true, once: true });
    card.addEventListener("click", (e) => {
      if (e.target.closest(".ctrl-btn") || e.target.closest(".speaker-top-btn") || e.target.closest(".card-top-speaker-pill") || e.target.closest(".ctrl-btn-cinema-text")) return;
      playVideoInCard(id, card);
    });
  });

  // Pre-warm the first 3 videos after 800ms
  setTimeout(() => {
    (videos || []).slice(0, 3).forEach(v => prewarmVideoPlayer(v.id));
  }, 800);

  // 6. Update Admin UI
  updateAdminUI();
}

function sendYtMessage(iframe, func, args) {
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(JSON.stringify({
    event: 'command',
    func: func,
    args: args || []
  }), '*');
}

window.cardSoundStates = window.cardSoundStates || {};
window.cardPlayStates = window.cardPlayStates || {};
const prewarmedSet = new Set();

window.prewarmVideoPlayer = function(id) {
  if (prewarmedSet.has(id)) return;
  prewarmedSet.add(id);
  const v = (videos || []).find(item => item.id === id);
  if (!v) return;
  const ytId = extractYouTubeId(v.videoUrl);
  if (ytId) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = `https://www.youtube.com/embed/${ytId}`;
    document.head.appendChild(link);
  }
};

window.toggleCardVideoSound = function(id, e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const card = document.getElementById(`card-${id}`);
  if (!card) return;

  const isPlaying = currentlyPlayingCardId === id && card.querySelector(".active-video-container");

  if (!isPlaying) {
    // If not currently playing, start playing unmuted immediately!
    window.cardSoundStates[id] = false;
    playVideoInCard(id, card, true /* start unmuted */);
    return;
  }

  const currentlyMuted = window.cardSoundStates[id] !== false;
  const newMuted = !currentlyMuted;
  window.cardSoundStates[id] = newMuted;

  const btn = document.getElementById(`sound-btn-${id}`);
  const iframe = card.querySelector("iframe");
  const vid = card.querySelector("video");

  if (newMuted) {
    if (iframe) sendYtMessage(iframe, "mute");
    if (vid) vid.muted = true;

    if (btn) {
      btn.classList.remove("is-unmuted");
      const mIcon = btn.querySelector(".sound-icon-muted");
      const uIcon = btn.querySelector(".sound-icon-unmuted");
      const label = btn.querySelector(".sound-label");
      if (mIcon) mIcon.style.display = "inline-block";
      if (uIcon) uIcon.style.display = "none";
      if (label) label.textContent = "Sound OFF";
      btn.title = "Unmute Audio";
    }
  } else {
    if (iframe) {
      sendYtMessage(iframe, "unMute");
      sendYtMessage(iframe, "setVolume", [100]);
    }
    if (vid) {
      vid.muted = false;
      vid.volume = 1.0;
    }

    if (btn) {
      btn.classList.add("is-unmuted");
      const mIcon = btn.querySelector(".sound-icon-muted");
      const uIcon = btn.querySelector(".sound-icon-unmuted");
      const label = btn.querySelector(".sound-label");
      if (mIcon) mIcon.style.display = "none";
      if (uIcon) uIcon.style.display = "inline-block";
      if (label) label.textContent = "Sound ON";
      btn.title = "Mute Audio";
    }
  }
};

function createFrameHTML(v, cardClass, cat) {
  return `
    <div class="${cardClass}" data-id="${v.id}" id="card-${v.id}">
      <img src="${getThumbnail(v)}" alt="${v.title}" class="reel-thumbnail-img" loading="lazy">
      
      <div class="reel-overlay">
        <div class="reel-overlay-top">
          <span class="reel-tag-badge">${v.duration || (cat.aspect === '9:16' ? '0:45' : '10:00')}</span>
          <button type="button" class="card-top-speaker-pill" onclick="toggleCardVideoSound('${v.id}', event)" title="Play with Sound / Toggle Sound">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            <span>Sound</span>
          </button>
        </div>
        
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
function playVideoInCard(id, card, startUnmuted = false) {
  const video = videos.find(v => v.id === id);
  if (!video) return;

  if (currentlyPlayingCardId && currentlyPlayingCardId !== id) {
    stopCardVideo(currentlyPlayingCardId);
  }

  const existingContainer = card.querySelector(".active-video-container");
  if (existingContainer) {
    const nativeVid = existingContainer.querySelector("video");
    const ytIframe = existingContainer.querySelector("iframe");
    if (nativeVid) {
      if (nativeVid.paused) {
        nativeVid.play().catch(() => {});
      } else {
        nativeVid.pause();
      }
      return;
    }
    if (ytIframe && ytIframe.contentWindow) {
      window.cardPlayStates = window.cardPlayStates || {};
      if (window.cardPlayStates[id] === "paused") {
        sendYtMessage(ytIframe, "playVideo");
        window.cardPlayStates[id] = "playing";
      } else {
        sendYtMessage(ytIframe, "pauseVideo");
        window.cardPlayStates[id] = "paused";
      }
      return;
    }
    return;
  }

  currentlyPlayingCardId = id;
  window.cardSoundStates = window.cardSoundStates || {};
  const isMuted = startUnmuted ? false : (window.cardSoundStates[id] !== false);
  window.cardSoundStates[id] = isMuted;

  const ytId = extractYouTubeId(video.videoUrl);
  const container = document.createElement("div");
  container.className = "active-video-container";

  const origin = (window.location.origin && window.location.origin !== "null") ? window.location.origin : "https://ganacutsvisuals.vercel.app";

  if (ytId) {
    const ytSrc = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`;

    container.innerHTML = `
      <div class="video-fast-loader" id="loader-${id}">
        <div class="fast-spin-ring"></div>
        <span class="fast-spin-text">Buffering...</span>
      </div>
      <div class="clean-yt-crop-box">
        <iframe 
          id="yt-player-${id}"
          src="${ytSrc}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          loading="eager"
          importance="high">
        </iframe>
      </div>
      <div class="video-control-overlay">
        <div class="video-control-top">
          <button type="button" class="speaker-top-btn ${!isMuted ? 'is-unmuted' : ''}" id="sound-btn-${id}" onclick="toggleCardVideoSound('${id}', event)" title="${!isMuted ? 'Mute Audio' : 'Unmute Audio'}" aria-label="Toggle Sound">
            <svg class="sound-icon-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ${!isMuted ? 'style="display:none;"' : ''}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            <svg class="sound-icon-unmuted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ${isMuted ? 'style="display:none;"' : ''}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span class="sound-label">${!isMuted ? 'Sound ON' : 'Sound OFF'}</span>
          </button>
          <div class="video-control-top-actions">
            <button type="button" class="ctrl-btn" onclick="openCinemaModal('${id}')" title="Full Cinema View" aria-label="Expand">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            </button>
            <button type="button" class="ctrl-btn" onclick="stopCardVideo('${id}')" title="Close Video" aria-label="Close">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div class="video-control-bottom">
          <span class="playing-badge">▶ Playing</span>
          <button type="button" class="ctrl-btn-cinema-text" onclick="openCinemaModal('${id}')" style="background:rgba(0,0,0,0.65); border:1px solid rgba(255,255,255,0.18); color:#cbd5e1; font-size:10.5px; padding:4px 10px; border-radius:12px; cursor:pointer;">
            Cinema View ⛶
          </button>
        </div>
      </div>
    `;

    const iframe = container.querySelector("iframe");
    if (iframe) {
      iframe.onload = () => {
        const loader = container.querySelector(".video-fast-loader");
        if (loader) {
          loader.style.opacity = "0";
          setTimeout(() => loader.remove(), 250);
        }
        if (!isMuted) {
          setTimeout(() => {
            sendYtMessage(iframe, "unMute");
            sendYtMessage(iframe, "setVolume", [100]);
          }, 350);
        }
      };
      setTimeout(() => {
        const loader = container.querySelector(".video-fast-loader");
        if (loader) loader.remove();
      }, 3500);
    }
  } else {
    // Native <video> handling
    container.innerHTML = `
      <div class="video-fast-loader" id="loader-${id}">
        <div class="fast-spin-ring"></div>
        <span class="fast-spin-text">Buffering...</span>
      </div>
      <video class="clean-native-video" src="${video.videoUrl}" autoplay playsinline webkit-playsinline ${isMuted ? 'muted' : ''} loop preload="auto"></video>
      <div class="video-control-overlay">
        <div class="video-control-top">
          <button type="button" class="speaker-top-btn ${!isMuted ? 'is-unmuted' : ''}" id="sound-btn-${id}" onclick="toggleCardVideoSound('${id}', event)" title="${!isMuted ? 'Mute Audio' : 'Unmute Audio'}" aria-label="Toggle Sound">
            <svg class="sound-icon-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ${!isMuted ? 'style="display:none;"' : ''}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            <svg class="sound-icon-unmuted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ${isMuted ? 'style="display:none;"' : ''}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span class="sound-label">${!isMuted ? 'Sound ON' : 'Sound OFF'}</span>
          </button>
          <div class="video-control-top-actions">
            <button type="button" class="ctrl-btn" onclick="openCinemaModal('${id}')" title="Full Cinema View" aria-label="Expand">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            </button>
            <button type="button" class="ctrl-btn" onclick="stopCardVideo('${id}')" title="Close Video" aria-label="Close">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div class="video-control-bottom">
          <span class="playing-badge">▶ Playing</span>
          <button type="button" class="ctrl-btn-cinema-text" onclick="openCinemaModal('${id}')" style="background:rgba(0,0,0,0.65); border:1px solid rgba(255,255,255,0.18); color:#cbd5e1; font-size:10.5px; padding:4px 10px; border-radius:12px; cursor:pointer;">
            Cinema View ⛶
          </button>
        </div>
      </div>
    `;

    const vid = container.querySelector("video");
    if (vid) {
      vid.onplaying = () => {
        const loader = container.querySelector(".video-fast-loader");
        if (loader) loader.remove();
      };
      const p = vid.play();
      if (p !== undefined) p.catch(() => {});
    }
  }

  // Allow clicking on video area to toggle play / pause
  container.addEventListener("click", (e) => {
    if (e.target.closest(".speaker-top-btn") || e.target.closest(".ctrl-btn") || e.target.closest(".ctrl-btn-cinema-text")) {
      return;
    }
    const nativeVid = container.querySelector("video");
    const ytIframe = container.querySelector("iframe");
    if (nativeVid) {
      if (nativeVid.paused) nativeVid.play().catch(() => {});
      else nativeVid.pause();
    } else if (ytIframe && ytIframe.contentWindow) {
      window.cardPlayStates = window.cardPlayStates || {};
      if (window.cardPlayStates[id] === "paused") {
        sendYtMessage(ytIframe, "playVideo");
        window.cardPlayStates[id] = "playing";
      } else {
        sendYtMessage(ytIframe, "pauseVideo");
        window.cardPlayStates[id] = "paused";
      }
    }
  });

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
  safeSetText("dash-trash-badge", (trashApplicants || []).length);
  safeSetText("trash-total-count", (trashApplicants || []).length);
  if (typeof renderTrashManager === 'function') renderTrashManager();
  if (typeof renderAdminFolders === 'function') renderAdminFolders();
  if (typeof renderAdminToolsList === 'function') renderAdminToolsList();
  if (typeof renderAdminFeaturedEditorsList === 'function') renderAdminFeaturedEditorsList();
  if (typeof renderAdminPracticeTasksTable === 'function') renderAdminPracticeTasksTable();
  if (typeof renderAdminClientProjectsTable === 'function') renderAdminClientProjectsTable();
  if (typeof renderAdminSubmissionsQueue === 'function') renderAdminSubmissionsQueue();
  if (typeof renderAdminChatUsers === 'function') renderAdminChatUsers();
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
    let waTextMsg = `Hi ${app.name}, this is GanaCuts Visuals. We reviewed your editor portfolio (${app.specialization}) and wanted to connect with you.`;
    if (app.status === 'trial') {
      waTextMsg = `Hi ${app.name}, this is GanaCuts Visuals. Great news! Your portfolio passed our initial review. We have a paid trial video project ready for you. Let's discuss details and footage delivery.`;
    } else if (app.status === 'selected') {
      waTextMsg = `Hi ${app.name}, congratulations! You've been officially selected to join our creative editing team. We have projects lined up and want to coordinate your availability.`;
    }

    const waLink = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(waTextMsg)}`;

    const avatarSrc = getEditorAvatarSrc(app);

    return `
      <div class="applicant-card" id="app-card-${app.id}">
        <div class="applicant-top-bar" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="position:relative; width:46px; height:46px; flex-shrink:0;">
              <img src="${avatarSrc}" alt="${escapeHtml(app.name)}" onerror="this.onerror=null;this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(app.name)}'" class="roster-avatar-circle" style="width:46px; height:46px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-orange); box-shadow:0 0 12px rgba(217,78,40,0.35); display:block;">
            </div>
            <div class="applicant-name-group" style="display:flex; flex-direction:column; gap:3px;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span class="applicant-name" style="font-size:15px; font-weight:700; color:#fff;">${escapeHtml(app.name)}</span>
                <span class="status-badge ${statusClass}">${escapeHtml(app.status || 'pending')}</span>
              </div>
              <span style="font-size:11px; color:#888894;">📍 ${escapeHtml(app.city || 'Remote')} • 📞 ${escapeHtml(app.phone || 'Google Account')}</span>
            </div>
          </div>
          <span class="applied-date" style="font-size:11.5px; color:#888894;">${escapeHtml(app.appliedAt || 'Recently Applied')}</span>
        </div>

        <div class="applicant-details-grid">
          <div class="applicant-detail-item">
            <strong>Location & Contact</strong>
            <span>📍 ${app.city || 'Remote'} • 📞 ${app.phone || 'Google Account'}</span>
          </div>
          <div class="applicant-detail-item">
            <strong>Specialization & Tools</strong>
            <span>🎬 ${app.specialization || 'Video Editing'} (${app.tools || 'Video Editor'})</span>
          </div>
          <div class="applicant-detail-item">
            <strong>Expected payment per reel/video</strong>
            <span>💰 ${app.rate || 'Standard / Discuss'}</span>
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

        <!-- Submitted Draft for GanaCuts Visuals to Review -->
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
          <div class="applicant-action-left" style="flex-wrap:wrap; gap:6px;">
            <a href="${app.portfolio}" target="_blank" rel="noopener" class="portfolio-link-btn" title="Inspect Editor Work">
              <span>View Portfolio ↗</span>
            </a>
            <a href="${waLink}" target="_blank" rel="noopener" class="wa-msg-btn" title="Contact on WhatsApp">
              <span>WhatsApp</span>
            </a>
            <button class="primary-btn" onclick="openChatWithEditor('${app.id}')" style="padding:6px 12px; font-size:11px; background:linear-gradient(135deg, #3b82f6, #2563eb); color:#fff;" title="Chat directly in Portal">💬 Chat</button>
            <button class="secondary-btn light-btn" onclick="openPracticeAssignmentModal('${app.id}')" style="padding:6px 12px; font-size:11px;" title="Assign practice brief">🎯 Practice Task</button>
            <button class="primary-btn" onclick="openClientProjectModal('${app.id}')" style="padding:6px 12px; font-size:11px; background:linear-gradient(135deg, var(--accent-orange), #ea580c); color:#fff;" title="Assign commercial client project">🎬 Client Project</button>
            <button class="secondary-btn light-btn" onclick="openFeaturedEditorModal('${app.id}')" style="padding:6px 12px; font-size:11px; color:#d94e28; border-color:rgba(217,78,40,0.3);" title="Feature in Special Spotlight">⭐ Feature</button>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <select class="status-select" onchange="updateApplicantStatus('${app.id}', this.value)">
              <option value="pending" ${app.status === 'pending' ? 'selected' : ''}>⏳ Pending Review</option>
              <option value="trial" ${app.status === 'trial' ? 'selected' : ''}>🎯 Trial Clip Sent</option>
              <option value="selected" ${app.status === 'selected' ? 'selected' : ''}>✅ Selected / Hired</option>
              <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
            </select>
            <button class="delete-btn" onclick="moveApplicantToTrash('${app.id}')" title="Move to Recycle Bin">Delete</button>
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
window.updateApplicantStatus = async function(id, newStatus) {
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
    if (window.syncApplicantToSupabase) {
      await window.syncApplicantToSupabase(app);
    }
    showToast(`✓ ${app.name} updated to "${newStatus === 'selected' ? 'Selected & Hired' : newStatus}"!`);
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

window.updateApplicantStatusFromSheet = async function(id, newStatus) {
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
    if (window.syncApplicantToSupabase) {
      await window.syncApplicantToSupabase(app);
    }
    showToast(`✓ ${app.name} updated to "${newStatus === 'selected' ? 'Selected & Hired' : newStatus}"!`);
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

    let waText = `Hi ${app.name}, this is GanaCuts Visuals.`;
    if (isSelected) {
      waText = `Hi ${app.name}, this is GanaCuts Visuals. Congratulations on being selected in our agency roster! Let's connect on upcoming client projects.`;
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
        <td style="min-width:200px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${getEditorAvatarSrc(app)}" alt="${escapeHtml(app.name)}" onerror="this.onerror=null;this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(app.name)}'" class="sheet-avatar-circle" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1.5px solid rgba(255,255,255,0.2); box-shadow:0 0 8px rgba(0,0,0,0.4); flex-shrink:0;">
            <div>
              <div style="font-weight:700; color:#fff; font-size:13px;">${escapeHtml(app.name)}</div>
              <div style="font-size:11px; color:#888;">${escapeHtml(app.city || "Remote")}</div>
            </div>
          </div>
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
          <div style="display:flex; gap:6px; align-items:center;">
            <button type="button" class="quick-reply-pill" onclick="openChatWithEditor('${app.id}')" title="Chat directly in Admin Studio" style="padding:4px 8px; font-size:11px;">
              Chat 💬
            </button>
            <button type="button" class="quick-reply-pill" onclick="assignProjectToEditor('${app.id}')" title="Assign project to this editor" style="padding:4px 8px; font-size:11px; background:rgba(59,130,246,0.15); color:#60a5fa; border-color:rgba(59,130,246,0.3);">
              Task +
            </button>
            <button type="button" class="quick-reply-pill" onclick="openFeaturedEditorModal('${app.id}')" title="Feature in Special Spotlight" style="padding:4px 8px; font-size:11px; background:rgba(217,78,40,0.12); color:#d94e28; border-color:rgba(217,78,40,0.3);">
              ⭐ Feature
            </button>
            <button type="button" class="delete-btn" onclick="moveApplicantToTrash('${app.id}')" title="Move to Recycle Bin" style="padding:4px 8px; font-size:11px;">
              🗑️
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
    "Expected payment per reel/video",
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
  body += `Creative Studio: GanaCuts Visuals (designsbygani@gmail.com)\n`;
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

// =========================================================================
// PRACTICE ASSIGNMENTS & CLIENT PROJECTS ENGINE (TABLE ARCHITECTURE)
// =========================================================================
function loadPracticeAssignments() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRACTICE_ASGS);
    practiceAssignments = raw ? JSON.parse(raw) : [];
  } catch (e) {
    practiceAssignments = [];
  }
  if (Array.isArray(practiceAssignments)) {
    practiceAssignments = practiceAssignments.filter(a => a && a.id && a.id !== "asg_practice_default" && !deletedIds.has(a.id));
  } else {
    practiceAssignments = [];
  }
  localStorage.setItem(STORAGE_KEY_PRACTICE_ASGS, JSON.stringify(practiceAssignments));
  window.practiceAssignments = practiceAssignments;
  return practiceAssignments;
}

async function saveAgencyFoldersAndSync(folders) {
  if (!profile) profile = { ...DEFAULT_PROFILE };
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  profile.agencyFolders = (folders || []).filter(f => f && f.id && f.id !== "folder_drive_vault" && !deletedIds.has(f.id));
  localStorage.setItem(STORAGE_KEY_AGENCY_FOLDERS, JSON.stringify(profile.agencyFolders));
  localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
  if (typeof window !== "undefined") window.profile = profile;
  await persistPortfolioToServer();
  await syncAgencyVaultToSupabase();
  return true;
}

async function savePracticeAssignmentsAndSync(tasks) {
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  practiceAssignments = (tasks || []).filter(a => a && a.id && a.id !== "asg_practice_default" && !deletedIds.has(a.id));
  window.practiceAssignments = practiceAssignments;
  localStorage.setItem(STORAGE_KEY_PRACTICE_ASGS, JSON.stringify(practiceAssignments));
  await persistPortfolioToServer();
  await syncAgencyVaultToSupabase();
  return true;
}

async function saveClientProjectsAndSync(projs) {
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  clientProjects = (projs || []).filter(p => p && p.id && p.id !== "proj_client_default" && !deletedIds.has(p.id));
  window.clientProjects = clientProjects;
  localStorage.setItem(STORAGE_KEY_CLIENT_PROJS, JSON.stringify(clientProjects));
  await persistPortfolioToServer();
  await syncAgencyVaultToSupabase();
  return true;
}

async function saveToolsAndSync(tools) {
  if (!profile) profile = { ...DEFAULT_PROFILE };
  profile.tools = Array.isArray(tools) ? tools : [...DEFAULT_TOOLS];
  localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
  if (typeof window !== "undefined") window.profile = profile;
  await persistPortfolioToServer();
  await syncAgencyVaultToSupabase();
  if (typeof renderTools === 'function') renderTools();
  return true;
}

async function saveFeaturedEditorsAndSync(editors) {
  if (!profile) profile = { ...DEFAULT_PROFILE };
  profile.featuredEditors = Array.isArray(editors) ? editors : [];
  localStorage.setItem(STORAGE_KEY_PROF, JSON.stringify(profile));
  if (typeof window !== "undefined") window.profile = profile;
  await persistPortfolioToServer();
  await syncAgencyVaultToSupabase();
  if (typeof renderFeaturedEditors === 'function') renderFeaturedEditors();
  return true;
}

function savePracticeAssignments() {
  return savePracticeAssignmentsAndSync(practiceAssignments);
}

function loadClientProjects() {
  const deletedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_VAULT_IDS) || "[]"));
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLIENT_PROJS);
    clientProjects = raw ? JSON.parse(raw) : [];
  } catch (e) {
    clientProjects = [];
  }
  if (Array.isArray(clientProjects)) {
    clientProjects = clientProjects.filter(p => p && p.id && p.id !== "proj_client_default" && !deletedIds.has(p.id));
  } else {
    clientProjects = [];
  }
  localStorage.setItem(STORAGE_KEY_CLIENT_PROJS, JSON.stringify(clientProjects));
  window.clientProjects = clientProjects;
  return clientProjects;
}

function saveClientProjects() {
  return saveClientProjectsAndSync(clientProjects);
}

// Initial loader
loadPracticeAssignments();
loadClientProjects();

window.loadPracticeAssignments = loadPracticeAssignments;
window.savePracticeAssignments = savePracticeAssignments;
window.loadClientProjects = loadClientProjects;
window.saveClientProjects = saveClientProjects;
window.saveAgencyFoldersAndSync = saveAgencyFoldersAndSync;
window.savePracticeAssignmentsAndSync = savePracticeAssignmentsAndSync;
window.saveClientProjectsAndSync = saveClientProjectsAndSync;
window.saveToolsAndSync = saveToolsAndSync;
window.saveFeaturedEditorsAndSync = saveFeaturedEditorsAndSync;
window.recordDeletedVaultId = recordDeletedVaultId;

window.getPracticeAssignmentsForEditor = function(editorId) {
  loadPracticeAssignments();
  return (practiceAssignments || []).filter(a => {
    if (!a.assignedEditorIds || !Array.isArray(a.assignedEditorIds) || a.assignedEditorIds.length === 0) return true;
    return a.assignedEditorIds.includes('all') || a.assignedEditorIds.includes(editorId);
  });
};

window.getClientProjectsForEditor = function(editorId) {
  loadClientProjects();
  return (clientProjects || []).filter(p => {
    if (!p.assignedEditorIds || !Array.isArray(p.assignedEditorIds) || p.assignedEditorIds.length === 0) return true;
    return p.assignedEditorIds.includes('all') || p.assignedEditorIds.includes(editorId);
  });
};

window.createPracticeAssignment = async function({ title, description, links, assignedEditorIds }) {
  loadPracticeAssignments();
  const newAsg = {
    id: "asg_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    title: title || "Practice Editing Task",
    description: description || "Follow high-retention pacing and audio sound design.",
    links: Array.isArray(links) ? links : [],
    assignedEditorIds: Array.isArray(assignedEditorIds) && assignedEditorIds.length > 0 ? assignedEditorIds : ["all"],
    submissions: {},
    createdAt: Date.now()
  };
  practiceAssignments.unshift(newAsg);
  await savePracticeAssignmentsAndSync(practiceAssignments);

  const targetIds = newAsg.assignedEditorIds.includes('all')
    ? applicants.map(a => a.id)
    : newAsg.assignedEditorIds;

  targetIds.forEach(edId => {
    if (typeof sendAdminMessage === 'function') {
      sendAdminMessage(edId, `🎯 New Practice Assignment from GanaCuts Visuals: "${newAsg.title}". Check your Practice Assignments table to download raw assets and submit your work.`, "GanaCuts Visuals (Admin)");
    }
  });

  return newAsg;
};

window.createClientProject = async function({ clientName, title, description, links, assignedEditorIds, deadline }) {
  loadClientProjects();
  const newProj = {
    id: "proj_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    clientName: clientName || "Commercial Client",
    title: title || "Client Reel Cut",
    description: description || "High-retention commercial cut.",
    links: Array.isArray(links) ? links : [],
    assignedEditorIds: Array.isArray(assignedEditorIds) && assignedEditorIds.length > 0 ? assignedEditorIds : ["all"],
    deadline: deadline || "24-48 Hours",
    submissions: {},
    createdAt: Date.now()
  };
  clientProjects.unshift(newProj);
  await saveClientProjectsAndSync(clientProjects);

  const targetIds = newProj.assignedEditorIds.includes('all')
    ? applicants.map(a => a.id)
    : newProj.assignedEditorIds;

  targetIds.forEach(edId => {
    if (typeof sendAdminMessage === 'function') {
      sendAdminMessage(edId, `🎬 New Client Project Assigned: "${newProj.title}" for "${newProj.clientName}". Check your Client Projects table to download assets and submit your cut.`, "GanaCuts Visuals (Admin)");
    }
  });

  return newProj;
};

window.deletePracticeAssignment = async function(asgId) {
  if (typeof recordDeletedVaultId === 'function') recordDeletedVaultId(asgId);
  loadPracticeAssignments();
  practiceAssignments = practiceAssignments.filter(a => a && a.id !== asgId);
  return await savePracticeAssignmentsAndSync(practiceAssignments);
};

window.deleteClientProject = async function(projId) {
  if (typeof recordDeletedVaultId === 'function') recordDeletedVaultId(projId);
  loadClientProjects();
  clientProjects = clientProjects.filter(p => p && p.id !== projId);
  return await saveClientProjectsAndSync(clientProjects);
};

window.submitPracticeAssignmentWork = async function(asgId, editorId, videoUrl, notes) {
  loadPracticeAssignments();
  const asg = practiceAssignments.find(a => a.id === asgId);
  if (!asg) return;
  if (!asg.submissions) asg.submissions = {};
  const now = new Date();
  const submittedAt = now.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' }) + ", " + now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });
  asg.submissions[editorId] = { videoUrl, notes, submittedAt };
  await savePracticeAssignmentsAndSync(practiceAssignments);

  const ed = applicants.find(a => a.id === editorId);
  if (ed) {
    if (!ed.practiceSubmissions) ed.practiceSubmissions = {};
    ed.practiceSubmissions[asgId] = { videoUrl, notes, submittedAt };
    saveApplicants();
    if (window.syncApplicantToSupabase) window.syncApplicantToSupabase(ed);
  }

  const edName = ed ? ed.name : "Editor";
  if (typeof sendEditorMessage === 'function') {
    sendEditorMessage(editorId, `📤 Submitted practice work for "${asg.title}": ${videoUrl} (${notes || 'Practice cut complete'})`, edName);
  }
};

window.submitClientProjectWork = async function(projId, editorId, videoUrl, notes) {
  loadClientProjects();
  const proj = clientProjects.find(p => p.id === projId);
  if (!proj) return;
  if (!proj.submissions) proj.submissions = {};
  const now = new Date();
  const submittedAt = now.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' }) + ", " + now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });
  proj.submissions[editorId] = { videoUrl, notes, submittedAt, status: "submitted" };
  await saveClientProjectsAndSync(clientProjects);

  const ed = applicants.find(a => a.id === editorId);
  if (ed) {
    if (!ed.clientSubmissions) ed.clientSubmissions = {};
    ed.clientSubmissions[projId] = { videoUrl, notes, submittedAt };
    ed.submittedDraft = { url: videoUrl, notes, date: submittedAt };
    saveApplicants();
    if (window.syncApplicantToSupabase) window.syncApplicantToSupabase(ed);
  }

  const edName = ed ? ed.name : "Editor";
  if (typeof sendEditorMessage === 'function') {
    sendEditorMessage(editorId, `🎬 Submitted client cut for "${proj.title}" (${proj.clientName}): ${videoUrl} (${notes || 'Client cut ready for review'})`, edName);
  }
};

// Assign Project / Paid Trial to Editor
window.assignProjectToEditor = function(id) {
  const app = applicants.find(a => a.id === id);
  if (!app) return;

  const isHired = app.status === "selected";
  if (isHired) {
    const clientName = prompt(`Enter Client / Brand name for ${app.name} (e.g. Kokapet Luxury Realtor / Tech Channel):`, "Commercial Brand Client");
    if (!clientName) return;
    const title = prompt(`Assign Client Project Title to ${app.name}:`, "30s Commercial Reel");
    if (!title) return;
    const footageUrl = prompt("Enter Google Drive / Dropbox raw client footage link:", "https://drive.google.com/drive/folders/client-footage");
    if (!footageUrl) return;
    const payout = prompt(`Enter instant UPI payout amount for this edit:`, app.rate || "₹1,200");
    const instructions = prompt("Enter Creative Brief & editing instructions:", "High-retention pacing, 128 BPM soundtrack, narrative storytelling subtitles, DaVinci grade.");

    app.assignedProject = {
      isClientProject: true,
      clientName,
      title,
      footageUrl,
      payout: payout || "₹1,200",
      instructions: instructions || "High-retention client cut.",
      deadline: "24-48 Hours"
    };
    app.adminFeedback = `Commercial Project assigned: "${title}" for ${clientName}. Download raw footage and submit draft cut.`;
  } else {
    const title = prompt(`Assign Practice / Test Task Title to ${app.name}:`, "Practice Task: Documentary / AI Storytelling & Pacing");
    if (!title) return;
    const footageUrl = prompt("Enter Google Drive / Dropbox raw footage link for test clip:", "https://drive.google.com/drive/folders/sample-footage");
    if (!footageUrl) return;
    const payout = prompt(`Enter test clip payout (or leave blank if trial):`, app.rate || "₹800");
    const instructions = prompt("Enter screening test instructions:", "Cut to beat, add zoom cuts, and demonstrate text animations.");

    app.assignedProject = {
      isClientProject: false,
      title,
      footageUrl,
      payout: payout || "₹800",
      instructions: instructions || "High-retention screening test.",
      deadline: "24-48 Hours"
    };
    app.status = "trial";
    app.adminFeedback = `Screening test assigned: "${title}". Raw assets link added to your workspace.`;
  }

  saveApplicants();
  updateAdminUI();
  if (window.syncApplicantToSupabase) {
    window.syncApplicantToSupabase(app);
  }
  alert(`✓ Assignment successfully saved for ${app.name}! They will see the raw footage and brief inside their Editor Studio.`);
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

// Save Trash Applicants
function saveTrashApplicants() {
  localStorage.setItem(STORAGE_KEY_TRASH_APPS, JSON.stringify(trashApplicants));
}

// Global Clean Toast Notification
function showToast(msg, duration = 3200) {
  let toast = document.getElementById("gcv-global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "gcv-global-toast";
    toast.style.cssText = "position:fixed; bottom:24px; right:24px; background:#18181c; border:1px solid #10b981; color:#fff; padding:12px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 10px 30px rgba(0,0,0,0.6); z-index:99999; display:flex; align-items:center; gap:8px; transition:opacity 0.3s, transform 0.3s; opacity:0; transform:translateY(10px); pointer-events:none;";
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
  }, duration);
}

// Move Applicant to Recycle Bin (Trash)
window.moveApplicantToTrash = async function(id) {
  const app = applicants.find(a => a.id === id);
  if (!app) return;
  if (!confirm(`Move "${app.name}" to Recycle Bin? You can restore their complete details anytime from the Recycle Bin tab.`)) return;

  const trashItem = {
    ...app,
    deletedAt: new Date().toLocaleString(),
    previousStatus: app.status || "pending"
  };
  trashApplicants.unshift(trashItem);
  saveTrashApplicants();

  applicants = applicants.filter(a => a.id !== id);
  saveApplicants();

  if (globalSupabase) {
    try {
      await globalSupabase.from('applicants').delete().eq('id', id);
    } catch (e) {
      console.warn("Supabase trash delete notice:", e);
    }
  }

  updateAdminUI();
  showToast(`🗑️ "${app.name}" moved to Recycle Bin.`);
};

window.deleteApplicant = window.moveApplicantToTrash;

// Restore Applicant from Recycle Bin back to active roster
window.restoreApplicantFromTrash = async function(id) {
  const itemIndex = trashApplicants.findIndex(t => t.id === id);
  if (itemIndex === -1) return;

  const item = trashApplicants[itemIndex];
  trashApplicants.splice(itemIndex, 1);
  saveTrashApplicants();

  const restoredApp = {
    ...item,
    status: item.previousStatus || "pending"
  };
  delete restoredApp.deletedAt;
  delete restoredApp.previousStatus;

  applicants.unshift(restoredApp);
  saveApplicants();

  if (window.syncApplicantToSupabase) {
    await window.syncApplicantToSupabase(restoredApp);
  }

  updateAdminUI();
  showToast(`♻️ "${restoredApp.name}" restored to active roster!`);
};

// Permanently delete applicant from Recycle Bin
window.permanentlyDeleteApplicant = function(id) {
  const item = trashApplicants.find(t => t.id === id);
  const name = item ? item.name : "this editor";
  if (!confirm(`Permanently delete ${name} from Recycle Bin? This action cannot be undone.`)) return;

  trashApplicants = trashApplicants.filter(t => t.id !== id);
  saveTrashApplicants();
  updateAdminUI();
  showToast(`Editor permanently deleted.`);
};

// Empty entire Recycle Bin
window.emptyTrashBin = function() {
  if (trashApplicants.length === 0) {
    alert("Recycle Bin is already empty.");
    return;
  }
  if (!confirm(`Permanently empty entire Recycle Bin (${trashApplicants.length} editors)? This cannot be undone.`)) return;

  trashApplicants = [];
  saveTrashApplicants();
  updateAdminUI();
  showToast(`Recycle Bin emptied.`);
};

// Render Recycle Bin Manager View
window.renderTrashManager = function() {
  const listEl = document.getElementById("trash-manage-list");
  safeSetText("dash-trash-badge", trashApplicants.length);
  safeSetText("trash-total-count", trashApplicants.length);
  if (!listEl) return;

  if (trashApplicants.length === 0) {
    listEl.innerHTML = `
      <div class="empty-cat-box" style="padding:40px 20px; text-align:center;">
        <div style="font-size:32px; margin-bottom:8px;">🗑️</div>
        <h4 style="color:#fff; font-size:16px; margin-bottom:6px;">Recycle Bin is Empty</h4>
        <p style="color:#888894; font-size:13px; max-width:440px; margin:0 auto;">When you delete members from the spreadsheet or editor roster, their complete details are safely held here for quick recovery.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${trashApplicants.map(app => `
        <div class="applicant-card" style="border-left: 3px solid #ef4444; background:#18181c; opacity:0.95;">
          <div class="applicant-top-bar">
            <div class="applicant-name-group">
              <span class="applicant-name" style="color:#fff;">${escapeHtml(app.name)}</span>
              <span class="status-badge" style="background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3);">Deleted: ${escapeHtml(app.deletedAt || 'Recent')}</span>
              <span style="font-size:11px; color:#888;">Prev Status: <strong>${escapeHtml(app.previousStatus || 'pending')}</strong></span>
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="primary-btn" onclick="restoreApplicantFromTrash('${app.id}')" style="padding:6px 14px; font-size:12px; background:#10b981; border-color:#10b981;">
                ♻️ Restore to Active Roster
              </button>
              <button type="button" class="delete-btn" onclick="permanentlyDeleteApplicant('${app.id}')" style="padding:6px 12px; font-size:12px;">
                ✕ Erase
              </button>
            </div>
          </div>
          <div class="applicant-details-grid" style="margin-top:10px;">
            <div class="applicant-detail-item">
              <strong>Contact</strong>
              <span>📞 ${escapeHtml(app.phone || 'N/A')} • ✉️ ${escapeHtml(app.email || 'N/A')} • 📍 ${escapeHtml(app.city || 'Remote')}</span>
            </div>
            <div class="applicant-detail-item">
              <strong>Tools & Styles</strong>
              <span>🎬 ${escapeHtml(app.specialization || 'Video Editing')} (${escapeHtml(app.tools || 'Tools')})</span>
            </div>
            <div class="applicant-detail-item">
              <strong>Rate & Portfolio</strong>
              <span>💰 ${escapeHtml(app.rate || 'Standard')} • <a href="${escapeHtml(app.portfolio || '#')}" target="_blank" rel="noopener" style="color:#60a5fa;">Link ↗</a></span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
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
    const removedVideos = videos.filter(v => v.categoryId === id);
    videos = videos.filter(v => v.categoryId !== id);
    categories.forEach((c, i) => c.order = i + 1);
    saveCategories();
    saveVideos();
    if (globalSupabase) {
      globalSupabase.from('categories').delete().eq('id', id).then(() => {
        console.log("Category removed from Supabase cloud:", id);
      }).catch(err => console.warn("Supabase category delete notice:", err));
      if (removedVideos.length > 0) {
        const removedIds = removedVideos.map(v => v.id);
        globalSupabase.from('portfolio_videos').delete().in('id', removedIds).catch(() => {});
      }
    }
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
    if (globalSupabase) {
      globalSupabase.from('portfolio_videos').delete().eq('id', id).then(() => {
        console.log("Video removed from Supabase cloud:", id);
      }).catch(err => console.warn("Supabase video delete notice:", err));
    }
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
  if (tabName === "trash" && typeof renderTrashManager === "function") {
    renderTrashManager();
  }
  if ((tabName === "profile" || tabName === "overview" || tabName === "sheet") && typeof renderAdminFolders === "function") {
    renderAdminFolders();
  }
  if ((tabName === "applicants" || tabName === "submissions" || tabName === "overview") && typeof renderAdminPracticeTasksTable === "function") {
    renderAdminPracticeTasksTable();
  }
  if ((tabName === "applicants" || tabName === "submissions" || tabName === "overview") && typeof renderAdminClientProjectsTable === "function") {
    renderAdminClientProjectsTable();
  }
  if ((tabName === "applicants" || tabName === "submissions" || tabName === "overview") && typeof renderAdminSubmissionsQueue === "function") {
    renderAdminSubmissionsQueue();
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
        <p>Hi <strong>${match.name}</strong>, your application and <strong>${match.specialization}</strong> portfolio are currently being assessed by GanaCuts Visuals. We review submissions within 24–48 hours. Keep your WhatsApp notifications active!</p>
      </div>
    `;
  } else if (status === "trial") {
    statusBadgeLabel = "🎯 Practice Task Assigned";
    statusBadgeClass = "status-trial";
    alertMessage = `
      <div class="status-msg-box trial">
        <h5 style="font-weight:700; margin-bottom:4px; font-size:14px;">🎯 Step 3: Practice Brief & Test Clip Assigned!</h5>
        <p>Congratulations <strong>${match.name}</strong>! Your portfolio passed initial screening. GanaCuts Visuals has assigned you a practice brief. Open your Editor Studio below to access raw footage and submit your work.</p>
      </div>
    `;
  } else if (status === "selected") {
    statusBadgeLabel = "✅ Official Agency Roster";
    statusBadgeClass = "status-selected";
    alertMessage = `
      <div class="status-msg-box selected" style="border: 1px solid rgba(255, 230, 0, 0.4); background: linear-gradient(135deg, rgba(255, 230, 0, 0.1) 0%, rgba(20, 20, 26, 0.95) 100%);">
        <h5 style="font-weight:800; margin-bottom:6px; font-size:15px; color:#ffe600;">👑 Step 4: Welcome to GanaCuts Visuals Roster!</h5>
        <p style="margin-bottom:12px;">Outstanding work, <strong>${match.name}</strong>! You are officially onboarded to the GanaCuts Visuals editor roster. Your personal <strong>Editor Workspace</strong> is unlocked with active commercial client projects, practice briefs, and asset drives.</p>
        <div>
          <a href="/editor" class="primary-btn" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; font-size:13px; font-weight:700; text-decoration:none; box-shadow:0 0 16px rgba(217,78,40,0.4);">
            <span>🚀 Enter Editor Workspace ➔</span>
          </a>
        </div>
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
  const waContactLink = `https://wa.me/917075081947?text=${encodeURIComponent(`Hi GanaCuts Visuals, I am checking the status of my editor application (${match.name} - ${cleanPhone}).`)}`;

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
          <strong style="color:var(--accent-orange); font-size:12px; display:block; margin-bottom:4px;">DIRECT NOTE FROM GANACUTS VISUALS:</strong>
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
          <div><strong>Expected payment per reel/video:</strong> ${match.rate || 'Negotiable'}</div>

        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <a href="/editor" target="_blank" class="secondary-btn light-btn" style="padding:8px 14px; font-size:12px; text-decoration:none;">
            <span>Editor Portal Dashboard ↗</span>
          </a>
          <a href="${waContactLink}" target="_blank" rel="noopener" class="primary-btn" style="padding:8px 14px; font-size:12px;">
            <span>Message GanaCuts Visuals on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

window.updateModalTools = function() {
  const container = document.getElementById("modal-tool-pills");
  if (!container) return;
  const selected = Array.from(container.querySelectorAll(".tool-pill.selected")).map(p => p.getAttribute("data-tool"));
  const hiddenInput = document.getElementById("apply-tools");
  if (hiddenInput) {
    hiddenInput.value = selected.join(", ") || "Video Editor";
  }
};

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
    applyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("apply-name").value.trim();
      const phone = document.getElementById("apply-phone").value.trim();
      const portfolio = document.getElementById("apply-portfolio").value.trim();
      const emailInput = document.getElementById("apply-email");
      const email = (emailInput ? emailInput.value.trim().toLowerCase() : "") || `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`;
      const toolsInput = document.getElementById("apply-tools");
      const tools = (toolsInput ? toolsInput.value.trim() : "") || "Premiere Pro, DaVinci Resolve";
      const city = document.getElementById("apply-city") ? document.getElementById("apply-city").value.trim() : "Remote";
      const specialization = document.getElementById("apply-specialization") ? document.getElementById("apply-specialization").value : "Video Editing";
      const rate = document.getElementById("apply-rate") ? document.getElementById("apply-rate").value.trim() : "Standard / Discuss";
      const notes = document.getElementById("apply-notes") ? document.getElementById("apply-notes").value.trim() : "";


      const now = new Date();
      const dateFormatted = now.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });

      const newApp = {
        id: "app_" + Date.now(),
        name,
        email,
        phone,
        city: city || "Remote",
        tools: tools || "Video Editor",
        portfolio,
        specialization: specialization || "Video Editing",
        rate: rate || "Standard / Discuss",
        notes,

        adminFeedback: "Application received. Portfolio queued for review by GanaCuts Visuals.",
        status: "pending",
        appliedAt: dateFormatted
      };

      applicants.unshift(newApp);
      saveApplicants();

      // Sync to Supabase cloud immediately
      if (typeof syncApplicantToSupabase === 'function') {
        syncApplicantToSupabase(newApp);
      }
      syncApplicantToGoogleSheet(newApp);
      updateAdminUI();
      applyForm.reset();

      // Save editor session
      localStorage.setItem("cutscale_editor_session", JSON.stringify({
        phone: newApp.phone,
        name: newApp.name,
        email: newApp.email,
        ts: Date.now()
      }));

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
