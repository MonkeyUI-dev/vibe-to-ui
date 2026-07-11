# Inspiration Sources (URL-first intake)

## Why this exists

Users often want a live website as inspiration or as a concrete UI reference. Uploading a full-page screenshot is a poor default:

- Large images (multi‑MB) waste context and force the user to compress manually
- Static captures miss scroll choreography, hover states, and timed motion
- Frontend tokens (CSS variables, font links, motion libraries) are easier to read from the live page than to guess from pixels

**Prefer a public URL** whenever the user can share one. Accept screenshots and images when a URL is unavailable, private, or blocked — but do not ask for a full-page upload first if a link would work.

This playbook is shared by Design System Extraction, Design Exploration, Spatial Vibe, Aesthetic Analysis, Motion System, Mood Board, and Design Context. Design Context’s `--from-url` is the same intake, persisted under `~/.vibe-to-ui/`.

## Accepted source kinds

| Kind | Examples | Typical use |
|------|----------|-------------|
| **Live page URL** | `https://example.com`, deep links, docs, landing pages | Preferred for concrete UI / brand / motion references |
| **Screenshot / mockup** | PNG/WebP of a UI, Figma export | When the page is private, gated, or tools cannot browse |
| **Atmosphere image** | Photo, packaging, magazine, film still | Vibe translation (not structure cloning) |
| **Music / audio** | Clip, hum, song description | Energy, tempo, texture → visual + motion axes |
| **Local project / codebase** | Repo the agent already has open | Highest fidelity for structure + tokens |

Sources can mix. When both a URL and vibe images are present, keep **Reference Priority Rules** from [SKILL.md](../SKILL.md): concrete UI / live page fidelity first, atmosphere second.

## Preference order

1. **URL** (or local project) the agent can visit or open
2. **Selective captures** the agent takes after visiting (hero, one section, one component) — small, cropped, compressed
3. **User-provided screenshot** — ask for this only after URL intake fails or is incomplete
4. **User description only** — proceed with low confidence and say so

Never ask the user to compress a 10 MB full-page screenshot when a URL would let the agent do the work.

## URL intake workflow

When the user shares a website link (as inspiration, restoration reference, structure reference, or Design Context source):

### 1. Resolve access

- Use host tools that are available: browser / computer-use, `WebFetch` / HTTP fetch, or MCP browse tools.
- Prefer the exact URL given (including path and hash). If redirected, record the final URL.
- If auth, paywall, bot block, or empty shell (client-only with no SSR) blocks access: say so, try one alternate (e.g. `view-source` / HTML fetch / public CDN assets), then fall back to selective capture request or user screenshot — **not** a demand for a giant full-bleed upload.

### 2. Read the frontend (structure + tokens)

Inspect what the tools allow, in this order of usefulness:

- **Document structure**: landmark regions, section order, nav model, hero vs dense modules
- **Styles**: CSS custom properties, linked stylesheets, inline theme tokens, font-face / Google Fonts / adobe links
- **Typography & spacing cues**: computed font families, type scale clues, spacing rhythm from layout
- **Motion hooks**: CSS `@keyframes` / `transition` / `animation`, scroll libraries, `data-` motion attributes, Framer / GSAP / Lottie hints in scripts
- **Assets**: logo SVGs, OG image, key hero media URLs (download selectively into a working folder if needed)

Summarize findings in prose or a short structured note. Do **not** paste entire minified bundles into the conversation.

### 3. Capture visuals selectively (only when needed)

Take screenshots or crops **after** reading structure, and only for what analysis still needs:

| Capture | When |
|---------|------|
| Above-the-fold / hero | Hierarchy, brand mark, primary CTA, imagery treatment |
| One mid-page section | Module pattern, density, card vs open layout |
| One interactive control | Button/input surface language |
| Mobile viewport (optional) | Responsive collapse, if tools allow resize |

Rules:

- Prefer **cropped regions** over full-page mosaics
- Prefer **WebP/JPEG at preview size** (~960px long edge) for analysis; avoid shipping multi‑MB PNGs into context
- Store durable captures under a working path or, for Design Context, under `~/.vibe-to-ui/profiles/<profile>/sources/` / `assets/`
- Cite which URL + viewport produced each capture

### 4. Observe motion when tools allow

If the host can interact with the live page, spend a short observation pass:

1. Load → note entrance / page-load motion
2. Scroll through 1–2 screens → in-view reveals, parallax, sticky transforms, scroll-linked timing
3. Hover primary controls → micro-feedback
4. Optional: open one modal/drawer or tab if obvious
5. Check `prefers-reduced-motion` behavior when the tool can toggle it

Record Motion DNA signals for [MOTION-SYSTEM.md](MOTION-SYSTEM.md): roles, triggers, tempo, easing character, density, signature motif. If the agent cannot interact, infer cautiously from CSS/JS motion hints and mark **low confidence** — do not invent cinematic motion the page does not show.

### 5. Hand off into the active capability

| Capability | How to use the intake |
|------------|------------------------|
| Design System Extraction | Stage 0 from live structure + styles; tokens from CSS when reliable, visuals from selective captures |
| Design Exploration | Treat URL as concrete UI reference for 3 product-aware directions (unless user asked for exact restoration) |
| Spatial Vibe | Structure references from DOM/section order; vibe still from atmosphere sources |
| Aesthetic Analysis | Soul/principles from observed page + selective visuals (not “image only”) |
| Motion System | Prefer live observation; fall back to CSS/JS + static cues |
| Mood Board | Embed selective captures or OG/hero assets; avoid dumping full-page screenshots |
| Design Context | Same intake, then persist under profile `sources/` via `--from-url` |

## Anti-patterns

- Asking for a full-page screenshot before trying the URL
- Dumping multi‑MB images into context when a link exists
- Pasting entire HTML/JS bundles instead of extracting tokens and structure
- Claiming motion personality from a static crop without noting confidence
- Cloning copyrighted brand assets into the user’s product without adaptation (inspiration ≠ pixel theft)
- Treating every URL as a Design Context profile write — only persist when the user asks to save a profile

## Fallback ladder (copy into decisions / notes)

```text
URL browse OK → read CSS/DOM → selective captures → optional motion pass → analyze
URL HTML only → tokens/structure from markup/CSS → ask for one cropped screenshot if visuals ambiguous
URL blocked → ask for 1–2 cropped screenshots (hero + one section), not a 10MB full page
Description only → proceed with low confidence; offer to retry when a URL or crop is available
```

## Quick checklist

```text
[ ] User offered a URL → agent visits before asking for uploads
[ ] Frontend tokens/structure skimmed without dumping full source
[ ] Visuals are selective, cropped, and reasonably sized
[ ] Motion observed or explicitly marked low-confidence
[ ] Intake results feed the active capability (not a parallel undocumented path)
[ ] Design Context persistence only when requested (--from-url / save profile)
```
