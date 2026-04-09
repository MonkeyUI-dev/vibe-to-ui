# Design Guard Guide

## Overview

As a project iterates beyond its initial vibe coding phase, design decisions accumulate and the product develops a distinct identity — a brand personality, interaction patterns, visual language, and motion vocabulary. Without encoding these decisions, every new coding agent session starts from zero context and risks generating UI that feels inconsistent, breaking the product experience.

Design Guard solves this by extracting established design decisions from a project and codifying them into a **DESIGN.md** file — a plain-text design constraint document that any AI coding agent can read to generate consistent UI. The format follows the [DESIGN.md standard](https://stitch.withgoogle.com/docs/design-md/overview/) and extends it with behavioral contracts, motion constraints, evolve triggers, and anti-patterns specific to the project.

### What Design Guard is NOT

- **Not a pixel-perfect spec** — it provides context, not control. It tells agents "this product should feel like X" and "never do Y", not "this button must be exactly 42px tall".
- **Not a design police** — it's a gravity field that pulls agents toward consistency, not a wall that blocks creativity. Constraints are suggestions with rationale, not hard rejections.
- **Not a one-time artifact** — it evolves with the project. When new patterns emerge, the guard updates to include them.

## When to Use

### 6a: Extract & Codify

- User's project has gone through initial design setup (design tokens applied, some pages/components built)
- User says things like "lock down my design", "extract design constraints", "guard my design", "create a DESIGN.md", "make sure the AI keeps my design consistent"
- User notices inconsistency creeping in between pages or components
- After **Capability 5** (Apply Design to Project), as a natural next step to lock in the applied direction

### 6b: Evolve & Update

- Project has had significant iteration since the last guard update
- User says "update my design guard", "sync DESIGN.md", "I added new patterns, update constraints"
- A coding agent (via evolve triggers embedded in the guard) suggests an update is needed

---

## Extract & Codify Workflow

### Step 1: Audit the Project

Examine what exists in the project to understand the current design state:

**Design assets to scan:**
- Token files: CSS custom properties, Tailwind config, JSON design tokens
- Existing DESIGN.md, design-system.md, or similar documents
- Aesthetic Analysis documents (from Capability 1)
- Component library or frequently repeated component patterns

**Code patterns to scan:**
- Component files: identify recurring UI patterns (button variants, card styles, modal behavior, form validation)
- Layout patterns: how pages are structured (sidebar + content, top-nav, etc.)
- Motion patterns: what CSS transitions/animations are actually used
- Color usage: are tokens being used consistently, or are hardcoded values creeping in?

**What to look for:**
- Intentional, repeated patterns → these become guard constraints
- One-off deviations → might be intentional exceptions or unintentional drift
- Missing patterns → areas where no convention exists yet (document as "undefined, needs decision")

### Step 2: Interview the User

Supplement automated scanning with user knowledge — some design decisions live in people's heads, not in code.

Ask conversationally (1–2 questions at a time):

```
Questions to ask:
- What does your product feel like in one sentence? (e.g., "professional but approachable")
- What should it NEVER feel like? (e.g., "never playful/bouncy, never dark-mode-techy")
- How do you handle errors — inline below fields, toast notifications, or error summaries?
- When content is loading, do you use skeletons, spinners, or shimmer effects?
- How do you communicate success — toast, inline message, or redirect?
- Any terminology rules? (e.g., "we say 'workspace' not 'project'")
- Are there interaction patterns you've consciously chosen? (e.g., "always show confirmation for destructive actions")
```

### Step 3: Generate DESIGN.md

Produce the DESIGN.md file following the structure in [../assets/design-guard-template.md](../assets/design-guard-template.md).

**Key principles for writing the guard:**

1. **DESIGN.md standard compatibility**: The guard file follows the [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/overview/) sections — Visual Theme & Atmosphere, Color Palette, Typography, Component Stylings, Layout Principles, Depth & Elevation, Do's and Don'ts, Responsive Behavior. This ensures native compatibility with agents that already understand DESIGN.md.

2. **Extended sections for iterating products**: Beyond the standard DESIGN.md format, add sections that matter for ongoing development — Component Behavior Contracts, Motion Constraints, Copy & Voice, Evolve Triggers, Decision Log. These go in clearly marked extension sections.

3. **Context over control**: Write constraints as rich natural language with rationale, not terse rules. An agent reading "Our product personality is 'reliable and composed' — we chose calm easing (cubic-bezier(0.4, 0, 0.2, 1)) because our users are financial professionals who need confidence, not excitement" will make better judgment calls than one reading "easing: cubic-bezier(0.4, 0, 0.2, 1)".

4. **Anti-patterns are as important as patterns**: Explicitly state what breaks the design soul. Agents replicate patterns they see — if you don't say "never use elastic/bouncy animations", an agent might add one because it saw it in training data.

5. **Include derivation, not just values**: Don't just list spacing values; explain the base unit and scale logic. Don't just list colors; explain the color grammar (warm base, muted accents, high-contrast text). This allows agents to make correct decisions for novel situations not explicitly covered.

### Step 4: Place the File

Place the generated `DESIGN.md` in the **project root directory**.

This location is important:
- The DESIGN.md standard expects it at the project root
- Most coding agents (Copilot, Claude Code, Cursor, Codex, Stitch, etc.) scan the project root for context files
- It's immediately visible in the project file tree, signaling to human developers too

If the project already has a DESIGN.md (e.g., from a previous extraction or from awesome-design-md), **merge** with the existing content rather than replacing it. Preserve any manually maintained sections.

### Step 5: Summary and Verification

Present what was created:

```
Design Guard summary:
- Created: DESIGN.md (project root)
- Content: [list what sections were generated]
- Based on: [audit of N component files, M token files, user interview]
- Next: Any coding agent working in this project will read DESIGN.md for design constraints.
  To update after future iterations, ask me to "evolve the design guard".
```

---

## Evolve & Update Workflow

### When to Evolve

The guard should evolve when:
- New component types are introduced (e.g., first chart/data visualization, first mobile-specific component)
- New interaction patterns emerge (e.g., drag-and-drop, inline editing, keyboard shortcuts)
- Design tokens are modified (color shifts, typography changes, new spacing values)
- The product expands to new contexts (dark mode, i18n, new platform)
- The guard file is >50 commits behind HEAD or >30 days old

### Evolve Steps

1. **Read the existing DESIGN.md** — load current guard and its metadata section
2. **Re-scan the project** — identify what's new since the guard was written:
   - New components not in the guard's `known_components` list
   - New pages/views not in `known_pages`
   - Token files that have been modified since guard's `last_updated` date
   - New interaction patterns (loading states, error handling, animation usage)
3. **Diff against existing constraints** — categorize each finding:
   - ✅ **Consistent**: New code follows existing guard constraints → no change needed
   - 🆕 **Evolution**: New pattern that should be added to the guard → confirm with user
   - ⚠️ **Drift**: Code deviates from existing constraints → ask user: intentional change or accidental?
4. **Present findings to user** — show the diff conversationally:
   ```
   I scanned your project and found:
   - 2 new component types: DataTable, AreaChart (not currently in the guard)
   - 1 new interaction pattern: inline editing on table cells
   - 1 potential drift: some new components use hardcoded `#6366F1` instead of token `--color-primary`
   
   Should I add the new patterns to the guard? And should I flag the hardcoded color as something to fix?
   ```
5. **Update DESIGN.md** — merge confirmed changes:
   - Add new component behavior contracts
   - Update metadata (known_components, known_pages, last_updated, based_on_commit)
   - Log decisions in the Decision Log section
   - Preserve all unchanged sections exactly as they are
6. **Summary** — list what changed in the guard

---

## Evolve Triggers (Embedded in DESIGN.md)

The guard file itself contains a section that helps coding agents know when to suggest an update. These triggers are passive — they don't block work, they just suggest.

The triggers are written as natural language that any agent can parse:

```markdown
## Evolve Triggers

When you encounter any of the following while coding in this project, 
suggest updating the Design Guard (but do not block your current task):

### New pattern detected
- A component type not listed in "Component Behavior Contracts" above
- A page/view not listed in Guard Metadata → known_pages
- A third-party UI library being imported for the first time

### Potential drift
- A hardcoded color, spacing, font-size, or shadow value instead of a token reference
- An animation not using the project's motion tokens
- A loading, error, or empty state pattern that doesn't match the documented contracts

### Scale change
- Dark mode or theme switching being introduced
- Internationalization (i18n) or RTL support being added
- A new platform target (e.g., mobile responsive → native app)

### Staleness signal
- The DESIGN.md metadata shows it's older than 30 days or 50+ commits behind

Suggest: "I noticed [specific observation]. Your DESIGN.md may need an update — 
would you like me to help refresh it?"
```

**Important**: These triggers should result in **suggestions**, never blocks. The agent continues its current task and mentions the observation. The user decides whether and when to update.

---

## Writing Guidelines

### Tone

Write the guard as if briefing a skilled but new-to-the-project designer-developer. Be specific, be opinionated, explain why.

- ✅ "Our loading states use skeleton placeholders (not spinners) because our pages are content-heavy and skeleton preserves layout stability during load. See `src/components/Skeleton.tsx` for the existing implementation."
- ❌ "Use skeletons for loading."

### Granularity

- **Be specific about things that are easy to get wrong** — colors, spacing scale, animation easing, error handling patterns
- **Be general about things that have many valid implementations** — exact component structure, state management approach, testing strategy
- **Don't over-constrain** — if the project hasn't established a pattern for something (e.g., drag-and-drop), leave it out of the guard rather than inventing a constraint

### What NOT to include

- Implementation details that change often (specific file paths for temporary files, current bug workarounds)
- Constraints that are already enforced by linters or type systems (no need to write "use TypeScript" if tsconfig is strict)
- Personal preferences of individual developers that the team hasn't agreed on
- Aspirational designs that haven't been implemented yet (guard documents what IS, not what SHOULD BE)
