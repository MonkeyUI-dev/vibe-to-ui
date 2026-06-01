# Visual Asset Generation Guide

## Overview

This guide defines **Capability 6: Visual Asset Generation** for vibe-to-ui. It turns confirmed design direction, product context, and aesthetic DNA into **raster illustrations** (hero, feature, empty state, OG image) that stay visually consistent across a concept — then deploys them into the user's project during Apply.

Integration is **host-agent + MCP/tool based**. This skill repository does not store API keys or call image APIs directly. The agent compiles prompts from StyleContext, invokes the host's image generation tool (for example Cursor `GenerateImage`, or a custom MCP server), and records outputs in an **Asset Manifest**.

---

## P0 Scope (locked defaults)

Use these defaults unless the user explicitly expands scope:

| Decision | P0 choice | Deferred |
|----------|-----------|----------|
| Asset types | Hero, feature, empty state, OG/social preview | Short-form video loops (P2) |
| Storage | Local project `public/design-assets/` (or framework equivalent) | External CDN (user-managed, out of skill scope) |
| Resolution | Preview during exploration; full resolution on Apply | — |
| UI icons (24×24 nav/button) | Icon library + custom SVG per [ICON-USAGE.md](ICON-USAGE.md) | Illustrated icon sets (P1) |
| Provider | Host image tool / single configured API via env vars | Multi-provider adapter table in-repo |

**Explore first, apply later** still applies: generated files for mood boards and concept previews live next to standalone HTML artifacts until the user confirms and asks to apply.

---

## When to Use

**Triggers** (also registered in [SKILL.md](../SKILL.md)):

- "Generate hero / illustrations / empty state images for this concept"
- "Replace mood board placeholders with real images"
- "Apply design **with assets**" / "copy generated images into the project"
- "Make the visuals warmer / more minimal" (regeneration from manifest)

**Do not use** for:

- B-end dense workbench **hero videos** or cinematic full-bleed backgrounds (page type forbids by default)
- Pixel-perfect logo or trademark reproduction
- Long marketing videos with narration (out of scope)

Always run **Stage 0: Page Type Identification** before generating assets. Page type controls **which assets exist**, not just their style.

---

## Page Type → Asset Pack

| Primary page type | Default asset pack | Max preview assets per concept |
|-------------------|-------------------|-------------------------------|
| Landing / brand / showcase | Hero 16:9, Feature 3:2 × up to 3, OG 1200×630 | 4 |
| Consumer app | Empty state 1:1, onboarding 4:3 | 2 |
| B-end dashboard / workbench / table-detail | Empty state 1:1 only; no hero | 1 |
| Docs / editorial | Optional concept illustration 16:9 | 1 |
| E-commerce / catalog | Product-adjacent feature 4:5, hero optional | 3 |

If the user asks for assets that conflict with page type (for example a full-bleed hero on a dense workbench), explain the tradeoff and offer a **restrained alternative** (small empty-state illustration) unless they explicitly override.

---

## StyleContext Package

Assemble this structure before every generation batch. Copy into a short Markdown block in the workflow transcript so regeneration stays traceable.

```yaml
concept_id: coastal-clarity          # stable across a direction
style_seed: "coastal-clarity-v1"   # shared across assets in one concept

product:
  name: "[Product Name]"
  domain: "[one-line what it does]"
  audience: "[who it's for]"
  keywords: [keyword1, keyword2, keyword3]

page:
  type: landing                    # from Stage 0
  density: low                     # low | medium | high
  imagery_posture: cinematic_hero  # restrained | balanced | cinematic_hero

tokens:
  primary_hex: "#______"
  accent_hex: "#______"
  background_hex: "#______"
  temperature: warm                  # warm | cool | neutral
  saturation_strategy: muted         # from Color Grammar

aesthetic:
  style_name: "WARM ORGANIC MINIMALISM"
  mood_keywords: [calm, natural, trustworthy]
  material_lighting: "soft diffused daylight, matte surfaces, subtle grain"
  iconography_rules: "line icons, rounded caps, 1.5px stroke"
  imagery_strategy: "editorial photography or soft illustration, no text in image"

asset:
  role: hero                         # hero | feature | empty_state | og | texture
  aspect_ratio: "16:9"
  target_width_px: 1920              # preview: 960; apply: 1920
  max_file_kb: 400
  must_avoid: [text_in_image, watermark, logo, photorealistic_faces, emoji_style]

references:
  user_image_urls: []                # optional
  style_reference_path: null         # previous hero in same concept_id
  concept_preview_screenshot: null   # optional anchor
```

