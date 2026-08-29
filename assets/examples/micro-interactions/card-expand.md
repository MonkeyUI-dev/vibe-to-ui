# Card Expand

Reveal detail in place without a full navigation. Preserves the user's reading position.

## Intent

Let users see more detail about an item without leaving the list or the current scroll position.

## When to use

- FAQ accordions
- List rows that expand to show full content (preview → full)
- Settings rows that expand to show controls
- Any "show more" affordance

## When NOT to use

- Long-form content that needs its own URL (use a navigation transition)
- Lists where every row would expand (causes layout chaos — group or paginate instead)
- When the expanded content needs to interact with the rest of the page

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-normal` | 240ms |
| Easing | `--ease-default` | Calm |
| Distance | `--motion-distance-md` | 12–24px translate (entrance motion is on inner content, not the card) |

## Web recipe

```css
.expandable {
  --duration-normal: 240ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-distance-md: 16px;
}
.expandable .panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height var(--duration-normal) var(--ease-default),
              opacity var(--duration-normal) var(--ease-default);
}
.expandable[aria-expanded="true"] .panel {
  max-height: 600px; /* token-driven cap, not arbitrary */
  opacity: 1;
}
.expandable .panel-inner {
  transform: translateY(calc(var(--motion-distance-md) * -1));
  transition: transform var(--duration-normal) var(--ease-default);
}
.expandable[aria-expanded="true"] .panel-inner {
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .expandable .panel, .expandable .panel-inner,
  .expandable[aria-expanded="true"] .panel,
  .expandable[aria-expanded="true"] .panel-inner {
    transition: opacity 160ms linear;
    transform: none;
    max-height: 600px;
  }
  .expandable:not([aria-expanded="true"]) .panel { max-height: 0; }
}
```

## Demo

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --duration-normal: 240ms;
    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-distance-md: 16px;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; max-width: 560px; }
  .item { border: 1px solid #2a2a2a; border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
  .head {
    padding: 16px; cursor: pointer; user-select: none;
    display: flex; justify-content: space-between; align-items: center;
    background: #1a1a1a;
  }
  .head:active { background: #222; }
  .head .chev { transition: transform var(--duration-normal) var(--ease-default); }
  .item[aria-expanded="true"] .head .chev { transform: rotate(180deg); }
  .panel { max-height: 0; opacity: 0; overflow: hidden;
    transition: max-height var(--duration-normal) var(--ease-default),
                opacity var(--duration-normal) var(--ease-default); }
  .panel-inner {
    padding: 0 16px 16px; transform: translateY(calc(var(--motion-distance-md) * -1));
    transition: transform var(--duration-normal) var(--ease-default);
  }
  .item[aria-expanded="true"] .panel { max-height: 400px; opacity: 1; }
  .item[aria-expanded="true"] .panel-inner { transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) {
    .head .chev, .panel, .panel-inner,
    .item[aria-expanded="true"] .head .chev,
    .item[aria-expanded="true"] .panel,
    .item[aria-expanded="true"] .panel-inner {
      transition: opacity 160ms linear, transform none;
      transform: none;
    }
  }
</style>
</head>
<body>
  <div class="item" aria-expanded="false">
    <div class="head" data-toggle>How do I track a habit? <span class="chev">▾</span></div>
    <div class="panel"><div class="panel-inner">Tap any day on the streak grid and mark it done. The app records your streak automatically.</div></div>
  </div>
  <div class="item" aria-expanded="false">
    <div class="head" data-toggle>Can I edit past entries? <span class="chev">▾</span></div>
    <div class="panel"><div class="panel-inner">Yes — tap any past day and choose Edit. History is preserved for 90 days.</div></div>
  </div>
<script>
  document.querySelectorAll('[data-toggle]').forEach(head => {
    head.addEventListener('click', () => {
      const item = head.parentElement;
      const open = item.getAttribute('aria-expanded') === 'true';
      // close siblings (single-open mode)
      item.parentElement.querySelectorAll('.item[aria-expanded="true"]').forEach(other => {
        if (other !== item) other.setAttribute('aria-expanded', 'false');
      });
      item.setAttribute('aria-expanded', String(!open));
    });
  });
</script>
</body>
</html>
```

## Mobile-web recipe

Same CSS. Ensure parent is not scroll-locked — scroll-locked parents trap the tap. Tap target = entire head row (not just chevron).

## Mobile-native-aspirational pointer recipe

Shared-element transition (`view-transition-name` on web; native `sharedElements` if a bridge is available). Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Crossfade only — no height animation, no layout shift. Panel opens via opacity-only transition.

## Common mistakes

- **Animating `height: auto`** — does not animate cleanly; use `max-height` with a token-driven cap
- **Multiple cards open at once** — overwhelming; close siblings before opening the new one
- **Chevron and content animate independently** — feels disjointed; use the same `--duration-normal` for both
- **No close mechanism inside the panel** — users can collapse by tapping the head again, but a clear close affordance inside helps
- **Panel content larger than `max-height` cap** — content gets clipped; use a generous cap or measure the natural height in JS