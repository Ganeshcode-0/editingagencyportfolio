const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://urrvvmmurxjwqocrpxct.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || 'sb_publishable_pef_sQ4erO4VhiILPGo6Rw_HgRXR496';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || '';

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
  res.end(JSON.stringify(data));
}

function postToSupabase(endpoint, payload, useServiceRole = false) {
  return new Promise((resolve, reject) => {
    const key = (useServiceRole && SUPABASE_SERVICE_ROLE) ? SUPABASE_SERVICE_ROLE : SUPABASE_ANON;
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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
    return res.end();
  }

  // GET: Health & Diagnostic Status
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const action = url.searchParams.get('action');

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
      hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE),
      supabaseUrl: SUPABASE_URL
    });
  }

  // POST: Sync Single or Multiple Applicants
  if (req.method === 'POST') {
    try {
      const body = await parseBody(req);
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
        portfolio: app.portfolio || '',
        specialization: app.specialization || 'Video Editing',
        rate: app.rate || 'Negotiable',
        status: app.status || 'pending',
        admin_feedback: app.adminFeedback || '',
        applied_at: app.appliedAt || new Date().toISOString()
      };

      if (app.assignedProject) payload.assigned_project = app.assignedProject;
      if (app.submittedDraft) payload.submitted_draft = app.submittedDraft;
      if (app.avatarUrl || app.avatar_url) payload.avatar_url = app.avatarUrl || app.avatar_url;
      if (app.editorTier) payload.editor_tier = app.editorTier;
      if (app.adminDescription !== undefined) payload.admin_description = app.adminDescription;
      if (app.isApproved !== undefined) payload.is_approved = app.isApproved;
      if (app.role) payload.role = app.role;
      if (app.isManager !== undefined) payload.is_manager = app.isManager;

      // Try service role key first if available (guarantees RLS bypass)
      if (SUPABASE_SERVICE_ROLE) {
        try {
          const srResult = await postToSupabase('/rest/v1/applicants', payload, true);
          if (srResult.statusCode >= 200 && srResult.statusCode < 300) {
            return sendJson(res, 200, { success: true, via: 'service_role', applicant: payload });
          }
        } catch (srErr) {}
      }

      // Try anon key
      const anonResult = await postToSupabase('/rest/v1/applicants', payload, false);
      if (anonResult.statusCode >= 200 && anonResult.statusCode < 300) {
        return sendJson(res, 200, { success: true, via: 'anon', applicant: payload });
      }

      // Check if blocked by Row Level Security
      if (anonResult.data && (anonResult.data.code === '42501' || (anonResult.data.message && anonResult.data.message.includes('row-level security')))) {
        return sendJson(res, 403, {
          success: false,
          code: '42501',
          error: 'Supabase Row Level Security is blocking writes on table applicants. Run supabase-fix-rls.sql in Supabase Dashboard.',
          details: anonResult.data
        });
      }

      return sendJson(res, anonResult.statusCode || 500, {
        success: false,
        error: anonResult.data?.message || 'Database write failed',
        details: anonResult.data
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message || 'Server error' });
    }
  }

  return sendJson(res, 405, { success: false, error: 'Method not allowed' });
};
