const https = require('https');
const fs = require('fs');
const path = require('path');

// Safe Rate Limiter (max 30 requests per minute per IP)
const rateLimitMap = new Map();
function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30;
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    rateLimitMap.set(ip, record);
    return false;
  }
  record.count++;
  rateLimitMap.set(ip, record);
  return record.count > maxRequests;
}

function isUsableKey(k) {
  if (!k || typeof k !== 'string') return false;
  const s = k.trim();
  if (s.length < 15) return false;
  if (/^(your_actual_key|placeholder|your_key|none|null|undefined|test_key)/i.test(s)) return false;
  return true;
}

// Helper to safely get Gemini API Key without leaking to frontend
function getGeminiApiKey(req, body) {
  // 1. Check Vercel / Node server environment variables
  const envCandidates = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_KEY,
    process.env.GOOGLE_GEMINI_API_KEY,
    process.env.GOOGLE_API_KEY
  ];
  for (const c of envCandidates) {
    if (isUsableKey(c)) {
      return c.trim();
    }
  }

  // 2. Check any environment variable containing GEMINI
  if (process.env) {
    for (const [k, v] of Object.entries(process.env)) {
      if (k.toUpperCase().includes('GEMINI') && isUsableKey(v)) {
        return v.trim();
      }
    }
  }

  // 3. Check Authorization header (Bearer <key>) or x-gemini-key from authenticated admin request
  if (req) {
    const authHeader = req.headers?.['authorization'] || req.headers?.['Authorization'] || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      if (isUsableKey(token)) return token;
    }
    const xKey = req.headers?.['x-gemini-key'] || req.headers?.['X-Gemini-Key'];
    if (isUsableKey(xKey)) {
      return xKey.trim();
    }
  }

  // 4. Check body if supplied
  if (isUsableKey(body?.apiKey)) {
    return body.apiKey.trim();
  }

  // 5. Check local .env for local Node development
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const m = content.match(/GEMINI_API_KEY=([^\r\n]+)/);
      if (m && isUsableKey(m[1])) return m[1].trim();
    }
  } catch (e) {}

  return null;
}

// Call Google Gemini API
function callGemini(prompt, isJson = true, customKey = null) {
  return new Promise((resolve, reject) => {
    const apiKey = customKey || getGeminiApiKey();
    if (!apiKey) {
      return reject(new Error('GEMINI_API_KEY is not configured in server environment.'));
    }

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: isJson ? 'application/json' : 'text/plain',
        temperature: isJson ? 0.2 : 0.4
      }
    });

    const candidateModels = [
      'gemini-3.5-flash-lite',
      'gemini-3-flash-preview'
    ];

    function tryModel(index) {
      if (index >= candidateModels.length) {
        return reject(new Error('All Gemini AI models currently busy or unreachable.'));
      }
      const model = candidateModels[index];

      const req = https.request({
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        },
        timeout: 15000
      }, res => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const data = JSON.parse(body);
              let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (isJson) {
                rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
                const json = JSON.parse(rawText);
                return resolve(json);
              }
              return resolve(rawText.trim());
            } catch (err) {
              return reject(new Error('Failed to parse Gemini response: ' + err.message));
            }
          } else if (res.statusCode === 404 || res.statusCode === 503 || res.statusCode === 429) {
            console.warn(`[Gemini] ${model} returned ${res.statusCode}, trying fallback...`);
            return tryModel(index + 1);
          } else {
            return reject(new Error(`Gemini API error (HTTP ${res.statusCode}): ${body.slice(0, 200)}`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        tryModel(index + 1);
      });

      req.on('error', err => {
        tryModel(index + 1);
      });

      req.write(payload);
      req.end();
    }

    tryModel(0);
  });
}

