# MCCC — Project Context

## What this is
Official site for the **Montreal Chinese Chamber of Commerce (蒙特利尔华商会 / MCCC)** — a community organization serving Montreal's Chinese business community: Spring Festival temple fair, an arts troupe, community activities, news, and membership. Trilingual: Chinese (primary), English, French.

## Stack
- **Astro 7** — static output, no JS UI framework (approved decision, Next.js explicitly rejected as unneeded for this site's interactivity)
- **TypeScript**, **SCSS** (via `sass`) — **no Tailwind**, per design.md
- **Vitest** — test runner; `src/lib/i18n.test.ts` fails the suite if a translation key is missing from any locale
- i18n: Astro's built-in locale routing configured in `astro.config.mjs` (`zh`/`en`/`fr`, default `zh`); translation strings live in `src/i18n/{zh,en,fr}.json`, loaded via `src/lib/i18n.ts`'s `useTranslations()` — replaces the legacy inline `T = {zh:{...}}` JS object
- Content: Astro Content Collections (`news`, `fair-years`, `activities`, `troupe`) defined in `src/content.config.ts` (Astro 7's collection-config file — not `src/content/config.ts`, which is the deprecated legacy location), replacing hand-duplicated HTML cards
- Deploy target: Vercel, static output — project not yet linked; the user will run `vercel link`/`vercel deploy` themselves when ready
- The astro-migration change (openspec/changes/astro-migration/) is implemented; the legacy `index.html` has been removed now that the Astro build reached parity

## Project structure
```
astro.config.mjs              # i18n config (zh/en/fr, default zh)
vitest.config.ts
src/
  content.config.ts           # Zod schemas + glob loaders for the 4 content collections
  pages/
    index.astro                # zh (default locale, unprefixed)
    en/index.astro, fr/index.astro
  layouts/
    BaseLayout.astro           # head, header/nav, footer, theme toggle + locale-redirect scripts
  components/                  # section components (Hero, Stats, FairGrid, ActivitiesGrid, NewsList,
                                # TroupeList, About, Membership, Contact) + HomeContent.astro assembling them
  content/
    news/*.md                  # migrated reference/texts/posts/*.md articles (incl. ones unused by legacy site)
    fair-years/*.md             # 2017-2024 Spring Festival fair entries (year, edition, thumbnail, link)
    activities/*.md, troupe/*.md
  i18n/{zh,en,fr}.json          # per-locale translation data
  lib/
    i18n.ts                    # useTranslations() loader
    i18n.test.ts                # build-time completeness check (vitest)
  styles/
    global.scss                 # ported layout/component CSS, imports theme
    _theme.scss                 # design tokens (colors, fonts) — source of truth for brand
public/images/                 # media copied from reference/images/media/ (flat, numeric filenames)
openspec/                      # spec-driven workflow (schema: spec-driven)
  config.yaml
  changes/astro-migration/     # implemented proposal/design/tasks for this rebuild
reference/                     # scraped source material from the old WordPress site (kept for provenance)
  texts/posts/*.md             # source articles — migrated into src/content/, not read at build time
  texts/pages/, texts/api/     # WordPress export data (pages, categories, media index)
  images/, images/media/       # original image assets (public/images/ holds the ones actually used)
  styles/                      # old WordPress theme CSS (unused)
  icons/                       # language-flag icons (en-ca, fr-qc, zh-CN)
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
