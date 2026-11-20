const https = require('https');
const fs = require('fs');
const path = require('path');

// Helper to safely get Gemini API Key without leaking to frontend
function getGeminiApiKey() {
  // Check local .env first for full key
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const m = content.match(/GEMINI_API_KEY=([^\r\n]+)/);
      if (m && m[1].trim().length > 30) return m[1].trim();
    }
  } catch (e) {}

  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 30) {
    return process.env.GEMINI_API_KEY.trim();
  }

  return process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;
}

// Call Google Gemini API
function callGemini(prompt, isJson = true) {
  return new Promise((resolve, reject) => {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return reject(new Error('GEMINI_API_KEY is not configured in server environment (.env).'));
    }

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: isJson ? 'application/json' : 'text/plain',
        temperature: isJson ? 0.2 : 0.4
      }
    });

    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.5-flash'];

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
        timeout: 25000
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
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const apiKey = getGeminiApiKey();

  // GET /api/ai (Status check)
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(JSON.stringify({
      success: true,
      configured: Boolean(apiKey),
      provider: 'Google Gemini AI',
      model: 'gemini-3.5-flash-lite',
      activeCapabilities: ['profile_analysis', 'email_automation', 'tier_recommendation']
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

      if (!apiKey) {
        res.statusCode = 500;
        return res.end(JSON.stringify({
          success: false,
          error: 'Gemini API Key is not configured on the server. Please add GEMINI_API_KEY in server environment variables.'
        }));
      }

      // ACTION 0: Test Connection
      if (action === 'test_connection') {
        const testRes = await callGemini('Respond with short JSON: {"status":"connected","model":"gemini-3.5-flash-lite","message":"Google Gemini AI is active and responding."}', true);
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

        const prompt = `You are the Executive Creative Director at GanaCuts Visuals (a high-tier post-production & creative video agency founded by Ganesh Mogili).
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
6. Give practical coaching advice for Ganesh on how to manage or level up this editor.
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

        const analysis = await callGemini(prompt, true);
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

        const prompt = `You are Ganesh Mogili, Founder & Creative Director of GanaCuts Visuals.
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
  Ganesh Mogili
  Founder & Creative Director | GanaCuts Visuals

Format the output as ONLY valid JSON:
{
  "subject": "Clear, compelling email subject line",
  "body": "Complete email body with appropriate line breaks and signature"
}`;

        const emailResult = await callGemini(prompt, true);
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          action: 'draft_email',
          editorId: editor.id,
          recipientEmail: editor.email,
          email: emailResult
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
