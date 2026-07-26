'use strict';

const path = require('path');
const { nowIso, todayStamp } = require('../home');

const ANALYSIS_CATEGORIES = [
  'composition',
  'color',
  'typography',
  'space-components',
  'visual-evidence',
  'narrative',
];

function confidenceNote(kind) {
  if (kind === 'url-heuristic') {
    return 'CLI scaffold from HTML/CSS heuristics. Agent must complete **full-scroll** captures (fullpage + consecutive viewports to page end) via Browser/Computer Use, then deepen visual + motion judgments before treating as final.';
  }
  if (kind === 'image-only') {
    return 'Analysis scope is limited to the provided image — full-page narrative and multi-viewport rhythm cannot be claimed.';
  }
  return 'Scaffold awaiting agent visual enrichment.';
}

function buildSourceMd({ id, meta, notes }) {
  const lines = [
    `# Source — ${id}`,
    '',
    `- **Kind**: ${meta.sourceKind}`,
    meta.productId ? `- **Product**: ${meta.productId}` : null,
    meta.pageSlug ? `- **Page**: ${meta.pageSlug}` : null,
    meta.sourceUrl ? `- **URL**: ${meta.sourceUrl}` : null,
    meta.finalUrl && meta.finalUrl !== meta.sourceUrl ? `- **Final URL**: ${meta.finalUrl}` : null,
    meta.sourcePath ? `- **Local path**: ${meta.sourcePath}` : null,
    `- **Title**: ${meta.title || '(unknown)'}`,
    `- **Collected**: ${meta.createdAt}`,
    `- **Page type (initial)**: ${meta.pageType} (${meta.pageTypeConfidence || 'low'})`,
    '',
    '## Notes',
    '',
    ...(notes || []).map((n) => `- ${n}`),
    '',
    '## Scope',
    '',
    meta.sourceKind === 'image'
      ? '- Image-only inspiration. Do not invent off-image page structure.'
      : '- URL page under a product folder. Require **full-scroll coverage** + optional motion pass. Do not invent unseen screens.',
    '',
  ];
  return lines.filter((l) => l != null).join('\n');
}

function buildMotionMd({ id, meta }) {
  const imageOnly = meta.sourceKind === 'image';
  return `# Motion — ${id}

> ${
    imageOnly
      ? 'Image-only source — motion DNA cannot be claimed from static pixels. Mark confidence low or skip.'
      : 'Scaffold. After a short live observation pass (load → scroll 1–2+ screens → hover primary controls), fill Motion DNA. Do not invent cinematic motion the page does not show.'
  }

## Observation checklist

- [ ] Page load / entrance
- [ ] Scroll / in-view reveals / sticky / parallax
- [ ] Hover / focus micro-feedback on primary controls
- [ ] Optional: tab / modal / drawer
- [ ] \`prefers-reduced-motion\` behavior (if tool can toggle)

## Motion DNA

| Dimension | Notes | Confidence |
|-----------|-------|------------|
| Roles | feedback / continuity / guidance / atmosphere | |
| Triggers | load / scroll / hover / in-view | |
| Tempo | snappy / moderate / languid | |
| Easing character | linear / ease-out / springy | |
| Density | minimal / selective / rich | |
| Signature motif | one memorable motion idea | |
| Reduced motion | disable / simplify | |

## Transferable rules

- <!-- e.g. Prefer scroll-linked section reveals over ambient particle fields on this page type -->

## Brand-specific (do not copy)

- <!-- proprietary Lottie, mascot loops, campaign choreography -->
`;
}

