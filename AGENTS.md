# AGENTS.md

## Cursor Cloud specific instructions

This repository (`vibe-to-ui`) is a **content-only Agent Skill package**, not a runnable
application. It contains only Markdown: `SKILL.md` (core instructions with YAML
frontmatter), `references/*.md` (on-demand methodology guides), and
`assets/design-system-template.md` (an output template). See `README.md` for the product
overview and the `npx skills add ...` consumer install path.

Because of this, there is **no application server, no build step, no automated test
suite, and no linter** configured, and there are **no package manifests or lockfiles** to
install from. The startup update script is intentionally a no-op.

### Validating changes (the closest analog to test/lint here)

The meaningful integrity checks for this repo are:

1. `SKILL.md` has valid YAML frontmatter with required `name` (lowercase/digits/hyphens)
   and `description` fields, per the [Agent Skills spec](https://agentskills.io/specification).
2. Every internal Markdown link (e.g. `references/DESIGN-SYSTEM.md`) resolves to a real
   file. Broken cross-references are the most likely regression when editing content.

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
