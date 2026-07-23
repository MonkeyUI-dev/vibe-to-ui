# Design Inspiration Library

## Overview

The **Inspiration Library** is a global, cross-project aesthetic archive under `~/.vibe-to-ui/inspirations/`. It turns URLs, screenshots, and saved references into readable, searchable, portable design knowledge that later agents can call.

It is **not** a Design Context profile feature. Profiles store confirmed brand language; the library stores external cases and judgments.

| Layer | Owns | Must not |
|-------|------|----------|
| **Inspiration Library** | External references, captures, aesthetic analysis, design seeds, HTML previews | Become the project source of truth |
| **Profile** (`~/.vibe-to-ui/profiles/<id>/`) | Confirmed brand master, tokens, decisions, medium targets | Store raw inspiration case files |
| **Project `DESIGN.md`** | User-confirmed conclusions for *this* repo | Auto-ingest unconfirmed inspiration |

**Explore → Preview → Apply** still holds: `add` / `list` / `show` / `link` analyze and produce standalone artifacts only. Project files and profile tokens are untouched until the user explicitly applies.

## Capture ownership (important)

**URL page screenshots are agent-owned**, not CLI-owned.

Hosts like Cursor, Claude Code, and ChatGPT already ship **Browser Use / Computer Use**. Those tools should:

1. Open the URL
2. Capture `fullpage` + consecutive viewport frames
3. Save files into `~/.vibe-to-ui/inspirations/<id>/captures/`

The vibe-to-ui CLI stays zero-dependency: it fetches HTML metadata, scaffolds analysis/preview, indexes captures, and manages link/apply lifecycle. It does **not** launch Chrome/Chromium.

| Source | Who captures |
|--------|----------------|
| `inspiration add <url>` | Agent Browser / Computer Use → write into `captures/` (or pass `--from-captures`) |
| `inspiration add --image` | CLI copies the local file into `captures/` |
| Refresh after agent drop | `inspiration rebuild-preview <id>` or `import-captures` |

## Storage

```text
~/.vibe-to-ui/
├── inspirations/
│   └── <inspiration-id>/
│       ├── source.md
│       ├── metadata.json
│       ├── captures/
│       │   ├── fullpage.jpg   # or .png — agent-provided for URLs
│       │   └── frame-01.jpg …
│       ├── annotations.json
│       ├── analysis.md
│       ├── design-seed.md
│       └── preview.html
└── profiles/
    └── <profile-id>/
        └── inspiration-refs.json   # references only — no copied cases
```

### Inspiration id

Stable, readable, collision-aware:

```text
langchain-home-2026-07-23
langchain-home-2026-07-23-v2
```

Default: `<host-and-path-slug>-YYYY-MM-DD`. Unless the user passes `--refresh` / `--force` / `--as-new` / `--id`, an existing source is **not** overwritten — the CLI prompts reuse, refresh, or a new version.

## CLI

```bash
vibe-to-ui inspiration add <url> [--from-captures <dir>] [--profile <id>] [--refresh|--force|--as-new]
vibe-to-ui inspiration add --image <path> [--profile <id>] …
vibe-to-ui inspiration list
vibe-to-ui inspiration show <id>
vibe-to-ui inspiration import-captures <id> --from-captures <dir>
vibe-to-ui inspiration rebuild-preview <id> [--profile <id>]
vibe-to-ui inspiration link <id> --profile <profile-id> [--rules "rule1,rule2"]
vibe-to-ui inspiration apply <id> --project <path>          # diff / preview only
vibe-to-ui inspiration apply <id> --project <path> --confirm
```

| Command | Behavior |
|---------|----------|
| `add <url>` | Fetch title/meta; prepare `captures/` for agent screenshots; scaffold analysis + `preview.html` (`captureStatus: awaiting-agent`) |
| `add <url> --from-captures` | Same, but import agent screenshots immediately |
| `add --image` | Copy image into `captures/`, mark analysis scope as **single-image only** |
| `import-captures` | Copy agent files into an existing case and rebuild preview |
| `rebuild-preview` | Re-index `captures/` and regenerate `preview.html` |
| `list` / `show` | Read-only summaries |
| `link` | Profile `inspiration-refs.json` with `reference-only` — **no case copy**, no token rewrite |
| `apply` | Print proposed `DESIGN.md` merge; write only with `--confirm` |