Sources:

- **page** — Stage 0 in [SKILL.md](../SKILL.md)
- **tokens** — design system or [design-system-template.md](../assets/design-system-template.md)
- **aesthetic** — [AESTHETIC-ANALYSIS.md](AESTHETIC-ANALYSIS.md) output or exploration notes

---

## Asset Spec (per image)

Before calling a generation tool, write an Asset Spec row:

| Field | Example |
|-------|---------|
| `asset_id` | `hero-coastal-clarity-v1` |
| `concept_id` | `coastal-clarity` |
| `role` | `hero` |
| `aspect_ratio` | `16:9` |
| `composition` | wide scene, subject right third, negative space left for headline |
| `subject` | abstract product metaphor (no literal UI screenshot) |
| `preview` | true during exploration |

---

## Prompt Compiler

Build one string (or structured prompt + negative prompt) per Asset Spec.

### Structure

1. **Style anchor** — `style_name` + `mood_keywords`
2. **Material / lighting** — from aesthetic guide (prose, not a raw hex dump)
3. **Color grammar** — temperature + saturation strategy; mention accent role, not only hex codes
4. **Product line** — `{product.name} — {product.domain}` in one sentence
5. **Composition** — from `asset.role` and page type
6. **Page constraint** — landing vs B-end phrasing
7. **Negative block** — fixed suffix

### Role-specific composition hints

| Role | Composition hint |
|------|------------------|
| `hero` | Wide establishing shot, clear negative space for headline overlay, no embedded text |
| `feature` | Medium shot, single focal subject, supports adjacent copy column |
| `empty_state` | Centered friendly subject, generous padding, calm and simple |
| `og` | Strong focal center, readable at thumbnail scale, 1200×630 safe zone |
| `texture` | Seamless-friendly abstract pattern, low contrast |

### B-end constraint suffix

Append when `page.density` is `high` or type is B-end:

`flat illustration, high clarity, minimal detail, no cinematic lighting, suitable for empty state in enterprise software`

### Negative prompt (always append)

`text, letters, numbers, watermark, logo, brand mark, photorealistic face, busy clutter, neon cyberpunk, 3d glass blob, emoji, stock photo cliché`

### Multi-asset consistency

1. Generate **hero first** for a `concept_id`.
2. Set `style_reference_path` to that file for subsequent assets in the same concept.
3. Pass the reference image to the host tool when supported (img2img / reference image parameter).
4. Reuse the same `style_seed` in the manifest for all siblings.

### Example compiled prompt (hero)

```
WARM ORGANIC MINIMALISM — calm, natural, trustworthy.
Material: soft diffused daylight, matte surfaces, subtle grain.
Color: warm cream atmosphere, muted sage accent, low saturation, gentle contrast.
Product: Tidepool — collaborative scheduling for remote teams.
Composition: wide hero, subject in right third, soft negative space on the left for headline overlay.
Page: landing page, low density, editorial but not cluttered.
Style: soft illustration with photographic lighting, no UI mockup frame.
AVOID: text, watermark, logo, faces, neon, emoji.
```

---

## Generation Adapter (host tools)

The skill does not ship a runtime. The agent must use whatever the host provides.

### Cursor

- Tool: `GenerateImage` with `description` = compiled prompt; save output to the path the tool returns or to the exploration artifact folder.
- For iteration: include prior image path in the description as "match style of previous hero".

### MCP / API (recommended for teams)

Configure via environment variables (never commit secrets):

| Variable | Purpose |
|----------|---------|
| `VIBE_IMAGE_PROVIDER` | `openai` \| `flux` \| `ideogram` \| `recraft` \| `host` |
| `OPENAI_API_KEY` | GPT Image / DALL·E family |
| `BFL_API_KEY` | Flux API |
| `IDEOGRAM_API_KEY` | Ideogram |
| `RECRAFT_API_KEY` | Recraft (brand color + illustration) |

Expose MCP tools such as `generate_image(prompt, width, height, reference_path?)` and optionally `generate_video` (P2 only).

### Provider notes (2026)

| Provider | Best for |
|----------|----------|
| Flux 1.1 Pro | Hero and editorial illustration, few words in scene |
| GPT Image (OpenAI) | General illustration, strong instruction following |
| Ideogram 3 | Scenes that need legible typographic *in the UI layer* (prefer HTML for real text) |
| Recraft V3 | Brand-locked palettes from hex + illustration families |

