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
  }
}
```
