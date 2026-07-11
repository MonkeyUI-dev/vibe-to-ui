# Design Context E2E walkthrough

Minimal path: **CLI init → agent extraction → CLI target merge**.

Paths use `~/.vibe-to-ui/` (or `$VIBE_TO_UI_HOME`) so skill reinstall never touches user data.

## 0. Preconditions

- vibe-to-ui skill is installed (e.g. `npx skills add ...`).
- Node ≥18 available to run `bin/vibe-to-ui.js`.
- User can provide a **website URL** and/or a **screenshot** for extraction (agent-led).
- Process can write the Design Context root (user home permissions).

## 1. Initialize a profile (CLI)

User / agent:

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile vibe-to-ui --init
# or: npx vibe-to-ui context --profile vibe-to-ui --init
```

CLI:

1. Creates `~/.vibe-to-ui/profiles/vibe-to-ui/` with `assets/` and `sources/` (no `targets/` yet).
2. Copies **shared** seed templates only (`profile.md`, `brand.md`, `tokens.json`, `decisions.md`) if missing — never overwrites existing shared files.
3. Prints the profile path.

Expected tree after init:

```text
~/.vibe-to-ui/profiles/vibe-to-ui/
├── profile.md
├── brand.md
├── tokens.json
├── decisions.md
├── assets/
└── sources/
```

## 2. Fill brand master (agent)

User:

```text
Extract design context from https://vibe-to-ui.example into profile "vibe-to-ui"
```

or a screenshot / other inspiration source.

Agent:

1. Confirm the profile exists (run `--init` if needed).
2. For a URL: follow [INSPIRATION-SOURCES.md](../../references/INSPIRATION-SOURCES.md). For a screenshot-only request, analyze the image directly.
3. Fill `profile.md`, `brand.md`, `tokens.json`; append to `decisions.md` and `sources/`.
4. Copy durable visuals into `assets/` when available.
5. Tell the user the profile path and that targets are not generated yet.

## 3. Request a medium target (CLI)

User / agent:

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile vibe-to-ui --target web
```

CLI:

1. Ensures profile exists (errors if missing).
2. Creates `targets/web.md` stub if missing; otherwise reuses.
3. Updates `profile.md` `targets_available` and appends a decision note.
4. Prints **merged context** on stdout (profile + brand + tokens + decisions + target + asset pointers).

Agent then fills stub target content from the brand master using guides in `DESIGN-CONTEXT.md` when the stub is still empty.

## 4. Request the same target again (reuse)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile vibe-to-ui --target web
```

CLI reuses `targets/web.md` and prints the same merge shape without regenerating the stub.

## 5. Add another medium (example or user-defined)

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile vibe-to-ui --target social-cover
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile vibe-to-ui --target linkedin
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --profile vibe-to-ui --target print-brochure
```

Named example guides apply when the id matches (`web` / `social-cover` / `hyperframes`); otherwise use the generic custom-medium guide. No built-in GitHub/LinkedIn packs.

## 6. List profiles

```bash
node path/to/vibe-to-ui/bin/vibe-to-ui.js context --list
```

## 7. Consume in a project

When building UI in a repo:

1. Run `--target` (or read `~/.vibe-to-ui/profiles/vibe-to-ui/` directly).
2. Read project `DESIGN.md` if present for product/page-local context.
3. Optionally note `design_context_profile: vibe-to-ui` in `DESIGN.md` Iteration Context.
4. Apply or generate UI using shared tokens; do not invent a parallel palette.

## 8. Skill update safety check

After `npx skills add ...` or git pull of the skill:

- `~/.vibe-to-ui/profiles/vibe-to-ui/` must still exist unchanged.
- Only skill templates under the package's `assets/design-context/` may change.

## Failure cases

| Situation | Response |
|-----------|----------|
| Profile missing on `--target` | CLI errors; suggest `--init` |
| Root not writable | CLI errors; fix permissions or set `VIBE_TO_UI_HOME` |
| URL unreachable during agent extraction | Follow inspiration fallback; offer cropped screenshots or partial continuation — user chooses |
| Invalid target id | CLI normalizes to kebab-case; rejects empty / non-slug |
| Empty brand master | CLI still creates target stub + merge; agent should extract before treating rules as final |
