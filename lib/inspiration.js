'use strict';

const fs = require('fs');
const path = require('path');
const {
  resolveHomeRoot,
  assertWritableDir,
  normalizeSlug,
  nowIso,
  writeText,
  writeJson,
  readText,
  readJson,
  exists,
} = require('./home');
const { profileDir } = require('./context');
const { buildInspirationId, nextVersionId } = require('./inspiration/id');
const {
  inspirationPaths,
  listInspirations,
  loadMetadata,
  findBySource,
  upsertInspirationRef,
} = require('./inspiration/store');
const { inspectUrl } = require('./inspiration/fetch');
const {
  prepareUrlCaptures,
  captureImage,
  importCaptures,
  framesFromDir,
} = require('./inspiration/capture');
const {
  buildSourceMd,
  buildAnnotations,
  buildAnalysisMd,
  buildDesignSeedMd,
} = require('./inspiration/analyze');
const { buildPreviewHtml } = require('./inspiration/preview');
const { DEFAULT_THEME, themeFromProfileTokens } = require('./inspiration/theme');

function printHelp() {
  console.log(`vibe-to-ui inspiration — Design Inspiration Library

Usage:
  vibe-to-ui inspiration add <url> [--from-captures <dir>] [--profile <id>] [--id <id>] [--refresh|--force|--as-new]
  vibe-to-ui inspiration add --image <path> [--profile <id>] [--id <id>] [--refresh|--force|--as-new]
  vibe-to-ui inspiration list
  vibe-to-ui inspiration show <id>
  vibe-to-ui inspiration link <id> --profile <profile-id> [--rules <r1,r2>]
  vibe-to-ui inspiration apply <id> --project <path> [--confirm]
  vibe-to-ui inspiration rebuild-preview <id> [--profile <id>]
  vibe-to-ui inspiration import-captures <id> --from-captures <dir> [--profile <id>]

Notes:
  - Library root: ~/.vibe-to-ui/inspirations/<id>/  (NOT inside a profile)
  - URL screenshots are agent-owned (Browser Use / Computer Use). CLI does not drive Chrome.
  - Explore → Preview → Apply: add/list/show/link never write project DESIGN.md
  - apply shows a diff preview; write only with --confirm
  - Duplicate sources: reuse, --refresh, or --as-new (versioned id). No silent overwrite.
`);
}

function parseArgs(argv) {
  // argv like process.argv; command already selected as inspiration by router
  const args = argv[2] === 'inspiration' ? argv.slice(3) : argv.slice(2);
  if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
    return { help: true };
  }

  const cmd = args[0];
  const opts = {
    help: false,
    cmd,
    url: null,
    image: null,
    id: null,
    profile: null,
    project: null,
    fromCaptures: null,
    confirm: false,
    refresh: false,
    force: false,
    asNew: false,
    rules: [],
    positional: [],
  };

  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--image') {
      opts.image = args[++i];
      if (!opts.image) throw new Error('--image requires a path');
    } else if (a === '--from-captures') {
      opts.fromCaptures = args[++i];
      if (!opts.fromCaptures) throw new Error('--from-captures requires a directory');
    } else if (a === '--profile') {
      opts.profile = args[++i];
      if (!opts.profile) throw new Error('--profile requires a value');
    } else if (a === '--project') {
      opts.project = args[++i];
      if (!opts.project) throw new Error('--project requires a path');
    } else if (a === '--id') {
      opts.id = args[++i];
      if (!opts.id) throw new Error('--id requires a value');
    } else if (a === '--rules') {
      const raw = args[++i];
      if (!raw) throw new Error('--rules requires a value');
      opts.rules = raw.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (a === '--confirm') opts.confirm = true;
    else if (a === '--refresh') opts.refresh = true;
    else if (a === '--force') opts.force = true;
    else if (a === '--as-new') opts.asNew = true;
    else if (a.startsWith('-')) throw new Error(`Unknown argument: ${a}`);
    else opts.positional.push(a);
  }

  if (cmd === 'add' && !opts.image && opts.positional[0]) {
    opts.url = opts.positional[0];
  }
  if (['show', 'link', 'apply', 'rebuild-preview', 'import-captures'].includes(cmd) && opts.positional[0]) {
    opts.id = opts.id || opts.positional[0];
  }

  return opts;
}

