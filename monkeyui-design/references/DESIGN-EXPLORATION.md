# Design Exploration Guide

## Overview

This guide covers the interactive process of helping users who have vague aesthetic feelings — not a concrete design target — discover and define their visual direction.

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

### Phase 2: Inspiration Collection

Invite the user to share visual references. These can be anything:

- **Direct references**: Screenshots of websites/apps they like
- **Indirect references**: Photos of landscapes, architecture, fashion, nature, objects
- **Abstract references**: Color swatches, mood words, music genres, feelings

For each image or description the user shares, extract aesthetic signals:

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

Feed these signals back to the user: "From this mountain landscape, I'm picking up: cool temperature, airy density, organic shapes, textured surfaces. Does that resonate?"

### Phase 3: Concept Synthesis

Based on collected signals, synthesize 2–3 distinct design concepts. Each concept should:

1. Have a **concept name** (evocative, memorable — e.g., "Nordic Dawn", "Urban Pulse", "Zen Garden")
2. Lean into the aesthetic signals somewhat differently
3. Be visually distinguishable from the other concepts

For each concept, define:

```
Concept: [Name]
Mood: [2-3 word summary]
Color palette: [5-6 hex colors with roles]
Typography: [Heading font + Body font pairing]
Spacing feel: [Tight/Balanced/Generous]
Radius: [Sharp/Subtle/Rounded/Pill]
Shadow: [None/Subtle/Pronounced]
Signature detail: [One distinctive element — e.g., grain texture, gradient accents, outlined icons]
```

### Phase 4: Visual Preview Generation

For each concept, generate a **concrete HTML artifact** that the user can see and feel. This is a single-page demo component showcasing:

```html
<!-- Structure of a concept preview artifact -->
<div class="concept-preview">
  <!-- 1. Color palette swatches -->
  <!-- 2. Typography samples (heading, subheading, body, label) -->
  <!-- 3. A sample card component with the concept's tokens applied -->
  <!-- 4. A sample button set (primary, secondary, ghost) -->
  <!-- 5. A mini layout snippet showing spacing and rhythm -->
</div>
```

**Critical rules for previews**:
- Use inline styles or a `<style>` block — the preview must be self-contained
- Load Google Fonts via `<link>` if using specific fonts
- Make it visually polished — this IS the design pitch
- Each preview should feel distinctly different from the others
- Label each preview with its concept name and mood keywords

### Phase 5: User Decision

Present the concepts and let the user:

- **Choose one** → Proceed to formalize it as a design system (Capability 1)
- **Mix elements** → "I like the colors from Concept A but the typography from Concept B" → Create a merged concept and preview it
- **Reject all** → Ask what's missing, gather more signals, generate new concepts
- **Iterate on one** → "Concept B but warmer / darker / more playful" → Adjust and re-preview

### Phase 6: Formalization

Once the user confirms a direction, transition to **Design System Extraction** (Capability 1):
- Treat the chosen concept preview as the "reference image"
- Extract and formalize all tokens following [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- Output the complete design system using the template at [../assets/design-system-template.md](../assets/design-system-template.md)

## Interaction Principles

- **No jargon**: Say "how round should corners be?" not "what border-radius token scale do you prefer?"
- **Show, don't describe**: Always generate visible previews rather than just listing hex codes
- **Embrace vagueness**: "Something that feels calm" is a valid starting point
- **Anchor to the user's words**: If they say "cozy", use that word back — "Here's a cozy direction with warm earth tones and soft rounded shapes"
- **Be opinionated**: Offer bold, distinctive directions. Safe/generic concepts are not helpful.
- **Iterate fast**: Better to show 3 quick concepts than deliberate endlessly on 1 perfect one
