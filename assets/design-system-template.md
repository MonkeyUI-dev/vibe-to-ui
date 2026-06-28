# Design System: [Project Name]

> Extracted by `vibe-to-ui` | Date: [YYYY-MM-DD]

## Page Type Summary

- **Primary page type**: [landing / dashboard / workbench / docs / form / consumer app / other]
- **Secondary modifier**: [optional]
- **Density**: [low / medium / high]
- **Confidence**: [high / medium / low]
- **Evidence**: [signals that drove the classification]
- **Design consequences**: [what this means for spacing, hierarchy, imagery, component style, and motion]

## Reference Fidelity

- **Mode**: [Reference Fidelity Mode / Vibe Translation Mode]
- **Must stay similar**: [what should remain faithful to the reference]
- **May be adjusted**: [what can change without breaking fidelity]

## Spatial / Layout DNA

The page-level grammar: how content breathes, where attention lands, how sections relate. Fill this in when a spatial direction was explored (see [../references/SPATIAL-VIBE.md](../references/SPATIAL-VIBE.md)). Keep it as a set of spatial decisions, not a mood thesaurus.

- **Confirmed layout direction**: [name of the chosen direction, if one was selected]
- **Content density**: [sparse / balanced / compact / deliberately layered]
- **Whitespace**: [where space expands, where it tightens, and why]
- **Hierarchy**: [how attention moves from primary action to supporting content]
- **Dominant visual focus**: [text-led / image-led / product-demo-led / data-led / mixed]
- **Spatial rhythm**: [steady / slow / syncopated / modular / editorial / immersive]
- **Symmetry / asymmetry**: [centered calm / off-axis tension / alternating rhythm]
- **Card / surface logic**: [absent / minimal / dense / oversized / overlapping / broken-grid]
- **Image / media behavior**: [full-bleed / cropped / inset / cinematic / documentary / abstracted]
- **Section transitions**: [hard cuts / soft fades / overlapping bands / scroll chapters]
- **Interaction tempo**: [still / subtle / responsive / flowing / cinematic]
- **Responsive strategy**: [which spatial relationships must survive on small screens]

### Section Order and Rhythm

Capture the actual page composition that was confirmed — not a generic header → hero → features → footer template.

| Section | Role | Spatial character | Notes |
|---------|------|-------------------|-------|
| [section name] | [purpose] | [dominant / supporting, dense / open, full-bleed / constrained] | [rhythm or alignment note] |
| [section name] | [purpose] | [...] | [...] |

### Architecture Label Map

If the confirmed direction includes an ASCII architecture sketch, visual thumbnail, or abbreviated layout labels, define every label in product language so the structure can be understood and applied later.

| Label in sketch | Meaning in this product | Example content | Why it belongs here |
|-----------------|-------------------------|-----------------|---------------------|
| [label] | [semantic product meaning] | [real or assumed content] | [layout / hierarchy rationale] |
| [label] | [...] | [...] | [...] |

### Reference Mapping (optional)

- **Borrowed from structure references**: [what page organization was inherited]
- **Borrowed from vibe references**: [what feeling, rhythm, or density was translated]
- **Deliberately not copied**: [literal signals from references that were excluded]

## Color Palette

### Core Colors

| Role | Hex | Swatch | Confidence | Notes |
|------|-----|--------|------------|-------|
| Primary | `#______` | `[swatch]` | High/Medium/Low | [usage] |
| Secondary | `#______` | `[swatch]` | High/Medium/Low | [usage] |
| Accent | `#______` | `[swatch]` | High/Medium/Low | [usage] |

### Neutral Colors

| Role | Hex | Swatch | Confidence | Notes |
|------|-----|--------|------------|-------|
| Background | `#______` | `[swatch]` | High/Medium/Low | [usage] |
| Surface | `#______` | `[swatch]` | High/Medium/Low | [usage] |
| Surface Alt | `#______` | `[swatch]` | High/Medium/Low | [optional] |
| Text Primary | `#______` | `[swatch]` | High/Medium/Low | [usage] |
| Text Secondary | `#______` | `[swatch]` | High/Medium/Low | [usage] |
| Text Inverse | `#______` | `[swatch]` | High/Medium/Low | [optional] |
| Border | `#______` | `[swatch]` | High/Medium/Low | [usage] |

### Semantic Colors

| Role | Hex | Confidence | Notes |
|------|-----|------------|-------|
| Success | `#______` | High/Medium/Low | [optional] |
| Warning | `#______` | High/Medium/Low | [optional] |
| Error / Danger | `#______` | High/Medium/Low | [optional] |
| Info | `#______` | High/Medium/Low | [optional] |

### Color Logic

