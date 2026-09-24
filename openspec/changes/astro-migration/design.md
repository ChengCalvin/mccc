## Context

See proposal.md - Why. Current state: one `index.html` file with inline `<style>`, inline `<script>`, and every content item and translated string hand-duplicated. `reference/texts/posts/*.md` holds real article content that the current page doesn't use. No build tooling exists yet (no `package.json`). This is a greenfield capture — no existing specs, so all capabilities are additions.

Constraint worth naming: this build is also intended to later be generalized into a reusable starter for future client sites (see prior exploration), so decisions here should avoid MCCC-specific choices where a generic equivalent is equally simple — but that generalization itself is out of scope for this change.

## Goals / Non-Goals

**Goals:**
- Replace hand-duplicated content/translations with Astro content collections and Astro's built-in i18n.
- Preserve the current visual design and section structure exactly (no redesign).
- Ship as a static site deployable to Vercel with no server runtime.
- Keep the implementation free of a JS UI framework (React/Vue/etc.) — current interactivity (theme toggle, language switch) doesn't need one.

**Non-Goals:**
- Writing real `about`/`membership` copy to replace the Lorem-ipsum placeholders (needs chamber-provided content; tracked separately).
- Building a CMS/admin UI for non-developer publishing (current model is dev-owned edits via git).
- Extracting a generalized starter template (this change produces MCCC's own site; generalization is a later effort).
- Adding a JS UI framework (React etc.) — not needed for current interactivity.

## Decisions

### Astro over Next.js/plain React
Current interactivity is two buttons (theme toggle, language switch); no client-side state, forms, or routing complexity that would justify a JS application framework. Astro ships zero JS by default and is purpose-built for static, mostly-content sites. Alternative considered: Next.js — rejected as it defaults to shipping a JS app runtime this site doesn't need.

### Astro Content Collections for news / fair-years / activities
Each becomes its own collection under `src/content/`:
- `src/content/news/*.md` — frontmatter: `title`, `date`, `image`, `tag`, `link` (external, if not migrating full article body) or `body` (if migrating full text from `reference/texts/posts/`).
- `src/content/fair-years/*.md` — frontmatter: `year`, `edition` (e.g. "第8届"), `title`, `date`, `thumbnail`, `link`.
- `src/content/activities/*.md` — frontmatter: `title`, `date`, `image`, `tag`, `link`.

A `src/content/config.ts` defines a Zod schema per collection so a missing/invalid field fails the build (satisfies the content-collections spec's validation requirement). `reference/texts/posts/*.md` content is migrated into these collections rather than left unused.

### Astro built-in i18n over a hand-rolled translation object
`astro.config.mjs` declares `i18n: { locales: ['zh', 'en', 'fr'], defaultLocale: 'zh' }`. Translation strings move to `src/i18n/{zh,en,fr}.json` (or `.ts`), one file per locale, loaded via Astro's `useTranslations`-style pattern. Locale choice persists via `localStorage`, same mechanism as today, read on page load to redirect/render the stored locale. Alternative considered: a client-side-only swap (current approach, kept as one JS object) — rejected, it's the exact duplication problem this change fixes.

Trade-off accepted: Astro's i18n routing is URL-based (`/en/...`, `/fr/...`) rather than the current single-URL-all-languages-client-swapped model. This is a deliberate behavior change, not an oversight — it gives each language its own crawlable/shareable URL, which the current design doesn't have.

### No JS UI framework installed initially
Theme toggle and language switcher stay as small inline `<script>` (Astro-native), same posture as the current site. If a future need arises (e.g. a stateful membership form), `npx astro add react` can be added then — not pre-installed speculatively.

### Deployment: Vercel, static output
`astro build` produces static output; Vercel's static hosting serves it with no server function needed. No environment variables or backend secrets required for this change's scope.

## Risks / Trade-offs

- **[Risk]** URL structure changes (locale-prefixed routes) could break any existing external links/bookmarks to the current single-URL page. → **Mitigation**: this is a from-scratch prototype with no production traffic yet; no redirect migration needed for this change. Revisit if the site is already live with inbound links by the time this ships.
- **[Risk]** Content migrated from `reference/texts/posts/*.md` may not map cleanly to the new frontmatter schema (inconsistent existing formatting). → **Mitigation**: schema validation at build time (Zod) surfaces mismatches immediately rather than shipping broken entries silently.
- **[Risk]** Astro's file-based i18n routing is a new pattern for whoever maintains this site later. → **Mitigation**: documented in this design.md and reflected directly in the file structure (`src/i18n/`), keeping locale data centralized and discoverable.

## Migration Plan

1. Scaffold Astro project (`npm create astro@latest`) in the repo root, alongside (not replacing) the existing `index.html` until parity is confirmed.
2. Port global CSS custom properties and base styles from `index.html`'s `<style>` block into an Astro layout.
3. Build `BaseLayout.astro` (head, header/nav, footer) and per-section components (hero, fair, activities, news, troupe, about, membership, contact).
4. Define content collection schemas; migrate `reference/texts/posts/*.md` into `src/content/{news,fair-years,activities}/`.
5. Set up i18n config and locale data files; port the theme toggle and reimplement the language switcher against Astro i18n routing.
6. Verify section-by-section parity against the current `index.html` (design, content, both interactive controls).
7. Deploy to Vercel; confirm static build output serves correctly.
8. Remove the legacy `index.html` once the Astro build is verified as the site's source of truth.

Rollback: since the legacy `index.html` remains untouched until step 8, rollback before that point is simply continuing to serve the existing file; no data migration is irreversible before then.
