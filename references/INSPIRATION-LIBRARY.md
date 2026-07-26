# Design Inspiration Library

## Overview

The **Inspiration Library** is a global, cross-project aesthetic archive under `~/.vibe-to-ui/inspirations/`. It turns product sites (multiple URLs/pages), screenshots, and saved references into readable, searchable, portable design knowledge.

It is **not** a Design Context profile feature. Profiles store confirmed brand language; the library stores external **products** and page-level judgments.

| Layer | Owns | Must not |
|-------|------|----------|
| **Inspiration Library** | External products, pages, captures, aesthetic + motion analysis, design seeds, HTML previews | Become the project source of truth |
| **Profile** (`~/.vibe-to-ui/profiles/<id>/`) | Confirmed brand master, tokens, decisions, medium targets | Store raw inspiration case files |
| **Project `DESIGN.md`** | User-confirmed conclusions for *this* repo | Auto-ingest unconfirmed inspiration |

**Explore → Preview → Apply** still holds: `add` / `list` / `show` / `link` analyze and produce standalone artifacts only. Project files and profile tokens are untouched until the user explicitly applies.

## Unit of storage: product → pages

One **product folder** holds many **pages**. A URL is a page inside a product — not a top-level library root.

```text
~/.vibe-to-ui/
├── inspirations/
│   └── <product>/                    # e.g. langchain
│       ├── metadata.json             # kind: product
│       ├── product.md                # cross-page visual positioning
│       ├── design-seed.md            # default apply target
│       ├── preview.html              # product index
│       └── pages/
│           └── <page>/               # e.g. home, docs, pricing
│               ├── source.md
│               ├── metadata.json     # kind: page
│               ├── captures/         # fullpage + consecutive frames
│               ├── annotations.json
│               ├── analysis.md       # full-scroll visual positioning
│               ├── motion.md         # Motion DNA
│               ├── design-seed.md    # optional --page apply
│               └── preview.html
└── profiles/
    └── <profile-id>/
        └── inspiration-refs.json     # product id pointers only
```

| Concept | Id examples | Role |
|---------|-------------|------|
| **Product** | `langchain`, `stripe` | Cross-page visual DNA; default `link` / `apply` |
| **Page** | `langchain/home`, `langchain/docs` | One URL (or image); **full-scroll** analysis required |

Defaults on `add <url>`:

- **product** ← host slug (`langchain.com` → `langchain`; `docs.langchain.com` → `langchain` when subdomain is docs/app/blog/…)
- **page** ← path slug (`/` → `home`; `/pricing` → `pricing`)
- Override with `--product` / `--page`

## Capture ownership (important)

**URL page screenshots are agent-owned**, not CLI-owned.

Hosts like Cursor, Claude Code, and ChatGPT already ship **Browser Use / Computer Use**. Those tools should:

1. Open the page URL
2. Capture **full-scroll coverage** (required for every URL page)
3. Save files into `~/.vibe-to-ui/inspirations/<product>/pages/<page>/captures/`
4. Observe motion when tools allow → enrich `motion.md`

The vibe-to-ui CLI stays zero-dependency: it fetches HTML metadata, scaffolds analysis/preview, indexes captures, and manages link/apply lifecycle. It does **not** launch Chrome/Chromium.

| Source | Who captures |
|--------|----------------|
| `inspiration add <url>` | Agent Browser / Computer Use → write into page `captures/` (or `--from-captures`) |
| `inspiration add --image` | CLI copies the local file into page `captures/` (image-only scope) |
| Refresh after agent drop | `inspiration rebuild-preview <product>/<page>` then `rebuild-product <product>` |

## Full-scroll coverage (every URL page)

Hero-only captures are **incomplete**. For each URL page analysis:

1. `fullpage.jpg` (or `.png`) — longest useful full-page / scroll mosaic
2. `frame-01.jpg`, `frame-02.jpg`, … — **consecutive** viewport screens from the top until the page end
3. Short **motion** pass when tools allow (load → scroll → hover) → `motion.md`
4. In `analysis.md`, fill the **Full-scroll visual positioning** table; mark claims `observed` only when a frame covers that band

