'use strict';

/** Default preview theme when no Design Context profile is supplied. */
const DEFAULT_THEME = {
  paper: '#F3F0EA',
  ink: '#1C1917',
  signal: '#0F766E',
  surface: '#FFFcf7',
  muted: '#78716C',
  border: 'rgba(28, 25, 23, 0.14)',
};

/**
 * Map profile tokens.json (DTCG colors) → preview theme roles.
 * Prefer semantic roles over decorative primary/accent misuse of signal.
 */
function themeFromProfileTokens(tokens) {
  const colors = (tokens && tokens.colors) || {};
  const pick = (key, fallback) => {
    const node = colors[key];
    if (!node) return fallback;
    if (typeof node.$value === 'string' && node.$value && !node.$value.includes('_')) {
      return node.$value;
    }
    return fallback;
  };

  return {
    paper: pick('background', pick('neutral', DEFAULT_THEME.paper)),
    ink: pick('on-surface', pick('primary', DEFAULT_THEME.ink)),
    // signal = "current evidence" — prefer info/tertiary, never treat as decoration default
    signal: pick('info', pick('tertiary', pick('secondary', DEFAULT_THEME.signal))),
    surface: pick('surface', DEFAULT_THEME.surface),
    muted: pick('on-surface-muted', DEFAULT_THEME.muted),
    border: pick('border', DEFAULT_THEME.border),
  };
}

module.exports = {
  DEFAULT_THEME,
  themeFromProfileTokens,
};
