# vibe-to-ui

[中文](README.zh_CN.md)

<!-- TODO(media): logo — square mark, transparent PNG/SVG, ~512×512. Product mark only (no wordmark clutter). Path: docs/media/logo.svg -->
<p align="center">
  <img src="docs/media/logo.svg" alt="vibe-to-ui" width="96" />
</p>

<p align="center">
  <strong>Design that speaks vibe — for developers who ship by feel.</strong><br />
  An <a href="https://agentskills.io">Agent Skill</a> that turns screenshots, URLs, photos, music, and gut feelings into real UI direction — then applies it only when you say so.
</p>

<!-- TODO(media): hero-banner — 1600×900 (or 16:9). One composition: product name + one short line + a full-bleed collage of concept preview / mood board / UI frame. Not a dashboard. Warm/atmospheric, not purple-gradient AI default. Path: docs/media/hero-banner.webp -->
<p align="center">
  <img src="docs/media/hero-banner.webp" alt="vibe-to-ui — explore three directions, then apply" width="100%" />
</p>

<p align="center">
  <a href="#install">Install</a> ·
  <a href="#what-you-can-do">What you can do</a> ·
  <a href="#how-it-feels">How it feels</a> ·
  <a href="#examples">Examples</a> ·
  <a href="#prompts">Prompts</a> ·
  <a href="#faq">FAQ</a>
</p>

---

## Why vibe-to-ui

Good design shouldn't need a design degree.

You can ship systems. You can feel when something looks off. What's missing is a translator — something that takes a cafe photo, a song snippet, or a site you like, and turns that *feeling* into layout, type, motion, and tokens your agent can actually use.

**Explore first. Apply when ready.** Previews and mood boards stay outside your repo until you confirm.

> Not templated taste. More beauty — in more forms, from more people.

---

## Install

```bash
npx skills add MonkeyUI-dev/vibe-to-ui#v0.4.0
```

Works with Claude Code, Cursor, Codex, Gemini CLI, Kimi Code, and any `npx`-capable agent.

<!-- TODO(media): agents-strip — 1200×120 wide strip of partner/agent logos (Claude, Cursor, Codex, Gemini…) on a single quiet background. Path: docs/media/agents-strip.webp -->
<p align="center">
  <img src="docs/media/agents-strip.webp" alt="Works with major coding agents" width="80%" />
</p>

<details>
<summary>Manual install</summary>

**Claude Code** → `~/.claude/skills/`

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.claude/skills/vibe-to-ui
```

**Other agents** → `~/.agents/skills/`

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.agents/skills/vibe-to-ui
```

</details>

---

## What you can do

| You want… | vibe-to-ui helps you… |
|-----------|------------------------|
| Restore a look from a URL or screenshot | Extract a full design system + motion DNA, preview first |
| Only have a feeling / references / music | Explore **3 product-aware directions** before locking tokens |
| Fix “generic SaaS layout” energy | Translate vibe → **Spatial DNA** and layout previews |
| See the direction before committing | Generate shareable **mood boards** |
| Ship it into the repo | **Apply** tokens (and assets) only after you confirm |
| Imagery that matches the direction | Generate hero / feature / empty-state visuals via your agent’s image tools |
| Reuse brand across media | Persist a local **Design Context** profile (`~/.vibe-to-ui`) |

Deep methodology lives in [`references/`](references/) — loaded on demand, not upfront.

---

## How it feels

```text
inspire → explore 3 directions → choose → preview → apply
```

1. **Bring anything** — URL, screenshot, photo, music, or a sentence of intent  
2. **Get three directions** grounded in your product (not three random themes)  
3. **Compare** concept previews + mood boards  
4. **Apply** when you say so — your project stays untouched until then  

<!-- TODO(media): flow-diagram — 1400×480. Horizontal 4–5 step flow with simple icons: Inspire → 3 Directions → Mood Board → Preview → Apply. One composition, light editorial, no card clutter. Path: docs/media/flow-diagram.webp -->
<p align="center">
  <img src="docs/media/flow-diagram.webp" alt="inspire → explore → choose → apply" width="100%" />
