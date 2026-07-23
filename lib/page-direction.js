'use strict';

const fs = require('fs');
const path = require('path');
const {
  resolveHomeRoot,
  assertWritableDir,
  normalizeSlug,
  nowIso,
  todayStamp,
  packageRoot,
  readText,
  writeText,
  exists,
} = require('./home');

const SEEDS = ['session.md', 'decisions.md', 'memory.md'];

function pageDirectionsDir(root) {
  return path.join(root, 'page-directions');
}

function slugDir(root, slug) {
  return path.join(pageDirectionsDir(root), slug);
}

function seedDir() {
  return path.join(packageRoot(), 'assets', 'page-direction');
}

function copySeed(name, dest, slug) {
  if (exists(dest)) return { copied: false };
  const src = path.join(seedDir(), name);
  if (!exists(src)) throw new Error(`Missing seed: ${src}`);
  let body = readText(src).replaceAll('[slug]', slug);
  body = body.replace(/YYYY-MM-DD/g, todayStamp());
  writeText(dest, body);
  return { copied: true };
}

function listSlugs(root) {
  const dir = pageDirectionsDir(root);
  if (!exists(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();
}

function printHelp() {
  console.log(`vibe-to-ui page-direction — Page Direction + Inspiration Memory

Usage:
  vibe-to-ui page-direction init --slug <project-slug>
  vibe-to-ui page-direction list
  vibe-to-ui page-direction show <slug>
  vibe-to-ui page-direction search <query>
  vibe-to-ui page-direction record <slug> --choice <A|B|C|mix|reject>
      [--keep A,B] [--reject C] [--reason "..."] [--inspirations id1,id2]

Notes:
  - Memory lives under ~/.vibe-to-ui/page-directions/<slug>/
  - search = simple case-insensitive substring over inspirations + page-direction files
  - Does not call Motion Engine; does not modify project DESIGN.md (agent writes that)
`);
}

function parseArgs(argv) {
  const args = argv[2] === 'page-direction' ? argv.slice(3) : argv.slice(2);
  if (!args.length || args[0] === '-h' || args[0] === '--help') {
    return { help: true };
  }
  const cmd = args[0];
  const opts = {
    help: false,
    cmd,
    slug: null,
    query: null,
    choice: null,
    keep: [],
    reject: [],
    reason: '',
    inspirations: [],
    positional: [],
  };
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--slug') {
      opts.slug = args[++i];
      if (!opts.slug) throw new Error('--slug requires a value');
    } else if (a === '--choice') {
      opts.choice = args[++i];
      if (!opts.choice) throw new Error('--choice requires a value');
    } else if (a === '--keep') {
      opts.keep = String(args[++i] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === '--reject') {
      opts.reject = String(args[++i] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === '--reason') {
      opts.reason = args[++i] || '';
    } else if (a === '--inspirations') {
      opts.inspirations = String(args[++i] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a.startsWith('-')) throw new Error(`Unknown argument: ${a}`);
    else opts.positional.push(a);
  }

  if (cmd === 'init' && !opts.slug && opts.positional[0]) opts.slug = opts.positional[0];
  if (['show', 'record'].includes(cmd) && !opts.slug && opts.positional[0]) {
    opts.slug = opts.positional[0];
  }
  if (cmd === 'search') {
    opts.query = opts.positional.join(' ').trim();
  }
  return opts;
}

function cmdInit(root, slugRaw) {
  assertWritableDir(root);
  const slug = normalizeSlug(slugRaw, 'project slug');
  const dir = slugDir(root, slug);
  fs.mkdirSync(dir, { recursive: true });
  const results = SEEDS.map((s) => ({ seed: s, ...copySeed(s, path.join(dir, s), slug) }));
  const copied = results.filter((r) => r.copied).map((r) => r.seed);
  const kept = results.filter((r) => !r.copied).map((r) => r.seed);
  console.log(`Page Direction memory: ${slug}`);
  console.log(`path: ${dir}`);
  if (copied.length) console.log(`copied seeds: ${copied.join(', ')}`);
  if (kept.length) console.log(`left unchanged: ${kept.join(', ')}`);
}

function cmdList(root) {
  const slugs = listSlugs(root);
  if (!slugs.length) {
    console.log(`No page-direction memories under ${pageDirectionsDir(root)}`);
    console.log('Create one with: vibe-to-ui page-direction init --slug <project-slug>');
    return;
  }
  console.log(`Page Direction root: ${pageDirectionsDir(root)}`);
  console.log('');
  for (const slug of slugs) {
    const mem = path.join(slugDir(root, slug), 'memory.md');
    let active = '—';
    if (exists(mem)) {
      const m = readText(mem).match(/\*\*Active direction\*\*:\s*(.*)/);
      if (m) active = m[1].trim() || '—';
    }
    console.log(`- ${slug}`);
    console.log(`    path: ${slugDir(root, slug)}`);
    console.log(`    active: ${active}`);
  }
}

function cmdShow(root, slugRaw) {
  const slug = normalizeSlug(slugRaw, 'project slug');
  const dir = slugDir(root, slug);
  if (!exists(dir)) {
    throw new Error(`Page Direction memory not found: ${slug}\nExpected: ${dir}`);
  }
  console.log(`slug: ${slug}`);
  console.log(`path: ${dir}`);
  for (const f of SEEDS) {
    const p = path.join(dir, f);
    console.log('');
    console.log(`--- ${f} ---`);
    if (exists(p)) console.log(readText(p).trimEnd());
    else console.log('(missing)');
  }
}

function walkFiles(dir, acc = []) {
  if (!exists(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.')) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(full, acc);
    else if (/\.(md|json|txt)$/i.test(ent.name)) acc.push(full);
  }
  return acc;
}

function cmdSearch(root, query) {
  if (!query) throw new Error('search requires a query string');
  const q = query.toLowerCase();
  const hits = [];

  const inspRoot = path.join(root, 'inspirations');
  for (const file of walkFiles(inspRoot)) {
    let body = '';
    try {
      body = readText(file);
    } catch {
      continue;
    }
    if (body.toLowerCase().includes(q)) {
      const rel = path.relative(root, file);
      const id = rel.split(path.sep)[1] || rel;
      hits.push({ kind: 'inspiration', id, file: rel });
    }
  }

  const pdRoot = pageDirectionsDir(root);
  for (const file of walkFiles(pdRoot)) {
    let body = '';
    try {
      body = readText(file);
    } catch {
      continue;
    }
    if (body.toLowerCase().includes(q)) {
      const rel = path.relative(root, file);
      const slug = rel.split(path.sep)[1] || rel;
      hits.push({ kind: 'page-direction', id: slug, file: rel });
    }
  }

  // Dedupe by file
  const seen = new Set();
  const unique = [];
  for (const h of hits) {
    if (seen.has(h.file)) continue;
    seen.add(h.file);
    unique.push(h);
  }

  if (!unique.length) {
    console.log(`No local hits for "${query}" under ${root}`);
    console.log('Tip: add inspirations with `vibe-to-ui inspiration add …` or init a page-direction slug.');
    return;
  }

  console.log(`Search "${query}" — ${unique.length} hit(s)`);
  console.log('');
  for (const h of unique) {
    console.log(`- [${h.kind}] ${h.id}`);
    console.log(`    ${h.file}`);
  }
}

function cmdRecord(root, opts) {
  if (!opts.slug) throw new Error('record requires <slug>');
  if (!opts.choice) throw new Error('record requires --choice <A|B|C|mix|reject>');
  const choice = String(opts.choice).trim();
  const allowed = ['a', 'b', 'c', 'mix', 'reject', 'A', 'B', 'C'];
  if (!allowed.includes(choice) && !/^mix:/i.test(choice)) {
    throw new Error('--choice must be A, B, C, mix, or reject');
  }

  assertWritableDir(root);
  const slug = normalizeSlug(opts.slug, 'project slug');
  const dir = slugDir(root, slug);
  if (!exists(dir)) {
    cmdInit(root, slug);
  }

  const day = todayStamp();
  const ts = nowIso();
  const entry = `

### ${day} — choice \`${choice}\`

- **When**: ${ts}
- **Choice**: ${choice}
- **Keep**: ${(opts.keep || []).join(', ') || '—'}
- **Reject**: ${(opts.reject || []).join(', ') || '—'}
- **Reason**: ${opts.reason || '(none provided)'}
- **Inspirations**: ${(opts.inspirations || []).join(', ') || '—'}
- **Source**: cli \`page-direction record\`
`;

  const decisionsPath = path.join(dir, 'decisions.md');
  if (!exists(decisionsPath)) copySeed('decisions.md', decisionsPath, slug);
  fs.appendFileSync(decisionsPath, entry, 'utf8');

  const memoryPath = path.join(dir, 'memory.md');
  if (!exists(memoryPath)) copySeed('memory.md', memoryPath, slug);
  let mem = readText(memoryPath);
  const active =
    /^reject$/i.test(choice) ? '(none — rejected)' : choice;
  const rejected = (opts.reject || []).join(', ') || (/^reject$/i.test(choice) ? 'A,B,C' : '');
  const insp = (opts.inspirations || []).join(', ');
  const reason = opts.reason || '';

  const setField = (body, label, value) => {
    const re = new RegExp(`(\\*\\*${label}\\*\\*:\\s*).*`);
    if (re.test(body)) return body.replace(re, `$1${value}`);
    return body;
  };

  mem = setField(mem, 'Active direction', active);
  mem = setField(mem, 'Rejected', rejected || '—');
  mem = setField(mem, 'Inspiration ids', insp || '—');
  mem = setField(mem, 'Last decision', `${choice}${reason ? ` — ${reason}` : ''}`);
  mem = setField(mem, 'Updated', day);
  writeText(memoryPath, mem);

  // Light session status bump
  const sessionPath = path.join(dir, 'session.md');
  if (exists(sessionPath)) {
    let sess = readText(sessionPath);
    const status = /^reject$/i.test(choice)
      ? 'rejected'
      : /^mix/i.test(choice)
        ? 'mixed'
        : 'selected';
    sess = sess.replace(/(\*\*Status\*\*:\s*).*/, `$1${status}`);
    sess = sess.replace(/(\*\*Updated\*\*:\s*).*/, `$1${day}`);
    writeText(sessionPath, sess);
  }

  console.log(`Recorded choice \`${choice}\` for ${slug}`);
  console.log(`decisions: ${decisionsPath}`);
  console.log(`memory: ${memoryPath}`);
  console.log('Agent: also mirror this into project DESIGN.md (Page Direction + Decisions Log).');
}

function main(argv = process.argv) {
  try {
    const opts = parseArgs(argv);
    if (opts.help) {
      printHelp();
      return;
    }
    const root = resolveHomeRoot();
    switch (opts.cmd) {
      case 'init':
        if (!opts.slug) throw new Error('init requires --slug <project-slug>');
        cmdInit(root, opts.slug);
        break;
      case 'list':
        cmdList(root);
        break;
      case 'show':
        if (!opts.slug) throw new Error('show requires <slug>');
        cmdShow(root, opts.slug);
        break;
      case 'search':
        cmdSearch(root, opts.query);
        break;
      case 'record':
        cmdRecord(root, opts);
        break;
      default:
        throw new Error(`Unknown page-direction command "${opts.cmd}". See --help.`);
    }
  } catch (err) {
    console.error(`error: ${err.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  main,
  pageDirectionsDir,
  listSlugs,
  cmdSearch,
};

if (require.main === module) {
  main();
}
