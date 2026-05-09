# Agent Guide

## Project Context

This project is a premium single-page personal portfolio built on Vite+.

The page combines:

- An Apple-like premium visual language
- A hedge-fund or terminal-inspired data-visualization mood
- A full-screen interactive canvas starfield
- Hidden zodiac constellations that reveal on cursor proximity
- Bilingual content with `react-i18next`
- User-selectable `system` / `light` / `dark` theme behavior

The intended experience is restrained, cinematic, and high-end. The hero should feel ambient first and only reveal structure through interaction.

## Product Behavior

The current page is a single-screenflow portfolio with four full-height sections:

1. Hero
2. About
3. Projects
4. Contact

Key interactive behaviors:

- CSS scroll snapping between sections
- Intersection Observer reveal animations for text and cards
- Canvas-based starfield with ambient particles
- Cursor repulsion for nearby stars
- Hidden zodiac groups that activate by proximity to each constellation center
- Lerp-based fade transitions for constellation stars, lines, and labels
- Canvas fade-out while scrolling into section 2 for readability
- Responsive star count reduction on smaller screens

## Tech Stack

- Vite+ for dev/build/check workflow
- React 19
- TypeScript
- Vite React plugin
- Canvas 2D API for starfield rendering
- `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- `i18next-cli` for extraction validation
- Plain CSS in one app stylesheet
- `pnpm` as the package manager managed through Vite+

## Project Structure

- [index.html](/Users/jason/Github/Me/fun/index.html): app entry HTML and early theme bootstrap
- [vite.config.mjs](/Users/jason/Github/Me/fun/vite.config.mjs): Vite+ config, React plugin, lint/fmt behavior
- [i18next.config.ts](/Users/jason/Github/Me/fun/i18next.config.ts): extraction config for translation catalogs
- [src/main.tsx](/Users/jason/Github/Me/fun/src/main.tsx): React bootstrap
- [src/App.tsx](/Users/jason/Github/Me/fun/src/App.tsx): page composition and section layout
- [src/styles.css](/Users/jason/Github/Me/fun/src/styles.css): global visual system, layout, theming, motion states
- [src/i18n.ts](/Users/jason/Github/Me/fun/src/i18n.ts): i18n initialization and language detection
- [src/components/LanguageSwitcher.tsx](/Users/jason/Github/Me/fun/src/components/LanguageSwitcher.tsx): locale switch UI
- [src/components/ThemeSwitcher.tsx](/Users/jason/Github/Me/fun/src/components/ThemeSwitcher.tsx): theme switch UI
- [src/components/StarfieldCanvas.tsx](/Users/jason/Github/Me/fun/src/components/StarfieldCanvas.tsx): canvas engine and hidden-zodiac behavior
- [src/data/zodiac.ts](/Users/jason/Github/Me/fun/src/data/zodiac.ts): zodiac geometry and connection data
- [src/hooks/useThemePreference.ts](/Users/jason/Github/Me/fun/src/hooks/useThemePreference.ts): theme persistence and resolution
- [src/locales/en/translation.json](/Users/jason/Github/Me/fun/src/locales/en/translation.json): English strings
- [src/locales/zh-HK/translation.json](/Users/jason/Github/Me/fun/src/locales/zh-HK/translation.json): Traditional Chinese strings

## Working Rules

### Visual Direction

- Preserve the premium, restrained, dark-luxury feel.
- Avoid generic startup-site aesthetics.
- Avoid adding loud colors, playful UI, or default-component-library styling.
- Motion should feel deliberate and calm, not busy.
- New sections or cards should match the current typography, spacing, border radius, and glass treatment.

### Canvas Rules

- Keep the starfield logic modular inside `StarfieldCanvas.tsx` unless a clear extraction point appears.
- Preserve `requestAnimationFrame` rendering.
- Do not introduce per-star expensive checks for constellation activation.
- Group-level activation should remain based on constellation centers, not background-star scans.
- Maintain mobile-friendly particle counts.
- Preserve smooth opacity interpolation behavior for zodiac elements.

### i18n Rules

- Any new user-facing text must be translated in both locale files.
- Prefer explicit `t("...")` calls for strings that must be extracted.
- Avoid hiding translation keys behind opaque dynamic string composition unless extraction is updated to support it.
- After changing translatable content, run extraction checks.

### Theme Rules

- Support all three modes: `system`, `light`, `dark`.
- Keep theme values tokenized in CSS custom properties.
- Do not hardcode colors directly in component markup unless unavoidable for canvas rendering.

## Quality Requirements

Every meaningful change should maintain all of the following:

- `vp check` passes
- `vp build` passes
- `vp run i18n:extract:ci` passes with no file updates

If strings changed intentionally, run:

- `vp run i18n:extract`

Then verify again with:

- `vp run i18n:extract:ci`

## Commands

From the repo root:

- `vp dev` to run the app locally
- `vp check` for formatting, linting, and type-checking
- `vp build` for a production build
- `vp run i18n:extract` to update locale catalogs
- `vp run i18n:extract:ci` to confirm extraction is clean

## Change Guidance

- Prefer small, localized edits over broad rewrites.
- Do not reintroduce the old non-Vite+ static structure.
- Do not add unused starter assets or template code.
- Remove dead code when replacing behavior.
- Keep files UTF-8 and formatting compliant with Vite+ tooling.

## Definition of Done

A change is not done unless:

- The visual and interaction model still matches the current portfolio concept
- Translations are complete
- No legacy scaffold code remains for the changed area
- `vp check`, `vp build`, and extraction CI all pass
