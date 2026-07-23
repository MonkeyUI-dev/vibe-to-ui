'use strict';

const https = require('https');
const http = require('http');
const { URL } = require('url');

function fetchText(urlString, { timeoutMs = 20000, maxBytes = 2_000_000 } = {}) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(urlString);
    } catch (err) {
      reject(new Error(`Invalid URL: ${urlString}`));
      return;
    }
    if (!/^https?:$/.test(parsed.protocol)) {
      reject(new Error('Only http(s) URLs are supported'));
      return;
    }

    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.get(
      parsed,
      {
        headers: {
          'User-Agent': 'vibe-to-ui-inspiration/0.5 (+https://github.com/MonkeyUI-dev/vibe-to-ui)',
          Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        },
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode || 0;
        if ([301, 302, 303, 307, 308].includes(status) && res.headers.location) {
          res.resume();
          const next = new URL(res.headers.location, parsed).toString();
          fetchText(next, { timeoutMs, maxBytes }).then(resolve, reject);
          return;
        }
        if (status >= 400) {
          res.resume();
          reject(new Error(`HTTP ${status} fetching ${urlString}`));
          return;
        }

        const chunks = [];
        let size = 0;
        res.on('data', (chunk) => {
          size += chunk.length;
          if (size > maxBytes) {
            req.destroy();
            reject(new Error('Response too large'));
            return;
          }
          chunks.push(chunk);
        });
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          const ctype = String(res.headers['content-type'] || '');
          resolve({
            finalUrl: parsed.toString(),
            status,
            contentType: ctype,
            body: buf.toString('utf8'),
          });
        });
      }
    );
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${urlString}`));
    });
    req.on('error', reject);
  });
}

function decodeEntities(str) {
  return String(str || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function metaContent(html, names) {
  for (const name of names) {
    const re1 = new RegExp(
      `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
      'i'
    );
    const re2 = new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
      'i'
    );
    const m = html.match(re1) || html.match(re2);
    if (m) return decodeEntities(m[1]).trim();
  }
  return '';
}

function extractTitle(html) {
  const og = metaContent(html, ['og:title', 'twitter:title']);
  if (og) return og;
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? decodeEntities(m[1]).trim() : '';
}

function extractDescription(html) {
  return metaContent(html, ['og:description', 'description', 'twitter:description']);
}

function extractCssVars(html) {
  const vars = {};
  const re = /--([a-zA-Z0-9_-]+)\s*:\s*([^;}+{]+)/g;
  let m;
  while ((m = re.exec(html))) {
    const key = m[1].trim();
    const val = m[2].trim();
    if (/^#|^rgb|^hsl|^oklch/i.test(val) || /^[a-z]+$/i.test(val)) {
      if (!vars[key]) vars[key] = val;
    }
  }
  return vars;
}

function extractFontHints(html) {
  const fonts = new Set();
  const familyRe = /font-family\s*:\s*([^;}+{]+)/gi;
  let m;
  while ((m = familyRe.exec(html))) {
    const first = m[1].split(',')[0].replace(/['"]/g, '').trim();
    if (first && first.length < 60 && !/inherit|initial|var\(/i.test(first)) fonts.add(first);
  }
  const gf = html.match(/family=([^&"']+)/gi) || [];
  for (const g of gf) {
    const name = decodeURIComponent(g.replace(/^family=/i, '').replace(/\+/g, ' ').split(':')[0]);
    if (name) fonts.add(name);
  }
  return [...fonts].slice(0, 8);
}

function classifyPageTypeFromHtml(html, url) {
  const text = `${url} ${html}`.toLowerCase();
  const scores = {
    landing: 0,
    dashboard: 0,
    workbench: 0,
    docs: 0,
    'consumer-app': 0,
    other: 0,
  };

  if (/pricing|hero|get started|sign up|features|customers|testimonials/.test(text)) scores.landing += 3;
  if (/og:type["']\s*content=["']website/.test(text)) scores.landing += 1;
  if (/dashboard|analytics|metrics|kpi|overview/.test(text)) scores.dashboard += 3;
  if (/data-table|workbench|inbox|filters|bulk action|admin/.test(text)) scores.workbench += 3;
  if (/docs\.|\/documentation|api reference|sidebar.*toc|markdown/.test(text)) scores.docs += 3;
  if (/app\.|mobile|tab.?bar|bottom.?nav|onboarding|feed/.test(text)) scores['consumer-app'] += 2;

  let best = 'other';
  let bestScore = 0;
  for (const [k, v] of Object.entries(scores)) {
    if (v > bestScore) {
      best = k;
      bestScore = v;
    }
  }
  return {
    pageType: bestScore === 0 ? 'other' : best,
    confidence: bestScore >= 3 ? 'medium' : bestScore > 0 ? 'low' : 'low',
    evidence: bestScore === 0 ? ['No strong HTML cues; defaulted to other'] : [`Heuristic score ${bestScore} for ${best}`],
  };
}

async function inspectUrl(urlString) {
  const fetched = await fetchText(urlString);
  const title = extractTitle(fetched.body) || fetched.finalUrl;
  const description = extractDescription(fetched.body);
  const cssVars = extractCssVars(fetched.body);
  const fonts = extractFontHints(fetched.body);
  const page = classifyPageTypeFromHtml(fetched.body, fetched.finalUrl);
  return {
    sourceUrl: urlString,
    finalUrl: fetched.finalUrl,
    title,
    description,
    cssVars,
    fonts,
    pageType: page.pageType,
    pageTypeConfidence: page.confidence,
    pageTypeEvidence: page.evidence,
    htmlSnippetLength: fetched.body.length,
  };
}

module.exports = {
  fetchText,
  inspectUrl,
  extractTitle,
  classifyPageTypeFromHtml,
};
