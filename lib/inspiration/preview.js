'use strict';

const { DEFAULT_THEME } = require('./theme');

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Resolve annotation ids for a frame — match by frame id (annotation ids may repeat per frame). */
function resolveFrameAnnotationIds(frame, allAnnotations) {
  return (allAnnotations || [])
    .filter((a) => a.frame === frame.id)
    .slice(0, 3)
    .map((a) => a.id);
}

/**
 * Keep frame.annotations in sync with the global annotations list.
 */
function syncFrameAnnotations(annotations) {
  if (!annotations || !Array.isArray(annotations.frames)) return annotations;
  const all = annotations.annotations || [];
  for (const frame of annotations.frames) {
    frame.annotations = resolveFrameAnnotationIds(frame, all);
  }
  return annotations;
}

/**
 * Build a responsive, DOM-based annotation preview (full-page study layout).
 * Screenshots are backgrounds only — markers and notes are live HTML/CSS.
 */
function buildPreviewHtml({ id, meta, annotations, theme = DEFAULT_THEME }) {
  const synced = syncFrameAnnotations(structuredClone(annotations));
  const data = {
    id,
    title: meta.title || id,
    pageType: meta.pageType || 'other',
    source: meta.sourceUrl || meta.sourcePath || '',
    annotations: synced,
  };

  const css = `
:root { --paper:${theme.paper}; --ink:${theme.ink}; --signal:${theme.signal}; --surface:${theme.surface}; --muted:${theme.muted || '#5C5C5C'}; }
* { box-sizing:border-box; }
body { margin:0; background:var(--paper); color:var(--ink); font-family:Inter,"Noto Sans SC","PingFang SC",sans-serif; }
header { padding:48px max(24px,calc((100vw - 1440px)/2)); border-bottom:2px solid var(--ink); }
.eyebrow { font:700 12px "JetBrains Mono","SFMono-Regular",monospace; letter-spacing:.08em; }
h1 { margin:12px 0; font-size:clamp(34px,6vw,76px); line-height:.92; letter-spacing:-.06em; }
.lede { max-width:740px; margin:0; line-height:1.65; }
.meta-row { margin-top:16px; display:flex; flex-wrap:wrap; gap:8px; }
.pill { display:inline-block; padding:4px 10px; border:2px solid var(--ink); font:700 11px "JetBrains Mono",monospace; letter-spacing:.04em; }
main { max-width:1840px; margin:0 auto; padding:42px 20px 80px; }
.overview { display:grid; grid-template-columns:1fr; gap:28px; align-items:start; margin-bottom:48px; }
.overview-synthesis { width:100%; }
.analysis { background:var(--surface); border:2px solid var(--ink); padding:24px; box-shadow:8px 8px 0 var(--ink); }
.analysis h2 { margin:6px 0 20px; font-size:28px; letter-spacing:-.04em; }
.synthesis-pending { margin:0 0 16px; font-size:14px; line-height:1.65; color:var(--muted); }
.traits { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border:2px solid var(--ink); border-right:0; border-bottom:0; }
.trait { min-height:144px; padding:16px; border-right:2px solid var(--ink); border-bottom:2px solid var(--ink); }
.trait .label { font:700 11px "JetBrains Mono",monospace; color:var(--signal); }
.trait h3 { margin:8px 0 6px; font-size:18px; letter-spacing:-.03em; }
.trait p { margin:0; font-size:14px; line-height:1.55; }
.seed { margin-top:20px; padding:16px; background:var(--paper); border-left:6px solid var(--signal); }
.seed .eyebrow { margin-bottom:8px; }
.seed p { margin:0; font-size:14px; line-height:1.65; }
.frame { margin:0 0 36px; }
.frame-shell { display:grid; grid-template-columns:minmax(0,4fr) minmax(300px,1fr); align-items:stretch; border:2px solid var(--ink); box-shadow:8px 8px 0 var(--ink); background:var(--paper); }
.frame-shell.capture-only { grid-template-columns:1fr; }
.capture { position:relative; min-width:0; overflow:hidden; background:#030712; line-height:0; }
.capture > img { width:100%; height:auto; display:block; vertical-align:top; }
.marker { position:absolute; left:var(--x); top:var(--y); width:25px; height:25px; transform:translate(-50%,-50%); display:grid; place-items:center; border:3px solid var(--surface); border-radius:50%; background:var(--signal); color:#fff; font:700 10px "JetBrains Mono",monospace; box-shadow:0 0 0 1px var(--signal); cursor:pointer; z-index:2; padding:0; }
.marker[aria-current="true"] { outline:2px solid #fff; outline-offset:2px; }
.rail { min-width:0; padding:22px; display:flex; flex-direction:column; gap:16px; border-left:2px solid var(--ink); }
.rail-head { margin-bottom:auto; }
.rail h2 { margin:6px 0 0; font-size:22px; letter-spacing:-.04em; }
.note { display:grid; grid-template-columns:42px minmax(0,1fr); border:2px solid var(--ink); background:var(--surface); cursor:pointer; }
.note[aria-current="true"] { box-shadow:inset 0 0 0 2px var(--signal); }
.note-no { display:grid; place-items:center; align-self:stretch; min-height:42px; background:var(--signal); color:#fff; font:700 12px "JetBrains Mono",monospace; }
.note-body { min-width:0; padding:13px 14px 14px; }
.note h3 { margin:0 0 7px; font-size:16px; letter-spacing:-.03em; line-height:1.2; overflow-wrap:anywhere; }
.note p { margin:0; font-size:14px; line-height:1.55; overflow-wrap:anywhere; }
.note .kinds { margin-top:8px; display:flex; flex-wrap:wrap; gap:4px; }
.kind { font:700 10px "JetBrains Mono",monospace; padding:2px 6px; border:1px solid var(--ink); color:var(--muted); }
.caption { display:flex; justify-content:space-between; gap:16px; margin:12px 0 0; font:700 13px "JetBrains Mono",monospace; }
.caption span:last-child { color:var(--signal); }
.empty { padding:16px; color:var(--muted); font-size:14px; border:2px dashed var(--ink); }
@media (max-width:860px) { .traits { grid-template-columns:repeat(2,minmax(0,1fr)); } .frame-shell { grid-template-columns:1fr; } .rail { border-left:0; border-top:2px solid var(--ink); } .rail-head { margin-bottom:0; } }
@media (max-width:560px) { header { padding:32px 20px; } main { padding:28px 12px 60px; } .traits { grid-template-columns:1fr; } .caption { flex-direction:column; gap:4px; } .rail { padding:16px; } }
`.trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Inspiration preview — ${escapeHtml(id)}</title>
<style>${css}</style>
</head>
<body>
  <header>
    <div class="eyebrow">DESIGN INSPIRATION LIBRARY / FULL-PAGE STUDY</div>
    <h1>${escapeHtml(data.title)}</h1>
    <p class="lede">Read the overall visual DNA first, then frame-by-frame evidence below. Numbered markers on each capture map to aesthetic notes on the right.</p>
    <div class="meta-row">
      <span class="pill">${escapeHtml(data.pageType)}</span>
      <span class="pill">${escapeHtml(id)}</span>
    </div>
  </header>
  <main>
    <section class="overview" id="overview" hidden></section>
    <div id="frames"></div>
  </main>
  <script id="inspiration-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  <script>
(function () {
  const data = JSON.parse(document.getElementById('inspiration-data').textContent);
  const annById = Object.fromEntries((data.annotations.annotations || []).map(a => [a.id, a]));
  const overviewEl = document.getElementById('overview');
  const framesEl = document.getElementById('frames');
  let activeId = null;

  function pad(n) { return String(n || '').padStart(2, '0'); }

  function frameAnns(frame) {
    const byFrame = (data.annotations.annotations || []).filter(a => a.frame === frame.id).slice(0, 3);
    if (byFrame.length) return byFrame;
    const ids = frame.annotations || [];
    return ids.map(id => annById[id]).filter(Boolean).slice(0, 3);
  }

  function spreadAnchors(anns) {
    const seen = new Map();
    return anns.map((a) => {
      const x = (a.anchor && a.anchor.x) || 0.5;
      const y = (a.anchor && a.anchor.y) || 0.5;
      const key = x.toFixed(3) + ',' + y.toFixed(3);
      const n = seen.get(key) || 0;
      seen.set(key, n + 1);
      if (!n) return { ann: a, x: x, y: y };
      const spread = 0.035;
      const angle = (n - 1) * ((Math.PI * 2) / 3) - Math.PI / 2;
      return { ann: a, x: Math.min(0.96, Math.max(0.04, x + Math.cos(angle) * spread)), y: Math.min(0.96, Math.max(0.04, y + Math.sin(angle) * spread)) };
    });
  }

  function setActive(id) {
    activeId = id;
    document.querySelectorAll('.marker').forEach(el => {
      if (el.dataset.ann === id) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
    document.querySelectorAll('.note').forEach(el => {
      if (el.dataset.ann === id) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
    const note = document.querySelector('.note[data-ann="' + id + '"]');
    if (note) note.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  const allFrames = data.annotations.frames || [];
  if (!allFrames.length) {
    framesEl.innerHTML = '<div class="empty">No captures yet. Add images under captures/ and regenerate preview.</div>';
    return;
  }

  function escapeText(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderSynthesis(synthesis, meta) {
    if (!synthesis) return '';
    const pending = synthesis.status === 'scaffold';
    const traits = (synthesis.traits || []).map((t) =>
      '<article class="trait"><div class="label">' + escapeText(t.label) + '</div>' +
      '<h3>' + escapeText(t.title) + '</h3><p>' + escapeText(t.body) + '</p></article>'
    ).join('');
    const seed = synthesis.seed;
    const seedHtml = seed ? (
      '<div class="seed"><div class="eyebrow">' + escapeText(seed.eyebrow || 'DESIGN.md READY SEED') + '</div><p>' +
      (seed.visualDirection ? '<b>Visual Direction:</b> ' + escapeText(seed.visualDirection) + '<br>' : '') +
      (seed.dos ? '<b>Do:</b> ' + escapeText(seed.dos) + '<br>' : '') +
      (seed.donts ? '<b>Don\\'t:</b> ' + escapeText(seed.donts) : '') +
      '</p></div>'
    ) : '';
    const metaLine = meta && meta.source
      ? '<p class="synthesis-pending">' + escapeText(meta.source) + '</p>'
      : '';
    const pendingLine = pending
      ? '<p class="synthesis-pending">Scaffold — enrich traits/seed in annotations.json synthesis, then rebuild-preview.</p>'
      : '';
    return '<div class="analysis overview-synthesis"><div class="eyebrow">' + escapeText(synthesis.eyebrow || 'DESIGN SYSTEM ANALYSIS / OBSERVED') + '</div>' +
      '<h2>' + escapeText(synthesis.title || 'Visual DNA') + '</h2>' +
      metaLine + pendingLine +
      (traits ? '<div class="traits">' + traits + '</div>' : '') +
      seedHtml + '</div>';
  }

  const viewportFrames = allFrames.filter(f => f.id !== 'fullpage');
  const displayFrames = viewportFrames.length ? viewportFrames : allFrames.filter(f => frameAnns(f).length > 0);
  const synthesis = data.annotations.synthesis;

  if (synthesis) {
    overviewEl.hidden = false;
    overviewEl.innerHTML = renderSynthesis(synthesis, { source: data.source, title: data.title });
  }

  if (!displayFrames.length) {
    framesEl.innerHTML = '<div class="empty">No viewport frames yet.</div>';
    return;
  }

  const total = displayFrames.length;
  displayFrames.forEach((frame, idx) => {
    const anns = frameAnns(frame);
    const section = document.createElement('section');
    section.className = 'frame';

    const shell = document.createElement('div');
    shell.className = 'frame-shell' + (anns.length ? '' : ' capture-only');

    const capture = document.createElement('div');
    capture.className = 'capture';
    const img = document.createElement('img');
    img.src = frame.file;
    img.alt = frame.label || frame.id;
    img.loading = idx === 0 ? 'eager' : 'lazy';
    capture.appendChild(img);

    spreadAnchors(anns).forEach(({ ann: a, x, y }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'marker';
      btn.textContent = pad(a.number);
      btn.dataset.ann = a.id;
      btn.style.setProperty('--x', x * 100 + '%');
      btn.style.setProperty('--y', y * 100 + '%');
      btn.title = a.label || '';
      btn.addEventListener('click', () => setActive(a.id));
      capture.appendChild(btn);
    });
    shell.appendChild(capture);

    if (anns.length) {
      const rail = document.createElement('aside');
      rail.className = 'rail';
      const head = document.createElement('div');
      head.className = 'rail-head';
      const categories = [...new Set(anns.map(a => a.category).filter(Boolean))];
      head.innerHTML =
        '<div class="eyebrow">AESTHETIC ANALYSIS</div>' +
        '<h2>' + pad(idx + 1) + ' / ' + pad(total) + ' · ' + escapeText(frame.title || frame.label || frame.id) + '</h2>';
      rail.appendChild(head);

      anns.forEach(a => {
        const note = document.createElement('article');
        note.className = 'note';
        note.dataset.ann = a.id;
        note.tabIndex = 0;
        note.addEventListener('click', () => setActive(a.id));
        note.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(a.id); }
        });
        const kinds = (a.kinds || []).map(k => '<span class="kind">' + k + '</span>').join('');
        note.innerHTML =
          '<div class="note-no">' + pad(a.number) + '</div>' +
          '<div class="note-body"><h3>' + (a.label || '') + '</h3>' +
          '<p>' + (a.body || '') + '</p>' +
          (kinds ? '<div class="kinds">' + kinds + '</div>' : '') +
          '</div>';
        rail.appendChild(note);
      });
      shell.appendChild(rail);
    }

    section.appendChild(shell);

    const caption = document.createElement('div');
    caption.className = 'caption';
    const tag = anns.length
      ? [...new Set(anns.map(a => a.category).filter(Boolean))].slice(0, 2).join(' · ')
      : 'awaiting annotations';
    const frameTitle = frame.title || frame.label || frame.id;
    caption.innerHTML =
      '<span>' + pad(idx + 1) + ' / ' + pad(total) + ' · ' + escapeText(frameTitle) + '</span>' +
      '<span>' + escapeText(tag) + '</span>';
    section.appendChild(caption);

    framesEl.appendChild(section);
  });

  const first = (data.annotations.annotations || [])[0];
  if (first) setActive(first.id);
})();
  </script>
</body>
</html>
`;
}

/**
 * Lightweight product index preview listing pages + coverage.
 */
function buildProductPreviewHtml({ productId, meta, pages, theme = DEFAULT_THEME }) {
  const rows = (pages || [])
    .map((p) => {
      const cov = p.captureCoverage || p.captureStatus || '—';
      const href = `pages/${escapeHtml(p.slug)}/preview.html`;
      return `<tr>
  <td><a href="${href}">${escapeHtml(p.slug)}</a></td>
  <td>${escapeHtml(p.pageType || '—')}</td>
  <td><span class="pill">${escapeHtml(cov)}</span></td>
  <td>${escapeHtml(p.title || '')}</td>
</tr>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Product inspiration — ${escapeHtml(productId)}</title>
<style>
:root { --paper:${theme.paper}; --ink:${theme.ink}; --signal:${theme.signal}; --surface:${theme.surface}; --muted:${theme.muted || '#5C5C5C'}; }
* { box-sizing:border-box; }
html, body { margin:0; padding:0; background:var(--paper); color:var(--ink); font-family:Inter,"Noto Sans SC","PingFang SC",sans-serif; }
.top { padding:48px max(24px,calc((100vw - 960px)/2)); border-bottom:2px solid var(--ink); }
.top h1 { margin:0 0 12px; font-size:clamp(28px,5vw,48px); letter-spacing:-.04em; }
.meta { color:var(--muted); font-size:14px; font-family:"JetBrains Mono",monospace; }
.main { padding:32px max(24px,calc((100vw - 960px)/2)) 64px; max-width:960px; }
.pill { display:inline-block; padding:4px 10px; border:2px solid var(--ink); font:700 11px "JetBrains Mono",monospace; }
table { width:100%; border-collapse:collapse; background:var(--surface); border:2px solid var(--ink); box-shadow:8px 8px 0 var(--ink); font-size:14px; }
th, td { text-align:left; padding:12px 14px; border-bottom:2px solid var(--ink); }
th { color:var(--muted); font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:.06em; font-family:"JetBrains Mono",monospace; }
tr:last-child td { border-bottom:0; }
a { color:var(--signal); font-weight:600; }
.note { margin-top:20px; color:var(--muted); font-size:14px; line-height:1.6; }
</style>
</head>
<body>
  <header class="top">
    <h1>${escapeHtml(meta.title || productId)}</h1>
    <div class="meta">product · ${escapeHtml(productId)} · ${escapeHtml(meta.primaryHost || '')} · type mix: ${escapeHtml(meta.primaryPageType || 'mixed')}</div>
  </header>
  <main class="main">
    <p>Cross-page visual positioning. Open a page preview for full-scroll annotated analysis. Default <code>apply</code> uses the product <code>design-seed.md</code>.</p>
    <table>
      <thead><tr><th>Page</th><th>Type</th><th>Coverage</th><th>Title</th></tr></thead>
      <tbody>
${rows || '<tr><td colspan="4">No pages yet. Add a URL under this product.</td></tr>'}
      </tbody>
    </table>
    <p class="note">Each URL page requires full-scroll captures (fullpage + consecutive viewports) before mid-page claims are marked observed.</p>
  </main>
</body>
</html>
`;
}

module.exports = {
  buildPreviewHtml,
  buildProductPreviewHtml,
  syncFrameAnnotations,
  resolveFrameAnnotationIds,
};