function resolveTheme(root, profileRaw) {
  if (!profileRaw) return { theme: DEFAULT_THEME, profileId: null };
  const profileId = normalizeSlug(profileRaw, 'profile id');
  const dir = profileDir(root, profileId);
  const tokensPath = path.join(dir, 'tokens.json');
  if (!exists(tokensPath)) {
    console.error(`warning: profile tokens not found at ${tokensPath}; using default theme`);
    return { theme: DEFAULT_THEME, profileId };
  }
  try {
    return { theme: themeFromProfileTokens(readJson(tokensPath)), profileId };
  } catch (err) {
    console.error(`warning: could not read profile tokens (${err.message}); using default theme`);
    return { theme: DEFAULT_THEME, profileId };
  }
}

function resolveAddId(root, opts) {
  if (opts.id) {
    const id = normalizeSlug(opts.id, 'inspiration id');
    if (exists(inspirationPaths(root, id).dir) && !opts.refresh && !opts.force && !opts.asNew) {
      throw new Error(
        `Inspiration id already exists: ${id}\n` +
          `Pass --refresh/--force to overwrite, --as-new for a version, or choose another --id.`
      );
    }
    if (opts.asNew && exists(inspirationPaths(root, id).dir)) {
      let next = id;
      while (exists(inspirationPaths(root, next).dir)) next = nextVersionId(next);
      return next;
    }
    return id;
  }

  let candidate = buildInspirationId({
    url: opts.url,
    imagePath: opts.image,
  });

  const matches = findBySource(root, { url: opts.url, imagePath: opts.image });
  if (matches.length && !opts.refresh && !opts.force && !opts.asNew) {
    const ids = matches.map((m) => m.id).join(', ');
    throw new Error(
      `Source already collected as: ${ids}\n` +
        `Reuse it, or pass --refresh (overwrite same id), --force (overwrite), or --as-new (create versioned id).`
    );
  }

  if (opts.asNew && exists(inspirationPaths(root, candidate).dir)) {
    let id = candidate;
    while (exists(inspirationPaths(root, id).dir)) {
      id = nextVersionId(id);
    }
    return id;
  }

  if ((opts.refresh || opts.force) && matches.length) {
    return matches[0].id;
  }

  if (exists(inspirationPaths(root, candidate).dir) && !opts.refresh && !opts.force) {
    throw new Error(
      `Inspiration id already exists: ${candidate}\n` +
        `Pass --refresh/--force to overwrite, --as-new for a version, or --id <custom>.`
    );
  }

  return candidate;
}