Optional `--profile` on `add` / `rebuild-preview` themes the preview from that profile’s `tokens.json` (`paper`, `ink`, `signal`, `surface`). Without a profile, vibe-to-ui default preview tokens are used. **`signal` marks the active evidence only** — never as decoration.

## Agent capture playbook

When the user asks to add a URL to the Inspiration Library:

```text
1. vibe-to-ui inspiration add <url>          # creates id + scaffold
2. Browser Use / Computer Use:
   - load the page
   - save fullpage.jpg (or longest useful scroll)
   - save frame-01.jpg, frame-02.jpg, … (consecutive viewports)
   - write into ~/.vibe-to-ui/inspirations/<id>/captures/
3. Enrich analysis.md + annotations.json from those captures
4. vibe-to-ui inspiration rebuild-preview <id>
5. Optionally link / apply after user confirmation
```

Follow selective-capture sizing guidance in [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md). Prefer WebP/JPEG at preview width (~960–1440px).

## Analysis contract

Every inspiration must classify **page type**: `landing` / `dashboard` / `workbench` / `docs` / `consumer-app` / `other`.

Aesthetic focus — not feature docs. Cover at least **four** of these six:

1. Composition & visual hierarchy
2. Color & value
3. Typography & typesetting
4. Space & component language
5. Visual evidence (credibility)
6. Page narrative

Artifacts:

| File | Role |
|------|------|
| `analysis.md` | Human-readable case breakdown |
| `annotations.json` | Structured frames, anchors, labels, categories, transferable rules |
| `design-seed.md` | Candidate `DESIGN.md` merge: Page Context, Visual Direction, Colors, Typography, Do’s/Don’ts, transferable rules, do-not-copy |
| `preview.html` | Responsive DOM preview (screenshots as base only) |

Every claim should be tagged:

- `observed` — directly seen
- `inferred` — design inference from observation
- `transferable` — portable rule
- `brand-specific` — do not copy

### CLI vs agent

| Layer | CLI | Agent |
|-------|-----|-------|
| Metadata / id / folders | Yes | — |
| HTML title / CSS var heuristics | Yes | Deepen |
| URL screenshots | No (await agent) | Browser / Computer Use |
| Aesthetic analysis at medium+ confidence | Scaffold only | Required before apply |
| `preview.html` assembly | Yes | Enrich annotations first |

## `preview.html` rules

- Native responsive HTML — **not** a flattened annotated PNG
- Screenshots are base images only
- Numbered anchors + annotation cards are DOM/CSS
- Wide: stage + right annotation rail
- Narrow: rail stacks under the stage
- Cards grow with content — **no fixed height**, no clipping
- Max **3** annotations per frame
- Prefer aesthetic judgments over repeating UI copy

## Link semantics

`inspiration link` records:

```json
{
  "version": 1,
  "links": [
    {
      "inspirationId": "example-com-2026-07-23",
      "linkedAt": "…",
      "status": "reference-only",
      "transferableRules": ["…"],
      "notes": "…"
    }
  ]
}
```

Default status `reference-only` means agents may *consult* the case while working in that profile — they must not auto-rewrite tokens or project `DESIGN.md`.

## Apply gate

1. Show the proposed `DESIGN.md` diff/preview (`apply` without `--confirm`)
2. Write only after explicit user confirmation (`--confirm` or an equivalent clear user instruction in chat)
3. Prefer merging transferable sections; keep brand-specific exclusions visible

## Boundary checklist

```text
[ ] Case lives under ~/.vibe-to-ui/inspirations/ — not under profiles/
[ ] Profile only holds inspiration-refs.json pointers
[ ] URL captures come from agent Browser/Computer Use — not CLI Chrome
[ ] preview.html is DOM/CSS annotated, responsive, ≤3 notes per frame
[ ] analysis distinguishes observed / inferred / transferable / brand-specific
[ ] design-seed.md is candidate-only until apply --confirm
[ ] Skill install/update never touches ~/.vibe-to-ui/
```