function buildSynthesisScaffold({ meta }) {
  // CLI default placeholders are English. Agent must replace with judgments in the
  // user's prompt language (not the source page locale) before rebuild-preview.
  const title = meta.title || meta.pageSlug || 'Page';
  return {
    status: 'scaffold',
    eyebrow: 'DESIGN SYSTEM ANALYSIS / OBSERVED',
    title: `${title} · Visual DNA`,
    traits: [
      {
        label: 'MOOD',
        title: 'Pending enrichment',
        body: 'From full-scroll captures, summarize emotional posture: calm engineering, consumer vitality, or editorial restraint?',
      },
      {
        label: 'COMPOSITION',
        title: 'Pending enrichment',
        body: 'Primary hierarchy and reading entry: centered hero, split columns, or evidence-driven module grid?',
      },
      {
        label: 'TYPE',
        title: 'Pending enrichment',
        body: 'Heading vs body scale, weight ladder, and whether navigation yields to display type.',
      },
      {
        label: 'COLOR',
        title: 'Pending enrichment',
        body: 'Role assignment for canvas / ink / signal; whether accent serves signaling only, not decoration.',
      },
      {
        label: 'EVIDENCE',
        title: 'Pending enrichment',
        body: 'How much credibility comes from real UI, data, logos, or abstract illustration.',
      },
      {
        label: 'RHYTHM',
        title: 'Pending enrichment',
        body: 'Scroll narrative beats: positioning → proof → capability → conversion; how light/dark bands alternate.',
      },
    ],
    seed: {
      eyebrow: 'DESIGN.md READY SEED',
      visualDirection: 'Pending enrichment: one-sentence visual direction.',
      dos: 'Pending enrichment: transferable practices.',
      donts: 'Pending enrichment: brand-specific elements not to copy.',
    },
  };
}

