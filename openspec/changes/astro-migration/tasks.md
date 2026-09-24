## 1. Project Setup

- [ ] 1.1 Scaffold Astro project in the repo root (`npm create astro@latest`) and verify `npm run dev` serves a default page
- [ ] 1.2 Configure `astro.config.mjs` with `i18n: { locales: ['zh','en','fr'], defaultLocale: 'zh' }` and verify the config loads without error on `npm run dev`
- [ ] 1.3 Set up Vercel project linked to this repo (or note manual deploy steps) and verify a default Astro build deploys successfully

## 2. Base Layout and Styling

- [ ] 2.1 Port CSS custom properties and global styles from `index.html`'s `<style>` block into `src/layouts/BaseLayout.astro` and verify visual output matches the current site's color palette and typography in both light and dark mode
- [ ] 2.2 Build header/nav (logo, nav links, lang switcher UI, theme toggle button) as part of `BaseLayout.astro` and verify it renders on a test page
- [ ] 2.3 Build footer component and verify it matches current site's footer columns and legal line

## 3. Interactive Behavior

- [ ] 3.1 Reimplement theme toggle as an inline Astro-native `<script>` and verify clicking it switches themes and the choice persists in `localStorage` across reload
- [ ] 3.2 Implement language switcher against Astro i18n routing and verify selecting a language navigates to the locale-prefixed route and updates the switcher's active state

## 4. Content Collections

- [ ] 4.1 Define `src/content/config.ts` with Zod schemas for `news`, `fair-years`, and `activities` collections and verify `npm run build` fails with a clear error when a required field is missing from a test entry
- [ ] 4.2 Migrate `reference/texts/posts/*.md` content into `src/content/news/*.md` entries matching the news schema and verify each entry passes schema validation
- [ ] 4.3 Create `src/content/fair-years/*.md` entries for the 2017–2024 fair years (currently hardcoded in `index.html`'s fair section) and verify each passes schema validation
- [ ] 4.4 Create `src/content/activities/*.md` entries for the currently hardcoded activity cards and verify each passes schema validation
- [ ] 4.5 Build the fair-year grid component sourcing from the `fair-years` collection and verify the rendered grid matches the current site's card layout and ordering
- [ ] 4.6 Build the news listing component sourcing from the `news` collection, ordered newest first, and verify against the spec scenario for descending date order
- [ ] 4.7 Build the activities grid component sourcing from the `activities` collection and verify the rendered grid matches the current site's layout

## 5. Internationalization Data

- [ ] 5.1 Create `src/i18n/{zh,en,fr}.json` (or `.ts`) translation files, porting all keys from the current `T` object and verify every key present in `zh` also exists in `en` and `fr`
- [ ] 5.2 Wire section components (hero, fair, activities, news, troupe, about, membership, contact) to read translated strings from the active locale's data file and verify no hardcoded zh/en/fr text remains in component templates
- [ ] 5.3 Add a build-time check (script or test) that fails if a translation key is missing from any supported locale and verify it catches an intentionally-removed key in a test run

## 6. Remaining Sections

- [ ] 6.1 Build the hero section component and verify it matches current content and CTA links (`#membership`, `#activities`)
- [ ] 6.2 Build the stats bar component and verify the four stat values/labels render correctly
- [ ] 6.3 Build the troupe section component and verify it matches current content
- [ ] 6.4 Build the about section component, preserving existing placeholder copy as-is (real content is out of scope for this change) and verify it renders
- [ ] 6.5 Build the membership section component, preserving existing placeholder tiers as-is (real content is out of scope for this change) and verify it renders
- [ ] 6.6 Build the contact section component and verify address, hours, phone, and email match the current site exactly

## 7. Verification and Cutover

- [ ] 7.1 Run a full section-by-section comparison between the Astro build and the current `index.html` (content, layout, both interactive controls, all three locales) and record any discrepancies found
- [ ] 7.2 Verify production build (`npm run build && npm run preview`) renders correctly with no console errors in any of the three locales
- [ ] 7.3 Deploy the Astro build to Vercel and verify the live URL serves the site correctly
- [ ] 7.4 Remove the legacy `index.html` from the repo root once the Astro build is confirmed as the site's source of truth
