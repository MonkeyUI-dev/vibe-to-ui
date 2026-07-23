'use strict';

const fs = require('fs');
const path = require('path');
const { exists, writeText } = require('../home');

const CAPTURE_NAMES = [
  'fullpage.jpg',
  'fullpage.png',
  'fullpage.webp',
  'frame-01.jpg',
  'frame-01.png',
  'frame-01.webp',
];

function ensureCapturesDir(capturesDir) {
  fs.mkdirSync(capturesDir, { recursive: true });
}

function listFrameFiles(capturesDir) {
  if (!exists(capturesDir)) return [];
  return fs
    .readdirSync(capturesDir)
    .filter((n) => /\.(jpe?g|png|webp)$/i.test(n) && n !== 'README.md')
    .sort((a, b) => {
      if (a.startsWith('fullpage')) return -1;
      if (b.startsWith('fullpage')) return 1;
      return a.localeCompare(b);
    });
}

function framesFromDir(capturesDir) {
  const files = listFrameFiles(capturesDir);
  return files.map((file) => ({
    file,
    label: file.replace(/\.[^.]+$/, ''),
    kind: file.startsWith('fullpage') ? 'fullpage' : 'frame',
  }));
}

/**
 * URL captures are owned by the host agent (Browser Use / Computer Use),
 * not by this zero-dependency CLI. We only prepare the folder + instructions.
 */
function prepareUrlCaptures(capturesDir, { url } = {}) {
  ensureCapturesDir(capturesDir);
  const notes = [
    'Visual captures are **agent-owned**. Use the host Browser Use / Computer Use tools (Cursor, Claude Code, ChatGPT, etc.) — not this CLI.',
    url ? `Target URL: ${url}` : null,
    'Save into this folder:',
    '  - `fullpage.jpg` (or .png) — full page or longest useful scroll mosaic',
    '  - `frame-01.jpg`, `frame-02.jpg`, … — consecutive viewport screens',
    'Prefer WebP/JPEG at preview size (~960–1440px wide). Avoid multi‑MB PNG dumps when possible.',
    'After dropping files: enrich analysis.md / annotations.json, then run `vibe-to-ui inspiration rebuild-preview <id>`.',
  ].filter(Boolean);

  writeCaptureReadme(capturesDir, notes);
  return {
    ok: false,
    frames: [],
    notes,
    captureStatus: 'awaiting-agent',
  };
}

/**
 * Local image path — CLI copies into captures/ (no browser needed).
 */
function captureImage(imagePath, capturesDir) {
  ensureCapturesDir(capturesDir);
  const abs = path.resolve(imagePath);
  if (!exists(abs)) throw new Error(`Image not found: ${abs}`);
  const ext = path.extname(abs).toLowerCase() || '.jpg';
  const safeExt = ext === '.png' || ext === '.webp' ? ext : '.jpg';
  const destFull = path.join(capturesDir, `fullpage${safeExt}`);
  const destFrame = path.join(capturesDir, `frame-01${safeExt}`);
  fs.copyFileSync(abs, destFull);
  fs.copyFileSync(abs, destFrame);
  const notes = [
    'Source is a local image — analysis scope is limited to this image (not a full multi-viewport page).',
    'If the image is only a crop, say so in analysis.md; do not invent off-image structure.',
  ];
  writeCaptureReadme(capturesDir, notes);
  return {
    ok: true,
    frames: [
      { file: path.basename(destFull), label: 'image-full', kind: 'fullpage' },
      { file: path.basename(destFrame), label: 'image-frame', kind: 'frame' },
    ],
    notes,
    captureStatus: 'image-only',
  };
}

/**
 * Import agent-produced captures from a directory into the inspiration captures/.
 */
function importCaptures(fromDir, capturesDir) {
  const abs = path.resolve(fromDir);
  if (!exists(abs) || !fs.statSync(abs).isDirectory()) {
    throw new Error(`Captures directory not found: ${abs}`);
  }
  ensureCapturesDir(capturesDir);
  const files = fs
    .readdirSync(abs)
    .filter((n) => /\.(jpe?g|png|webp)$/i.test(n));
  if (!files.length) {
    throw new Error(`No image files found in ${abs}`);
  }
  for (const f of files) {
    fs.copyFileSync(path.join(abs, f), path.join(capturesDir, f));
  }
  const frames = framesFromDir(capturesDir);
  const notes = [
    `Imported ${files.length} file(s) from ${abs}.`,
    'Captures remain agent-owned; CLI only copies and indexes them.',
  ];
  writeCaptureReadme(capturesDir, notes);
  return { ok: true, frames, notes, captureStatus: 'imported' };
}

function writeCaptureReadme(capturesDir, notes) {
  writeText(
    path.join(capturesDir, 'README.md'),
    `# Captures\n\n${(notes || []).map((n) => `- ${n}`).join('\n') || '- (none)'}\n`
  );
}

module.exports = {
  CAPTURE_NAMES,
  prepareUrlCaptures,
  captureImage,
  importCaptures,
  framesFromDir,
  listFrameFiles,
};
