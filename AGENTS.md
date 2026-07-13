# AGENTS.md

## Cursor Cloud specific instructions

This repository (`vibe-to-ui`) is primarily an **Agent Skill package** (Markdown
instructions + seed templates), plus a small **Node.js zero-dependency CLI** for
Design Context lifecycle (`bin/vibe-to-ui.js`, `package.json` bin). There is still
**no application server, no build step, no automated test suite, and no linter**.
Dependencies are not required to use the skill instructions; Node ≥18 is required
only when running the `vibe-to-ui context` CLI. The startup update script is
intentionally a no-op.

### User Design Context vs skill package

Live Design Context profiles belong under the **user home** path
`~/.vibe-to-ui/profiles/<profile>/`, not in this
repository. Templates under `assets/design-context/` are seeds only. Skill
install, update, or reinstall must **never** overwrite, delete, or reset
`~/.vibe-to-ui/`. There is no env override for the root path.

### `SKILL.md` description (progressive disclosure — do not inflate)

`name` + `description` are the **only** fields loaded at agent startup for every
installed skill ([Agent Skills progressive disclosure](https://agentskills.io/specification)).
They must stay small, stable, and optimized for **routing** (when to activate),
not for teaching the full product.

Follow the [Agent Skills spec](https://agentskills.io/specification) and these
repo rules when editing frontmatter:

| Rule | Requirement |
|------|-------------|
| Hard limit | `description` **≤ 1024 characters** (spec max). Non-empty. |
| Soft target | Prefer **≈ 400–700 characters** (~100–175 tokens). Do not drift toward the hard ceiling. |
| Job of the field | **What** the skill does + **when** to use it, with concrete trigger keywords |
| Not the job | Workflow steps, CLI flags, path layouts, open-ended target examples, intake playbooks, long capability catalogs |
| Activation | Include keywords agents match on user intent (e.g. design system, tokens, motion, mood board, spatial layout, visual assets, Design Context, `~/.vibe-to-ui`, screenshot, URL, inspiration) |
| Stability | Do not casually rewrite or expand `description` while implementing features — put detail in the Markdown body or `references/` |

**Good shape** (current intent):

```yaml
description: >-
  Design systems, motion, mood boards, … Use when designing or restyling UI,
  exploring visual direction, extracting tokens/motion, …
```

**Bad shape** (reject in review):

- Pasting Capability 1–7 workflows into `description`
- Encoding `vibe-to-ui context --profile --target` flag matrices
- Listing every medium example (`linkedin`, `print-brochure`, …)
- Narrating URL browse / CSS / motion-observation procedures

Validate after any frontmatter edit:

```bash
python3 - <<'PY'
from pathlib import Path
import yaml
fm = yaml.safe_load(Path("SKILL.md").read_text().split("---", 2)[1])
desc = fm["description"]
assert fm["name"] == "vibe-to-ui"
assert 1 <= len(desc) <= 1024, len(desc)
# Soft budget: warn (do not fail CI-less smoke) if growing past preferred range
if len(desc) > 700:
    raise SystemExit(f"description too long for progressive disclosure soft target: {len(desc)} chars (prefer ≤700)")
print(f"OK description: {len(desc)} chars")
PY
```

Body length guidance (same progressive-disclosure spirit): keep `SKILL.md` body
focused; move deep methodology into `references/`. Spec recommends the main
skill file stay lean (under ~500 lines when practical).

### Validating changes (the closest analog to test/lint here)

The meaningful integrity checks for this repo are:

1. `SKILL.md` frontmatter: valid `name` + `description` per the section above
   and the [Agent Skills spec](https://agentskills.io/specification).
2. Every internal Markdown link (e.g. `references/DESIGN-SYSTEM.md`,
   `references/DESIGN-CONTEXT.md`) resolves to a real file. Broken cross-references are
   the most likely regression when editing content.
3. Design Context seed files under `assets/design-context/` exist for
   `profile.md`, `brand.md`, `tokens.json`, and `decisions.md`.
   Do **not** ship bundled per-medium `targets/*.md` seeds (neither for
   example media like web/social-cover/hyperframes, nor for user-defined media).
4. Design Context CLI smoke (optional but recommended when touching `bin/` / `lib/`):

```bash
# Isolate ~/.vibe-to-ui for smoke only by setting HOME (not a product env var)
export HOME=/tmp/vibe-to-ui-smoke-home
rm -rf "$HOME"
node bin/vibe-to-ui.js context --list   # read-only; empty OK, must not mkdir
node bin/vibe-to-ui.js context --profile demo --init
node bin/vibe-to-ui.js context --list
node bin/vibe-to-ui.js context --profile demo --target print-brochure >/tmp/merge.md
# reuse must not append another decision entry
before=$(grep -c 'Target print-brochure created' "$HOME/.vibe-to-ui/profiles/demo/decisions.md" || true)
node bin/vibe-to-ui.js context --profile demo --target print-brochure >/dev/null
after=$(grep -c 'Target print-brochure created' "$HOME/.vibe-to-ui/profiles/demo/decisions.md" || true)
test "$before" = "$after"
test -f "$HOME/.vibe-to-ui/profiles/demo/brand.md"
test -f "$HOME/.vibe-to-ui/profiles/demo/targets/print-brochure.md"
test ! -e "$HOME/.vibe-to-ui/profiles/demo/targets/web.md"  # only requested targets
```

### Consuming / demonstrating the skill

The official consumer tooling is the `skills` CLI (already runnable via `npx skills ...`).
To verify the package installs and is recognized end-to-end from a local checkout:

```bash
# from any scratch project dir
npx --yes skills add /workspace --skill '*' --agent '*' -y
npx --yes skills list # should list "vibe-to-ui"
```

This copies the skill into `./.agents/skills/vibe-to-ui` and is the real-world way an
agent loads it. No network/auth is required when installing from the local path.

To smoke-test Design Context persistence (CLI + skill reinstall safety):

```bash
mkdir -p ~/.vibe-to-ui/profiles/demo/{assets,sources}
# or: node bin/vibe-to-ui.js context --profile demo --init
cp /workspace/assets/design-context/profile.md \
  /workspace/assets/design-context/brand.md \
  /workspace/assets/design-context/tokens.json \
  /workspace/assets/design-context/decisions.md \
  ~/.vibe-to-ui/profiles/demo/
# targets/ must not exist until a target is requested
test ! -e ~/.vibe-to-ui/profiles/demo/targets
# skill reinstall must not touch ~/.vibe-to-ui
npx --yes skills add /workspace --skill '*' --agent '*' -y
test -f ~/.vibe-to-ui/profiles/demo/brand.md
```