- **Temperature**: [warm / cool / neutral]
- **Saturation strategy**: [muted / balanced / vivid / selective pops]
- **Material note**: [flat / tinted / translucent / blurred / layered]

## Typography

### Font Families

- **Heading**: [Font Name] (fallback: [fallback])
- **Body**: [Font Name] (fallback: [fallback])
- **Mono**: [Font Name] (if applicable)

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Confidence |
|-------|------|--------|-------------|----------------|------------|
| Display / H1 | __px | _00 | _._ | _px | High/Medium/Low |
| H2 | __px | _00 | _._ | _px | High/Medium/Low |
| H3 | __px | _00 | _._ | _px | High/Medium/Low |
| H4 | __px | _00 | _._ | _px | High/Medium/Low |
| Body Large | __px | _00 | _._ | normal | High/Medium/Low |
| Body | __px | _00 | _._ | normal | High/Medium/Low |
| Body Small | __px | _00 | _._ | normal | High/Medium/Low |
| Label | __px | _00 | _._ | _px | High/Medium/Low |

- **Scale ratio**: [for example `1.25` Major Third]
- **Base size**: [for example `16px`]
- **Readability posture**: [dramatic / balanced / compact / editorial / operational]

## Spacing

- **Base unit**: [for example `4px`]
- **Density posture**: [compact / balanced / airy]

| Token | Value | Usage |
|-------|-------|-------|
| xs | _px | Tight gaps, icon padding |
| sm | _px | Form gaps, inline spacing |
| md | _px | Component padding, card spacing |
| lg | _px | Module gaps |
| xl | _px | Section padding |
| 2xl | _px | Page-level spacing |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | Sharp edges |
| sm | _px | Minor rounding |
| md | _px | Inputs, cards, controls |
| lg | _px | Drawers, modals, large panels |
| full | 9999px | Pills, avatars |

- **Radius strategy**: [uniform / mixed by component role / expressive contrast]

## Shadows and Elevation

- **Shadow depth**: [0-5]
- **Depth strategy**: [shadow-led / border-led / blur-led / tonal layering]

| Token | Value | Usage |
|-------|-------|-------|
| sm | `0 1px 2px rgba(...)` | Subtle elevation |
| md | `0 4px 6px rgba(...)` | Cards |
| lg | `0 10px 15px rgba(...)` | Dropdowns, modals |

## Component Vocabulary

- **Navigation**: [character and structure]
- **Buttons**: [hierarchy and interaction feel]
- **Inputs / Forms**: [field treatment]
- **Cards / Panels**: [surface construction]
- **Status / Data Display**: [chips, tables, charts, metrics, lists]
- **Icons / Imagery**: [style, stroke, visual role]

## Aesthetic Summary

- **Overall mood**: [for example "clean and calm with precise operational focus"]
- **Shape language**: [sharp / subtle / rounded / mixed]
- **Hierarchy style**: [editorial / persuasive / dashboard / operational / guided]
- **Motion personality**: [still / subtle / polished / cinematic / tactical]

## Motion System

### Motion Character

- **Tempo**: [slow / medium / fast] — base duration: [for example `240ms`]
- **Easing**: [calm / sharp / elastic] — base curve: [for example `cubic-bezier(0.4, 0, 0.2, 1)`]
- **Density**: [minimal / moderate / rich]
- **Distance**: [small / medium / large] — base translate: [for example `12px`]
- **Personality**: [reliable and composed / innovative and performant / guiding and supportive / premium and luxurious / playful and energetic]
- **Reduced motion**: [fade only / static / simplified / pausable]

### Motion Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| instant | _ms | — | Immediate state changes |
| fast | _ms | [easing] | Micro-interactions, focus, press |
| normal | _ms | [easing] | Hover, reveal, panel transitions |
| slow | _ms | [easing] | Modals, section entrances |
| slower | _ms | [easing] | Showcase emphasis, larger reveals |

### Motion Patterns

| Pattern | Trigger | Animation | Role |
|---------|---------|-----------|------|
| [pattern from analysis] | [trigger] | [description] | [feedback / guidance / explanation / atmosphere] |
| [pattern from analysis] | [trigger] | [description] | [feedback / guidance / explanation / atmosphere] |
| [pattern from analysis] | [trigger] | [description] | [feedback / guidance / explanation / atmosphere] |

### Reduced Motion Fallback

- Replace transform-heavy motion with opacity-only transitions or instant state changes
- Disable parallax and scroll-linked decorative effects
- Keep meaning-bearing motion only in simplified form

## Preview Artifact

