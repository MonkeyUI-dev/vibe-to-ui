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
const {
  productSlugFromUrl,
  pageSlugFromUrl,
  imageSlugFromPath,
  parseInspirationRef,
  nextVersionSlug,
} = require('./inspiration/id');
const {
  productPaths,
  pagePaths,
  isProductDir,
  listInspirations,
  listPageSlugs,
  loadProductMetadata,
  loadPageMetadata,
  findBySource,
  ensureProductScaffold,
  syncProductPageIndex,
  upsertInspirationRef,
} = require('./inspiration/store');
const { inspectUrl } = require('./inspiration/fetch');
const {
  prepareUrlCaptures,
  captureImage,
  importCaptures,
  framesFromDir,
  coverageFromFrames,
} = require('./inspiration/capture');
const {
  buildSourceMd,
  buildMotionMd,
  buildAnnotations,
  buildSynthesisScaffold,
  buildAnalysisMd,
  buildDesignSeedMd,
  buildProductMd,
  buildProductDesignSeedMd,
} = require('./inspiration/analyze');
const { buildPreviewHtml, buildProductPreviewHtml, syncFrameAnnotations } = require('./inspiration/preview');
const { DEFAULT_THEME, themeFromProfileTokens } = require('./inspiration/theme');

function printHelp() {
  console.log(`vibe-to-ui inspiration — Design Inspiration Library (product → pages)

Usage:
  vibe-to-ui inspiration add <url> [--product <id>] [--page <slug>] [--from-captures <dir>] [--profile <id>] [--refresh|--force|--as-new]
  vibe-to-ui inspiration add --image <path> [--product <id>] [--page <slug>] …
  vibe-to-ui inspiration list
  vibe-to-ui inspiration show <product>[/<page>]
  vibe-to-ui inspiration link <product> --profile <profile-id> [--rules <r1,r2>]
  vibe-to-ui inspiration apply <product> [--page <slug>] --project <path> [--confirm]
  vibe-to-ui inspiration rebuild-preview <product>[/<page>] [--profile <id>]
  vibe-to-ui inspiration rebuild-product <product> [--profile <id>]
  vibe-to-ui inspiration import-captures <product>/<page> --from-captures <dir> [--profile <id>]

Layout:
  ~/.vibe-to-ui/inspirations/<product>/
    product.md  design-seed.md  preview.html  metadata.json
    pages/<page>/captures|analysis|motion|preview…

Notes:
  - Default apply target is the **product** design-seed (cross-page). Use --page for a single page.
  - URL screenshots are agent-owned. Every URL page needs **full-scroll** coverage.
  - Explore → Preview → Apply: apply writes DESIGN.md only with --confirm.
`);
}

