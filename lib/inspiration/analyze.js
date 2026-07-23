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
    return 'CLI scaffold from HTML/CSS heuristics. Agent should capture pages via Browser/Computer Use, then deepen visual judgments from captures before treating as final.';
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
      : '- URL inspiration. Prefer captures + live cues; do not invent unseen screens.',
    '',
  ];
  return lines.filter((l) => l != null).join('\n');
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
  return `# Aesthetic analysis — ${id}

> ${confidenceNote(imageOnly ? 'image-only' : 'url-heuristic')}

## Meta

- **Title**: ${meta.title || id}
- **Source**: ${meta.sourceUrl || meta.sourcePath || meta.sourceKind}
- **Collected**: ${meta.createdAt}
- **Page type**: ${meta.pageType} (confidence: ${meta.pageTypeConfidence || 'low'})
- **Evidence**: ${(meta.pageTypeEvidence || []).join('; ') || 'n/a'}
- **Categories covered**: ${cats.join(', ') || '(none yet)'}
- **Scope**: ${imageOnly ? 'single image only' : 'URL + captures'}

## Judgment legend

| Kind | Meaning |
|------|---------|
| \`observed\` | Directly visible in the reference |
| \`inferred\` | Design inference grounded in observation |
| \`transferable\` | Rule that can move to another project |
| \`brand-specific\` | Belongs to this brand; do not copy literally |

## 1. Composition & visual hierarchy

- **observed**: ${imageOnly ? 'Limited to the provided frame.' : 'Confirm hero/entry weight from captures.'}
- **inferred**: Reading path and primary/secondary contrast still need capture-backed confirmation.
- **transferable**: Keep one dominant focus per viewport for this page type (\`${meta.pageType}\`).

## 2. Color & value

- **observed**: ${(meta.cssVars && Object.keys(meta.cssVars).length) ? `CSS vars detected: ${Object.keys(meta.cssVars).slice(0, 8).join(', ')}` : 'Read value plan from captures (background family, accent budget).'}
- **inferred**: Accent is likely sparingly used as emphasis rather than wallpaper.
- **transferable**: Separate canvas / surface / ink / emphasis roles.
- **brand-specific**: Exact brand palette identity.

## 3. Typography & typesetting

- **observed**: ${(meta.fonts || []).length ? `Font hints: ${meta.fonts.join(', ')}` : 'Judge from captures.'}
- **inferred**: Heading posture should match page-type density (\`${meta.pageType}\`).
- **transferable**: Weight ladder + line-length discipline; not the proprietary typeface itself.

## 4. Space & component language

- **observed**: Inspect radius, borders, shadows, and stacking in captures.
- **transferable**: Rhythm of spacing and surface elevation — not literal component skins.

## 5. Visual evidence

- **observed**: Product UI / data / logo / illustration credibility cues (from captures).
- **brand-specific**: Logos, mascots, campaign art.
- **transferable**: Strategy of showing real product evidence vs abstract decoration.

## 6. Page narrative

${
  imageOnly
    ? '- **observed**: Single image — multi-screen narrative cannot be claimed.\n- **inferred**: Treat as one beat only.'
    : '- **inferred**: Positioning → proof → capability → conversion progression should be verified across frames.\n- **transferable**: Narrative beat order adapted to the target product story.'
}

## Capture / CLI notes

${(notes || []).map((n) => `- ${n}`).join('\n') || '- (none)'}

## Next agent step

Enrich this file and \`annotations.json\` from the captures so at least **four** of the six aesthetic categories are capture-backed at medium+ confidence. Keep Explore → Preview → Apply: do not write project \`DESIGN.md\` or profile tokens until the user confirms.
`;
}

function buildDesignSeedMd({ id, meta, annotations }) {
  const rules = (annotations.transferableRules || []).map((r) => `- ${r.rule} _(${(r.kinds || []).join(', ')})_`).join('\n');
  return `# Design seed — ${id}

> Candidate content for project \`DESIGN.md\`. Status: **preview only** — do not apply until the user confirms.
> Generated: ${todayStamp()}

## Page Context

- **Primary page type**: ${meta.pageType}
- **Density**: <!-- low / medium / high — fill from captures -->
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

## Do’s and Don’ts

### Do
- Keep page-type fidelity first.
- Reuse transferable hierarchy, spacing rhythm, and evidence strategy.
- Mark confidence when visual access was partial.

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
vibe-to-ui inspiration apply ${id} --project <path>           # show diff
vibe-to-ui inspiration apply ${id} --project <path> --confirm # write DESIGN.md
\`\`\`
`;
}

module.exports = {
  ANALYSIS_CATEGORIES,
  buildSourceMd,
  buildAnnotations,
  buildAnalysisMd,
  buildDesignSeedMd,
};
