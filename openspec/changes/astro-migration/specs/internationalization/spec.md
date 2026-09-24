## Purpose

Provides zh/en/fr language switching backed by per-locale translation data files rather than a single hand-maintained JavaScript object, so adding or editing a translated string touches one data file per locale instead of one shared script.

## ADDED Requirements

### Requirement: Locale switching
The system SHALL allow a user to switch the displayed language among Chinese (zh), English (en), and French (fr), updating all translated page content.

#### Scenario: User switches language
- **WHEN** a user selects a different language from the language switcher
- **THEN** all translated text on the page updates to the selected language

### Requirement: Locale choice persistence
The system SHALL remember a user's selected locale across visits.

#### Scenario: Selected locale persists across reload
- **WHEN** a user selects a language and later returns to the site
- **THEN** the site renders in the previously selected language

### Requirement: Default locale
The system SHALL default to Chinese (zh) for a user with no stored locale preference, matching current site behavior.

#### Scenario: First-time visitor sees Chinese by default
- **WHEN** a user with no stored locale preference visits the site
- **THEN** the site renders in Chinese (zh)

### Requirement: Translation completeness enforced at build
The system SHALL fail the build, or otherwise surface a clear error, if a translation key present in one locale's data file is missing from another supported locale's data file.

#### Scenario: Missing translation key is surfaced
- **WHEN** a translation key exists in the zh locale data file but is absent from the en or fr locale data file
- **THEN** the build fails or clearly reports which key is missing from which locale

### Requirement: All visible strings translated
The system SHALL source all user-visible interface strings (navigation labels, section headings, hero copy, stats labels, contact labels) from the locale data files rather than hardcoding them in a single language.

#### Scenario: Non-default locale has no untranslated fallback text
- **WHEN** the site is rendered in the en or fr locale
- **THEN** no interface string visible in the default zh rendering remains untranslated
