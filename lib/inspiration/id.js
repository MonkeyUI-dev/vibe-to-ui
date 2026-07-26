'use strict';

const { normalizeSlug } = require('../home');

/**
 * Product id from a URL host (no path, no date).
 * Example: https://www.langchain.com/docs → langchain
 */
function productSlugFromUrl(urlString) {
  let host = 'site';
  try {
    const u = new URL(urlString);
    host = u.hostname.replace(/^www\./, '');
    // Collapse common product-surface subdomains: docs.langchain.com → langchain.com
    const parts = host.split('.');
    if (parts.length >= 3) {
      const sub = parts[0];
      if (['docs', 'app', 'www', 'blog', 'help', 'support', 'status'].includes(sub)) {
        host = parts.slice(1).join('.');
      }
    }
    // Drop TLD for readable product folders: langchain.com → langchain
    const labels = host.split('.');
    if (labels.length >= 2) host = labels.slice(0, -1).join('-');
  } catch {
    /* keep default */
  }
  return normalizeSlug(host, 'product id');
}

/**
 * Page slug from URL path. `/` → home; `/docs/get-started` → docs-get-started (≤3 segments).
 */
function pageSlugFromUrl(urlString) {
  try {
    const u = new URL(urlString);
    const parts = u.pathname.split('/').filter(Boolean).slice(0, 3);
    if (!parts.length) return 'home';
    return normalizeSlug(parts.join('-'), 'page slug');
  } catch {
    return 'home';
  }
}

function imageSlugFromPath(imagePath) {
  const base = require('path').basename(imagePath).replace(/\.[^.]+$/, '');
  return normalizeSlug(base || 'image', 'page slug');
}

/**
 * Parse CLI refs: `product`, `product/page`, or `product/pages/page`.
 */
function parseInspirationRef(raw, label = 'inspiration ref') {
  if (raw == null || String(raw).trim() === '') {
    throw new Error(`Missing ${label}. Use product or product/page (e.g. langchain or langchain/home).`);
  }
  const s = String(raw).trim().replace(/\\/g, '/');
  const parts = s.split('/').filter(Boolean);
  if (parts[0] === 'pages' && parts.length >= 2) {
    throw new Error(`Invalid ${label} "${raw}". Use product/page, not pages/… alone.`);
  }
  if (parts.length === 1) {
    return { product: normalizeSlug(parts[0], 'product id'), page: null };
  }
  let pagePart = parts.slice(1).join('/');
  if (pagePart.startsWith('pages/')) pagePart = pagePart.slice('pages/'.length);
  if (pagePart.includes('/')) {
    throw new Error(`Invalid ${label} "${raw}". Page slug must be a single segment (e.g. langchain/home).`);
  }
  return {
    product: normalizeSlug(parts[0], 'product id'),
    page: normalizeSlug(pagePart, 'page slug'),
  };
}

function nextVersionSlug(existingSlug) {
  const m = existingSlug.match(/-v(\d+)$/);
  if (m) {
    return existingSlug.replace(/-v\d+$/, `-v${Number(m[1]) + 1}`);
  }
  return `${existingSlug}-v2`;
}

module.exports = {
  productSlugFromUrl,
  pageSlugFromUrl,
  imageSlugFromPath,
  parseInspirationRef,
  nextVersionSlug,
};