function buildAnnotations({ id, meta, frames, themeProfile }) {
  const frameList = (frames || []).filter((f) => f.kind === 'frame' || f.kind === 'fullpage');
  const primary = frameList.find((f) => f.file.startsWith('frame-')) || frameList[0];
  const frameId = primary ? primary.file.replace(/\.[^.]+$/, '') : 'frame-01';
  const imageOnly = meta.sourceKind === 'image';

  const annotations = [
    {
      id: 'a1',
      frame: frameId,
      number: 1,
      anchor: { x: 0.5, y: 0.18 },
      category: 'composition',
      label: 'Primary hierarchy',
      body: imageOnly
        ? 'Observed within this image: locate the dominant visual weight and reading entry point. Confirm whether hierarchy is brand-led, product-led, or content-led.'
        : 'Observed (heuristic): above-the-fold composition likely concentrates brand/hero attention. Verify mid-axis vs asymmetric layout from the capture.',
      confidence: 'low',
      kinds: ['observed'],
    },
    {
      id: 'a2',
      frame: frameId,
      number: 2,
      anchor: { x: 0.22, y: 0.42 },
      category: 'color',
      label: 'Color & value plan',
      body:
        Object.keys(meta.cssVars || {}).length > 0
          ? `Inferred from CSS variables present in HTML (${Object.keys(meta.cssVars).slice(0, 5).join(', ')}…). Map background vs accent ratio; keep signal color for evidence, not decoration.`
          : 'Infer the background value family and accent budget from the capture. Note semantic roles (surface, text, emphasis) rather than dumping hex lists.',
      confidence: 'low',
      kinds: Object.keys(meta.cssVars || {}).length ? ['inferred', 'observed'] : ['inferred'],
    },
    {
      id: 'a3',
      frame: frameId,
      number: 3,
      anchor: { x: 0.72, y: 0.55 },
      category: 'typography',
      label: 'Type posture',
      body:
        (meta.fonts || []).length > 0
          ? `Observed font hints: ${(meta.fonts || []).slice(0, 3).join(', ')}. Judge display vs body contrast, line length, and density against the page type (${meta.pageType}).`
          : 'Judge heading posture, weight ladder, and information density from the capture. Prefer attitude over exact font cloning.',
      confidence: 'low',
      kinds: (meta.fonts || []).length ? ['observed', 'transferable'] : ['inferred', 'transferable'],
    },
  ];

  // Max 3 per frame — already 3 on primary. Add second-frame annotations only if another frame exists.
  const second = frameList.find((f) => f !== primary);
  const framesOut = [];
  const seen = new Set();
  for (const f of frameList) {
    const fid = f.file.replace(/\.[^.]+$/, '');
    if (seen.has(fid)) continue;
    seen.add(fid);
    framesOut.push({
      id: fid,
      file: `captures/${f.file}`,
      label: f.label,
      annotations: fid === frameId ? annotations.map((a) => a.id) : [],
    });
  }

  if (second) {
    const fid2 = second.file.replace(/\.[^.]+$/, '');
    const extra = [
      {
        id: 'a4',
        frame: fid2,
        number: 1,
        anchor: { x: 0.4, y: 0.35 },
        category: 'narrative',
        label: 'Scroll narrative',
        body: imageOnly
          ? 'Single image — cannot claim multi-screen narrative progression.'
          : 'Inferred: mid-page modules should advance the story (proof → capability → conversion). Confirm section rhythm from this frame.',
        confidence: 'low',
        kinds: imageOnly ? ['observed'] : ['inferred', 'transferable'],
      },
      {
        id: 'a5',
        frame: fid2,
        number: 2,
        anchor: { x: 0.65, y: 0.6 },
        category: 'space-components',
        label: 'Surface language',
        body: 'Look for radius, border, shadow, and surface stacking. Transfer the rhythm, not the literal chrome.',
        confidence: 'low',
        kinds: ['observed', 'transferable'],
      },
      {
        id: 'a6',
        frame: fid2,
        number: 3,
        anchor: { x: 0.2, y: 0.7 },
        category: 'visual-evidence',
        label: 'Credibility evidence',
        body: 'Note how product UI, real data, logos, or illustration establish trust. Separate brand-specific marks from transferable evidence strategies.',
        confidence: 'low',
        kinds: ['observed', 'brand-specific'],
      },
    ];
    for (const a of extra) annotations.push(a);
    const frameEntry = framesOut.find((f) => f.id === fid2);
    if (frameEntry) frameEntry.annotations = extra.map((a) => a.id);
  }

  return {
    version: 1,
    inspirationId: id,
    generatedAt: nowIso(),
    themeProfile: themeProfile || null,
    pageType: meta.pageType,
    categoriesCovered: [...new Set(annotations.map((a) => a.category))],
    frames: framesOut,
    annotations,
    synthesis: buildSynthesisScaffold({ meta }),
    transferableRules: [
      {
        id: 'tr-1',
        rule: 'Preserve page-type density and hierarchy logic before borrowing decorative detail.',
        kinds: ['transferable'],
      },
      {
        id: 'tr-2',
        rule: 'Reuse color roles (surface / ink / emphasis) rather than copying brand-specific hex identities.',
        kinds: ['transferable'],
      },
      {
        id: 'tr-3',
        rule: 'Do not transplant logos, mascots, or campaign photography.',
        kinds: ['brand-specific'],
      },
    ],
  };
}

