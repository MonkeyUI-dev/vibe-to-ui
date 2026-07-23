'use strict';

const { DEFAULT_THEME } = require('./theme');

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Build a responsive, DOM-based annotation preview.
 * Screenshots are backgrounds only — anchors and cards are live HTML/CSS.
 */
function buildPreviewHtml({ id, meta, annotations, theme = DEFAULT_THEME }) {
  const data = {
    id,
    title: meta.title || id,
    pageType: meta.pageType || 'other',
    source: meta.sourceUrl || meta.sourcePath || '',
    annotations,
  };

  const css = `
:root {
  --paper: ${theme.paper};
  --ink: ${theme.ink};
  --signal: ${theme.signal};
  --surface: ${theme.surface};
  --muted: ${theme.muted || '#78716C'};
  --border: ${theme.border || 'rgba(28,25,23,.14)'};
  --rail-width: min(380px, 100%);
  --gap: 1rem;
  --radius: 12px;
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--paper); color: var(--ink); }
body { min-height: 100vh; }
.top {
  display: flex; flex-wrap: wrap; gap: .75rem 1.25rem;
  align-items: baseline; justify-content: space-between;
  padding: 1rem 1.25rem; border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 88%, var(--paper));
}
.top h1 { margin: 0; font-size: 1.15rem; letter-spacing: -0.02em; font-weight: 650; }
.meta { color: var(--muted); font-size: .85rem; font-family: ui-sans-serif, system-ui, sans-serif; }
.pill {
  display: inline-block; padding: .15rem .55rem; border: 1px solid var(--border);
  border-radius: 999px; font-size: .75rem; font-family: ui-sans-serif, system-ui, sans-serif;
}
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--rail-width);
  gap: var(--gap);
  padding: var(--gap);
  align-items: start;
}
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}
.stage-wrap { display: flex; flex-direction: column; gap: 1.25rem; }
.frame-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.frame-label {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: .75rem; color: var(--muted);
  padding: .5rem .75rem; border-bottom: 1px solid var(--border);
}
.stage {
  position: relative;
  width: 100%;
  background: #ddd;
}
.stage img {
  display: block; width: 100%; height: auto; vertical-align: top;
}
.anchor {
  position: absolute;
  width: 28px; height: 28px; margin: -14px 0 0 -14px;
  border-radius: 50%;
  border: 2px solid var(--surface);
  background: var(--signal);
  color: var(--surface);
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: .75rem; font-weight: 700;
  display: grid; place-items: center;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,.2);
  z-index: 2;
}
.anchor[aria-current="true"] {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
}
.rail {
  position: sticky; top: .75rem;
  display: flex; flex-direction: column; gap: .75rem;
  max-height: calc(100vh - 1.5rem);
  overflow: auto;
}
@media (max-width: 900px) {
  .rail { position: static; max-height: none; }
}
.rail h2 {
  margin: 0; font-size: .95rem; letter-spacing: -0.01em;
}
.hint { font-family: ui-sans-serif, system-ui, sans-serif; font-size: .78rem; color: var(--muted); margin: 0; }
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: .85rem .9rem;
  /* height grows with content — never fixed */
  min-height: 0;
  height: auto;
  overflow: visible;
}
.card[aria-current="true"] {
  border-color: var(--signal);
  box-shadow: inset 3px 0 0 var(--signal);
}
.card-head {
  display: flex; gap: .5rem; align-items: flex-start;
  margin-bottom: .45rem;
}
.num {
  flex: 0 0 auto;
  width: 1.5rem; height: 1.5rem; border-radius: 50%;
  background: var(--signal); color: var(--surface);
  display: grid; place-items: center;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: .75rem; font-weight: 700;
}
.card h3 { margin: 0; font-size: .95rem; line-height: 1.25; }
.cat {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: .7rem; color: var(--muted); text-transform: uppercase;
  letter-spacing: .04em; margin: .15rem 0 .35rem;
}
.card p {
  margin: 0;
  font-size: .9rem;
  line-height: 1.45;
  white-space: normal;
  overflow-wrap: anywhere;
}
.kinds { margin-top: .55rem; display: flex; flex-wrap: wrap; gap: .35rem; }
.kind {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: .65rem; padding: .12rem .4rem;
  border: 1px solid var(--border); border-radius: 999px; color: var(--muted);
}
.empty {
  padding: 1rem; color: var(--muted);
  font-family: ui-sans-serif, system-ui, sans-serif; font-size: .85rem;
}
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
  <header class="top">
    <div>
      <h1>${escapeHtml(data.title)}</h1>
      <div class="meta">${escapeHtml(data.source)}</div>
    </div>
    <div class="meta">
      <span class="pill">${escapeHtml(data.pageType)}</span>
      <span class="pill">${escapeHtml(id)}</span>
    </div>
  </header>
  <main class="layout">
    <section class="stage-wrap" id="stages"></section>
    <aside class="rail" id="rail">
      <h2>Annotations</h2>
      <p class="hint">Signal color marks the active evidence only. Cards grow with content — nothing is clipped.</p>
      <div id="cards"></div>
    </aside>
  </main>
  <script id="inspiration-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  <script>
(function () {
  const data = JSON.parse(document.getElementById('inspiration-data').textContent);
  const annById = Object.fromEntries((data.annotations.annotations || []).map(a => [a.id, a]));
  const stages = document.getElementById('stages');
  const cardsEl = document.getElementById('cards');
  let activeId = null;

  function setActive(id) {
    activeId = id;
    document.querySelectorAll('.anchor').forEach(el => {
      el.setAttribute('aria-current', el.dataset.ann === id ? 'true' : 'false');
    });
    document.querySelectorAll('.card').forEach(el => {
      el.setAttribute('aria-current', el.dataset.ann === id ? 'true' : 'false');
    });
    const card = cardsEl.querySelector('[data-ann="' + id + '"]');
    if (card) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  const frames = data.annotations.frames || [];
  if (!frames.length) {
    stages.innerHTML = '<div class="empty">No captures yet. Add images under captures/ and regenerate preview.</div>';
  }

  frames.forEach((frame, idx) => {
    const wrap = document.createElement('article');
    wrap.className = 'frame-card';
    wrap.innerHTML = '<div class="frame-label">' + (frame.label || frame.id) + '</div>';
    const stage = document.createElement('div');
    stage.className = 'stage';
    const img = document.createElement('img');
    img.src = frame.file;
    img.alt = frame.label || frame.id;
    img.loading = idx === 0 ? 'eager' : 'lazy';
    stage.appendChild(img);

    (frame.annotations || []).slice(0, 3).forEach(aid => {
      const a = annById[aid];
      if (!a) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'anchor';
      btn.textContent = String(a.number || '');
      btn.dataset.ann = a.id;
      btn.style.left = ((a.anchor && a.anchor.x) || 0.5) * 100 + '%';
      btn.style.top = ((a.anchor && a.anchor.y) || 0.5) * 100 + '%';
      btn.title = a.label || '';
      btn.addEventListener('click', () => setActive(a.id));
      stage.appendChild(btn);
    });

    wrap.appendChild(stage);
    stages.appendChild(wrap);
  });

  const allAnns = data.annotations.annotations || [];
  if (!allAnns.length) {
    cardsEl.innerHTML = '<div class="empty">No annotations.</div>';
    return;
  }

  // Group by frame, max 3 shown per frame already encoded
  allAnns.forEach(a => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.ann = a.id;
    card.tabIndex = 0;
    card.addEventListener('click', () => setActive(a.id));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(a.id); } });
    const kinds = (a.kinds || []).map(k => '<span class="kind">' + k + '</span>').join('');
    card.innerHTML =
      '<div class="card-head"><span class="num">' + (a.number || '') + '</span><div>' +
      '<h3>' + (a.label || '') + '</h3>' +
      '<div class="cat">' + (a.category || '') + ' · ' + (a.frame || '') + '</div></div></div>' +
      '<p>' + (a.body || '') + '</p>' +
      '<div class="kinds">' + kinds + '</div>';
    cardsEl.appendChild(card);
  });

  if (allAnns[0]) setActive(allAnns[0].id);
})();
  </script>
</body>
</html>
`;
}

module.exports = {
  buildPreviewHtml,
};
