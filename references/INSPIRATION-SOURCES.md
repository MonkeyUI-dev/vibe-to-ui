# Inspiration Sources

## Why this exists

Inspiration can arrive as a website URL, a screenshot, a mood photo, music, a local project, or a fuzzy description. **None of these is privileged.** The agent adapts to whatever the user actually provides — and may combine multiple kinds in one turn.

A **website URL** is one valid source among others. When the user *does* share a link, this playbook describes how to use it well: visit the page, read frontend cues, take selective captures if needed, and observe motion when tools allow. That avoids forcing the user to upload a multi‑MB full-page screenshot just because a live page was involved — but it does **not** mean the agent should steer every workflow toward URLs.

This playbook is shared by Design System Extraction, Design Exploration, Spatial Vibe, Aesthetic Analysis, Motion System, Mood Board, Design Context, and the Inspiration Library. Design Context’s `--from-url` is the same URL intake, persisted under a profile. Inspiration Library `add <url>` uses the same intake ideas but stores cases under `~/.vibe-to-ui/inspirations/` — see [INSPIRATION-LIBRARY.md](INSPIRATION-LIBRARY.md).

## Accepted source kinds (equal options)

| Kind | Examples | Typical use when the user provides it |
|------|----------|---------------------------------------|
| **Live page URL** | `https://example.com`, deep links, docs, landing pages | Concrete UI / brand / motion from a public page |
| **Screenshot / mockup** | PNG/WebP of a UI, Figma export | Concrete UI when the user uploads or pastes an image |
| **Atmosphere image** | Photo, packaging, magazine, film still | Vibe translation (not structure cloning) |
| **Music / audio** | Clip, hum, song description | Energy, tempo, texture → visual + motion axes |
| **Local project / codebase** | Repo the agent already has open | Structure + tokens from code the user is working in |
| **Description only** | Words, anti-references, feelings | Proceed with explicit confidence limits |

Sources can mix. When both a concrete UI reference (URL, screenshot, or local project) and vibe images are present, keep **Reference Priority Rules** from [SKILL.md](../SKILL.md): concrete UI fidelity first, atmosphere second. That rule is about *signal role*, not about ranking URL above screenshot.

## Adapt to what the user provided

