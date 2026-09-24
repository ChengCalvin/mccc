## Why

The current site is a single hand-authored `index.html` (339 lines: HTML + CSS + JS inline). Every piece of repeated content — news items, Spring Festival fair-year entries, community activity cards — is a hand-copied HTML block, and all three languages (zh/en/fr) are duplicated by hand inside one JS object (`T`). This does not scale: adding a news item means copy-pasting a card, and adding a string means editing it three times. Real article content already exists as markdown in `reference/texts/posts/*.md` but is unused by the live page. Moving to Astro replaces hand-duplicated HTML/JS with structured content files and a built-in i18n system, and enables static deployment on Vercel (near-zero hosting cost vs. WordPress) as a foundation this build's structure can later be generalized into a reusable starter for future client sites.

## What Changes

- Replace the single static `index.html` with an Astro project (file-based routing, component layout, static HTML output).
- **BREAKING**: Replace the inline `T = {zh:{...}, en:{...}, fr:{...}}` JS translation object with Astro's built-in i18n routing and per-locale data files.
- **BREAKING**: Replace hand-coded news/fair-year/activity `<a class="card">` blocks with Astro content collections (markdown + frontmatter), sourced from and superseding `reference/texts/posts/*.md`.
- Preserve existing visual design (colors, layout, dark-mode variables, hero/fair/activities/news/troupe/about/membership/contact sections) as ported Astro components/layouts, not a redesign.
- Preserve the theme toggle and language switcher behavior, reimplemented as Astro-native script (no JS framework required).
- Set up static deployment to Vercel.
- Out of scope: replacing the placeholder Lorem-ipsum copy in the `about` and `membership` sections (requires real content from the chamber) — tracked as follow-up, not part of this change.

## Capabilities

### New Capabilities
- `site-shell`: Astro project structure, layouts, and component-based page assembly that replaces the single static HTML file; includes theme toggle and static build/deploy to Vercel.
- `content-collections`: structured content model (markdown + frontmatter) for news, Spring Festival fair-years, and community activities, replacing hand-coded repeated HTML blocks.
- `internationalization`: locale-based routing and per-locale translation data (zh/en/fr) replacing the inline JS translation object, including language switcher behavior.

### Modified Capabilities
(none — no existing specs; this is a greenfield spec-driven capture of a from-scratch rebuild)

## Impact

- **Removed**: `index.html` as the site's sole source (superseded by Astro-generated output).
- **Restructured**: `reference/texts/posts/*.md` becomes the source for the `content-collections` capability (moved/adapted into Astro's `src/content/` structure).
- **Added**: Node/npm-based build tooling (`package.json`, `astro.config.mjs`), a `src/` directory (`pages/`, `layouts/`, `components/`, `content/`, `i18n/`).
- **Deployment**: target moves from a static-file host (implied) to Vercel's static hosting.
- **No backend/database**: this remains a fully static site; no server-side runtime is introduced.
