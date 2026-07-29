---
title: 'Live light/dark mode switching, zero JavaScript'
date: '2026-07-12'
excerpt: 'Nine visual-direction concepts, each with its own light and dark mode, flipped live with a hidden checkbox and one CSS :has() rule.'
category: 'CSS'
---

Nine visual-direction concepts for a project this week, each needing its own light mode and dark mode. Not one inverted from the other, real separately designed pairs.

I wanted to flip between them live, side by side, while reviewing. First instinct was reaching for JavaScript to toggle a class and swap variables.

Turned out none was needed. A hidden checkbox sits inside each card, and one CSS rule using `:has()` does the rest:

```html
<article class="card">
  <input type="checkbox" class="toggle" />
  ...content...
</article>
```

```css
.card {
  --bg: var(--bg-light);
  background: var(--bg);
}

.card:has(.toggle:checked) {
  --bg: var(--bg-dark);
}
```

Each card defines its own light and dark values as custom properties. The moment its checkbox gets checked, `:has()` matches, the second rule wins on specificity, and `--bg` flips to the dark value. `background: var(--bg)` picks it up automatically. No signal, no store, no click handler.

> CSS alone can carry more interactive state than we usually give it credit for.

Worth flagging: `:has()` is a modern CSS feature, not something to lean on for very old browsers. For an internal design-review tool that only needed to run in an evergreen browser, it was the right tradeoff, and a good reminder that CSS alone can carry more interactive state than we usually give it credit for.
