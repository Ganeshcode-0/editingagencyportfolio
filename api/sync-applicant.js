const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://urrvvmmurxjwqocrpxct.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || 'sb_publishable_pef_sQ4erO4VhiILPGo6Rw_HgRXR496';
let SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';

// Server-side cache for high-reliability cross-device syncing even when Supabase RLS is misconfigured
const cachedApplicants = [];
const cachedInquiries = [];

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey, x-supabase-service-role');
  res.end(JSON.stringify(data));
}

function postToSupabase(endpoint, payload, customServiceKey = '') {
  return new Promise((resolve, reject) => {
    const key = customServiceKey || SUPABASE_SERVICE_ROLE || SUPABASE_ANON;
    const url = new URL(endpoint, SUPABASE_URL);

    const postData = JSON.stringify(payload);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation,resolution=merge-duplicates',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(data); } catch (e) { parsed = data; }
        resolve({ statusCode: res.statusCode, data: parsed });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Supabase request timed out'));
    });

    req.write(postData);
    req.end();
  });
}

module.exports = async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey, x-supabase-service-role');
    return res.end();
  }

  const customKey = req.headers['x-supabase-service-role'] || '';
  if (customKey && !SUPABASE_SERVICE_ROLE) {
    SUPABASE_SERVICE_ROLE = customKey;
  }

  // GET: Health, Sync & Retrieval Status
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const action = url.searchParams.get('action') || url.searchParams.get('type');

    // Return submitted project quote inquiries
    if (action === 'inquiries' || action === 'inquiry') {
      return sendJson(res, 200, {
        success: true,
        count: cachedInquiries.length,
        inquiries: cachedInquiries
      });
    }

    // Return new applicants registered in cloud bridge
    if (action === 'applicants' || action === 'applicant') {
      return sendJson(res, 200, {
        success: true,
        count: cachedApplicants.length,
        applicants: cachedApplicants
      });
    }

    // Return private backup roster for admin import
    if (action === 'backup') {
      try {
        const backupPath = path.join(__dirname, '..', 'data', 'private_applicants_backup.json');
        if (fs.existsSync(backupPath)) {
          const raw = fs.readFileSync(backupPath, 'utf8');
          const backup = JSON.parse(raw);
          return sendJson(res, 200, { success: true, count: backup.length, applicants: backup });
        }
      } catch (e) {
        return sendJson(res, 500, { success: false, error: 'Backup not found' });
      }
    }

    return sendJson(res, 200, {
      status: 'ok',
      hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE || customKey),
      supabaseUrl: SUPABASE_URL,
      cachedApplicantsCount: cachedApplicants.length,
      cachedInquiriesCount: cachedInquiries.length
    });
  }

  // POST: Sync Applicants or Client Inquiries
  if (req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const reqType = body.type || (body.inquiry ? 'inquiry' : 'applicant');

      // 1. SYNC CLIENT PROJECT QUOTE INQUIRY
      if (reqType === 'inquiry' || body.inquiry) {
        const inq = body.inquiry || body;
        const inqRecord = {
          id: inq.id || ('inq_' + Date.now()),
          client_name: inq.client_name || inq.name || 'Client',
          brand_name: inq.brand_name || inq.brand || '',
          contact: inq.contact || inq.phone || '',
          email: inq.email || '',
          project_type: inq.project_type || inq.projectType || 'Short-Form Reels',
          video_count: inq.video_count || inq.videoCount || '1-3 Videos',
          budget: inq.budget || 'Discuss with Agency',
          footage_link: inq.footage_link || inq.footageLink || '',
          notes: inq.notes || '',
          status: inq.status || 'new',
          created_at: inq.created_at || new Date().toISOString()
        };

        // Add to server-side cache
        const existingIdx = cachedInquiries.findIndex(i => i.id === inqRecord.id);
        if (existingIdx >= 0) cachedInquiries[existingIdx] = inqRecord;
        else cachedInquiries.unshift(inqRecord);

        // Attempt Supabase insert
        let sbResult = null;
        try {
          sbResult = await postToSupabase('/rest/v1/client_inquiries', inqRecord, customKey);
        } catch (e) {}

        return sendJson(res, 200, {
          success: true,
          type: 'inquiry',
          inquiry: inqRecord,
          supabaseStatus: sbResult ? sbResult.statusCode : null
        });
      }

      // 2. SYNC APPLICANT / EDITOR PROFILE
      const app = body.applicant || body.app || body;
      if (!app || !app.id) {
        return sendJson(res, 400, { success: false, error: 'Missing applicant id' });
      }

      const payload = body.payload || {
        id: app.id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        city: app.city || 'Remote',
        tools: app.tools || '',
        languages: app.languages || '',
        portfolio: app.portfolio || '',
        specialization: app.specialization || 'Video Editing',
        rate: app.rate || 'Negotiable',
        status: app.status || 'pending',
        admin_feedback: app.adminFeedback || '',
        applied_at: app.appliedAt || new Date().toISOString()
      };

      if (app.languages) payload.languages = app.languages;
      if (app.assignedProject) payload.assigned_project = app.assignedProject;
      if (app.submittedDraft) payload.submitted_draft = app.submittedDraft;
      if (app.avatarUrl || app.avatar_url) payload.avatar_url = app.avatarUrl || app.avatar_url;
      if (app.editorTier) payload.editor_tier = app.editorTier;
      if (app.adminDescription !== undefined) payload.admin_description = app.adminDescription;
      if (app.isApproved !== undefined) payload.is_approved = app.isApproved;
      if (app.role) payload.role = app.role;
      if (app.isManager !== undefined) payload.is_manager = app.isManager;

      // Update in-memory server cache
      const appIdx = cachedApplicants.findIndex(a => a.id === app.id || (app.email && a.email && a.email.toLowerCase() === app.email.toLowerCase()));
      if (appIdx >= 0) cachedApplicants[appIdx] = { ...cachedApplicants[appIdx], ...app, ...payload };
      else cachedApplicants.unshift({ ...app, ...payload });

      // Try Supabase write
      let writeSuccess = false;
      let lastResult = null;

      try {
        lastResult = await postToSupabase('/rest/v1/applicants', payload, customKey);
        if (lastResult.statusCode >= 200 && lastResult.statusCode < 300) {
          writeSuccess = true;
        } else if (lastResult.data && lastResult.data.code === '42703') {
          // If columns like languages, role, etc. don't exist yet in Supabase schema, strip and retry
          const safePayload = { ...payload };
          delete safePayload.languages;
          delete safePayload.avatar_url;
          delete safePayload.editor_tier;
          delete safePayload.admin_description;
          delete safePayload.is_approved;
          delete safePayload.role;
          delete safePayload.is_manager;
          const retryRes = await postToSupabase('/rest/v1/applicants', safePayload, customKey);
          if (retryRes.statusCode >= 200 && retryRes.statusCode < 300) writeSuccess = true;
        }
      } catch (postErr) {}

      return sendJson(res, 200, {
        success: true,
        applicant: { ...app, ...payload },
        supabaseWrite: writeSuccess,
        cachedCount: cachedApplicants.length
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message || 'Server error' });
    }
  }

  return sendJson(res, 405, { success: false, error: 'Method not allowed' });
};
