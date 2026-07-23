# Page Direction E2E walkthrough

Minimal path: **search inspirations → init memory → agent 3 directions + HTML → record choice → DNA → Motion Engine → Apply**.

## 0. Preconditions

- Node ≥18; vibe-to-ui skill installed
- Optional: inspirations already under `~/.vibe-to-ui/inspirations/`
- Optional: Design Context profile for brand tokens

## 1. Init local memory

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js page-direction init --slug my-landing
node path/to/vibe-to-ui/bin/vibe-to-ui.js page-direction search editorial
```

## 2. Agent Page Direction tournament

Agent follows `references/PAGE-DIRECTION.md`:

1. Stage 0 + product/brand/current page + search hits
2. Diagnose ordinary
3. Write 3 direction cards into `session.md`
4. Emit 3 equal standalone HTML previews (no Motion Engine)
5. Pause — do not modify project

## 3. Record choice

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js page-direction record my-landing \
  --choice B \
  --reject A,C \
  --reason "Stronger proof moment; lower motion cost" \
  --inspirations example-com-2026-07-23
```

Also update project `DESIGN.md` Page Direction Candidates + Visual Direction + Decisions Log.

## 4. Compile + Router + Apply

1. Compile Spatial DNA + Motion DNA from B
2. Load Motion Engine Router — lowest sufficient tier
3. Full-page preview
4. User confirms → Capability 5 Apply

## Boundary checks

| Check | Expect |
|-------|--------|
| Before choice | No MOTION-ENGINE-ROUTER.md load |
| Memory path | `~/.vibe-to-ui/page-directions/<slug>/` |
| DESIGN.md | Candidates + choice mirrored |
| Apply | Only after full-page preview confirm |
