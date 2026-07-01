# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (HMR enabled)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run oxlint
```

No test runner is configured.

## Architecture

Single-page React 19 app built with Vite 8. Entry point: `index.html` → `src/main.jsx` → `src/App.jsx`.

- `src/App.jsx` — sole component; all UI lives here for now
- `src/assets/` — product images (oil, shampoo, conditioner, lotion, bodywash, sunstick, etc.) for the after.9 skincare brand site
- `public/` — static assets served at root (`favicon.svg`, `icons.svg` with SVG sprite)

## Linting

oxlint with `react` and `oxc` plugins (`.oxlintrc.json`). Key enforced rules:
- `react/rules-of-hooks` — error
- `react/only-export-components` — warn (constant exports allowed)
