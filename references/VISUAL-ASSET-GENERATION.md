# Visual Asset Generation Guide

## Overview

This guide defines **Capability 6: Visual Asset Generation** for vibe-to-ui. It turns confirmed design direction, product context, and aesthetic DNA into **raster illustrations** (hero, feature, empty state, OG image) that stay visually consistent across a concept — then deploys them into the user's project during Apply.

Integration is **host-agent + MCP/tool based**. This skill repository does not store API keys or call image APIs directly. The agent compiles prompts from StyleContext, invokes the host's image generation tool (for example a built-in host tool or a custom MCP server), and records outputs in an **Asset Manifest**.

---

## P0 Scope (locked defaults)

Use these defaults unless the user explicitly expands scope:

| Decision | Current phase choice |
|----------|----------------------|
| Asset types | Hero, feature, empty state, OG/social preview, illustrated feature/social icon sets when requested |
| Storage | Local project `public/design-assets/` (or framework equivalent) |
| Resolution | Preview during exploration; full resolution on Apply |
| UI icons (24×24 nav/button) | Locked icon library + custom SVG per [ICON-USAGE.md](ICON-USAGE.md) |
| Provider | Host image tool / single configured API via env vars |

**Explore first, apply later** still applies: generated files for mood boards and concept previews live next to standalone HTML artifacts until the user confirms and asks to apply.

---

## When to Use

**Triggers** (also registered in [SKILL.md](../SKILL.md)):

- "Generate hero / illustrations / empty state images for this concept"
- "Replace mood board placeholders with real images"
- "Apply design **with assets**" / "copy generated images into the project"
- "Make the visuals warmer / more minimal" (regeneration from manifest)
- "Generate custom feature icons / 3D icons / social visuals for this landing page"
- "Do not use an icon library; make SVG icons" or "make image-based icons" (user override)

**Do not use** for:

- Full-bleed hero imagery on dense B-end workbench surfaces (page type forbids by default)
- Pixel-perfect logo or trademark reproduction

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

### Illustrated icon set add-on

For landing, brand, showcase, e-commerce, consumer app, and social-sharing work, the agent may add a small illustrated icon set when it improves memorability or the user asks for stronger brand expression.

| Role | Default size | Best for | Avoid |
|------|--------------|----------|-------|
| `icon_illustrated` | 128–512px | Feature cards, launch pages, pricing/benefit sections | Navigation, toolbar buttons, form controls |
| `social_object` | 512–1200px | Social posts, OG images, campaign visuals | Dense product UI |
| `mascot_prop` | 256–1024px | Brand systems with a mascot/IP metaphor | Generic dashboards |

These assets can be raster (`webp`/`png`) or vector (`svg`) depending on the desired expressiveness. Use SVG for crisp, token-colored, reusable shapes; use raster when material, lighting, 3D form, or social-media impact matters more than theme inheritance.

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
  illustrated_icon_preset: "3d-object-pop"   # optional; see ICON-USAGE.md

asset:
  role: hero                         # hero | feature | empty_state | og | texture | icon_illustrated | social_object | mascot_prop
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

## Visual Family Spec

Before generating more than one asset, define a short family spec. This is the guardrail that keeps hero art, feature art, illustrated icons, and social visuals from feeling like unrelated one-off generations.

```yaml
visual_family:
  version: 1
  preset: 3d-object-pop              # from ICON-USAGE.md presets, or custom
  line_language: none                # none | thin_line | rounded_line | chunky_outline | geometric_line
  perspective: three_quarter_front   # flat | isometric | three_quarter_front | orthographic
  object_language: chunky_product_props
  material: matte_plastic + glossy_accent
  lighting: soft_studio_key_light
  shadow: soft_elliptical_cast_shadow
  background: dark_card_with_subtle_texture
  background_complexity: low         # none | low | medium | high
  accent_behavior: vivid_green_as_signature_pop
  detail_density: medium
  edge_language: rounded_chunky
  composition_system:
    focal_position: right_third      # centered | left_third | right_third | top_center | bottom_center
    camera_distance: medium          # macro | close | medium | wide
    crop_behavior: safe_crop         # full_object | safe_crop | edge_bleed | pattern_tile
    whitespace_position: left        # none | left | right | top | bottom | around_subject
    safe_zones: [left_40_for_copy, bottom_16_for_cta_clearance]
  subject_policy:
    allowed: [abstract_product_metaphors, product_props, simple_environmental_objects]
    avoid: [photorealistic_faces, literal_ui_screenshots, third_party_logos]
  placement_intent:
    primary_slots: [landing_hero, feature_card, social_preview]
    avoid_slots: [navigation, table_actions, dense_form_controls]
  forbidden: [tiny_ui_controls, text_in_image, brand_logos, busy_backgrounds]
```

