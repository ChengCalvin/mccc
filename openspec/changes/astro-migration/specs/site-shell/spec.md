## Purpose

Provides the site's page structure, navigation, theming, and static build/deploy behavior, replacing the single hand-authored `index.html` with a component-based static site that requires no server runtime to serve.

## ADDED Requirements

### Requirement: Static page rendering
The system SHALL render all site pages as static HTML at build time, viewable without executing client-side JavaScript.

#### Scenario: Page loads with JavaScript disabled
- **WHEN** a user requests any site page with JavaScript disabled in the browser
- **THEN** all page content (text, images, section layout, navigation links) is present and readable

### Requirement: Theme toggle
The system SHALL let a user switch between light and dark color themes, and SHALL persist the chosen theme across visits.

#### Scenario: User switches theme
- **WHEN** a user activates the theme toggle control
- **THEN** the page's color scheme switches immediately without a full page reload

#### Scenario: Theme choice persists
- **WHEN** a user has previously chosen a theme and returns to the site in a later visit
- **THEN** the site renders in that previously chosen theme

#### Scenario: No stored preference falls back to system theme
- **WHEN** a user has no stored theme preference
- **THEN** the site renders using the browser/OS `prefers-color-scheme` setting

### Requirement: Deployable as a static site
The system SHALL build to a static output (HTML/CSS/JS assets) that can be served without a backend application server or database.

#### Scenario: Production build produces static output
- **WHEN** the production build command runs
- **THEN** the output directory contains static assets sufficient to serve the full site with no server-side runtime required

### Requirement: Section parity with existing design
The system SHALL preserve the existing page sections (hero, fair, activities, news, troupe, about, membership, contact, footer) and their visual design (colors, layout, spacing) as component-based equivalents.

#### Scenario: All existing sections present
- **WHEN** the home page is rendered
- **THEN** each of the hero, fair, activities, news, troupe, about, membership, and contact sections is present in the same order as the current site
