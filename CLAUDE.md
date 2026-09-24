# MCCC — Project Context

## What this is
Official site for the **Montreal Chinese Chamber of Commerce (蒙特利尔华商会 / MCCC)** — a community organization serving Montreal's Chinese business community: Spring Festival temple fair, an arts troupe, community activities, news, and membership. Trilingual: Chinese (primary), English, French.

## Stack
- **Astro 7** — static output, no JS UI framework (approved decision, Next.js explicitly rejected as unneeded for this site's interactivity)
- **TypeScript**, **SCSS** (via `sass`) — **no Tailwind**, per design.md
- **Vitest** — test runner, no test files yet (nothing with logic to test until content collections/i18n land)
- i18n: Astro's built-in locale routing configured in `astro.config.mjs` (`zh`/`en`/`fr`, default `zh`) — will replace the legacy inline `T = {zh:{...}}` JS object
- Content: Astro Content Collections planned for `news`/`fair-years`/`activities` (not yet created — see tasks.md §4), replacing hand-duplicated HTML cards
- Deploy target: Vercel, static output
- `index.html` at the repo root is the **legacy live site** — kept until the Astro build reaches parity (tasks.md §7.4), not part of the Astro app

## Project structure
```
index.html                    # legacy live site (single file — remove once Astro build reaches parity)
astro.config.mjs              # i18n config (zh/en/fr, default zh)
vitest.config.ts
src/
  pages/index.astro           # entry route (placeholder — real sections land per tasks.md §2-6)
  layouts/                    # shared page layouts (empty — BaseLayout.astro planned, tasks.md §2)
  components/                 # shared UI components (empty — section components planned, tasks.md §4-6)
  content/                    # content collections: news/fair-years/activities (empty — schema planned, tasks.md §4.1)
  styles/
    global.scss                # base reset + body styles, imports theme
    _theme.scss                 # design tokens (colors, fonts) — source of truth for brand
  lib/                         # utilities (empty)
public/                       # static assets (favicon only so far)
openspec/                     # spec-driven workflow (schema: spec-driven)
  config.yaml
  changes/astro-migration/    # approved proposal/design/tasks for this rebuild
reference/                    # scraped source material from the old WordPress site
  texts/posts/*.md            # real article content, not yet migrated into src/content/
  texts/pages/, texts/api/    # WordPress export data (pages, categories, media index)
  images/, images/media/      # image assets pulled from the old site
  styles/                     # old WordPress theme CSS (not used by current index.html)
  icons/                      # language-flag icons (en-ca, fr-qc, zh-CN)
```

## Key design decisions
- **Astro over Next.js/React**: current interactivity is two buttons (theme toggle, language switch) — no state/forms/routing complexity that justifies a JS app framework.
- **No JS UI framework installed initially**: theme toggle + language switcher stay as small inline Astro-native `<script>`s. Add one later (e.g. `astro add react`) only if a real need (e.g. a stateful membership form) appears.
- **Astro i18n is URL-based** (`/en/...`, `/fr/...`) — a deliberate change from today's single-URL client-side language swap, accepted for crawlable/shareable per-locale URLs. No redirect migration needed (prototype, no production traffic yet).
- **`about`/`membership` sections keep placeholder Lorem-ipsum copy** — real content needs to come from the chamber; tracked as a separate follow-up, not part of the Astro migration.
- **Greenfield spec capture, not a redesign**: visual design, section structure, and copy are preserved exactly during the migration.
- This build is meant to later generalize into a reusable starter for future client sites — avoid MCCC-specific choices in the Astro setup where a generic equivalent is equally simple (that generalization itself is out of scope for now).

## Commands
```bash
npm run dev       # astro dev — dev server
npm run build     # astro build — static output to dist/
npm run preview   # astro preview — serve the built output locally
npm run test      # vitest run — no test files yet
```

## Environment
None currently. The Astro/Vercel static build needs no environment variables or backend secrets (no server runtime).

## Brand context
- **Audience**: Chinese business community in Montreal, QC — trilingual zh/en/fr, Chinese-first.
- **Palette / tokens**: defined in `src/styles/_theme.scss` — red `#c8102e` (deep `#9a0c23`), gold `#b8893a` (soft `#f3e7cf`), ink `#1f1f1f`/`#555` on warm off-white `#faf8f4`, with a dark-mode variant (red brightens to `#e64946`, backgrounds invert to near-black `#161616`/`#0f0f0f`). Treat that file as the single source of truth for colors — don't hardcode hex values elsewhere.
- **Typography**: Open Sans + Noto Sans SC / PingFang SC / Microsoft YaHei for CJK (`--font-body` in `_theme.scss`).
- **Contact**: 1070A Anderson, Montreal, Quebec H2Z 1L9 · (514) 800-3860 · mtlccoc@gmail.com · office hours Mon/Wed/Fri 1:30–5:30 PM.
- **Sections**: hero, stats bar, Spring Festival fair years, community activities, recent news, arts troupe, about the chamber, membership/join us, contact, friend links.