| User provides | Agent does |
|---------------|------------|
| URL (alone or with other sources) | Run [URL intake](#url-intake-workflow) for that link; merge with any images/music they also shared |
| Screenshot / mockup | Analyze the image directly; do not ask for a URL first |
| Atmosphere images / music | Vibe translation path; do not insist on a live site |
| Local project | Read project UI/code; URL/screenshot optional |
| Mix | Use each source for what it is good at; state how they were weighted |
| Nothing concrete yet | Invite options neutrally (URL, image, music, description) — let the user choose |

Do **not** reframe the user’s screenshot as “you should have sent a URL instead.” Do **not** skip a provided image to go fetch a URL they did not ask you to use.

## URL intake workflow

Run this **only when the user shared a website link** (as inspiration, restoration reference, structure reference, or Design Context source).

### 1. Resolve access

- Use host tools that are available: browser / computer-use, `WebFetch` / HTTP fetch, or MCP browse tools.
- Use the exact URL given (including path and hash). If redirected, record the final URL.
- If auth, paywall, bot block, or empty shell (client-only with no SSR) blocks access: say so, try one alternate (e.g. HTML fetch / public CDN assets), then ask whether they want to provide a screenshot or continue with partial confidence — **not** a demand for a giant full-bleed upload.

### 2. Read the frontend (structure + tokens)

Inspect what the tools allow, in this order of usefulness:

- **Document structure**: landmark regions, section order, nav model, hero vs dense modules
- **Styles**: CSS custom properties, linked stylesheets, inline theme tokens, font-face / Google Fonts / adobe links
- **Typography & spacing cues**: computed font families, type scale clues, spacing rhythm from layout
- **Motion hooks**: CSS `@keyframes` / `transition` / `animation`, scroll libraries, `data-` motion attributes, Framer / GSAP / Lottie hints in scripts
- **Assets**: logo SVGs, OG image, key hero media URLs (download selectively into a working folder if needed)

Summarize findings in prose or a short structured note. Do **not** paste entire minified bundles into the conversation.

### 3. Capture visuals

**Inspiration Library (Capability 8)** — **full-scroll coverage is required** for every URL page:

| Capture | Requirement |
|---------|-------------|
| `fullpage` | Longest useful full-page / scroll mosaic |
| `frame-01…N` | **Consecutive** viewports from top until page end |
| Motion pass | Load / scroll / hover → page `motion.md` (when tools allow) |

Do not stop at the hero. Mid/lower bands must not be marked `observed` without a covering frame. Store under `~/.vibe-to-ui/inspirations/<product>/pages/<page>/captures/`. Prefer WebP/JPEG at preview size (~960–1440px wide).

**Other capabilities** (extraction, exploration, mood board, Design Context) may still capture **selectively** after reading structure:

| Capture | When |
|---------|------|
| Above-the-fold / hero | Hierarchy, brand mark, primary CTA, imagery treatment |
| One mid-page section | Module pattern, density, card vs open layout |
| One interactive control | Button/input surface language |
| Mobile viewport (optional) | Responsive collapse, if tools allow resize |

Rules for selective mode:

- Prefer **cropped regions** over dumping every pixel into chat context
- Prefer **WebP/JPEG at preview size** (~960px long edge); avoid multi‑MB PNGs
- Store durable captures under a working path or, for Design Context, under `~/.vibe-to-ui/profiles/<profile>/sources/` / `assets/`
- Cite which URL + viewport produced each capture

### 4. Observe motion when tools allow

If the host can interact with the live page, spend a short observation pass:

1. Load → note entrance / page-load motion
2. Scroll through screens covering the page (Inspiration Library: through page end; other capabilities: 1–2 screens minimum)
3. Hover primary controls → micro-feedback
4. Optional: open one modal/drawer or tab if obvious
5. Check `prefers-reduced-motion` behavior when the tool can toggle it

Record Motion DNA signals for [MOTION-SYSTEM.md](MOTION-SYSTEM.md): roles, triggers, tempo, easing character, density, signature motif. For Inspiration Library pages, persist into `motion.md`. If the agent cannot interact, infer cautiously from CSS/JS motion hints and mark **low confidence** — do not invent cinematic motion the page does not show.

### 5. Hand off into the active capability

| Capability | How to use URL intake (when a URL was provided) |
|------------|--------------------------------------------------|
| Design System Extraction | Stage 0 from live structure + styles; tokens from CSS when reliable, visuals from selective captures |
| Design Exploration | Treat URL as a concrete UI reference for 3 product-aware directions (unless user asked for exact restoration) |
| Spatial Vibe | Structure references from DOM/section order; vibe still from atmosphere sources |
| Aesthetic Analysis | Soul/principles from observed page + selective visuals |
| Motion System | Live observation when possible; else CSS/JS + static cues with confidence notes |
| Mood Board | Embed selective captures or OG/hero assets; avoid dumping full-page screenshots |
| Design Context | Same intake, then persist under profile `sources/` via `--from-url` |
| Inspiration Library | Persist under `~/.vibe-to-ui/inspirations/<product>/pages/<page>/` via `inspiration add`. **Full-scroll** captures + motion; product-level synthesis via `rebuild-product`. **Screenshots**: host Browser / Computer Use — CLI does not drive a browser. Never copy into a profile. Default `apply` / `link` use the **product** id |

## Anti-patterns

- Treating URL as the default or “preferred” inspiration channel across capabilities
- Asking for a URL when the user already gave a screenshot, music, or description
- Asking for a full-page screenshot before trying a URL *the user already provided*
- Dumping multi‑MB images into chat when preview-sized frames suffice (still capture full-scroll to disk for Inspiration Library)
- Stopping Inspiration Library URL analysis at the hero while claiming full-page visual positioning
- Pasting entire HTML/JS bundles instead of extracting tokens and structure
- Claiming motion personality from a static crop without noting confidence
- Cloning copyrighted brand assets into the user’s product without adaptation (inspiration ≠ pixel theft)
- Treating every URL as a Design Context profile write — only persist when the user asks to save a profile
- Creating one library root per URL when pages belong to the same product — group under `--product`

## When a provided URL cannot be fully used

```text
URL browse OK → read CSS/DOM → captures (Library: full-scroll; else selective) → motion pass → analyze
URL HTML only → tokens/structure from markup/CSS → ask for screenshots only if visuals stay ambiguous
URL blocked → offer options: screenshot(s), continue partial, or different source — user chooses
Screenshot / image provided → analyze it; URL optional, never required
Description only → proceed with low confidence; invite any source kind the user prefers
```

## Quick checklist

```text
[ ] Intake matches what the user actually sent (URL, image, music, project, mix)
[ ] URL workflow runs only when a link was provided — not as a global default
[ ] Frontend tokens/structure skimmed without dumping full source
[ ] Inspiration Library pages: full-scroll frames on disk + motion.md when tools allow
[ ] Other capabilities: selective, reasonably sized captures when needed
[ ] Motion observed or explicitly marked low-confidence
[ ] Library pages grouped under a product folder; apply/link default to product
[ ] Intake results feed the active capability
[ ] Design Context persistence only when requested (--from-url / save profile)
```
