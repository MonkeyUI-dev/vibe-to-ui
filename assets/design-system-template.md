# Design System: [Project Name]

> Extracted by MonkeyUI Design Skill | Date: [YYYY-MM-DD]

## Color Palette

### Core Colors

| Role | Hex | Preview | Confidence |
|------|-----|---------|------------|
| Primary | `#______` | 🟦 | High/Medium/Low |
| Secondary | `#______` | 🟪 | High/Medium/Low |
| Accent | `#______` | 🟡 | High/Medium/Low |

### Neutral Colors

| Role | Hex | Preview | Confidence |
|------|-----|---------|------------|
| Background | `#______` | ⬜ | High/Medium/Low |
| Surface | `#______` | ⬜ | High/Medium/Low |
| Text Primary | `#______` | ⬛ | High/Medium/Low |
| Text Secondary | `#______` | 🔲 | High/Medium/Low |
| Border | `#______` | 🔲 | High/Medium/Low |

### Semantic Colors

| Role | Hex | Confidence |
|------|-----|------------|
| Success | `#______` | High/Medium/Low |
| Warning | `#______` | High/Medium/Low |
| Error | `#______` | High/Medium/Low |
| Info | `#______` | High/Medium/Low |

## Typography

### Font Families
- **Heading**: [Font Name] (fallback: [fallback])
- **Body**: [Font Name] (fallback: [fallback])
- **Mono** (if applicable): [Font Name]

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| Display / H1 | __px | _00 | _._ | _px |
| H2 | __px | _00 | _._ | _px |
| H3 | __px | _00 | _._ | _px |
| H4 | __px | _00 | _._ | _px |
| Body Large | __px | _00 | _._ | normal |
| Body | __px | _00 | _._ | normal |
| Body Small | __px | _00 | _._ | normal |
| Label | __px | _00 | _._ | _px |

**Scale ratio**: [e.g., 1.25 Major Third]
**Base size**: [e.g., 16px]

## Spacing

**Base unit**: [e.g., 4px]

| Token | Value | Usage |
|-------|-------|-------|
| xs | _px | Tight gaps, icon padding |
| sm | _px | Form field gaps, inline spacing |
| md | _px | Card padding, component gaps |
| lg | _px | Section gaps |
| xl | _px | Section padding |
| 2xl | _px | Page-level spacing |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | — |
| sm | _px | Subtle rounding |
| md | _px | Cards, inputs |
| lg | _px | Modals, large cards |
| full | 9999px | Pills, avatars |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| sm | `0 1px 2px rgba(...)` | Subtle elevation |
| md | `0 4px 6px rgba(...)` | Cards |
| lg | `0 10px 15px rgba(...)` | Dropdowns, modals |

## Aesthetic Summary

- **Overall mood**: [e.g., "Clean and professional with warm accents"]
- **Color temperature**: [Warm / Cool / Neutral]
- **Density**: [Dense / Balanced / Airy]
- **Shape language**: [Sharp / Subtle / Rounded]
- **Shadow strategy**: [Flat / Subtle depth / Pronounced elevation]
- **Motion personality**: [Still / Subtle / Polished / Cinematic]

## Motion System

### Motion Character

- **Tempo**: [Slow / Medium / Fast] — base duration: [e.g., 300ms]
- **Easing**: [Calm / Sharp / Elastic] — base curve: [e.g., `cubic-bezier(0.4, 0, 0.2, 1)`]
- **Density**: [Minimal / Moderate / Rich]
- **Distance**: [Small / Medium / Large] — base translate: [e.g., 12px]
- **Personality**: [e.g., "Reliable & Composed" / "Innovative & Performant" / "Guiding & Supportive"]
- **Page metaphor**: [e.g., "Product manual" / "Product launch" / "Dashboard"]

### Motion Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| instant | _ms | — | Immediate state changes (color, opacity micro-shifts) |
| fast | _ms | [easing] | Micro-interactions — button feedback, toggle, focus |
| normal | _ms | [easing] | Standard transitions — hover states, reveals, cards |
| slow | _ms | [easing] | Macro transitions — section entrances, modals, page transitions |
| slower | _ms | [easing] | Cinematic / emphasis — hero entrance, scroll reveals |

### Motion Patterns

| Pattern | Trigger | Animation | Role |
|---------|---------|-----------|------|
| [from analysis] | [trigger] | [description] | [role] |
| [from analysis] | [trigger] | [description] | [role] |
| [from analysis] | [trigger] | [description] | [role] |

> Derive patterns from the actual reference — do not default to generic fade-up / hover-lift / click-press. Every design has its own motion vocabulary.

### Reduced Motion Fallback

