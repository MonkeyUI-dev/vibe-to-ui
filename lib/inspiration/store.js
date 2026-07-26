'use strict';

const fs = require('fs');
const path = require('path');
const { exists, readJson, writeJson, nowIso } = require('../home');

function inspirationsDir(root) {
  return path.join(root, 'inspirations');
}

function productPaths(root, productId) {
  const dir = path.join(inspirationsDir(root), productId);
  return {
    dir,
    metadata: path.join(dir, 'metadata.json'),
    product: path.join(dir, 'product.md'),
    designSeed: path.join(dir, 'design-seed.md'),
    preview: path.join(dir, 'preview.html'),
    pages: path.join(dir, 'pages'),
  };
}

function pagePaths(root, productId, pageSlug) {
  const dir = path.join(productPaths(root, productId).pages, pageSlug);
  return {
    dir,
    source: path.join(dir, 'source.md'),
    metadata: path.join(dir, 'metadata.json'),
    captures: path.join(dir, 'captures'),
    annotations: path.join(dir, 'annotations.json'),
    analysis: path.join(dir, 'analysis.md'),
    designSeed: path.join(dir, 'design-seed.md'),
    preview: path.join(dir, 'preview.html'),
    motion: path.join(dir, 'motion.md'),
  };
}

function isProductDir(root, name) {
  const dir = path.join(inspirationsDir(root), name);
  if (!exists(dir) || !fs.statSync(dir).isDirectory()) return false;
  const metaPath = path.join(dir, 'metadata.json');
  if (exists(path.join(dir, 'pages'))) return true;
  if (!exists(metaPath)) return false;
  try {
    return readJson(metaPath).kind === 'product';
  } catch {
    return false;
  }
}

function listProductIds(root) {
  const dir = inspirationsDir(root);
  if (!exists(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && isProductDir(root, d.name))
    .map((d) => d.name)
    .sort();
}

function listPageSlugs(root, productId) {
  const pagesDir = productPaths(root, productId).pages;
  if (!exists(pagesDir)) return [];
  return fs
    .readdirSync(pagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();
}

function loadProductMetadata(root, productId) {
  const p = productPaths(root, productId).metadata;
  if (!exists(p)) return null;
  return readJson(p);
}

function loadPageMetadata(root, productId, pageSlug) {
  const p = pagePaths(root, productId, pageSlug).metadata;
  if (!exists(p)) return null;
  return readJson(p);
}

function listInspirations(root) {
  return listProductIds(root)
    .map((id) => {
      const meta = loadProductMetadata(root, id) || { id };
      const pages = listPageSlugs(root, id);
      return {
        kind: 'product',
        id,
        title: meta.title || id,
        source: meta.primaryHost || meta.sourceUrl || '',
        date: meta.updatedAt || meta.createdAt || '',
        pageType: meta.primaryPageType || 'mixed',
        keywords: meta.keywords || [],
        pages,
        preview: productPaths(root, id).preview,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.id.localeCompare(b.id));
}

function findBySource(root, { url, imagePath }) {
  const matches = [];
  for (const productId of listProductIds(root)) {
    for (const pageSlug of listPageSlugs(root, productId)) {
      const meta = loadPageMetadata(root, productId, pageSlug);
      if (!meta) continue;
      if (url && meta.sourceUrl === url) {
        matches.push({ product: productId, page: pageSlug, id: `${productId}/${pageSlug}`, meta });
      }
      if (imagePath) {
        const abs = path.resolve(imagePath);
        if (meta.sourcePath === abs || meta.sourcePath === imagePath) {
          matches.push({ product: productId, page: pageSlug, id: `${productId}/${pageSlug}`, meta });
        }
      }
    }
  }
  return matches;
}

function ensureProductScaffold(root, productId, { title, primaryHost } = {}) {
  const paths = productPaths(root, productId);
  fs.mkdirSync(paths.pages, { recursive: true });
  let meta = exists(paths.metadata) ? readJson(paths.metadata) : null;
  if (!meta) {
    meta = {
      kind: 'product',
      id: productId,
      title: title || productId,
      primaryHost: primaryHost || '',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      pages: [],
      keywords: [],
      primaryPageType: 'mixed',
      analysisStatus: 'scaffold',
    };
    writeJson(paths.metadata, meta);
  }
  return { paths, meta };
}

function syncProductPageIndex(root, productId) {
  const paths = productPaths(root, productId);
  const pages = listPageSlugs(root, productId);
  let meta = exists(paths.metadata)
    ? readJson(paths.metadata)
    : {
        kind: 'product',
        id: productId,
        title: productId,
        createdAt: nowIso(),
      };
  meta.kind = 'product';
  meta.id = productId;
  meta.pages = pages;
  meta.updatedAt = nowIso();

  const types = [];
  for (const slug of pages) {
    const pm = loadPageMetadata(root, productId, slug);
    if (pm && pm.pageType) types.push(pm.pageType);
    if (pm && pm.title && (!meta.title || meta.title === productId)) meta.title = pm.title;
    if (pm && pm.sourceUrl && !meta.primaryHost) {
      try {
        meta.primaryHost = new URL(pm.sourceUrl).hostname.replace(/^www\./, '');
      } catch {
        /* ignore */
      }
    }
  }
  const uniqueTypes = [...new Set(types)];
  meta.primaryPageType =
    uniqueTypes.length === 1 ? uniqueTypes[0] : uniqueTypes.length ? 'mixed' : meta.primaryPageType || 'mixed';
  writeJson(paths.metadata, meta);
  return meta;
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
  const key = link.inspirationId;
  const idx = data.links.findIndex((l) => l.inspirationId === key);
  const entry = {
    inspirationId: key,
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
  productPaths,
  pagePaths,
  isProductDir,
  listProductIds,
  listPageSlugs,
  loadProductMetadata,
  loadPageMetadata,
  listInspirations,
  findBySource,
  ensureProductScaffold,
  syncProductPageIndex,
  profileInspirationRefsPath,
  loadInspirationRefs,
  saveInspirationRefs,
  upsertInspirationRef,
};
