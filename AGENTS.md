# AGENTS.md

## Cursor Cloud specific instructions

This repository (`vibe-to-ui`) is a **content-only Agent Skill package**, not a runnable
application. It contains only Markdown (and small JSON/YAML seed templates): `SKILL.md`
(core instructions with YAML frontmatter), `references/*.md` (on-demand methodology
guides), and `assets/` (output templates including `design-context/` seeds). See
`README.md` for the product overview and the `npx skills add ...` consumer install path.

Because of this, there is **no application server, no build step, no automated test
suite, and no linter** configured, and there are **no package manifests or lockfiles** to
install from. The startup update script is intentionally a no-op.

### User Design Context vs skill package

Live Design Context profiles belong under the **user home** path
`~/.vibe-to-ui/profiles/<profile>/`, not in this repository. Templates under
`assets/design-context/` are seeds only. Skill install, update, or reinstall must
**never** overwrite, delete, or reset `~/.vibe-to-ui/`.

### Validating changes (the closest analog to test/lint here)

The meaningful integrity checks for this repo are:

1. `SKILL.md` has valid YAML frontmatter with required `name` (lowercase/digits/hyphens)
   and `description` fields, per the [Agent Skills spec](https://agentskills.io/specification).
2. Every internal Markdown link (e.g. `references/DESIGN-SYSTEM.md`,
   `references/DESIGN-CONTEXT.md`) resolves to a real file. Broken cross-references are
   the most likely regression when editing content.
3. Design Context seed files under `assets/design-context/` exist for
   `profile.yaml`, `brand.md`, `tokens.json`, `decisions.md`, and
   `targets/{web,social-cover,hyperframes}.md`.

### Consuming / demonstrating the skill

The official consumer tooling is the `skills` CLI (already runnable via `npx skills ...`).
To verify the package installs and is recognized end-to-end from a local checkout:

```bash
# from any scratch project dir
npx --yes skills add /workspace --skill '*' --agent '*' -y
npx --yes skills list   # should list "vibe-to-ui"
```

This copies the skill into `./.agents/skills/vibe-to-ui` and is the real-world way an
agent loads it. No network/auth is required when installing from the local path.

To smoke-test Design Context persistence (agent workflow, not a CLI binary):

```bash
mkdir -p ~/.vibe-to-ui/profiles/demo/{assets,sources}
cp /workspace/assets/design-context/profile.yaml \
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
