# Samir Zahri — Cinematic Portfolio

Production-ready single-page portfolio for GitHub Pages.

## Purpose

This site presents Samir Zahri as a filmmaker, director and cinematographer for international Master's, European film-school and scholarship-related applications. The portfolio emphasizes verified filmmaking roles, academic development, photography, selected professional practice and clearly separated experimental AI-assisted moving-image work.

## Publish on GitHub Pages

1. Create or open the GitHub repository used for the portfolio.
2. Upload **all files and folders from this project root**. Do not upload only `index.html`.
3. Keep the folder structure unchanged.
4. In GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**.
5. Select `main` and `/(root)`, then Save.
6. GitHub Pages will publish the site using the relative paths already used throughout the project.

## Required real assets

### Portrait

Place the real portrait at exactly:

`assets/images/portrait/samir-zahri-portrait.jpg`

Do not rename or replace it with generated or stock imagery.

### Photography

Place all 21 original JPG files in:

`assets/images/photography/`

The exact filenames are registered in `data/portfolio.json` and documented in `assets/images/photography/README.md`. GitHub Pages is case-sensitive; do not change capitalization, hyphens, underscores, or extensions.

## Data and content

- `data/portfolio.json` is the structured source of truth used for portfolio content and media references.
- `data/portfolio-data.js` mirrors the same data so the site can work reliably as a static GitHub Pages site and when opened directly.
- `script.js` renders films, archive entries, academic content, technical background, photography and dialogs.
- `styles.css` contains the cinematic editorial design system and responsive behavior.

When editing content, keep `portfolio.json` and `portfolio-data.js` synchronized.

## Video sources

YouTube videos use privacy-enhanced `youtube-nocookie.com` embeds. Vimeo uses `player.vimeo.com`. Videos do not autoplay with sound.

## Photography behavior

All 21 expected source paths remain in the project. If a physical image is temporarily absent, the public gallery hides that missing image cleanly rather than showing a broken-image icon or developer warning. No stock or generated substitute is used.

## Film stills

`assets/images/stills/` is reserved only for verified stills from real productions. Do not use stock or generated images as documentary evidence of conventional film work.

## GitHub Pages compatibility

All local project paths are relative (`./assets/...`, `./data/...`) and do not rely on a backend, database, localhost server or paid service.

## Final checks before publishing

- Confirm portrait filename exactly.
- Confirm all 21 photography filenames exactly.
- Open every embedded film/player.
- Check the site on mobile and desktop.
- Confirm no broken images or links.
- Do not add unsupported awards, ECTS values, admissions, language certificates or inflated film credits.
