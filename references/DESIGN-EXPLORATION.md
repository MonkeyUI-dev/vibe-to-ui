# Design Exploration Guide

## Overview

This guide covers the interactive process of helping users discover and define their visual direction. That includes both:

- users who only have vague aesthetic feelings
- users who already have a concrete reference image, but need the agent to extend it into **3 context-appropriate visual directions** instead of copying it literally

## Conversation Flow

### Phase 1: Context Gathering

Start by understanding the project:

```
Questions to ask:
- What does your project/app do? (one sentence)
- Who are your users? (developers, consumers, enterprise, creative pros...)
- What emotion should users feel? (trust, excitement, calm, delight, power...)
- Any brands or products whose look you admire? (even outside your industry)
- Any styles you definitely DON'T want? (anti-references are very useful)
```

Keep this conversational, not interrogative. 2–3 questions at a time.

If the project is a Consumer app or C-end app, also identify the app experience context:

```yaml
consumer_app:
  platform: mobile_app | responsive_web_app | tablet_app | unknown
  lifecycle_stage: acquisition | onboarding | activation | daily_use | retention | monetization
  primary_loop: browse | create | track | learn | transact | socialize | manage
  navigation_model: bottom_tabs | top_tabs | stack_navigation | feed_first | hub_and_detail | unknown
```

Use [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md) for the required screen, state, and interaction coverage.

### Phase 2: Inspiration Collection

Invite the user to share visual references **or music recordings**. Accept whatever form they choose — sources are equal options, not a ranked list:

- **Live page URLs**: when provided, the agent visits the page, reads frontend structure/CSS, takes selective captures, and may observe motion — see [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md)
- **Direct references**: Screenshots or mockups of websites/apps
- **Indirect references**: Photos of landscapes, architecture, fashion, nature, objects
- **Abstract references**: Color swatches, mood words, music genres, feelings
- **Music recordings**: Audio clips, hummed melodies, song snippets, or recorded music that captures the feeling they want

If the user already shared a **concrete UI reference** (URL, screenshot, or local project), do not jump straight to token extraction unless they explicitly asked for exact restoration. First read it as a source of structural and stylistic signals that can branch into multiple candidate directions. Do not ask for a different source kind than the one they already gave.

For each URL, image, or description the user shares, extract aesthetic signals:

| Dimension | Spectrum | Example signals |
|-----------|----------|----------------|
| **Temperature** | Warm ← → Cool | Sunset tones vs. ocean blues |
| **Density** | Dense ← → Airy | Information-packed vs. generous whitespace |
| **Geometry** | Organic ← → Geometric | Flowing curves vs. sharp grids |
| **Texture** | Smooth ← → Textured | Clean glass vs. grain/noise/paper |
| **Energy** | Calm ← → Dynamic | Still, balanced vs. motion, asymmetry |
| **Formality** | Casual ← → Formal | Playful, handwritten vs. structured, serif |
| **Saturation** | Muted ← → Vibrant | Desaturated earth tones vs. neon pops |
| **Weight** | Light ← → Heavy | Thin fonts, pale colors vs. bold, dark |
| **Motion feel** | Still ← → Cinematic | No animation, static layouts vs. scroll-linked reveals, parallax, entrance effects |

Feed these signals back to the user: "From this mountain landscape, I'm picking up: cool temperature, airy density, organic shapes, textured surfaces. Does that resonate?"

### Reading Music as Design Signals

When the user shares a **music recording or audio clip** (or describes a song/melody), analyze its sonic qualities and map them to the same aesthetic dimensions used for visual references:

| Musical Quality | What to Listen/Look For | Design Signal |
|----------------|------------------------|---------------|
| **Tempo** | BPM — slow ballad vs. fast dance track | Calm (slow) ↔ Dynamic (fast) on the **Energy** axis |
| **Rhythm** | Regular, predictable beat vs. syncopated or free-form | Geometric/Structured ↔ Organic/Fluid on the **Geometry** axis |
| **Timbre** | Warm, woody instruments (acoustic guitar, cello) vs. bright or metallic (synth, electric) | Warm ↔ Cool on the **Temperature** axis |
| **Dynamics** | Consistently soft vs. loud, or wide dynamic range | Light/Airy ↔ Bold/Heavy on the **Weight** axis |
| **Harmony** | Consonant/resolved chords vs. dissonant/tense | Formal/Calm ↔ Edgy/Expressive on the **Formality** axis |
| **Texture/Layers** | Sparse (solo instrument) vs. dense (full orchestra/band) | Minimal/Open ↔ Rich/Dense on the **Density** axis |
| **Acoustic vs. Electronic** | Natural instruments vs. synthesized sounds | Textured/Organic ↔ Smooth/Digital on the **Texture** axis |
| **Register** | High-pitched (flute, falsetto) vs. deep low-end (bass, drums) | Airy/Light ↔ Grounded/Heavy on the **Weight** axis |
| **Saturation of sound** | Clean and pure vs. distorted, layered, or reverb-heavy | Muted/Clean ↔ Vibrant/Saturated on the **Saturation** axis |

