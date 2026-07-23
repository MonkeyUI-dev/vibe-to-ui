'use strict';

const { normalizeSlug, todayStamp } = require('../home');

/**
 * Build a stable, readable inspiration id: `<slug>-YYYY-MM-DD`
 * Optionally append `-vN` when collisions need a new version.
 */
function hostSlugFromUrl(urlString) {
  let host = 'site';
  try {
    const u = new URL(urlString);
    host = u.hostname.replace(/^www\./, '');
    const pathPart = u.pathname
      .split('/')
      .filter(Boolean)
      .slice(0, 2)
      .join('-');
    if (pathPart) host = `${host}-${pathPart}`;
  } catch {
    /* keep default */
  }
  return normalizeSlug(host, 'inspiration id');
}

function imageSlugFromPath(imagePath) {
  const base = require('path').basename(imagePath).replace(/\.[^.]+$/, '');
  return normalizeSlug(base || 'image', 'inspiration id');
}

function buildInspirationId({ url, imagePath, date = todayStamp(), version = null }) {
  const base = url ? hostSlugFromUrl(url) : imageSlugFromPath(imagePath || 'image');
  const stamped = `${base}-${date}`;
  if (version == null || version <= 1) return stamped;
  return `${stamped}-v${version}`;
}

function nextVersionId(existingId) {
  const m = existingId.match(/-v(\d+)$/);
  if (m) {
    return existingId.replace(/-v\d+$/, `-v${Number(m[1]) + 1}`);
  }
  return `${existingId}-v2`;
}

module.exports = {
  hostSlugFromUrl,
  imageSlugFromPath,
  buildInspirationId,
  nextVersionId,
};