For expressive references such as 3D object cards with strong accent color, choose `3d-object-pop` and keep the generated assets on marketing/social surfaces. Continue using [ICON-USAGE.md](ICON-USAGE.md) for small UI icons.

### Visual Family Spec field rules

Every generated asset in the same `concept_id` should inherit these fields unless a role explicitly overrides them:

| Field | Purpose |
|-------|---------|
| `line_language` | Keeps SVG/illustrated marks optically related to generated imagery |
| `perspective` | Prevents mixed flat/isometric/3D assets in one family |
| `material`, `lighting`, `shadow` | Locks the perceived rendering model |
| `background_complexity` | Controls whether assets support copy or become visual clutter |
| `composition_system` | Defines crop, focal point, camera distance, and whitespace |
| `subject_policy` | Makes allowed/forbidden objects explicit before prompting |
| `placement_intent` | Connects generation to real UI slots instead of standalone art |

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
| `visual_family_preset` | `3d-object-pop` |
| `placement_slot` | `landing_hero` |
| `copy_safe_zone` | `left_40_percent` |
| `preview` | true during exploration |

---

## Asset Placement Spec

Before an image is applied to a UI, define where it earns its keep. This prevents decorative assets from competing with copy, CTAs, forms, or data.

```yaml
asset_placement:
  asset_id: hero-coastal-clarity-v1
  surface: landing_page
  slot: hero_visual                 # hero_visual | feature_card | empty_state | og_image | social_post | onboarding_panel
  purpose: emotional_anchor         # emotional_anchor | explain_feature | reassure_empty_state | share_hook | brand_memory
  layout_relationship: copy_left_visual_right
  size_rule: 42vw_desktop_80vw_mobile
  crop_rule: preserve_subject_and_left_copy_safe_zone
  copy_anchor: h1_and_supporting_copy
  cta_relationship: visual_points_toward_primary_cta
  whitespace_contract: left_40_percent_clear
  responsive_behavior:
    desktop: visual_right_third
    tablet: visual_above_copy
    mobile: crop_to_center_subject_below_h1
  avoid_overlap_with: [h1, primary_cta, nav, form_fields]
```

### Role placement defaults

| Role | Default placement | Size guidance | Copy/CTA relationship |
|------|-------------------|---------------|-----------------------|
| `hero` | first viewport hero visual | 35–50% desktop width; full-width or 70–90% mobile | Preserve negative space; subject should frame or point toward the headline/CTA, not cover it |
| `feature` | beside a feature explanation or inside a feature card | 24–40% module width or fixed aspect card | Clarify one feature metaphor; do not introduce a second story |
| `empty_state` | centered in empty panel | 120–240px for app UI; larger only on consumer onboarding | Reassure and guide next action; leave CTA visually dominant |
| `og` | social card background/focal object | 1200×630 safe zone | Keep focal object readable at thumbnail size; real text belongs in HTML/design layer when possible |
| `icon_illustrated` | feature card, benefit row, launch graphic | 64–160px in UI; 256–512px for social/source asset | Support the label; never replace small nav/action icons |
| `social_object` | social post, launch banner, campaign card | 40–70% of composition | Strong silhouette and hook; reserve clear area for headline overlay |
| `mascot_prop` | brand moment, onboarding, empty state | 160–512px depending on surface | Express personality without obscuring the task |

### Accent effect rules

An asset creates a "finishing touch" only when it improves the surrounding UI:

1. **Hierarchy** — it makes the most important message easier to notice.
2. **Meaning** — it explains or emotionally reinforces the adjacent copy.
3. **Action** — it guides attention toward the CTA or next step.
4. **Memory** — it gives the page a recognizable visual hook for sharing.
5. **Restraint** — it does not add visual noise, compete with data, or reduce readability.

If an asset fails two or more of these checks, regenerate it for a different placement or remove it.

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
| `icon_illustrated` | Isolated metaphor object, consistent camera angle, simple card or transparent background |
| `social_object` | Bold object composition, strong silhouette, expressive material and shadow, readable in feed |
| `mascot_prop` | Character-adjacent object language, repeatable proportions, no small UI-control usage |

### B-end constraint suffix

Append when `page.density` is `high` or type is B-end:

`flat illustration, high clarity, minimal detail, no cinematic lighting, suitable for empty state in enterprise software`

### Negative prompt (always append)

