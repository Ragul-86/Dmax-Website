## Plan — Fix CTA flip not applying in dark mode

### Bug
`.scene-light` and `.scene-dark` are plain CSS rules in `src/styles.css`, not registered Tailwind utilities. Tailwind v4 only applies the `dark:` variant to utilities it knows about, so `dark:scene-light` was dropped from the compiled output. The background stayed dark in dark mode while the text correctly flipped to dark → invisible dark-on-dark text (matches the screenshot).

### Fix
Register both scene helpers as Tailwind utilities so variants work:
- In `src/styles.css`, replace the plain `.scene-dark { ... }` and `.scene-light { ... }` rules with `@utility scene-dark { ... }` and `@utility scene-light { ... }`. Same gradients, just declared via `@utility` so Tailwind generates them and supports `dark:scene-light`.
- Keep `.stars-force` as-is (it's used without a `dark:` variant).
- No change needed in `CTA.tsx` — class names (`scene-dark dark:scene-light`, `text-white dark:text-graphite`, `dark:hidden` on stars, etc.) are already correct.

### Scope
- Single file: `src/styles.css`.
- No deps, no DB, no routes, no component changes.