function buildAnalysisMd({ id, meta, annotations, notes }) {
  const cats = annotations.categoriesCovered || [];
  const imageOnly = meta.sourceKind === 'image';
  const productRef = meta.productId || id.split('/')[0];
  return `# Aesthetic analysis — ${id}

> ${confidenceNote(imageOnly ? 'image-only' : 'url-heuristic')}

## Meta

- **Title**: ${meta.title || id}
- **Product**: ${meta.productId || '—'}
- **Page**: ${meta.pageSlug || '—'}
- **Source**: ${meta.sourceUrl || meta.sourcePath || meta.sourceKind}
- **Collected**: ${meta.createdAt}
- **Page type**: ${meta.pageType} (confidence: ${meta.pageTypeConfidence || 'low'})
- **Evidence**: ${(meta.pageTypeEvidence || []).join('; ') || 'n/a'}
- **Categories covered**: ${cats.join(', ') || '(none yet)'}
- **Capture coverage**: ${meta.captureCoverage || meta.captureStatus || 'unknown'}
- **Scope**: ${imageOnly ? 'single image only' : 'URL page — full-scroll visual positioning'}

## Judgment legend

| Kind | Meaning |
|------|---------|
| \`observed\` | Directly visible in a capture covering that region |
| \`inferred\` | Design inference grounded in observation |
| \`transferable\` | Rule that can move to another project |
| \`brand-specific\` | Belongs to this brand; do not copy literally |

## Full-scroll visual positioning

Map the **entire scroll** (not hero-only). For each major band, cite the frame file:

| Scroll band | Frame(s) | Visual job | Density | Notes |
|-------------|----------|------------|---------|-------|
| Hero / entry | frame-01 | | | |
| Mid narrative | frame-0N | | | |
| Proof / product | frame-0N | | | |
| Closing / CTA | last frames | | | |

If a band has no capture, leave it blank and set \`captureCoverage: partial\` — do **not** invent observed claims.

## 1. Composition & visual hierarchy

- **observed**: ${imageOnly ? 'Limited to the provided frame.' : 'Confirm hierarchy **per scroll band** from consecutive captures.'}
- **inferred**: Reading path and primary/secondary contrast still need capture-backed confirmation.
- **transferable**: Keep one dominant focus per viewport for this page type (\`${meta.pageType}\`).

## 2. Color & value

- **observed**: ${(meta.cssVars && Object.keys(meta.cssVars).length) ? `CSS vars detected: ${Object.keys(meta.cssVars).slice(0, 8).join(', ')}` : 'Read value plan across bands (dark/light alternation, accent budget).'}
- **inferred**: Accent is likely sparingly used as emphasis rather than wallpaper.
- **transferable**: Separate canvas / surface / ink / emphasis roles.
- **brand-specific**: Exact brand palette identity.

## 3. Typography & typesetting

- **observed**: ${(meta.fonts || []).length ? `Font hints: ${meta.fonts.join(', ')}` : 'Judge from captures across bands.'}
- **inferred**: Heading posture should match page-type density (\`${meta.pageType}\`).
- **transferable**: Weight ladder + line-length discipline; not the proprietary typeface itself.

## 4. Space & component language

- **observed**: Inspect radius, borders, shadows, and stacking in captures across the scroll.
- **transferable**: Rhythm of spacing and surface elevation — not literal component skins.

## 5. Visual evidence

- **observed**: Product UI / data / logo / illustration credibility cues (from captures).
- **brand-specific**: Logos, mascots, campaign art.
- **transferable**: Strategy of showing real product evidence vs abstract decoration.

## 6. Page narrative

${
  imageOnly
    ? '- **observed**: Single image — multi-screen narrative cannot be claimed.\n- **inferred**: Treat as one beat only.'
    : '- **observed**: Beat order must be filled from full-scroll frames (positioning → proof → capability → conversion, or the page’s actual order).\n- **transferable**: Narrative beat order adapted to the target product story.'
}

## 7. Motion (see motion.md)

- Summarize Motion DNA after live observation; keep detail in \`motion.md\`.
- Mark confidence when only CSS/JS hints were available.

## Capture / CLI notes

${(notes || []).map((n) => `- ${n}`).join('\n') || '- (none)'}

## Next agent step

1. Complete **full-scroll** captures into \`captures/\` (fullpage + consecutive frames to page end).
2. Enrich this file, \`annotations.json\`, and \`motion.md\` so ≥4/6 aesthetic categories are capture-backed at medium+ confidence.
3. Rebuild page preview, then refresh product synthesis: \`vibe-to-ui inspiration rebuild-product ${productRef}\`.
4. Keep Explore → Preview → Apply: product-level \`apply\` writes \`DESIGN.md\` only after user \`--confirm\`.
`;
}

