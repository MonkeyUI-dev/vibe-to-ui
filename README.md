# vibe-to-ui

[中文](README.zh_CN.md)

<p align="center">
  <strong>Make AI-generated UI actually look designed.</strong><br />
  Turn a generic AI-generated page into a direction with intention — layout, type, motion, imagery, and the rules that hold them together.
</p>

<p align="center">
  <a href="#install-and-try-it">Install &amp; try it</a> ·
  <a href="#use-cases">Use cases</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#advanced-workflows">Advanced workflows</a> ·
  <a href="#faq">FAQ</a>
</p>

[![skills.sh](https://skills.sh/b/MonkeyUI-dev/vibe-to-ui)](https://skills.sh/MonkeyUI-dev/vibe-to-ui)

<!--
  Hero proof belongs here once approved. See docs/media/README.md for its required
  capture brief and final embed copy. This note is intentionally invisible on GitHub.
-->

---

## A visible difference, not a prettier prompt

The same AI-generated landing page can feel generic or deliberate. vibe-to-ui helps your agent turn references and taste into a coherent UI direction before it touches production code.

Bring a screenshot, URL, image, music clip, or a sentence of intent. Get a design direction you can see, compare, and choose — then apply it when it is right.

## Install and try it

```bash
npx skills add MonkeyUI-dev/vibe-to-ui#v0.6.0
```

Then give your agent one prompt:

```text
This landing page looks like generic AI UI. Give me 3 visual directions that feel designed,
generate previews, and do not change my project until I choose one.
```

Works with Claude Code, Cursor, Codex, Gemini CLI, Kimi Code, and any `npx`-capable agent.

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

<details>
<summary><strong>Direct generated video motion</strong></summary>

The Motion Router starts with CSS/Motion and escalates through GSAP, OGL, and Three.js only when each capability is necessary. It chooses MiniMax Video only for natural action, complex transformation, or a continuous cinematic journey that code cannot express convincingly.

The first release is **MiniMax-only**. It plans and integrates three production paths: Continuous Scrub (scroll/pointer/drag → video progress), State Transition (approved first and last states), and Cinematic Journey (scene clips connected with real rendered boundary frames). Simple background videos stay simple native-video assets.

[Read the Video Motion guide →](references/VIDEO-MOTION.md) · Inspiration credit: [oil-motion](https://github.com/oil-oil/oil-motion) and [kubeez-scroll-world-video](https://github.com/KubeezMedia/kubeez-scroll-world-video).

</details>

---

## Use cases

### 1. Make a generic AI landing page feel intentional

Keep the product and content you already have. Change the visual hierarchy, typography, layout rhythm, imagery, and motion so the result feels designed for *this* product — not assembled from a default SaaS template.

### 2. Turn references into directions that fit your product

Start with a screenshot, live URL, photo, music, or a rough feeling. vibe-to-ui classifies the surface first, then explores three distinct, product-aware directions instead of blindly copying a style.

### 3. Reuse the design language after you find it

Save confirmed brand rules as a local Design Context. Use the same visual language across a web app, social cover, launch video, print piece, or any medium your agent needs next.

---

## How it works

```text
Reference or intent → 3 directions → previews → you choose → apply
```

1. **Bring a signal** — a URL, screenshot, image, music clip, or a sentence.
2. **See three directions** — each grounded in your product and page type, not random theme swaps.
3. **Compare before committing** — standalone concept previews and mood boards make the choice concrete.
4. **Apply only when ready** — exploration stays outside your project until you explicitly confirm a direction.

Your agent should never need to guess whether “make it feel premium” means a new palette, a different layout, or a more restrained motion system. vibe-to-ui turns that judgment into a shared, reviewable direction.

---

## Advanced workflows

<details>
<summary><strong>Restore or analyze an existing UI</strong></summary>

Use a URL or screenshot to extract a design system, motion DNA, and a reviewable preview before applying anything.

```text
Analyze https://example.com and give me the design tokens and motion system.
```

For a full methodology, see [Design System](references/DESIGN-SYSTEM.md), [Motion System](references/MOTION-SYSTEM.md), and [Spatial Vibe](references/SPATIAL-VIBE.md).

</details>

<details>
<summary><strong>Keep a local Design Context</strong></summary>

Persist a brand profile outside the skill package, so reinstalling the skill never resets your visual language.

```bash
node bin/vibe-to-ui.js context --profile my-brand --init
node bin/vibe-to-ui.js context --profile my-brand --target web
node bin/vibe-to-ui.js context --profile my-brand --target print-brochure
```

Profiles live under `~/.vibe-to-ui`; medium targets are open-ended. Optional Git sync can share profiles and inspiration across devices through your private repository.

[Read the Design Context guide →](references/DESIGN-CONTEXT.md)

</details>

<details>
<summary><strong>Build an Inspiration Library</strong></summary>

Collect real product pages and screenshots in a global archive, keep their full-scroll visual analysis separate from brand rules, then link or apply a product-level design seed only when you decide to.

```bash
node bin/vibe-to-ui.js inspiration add https://example.com --product example --page home
node bin/vibe-to-ui.js inspiration link example --profile my-brand
node bin/vibe-to-ui.js inspiration apply example --project . --confirm
```

[Read the Inspiration Library guide →](references/INSPIRATION-LIBRARY.md)

</details>

---

## FAQ

**Do I need to be a designer?**<br />
No. Bring product context and taste signals; vibe-to-ui structures the visual decisions with you.

**Will it rewrite my project immediately?**<br />
No. Exploration produces standalone previews. Your project changes only after you explicitly ask to apply a confirmed direction.

**Can I use a screenshot instead of a URL?**<br />
Yes. A screenshot, URL, photo, music clip, or written intent can all be useful starting points.

**Does it work with React, Vue, or plain CSS?**<br />
Yes. The direction and tokens are framework-agnostic; application follows your project conventions.

**Does it include an image-generation API or require API keys?**<br />
No. Visual assets use your agent host’s image tool by default. You can explicitly choose MiniMax when it is available and appropriate for the asset; its credentials remain outside the project. See [Visual Asset Generation](references/VISUAL-ASSET-GENERATION.md).

---

<p align="center">
  <img src="docs/media/brand-slogan.png" alt="vibe-to-ui — Design the dream you were told to put away." width="100%" />
</p>

<p align="center">
  <em>Design the dream you were told to put away.</em>
</p>

## Media production brief

The next proof assets and their exact delivery requirements are in [docs/media/README.md](docs/media/README.md). They are intentionally kept out of the rendered README until real examples are ready.

---

## License

MIT — see [LICENSE](LICENSE).

Built with ❤️ by [MonkeyUI-dev](https://github.com/MonkeyUI-dev).