function parseArgs(argv) {
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
    product: null,
    page: null,
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
    } else if (a === '--product') {
      opts.product = args[++i];
      if (!opts.product) throw new Error('--product requires a value');
    } else if (a === '--page') {
      opts.page = args[++i];
      if (!opts.page) throw new Error('--page requires a value');
    } else if (a === '--id') {
      // Back-compat: --id product or product/page
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
  if (
    ['show', 'link', 'apply', 'rebuild-preview', 'rebuild-product', 'import-captures'].includes(cmd) &&
    opts.positional[0]
  ) {
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

function collectPageSummaries(root, productId) {
  return listPageSlugs(root, productId).map((slug) => {
    const meta = loadPageMetadata(root, productId, slug) || {};
    return {
      slug,
      title: meta.title || slug,
      pageType: meta.pageType || 'other',
      captureCoverage: meta.captureCoverage || meta.captureStatus || 'unknown',
      captureStatus: meta.captureStatus,
      sourceUrl: meta.sourceUrl || meta.sourcePath || '',
    };
  });
}

function writeProductArtifacts(root, productId, { theme, profileId } = {}) {
  const paths = productPaths(root, productId);
  const meta = syncProductPageIndex(root, productId);
  if (profileId) meta.themeProfile = profileId;
  const pages = collectPageSummaries(root, productId);
  const productMd = buildProductMd({ productId, meta, pages });
  const seed = buildProductDesignSeedMd({ productId, meta, pages });
  const preview = buildProductPreviewHtml({
    productId,
    meta,
    pages,
    theme: theme || DEFAULT_THEME,
  });
  writeText(paths.product, productMd);
  writeText(paths.designSeed, seed);
  writeText(paths.preview, preview);
  writeJson(paths.metadata, meta);
  return { paths, meta, pages };
}

function resolveAddTarget(root, opts) {
  let productId;
  let pageSlug;

  if (opts.id && !opts.product && !opts.page) {
    const ref = parseInspirationRef(opts.id);
    productId = ref.product;
    pageSlug = ref.page;
  }

  if (opts.product) productId = normalizeSlug(opts.product, 'product id');
  if (opts.page) pageSlug = normalizeSlug(opts.page, 'page slug');

  if (!productId) {
    if (opts.url) productId = productSlugFromUrl(opts.url);
    else if (opts.image) productId = imageSlugFromPath(opts.image);
    else throw new Error('Cannot resolve product id');
  }

  if (!pageSlug) {
    if (opts.url) pageSlug = pageSlugFromUrl(opts.url);
    else if (opts.image) pageSlug = imageSlugFromPath(opts.image);
    else pageSlug = 'home';
  }

  const paths = pagePaths(root, productId, pageSlug);
  const pageExists = exists(paths.dir);

  const matches = findBySource(root, { url: opts.url, imagePath: opts.image });
  const sameSource = matches.filter((m) => m.product === productId);

  if (sameSource.length && !opts.refresh && !opts.force && !opts.asNew) {
    const ids = sameSource.map((m) => m.id).join(', ');
    throw new Error(
      `Source already collected as: ${ids}\n` +
        `Reuse it, or pass --refresh (overwrite), --force, or --as-new (versioned page slug).`
    );
  }

  if (opts.asNew && pageExists) {
    let next = pageSlug;
    while (exists(pagePaths(root, productId, next).dir)) next = nextVersionSlug(next);
    pageSlug = next;
  } else if (pageExists && !opts.refresh && !opts.force && !opts.asNew) {
    // Allow adding different URL under same page slug only with refresh
    const existing = loadPageMetadata(root, productId, pageSlug);
    if (existing && opts.url && existing.sourceUrl && existing.sourceUrl !== opts.url) {
      throw new Error(
        `Page ${productId}/${pageSlug} already exists for ${existing.sourceUrl}\n` +
          `Pass --refresh to overwrite, --as-new for a versioned page, or --page <other-slug>.`
      );
    }
    if (existing && (!opts.url || existing.sourceUrl === opts.url)) {
      throw new Error(
        `Page already exists: ${productId}/${pageSlug}\n` +
          `Pass --refresh/--force to overwrite, or --as-new for a versioned page.`
      );
    }
  }

  if ((opts.refresh || opts.force) && sameSource.length) {
    productId = sameSource[0].product;
    pageSlug = sameSource[0].page;
  }

  return { productId, pageSlug };
}

async function cmdAdd(root, opts) {
  if (!opts.url && !opts.image) {
    throw new Error('add requires a <url> or --image <path>');
  }
  if (opts.url && opts.image) {
    throw new Error('add accepts either a url or --image, not both');
  }

  assertWritableDir(root);
  const { productId, pageSlug } = resolveAddTarget(root, opts);
  const ref = `${productId}/${pageSlug}`;
  const paths = pagePaths(root, productId, pageSlug);
  fs.mkdirSync(paths.captures, { recursive: true });

  let primaryHost = '';
  if (opts.url) {
    try {
      primaryHost = new URL(opts.url).hostname.replace(/^www\./, '');
    } catch {
      /* ignore */
    }
  }

  ensureProductScaffold(root, productId, {
    title: productId,
    primaryHost,
  });

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
    let captureCoverage = 'awaiting-agent';
    if (opts.fromCaptures) {
      const cap = importCaptures(opts.fromCaptures, paths.captures);
      notes.push(...cap.notes);
      frames = cap.frames;
      captureStatus = cap.captureStatus;
      captureCoverage = cap.captureCoverage;
    } else {
      const cap = prepareUrlCaptures(paths.captures, {
        url: inspected.finalUrl || opts.url,
        pageRef: ref,
      });
      notes.push(...cap.notes);
      frames = cap.frames;
      captureStatus = cap.captureStatus;
      captureCoverage = cap.captureCoverage;
    }

    meta = {
      kind: 'page',
      id: ref,
      productId,
      pageSlug,
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
      captureCoverage,
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
      kind: 'page',
      id: ref,
      productId,
      pageSlug,
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
      captureCoverage: 'image-only',
      analysisStatus: 'scaffold',
      analysisScope: 'single-image',
      themeProfile: profileId,
      frames: frames.map((f) => f.file),
    };
  }

  const annotations = buildAnnotations({ id: ref, meta, frames, themeProfile: profileId });
  const analysis = buildAnalysisMd({ id: ref, meta, annotations, notes });
  const seed = buildDesignSeedMd({ id: ref, meta, annotations });
  const sourceMd = buildSourceMd({ id: ref, meta, notes });
  const motionMd = buildMotionMd({ id: ref, meta });
  const preview = buildPreviewHtml({ id: ref, meta, annotations, theme });

  writeJson(paths.metadata, meta);
  writeText(paths.source, sourceMd);
  writeJson(paths.annotations, annotations);
  writeText(paths.analysis, analysis);
  writeText(paths.designSeed, seed);
  writeText(paths.motion, motionMd);
  writeText(paths.preview, preview);

  const product = writeProductArtifacts(root, productId, { theme, profileId });

  console.log(`Inspiration page saved: ${ref}`);
  console.log(`product: ${productId}`);
  console.log(`page path: ${paths.dir}`);
  console.log(`page preview: ${paths.preview}`);
  console.log(`product preview: ${product.paths.preview}`);
  console.log(`pageType: ${meta.pageType} (${meta.pageTypeConfidence})`);
  console.log(`captureCoverage: ${meta.captureCoverage}`);
  console.log(`captures: ${frames.length ? frames.map((f) => f.file).join(', ') : '(awaiting agent full-scroll)'}`);
  if (notes.length) {
    console.log('notes:');
    for (const n of notes) console.log(`  - ${n}`);
  }
  console.log('');
  if (meta.captureStatus === 'awaiting-agent') {
    console.log('Next (agent): Browser Use / Computer Use → full-scroll captures:');
    console.log('  fullpage.jpg + frame-01.jpg, frame-02.jpg, … through page end');
    console.log(`  into ${paths.captures}`);
    console.log('  + short motion pass → motion.md');
    console.log(`then: vibe-to-ui inspiration rebuild-preview ${ref}`);
    console.log(`then: vibe-to-ui inspiration rebuild-product ${productId}`);
  } else {
    console.log('Next: enrich analysis / annotations / motion from captures,');
    console.log(`then: vibe-to-ui inspiration rebuild-product ${productId}`);
    console.log(`apply (product seed): vibe-to-ui inspiration apply ${productId} --project <path>`);
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
    console.log(`- ${it.id}  (product)`);
    console.log(`    title: ${it.title}`);
    console.log(`    host: ${it.source || '—'}`);
    console.log(`    pages: ${(it.pages || []).join(', ') || '(none)'}`);
    console.log(`    date: ${it.date || '—'}`);
    console.log(`    pageType mix: ${it.pageType}`);
    console.log(`    keywords: ${kw}`);
  }
}

function cmdShow(root, idRaw) {
  const ref = parseInspirationRef(idRaw);
  if (!ref.page) {
    const paths = productPaths(root, ref.product);
    if (!exists(paths.dir) || !isProductDir(root, ref.product)) {
      throw new Error(`Product not found: ${ref.product}\nExpected: ${paths.dir}`);
    }
    const meta = loadProductMetadata(root, ref.product) || { id: ref.product };
    const pages = collectPageSummaries(root, ref.product);
    console.log(`product: ${ref.product}`);
    console.log(`title: ${meta.title || ref.product}`);
    console.log(`host: ${meta.primaryHost || '—'}`);
    console.log(`pageType mix: ${meta.primaryPageType || 'mixed'}`);
    console.log(`pages: ${pages.map((p) => p.slug).join(', ') || '(none)'}`);
    console.log(`path: ${paths.dir}`);
    console.log(`preview: ${paths.preview}`);
    console.log(`design-seed: ${paths.designSeed}`);
    console.log('');
    for (const p of pages) {
      console.log(`  · ${p.slug}  [${p.pageType}]  coverage=${p.captureCoverage}  ${p.title}`);
    }
    if (exists(paths.product)) {
      console.log('');
      console.log('--- product.md excerpt ---');
      console.log(readText(paths.product).split('\n').slice(0, 35).join('\n'));
    }
    return;
  }

  const paths = pagePaths(root, ref.product, ref.page);
  if (!exists(paths.dir)) {
    throw new Error(`Page not found: ${ref.product}/${ref.page}\nExpected: ${paths.dir}`);
  }
  const meta = loadPageMetadata(root, ref.product, ref.page) || {};
  console.log(`page: ${ref.product}/${ref.page}`);
  console.log(`title: ${meta.title || ref.page}`);
  console.log(`source: ${meta.sourceUrl || meta.sourcePath || '—'}`);
  console.log(`pageType: ${meta.pageType || 'other'}`);
  console.log(`captureCoverage: ${meta.captureCoverage || meta.captureStatus || '—'}`);
  console.log(`path: ${paths.dir}`);
  console.log(`preview: ${paths.preview}`);
  if (exists(paths.analysis)) {
    console.log('');
    console.log('--- analysis excerpt ---');
    console.log(readText(paths.analysis).split('\n').slice(0, 40).join('\n'));
  }
}

function cmdLink(root, opts) {
  if (!opts.id) throw new Error('link requires <product>');
  if (!opts.profile) throw new Error('link requires --profile <profile-id>');

  const ref = parseInspirationRef(opts.id);
  if (ref.page) {
    console.error('warning: link targets the product; ignoring page segment');
  }
  const productId = ref.product;

  const profileId = normalizeSlug(opts.profile, 'profile id');
  const paths = productPaths(root, productId);

  if (!exists(paths.dir) || !isProductDir(root, productId)) {
    throw new Error(`Inspiration product not found: ${productId}`);
  }
  const pdir = profileDir(root, profileId);
  if (!exists(pdir)) {
    throw new Error(
      `Profile not found: ${profileId}\n` +
        `Create it with: vibe-to-ui context --profile ${profileId} --init`
    );
  }

  let transferableRules = opts.rules;
  if (!transferableRules.length) {
    // Prefer product seed prose; fall back to first page annotations
    const pageSlugs = isProductDir(root, productId) ? listPageSlugs(root, productId) : [];
    for (const slug of pageSlugs) {
      const annPath = pagePaths(root, productId, slug).annotations;
      if (!exists(annPath)) continue;
      try {
        const ann = readJson(annPath);
        transferableRules = (ann.transferableRules || [])
          .filter((r) => (r.kinds || []).includes('transferable'))
          .map((r) => r.rule);
        if (transferableRules.length) break;
      } catch {
        /* ignore */
      }
    }
  }

  const entry = upsertInspirationRef(pdir, {
    inspirationId: productId,
    status: 'reference-only',
    transferableRules,
    notes: 'Linked product as reference-only. Does not rewrite tokens.json or DESIGN.md.',
  });

  const decisions = path.join(pdir, 'decisions.md');
  if (exists(decisions)) {
    const day = nowIso().slice(0, 10);
    fs.appendFileSync(
      decisions,
      `\n\n### ${day} — Linked inspiration product ${productId}\n\n` +
        `- **Decision**: Recorded inspiration reference (status: reference-only)\n` +
        `- **Why**: \`vibe-to-ui inspiration link ${productId} --profile ${profileId}\`\n` +
        `- **Affects**: inspiration-refs.json (no copy of captures/analysis into profile)\n` +
        `- **Confidence**: n/a (lifecycle)\n` +
        `- **Source**: cli\n`,
      'utf8'
    );
  }

  console.log(`Linked inspiration product ${productId} → profile ${profileId}`);
  console.log(`ref file: ${path.join(pdir, 'inspiration-refs.json')}`);
  console.log(`status: ${entry.status}`);
  console.log('No inspiration files were copied into the profile.');
}

function extractSeedSections(seedMd) {
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
  if (!opts.id) throw new Error('apply requires <product>');
  if (!opts.project) throw new Error('apply requires --project <path>');

  const ref = parseInspirationRef(opts.id);
  const productId = ref.product;
  const pageSlug = opts.page ? normalizeSlug(opts.page, 'page slug') : ref.page;

  let seedPath;
  let applyId;
  if (pageSlug) {
    applyId = `${productId}/${pageSlug}`;
    seedPath = pagePaths(root, productId, pageSlug).designSeed;
  } else {
    applyId = productId;
    seedPath = productPaths(root, productId).designSeed;
  }

  if (!exists(seedPath)) {
    throw new Error(`design-seed.md missing for ${applyId}\nExpected: ${seedPath}`);
  }

  const projectPath = path.resolve(opts.project);
  if (!exists(projectPath) || !fs.statSync(projectPath).isDirectory()) {
    throw new Error(`Project path is not a directory: ${projectPath}`);
  }

  const seedBody = extractSeedSections(readText(seedPath));
  const preview = buildDesignMdMergePreview(projectPath, seedBody, applyId);

  console.log(`Apply preview for inspiration ${applyId}`);
  console.log(`project: ${projectPath}`);
  console.log(`target: ${preview.designPath} (${preview.existsDesign ? 'update' : 'create'})`);
  console.log('');
  console.log('--- proposed DESIGN.md write (excerpt) ---');
  const lines = preview.next.split('\n');
  const excerpt =
    lines.length > 80 ? `${lines.slice(0, 80).join('\n')}\n… (${lines.length - 80} more lines)` : preview.next;
  console.log(excerpt);
  console.log('--- end preview ---');
  console.log('');

  if (!opts.confirm) {
    console.log('No files written. Re-run with --confirm after review to write DESIGN.md.');
    console.log(`Example: vibe-to-ui inspiration apply ${applyId.split('/')[0]} --project ${projectPath} --confirm`);
    return;
  }

  writeText(preview.designPath, preview.next);
  console.log(`Wrote ${preview.designPath}`);
}

function cmdRebuildPreview(root, opts) {
  if (!opts.id) throw new Error('rebuild-preview requires <product>/<page> (or <product> to rebuild product index)');

  const ref = parseInspirationRef(opts.id);
  if (!ref.page) {
    return cmdRebuildProduct(root, opts);
  }

  const paths = pagePaths(root, ref.product, ref.page);
  if (!exists(paths.metadata)) {
    throw new Error(`Page not found: ${ref.product}/${ref.page}`);
  }
  const meta = readJson(paths.metadata);
  const frames = framesFromDir(paths.captures);
  meta.frames = frames.map((f) => f.file);
  meta.captureCoverage = coverageFromFrames(frames);
  if (frames.length && meta.captureStatus === 'awaiting-agent') {
    meta.captureStatus = meta.captureCoverage === 'full-scroll' ? 'agent-provided' : 'partial';
  } else if (meta.captureCoverage === 'full-scroll') {
    meta.captureStatus = 'agent-provided';
  } else if (frames.length && meta.captureStatus !== 'image-only') {
    meta.captureStatus = 'partial';
  }
  meta.updatedAt = nowIso();

  const { theme, profileId } = resolveTheme(root, opts.profile || meta.themeProfile);
  if (profileId) meta.themeProfile = profileId;

  const refId = `${ref.product}/${ref.page}`;
  let annotations;
  if (exists(paths.annotations)) {
    annotations = readJson(paths.annotations);
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
    syncFrameAnnotations(annotations);
    if (!annotations.synthesis) {
      annotations.synthesis = buildSynthesisScaffold({ meta });
    }
    writeJson(paths.annotations, annotations);
  } else {
    annotations = buildAnnotations({ id: refId, meta, frames, themeProfile: profileId });
    writeJson(paths.annotations, annotations);
  }

  if (!exists(paths.motion)) {
    writeText(paths.motion, buildMotionMd({ id: refId, meta }));
  }

  const preview = buildPreviewHtml({ id: refId, meta, annotations, theme });
  writeText(paths.preview, preview);
  writeJson(paths.metadata, meta);

  writeProductArtifacts(root, ref.product, { theme, profileId });

  console.log(`Rebuilt page preview: ${paths.preview}`);
  console.log(`captureCoverage: ${meta.captureCoverage}`);
  console.log(`captures: ${frames.length ? frames.map((f) => f.file).join(', ') : '(none)'}`);
}

function cmdRebuildProduct(root, opts) {
  const raw = opts.id || opts.product;
  if (!raw) throw new Error('rebuild-product requires <product>');
  const ref = parseInspirationRef(raw);
  const productId = ref.product;
  if (!isProductDir(root, productId)) {
    throw new Error(`Product not found: ${productId}`);
  }
  const { theme, profileId } = resolveTheme(root, opts.profile);
  const { paths, pages } = writeProductArtifacts(root, productId, { theme, profileId });
  console.log(`Rebuilt product artifacts: ${productId}`);
  console.log(`product.md: ${paths.product}`);
  console.log(`design-seed: ${paths.designSeed}`);
  console.log(`preview: ${paths.preview}`);
  console.log(`pages: ${pages.map((p) => p.slug).join(', ') || '(none)'}`);
}

function cmdImportCaptures(root, opts) {
  if (!opts.id) throw new Error('import-captures requires <product>/<page>');
  if (!opts.fromCaptures) throw new Error('import-captures requires --from-captures <dir>');

  const ref = parseInspirationRef(opts.id);
  if (!ref.page) {
    throw new Error('import-captures requires <product>/<page> (captures belong to a page)');
  }
  const paths = pagePaths(root, ref.product, ref.page);
  if (!exists(paths.dir)) throw new Error(`Page not found: ${ref.product}/${ref.page}`);

  const cap = importCaptures(opts.fromCaptures, paths.captures);
  const meta = exists(paths.metadata) ? readJson(paths.metadata) : { id: `${ref.product}/${ref.page}` };
  meta.frames = cap.frames.map((f) => f.file);
  meta.captureStatus = cap.captureStatus;
  meta.captureCoverage = cap.captureCoverage;
  meta.updatedAt = nowIso();
  writeJson(paths.metadata, meta);

  cmdRebuildPreview(root, { id: `${ref.product}/${ref.page}`, profile: opts.profile });
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
        if (!opts.id) throw new Error('show requires <product>[/<page>]');
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
      case 'rebuild-product':
        cmdRebuildProduct(root, opts);
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
