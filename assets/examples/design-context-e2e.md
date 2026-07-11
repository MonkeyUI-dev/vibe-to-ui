# Design Context E2E walkthrough

Minimal path: **source → local profile → on-demand target → merged handoff**.

This is documentation for agents and humans. It does not run as a script. Paths use `~/.vibe-to-ui/` so skill reinstall never touches user data.

## 0. Preconditions

- vibe-to-ui skill is installed (e.g. `npx skills add ...`).
- User can provide a **website URL** and/or a **screenshot**.
- Agent has filesystem write access to the user home directory.

## 1. Create a profile from a URL (or screenshot)

User:

```text
vibe-to-ui context --profile vibe-to-ui --from-url https://vibe-to-ui.example
```

or:

```text
Extract design context from this screenshot into profile "vibe-to-ui"
```

Agent:

1. Create `~/.vibe-to-ui/profiles/vibe-to-ui/` with `assets/` and `sources/` (no `targets/` yet).
2. Copy **shared** seed templates only (`profile.md`, `brand.md`, `tokens.json`, `decisions.md`) from the skill's `assets/design-context/` — do not copy `targets/` at init.
3. For a URL: follow [INSPIRATION-SOURCES.md](../../references/INSPIRATION-SOURCES.md) — browse/fetch, read frontend cues, selective captures, optional motion observation. Record under `sources/`. For a screenshot-only request, analyze the image directly (URL not required).
4. Reuse Design System Extraction + optional Aesthetic Analysis to fill:
   - `profile.md`
   - `brand.md`
   - `tokens.json`
   - `decisions.md` (append initial extraction)
5. Copy durable visuals (logo, key stills / selective captures) into `assets/` when available.
6. Tell the user the profile path and that targets are not generated yet.

Expected tree:

```text
~/.vibe-to-ui/profiles/vibe-to-ui/
├── profile.md
├── brand.md
├── tokens.json
├── decisions.md
├── assets/
└── sources/
    └── 2026-07-10-homepage.md
```

## 2. Request web target context

User:

```text
vibe-to-ui context --profile vibe-to-ui --target web
```

Agent:

1. Load `brand.md`, `tokens.json`, `decisions.md`.
2. See that `targets/web.md` is missing → create `targets/` and generate `web.md` from the brand master using the web target guide in `DESIGN-CONTEXT.md` (no bundled target seed in the skill package).
3. Append a decision: "Target web created".
4. Update `profile.md` frontmatter → `targets_available: [web]`, bump `updated_at`.
5. Emit **merged context**: metadata + brand + tokens + decisions + `targets/web.md` (+ asset pointers) for the web/UI agent.

## 3. Request the same target again (reuse)

User:

```text
vibe-to-ui context --profile vibe-to-ui --target web
```

Agent:

1. Find existing `targets/web.md`.
2. Reuse it; only update if brand master or user feedback changed.
3. Emit the same merged package without a full regenerate.

## 4. Add another medium

User:

```text
vibe-to-ui context --profile vibe-to-ui --target social-cover
```

Agent creates `targets/social-cover.md` on demand (does not regenerate `web.md` unless brand master changed). Later, `--target hyperframes` follows the same pattern.

## 5. Consume in a project

When building UI in a repo:

1. Read `~/.vibe-to-ui/profiles/vibe-to-ui/` (brand + tokens + `targets/web.md`).
2. Read project `DESIGN.md` if present for product/page-local context.
3. Optionally note `design_context_profile: vibe-to-ui` in `DESIGN.md` Iteration Context.
4. Apply or generate UI using shared tokens; do not invent a parallel palette.

## 6. Skill update safety check

After `npx skills add ...` or git pull of the skill:

- `~/.vibe-to-ui/profiles/vibe-to-ui/` must still exist unchanged.
- Only skill templates under the package's `assets/design-context/` may change.

## Failure cases

| Situation | Agent response |
|-----------|----------------|
| Profile missing | Offer `--init` / `--from-url` / `--from-image` |
| URL unreachable | Follow inspiration fallback: try HTML/CSS fetch, then offer cropped screenshots or partial continuation — user chooses; write partial profile with confidence notes |
| Unknown target | Accept only `web`, `social-cover`, `hyperframes` |
| Empty brand master | Refuse to invent a full system; extract from source first |