CLI heuristic: `captureCoverage: full-scroll` when `fullpage` + ≥2 viewport frames exist. The agent must still confirm frames reach the true page end before treating mid/lower bands as observed.

Prefer WebP/JPEG at preview width (~960–1440px). Avoid multi‑MB PNG dumps when possible.

## Product-level multi-page positioning

When the site has multiple public surfaces, collect **2–4 representative pages** under the same product (e.g. home, docs, app, pricing). Then:

1. Enrich each page (full-scroll + motion)
2. `vibe-to-ui inspiration rebuild-product <product>` — refresh `product.md` + product `design-seed.md` + product `preview.html`

`product.md` synthesizes **cross-page visual DNA** (shared canvas, type, component language, motion personality, and what varies by page type).

## CLI

```bash
vibe-to-ui inspiration add <url> [--product <id>] [--page <slug>] [--from-captures <dir>] [--profile <id>] [--refresh|--force|--as-new]
vibe-to-ui inspiration add --image <path> [--product <id>] [--page <slug>] …
vibe-to-ui inspiration list
vibe-to-ui inspiration show <product>[/<page>]
vibe-to-ui inspiration import-captures <product>/<page> --from-captures <dir>
vibe-to-ui inspiration rebuild-preview <product>/<page>   # also refreshes product index
vibe-to-ui inspiration rebuild-product <product>
vibe-to-ui inspiration link <product> --profile <profile-id> [--rules "rule1,rule2"]
vibe-to-ui inspiration apply <product> --project <path>                    # product seed (default)
vibe-to-ui inspiration apply <product> --page <slug> --project <path>      # single page
vibe-to-ui inspiration apply <product> --project <path> --confirm
```

| Command | Behavior |
|---------|----------|
| `add <url>` | Resolve product + page; fetch title/meta; prepare captures; scaffold page + refresh product index |
| `add --image` | Copy image into page `captures/`; analysis scope **single-image only** |
| `import-captures` | Copy agent files into a page and rebuild preview |
| `rebuild-preview` | Re-index page captures; regenerate page `preview.html`; refresh product artifacts |
| `rebuild-product` | Rebuild product.md / design-seed / preview from current pages |
| `list` / `show` | Products (with page list) or `product/page` detail |
| `link` | Profile `inspiration-refs.json` with **product** id — `reference-only` |
| `apply` | Default: product `design-seed.md`. Optional `--page` for page seed. Write only with `--confirm` |

Optional `--profile` themes previews from that profile’s `tokens.json`. **`signal` marks active evidence only**.

## Agent capture playbook

When the user asks to add a URL (or deepen a product):

```text
1. vibe-to-ui inspiration add <url> [--product <id>] [--page <slug>]
2. Browser Use / Computer Use on that page:
   - fullpage.jpg
   - frame-01…N consecutive viewports through page end
   - motion observation → motion.md
   - write into ~/.vibe-to-ui/inspirations/<product>/pages/<page>/captures/
3. Enrich analysis.md + annotations.json from those captures (full-scroll table)
   - **Language**: match the **user's prompt language** for all agent-written text in `analysis.md`, `annotations.json` (synthesis trait titles/bodies, frame note labels/bodies, seed fields), `motion.md`, and `design-seed.md`. Chinese prompt → Chinese judgments; English prompt → English. Do **not** default to the source page locale (e.g. `/zh`) or CLI scaffold language when the user wrote in another language.
   - **Required for preview top panel**: fill `annotations.json` → `synthesis` (MOOD/COMPOSITION/TYPE/COLOR/EVIDENCE/RHYTHM traits + seed). Remove `status: "scaffold"` or omit it when done — `analysis.md` alone does not feed `preview.html`.
   - **Required per viewport frame**: every `frame-01…N` must have **1–3** aesthetic notes before treating enrichment as complete. Do not leave mid/lower frames as capture-only. `fullpage` may stay annotation-free (overview mosaic).
4. vibe-to-ui inspiration rebuild-preview <product>/<page>
5. Optionally add more URLs under the same --product
6. vibe-to-ui inspiration rebuild-product <product>
7. link / apply at product level after user confirmation
```

## Analysis contract

### Page

Every page must classify **page type**: `landing` / `dashboard` / `workbench` / `docs` / `consumer-app` / `other`.