// Serverless Handler for Vercel and Node HTTP Server
module.exports = async function handler(req, res) {
  // CORS Security: Validate request origin
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://ganacutsvisualsportfolio.vercel.app',
    'https://ganeshcode-0.github.io',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ];

  if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (
    allowedOrigins.includes(origin) ||
    origin.endsWith('.vercel.app') ||
    origin.endsWith('.github.io')
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://ganacutsvisualsportfolio.vercel.app');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // Rate Limiting Check
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (isRateLimited(clientIp)) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 429;
    return res.end(JSON.stringify({
      success: false,
      error: 'Rate limit exceeded (30 requests/min). Please try again shortly.'
    }));
  }

  // GET /api/ai (Status check)
  if (req.method === 'GET') {
    const apiKey = getGeminiApiKey(req);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(JSON.stringify({
      success: true,
      configured: Boolean(apiKey),
      provider: 'Google Gemini AI',
      aiEngine: 'Active',
      activeCapabilities: ['profile_analysis', 'email_automation', 'tier_recommendation', 'copilot_chat']
    }));
  }

  // Helper to parse JSON body
  function getJsonBody() {
    return new Promise((resolve, reject) => {
      if (req.body && typeof req.body === 'object') return resolve(req.body);
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch (e) {
          reject(e);
        }
      });
      req.on('error', reject);
    });
  }

  if (req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const body = await getJsonBody();
      const action = body.action || 'analyze_editor';
      const apiKey = getGeminiApiKey(req, body);

      if (!apiKey) {
        res.statusCode = 500;
        return res.end(JSON.stringify({
          success: false,
          error: 'Gemini API Key is not configured on the server. Please add GEMINI_API_KEY in server environment variables.'
        }));
      }

      // ACTION 0: Test Connection
      if (action === 'test_connection') {
        const testRes = await callGemini('Respond with short JSON: {"status":"connected","engine":"active","message":"AI Engine is active and responding."}', true, apiKey);
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          action: 'test_connection',
          result: testRes,
          timestamp: Date.now()
        }));
      }

      // ACTION 1: Analyze Editor Profile with Admin Description
      if (action === 'analyze_editor') {
        const editor = body.editor || {};
        const adminDesc = body.adminDescription || editor.adminDescription || editor.notes || 'None provided yet';

        const prompt = `You are the Executive Creative Director at GanaCuts Visuals (a high-tier post-production & creative video agency).
Analyze this video editor's profile and provide an incisive, realistic professional evaluation:

EDITOR PROFILE:
- Name: ${editor.name || 'Editor'}
- Specialization: ${editor.specialization || 'Video Editing'}
- Software Tools: ${editor.tools || 'Premiere Pro'} ${editor.otherTools ? `(${editor.otherTools})` : ''}
- Expected Rate: ${editor.rate || 'Standard / Discuss'}
- Location: ${editor.city || 'Remote'}
- Work Portfolio: ${editor.portfolio || 'Not submitted'}
- Current Phase/Tier: ${editor.editorTier || editor.tier || 'Unassigned'}
- Private Admin Notes / Description: ${adminDesc}

Your job:
1. Identify their true video editing archetype (e.g., "Hyper-Retention Documentary Reel Specialist", "Fast 3D Motion Graphics Artist", "Junior Social Pacing Editor").
2. Rate their overall agency readiness out of 100 based on their tools, specialization, rate, and admin's notes.
3. Recommend their exact Phase / Tier:
   - "special" = Elite, top-tier, priority commercial clients, advanced retention & 3D/sound design.
   - "normal" = Core reliable editor, good pacing, dependable for standard client reels.
   - "basic" = Junior, learning pacing, needs practice tasks or trial edits first.
4. Highlight 3-4 specific strengths.
5. Identify their best project fit (what type of client videos they should edit).
6. Give practical coaching advice on how to manage or level up this editor.
7. Write a 2-sentence executive summary.

Return ONLY a valid JSON object matching this schema:
{
  "archetype": "Descriptive title",
  "rating": 88,
  "recommendedTier": "special" | "normal" | "basic",
  "recommendedTierLabel": "⭐ Special Editor" | "💼 Normal Editor" | "🔰 Basic Editor",
  "strengths": ["string", "string", "string"],
  "bestFit": "string",
  "coachingAdvice": "string",
  "executiveSummary": "string"
}`;

        const analysis = await callGemini(prompt, true, apiKey);
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          action: 'analyze_editor',
          editorId: editor.id,
          editorName: editor.name,
          analysis,
          analyzedAt: new Date().toISOString()
        }));
      }

      // ACTION 2: Draft Tailored Gmail / Email Message to Editor
      if (action === 'draft_email') {
        const editor = body.editor || {};
        const purpose = body.purpose || 'project_offer';
        const customNotes = body.customNotes || '';

        const prompt = `You are the Creative Director of GanaCuts Visuals.
Write a personalized, professional, and motivating email from your Gmail (designsbygani@gmail.com) directly to this video editor:

RECIPIENT:
- Editor Name: ${editor.name || 'Editor'}
- Editor Email: ${editor.email || ''}
- Specialization: ${editor.specialization || 'Video Editing'}
- Current Tier: ${editor.editorTier || 'Core Editor'}
- Rate: ${editor.rate || 'Standard'}
- Admin's Private Notes: ${editor.adminDescription || 'Reliable editor'}

PURPOSE OF THIS EMAIL:
${purpose}
ADDITIONAL CONTEXT / INSTRUCTIONS:
${customNotes || 'None'}

GUIDELINES:
- Warm, direct, professional tone of a high-growth creative agency founder.
- Keep it concise, actionable, and clear.
- Sign off cleanly as:
  Founder & Creative Director | GanaCuts Visuals

Format the output as ONLY valid JSON:
{
  "subject": "Clear, compelling email subject line",
  "body": "Complete email body with appropriate line breaks and signature"
}`;

        const emailResult = await callGemini(prompt, true, apiKey);
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          action: 'draft_email',
          editorId: editor.id,
          recipientEmail: editor.email,
          email: emailResult
        }));
      }

      // ACTION 3: Agency Copilot Chat (ChatGPT-like assistant for Admin & Managers)
      if (action === 'copilot_chat') {
        const userQuery = body.message || body.prompt || 'Hello Copilot';
        const agencyContext = body.agencyContext || {};

        const prompt = `You are GanaCuts Agency Copilot, an intelligent AI Executive Partner for the Creative Director and operations managers at GanaCuts Visuals.

AGENCY OPERATING CONTEXT:
- Agency: GanaCuts Visuals (High-retention video editing agency)
- Specializations: Short-form Reels/Shorts, YouTube Long-form, 3D/Kinetic Motion Graphics, Commercial Ads
- Editor Tiers:
  * ⭐ Special Editors: Elite, assigned to high-paying client commercials and retention-critical projects.
  * 💼 Normal Editors: Reliable workhorses handling routine client deliverables and channel pacing.
  * 🔰 Basic Editors: Juniors undergoing trial edits or skill upgrade tasks.
- Active Editors on Roster: ${agencyContext.totalEditors || '30+'}
- Tier Breakdown: Special: ${agencyContext.specialCount || 0}, Normal: ${agencyContext.normalCount || 0}, Basic: ${agencyContext.basicCount || 0}
- Summary of Recent Members / Activities: ${agencyContext.rosterSummary || 'Full roster actively managed in Supabase database.'}
- Recent Client Inquiries / Leads: ${agencyContext.inquiriesSummary || 'Client inquiries captured directly in Supabase client_inquiries table.'}

USER QUERY:
${userQuery}

INSTRUCTIONS:
- Speak as a sharp, professional, proactive creative agency director and chief of staff.
- Be concise, direct, and actionable. Give specific advice, workflow tips, editor assignment recommendations, or drafted messages whenever requested.
- Format with clean markdown (bullet points, bold text).`;

        const reply = await callGemini(prompt, false, apiKey);
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          action: 'copilot_chat',
          reply,
          timestamp: Date.now()
        }));
      }

      // Unknown action
      res.statusCode = 400;
      return res.end(JSON.stringify({ success: false, error: 'Unknown action: ' + action }));
    } catch (err) {
      console.error('AI Error:', err);
      res.statusCode = 500;
      return res.end(JSON.stringify({ success: false, error: err.message || 'Internal AI Server Error' }));
    }
  }

  res.statusCode = 405;
  res.end('Method Not Allowed');
};