**Translating music into a design signal summary** — example:

```
Music: A slow, acoustic fingerpicked guitar piece with warm cello overtones, sparse arrangement, soft dynamics.

Design signals extracted:
- Temperature: Warm (woody acoustic instruments)
- Energy: Calm (slow tempo, soft dynamics)
- Geometry: Organic (fingerpicked, not mechanical)
- Density: Airy (sparse arrangement, few layers)
- Texture: Textured (acoustic warmth, natural reverb)
- Weight: Light (soft dynamics, high register melody)
- Saturation: Muted (no bright neon energy)
→ Direction: Warm minimalism — earth tones, generous whitespace, rounded organic shapes, soft shadows
```

Feed these sonic signals back to the user: "From this melody, I'm hearing: warm temperature, calm energy, organic rhythm, airy spacing. Design-wise, that translates to something like warm minimalism with earth tones and soft, open layouts. Does that feel right?"

### Phase 3: Concept Synthesis

Based on collected signals, synthesize **3 distinct design concepts**. This is the default outcome of exploration, including reference-led exploration from a concrete screenshot. Each concept should:

1. Have a **concept name** (evocative, memorable — e.g., "Nordic Dawn", "Urban Pulse", "Zen Garden")
2. Lean into the aesthetic signals somewhat differently
3. Be visually distinguishable from the other concepts
4. If a concrete UI reference was provided, remain recognizably descended from that reference's layout logic, hierarchy, and page archetype

### Palette vs style (two layers — on demand)

Internally, treat visual direction as two separable layers:

| Layer | Covers | Examples |
|-------|--------|----------|
| **Palette** | Temperature, saturation, role proportions, contrast strategy, semantic color roles | Warm earth vs cool slate; muted neutrals + one accent |
| **Style** | Material/light, geometry, typography attitude, density posture, motion personality, image language | Editorial / soft-product / industrial / glass-geometric |

**Default: do not open a separate style menu.** When the user already shared references (URL, screenshot, photos, music), those materials already imply palette *and* style preference. Proceed with **3 whole concepts** that stay faithful to that implied taste. Vary them along product-fit dimensions (density, motion, typography attitude, material micro-shifts) — not by discarding the reference's style language unless asked.

**Open an explicit style pass only when the user asks**, for example:

- "explore other styles" / "try a different style" / "less SaaS" / "more editorial / brutal / soft"
- "keep the colors, change the style"
- strong anti-references that reject the current style family

Then present **3 distinct style options** (Style X / Y / Z). Prefer keeping the current or reference-implied **palette** locked unless they also ask to change color. Bind, don't multiply: do not turn this into a 3×3 matrix of previews by default — show 3 style directions, then merge the chosen style with the locked palette into updated concepts/mood boards.

**Open an explicit palette pass** the same way when they ask (e.g. "colors are wrong but style is right" / "warmer palette"). Offer **3 palette options** while holding style steady, unless they ask to vary both.

Never proactively force "pick a style from these three" before the user has reacted to the default concepts.

### Phase 3a: Typography Exploration

Before locking each concept, explicitly explore typography as its own design axis rather than treating it as a byproduct of the color palette.

For each of the 3 directions, define:

- **Heading font**
- **Body font**
- **Typography attitude**: editorial / neutral / operational / warm / premium / playful
- **Hierarchy feel**: dramatic / balanced / compact / dense-data / reading-led
- **Weight strategy**: where the visual emphasis lives
- **Readability posture**: how the type should behave for the target page archetype
- **Fallback stack**: include multilingual or CJK-safe fallbacks when relevant
- **Fit rationale**: why this pairing fits the user's product background and audience

Typography exploration should produce meaningful variation between directions. Do not let all 3 concepts share the same font logic with only palette changes.

For each concept, define:

```
Concept: [Name]
Mood: [2-3 word summary]
Color palette: [5-6 hex colors with roles]
Typography: [Heading font + Body font pairing]
Typography rationale: [Why this pairing fits the product, audience, and page type]
Fallbacks: [Latin stack + CJK/multilingual fallback if relevant]
Spacing feel: [Tight/Balanced/Generous]
Radius: [Sharp/Subtle/Rounded/Pill]
Shadow: [None/Subtle/Pronounced]
Motion personality: [Still/Subtle/Polished/Cinematic]
Motion tempo: [Slow/Medium/Fast]
Motion easing: [Calm/Sharp/Elastic]
Signature detail: [One distinctive element — e.g., grain texture, gradient accents, outlined icons, scroll-triggered reveals]
Consumer app posture: [if applicable: navigation model, primary loop, state strategy, tactile interaction feel]
```

When the exploration starts from a concrete UI reference plus product background, vary along dimensions such as:

- brand temperature
- material treatment
- density tuning
- typography attitude
- motion personality

Do not vary the page archetype so much that the concepts stop fitting the user's actual product surface.

### Phase 3b: Mood Board Checkpoint

After synthesizing concepts and before generating detailed UI component previews, generate a **mood board** for each concept — see [MOOD-BOARD.md](MOOD-BOARD.md). Each mood board is a standalone HTML artifact that the user can open, compare, and react to.