function buildDesignSeedMd({ id, meta, annotations }) {
  const rules = (annotations.transferableRules || []).map((r) => `- ${r.rule} _(${(r.kinds || []).join(', ')})_`).join('\n');
  const applyTarget = meta.productId || id.split('/')[0];
  return `# Design seed — ${id}

> Page-level candidate notes. **Default apply target is the product** (\`${applyTarget}\`). Use \`--page\` only when you intentionally want this page alone.
> Status: **preview only** — do not apply until the user confirms.
> Generated: ${todayStamp()}

## Page Context

- **Primary page type**: ${meta.pageType}
- **Density**: <!-- low / medium / high — fill from full-scroll captures -->
- **Interaction model**: <!-- scrolling / scanning / ... -->
- **Design consequences**: Preserve hierarchy and density posture of a \`${meta.pageType}\` surface.
- **Kinds**: inferred / transferable

## Visual Direction

- Atmosphere drawn from \`${meta.title || id}\` without cloning brand chrome.
- Prefer product-aware adaptation over literal restyling.
- **Kinds**: inferred / transferable

## Colors

| Role | Direction | Kind |
|------|-----------|------|
| Canvas / paper | Match value family from reference, not necessarily hex | transferable |
| Ink | High-legibility text color strategy | transferable |
| Emphasis / signal | Sparse attention color for evidence & CTAs | transferable |
| Brand identity hues | Do not copy | brand-specific |

${
  meta.cssVars && Object.keys(meta.cssVars).length
    ? `Observed CSS variable samples:\n\n\`\`\`json\n${JSON.stringify(meta.cssVars, null, 2)}\n\`\`\`\n`
    : ''
}

## Typography

- Heading posture: <!-- fill from captures -->
- Body rhythm: <!-- line length / density -->
- Font hints observed: ${(meta.fonts || []).join(', ') || '(none)'}
- **Kinds**: observed (hints) / transferable (scale & attitude) / brand-specific (proprietary faces)

## Motion

- See \`motion.md\` on this page; product seed should synthesize cross-page motion personality.

## Do’s and Don’ts

### Do
- Keep page-type fidelity first.
- Reuse transferable hierarchy, spacing rhythm, and evidence strategy.
- Require full-scroll coverage before claiming mid/lower-page observations.

### Don’t
- Auto-write project tokens or \`DESIGN.md\` from this seed.
- Copy logos, illustrations, or campaign photography.
- Force a landing-page hero onto a dense workbench (or the reverse) without explicit repositioning intent.

## Transferable rules

${rules || '- (none yet)'}

## Do not copy directly

- Brand marks, mascots, proprietary illustration systems
- Exact marketing copy and campaign layout lockups
- Page modules that only exist because of this product’s IA

## Apply gate

\`\`\`bash
vibe-to-ui inspiration apply ${applyTarget} --project <path>                 # product seed (default)
vibe-to-ui inspiration apply ${applyTarget} --page ${meta.pageSlug || 'home'} --project <path>
vibe-to-ui inspiration apply ${applyTarget} --project <path> --confirm
\`\`\`
`;
}

