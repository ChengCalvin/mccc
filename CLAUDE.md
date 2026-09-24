# MCCC — Project Context

## What this is
Official site for the **Montreal Chinese Chamber of Commerce (蒙特利尔华商会 / MCCC)** — a community organization serving Montreal's Chinese business community: Spring Festival temple fair, an arts troupe, community activities, news, and membership. Trilingual: Chinese (primary), English, French.

## Stack (target — see openspec/changes/astro-migration)
- Currently a single hand-authored `index.html` (no build tooling, no `package.json` yet)
- Migrating to **Astro** (static output, no JS UI framework — approved decision, Next.js explicitly rejected as unneeded for this site's interactivity)
- Plain CSS via custom properties (ported from the current `<style>` block) — **no Tailwind**, per design.md
- Content: Astro Content Collections (`news`, `fair-years`, `activities`) with Zod-validated frontmatter, replacing hand-duplicated HTML cards
- i18n: Astro's built-in locale routing (`zh`/`en`/`fr`, default `zh`), replacing the inline `T = {zh:{...}}` JS object
- Deploy target: Vercel, static output

## Project structure
```
index.html                          # current live site (legacy, single file — to be removed once Astro build reaches parity)
openspec/                           # spec-driven workflow (schema: spec-driven)
  config.yaml
  changes/astro-migration/          # approved proposal/design/tasks for the Astro rebuild
reference/                          # scraped source material from the old WordPress site
  texts/posts/*.md                  # real article content, not yet wired into the live page
  texts/pages/, texts/api/          # WordPress export data (pages, categories, media index)
  images/, images/media/            # image assets pulled from the old site
  styles/                           # old WordPress theme CSS (not used by current index.html)
  icons/                            # language-flag icons (en-ca, fr-qc, zh-CN)
```

## Key design decisions
- **Astro over Next.js/React**: current interactivity is two buttons (theme toggle, language switch) — no state/forms/routing complexity that justifies a JS app framework.
- **No JS UI framework installed initially**: theme toggle + language switcher stay as small inline Astro-native `<script>`s. Add one later (e.g. `astro add react`) only if a real need (e.g. a stateful membership form) appears.
- **Astro i18n is URL-based** (`/en/...`, `/fr/...`) — a deliberate change from today's single-URL client-side language swap, accepted for crawlable/shareable per-locale URLs. No redirect migration needed (prototype, no production traffic yet).
- **`about`/`membership` sections keep placeholder Lorem-ipsum copy** — real content needs to come from the chamber; tracked as a separate follow-up, not part of the Astro migration.
- **Greenfield spec capture, not a redesign**: visual design, section structure, and copy are preserved exactly during the migration.
- This build is meant to later generalize into a reusable starter for future client sites — avoid MCCC-specific choices in the Astro setup where a generic equivalent is equally simple (that generalization itself is out of scope for now).

## Commands
No `package.json` yet — build tooling is introduced by `openspec/changes/astro-migration` task 1.1 (`npm create astro@latest`). Until then there's nothing to build; `index.html` is opened directly.

## Environment
None currently. The planned Astro/Vercel static build needs no environment variables or backend secrets (no server runtime).

## Brand context
- **Audience**: Chinese business community in Montreal, QC — trilingual zh/en/fr, Chinese-first.
- **Palette**: red `#c8102e` (deep `#9a0c23`), gold `#b8893a` (soft `#f3e7cf`), ink `#1f1f1f`/`#555` on warm off-white `#faf8f4` — with a dark-mode variant (red brightens to `#e64946`, backgrounds invert to near-black `#161616`/`#0f0f0f`).
- **Typography**: Open Sans + Noto Sans SC / PingFang SC / Microsoft YaHei for CJK.
- **Contact**: 1070A Anderson, Montreal, Quebec H2Z 1L9 · (514) 800-3860 · mtlccoc@gmail.com · office hours Mon/Wed/Fri 1:30–5:30 PM.
- **Sections**: hero, stats bar, Spring Festival fair years, community activities, recent news, arts troupe, about the chamber, membership/join us, contact, friend links.
