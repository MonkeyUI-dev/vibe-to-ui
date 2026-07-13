# E2E Example: Concept → Mood Board → Apply

This walkthrough demonstrates Capability 6 with **P0 defaults**: illustrations only, local `public/design-assets/`, preview-then-final resolution, and the **host image generation tool**.

Product: **Tidepool** — collaborative scheduling for remote teams.  
Concept: **Coastal Clarity** — warm, calm, trustworthy.

---

## Step 0 — Page type

| Field | Value |
|-------|-------|
| Primary page type | Landing / marketing |
| Density | low |
| Asset pack | Hero 16:9 + Feature 3:2 + OG 1200×630 |

---

## Step 1 — StyleContext (abbreviated)

```yaml
concept_id: coastal-clarity
style_seed: coastal-clarity-v1
product:
  name: Tidepool
  domain: Collaborative scheduling for remote teams
page:
  type: landing
  density: low
tokens:
  primary_hex: "#2F6F6D"
  accent_hex: "#C4A574"
  temperature: warm
  saturation_strategy: muted
aesthetic:
  style_name: WARM ORGANIC MINIMALISM
  mood_keywords: [calm, natural, trustworthy]
  material_lighting: soft diffused daylight, matte surfaces, subtle grain
```

---

## Step 2 — Generate preview assets (exploration)

Artifact folder (standalone, not in user project yet):

```
./artifacts/coastal-clarity/
├── mood-board-coastal-clarity.html
├── icon-contact-sheet-coastal-clarity.html
├── placement-preview-coastal-clarity.html
├── design-assets.manifest.json
└── design-assets/
    ├── hero-coastal-clarity-v1.webp      # 960w preview
    └── feature-coastal-clarity-v1.webp
    └── icon-focus-window-coastal-clarity-v1.webp
```

### Agent actions

1. Load [VISUAL-ASSET-GENERATION.md](../../references/VISUAL-ASSET-GENERATION.md).
2. Define Visual Family Spec v1: perspective, material, lighting, background complexity, subject policy, safe zones, and placement intent.
3. Define Asset Placement Specs:
   - Hero: right-third visual, left 40% safe for H1 and CTA.
   - Feature: 3:2 media beside feature copy.
   - Illustrated icon: feature card only, not navigation.
4. Compile hero prompt (see reference doc example).
5. Call host image tool → save `design-assets/hero-coastal-clarity-v1.webp`.
6. Set `style_reference_path` to hero; generate feature image.
7. If expressive feature icons are needed, choose an icon preset such as `3d-object-pop`, generate a small contact sheet, and keep UI navigation icons on the locked library or custom SVG strategy.
8. Write `design-assets.manifest.json` (see [design-assets.manifest.example.json](design-assets.manifest.example.json)).
9. Run the manifest validator: file existence, dimensions/aspect ratio, file size, alt/decorative state, preview/final state, page/role fit, style lineage, and placement fields.
10. Embed images in `mood-board-coastal-clarity.html`:

```html
<section class="hero-visual">
  <img
    src="design-assets/hero-coastal-clarity-v1.webp"
    alt="Calm coastal workspace metaphor for Tidepool scheduling"
    width="960"
    height="540"
  />
</section>
```

11. Generate `placement-preview-coastal-clarity.html` with representative H1, supporting copy, CTA, and safe-zone overlays.
12. Ask user to choose a combination such as `A1 hero + B1 feature + C1 icon set` — do **not** modify their app repo.

---

## Step 3 — User confirms Concept Coastal Clarity

Formalize design system using [design-system-template.md](../design-system-template.md). Copy manifest paths, placement strategy, review surface path, selected combination, and validator status into the **Visual Assets** section.

---

## Step 4 — Apply to project (Capability 5 + 3.5)

User: "Apply Concept Coastal Clarity **with assets** to my Next.js project."

### Agent actions

1. Confirm scope: tokens + selected visual assets.
2. Regenerate hero/feature at **1920px / 1200px** (or upscale via second generation with same prompt + reference).
3. Run manifest validator again after final files are written.
4. Copy validated files into project:

```
public/
└── design-assets/
    ├── hero-coastal-clarity-v1.webp
    ├── feature-coastal-clarity-v1.webp
    ├── icon-focus-window-coastal-clarity-v1.webp
    └── og-coastal-clarity-v1.webp
design-assets.manifest.json   # project root or public/
```

5. Update landing page component using the placement spec:

```tsx
import Image from "next/image";

<Image
  src="/design-assets/hero-coastal-clarity-v1.webp"
  alt="Calm coastal workspace metaphor for Tidepool scheduling"
  width={1920}
  height={1080}
  priority
/>
```

6. Summary for user: list token files + asset paths + manifest location + validation status.
7. Update `DESIGN.md` with the locked UI icon library, illustrated icon preset, visual family rules, review surface path, selected combination, placement notes, validator status, and confirmed asset ids.

---

## Step 5 — Iteration

User: "Hero feels too saturated."

1. Open manifest; set `parent_id` on new row `hero-coastal-clarity-v2`.
2. Recompile prompt with suffix: "lower saturation, more muted sage and cream".
3. Pass `hero-coastal-clarity-v1.webp` as style reference.
4. Update HTML/component `src` after user confirms.

---

## Checklist

- [ ] Stage 0 page type recorded
- [ ] StyleContext assembled before first generation
- [ ] Hero generated before sibling assets
- [ ] Visual Family Spec v1 defined before sibling assets
- [ ] Asset Placement Spec defined for every UI-bound asset
- [ ] Manifest paths match files on disk
- [ ] Manifest validator passed or accepted issues are recorded
- [ ] Review surface includes contact sheet, mood board wall, or placement preview
- [ ] UI chrome icons still use the locked library or custom SVG strategy
- [ ] Illustrated icons are used only for feature, social, empty-state, or onboarding surfaces unless user overrode the default
- [ ] Mood board uses `<img>` when tool available; CSS fallback otherwise
- [ ] Apply only after explicit user confirmation
- [ ] `alt` text set for informative images
