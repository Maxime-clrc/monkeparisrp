# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static "character dossier" for a GTA RP character (Jeremy De Rocherfort), in French. There is no backend logic, database, or framework — PHP is used only as a server-side `include` mechanism to stitch HTML partials together. All interactivity is vanilla JS; all styling is SCSS compiled to CSS.

## Commands

```bash
npm install              # install Dart Sass (only dependency)
npm run sass:watch       # watch scss/ and recompile css/style.css on change (dev)
npm run sass:build       # one-shot compressed build, no source map (what CI runs)
```

To preview locally, serve the repo root with PHP so the `include`s resolve (the project lives under XAMPP's `htdocs`): visit `index.php` via `http://localhost/ParisRp/`. Opening `index.php` as a file will not work because of the PHP includes.

There is no test suite, linter, or build step beyond Sass.

## Architecture

- **`index.php`** is the only page. It pulls in `sections/*.php` partials in order, then loads each `js/*.js` module via `<script>` tags at the end of `<body>`. Adding a new content block = new file in `sections/`, add an `include` in `index.php`, and an anchor link in `sections/nav.php`.
- **`sections/`** — HTML partials (header, nav, identité, famille, relations, events, pnj, arc, tensions). Pure markup; no PHP logic beyond being included.
- **`scss/`** — partials compiled through `scss/main.scss`, which `@use`s each `_*.scss`. `_variables.scss` holds the design tokens. Edit SCSS, never `css/style.css` (it's a generated artifact; `.map` files are gitignored).
- **`js/`** — one IIFE module per feature (theme toggle, audio player, quest popin, nav, collapsibles, easter egg). Each is self-contained and guards on element existence (`if (!el) return;`) so a missing section never throws.
- **Theming**: light/dark via `data-theme` attribute on `<html>`, persisted in `localStorage('theme')`. An inline script in `index.php` `<head>` applies it before paint to avoid a flash; `js/theme.js` handles the toggle.
- **Audio player** (`js/audio_player.js`): fetches `audio/playlist.json` (a plain array of filenames in `audio/`) at runtime and builds the playlist. To change songs, drop the `.mp3` into `audio/` and update `playlist.json` — no code change needed.
- **Quest data** (`js/quetes.js`): the `quetes` array near the top of the file is the single source of truth for the quest popin. Statuses are `'en-cours' | 'bloque' | 'termine'`, sorted in that order. Editing content here is expected — there's a marked "modifie ici tes quêtes" block.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`: it runs `npm run sass:build`, then FTP-deploys the repo to OVH (`/www/`), excluding `.git`, `node_modules`, `scss/`, and `.map` files. So `css/style.css` must be committed (it's served in prod), but the SCSS sources are excluded from the upload. FTP credentials come from GitHub Actions secrets (`FTP_HOST`/`FTP_USER`/`FTP_PASS`).

## Conventions

- All UI text and comments are in French — match that when editing.
- JS targets older syntax (`var`, function expressions, IIFEs) rather than ES modules; stay consistent within a file.