Aesthetic focus — not feature docs. Cover at least **four** of these six:

1. Composition & visual hierarchy
2. Color & value
3. Typography & typesetting
4. Space & component language
5. Visual evidence (credibility)
6. Page narrative

Plus **motion** in `motion.md` when the source is a live URL.

Every claim should be tagged:

- `observed` — directly seen in a covering capture
- `inferred` — design inference from observation
- `transferable` — portable rule
- `brand-specific` — do not copy

**Language**: Agent-written library content must match the **user's prompt language** — `analysis.md`, `annotations.json` (synthesis + frame notes + seed), `motion.md`, and `design-seed.md`. The generated `preview.html` readable conclusions follow the same rule. Fixed taxonomy keys may stay English (`MOOD`, `COMPOSITION`, `observed`, CLI preview eyebrows); enriched titles, bodies, and seeds do not. Source page `<title>` and captured UI copy may stay in the site language. CLI scaffolds ship in English until the agent replaces them.

### Product

`product.md` / product `design-seed.md` synthesize shared DNA and page-type variance. Do not treat one hero screenshot as the whole product.

### CLI vs agent

| Layer | CLI | Agent |
|-------|-----|-------|
| Product/page folders + ids | Yes | — |
| HTML title / CSS var heuristics | Yes | Deepen |
| URL screenshots | No (await agent) | Browser / Computer Use — **full-scroll** |
| Motion observation | Scaffold `motion.md` | Required when tools allow |
| Aesthetic analysis at medium+ confidence | Scaffold only | Required before apply — include `annotations.json` `synthesis`, not only `analysis.md` |
| Product synthesis | `rebuild-product` scaffold | Enrich cross-page DNA |
| `preview.html` assembly | Yes | Enrich annotations first |

## `preview.html` rules

### Page preview

- Native responsive HTML — **not** a flattened annotated PNG
- Screenshots are base images only
- Numbered anchors + annotation cards are DOM/CSS
- Wide: stage + right annotation rail
- Narrow: rail stacks under the stage
- Cards grow with content — **no fixed height**, no clipping
- **Every viewport frame** (`frame-01…N`) must have **at least 1** annotation after enrichment; max **3** per frame
- Prefer aesthetic judgments over repeating UI copy
- Annotate **every consecutive viewport** through page end — not only the hero or a few representative bands. `fullpage` may omit anchors
- **Readable text language** follows the user's prompt (synthesis + frame notes); fixed trait category labels (`MOOD`, `COMPOSITION`, …) and kind tags (`observed`, …) stay English

### Product preview

- Index table of pages + coverage status
- Links into each page `preview.html`

## Link semantics

`inspiration link <product>` records:

```json
{
  "version": 1,
  "links": [
    {
      "inspirationId": "langchain",
      "linkedAt": "…",
      "status": "reference-only",
      "transferableRules": ["…"],
      "notes": "…"
    }
  ]
}
```

Default status `reference-only` means agents may *consult* the product while working in that profile — they must not auto-rewrite tokens or project `DESIGN.md`.

## Apply gate

1. Default seed is **product** `design-seed.md`
2. Show the proposed `DESIGN.md` diff/preview (`apply` without `--confirm`)
3. Write only after explicit user confirmation (`--confirm` or clear chat instruction)
4. Use `--page <slug>` only when intentionally applying a single page seed

## Boundary checklist

```text
[ ] Cases live under ~/.vibe-to-ui/inspirations/<product>/pages/… — not under profiles/
[ ] Profile only holds inspiration-refs.json pointers to **product** ids
[ ] URL captures come from agent Browser/Computer Use — not CLI Chrome
[ ] Every URL page aims for full-scroll coverage before mid-page "observed" claims
[ ] Page preview.html is DOM/CSS annotated, responsive; every viewport frame has 1–3 notes (fullpage optional)
[ ] analysis distinguishes observed / inferred / transferable / brand-specific
[ ] Default apply uses product design-seed.md; gated by --confirm
[ ] Skill install/update never touches ~/.vibe-to-ui/
[ ] Optional Git remote sync (`context sync`) includes inspirations/ alongside profiles/
```
