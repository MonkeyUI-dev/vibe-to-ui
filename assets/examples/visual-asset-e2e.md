# E2E Example: Concept → Mood Board → Apply

This walkthrough demonstrates Capability 6 with **P0 defaults**: illustrations only, local `public/design-assets/`, preview-then-final resolution, host `GenerateImage` (or equivalent MCP tool).

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
├── design-assets.manifest.json
└── design-assets/
    ├── hero-coastal-clarity-v1.webp      # 960w preview
    └── feature-coastal-clarity-v1.webp
```

### Agent actions

1. Load [VISUAL-ASSET-GENERATION.md](../../references/VISUAL-ASSET-GENERATION.md).
2. Compile hero prompt (see reference doc example).
3. Call host image tool → save `design-assets/hero-coastal-clarity-v1.webp`.
4. Set `style_reference_path` to hero; generate feature image.
5. Write `design-assets.manifest.json` (see [design-assets.manifest.example.json](design-assets.manifest.example.json)).
6. Embed images in `mood-board-coastal-clarity.html`:

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

7. Ask user: "How does this feel?" — do **not** modify their app repo.

---

## Step 3 — User confirms Concept Coastal Clarity

Formalize design system using [design-system-template.md](../design-system-template.md). Copy manifest paths into the **Visual Assets** section.

---

## Step 4 — Apply to project (Capability 5 + 3.5)

User: "Apply Concept Coastal Clarity **with assets** to my Next.js project."

### Agent actions

1. Confirm scope: tokens + visual assets.
2. Regenerate hero/feature at **1920px / 1200px** (or upscale via second generation with same prompt + reference).
3. Copy into project:

```
public/
└── design-assets/
    ├── hero-coastal-clarity-v1.webp
    ├── feature-coastal-clarity-v1.webp
    └── og-coastal-clarity-v1.webp
design-assets.manifest.json   # project root or public/
```

4. Update landing page component:

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

5. Summary for user: list token files + asset paths + manifest location.

---

## Step 5 — Iteration

User: "Hero feels too saturated."

1. Open manifest; set `parent_id` on new row `hero-coastal-clarity-v2`.
2. Recompile prompt with suffix: "lower saturation, more muted sage and cream".
3. Pass `hero-coastal-clarity-v1.webp` as style reference.
4. Update HTML/component `src` after user confirms.

---

## MCP alternative (teams)

If `VIBE_IMAGE_PROVIDER=openai` and an MCP server exposes `generate_image`:

```json
{
  "tool": "generate_image",
  "arguments": {
    "prompt": "<compiled prompt>",
    "width": 1920,
    "height": 1080,
    "output_path": "public/design-assets/hero-coastal-clarity-v1.webp",
    "reference_path": null
  }
}
```

Record `provider: openai` on the manifest asset row.

---

## Checklist

- [ ] Stage 0 page type recorded
- [ ] StyleContext assembled before first generation
- [ ] Hero generated before sibling assets
- [ ] Manifest paths match files on disk
- [ ] Mood board uses `<img>` when tool available; CSS fallback otherwise
- [ ] Apply only after explicit user confirmation
- [ ] `alt` text set for informative images
