# Tab Indicator

Glide the active marker between tabs without restarting the layout.

## Intent

Make tab switching feel continuous — the active marker moves, the content underneath doesn't flash.

## When to use

- Top tabs (segmented control) inside a single screen
- Bottom tab bars (visual indicator only; navigation is per-tap)
- Vertical tab lists (settings panels)

## When NOT to use

- Page navigation (use page-transition.md)
- Swipeable tab containers (the gesture IS the motion — see MOBILE-GESTURES.md)
- Tab bars with icons only (no text label — indicator adds noise)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-normal` | 200–280ms |
| Easing | `--ease-default` | Calm |
| Distance | `--motion-distance-sm` | 4–8px (indicator height, not travel) |

## Web recipe

```css
.tabs {
  --duration-normal: 240ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-distance-sm: 8px;
  position: relative; display: flex;
  border-bottom: 1px solid #2a2a2a;
}
.tab {
  flex: 1; padding: 12px;
  background: transparent; border: 0; color: #888;
  cursor: pointer; touch-action: manipulation;
}
.tab[aria-selected="true"] { color: #fff; }
.indicator {
  position: absolute; bottom: 0; height: 2px;
  background: var(--color-primary, #4d9aff);
  transition: transform var(--duration-normal) var(--ease-default),
              width var(--duration-normal) var(--ease-default);
}
@media (prefers-reduced-motion: reduce) {
  .indicator, .tab[aria-selected="true"], .tab {
    transition: color 80ms linear;
  }
  .indicator { transition: none; }
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
    --motion-distance-sm: 8px;
    --color-primary: #4d9aff;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; max-width: 480px; }
  .tabs { position: relative; display: flex;
    border-bottom: 1px solid #2a2a2a; }
  .tab {
    flex: 1; padding: 12px; background: transparent;
    border: 0; color: #888; font: 14px system-ui;
    cursor: pointer; touch-action: manipulation;
    transition: color var(--duration-normal) var(--ease-default);
  }
  .tab[aria-selected="true"] { color: #fff; }
  .indicator {
    position: absolute; bottom: 0; height: 2px;
    background: var(--color-primary);
    transition: transform var(--duration-normal) var(--ease-default),
                width var(--duration-normal) var(--ease-default);
  }
  .panels { padding: 16px 0; min-height: 80px; }
  .panel { display: none; color: #aaa; }
  .panel.is-active { display: block; }
  @media (prefers-reduced-motion: reduce) {
    .tab, .indicator { transition: color 80ms linear; }
    .indicator { transition: none; }
  }
</style>
</head>
<body>
  <div class="tabs" role="tablist" id="tabs">
    <button class="tab" role="tab" aria-selected="true" data-id="home">Home</button>
    <button class="tab" role="tab" aria-selected="false" data-id="search">Search</button>
    <button class="tab" role="tab" aria-selected="false" data-id="profile">Profile</button>
    <div class="indicator" id="indicator"></div>
  </div>
  <div class="panels">
    <div class="panel is-active" data-id="home">Home content</div>
    <div class="panel" data-id="search">Search content</div>
    <div class="panel" data-id="profile">Profile content</div>
  </div>
<script>
  const tabs = document.querySelectorAll('.tab');
  const indicator = document.getElementById('indicator');
  const panels = document.querySelectorAll('.panel');
  function activate(tab) {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.id === tab.dataset.id));
    const r = tab.getBoundingClientRect();
    const pr = tab.parentElement.getBoundingClientRect();
    indicator.style.width = r.width + 'px';
    indicator.style.transform = `translateX(${r.left - pr.left}px)`;
  }
  tabs.forEach(t => t.addEventListener('click', () => activate(t)));
  // initial position
  requestAnimationFrame(() => activate(tabs[0]));
</script>
</body>
</html>
```

## Mobile-web recipe

Same CSS. On swipeable tab containers, do not animate the indicator on swipe between tabs — the gesture IS the motion. Animate only on tap-switch.

## Mobile-native-aspirational pointer recipe

Selection haptic on tab change. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Color-only. Active tab still has a static marker (instant jump, no glide).

## Common mistakes

- **Animating height changes** — indicator should be a fixed-height element with `transform` and `width`
- **Indicator width based on `flex` distribution** — flex changes on resize cause layout thrash; measure `getBoundingClientRect()`
- **No `aria-selected` state** — screen readers do not know which tab is active
- **Tab switch triggers full re-render** — preserve component identity between switches (use keys / keep-alive)
- **Indicator animation runs slower than the content swap** — keep them in sync via a single CSS transition