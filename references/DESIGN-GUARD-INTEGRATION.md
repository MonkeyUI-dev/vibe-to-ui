# Design Guard Integration Guide

## Overview

The Design Guard outputs a single `DESIGN.md` file placed at the project root. This format is chosen because it is the **most universally recognized** context file format across AI coding agents.

This guide explains:
1. Why DESIGN.md is the universal integration format
2. How different agents discover and consume it
3. How to maximize effectiveness across all agents

---

## Why DESIGN.md

### The standard

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) is a plain-text design system document introduced by Google Stitch. It's a Markdown file placed in the project root that coding agents read to generate consistent UI.

The standard maps cleanly to how AI agents already consume context:

| Agent-native format | What it tells agents | DESIGN.md equivalent |
|---|---|---|
| `AGENTS.md` (Codex) | How to build the project | — |
| `CLAUDE.md` (Claude Code) | How to work in this repo | — |
| `.instructions.md` (Copilot) | Rules for code generation | — |
| `DESIGN.md` (Stitch + universal) | How the project should look and feel | ✅ This is what we generate |

These formats are complementary, not competing. `DESIGN.md` handles the **design dimension** — it answers "how should this look and feel?" while agent-specific files answer "how should this be built?"

### Universal consumption

DESIGN.md works across agents because:

1. **It's just Markdown in the project root** — every agent scans root-level `.md` files for context
2. **The filename is semantically clear** — even agents that don't "know" the DESIGN.md standard will infer from the filename that it contains design guidance
3. **Google Stitch reads it natively** — designed for this exact purpose
4. **The awesome-design-md ecosystem** — a growing collection of DESIGN.md files from real websites, normalizing the format across the community

### Our extensions

Standard DESIGN.md covers static design tokens and visual descriptions. Our Design Guard extends it with sections that matter for **iterating products**:

| Standard DESIGN.md section | Our extension |
|---|---|
| Visual Theme & Atmosphere | ✅ Included as-is |
| Color Palette & Roles | ✅ Included as-is |
| Typography Rules | ✅ Included as-is |
| Component Stylings | ✅ Included + extended with Behavior Contracts |
| Layout Principles | ✅ Included as-is |
| Depth & Elevation | ✅ Included as-is |
| Do's and Don'ts | ✅ Included + extended with detailed Anti-Patterns |
| Responsive Behavior | ✅ Included as-is |
| — | 🆕 Motion Constraints |
| — | 🆕 Component Behavior Contracts |
| — | 🆕 Copy & Voice |
| — | 🆕 Guard Metadata & Evolve Triggers |
| — | 🆕 Design Decision Log |

Extensions are clearly marked with a `## Design Guard Extensions` heading so agents and humans can distinguish standard sections from guard-specific ones.

---

## Agent Compatibility

### How each agent discovers DESIGN.md

| Agent | Discovery mechanism | Notes |
|---|---|---|
| **Google Stitch** | Native — reads `DESIGN.md` from project root | Designed for this format |
| **GitHub Copilot** | Reads root `.md` files when referenced in `.instructions.md` or `copilot-instructions.md` | Can also be referenced via `applyTo` in instruction files |
| **Claude Code** | Reads root `CLAUDE.md` and all `.md` files referenced from it | `DESIGN.md` can be referenced from `CLAUDE.md` |
| **Cursor** | Reads `.cursor/rules/*.mdc` and referenced files | Can reference `DESIGN.md` from a rule file |
| **OpenAI Codex** | Reads `AGENTS.md` → follows pointers to other docs | `DESIGN.md` can be listed in `AGENTS.md` |
| **Windsurf** | Reads `.windsurfrules` from project root | `DESIGN.md` can be referenced from `.windsurfrules` |
| **Any LLM agent** | Project root Markdown files are standard context sources | The filename `DESIGN.md` is self-describing |

### Maximizing discovery (optional)

For agents that use a pointer/map file (Codex with `AGENTS.md`, Copilot with `.instructions.md`), adding a one-line reference improves reliability. **This is optional** — DESIGN.md at the root already works for most agents — but for maximum coverage:

**In AGENTS.md (if present):**
```markdown
## Design
See DESIGN.md for the project's design system, visual constraints, and UI behavior contracts.
```

**In CLAUDE.md (if present):**
```markdown
## Design
Follow DESIGN.md for all UI-related code. It contains the design system, component behavior contracts, and anti-patterns.
```

**In .instructions.md or copilot-instructions.md (if present):**
```markdown
When working on UI code, follow the constraints in DESIGN.md.
```

**In .cursor/rules/ (if present):**
```yaml
---
description: "Design system constraints"
globs: ["**/*.tsx", "**/*.jsx", "**/*.vue", "**/*.css"]
---
Follow DESIGN.md for design system tokens, component behavior contracts, and visual anti-patterns.
```

The agent generating the Design Guard should check if any of these files exist in the project and offer to add the pointer line. **Never create these agent-specific files from scratch** — only append a reference if the file already exists.

---

## Integration Workflow

After generating `DESIGN.md` (via the Extract & Codify workflow in [DESIGN-GUARD.md](DESIGN-GUARD.md)), complete the integration:

### Step 1: Place DESIGN.md

Place the file at the **project root** — same level as `package.json`, `README.md`, etc.

```
project/
├── DESIGN.md          ← here
├── package.json
├── README.md
├── src/
│   └── ...
```

### Step 2: Check for existing agent files

Scan the project for agent-specific instruction files:

```
Check for:
- AGENTS.md                    (Codex)
- CLAUDE.md                    (Claude Code)
- .github/copilot-instructions.md  (Copilot)
- .instructions.md             (Copilot)
- .cursor/rules/               (Cursor)
- .windsurfrules               (Windsurf)
```

### Step 3: Offer to add references

If any of these files exist, ask the user:

```
I see your project has [CLAUDE.md / AGENTS.md / etc.]. 
Want me to add a one-line reference to DESIGN.md so [agent name] 
will find it more reliably?
```

If the user agrees, add the minimal pointer (see examples above). **Do not create new agent-specific files** — only augment existing ones.

### Step 4: Confirm integration

```
DESIGN.md is now in your project root.
  
[If pointers were added]:
Also added a reference in [file] so [agent] explicitly knows to read it.

Any AI coding agent working on this project will now have design 
constraints in context when generating UI code.
```

---

## Important Principles

1. **DESIGN.md is the single source of truth** — all design constraints live here. Agent-specific files only contain pointers, never duplicated content.

2. **Never create agent-specific files unprompted** — if the project doesn't have CLAUDE.md, don't create one just for the design pointer. DESIGN.md at the root is sufficient.

3. **Agent neutrality** — the guard capability is not tied to any specific agent. The DESIGN.md format works universally. Integration with agent-specific files is a convenience, not a requirement.

4. **Respect existing files** — when adding pointers to existing agent files, append minimally. Don't restructure or rewrite the existing content.

5. **The user controls which agents to integrate with** — always ask before modifying any agent-specific instruction file.