This checkpoint is especially valuable when:

- The user's references are more atmospheric (photos, music, feelings) than UI-specific
- The user wants to validate the overall emotional direction before seeing concrete UI components
- The user needs a shareable artifact to discuss with stakeholders or collaborators

The mood board captures the concept's visual soul — colors, textures, typography mood, spatial feel, and motion hints — in a curated collage format. Once the user reacts ("this one feels right"), proceed to Phase 4 for detailed UI previews of the confirmed direction.

### Phase 4: Visual Preview Generation

For each concept, generate a **standalone concept preview page** as a self-contained HTML artifact that the user can open in a browser to see and feel the design direction. These previews do NOT modify the user's project — they are separate exploration artifacts.

Each concept preview page showcases:

```html
<!-- Structure of a concept preview artifact -->
<div class="concept-preview">
  <!-- 1. Color palette swatches -->
  <!-- 2. Typography samples (heading, subheading, body, label) -->
  <!-- 2b. Typography rationale and fallback stack -->
  <!-- 3. A sample card component with the concept's tokens applied -->
  <!-- 4. A sample button set (primary, secondary, ghost) with hover transitions -->
  <!-- 5. A mini layout snippet showing spacing and rhythm -->
  <!-- 6. Motion preview: CSS transitions on hover states, entrance fade-in animations -->
</div>
```

**Critical rules for previews**:
- Use inline styles or a `<style>` block — the preview must be self-contained
- Load Google Fonts via `<link>` if using specific fonts
- Make it visually polished — this IS the design pitch
- Each preview should feel distinctly different from the others
- Label each preview with its concept name and mood keywords
- Show the typography system in use, not just the font names
- For dense or operational surfaces, include at least one compact data/text sample to prove readability
- For Consumer app surfaces, include a realistic mobile/app viewport with navigation, a main screen, a detail/create flow, a non-happy state, and tap/sheet/tab motion. Do not present only a decorative hero or static card.
- For multilingual products, show the chosen fallback strategy directly in the preview
- Include CSS `transition` properties on interactive elements (buttons, cards) to demonstrate the concept's motion personality
- Include a simple entrance animation (e.g., `@keyframes fadeInUp`) to show the concept's tempo and easing
- Include `@media (prefers-reduced-motion: reduce)` that disables or simplifies animations
- **Previews are standalone artifacts** — they do NOT modify or write to the user's project files

### Phase 5: User Decision

Present the 3 concept previews and mood boards and let the user:

- **Choose one** → Proceed to formalize it as a design system (Capability 1)
- **Mix elements** → "I like the colors from Concept A but the typography from Concept B" → Create a merged concept and preview it
- **Explore other styles** (explicit only) → Run the [style pass](#palette-vs-style-two-layers--on-demand): 3 style options, prefer locked palette → re-bind and re-preview
- **Explore other palettes** (explicit only) → Run the palette pass: 3 palette options, prefer locked style → re-bind and re-preview
- **Reject all** → Ask what's missing, gather more signals, generate new concepts
- **Iterate on one** → "Concept B but warmer / darker / more playful" → Adjust and re-preview (micro-tweak; not a full style menu unless they ask for one)

### Phase 6: Formalization

Once the user confirms a direction, transition to **Design System Extraction** (Capability 1):
- Treat the chosen concept preview as the "reference image"
- Extract and formalize all tokens following [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- Output the complete design system using the template at [../assets/design-system-template.md](../assets/design-system-template.md)
- Generate a **standalone design system preview page** showcasing the formalized tokens applied to sample components

### Phase 7: Apply to Project

Once the user confirms the formalized design system and preview:
- Transition to **Apply Design to Project** (Capability 5) — see [APPLY-DESIGN.md](APPLY-DESIGN.md)
- Confirm the scope of application with the user
- Integrate the design tokens into the user's actual project
- This is the ONLY phase where the agent modifies project files

## Interaction Principles

- **No jargon**: Say "how round should corners be?" not "what border-radius token scale do you prefer?"
- **Show, don't describe**: Always generate visible previews rather than just listing hex codes
- **Visual output is mandatory by default**: If the workflow reaches concept synthesis, generate the mood boards and standalone concept preview pages in the same turn unless the user explicitly says they only want text analysis
- **Respect implied taste**: References already encode palette + style — do not open a separate style or palette menu unless the user asks
- **On-demand style / palette passes**: When they do ask, offer 3 options on that layer only; bind with the locked layer afterward
- **Explore typography explicitly**: Every concept needs a real type direction with rationale, readability posture, and fallback strategy
- **Embrace vagueness**: "Something that feels calm" is a valid starting point
- **Anchor to the user's words**: If they say "cozy", use that word back — "Here's a cozy direction with warm earth tones and soft rounded shapes"
- **Be opinionated**: Offer bold, distinctive directions. Safe/generic concepts are not helpful.
- **Iterate fast**: Better to show 3 quick concepts than deliberate endlessly on 1 perfect one