async function cmdAdd(root, opts) {
  if (!opts.url && !opts.image) {
    throw new Error('add requires a <url> or --image <path>');
  }
  if (opts.url && opts.image) {
    throw new Error('add accepts either a url or --image, not both');
  }

  assertWritableDir(root);
  const id = resolveAddId(root, opts);
  const paths = inspirationPaths(root, id);
  fs.mkdirSync(paths.captures, { recursive: true });

  const { theme, profileId } = resolveTheme(root, opts.profile);
  const notes = [];
  let meta;
  let frames = [];

  if (opts.url) {
    console.error(`Fetching metadata for ${opts.url} …`);
    let inspected;
    try {
      inspected = await inspectUrl(opts.url);
    } catch (err) {
      notes.push(`URL fetch failed: ${err.message}`);
      inspected = {
        sourceUrl: opts.url,
        finalUrl: opts.url,
        title: opts.url,
        description: '',
        cssVars: {},
        fonts: [],
        pageType: 'other',
        pageTypeConfidence: 'low',
        pageTypeEvidence: ['Fetch failed; page type unknown'],
      };
    }

    let captureStatus = 'awaiting-agent';
    if (opts.fromCaptures) {
      const cap = importCaptures(opts.fromCaptures, paths.captures);
      notes.push(...cap.notes);
      frames = cap.frames;
      captureStatus = cap.captureStatus;
    } else {
      const cap = prepareUrlCaptures(paths.captures, { url: inspected.finalUrl || opts.url });
      notes.push(...cap.notes);
      frames = cap.frames;
      captureStatus = cap.captureStatus;
    }

    meta = {
      id,
      sourceKind: 'url',
      sourceUrl: opts.url,
      finalUrl: inspected.finalUrl || opts.url,
      title: inspected.title,
      description: inspected.description || '',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      pageType: inspected.pageType,
      pageTypeConfidence: inspected.pageTypeConfidence,
      pageTypeEvidence: inspected.pageTypeEvidence,
      keywords: [inspected.pageType, ...(inspected.fonts || []).slice(0, 2)].filter(Boolean),
      cssVars: inspected.cssVars,
      fonts: inspected.fonts,
      captureStatus,
      analysisStatus: 'scaffold',
      themeProfile: profileId,
      frames: frames.map((f) => f.file),
    };
  } else {
    const abs = path.resolve(opts.image);
    const cap = captureImage(abs, paths.captures);
    notes.push(...cap.notes);
    frames = cap.frames;
    meta = {
      id,
      sourceKind: 'image',
      sourcePath: abs,
      title: path.basename(abs),
      description: '',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      pageType: 'other',
      pageTypeConfidence: 'low',
      pageTypeEvidence: ['Image-only source; classify from the image during agent enrichment'],
      keywords: ['image', 'screenshot'],
      cssVars: {},
      fonts: [],
      captureStatus: 'image-only',
      analysisStatus: 'scaffold',
      analysisScope: 'single-image',
      themeProfile: profileId,
      frames: frames.map((f) => f.file),
    };
  }

  const annotations = buildAnnotations({ id, meta, frames, themeProfile: profileId });
  const analysis = buildAnalysisMd({ id, meta, annotations, notes });
  const seed = buildDesignSeedMd({ id, meta, annotations });
  const sourceMd = buildSourceMd({ id, meta, notes });
  const preview = buildPreviewHtml({ id, meta, annotations, theme });

  writeJson(paths.metadata, meta);
  writeText(paths.source, sourceMd);
  writeJson(paths.annotations, annotations);
  writeText(paths.analysis, analysis);
  writeText(paths.designSeed, seed);
  writeText(paths.preview, preview);

  console.log(`Inspiration saved: ${id}`);
  console.log(`path: ${paths.dir}`);
  console.log(`preview: ${paths.preview}`);
  console.log(`pageType: ${meta.pageType} (${meta.pageTypeConfidence})`);
  console.log(`captureStatus: ${meta.captureStatus}`);
  console.log(`captures: ${frames.length ? frames.map((f) => f.file).join(', ') : '(awaiting agent)'}`);
  if (notes.length) {
    console.log('notes:');
    for (const n of notes) console.log(`  - ${n}`);
  }
  console.log('');
  if (meta.captureStatus === 'awaiting-agent') {
    console.log('Next (agent): use Browser Use / Computer Use to save fullpage.jpg + frame-01.jpg…');
    console.log(`  into ${paths.captures}`);
    console.log(`then: vibe-to-ui inspiration rebuild-preview ${id}`);
  } else {
    console.log('Next: enrich analysis.md / annotations.json from captures,');
    console.log(`then optionally: vibe-to-ui inspiration link ${id} --profile <profile>`);
  }
}

function cmdList(root) {
  const items = listInspirations(root);
  if (!items.length) {
    console.log(`No inspirations under ${path.join(root, 'inspirations')}`);
    console.log('Add one with: vibe-to-ui inspiration add <url>');
    return;
  }
  console.log(`Inspiration Library root: ${path.join(root, 'inspirations')}`);
  console.log('');
  for (const it of items) {
    const kw = (it.keywords || []).join(', ') || '—';
    console.log(`- ${it.id}`);
    console.log(`    title: ${it.title}`);
    console.log(`    source: ${it.source || '—'}`);
    console.log(`    date: ${it.date || '—'}`);
    console.log(`    pageType: ${it.pageType}`);
    console.log(`    keywords: ${kw}`);
  }
}

function cmdShow(root, idRaw) {
  const id = normalizeSlug(idRaw, 'inspiration id');
  const paths = inspirationPaths(root, id);
  if (!exists(paths.dir)) {
    throw new Error(`Inspiration not found: ${id}\nExpected: ${paths.dir}`);
  }
  const meta = loadMetadata(root, id) || { id };
  console.log(`id: ${id}`);
  console.log(`title: ${meta.title || id}`);
  console.log(`source: ${meta.sourceUrl || meta.sourcePath || meta.sourceKind || '—'}`);
  console.log(`date: ${meta.createdAt || '—'}`);
  console.log(`pageType: ${meta.pageType || 'other'}`);
  console.log(`keywords: ${(meta.keywords || []).join(', ') || '—'}`);
  console.log(`analysisStatus: ${meta.analysisStatus || '—'}`);
  console.log(`path: ${paths.dir}`);
  console.log(`preview: ${paths.preview}`);
  if (exists(paths.analysis)) {
    console.log('');
    console.log('--- analysis excerpt ---');
    const body = readText(paths.analysis).split('\n').slice(0, 40).join('\n');
    console.log(body);
  }
}

