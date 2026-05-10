# Agent Guide

## Project Context

This project is a premium single-page personal portfolio built on Vite+.

The page combines:

- An Apple-like premium visual language
- A hedge-fund or terminal-inspired data-visualization mood
- A full-screen interactive canvas aurora
- English-only content
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
- Canvas-based aurora with flowing light bands
- Hover-based brightening and gentle ribbon bending
- Canvas fade-out while scrolling into section 2 for readability
- Responsive ribbon count reduction on smaller screens

## Tech Stack

- Vite+ for dev/build/check workflow
- React 19
- TypeScript
- Vite React plugin
- Canvas 2D API for aurora rendering
- Tailwind CSS via `@tailwindcss/vite`
- Thin global CSS for theme tokens, canvas, and motion states
- `pnpm` as the package manager managed through Vite+

## Project Structure

- [index.html](/Users/jason/Github/Me/profolio/index.html): app entry HTML and early theme bootstrap
- [vite.config.mjs](/Users/jason/Github/Me/profolio/vite.config.mjs): Vite+ config, React plugin, Tailwind Vite plugin, lint/fmt behavior
- [src/main.tsx](/Users/jason/Github/Me/profolio/src/main.tsx): React bootstrap
- [src/App.tsx](/Users/jason/Github/Me/profolio/src/App.tsx): top-level page orchestration, scroll container, and reveal observer setup
- [src/styles.css](/Users/jason/Github/Me/profolio/src/styles.css): Tailwind entry file plus global theme tokens, canvas, and reveal states
- [src/components/ThemeSwitcher.tsx](/Users/jason/Github/Me/profolio/src/components/ThemeSwitcher.tsx): theme switch UI
- [src/components/StarfieldCanvas.tsx](/Users/jason/Github/Me/profolio/src/components/StarfieldCanvas.tsx): canvas aurora renderer and interaction logic
- [src/content/siteContent.ts](/Users/jason/Github/Me/profolio/src/content/siteContent.ts): single-source English content for the page
- [src/sections/HeroSection.tsx](/Users/jason/Github/Me/profolio/src/sections/HeroSection.tsx): hero section content and toolbar
- [src/sections/AboutSection.tsx](/Users/jason/Github/Me/profolio/src/sections/AboutSection.tsx): about section content
- [src/sections/ProjectsSection.tsx](/Users/jason/Github/Me/profolio/src/sections/ProjectsSection.tsx): project grid section
- [src/sections/ContactSection.tsx](/Users/jason/Github/Me/profolio/src/sections/ContactSection.tsx): contact section content
- [src/sections/sectionStyles.ts](/Users/jason/Github/Me/profolio/src/sections/sectionStyles.ts): shared section-level Tailwind class constants
- [src/hooks/useThemePreference.ts](/Users/jason/Github/Me/profolio/src/hooks/useThemePreference.ts): theme persistence and resolution

## Working Rules

### Visual Direction

- Preserve the premium, restrained, dark-luxury feel.
- Avoid generic startup-site aesthetics.
- Avoid adding loud colors, playful UI, or default-component-library styling.
- Motion should feel deliberate and calm, not busy.
- New sections or cards should match the current typography, spacing, border radius, and glass treatment.
- Prefer Tailwind utilities in component markup for layout, spacing, typography, and responsive behavior.
- Keep custom CSS thin and reserved for global theme tokens, pseudo-elements, canvas layering, and animation states.
- Keep page sections under `src/sections` rather than growing `src/App.tsx`.

### Canvas Rules

- Keep the aurora logic modular inside `StarfieldCanvas.tsx` unless a clear extraction point appears.
- Preserve `requestAnimationFrame` rendering.
- Keep per-frame work bounded for mobile responsiveness.
- Preserve hover-driven brightening and bending without introducing visibly jittery motion.

### Content Rules

- Keep user-facing copy in `src/content/siteContent.ts`.
- Do not reintroduce translation tooling unless explicitly requested.
- When editing copy, keep component usage simple and explicit.

### Theme Rules

- Support all three modes: `system`, `light`, `dark`.
- Keep theme values tokenized in CSS custom properties.
- When using Tailwind classes, reference theme tokens through CSS variables instead of hardcoded one-off colors where practical.

## Quality Requirements

Every meaningful change should maintain all of the following:

- `vp check` passes
- `vp build` passes

## Commands

From the repo root:

- `vp dev` to run the app locally
- `vp check` for formatting, linting, and type-checking
- `vp build` for a production build

## Change Guidance

- Prefer small, localized edits over broad rewrites.
- Do not reintroduce the old non-Vite+ static structure.
- Do not add unused starter assets or template code.
- Remove dead code when replacing behavior.
- Keep files UTF-8 and formatting compliant with Vite+ tooling.
- Do not move large amounts of presentational styling back into ad hoc plain CSS if Tailwind utilities can express it cleanly.

## Definition of Done

A change is not done unless:

- The visual and interaction model still matches the current portfolio concept
- No legacy scaffold code remains for the changed area
- `vp check` and `vp build` both pass