`text, letters, numbers, watermark, logo, brand mark, photorealistic face, busy clutter, neon cyberpunk, 3d glass blob, emoji, stock photo cliché`

### Multi-asset consistency

1. Generate **hero first** for a `concept_id`.
2. Define the Visual Family Spec from the hero, design tokens, and chosen icon preset.
3. Define an Asset Placement Spec for each generated role before applying it to a layout.
4. Set `style_reference_path` to the hero or strongest family anchor for subsequent assets in the same concept.
5. Pass the reference image to the host tool when supported (img2img / reference image parameter).
6. Reuse the same `style_seed` in the manifest for all siblings.
7. For illustrated icon sets, generate a contact sheet or review wall first when the host tool supports multi-image output.

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

### Host-provided image tools

- Use the host image generation tool with the compiled prompt; save output to the path the tool returns or to the exploration artifact folder.
- For iteration, pass the prior image path or reference image when the host tool supports it.

### MCP / API (recommended for teams)

Configure via environment variables (never commit secrets):

| Variable | Purpose |
|----------|---------|
| `VIBE_IMAGE_PROVIDER` | `openai` \| `flux` \| `ideogram` \| `recraft` \| `host` |
| `OPENAI_API_KEY` | GPT Image / DALL·E family |
| `BFL_API_KEY` | Flux API |
| `IDEOGRAM_API_KEY` | Ideogram |
| `RECRAFT_API_KEY` | Recraft (brand color + illustration) |

Expose MCP tools such as `generate_image(prompt, width, height, reference_path?)`.

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

## Review Surface

Do not ask the user to judge isolated files when a set or placement decision matters. Generate a review surface before Apply.

### Contact sheet

Use for choosing within one role, such as 6 feature icons or 4 hero variants.

Required labels:

- asset id
- role
- visual family preset
- intended placement slot
- preview/final status
- short best-for note

### Mood board wall

Use when comparing concepts or cross-role combinations. Show assets together with the actual color, type, surface, and motion cues.

Required rows:

| Row | Purpose |
|-----|---------|
| Concept summary | Name, mood, page type, density |
| Hero options | A1/A2/A3 with copy-safe-zone overlay |
| Feature/empty-state options | B1/B2/B3 in their intended modules |
| Illustrated icon set | Contact sheet with shared family rules |
| Combination picks | Example pairings such as `A2 hero + B1 empty state + C3 icon set` |
| Placement preview | Mini UI composition showing copy, CTA, and asset size relationship |

Ask for selection in terms of combinations, not only individual files. For example: "A2 hero + B1 empty state + C3 icon set".

### Placement preview

For hero, feature, empty-state, and social visuals, include at least one miniature layout preview showing:

- real or representative copy
- primary CTA location
- asset size and crop
- responsive mobile stacking note
- safe-zone overlay when relevant

If the asset only looks good in isolation and fails inside the placement preview, it is not ready to Apply.

---

## Consistency QA

After each generation, run a lightweight check (agent self-review or VLM if available):

1. **Page fit** — Does the asset match page type posture? (no cinematic hero for B-end)
2. **Style fit** — Same temperature and material language as StyleContext?
3. **Family fit** — Same line language, perspective, material, lighting, shadow, accent behavior, detail density, and background complexity as the Visual Family Spec?
4. **Placement fit** — The asset supports its copy/CTA/layout slot without overlap or hierarchy conflict.
5. **Technical** — No obvious garbled text, watermark, or off-brand neon?
6. **Role fit** — Illustrated/raster icons are not used for 16–24px navigation, forms, tables, or toolbar controls unless user explicitly overrode the default.

**Retry at most 2 times** per asset. If still failing, fall back to CSS placeholders per [MOOD-BOARD.md](MOOD-BOARD.md) and continue the design workflow.

### Manifest Validator

Run a deterministic manifest validation pass before presenting a review surface and again before Apply. This validation is separate from subjective visual QA.

| Check | Requirement |
|-------|-------------|
| File existence | Every `assets[].path` resolves relative to the manifest or project public root |
| Unique ids | Every `assets[].id` is unique |
| Role allowed | `role` is one of `hero`, `feature`, `empty_state`, `og`, `texture`, `icon_illustrated`, `social_object`, `mascot_prop` |
| Page fit | Role is allowed by the Page Type -> Asset Pack unless user override is recorded |
| Dimensions | `width_px` and `height_px` are present and match `aspect_ratio` within tolerance |
| File size | `file_size_kb` is present for final assets and under `max_file_kb` when specified |
| Preview/final | `preview: true` assets are not wired into production Apply without regeneration or explicit approval |
| Alt text | Informative assets have non-empty `alt`; decorative assets use `alt: ""` and `decorative: true` |
| Path mode | Exploration paths are relative to artifact folders; applied public assets use public-safe paths |
| Style lineage | Sibling assets have `style_reference_id` or share the same `visual_family_preset` |
| Placement | Assets used in UI have a `placement` object with `slot`, `purpose`, `size_rule`, and `responsive_behavior` |
| Icon role | Raster/illustrated icons are not assigned to `navigation`, `form_controls`, `table_actions`, or `toolbar_controls` unless override is recorded |