</p>

---

## Examples

Created with vibe-to-ui (replace placeholders when assets are ready):

<!-- TODO(media): example-concepts — 1600×900 collage or 3-up strip showing Concept A / B / C preview pages for one product. Same page archetype, clearly different visual/motion personalities. Path: docs/media/example-concepts.webp -->
<p align="center">
  <img src="docs/media/example-concepts.webp" alt="Three concept directions side by side" width="100%" />
</p>

<!-- TODO(media): example-moodboard — 1200×900 screenshot of a generated HTML mood board (color, type, texture, motion hint). Path: docs/media/example-moodboard.webp -->
<p align="center">
  <img src="docs/media/example-moodboard.webp" alt="Mood board example" width="100%" />
</p>

<!-- TODO(media): example-before-after — 1600×800 split: left “generic AI landing”, right “after vibe-to-ui direction”. Honest, same content structure. Path: docs/media/example-before-after.webp -->
<p align="center">
  <img src="docs/media/example-before-after.webp" alt="Before and after" width="100%" />
</p>

<!-- TODO(media): example-consumer-app — 1200×800 phone or multi-screen frame: nav + home + empty/error state for a C-end app direction. Path: docs/media/example-consumer-app.webp -->
<p align="center">
  <img src="docs/media/example-consumer-app.webp" alt="Consumer app UIUX preview" width="100%" />
</p>

---

## Prompts

```text
"Analyze https://example.com and give me the design tokens"

"I want something calm and modern — give me 3 visual directions for my product"

"I recorded a melody that captures the feeling — translate it into a design direction"

"Make this landing page feel editorial, not like a generic SaaS template"

"I like Concept B — apply this design to my project"

"Generate hero and feature illustrations for Concept B"

"vibe-to-ui context --profile my-brand --init"
"vibe-to-ui context --profile my-brand --target print-brochure"
```

---

## Design Context (local brand memory)

Keep a brand profile on your machine — outside the skill — so reinstall never wipes it:

```bash
node bin/vibe-to-ui.js context --list
node bin/vibe-to-ui.js context --profile my-brand --init
node bin/vibe-to-ui.js context --profile my-brand --target web
```

Root: `~/.vibe-to-ui` (override with `VIBE_TO_UI_HOME`). Medium targets are open-ended (`web`, `linkedin`, `print-brochure`, …) — not a fixed enum.

<!-- TODO(media): design-context-diagram — 1200×700. Simple diagram: Profile (brand.md + tokens) → optional targets/*.md → merge handoff. Path: docs/media/design-context-diagram.webp -->
<p align="center">
  <img src="docs/media/design-context-diagram.webp" alt="Design Context profile and targets" width="90%" />
</p>

Details: [DESIGN-CONTEXT.md](references/DESIGN-CONTEXT.md)

---

## FAQ

**Do I need to be a designer?**  
No. Bring product context and taste signals — vibe-to-ui structures the rest.

**Will it rewrite my repo immediately?**  
No. Exploration stays in standalone previews until you explicitly ask to apply.

**URL or screenshot?**  
Either. The agent adapts to what you provide.

**React / Vue / plain CSS?**  
Yes. Tokens and direction are framework-agnostic; apply respects your project conventions.

**Where do the deep guides live?**  
In [`references/`](references/) — progressive disclosure keeps startup context lean.

**Image generation?**  
Uses your agent’s host image tool or optional MCP providers. No API keys are bundled. See [VISUAL-ASSET-GENERATION.md](references/VISUAL-ASSET-GENERATION.md).

---

## Media checklist

See [`docs/media/README.md`](docs/media/README.md) for every asset TODO (sizes, intent, filename). Drop files there and remove the matching `TODO(media)` comments in this README when ready.

---

## License

MIT — see [LICENSE](LICENSE).

Built with ❤️ by [MonkeyUI-dev](https://github.com/MonkeyUI-dev).
