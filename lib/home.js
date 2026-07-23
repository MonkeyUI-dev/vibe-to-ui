'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function packageRoot() {
  return path.resolve(__dirname, '..');
}

function resolveHomeRoot() {
  const home = os.homedir();
  if (!home) {
    throw new Error(
      'Cannot resolve home directory. vibe-to-ui requires a user home path so data can live under ~/.vibe-to-ui.'
    );
  }
  return path.join(home, '.vibe-to-ui');
}

function permissionHint(dir, err) {
  return (
    `vibe-to-ui needs write access to ${dir}\n` +
    `Grant write permission to ~/.vibe-to-ui (or your home directory) and retry.\n` +
    `Do not redirect storage to /tmp or the project directory.\n` +
    `Detail: ${err.message}`
  );
}

function assertWritableDir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    throw new Error(permissionHint(dir, err));
  }
  const probe = path.join(dir, `.write-check-${process.pid}`);
  try {
    fs.writeFileSync(probe, 'ok');
    fs.unlinkSync(probe);
  } catch (err) {
    throw new Error(permissionHint(dir, err));
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

function todayStamp() {
  return nowIso().slice(0, 10);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, 'utf8');
}

function writeJson(filePath, value) {
  writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

module.exports = {
  SLUG_RE,
  packageRoot,
  resolveHomeRoot,
  assertWritableDir,
  normalizeSlug,
  nowIso,
  todayStamp,
  readText,
  writeText,
  writeJson,
  readJson,
  exists,
  permissionHint,
};