Record validator output in the manifest or adjacent review notes:

```json
{
  "validation": {
    "status": "passed",
    "checked_at": "2026-06-06",
    "issues": []
  }
}
```

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
  "visual_family": {
    "version": 1,
    "preset": "3d-object-pop",
    "perspective": "three_quarter_front",
    "material": "matte plastic with glossy accent",
    "lighting": "soft studio key light",
    "shadow": "soft elliptical cast shadow",
    "background_complexity": "low"
  },
  "assets": [
    {
      "id": "hero-coastal-clarity-v1",
      "role": "hero",
      "path": "design-assets/hero-coastal-clarity-v1.webp",
      "aspect_ratio": "16:9",
      "width_px": 1920,
      "height_px": 1080,
      "file_size_kb": 384,
      "alt": "Calm coastal workspace metaphor for Tidepool scheduling",
      "decorative": false,
      "prompt_hash": "sha256:…",
      "parent_id": null,
      "style_reference_id": null,
      "visual_family_preset": "3d-object-pop",
      "placement": {
        "slot": "hero_visual",
        "purpose": "emotional_anchor",
        "size_rule": "42vw_desktop_80vw_mobile",
        "copy_safe_zone": "left_40_percent",
        "responsive_behavior": {
          "desktop": "visual_right_third",
          "mobile": "below_h1_center_crop"
        }
      },
      "preview": false
    }
  ],
  "validation": {
    "status": "passed",
    "checked_at": "2026-06-06",
    "issues": []
  }
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
2. Define Visual Family Spec and Asset Placement Specs.
3. Generate Asset Spec list for the page-type pack (preview resolution).
4. Call generation adapter; embed `<img src="…">` in mood board HTML (relative paths).
5. Update manifest alongside HTML artifacts.
6. Run the manifest validator.
7. Present a contact sheet, mood board wall, or placement preview before applying files to the project.

### During Mood Board Generation (Capability 4)

Prefer **real generated images** over CSS placeholders when a generation tool is available. Keep CSS placeholders as fallback only.
When multiple generated assets exist, include a combination review area so the user can choose cross-role pairings, not just individual images.

### During Design System Extraction (Capability 1)

Add **Imagery strategy** and link to manifest paths in the design system document.
Also add the locked UI icon source, custom SVG fallback, illustrated icon preset, asset placement rules, validation status, and any user overrides to the icon system section.

### During Apply (Capability 5)

See [APPLY-DESIGN.md](APPLY-DESIGN.md) Step 3.5. Only copy assets the user confirmed.
Do not Apply a visual asset until manifest validation passes or the user explicitly accepts the listed issues.

---

## Accessibility and compliance

- **Decorative images**: `alt=""` or `role="presentation"`.
- **Informative images**: write `alt` from product context (manifest field).
- **User reference uploads**: remind the user they must have rights to use references.
- **Generated assets**: `license: ai-generated` in manifest; do not impersonate third-party brands.
- **No text in generated images** for copy that must be readable — set headlines in HTML/CSS instead.
- **Icon roles**: small UI chrome icons must remain accessible, themeable, and state-aware. Prefer vector for these; use raster only for explicitly approved expressive surfaces.

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

See [assets/examples/visual-asset-e2e.md](../assets/examples/visual-asset-e2e.md) and [assets/examples/design-assets.manifest.example.json](../assets/examples/design-assets.manifest.example.json) for a full Concept → Mood Board → Apply trace using a host image generation tool.

---

## Related references

- [MOOD-BOARD.md](MOOD-BOARD.md) — embedding generated imagery
- [APPLY-DESIGN.md](APPLY-DESIGN.md) — deploying manifest + files
- [ICON-USAGE.md](ICON-USAGE.md) — UI icons vs illustrated icons (P1)
- [AESTHETIC-ANALYSIS.md](AESTHETIC-ANALYSIS.md) — aesthetic source for prompts
- [design-system-template.md](../assets/design-system-template.md) — Visual Assets section
