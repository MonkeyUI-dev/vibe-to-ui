'use strict';

const fs = require('fs');
const path = require('path');
const { exists, readJson, writeJson, nowIso } = require('../home');

function inspirationsDir(root) {
  return path.join(root, 'inspirations');
}

function inspirationDir(root, id) {
  return path.join(inspirationsDir(root), id);
}

function inspirationPaths(root, id) {
  const dir = inspirationDir(root, id);
  return {
    dir,
    source: path.join(dir, 'source.md'),
    metadata: path.join(dir, 'metadata.json'),
    captures: path.join(dir, 'captures'),
    annotations: path.join(dir, 'annotations.json'),
    analysis: path.join(dir, 'analysis.md'),
    designSeed: path.join(dir, 'design-seed.md'),
    preview: path.join(dir, 'preview.html'),
  };
}

function listInspirationIds(root) {
  const dir = inspirationsDir(root);
  if (!exists(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();
}

function loadMetadata(root, id) {
  const p = inspirationPaths(root, id).metadata;
  if (!exists(p)) return null;
  return readJson(p);
}

function listInspirations(root) {
  return listInspirationIds(root)
    .map((id) => {
      const meta = loadMetadata(root, id) || { id };
      return {
        id,
        title: meta.title || id,
        source: meta.sourceUrl || meta.sourcePath || meta.sourceKind || '',
        date: meta.createdAt || meta.date || '',
        pageType: meta.pageType || 'other',
        keywords: meta.keywords || [],
        preview: inspirationPaths(root, id).preview,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.id.localeCompare(b.id));
}

function findBySource(root, { url, imagePath }) {
  const all = listInspirationIds(root);
  const matches = [];
  for (const id of all) {
    const meta = loadMetadata(root, id);
    if (!meta) continue;
    if (url && meta.sourceUrl === url) matches.push({ id, meta });
    if (imagePath) {
      const abs = path.resolve(imagePath);
      if (meta.sourcePath === abs || meta.sourcePath === imagePath) matches.push({ id, meta });
    }
  }
  return matches;
}

function profileInspirationRefsPath(profilePath) {
  return path.join(profilePath, 'inspiration-refs.json');
}

function loadInspirationRefs(profilePath) {
  const p = profileInspirationRefsPath(profilePath);
  if (!exists(p)) return { version: 1, links: [] };
  return readJson(p);
}

function saveInspirationRefs(profilePath, data) {
  writeJson(profileInspirationRefsPath(profilePath), data);
}

function upsertInspirationRef(profilePath, link) {
  const data = loadInspirationRefs(profilePath);
  const idx = data.links.findIndex((l) => l.inspirationId === link.inspirationId);
  const entry = {
    inspirationId: link.inspirationId,
    linkedAt: link.linkedAt || nowIso(),
    status: link.status || 'reference-only',
    transferableRules: link.transferableRules || [],
    notes: link.notes || '',
  };
  if (idx >= 0) {
    data.links[idx] = { ...data.links[idx], ...entry, linkedAt: data.links[idx].linkedAt };
    data.links[idx].updatedAt = nowIso();
  } else {
    data.links.push(entry);
  }
  saveInspirationRefs(profilePath, data);
  return entry;
}

module.exports = {
  inspirationsDir,
  inspirationDir,
  inspirationPaths,
  listInspirationIds,
  listInspirations,
  loadMetadata,
  findBySource,
  profileInspirationRefsPath,
  loadInspirationRefs,
  upsertInspirationRef,
};
