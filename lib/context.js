'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const SHARED_SEEDS = ['profile.md', 'brand.md', 'tokens.json', 'decisions.md'];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function packageRoot() {
  return path.resolve(__dirname, '..');
}

function seedDir() {
  return path.join(packageRoot(), 'assets', 'design-context');
}

function resolveHomeRoot() {
  if (process.env.VIBE_TO_UI_HOME && process.env.VIBE_TO_UI_HOME.trim()) {
    return path.resolve(process.env.VIBE_TO_UI_HOME.trim());
  }
  const home = os.homedir();
  if (!home) {
    throw new Error(
      'Cannot resolve home directory. Set VIBE_TO_UI_HOME to a writable path for Design Context profiles.'
    );
  }
  return path.join(home, '.vibe-to-ui');
}

function profilesDir(root) {
  return path.join(root, 'profiles');
}

function profileDir(root, profileId) {
  return path.join(profilesDir(root), profileId);
}

function assertWritableDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const probe = path.join(dir, `.write-check-${process.pid}`);
  try {
    fs.writeFileSync(probe, 'ok');
    fs.unlinkSync(probe);
  } catch (err) {
    throw new Error(
      `Design Context root is not writable: ${dir}\n` +
        `Fix permissions or set VIBE_TO_UI_HOME to a writable directory.\n` +
        `Detail: ${err.message}`
    );
  }
}

function normalizeSlug(value, label) {
  if (value == null || String(value).trim() === '') {
    throw new Error(`Missing ${label}. Use kebab-case (e.g. vibe-to-ui, print-brochure).`);
  }
  const raw = String(value).trim();
  const slug = raw
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Invalid ${label} "${raw}". Use lowercase letters, digits, and single hyphens.`);
  }
  return slug;
}

function nowIso() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, 'utf8');
}

function copySeedIfMissing(seedName, destPath, profileId) {
  if (fs.existsSync(destPath)) return { copied: false, path: destPath };
  const src = path.join(seedDir(), seedName);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing seed template: ${src}`);
  }
  let body = readText(src);
  if (seedName === 'profile.md') {
    const ts = nowIso();
    body = body
      .replaceAll('name: "<profile>"', `name: "${profileId}"`)
      .replaceAll('created_at: "YYYY-MM-DDTHH:MM:SSZ"', `created_at: "${ts}"`)
      .replaceAll('updated_at: "YYYY-MM-DDTHH:MM:SSZ"', `updated_at: "${ts}"`)
      .replace('<!-- kebab-case, same as directory name -->', profileId);
  } else {
    body = body.replaceAll('[profile]', profileId);
  }
  writeText(destPath, body);
  return { copied: true, path: destPath };
}

function listProfiles(root) {
  const dir = profilesDir(root);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();
}

function existingTargets(profilePath) {
  const targetsPath = path.join(profilePath, 'targets');
  if (!fs.existsSync(targetsPath)) return [];
  return fs
    .readdirSync(targetsPath)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -3))
    .sort();
}

function targetStub(mediumId) {
  const ts = nowIso().slice(0, 10);
  return `# Target: ${mediumId}

> Medium adaptation for Design Context. Generated stub — fill from brand master
> (\`brand.md\` + \`tokens.json\` + \`decisions.md\`) using the generic custom-medium
> guide in the vibe-to-ui skill (\`references/DESIGN-CONTEXT.md\`).
> Do not invent a second token system; adapt application rules only.

- **Slug**: \`${mediumId}\`
- **Created**: ${ts}
- **Status**: stub — needs agent/human fill from brand master

## Medium identity

- **Human name**:
- **Artifact this produces**:
- **One-liner**:

## Format constraints

- Size / aspect / page count / fold / duration / character limits / safe zones:

## Audience & context

- Where it is seen:
- Reading distance:

## Brand application

- Color:
- Type:
- Imagery:
- Motion (if any):

## Hierarchy budget

- Must appear:
- Must not crowd the first view:

## Production limits

- File formats / ink / crop / platform rules:

## Do / don't

- **Do**:
- **Don't**:

## Notes

<!-- Agent: replace this stub with medium-specific rules derived from the brand master. -->
`;
}

