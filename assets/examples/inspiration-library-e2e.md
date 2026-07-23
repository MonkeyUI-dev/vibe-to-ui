# Inspiration Library E2E walkthrough

Minimal path: **CLI add → agent Browser/Computer Use captures → enrich → preview → link → apply (confirm)**.

Paths use `~/.vibe-to-ui/inspirations/` so cases stay outside profiles and skill reinstall never touches them.

## 0. Preconditions

- vibe-to-ui skill installed; Node ≥18 for `bin/vibe-to-ui.js`
- For URL cases: host agent with Browser Use or Computer Use (Cursor / Claude Code / ChatGPT, etc.)
- Process can write `~/.vibe-to-ui`

## 1. Add from URL (CLI scaffolds; agent screenshots)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration add https://example.com
```

CLI creates `~/.vibe-to-ui/inspirations/<id>/` with `captureStatus: awaiting-agent`. It does **not** launch Chrome.

Agent then:

1. Opens the URL via Browser / Computer Use
2. Saves `fullpage.jpg` + `frame-01.jpg` … into `captures/`
3. Optionally: `inspiration import-captures <id> --from-captures <dir>` if files landed elsewhere
4. Enriches `analysis.md` / `annotations.json`
5. Runs `inspiration rebuild-preview <id>`

## 2. Or add from a local image

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration add --image ./shot.png
```

CLI copies the image into `captures/` and marks single-image analysis scope.

Expected tree:

```text
source.md
metadata.json
captures/
annotations.json
analysis.md
design-seed.md
preview.html
```

Open `preview.html`: wide = stage + annotation rail; narrow = rail below. Cards grow with text. ≤3 notes per frame.

## 3. Link to a profile (reference only)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile demo --init
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration link <id> --profile demo
```

Creates/updates `inspiration-refs.json` with `status: reference-only`. Does **not** copy captures into the profile.

## 4. Apply to a project (gated)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration apply <id> --project /path/to/app
# review, then:
node path/to/vibe-to-ui/bin/vibe-to-ui.js inspiration apply <id> --project /path/to/app --confirm
```

## Boundary checks

| Check | Expect |
|-------|--------|
| Case location | `~/.vibe-to-ui/inspirations/<id>/` only |
| URL screenshots | Agent Browser/Computer Use — not CLI Chrome |
| Profile | `inspiration-refs.json` pointer only |
| Duplicate add | Error unless `--refresh` / `--force` / `--as-new` |
| Apply without `--confirm` | No `DESIGN.md` write |
| Skill reinstall | Library + profiles untouched |