- **Strategy**: [Fade only / Static / Simplified / Pausable]
- All transform-based animations → simple opacity fade or instant display
- Auto-playing media → pausable with visible controls
- Parallax and scroll-linked effects → disabled

---

## Code Tokens

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #______;
  --color-secondary: #______;
  --color-accent: #______;
  --color-bg: #______;
  --color-surface: #______;
  --color-text: #______;
  --color-text-secondary: #______;
  --color-border: #______;

  /* Typography */
  --font-heading: '[Font]', [fallback];
  --font-body: '[Font]', [fallback];

  /* Spacing */
  --space-xs: _px;
  --space-sm: _px;
  --space-md: _px;
  --space-lg: _px;
  --space-xl: _px;
  --space-2xl: _px;

  /* Border Radius */
  --radius-sm: _px;
  --radius-md: _px;
  --radius-lg: _px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(...);
  --shadow-md: 0 4px 6px rgba(...);
  --shadow-lg: 0 10px 15px rgba(...);

  /* Motion */
  --duration-instant: _ms;
  --duration-fast: _ms;
  --duration-normal: _ms;
  --duration-slow: _ms;
  --duration-slower: _ms;
  --ease-default: cubic-bezier(_, _, _, _);
  --ease-in: cubic-bezier(_, _, _, _);
  --ease-out: cubic-bezier(_, _, _, _);
  --ease-elastic: cubic-bezier(_, _, _, _);
  --motion-distance-sm: _px;
  --motion-distance-md: _px;
  --motion-distance-lg: _px;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
    --motion-distance-sm: 0;
    --motion-distance-md: 0;
    --motion-distance-lg: 0;
  }
}
```

### Tailwind CSS Config

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#______',
        secondary: '#______',
        accent: '#______',
        surface: '#______',
        border: '#______',
      },
      fontFamily: {
        heading: ['[Font]', '[fallback]'],
        body: ['[Font]', '[fallback]'],
      },
      borderRadius: {
        sm: '_px',
        md: '_px',
        lg: '_px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(...)',
        md: '0 4px 6px rgba(...)',
        lg: '0 10px 15px rgba(...)',
      },
      transitionDuration: {
        instant: '_ms',
        fast: '_ms',
        normal: '_ms',
        slow: '_ms',
        slower: '_ms',
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(_, _, _, _)',
        in: 'cubic-bezier(_, _, _, _)',
        out: 'cubic-bezier(_, _, _, _)',
        elastic: 'cubic-bezier(_, _, _, _)',
      },
      // keyframes: derive from the analyzed motion patterns — do not use generic presets
      // animation: define based on actual motion vocabulary from the reference
    },
  },
};
```

### JSON Token File

```json
{
  "color": {
    "primary": { "value": "#______" },
    "secondary": { "value": "#______" },
    "accent": { "value": "#______" },
    "background": { "value": "#______" },
    "surface": { "value": "#______" },
    "text": { "value": "#______" },
    "textSecondary": { "value": "#______" },
    "border": { "value": "#______" }
  },
  "typography": {
    "fontFamily": {
      "heading": { "value": "[Font], [fallback]" },
      "body": { "value": "[Font], [fallback]" }
    },
    "scale": {
      "base": { "value": "__px" },
      "ratio": { "value": "_.__" }
    }
  },
  "spacing": {
    "base": { "value": "_px" },
    "xs": { "value": "_px" },
    "sm": { "value": "_px" },
    "md": { "value": "_px" },
    "lg": { "value": "_px" },
    "xl": { "value": "_px" }
  },
  "radius": {
    "sm": { "value": "_px" },
    "md": { "value": "_px" },
    "lg": { "value": "_px" },
    "full": { "value": "9999px" }
  },
  "motion": {
    "duration": {
      "instant": { "value": "_ms" },
      "fast": { "value": "_ms" },
      "normal": { "value": "_ms" },
      "slow": { "value": "_ms" },
      "slower": { "value": "_ms" }
    },
    "easing": {
      "default": { "value": "cubic-bezier(_, _, _, _)" },
      "in": { "value": "cubic-bezier(_, _, _, _)" },
      "out": { "value": "cubic-bezier(_, _, _, _)" },
      "elastic": { "value": "cubic-bezier(_, _, _, _)" }
    },
    "distance": {
      "sm": { "value": "_px" },
      "md": { "value": "_px" },
      "lg": { "value": "_px" }
    },
    "meta": {
      "tempo": { "value": "[slow/medium/fast]" },
      "density": { "value": "[minimal/moderate/rich]" },
      "reducedMotion": { "value": "[fade-only/static/simplified/pausable]" }
    }
  }
}
```
