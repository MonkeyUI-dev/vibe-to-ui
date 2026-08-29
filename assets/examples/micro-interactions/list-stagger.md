# List Stagger

Make a list of items read as a sequence, not as a wall. Bound to router recipe R1 in-view-stagger.

## Intent

Sequence a list as it enters view. Each row arrives after the previous one with a small delay, creating a sense of order rather than a wall of content.

## When to use

- Initial render of a long list (feed, settings, search results)
- Search results arriving after typing
- Filtered list updates

## When NOT to use

- Very long lists (> 12 items) — stagger only the first screenful
- Re-renders of the same list (do not re-stagger on filter changes)
- Lists where order doesn't matter (random recommendations)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration (per row) | `--duration-normal` | 240ms |
| Stagger (per row) | — | 40–80ms |
| Easing | `--ease-out` | Calm-out |
| Distance | `--motion-distance-sm` | 4–8px translateY |

## Web recipe

```css
.stagger-row {
  --duration-normal: 240ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --motion-distance-sm: 8px;
  opacity: 0;
  transform: translateY(var(--motion-distance-sm));
}
.stagger-row.is-in-view {
  animation: row-in var(--duration-normal) var(--ease-out) forwards;
  animation-delay: calc(var(--stagger-index, 0) * 60ms);
}
@keyframes row-in {
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .stagger-row { opacity: 0; transform: none; }
  .stagger-row.is-in-view {
    animation: row-fade 160ms linear forwards;
    animation-delay: 0;
  }
  @keyframes row-fade { to { opacity: 1; } }
}
```

```js
// IntersectionObserver to add is-in-view
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.stagger-row').forEach((row, i) => {
  row.style.setProperty('--stagger-index', i);
  io.observe(row);
});
```

## Demo

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --duration-normal: 240ms;
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --motion-distance-sm: 8px;
  }
  body { margin: 0; padding: 24px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; max-width: 480px; }
  .row {
    padding: 14px 16px; margin-bottom: 8px;
    background: #1a1a1a; border-radius: 10px;
    opacity: 0; transform: translateY(var(--motion-distance-sm));
  }
  .row.is-in-view {
    animation: row-in var(--duration-normal) var(--ease-out) forwards;
    animation-delay: calc(var(--stagger-index, 0) * 60ms);
  }
  @keyframes row-in { to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .row { opacity: 0; transform: none; }
    .row.is-in-view {
      animation: row-fade 160ms linear forwards;
      animation-delay: 0;
    }
    @keyframes row-fade { to { opacity: 1; } }
  }
</style>
</head>
<body>
  <div class="row">Row 1</div>
  <div class="row">Row 2</div>
  <div class="row">Row 3</div>
  <div class="row">Row 4</div>
  <div class="row">Row 5</div>
  <div class="row">Row 6</div>
  <div class="row">Row 7</div>
  <div class="row">Row 8</div>
<script>
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.row').forEach((row, i) => {
    row.style.setProperty('--stagger-index', Math.min(i, 6));
    io.observe(row);
  });
</script>
</body>
</html>
```

## Mobile-web recipe

Same CSS. Reduce stagger count on mid-tier mobile — cap total under 12 items (`Math.min(i, 6)` in the demo).

## Mobile-native-aspirational pointer recipe

Same animation curve; native recycler views (RecyclerView, UICollectionView) typically need no entrance animation because they only render visible rows. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Opacity-only, no stagger, no translate.

## Common mistakes

- **Stagger applied to every list re-render** — exhausting; use "once, then hold" (MOTION-SYSTEM.md § Dimension 7)
- **Stagger of > 100ms per row** — feels lazy; 40–80ms is the sweet spot
- **Stagger on very long lists** — cap to first 6 rows; the rest fade in lazily as they enter view
- **Stagger without `--stagger-index` set** — all rows animate at once; use `style.setProperty('--stagger-index', i)`
- **Re-staggering on filter change** — confusing; only stagger on first render
- **Animation runs longer than 320ms total** — first row's animation must complete before user expects to interact