function updateProfileForTarget(profilePath, profileId, mediumId) {
  const profileFile = path.join(profilePath, 'profile.md');
  if (!fs.existsSync(profileFile)) return;
  let body = readText(profileFile);
  const ts = nowIso();
  const day = ts.slice(0, 10);

  body = body.replace(/updated_at:\s*"[^"]*"/, `updated_at: "${ts}"`);

  const targets = existingTargets(profilePath);
  if (!targets.includes(mediumId)) targets.push(mediumId);
  targets.sort();
  const listed = JSON.stringify(targets);
  if (/targets_available:\s*\[[^\]]*\]/.test(body)) {
    body = body.replace(/targets_available:\s*\[[^\]]*\]/, `targets_available: ${listed}`);
  }

  const row = `| ${mediumId} | created | ${day} |`;
  if (body.includes(`| ${mediumId} |`)) {
    body = body.replace(new RegExp(`\\|\\s*${mediumId}\\s*\\|[^|\\n]*\\|[^|\\n]*\\|`), row);
  } else if (body.includes('| <!-- e.g. web, social-cover, linkedin, print-brochure --> | not created | — |')) {
    body = body.replace(
      '| <!-- e.g. web, social-cover, linkedin, print-brochure --> | not created | — |',
      row
    );
  } else if (/\| Target \| Status \| Updated \|/.test(body)) {
    body = body.replace(
      /(\| Target \| Status \| Updated \|\n\|[-| ]+\|\n)/,
      `$1${row}\n`
    );
  }

  // Keep id placeholder filled
  body = body.replace('<!-- kebab-case, same as directory name -->', profileId);
  writeText(profileFile, body);
}

function appendDecision(profilePath, mediumId, created) {
  const decisionsFile = path.join(profilePath, 'decisions.md');
  if (!fs.existsSync(decisionsFile)) return;
  const day = nowIso().slice(0, 10);
  const entry = `

### ${day} — Target ${mediumId} ${created ? 'created' : 'requested'}

- **Decision**: ${created ? `Created stub targets/${mediumId}.md` : `Reused existing targets/${mediumId}.md`}
- **Why**: \`vibe-to-ui context --target ${mediumId}\`
- **Affects**: targets/${mediumId}.md
- **Confidence**: n/a (lifecycle)
- **Source**: cli
`;
  fs.appendFileSync(decisionsFile, entry, 'utf8');
}

function buildMergedContext(profilePath, profileId, mediumId) {
  const parts = [];
  const pushFile = (rel, title) => {
    const full = path.join(profilePath, rel);
    parts.push(`## ${title}`);
    parts.push('');
    if (fs.existsSync(full)) {
      parts.push(`<!-- source: ${rel} -->`);
      parts.push('');
      parts.push(readText(full).trimEnd());
    } else {
      parts.push(`_Missing ${rel}_`);
    }
    parts.push('');
  };

  parts.push(`# Design Context merge — profile \`${profileId}\` / target \`${mediumId}\``);
  parts.push('');
  parts.push(`- **Root**: \`${profilePath}\``);
  parts.push(`- **Generated**: ${nowIso()}`);
  parts.push('');
  pushFile('profile.md', '1. Profile metadata');
  pushFile('brand.md', '2. Brand master');
  pushFile('tokens.json', '3. Design tokens');
  pushFile('decisions.md', '4. Decisions');
  pushFile(path.join('targets', `${mediumId}.md`), `5. Target rules (\`${mediumId}\`)`);

  const assetsDir = path.join(profilePath, 'assets');
  parts.push('## 6. Asset pointers');
  parts.push('');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir).filter((n) => !n.startsWith('.') && n !== 'README.md');
    if (files.length === 0) {
      parts.push('_No files under assets/_');
    } else {
      for (const f of files.sort()) {
        parts.push(`- \`assets/${f}\``);
      }
    }
  } else {
    parts.push('_assets/ missing_');
  }
  parts.push('');
  return parts.join('\n');
}

function cmdList(root) {
  assertWritableDir(root);
  const profiles = listProfiles(root);
  if (profiles.length === 0) {
    console.log(`No profiles under ${profilesDir(root)}`);
    console.log('Create one with: vibe-to-ui context --profile <id> --init');
    return;
  }
  console.log(`Design Context root: ${root}`);
  console.log('');
  for (const id of profiles) {
    const p = profileDir(root, id);
    const targets = existingTargets(p);
    const targetNote = targets.length ? targets.join(', ') : '(none)';
    console.log(`- ${id}`);
    console.log(`    path: ${p}`);
    console.log(`    targets: ${targetNote}`);
  }
}