function cmdLink(root, opts) {
  if (!opts.id) throw new Error('link requires <id>');
  if (!opts.profile) throw new Error('link requires --profile <profile-id>');
  const id = normalizeSlug(opts.id, 'inspiration id');
  const profileId = normalizeSlug(opts.profile, 'profile id');
  const paths = inspirationPaths(root, id);
  if (!exists(paths.dir)) {
    throw new Error(`Inspiration not found: ${id}`);
  }
  const pdir = profileDir(root, profileId);
  if (!exists(pdir)) {
    throw new Error(
      `Profile not found: ${profileId}\n` +
        `Create it with: vibe-to-ui context --profile ${profileId} --init`
    );
  }

  let transferableRules = opts.rules;
  if (!transferableRules.length && exists(paths.annotations)) {
    try {
      const ann = readJson(paths.annotations);
      transferableRules = (ann.transferableRules || [])
        .filter((r) => (r.kinds || []).includes('transferable'))
        .map((r) => r.rule);
    } catch {
      /* ignore */
    }
  }

  const entry = upsertInspirationRef(pdir, {
    inspirationId: id,
    status: 'reference-only',
    transferableRules,
    notes: 'Linked as reference-only. Does not rewrite tokens.json or DESIGN.md.',
  });

  // Append a lightweight decision note (does not copy inspiration payload)
  const decisions = path.join(pdir, 'decisions.md');
  if (exists(decisions)) {
    const day = nowIso().slice(0, 10);
    fs.appendFileSync(
      decisions,
      `\n\n### ${day} — Linked inspiration ${id}\n\n` +
        `- **Decision**: Recorded inspiration reference (status: reference-only)\n` +
        `- **Why**: \`vibe-to-ui inspiration link ${id} --profile ${profileId}\`\n` +
        `- **Affects**: inspiration-refs.json (no copy of captures/analysis into profile)\n` +
        `- **Confidence**: n/a (lifecycle)\n` +
        `- **Source**: cli\n`,
      'utf8'
    );
  }

  console.log(`Linked inspiration ${id} → profile ${profileId}`);
  console.log(`ref file: ${path.join(pdir, 'inspiration-refs.json')}`);
  console.log(`status: ${entry.status}`);
  console.log('No inspiration files were copied into the profile.');
}

function extractSeedSections(seedMd) {
  // Return the seed body suitable for merging into DESIGN.md (strip apply gate bash if desired)
  return seedMd.trim() + '\n';
}

function buildDesignMdMergePreview(projectPath, seedBody, inspirationId) {
  const designPath = path.join(projectPath, 'DESIGN.md');
  const existsDesign = exists(designPath);
  const markerStart = `<!-- vibe-to-ui:inspiration-seed:${inspirationId} -->`;
  const markerEnd = `<!-- /vibe-to-ui:inspiration-seed:${inspirationId} -->`;
  const block = `${markerStart}\n${seedBody.trim()}\n${markerEnd}\n`;

  let next;
  if (!existsDesign) {
    next = `# DESIGN.md\n\n> Seeded from Inspiration Library (\`${inspirationId}\`). Review before treating as project canon.\n\n${block}`;
  } else {
    const current = readText(designPath);
    const start = current.indexOf(markerStart);
    if (start !== -1) {
      const end = current.indexOf(markerEnd, start);
      if (end !== -1) {
        const after = current.slice(end + markerEnd.length).replace(/^\n/, '');
        next = `${current.slice(0, start)}${block}${after}`;
      } else {
        next = `${current.trimEnd()}\n\n## Inspiration seed (${inspirationId})\n\n${block}`;
      }
    } else {
      next = `${current.trimEnd()}\n\n## Inspiration seed (${inspirationId})\n\n${block}`;
    }
  }
  return { designPath, existsDesign, next, block };
}

function cmdApply(root, opts) {
  if (!opts.id) throw new Error('apply requires <id>');
  if (!opts.project) throw new Error('apply requires --project <path>');
  const id = normalizeSlug(opts.id, 'inspiration id');
  const paths = inspirationPaths(root, id);
  if (!exists(paths.designSeed)) {
    throw new Error(`design-seed.md missing for ${id}`);
  }
  const projectPath = path.resolve(opts.project);
  if (!exists(projectPath) || !fs.statSync(projectPath).isDirectory()) {
    throw new Error(`Project path is not a directory: ${projectPath}`);
  }

  const seedBody = extractSeedSections(readText(paths.designSeed));
  const preview = buildDesignMdMergePreview(projectPath, seedBody, id);

  console.log(`Apply preview for inspiration ${id}`);
  console.log(`project: ${projectPath}`);
  console.log(`target: ${preview.designPath} (${preview.existsDesign ? 'update' : 'create'})`);
  console.log('');
  console.log('--- proposed DESIGN.md write (excerpt) ---');
  const lines = preview.next.split('\n');
  const excerpt = lines.length > 80 ? `${lines.slice(0, 80).join('\n')}\n… (${lines.length - 80} more lines)` : preview.next;
  console.log(excerpt);
  console.log('--- end preview ---');
  console.log('');

  if (!opts.confirm) {
    console.log('No files written. Re-run with --confirm after review to write DESIGN.md.');
    console.log(`Example: vibe-to-ui inspiration apply ${id} --project ${projectPath} --confirm`);
    return;
  }

  writeText(preview.designPath, preview.next);
  console.log(`Wrote ${preview.designPath}`);
}