- **Artifact type**: standalone HTML preview page
- **Purpose**: validate the extracted design system before project application
- **Representative modules**: [modules chosen to match the classified page type]
- **Do not apply to project yet**: this preview is a review surface only

## Implementation Readiness

- **Tech stack requested from user**: [yes / no]
- **Preferred token format**: [CSS vars / Tailwind / JSON / multiple]
- **Open questions**: [anything the user should confirm]

---

## Code Tokens

Generate this section only after the user confirms the preview and specifies the needed format.

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #______;
  --color-secondary: #______;
  --color-accent: #______;
  --color-background: #______;
  --color-surface: #______;
  --color-surface-alt: #______;
  --color-text-primary: #______;
  --color-text-secondary: #______;
  --color-text-inverse: #______;
  --color-border: #______;
  --color-success: #______;
  --color-warning: #______;
  --color-danger: #______;
  --color-info: #______;

  /* Typography */
  --font-heading: '[Font]', [fallback];
  --font-body: '[Font]', [fallback];
  --font-mono: '[Font]', [fallback];
  --text-base: __px;
  --type-ratio: _.__;

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
        background: '#______',
        surface: '#______',
        surfaceAlt: '#______',
        border: '#______',
        success: '#______',
        warning: '#______',
        danger: '#______',
        info: '#______',
      },
      fontFamily: {
        heading: ['[Font]', '[fallback]'],
        body: ['[Font]', '[fallback]'],
        mono: ['[Font]', '[fallback]'],
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
      // Add keyframes and animation names only if they come from the extracted motion vocabulary.
    },
  },
};
```

### JSON Token File

```json
{
  "meta": {
    "pageType": "[type]",
    "density": "[low|medium|high]",
    "mode": "[reference-fidelity|vibe-translation]"
  },
  "layout": {
    "direction": { "value": "[confirmed layout direction name, if any]" },
    "contentDensity": { "value": "[sparse|balanced|compact|layered]" },
    "whitespace": { "value": "[where space expands and tightens]" },
    "hierarchy": { "value": "[primary-to-supporting attention flow]" },
    "dominantFocus": { "value": "[text-led|image-led|demo-led|data-led|mixed]" },
    "spatialRhythm": { "value": "[steady|slow|syncopated|modular|editorial|immersive]" },
    "symmetry": { "value": "[centered|off-axis|alternating]" },
    "cardLogic": { "value": "[absent|minimal|dense|oversized|overlapping|broken-grid]" },
    "imageBehavior": { "value": "[full-bleed|cropped|inset|cinematic|documentary|abstracted]" },
    "sectionTransitions": { "value": "[hard-cuts|soft-fades|overlapping-bands|scroll-chapters]" },
    "interactionTempo": { "value": "[still|subtle|responsive|flowing|cinematic]" },
    "responsiveStrategy": { "value": "[relationships that must survive small screens]" },
    "sectionOrder": [
      { "name": "[section]", "role": "[purpose]", "character": "[spatial character]" }
    ],
    "architectureLabels": [
      {
        "label": "[label in sketch]",
        "meaning": "[semantic product meaning]",
        "exampleContent": "[real or assumed content]",
        "rationale": "[why this region belongs here]"
      }
    ]
  },
  "color": {
    "primary": { "value": "#______" },
    "secondary": { "value": "#______" },
    "accent": { "value": "#______" },
    "background": { "value": "#______" },
    "surface": { "value": "#______" },
    "surfaceAlt": { "value": "#______" },
    "textPrimary": { "value": "#______" },
    "textSecondary": { "value": "#______" },
    "textInverse": { "value": "#______" },
    "border": { "value": "#______" },
    "success": { "value": "#______" },
    "warning": { "value": "#______" },
    "danger": { "value": "#______" },
    "info": { "value": "#______" }
  },
  "typography": {
    "fontFamily": {
      "heading": { "value": "[Font], [fallback]" },
      "body": { "value": "[Font], [fallback]" },
      "mono": { "value": "[Font], [fallback]" }
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
    "xl": { "value": "_px" },
    "2xl": { "value": "_px" }
  },
  "radius": {
    "sm": { "value": "_px" },
    "md": { "value": "_px" },
    "lg": { "value": "_px" },
    "full": { "value": "9999px" }
  },
  "elevation": {
    "shadowDepth": { "value": "_" },
    "sm": { "value": "0 1px 2px rgba(...)" },
    "md": { "value": "0 4px 6px rgba(...)" },
    "lg": { "value": "0 10px 15px rgba(...)" }
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
      "tempo": { "value": "[slow|medium|fast]" },
      "density": { "value": "[minimal|moderate|rich]" },
      "reducedMotion": { "value": "[fade-only|static|simplified|pausable]" }
    }
  }
}
```
