# Skeleton → Content

Reserve space while loading so the layout does not jump when content arrives.

## Intent

Reduce perceived load time and prevent layout shift. Skeleton placeholders match the final content's shape and size.

## When to use

- Initial load of content-heavy screens (feeds, lists, detail pages)
- Slow connections where spinner would feel like a freeze
- Anywhere a layout jump would be jarring

## When NOT to use

- Fast operations (< 300ms) — use a spinner or no indicator
- Forms (use field-level loading states)
- When you genuinely don't know the final content shape

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration (crossfade) | `--duration-fast` to `--duration-normal` | 160ms |
| Duration (shimmer) | — | 1.4s loop |
| Easing | `--ease-default` | Calm |
| Distance | none (no translate; reserved height) | — |

## Web recipe

```css
.skeleton {
  --duration-fast: 120ms;
  --duration-normal: 240ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
  border-radius: 6px;
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
.content {
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-default);
}
.content.is-loaded { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; background: #2a2a2a; }
  .content { transition: opacity 80ms linear; }
}
```

## Demo

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --duration-fast: 120ms;
    --duration-normal: 240ms;
    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  }
  body { margin: 0; padding: 24px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; max-width: 480px; }
  .card { padding: 16px; background: #1a1a1a; border-radius: 12px;
    margin-bottom: 12px; min-height: 96px; }
  .skeleton {
    background: linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
    background-size: 200% 100%;
    animation: shimmer 1.4s linear infinite;
    border-radius: 6px;
    margin-bottom: 8px;
  }
  .s-line { height: 12px; }
  .s-line.wide { width: 80%; }
  .s-line.medium { width: 50%; }
  .s-circle { width: 40px; height: 40px; border-radius: 50%; margin-bottom: 12px; }
  .content {
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-default);
  }
  .content.is-loaded { opacity: 1; }
  @keyframes shimmer {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .skeleton { animation: none; background: #2a2a2a; }
    .content { transition: opacity 80ms linear; }
  }
</style>
</head>
<body>
  <div class="card" id="card1">
    <div class="skeleton s-circle"></div>
    <div class="skeleton s-line wide"></div>
    <div class="skeleton s-line medium"></div>
    <div class="content">
      <strong>Anna Chen</strong>
      <p>Completed a 30-day meditation streak.</p>
    </div>
  </div>
  <div class="card" id="card2">
    <div class="skeleton s-line wide"></div>
    <div class="skeleton s-line"></div>
    <div class="content">
      <p>This is the loaded content.</p>
    </div>
  </div>
<script>
  // simulate content arriving
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((c, i) => {
      setTimeout(() => {
        c.querySelectorAll('.skeleton').forEach(s => s.style.display = 'none');
        c.querySelector('.content').classList.add('is-loaded');
      }, i * 400);
    });
  }, 300);
</script>
</body>
</html>
```

## Mobile-web recipe

Same CSS. On slow connections, prefer skeleton over spinner — it keeps the layout stable and reduces perceived wait.

## Mobile-native-aspirational pointer recipe

Same; native recycler views skip skeleton entirely because they render placeholders natively. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Static skeleton (gray rectangles, no shimmer).

## Common mistakes

- **Absolute sizes that don't match final content** — crossfade still causes layout jump; use `aspect-ratio` or fixed heights tied to typography tokens
- **Skeleton visible after content loaded** — `display: none` the skeleton, not just opacity, to avoid double-rendering
- **Crossfade hides the skeleton behind the content** — crossfade is fine, but make sure skeleton is hidden after the transition completes
- **Shimmer animation continues under reduce-motion** — pause the animation explicitly
- **Skeleton used for fast operations** — for < 300ms work, a spinner is sufficient
- **Skeleton shape does not match content** — placeholder for a list of cards should look like a card, not a circle