function cmdRebuildPreview(root, opts) {
  if (!opts.id) throw new Error('rebuild-preview requires <id>');
  const id = normalizeSlug(opts.id, 'inspiration id');
  const paths = inspirationPaths(root, id);
  if (!exists(paths.metadata)) {
    throw new Error(`Inspiration not found: ${id}`);
  }
  const meta = readJson(paths.metadata);
  const frames = framesFromDir(paths.captures);
  meta.frames = frames.map((f) => f.file);
  if (frames.length && meta.captureStatus === 'awaiting-agent') {
    meta.captureStatus = 'agent-provided';
  }
  meta.updatedAt = nowIso();

  const { theme, profileId } = resolveTheme(root, opts.profile || meta.themeProfile);
  if (profileId) meta.themeProfile = profileId;

  let annotations;
  if (exists(paths.annotations)) {
    annotations = readJson(paths.annotations);
    // Refresh frame file paths; keep existing annotation bodies
    const byId = new Map((annotations.frames || []).map((f) => [f.id, f]));
    annotations.frames = frames.map((f) => {
      const fid = f.file.replace(/\.[^.]+$/, '');
      const prev = byId.get(fid);
      return {
        id: fid,
        file: `captures/${f.file}`,
        label: f.label,
        annotations: prev ? prev.annotations || [] : [],
      };
    });
  } else {
    annotations = buildAnnotations({ id, meta, frames, themeProfile: profileId });
    writeJson(paths.annotations, annotations);
  }

  const preview = buildPreviewHtml({ id, meta, annotations, theme });
  writeText(paths.preview, preview);
  writeJson(paths.metadata, meta);
  console.log(`Rebuilt preview: ${paths.preview}`);
  console.log(`captures: ${frames.length ? frames.map((f) => f.file).join(', ') : '(none)'}`);
}

function cmdImportCaptures(root, opts) {
  if (!opts.id) throw new Error('import-captures requires <id>');
  if (!opts.fromCaptures) throw new Error('import-captures requires --from-captures <dir>');
  const id = normalizeSlug(opts.id, 'inspiration id');
  const paths = inspirationPaths(root, id);
  if (!exists(paths.dir)) throw new Error(`Inspiration not found: ${id}`);

  const cap = importCaptures(opts.fromCaptures, paths.captures);
  const meta = exists(paths.metadata) ? readJson(paths.metadata) : { id };
  meta.frames = cap.frames.map((f) => f.file);
  meta.captureStatus = cap.captureStatus;
  meta.updatedAt = nowIso();
  writeJson(paths.metadata, meta);

  cmdRebuildPreview(root, { id, profile: opts.profile });
  console.log(`Imported captures into ${paths.captures}`);
}

async function main(argv = process.argv) {
  try {
    const opts = parseArgs(argv);
    if (opts.help) {
      printHelp();
      return;
    }
    const root = resolveHomeRoot();

    switch (opts.cmd) {
      case 'add':
        await cmdAdd(root, opts);
        break;
      case 'list':
        cmdList(root);
        break;
      case 'show':
        if (!opts.id) throw new Error('show requires <id>');
        cmdShow(root, opts.id);
        break;
      case 'link':
        cmdLink(root, opts);
        break;
      case 'apply':
        cmdApply(root, opts);
        break;
      case 'rebuild-preview':
        cmdRebuildPreview(root, opts);
        break;
      case 'import-captures':
        cmdImportCaptures(root, opts);
        break;
      default:
        throw new Error(`Unknown inspiration command "${opts.cmd}". See --help.`);
    }
  } catch (err) {
    console.error(`error: ${err.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  main,
  parseArgs,
  buildDesignMdMergePreview,
};

if (require.main === module) {
  main();
}
