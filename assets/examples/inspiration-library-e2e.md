# Inspiration Library E2E walkthrough

Minimal path: **CLI add → agent full-scroll captures → enrich → page preview → product synthesis → link → apply (confirm)**.

Paths use `~/.vibe-to-ui/inspirations/<product>/` so cases stay outside profiles and skill reinstall never touches them.

## 0. Preconditions

- vibe-to-ui skill installed; Node ≥18 for `bin/vibe-to-ui.js`
- For URL cases: host agent with Browser Use or Computer Use (Cursor / Claude Code / ChatGPT, etc.)
- Process can write `~/.vibe-to-ui`

## 1. Add from URL (CLI scaffolds; agent screenshots)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration add https://example.com
# optional overrides:
#   --product example --page home
```

CLI creates `~/.vibe-to-ui/inspirations/<product>/pages/<page>/` with `captureCoverage: awaiting-agent`, plus product index files. It does **not** launch Chrome.

Agent then:

1. Opens the URL via Browser / Computer Use
2. Saves **full-scroll** captures into that page’s `captures/`:
   - `fullpage.jpg`
   - `frame-01.jpg` … `frame-0N.jpg` consecutive viewports through page end
3. Fills `motion.md` from a short live observation pass
4. Enriches `analysis.md` / `annotations.json` (full-scroll positioning table)
5. Runs `inspiration rebuild-preview <product>/<page>`
6. Optionally adds more URLs under the same `--product`, then `inspiration rebuild-product <product>`

## 2. Or add from a local image

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration add --image ./shot.png --product mood --page shot
```

CLI copies the image into the page `captures/` and marks single-image analysis scope.

Expected tree:

```text
inspirations/<product>/
  metadata.json
  product.md
  design-seed.md
  preview.html
  pages/<page>/
    source.md
    metadata.json
    captures/
    annotations.json
    analysis.md
    motion.md
    design-seed.md
    preview.html
```

Open page `preview.html`: wide = stage + annotation rail; narrow = rail below. Cards grow with text. Every viewport frame (`frame-01…N`) has 1–3 notes; `fullpage` may stay annotation-free.

## 3. Link to a profile (reference only)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile demo --init
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration link <product> --profile demo
```

Creates/updates `inspiration-refs.json` with the **product** id and `status: reference-only`. Does **not** copy captures into the profile.

## 4. Apply to a project (gated; product seed by default)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration apply <product> --project /path/to/app
# review, then:
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration apply <product> --project /path/to/app --confirm
# optional single page:
# vibe-to-ui inspiration apply <product> --page home --project /path/to/app --confirm
```

## Boundary checks

| Check | Expect |
|-------|--------|
| Case location | `~/.vibe-to-ui/inspirations/<product>/pages/<page>/` |
| URL screenshots | Agent Browser/Computer Use — full-scroll — not CLI Chrome |
| Product apply | Default seed is product `design-seed.md` |
| Profile | `inspiration-refs.json` product pointer only |
| Duplicate add | Error unless `--refresh` / `--force` / `--as-new` |
| Apply without `--confirm` | No `DESIGN.md` write |
| Skill reinstall | Library + profiles untouched |