Default when unset: **host tool** (`VIBE_IMAGE_PROVIDER=host`).

### Preview vs final

| Phase | Width (long edge) | Format |
|-------|-------------------|--------|
| Exploration preview | 960px | WebP or PNG |
| Apply to project | 1920px (hero), role-specific otherwise | WebP preferred |

Regenerate at full size when applying; do not upscale previews with CSS alone.

---

## Consistency QA

After each generation, run a lightweight check (agent self-review or VLM if available):

1. **Page fit** — Does the asset match page type posture? (no cinematic hero for B-end)
2. **Style fit** — Same temperature and material language as StyleContext?
3. **Technical** — No obvious garbled text, watermark, or off-brand neon?
4. **Manifest** — File exists, path matches, `asset_id` unique

**Retry at most 2 times** per asset. If still failing, fall back to CSS placeholders per [MOOD-BOARD.md](MOOD-BOARD.md) and continue the design workflow.

---

## Asset Manifest

Record every generated file. During exploration, write `design-assets.manifest.json` next to mood board / concept HTML. On Apply, copy into the project (see [APPLY-DESIGN.md](APPLY-DESIGN.md)).

### JSON schema

```json
{
  "version": 1,
  "concept_id": "coastal-clarity",
  "style_seed": "coastal-clarity-v1",
  "license_default": "ai-generated",
  "assets": [
    {
      "id": "hero-coastal-clarity-v1",
      "role": "hero",
      "path": "design-assets/hero-coastal-clarity-v1.webp",
      "aspect_ratio": "16:9",
      "width_px": 1920,
      "height_px": 1080,
      "alt": "Calm coastal workspace metaphor for Tidepool scheduling",
      "prompt_hash": "sha256:…",
      "parent_id": null,
      "style_reference_id": null,
      "preview": false
    }
  ]
}
```

### Regeneration

When the user says "warmer" or "more minimal":

1. Load manifest entry by `id` or role.
2. Set `parent_id` to the previous asset `id`.
3. Increment version suffix (`v2`, `v3`).
4. Pass previous file as `style_reference_path`.
5. Append user adjustment to the prompt compiler input.

---

## Workflow Integration

### During Design Exploration (Capability 2)

After mood boards or concept previews are drafted:

1. Build StyleContext from chosen or in-progress concept.
2. Generate Asset Spec list for the page-type pack (preview resolution).
3. Call generation adapter; embed `<img src="…">` in mood board HTML (relative paths).
4. Update manifest alongside HTML artifacts.

### During Mood Board Generation (Capability 4)

Prefer **real generated images** over CSS placeholders when a generation tool is available. Keep CSS placeholders as fallback only.

### During Design System Extraction (Capability 1)

Add **Imagery strategy** and link to manifest paths in the design system document.

### During Apply (Capability 5)

See [APPLY-DESIGN.md](APPLY-DESIGN.md) Step 3.5. Only copy assets the user confirmed.

---

## Accessibility and compliance

- **Decorative images**: `alt=""` or `role="presentation"`.
- **Informative images**: write `alt` from product context (manifest field).
- **User reference uploads**: remind the user they must have rights to use references.
- **Generated assets**: `license: ai-generated` in manifest; do not impersonate third-party brands.
- **No text in generated images** for copy that must be readable — set headlines in HTML/CSS instead.

---

## Failure and fallback

| Condition | Behavior |
|-----------|----------|
| No image tool / API key | CSS placeholders in mood board; continue tokens |
| Generation error | Retry once, then placeholder |
| User rejects all images | Re-run exploration or adjust StyleContext |
| Apply without manifest | Tokens only; skip asset copy |

Never block design system formalization because image generation failed.

---

## E2E Walkthrough (reference)

See [assets/examples/visual-asset-e2e.md](../assets/examples/visual-asset-e2e.md) and [assets/examples/design-assets.manifest.example.json](../assets/examples/design-assets.manifest.example.json) for a full Concept → Mood Board → Apply trace using host `GenerateImage`.

---

## Related references

- [MOOD-BOARD.md](MOOD-BOARD.md) — embedding generated imagery
- [APPLY-DESIGN.md](APPLY-DESIGN.md) — deploying manifest + files
- [ICON-USAGE.md](ICON-USAGE.md) — UI icons vs illustrated icons (P1)
- [AESTHETIC-ANALYSIS.md](AESTHETIC-ANALYSIS.md) — aesthetic source for prompts
- [design-system-template.md](../assets/design-system-template.md) — Visual Assets section