function cmdInit(root, profileRaw) {
  assertWritableDir(root);
  const profileId = normalizeSlug(profileRaw, 'profile id');
  const dir = profileDir(root, profileId);
  const existed = fs.existsSync(dir);

  fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'sources'), { recursive: true });
  // targets/ intentionally not created at init

  const results = [];
  for (const seed of SHARED_SEEDS) {
    results.push({ seed, ...copySeedIfMissing(seed, path.join(dir, seed), profileId) });
  }

  const copied = results.filter((r) => r.copied).map((r) => r.seed);
  const kept = results.filter((r) => !r.copied).map((r) => r.seed);

  console.log(existed ? `Profile already existed: ${profileId}` : `Initialized profile: ${profileId}`);
  console.log(`path: ${dir}`);
  if (copied.length) console.log(`copied seeds: ${copied.join(', ')}`);
  if (kept.length) console.log(`left unchanged: ${kept.join(', ')}`);
  console.log('targets/: not created (on demand via --target)');
  console.log('');
  console.log('Next: extract brand language into brand.md / tokens.json (agent),');
  console.log(`then: vibe-to-ui context --profile ${profileId} --target <medium>`);
}

function cmdTarget(root, profileRaw, mediumRaw) {
  assertWritableDir(root);
  const profileId = normalizeSlug(profileRaw, 'profile id');
  const mediumId = normalizeSlug(mediumRaw, 'target medium');
  const dir = profileDir(root, profileId);

  if (!fs.existsSync(dir)) {
    throw new Error(
      `Profile not found: ${profileId}\n` +
        `Expected: ${dir}\n` +
        `Create it with: vibe-to-ui context --profile ${profileId} --init`
    );
  }

  for (const required of ['brand.md', 'tokens.json']) {
    if (!fs.existsSync(path.join(dir, required))) {
      console.error(
        `warning: missing ${required} — merge will note the gap; run extraction or --init seeds`
      );
    }
  }

  const targetPath = path.join(dir, 'targets', `${mediumId}.md`);
  let created = false;
  if (!fs.existsSync(targetPath)) {
    writeText(targetPath, targetStub(mediumId));
    created = true;
  }

  updateProfileForTarget(dir, profileId, mediumId);
  appendDecision(dir, mediumId, created);

  console.error(
    created
      ? `Created stub: ${targetPath}`
      : `Reusing existing target: ${targetPath}`
  );
  console.error(`Merged context for profile=${profileId} target=${mediumId} follows on stdout.`);
  console.error('');
  process.stdout.write(buildMergedContext(dir, profileId, mediumId));
  if (!process.stdout.write('\n')) {
    /* ignore */
  }
}

function printHelp() {
  console.log(`vibe-to-ui context — local Design Context CLI

Usage:
  vibe-to-ui context --list
  vibe-to-ui context --profile <id> --init
  vibe-to-ui context --profile <id> --target <medium>

Options:
  --list                 List profiles under the Design Context root
  --profile <id>         Profile id (kebab-case brand/product/client)
  --init                 Create profile skeleton from skill seeds (no targets/)
  --target <medium>      Ensure targets/<medium>.md exists; print merged context
  -h, --help             Show help

Environment:
  VIBE_TO_UI_HOME        Override root (default: ~/.vibe-to-ui)

Notes:
  - User data lives outside the skill package; skill reinstall must not touch it.
  - Targets are open-ended medium ids — no built-in GitHub/LinkedIn packs.
  - --from-url / --from-image are not implemented in this CLI yet (agent workflow).
`);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
    return { help: true };
  }
  if (args[0] !== 'context') {
    throw new Error(`Unknown command "${args[0]}". Only "context" is supported in this MVP.`);
  }

  const opts = { help: false, list: false, init: false, profile: null, target: null };
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--list') opts.list = true;
    else if (a === '--init') opts.init = true;
    else if (a === '--profile') {
      opts.profile = args[++i];
      if (!opts.profile) throw new Error('--profile requires a value');
    } else if (a === '--target') {
      opts.target = args[++i];
      if (!opts.target) throw new Error('--target requires a value');
    } else {
      throw new Error(`Unknown argument: ${a}`);
    }
  }
  return opts;
}

function main(argv = process.argv) {
  try {
    const opts = parseArgs(argv);
    if (opts.help) {
      printHelp();
      return;
    }
    const root = resolveHomeRoot();

    if (opts.list) {
      if (opts.init || opts.target || opts.profile) {
        throw new Error('--list cannot be combined with --init / --target / --profile');
      }
      cmdList(root);
      return;
    }

    if (opts.init) {
      if (opts.target) throw new Error('--init cannot be combined with --target');
      if (!opts.profile) throw new Error('--init requires --profile <id>');
      cmdInit(root, opts.profile);
      return;
    }

    if (opts.target != null) {
      if (!opts.profile) throw new Error('--target requires --profile <id>');
      cmdTarget(root, opts.profile, opts.target);
      return;
    }

    throw new Error('Nothing to do. Use --list, --init, or --target. See --help.');
  } catch (err) {
    console.error(`error: ${err.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  main,
  resolveHomeRoot,
  normalizeSlug,
  packageRoot,
  SLUG_RE,
};

if (require.main === module) {
  main();
}