function buildProductMd({ productId, meta, pages }) {
  const pageRows = (pages || [])
    .map(
      (p) =>
        `| \`${p.slug}\` | ${p.pageType || '—'} | ${p.captureCoverage || p.captureStatus || '—'} | ${p.title || ''} |`
    )
    .join('\n');
  return `# Product visual positioning — ${productId}

> Cross-page synthesis for **${meta.title || productId}**. Each page must still have its own full-scroll analysis under \`pages/<slug>/\`.
> Generated scaffold: ${todayStamp()}

## Meta

- **Product id**: ${productId}
- **Primary host**: ${meta.primaryHost || '—'}
- **Pages collected**: ${(pages || []).map((p) => p.slug).join(', ') || '(none)'}
- **Primary / mixed page types**: ${meta.primaryPageType || 'mixed'}

## Pages

| Page | Type | Coverage | Title |
|------|------|----------|-------|
${pageRows || '| — | — | — | — |'}

## Cross-page visual DNA

- **Shared canvas / value plan**: <!-- dark/light, accent budget across surfaces -->
- **Typography system**: <!-- display vs UI faces; what stays constant -->
- **Component / surface language**: <!-- radius, borders, cards vs open layout -->
- **Imagery & evidence strategy**: <!-- abstract / product UI / logos -->
- **Motion personality**: <!-- synthesize from page motion.md files -->
- **What varies by page type**: <!-- landing drama vs docs clarity vs app density -->

## Representative pages to collect

Aim for 2–4 surfaces when the site has them (adjust to the product):

1. Marketing / home
2. Docs or content
3. App / product UI (if public)
4. Pricing or conversion

## Transferable product rules

- Preserve page-type differences inside one brand system (do not flatten docs into a landing).
- Reuse color/type/motion **roles** across pages; do not copy proprietary chrome.

## Do not copy

- Logos, mascots, proprietary illustration, campaign lockups, customer logos.

## Next

Enrich page analyses after full-scroll captures, then run \`vibe-to-ui inspiration rebuild-product ${productId}\` to refresh this file and the product \`design-seed.md\`.
`;
}

function buildProductDesignSeedMd({ productId, meta, pages }) {
  const pageList = (pages || []).map((p) => `- \`${p.slug}\` (${p.pageType || 'other'}) — ${p.title || ''}`).join('\n');
  return `# Design seed — product ${productId}

> **Product-level** candidate for project \`DESIGN.md\` (default \`inspiration apply\` target).
> Status: **preview only** — do not apply until the user confirms.
> Generated: ${todayStamp()}

## Product Context

- **Inspiration product**: ${productId}
- **Primary host**: ${meta.primaryHost || '—'}
- **Surfaces collected**:
${pageList || '- (none yet)'}
- **Page-type mix**: ${meta.primaryPageType || 'mixed'}

## Visual Direction (cross-page)

- Synthesize shared atmosphere from page analyses without cloning brand chrome.
- Keep archetype differences (landing vs docs vs app) when adapting to the user’s product.
- **Kinds**: inferred / transferable

## Colors

| Role | Direction | Kind |
|------|-----------|------|
| Canvas / paper | Shared value family across surfaces | transferable |
| Ink | Legibility strategy | transferable |
| Emphasis / signal | Sparse accent role | transferable |
| Brand identity hues | Do not copy | brand-specific |

## Typography

- Shared type attitude across the product; scale may vary by page type.
- **Kinds**: transferable / brand-specific (proprietary faces)

## Motion

- Product-level motion personality synthesized from page \`motion.md\` files.
- Prefer one signature motif family with page-type density adjustments.

## Do’s and Don’ts

### Do
- Apply the **product** seed by default when the user wants this reference system.
- Prefer full-scroll, multi-page evidence over hero-only impressions.
- Preserve page-type fidelity when porting rules.

### Don’t
- Auto-write project tokens or \`DESIGN.md\` without \`--confirm\`.
- Copy logos, illustrations, or campaign photography.
- Collapse every surface into a single landing-page treatment.

## Apply gate

\`\`\`bash
vibe-to-ui inspiration apply ${productId} --project <path>           # show diff
vibe-to-ui inspiration apply ${productId} --project <path> --confirm # write DESIGN.md
# optional single-page override:
vibe-to-ui inspiration apply ${productId} --page <slug> --project <path> --confirm
\`\`\`
`;
}

module.exports = {
  ANALYSIS_CATEGORIES,
  buildSourceMd,
  buildMotionMd,
  buildAnnotations,
  buildSynthesisScaffold,
  buildAnalysisMd,
  buildDesignSeedMd,
  buildProductMd,
  buildProductDesignSeedMd,
};
