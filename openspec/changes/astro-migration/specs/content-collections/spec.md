## Purpose

Lets news items, Spring Festival fair-year entries, and community activity entries be authored as structured content files instead of hand-coded HTML cards, so adding or editing an item never requires touching a page template.

## ADDED Requirements

### Requirement: News items as content entries
The system SHALL source the news listing from a content collection of individual entry files, each carrying at minimum a title, a date, and a link or body reference.

#### Scenario: Adding a news item requires no template edit
- **WHEN** a new, valid entry file is added to the news content collection
- **THEN** it appears in the rendered news listing without any change to page or layout files

### Requirement: Fair-year entries as content entries
The system SHALL source the Spring Festival fair-year archive (year, edition/ordinal label, title, date, thumbnail) from a content collection.

#### Scenario: Adding a fair-year entry requires no template edit
- **WHEN** a new, valid entry file is added to the fair-year content collection
- **THEN** it appears in the rendered fair-year grid without any change to page or layout files

### Requirement: Activity entries as content entries
The system SHALL source community activity cards (title, date, thumbnail, tag) from a content collection.

#### Scenario: Adding an activity entry requires no template edit
- **WHEN** a new, valid entry file is added to the activities content collection
- **THEN** it appears in the rendered activities grid without any change to page or layout files

### Requirement: Required fields validated at build time
The system SHALL validate each content entry against a defined schema and SHALL fail the build with an error identifying the missing or invalid field if a required field is absent or malformed.

#### Scenario: Missing required field fails the build
- **WHEN** a content entry is missing a field required by its collection's schema (e.g. a news entry with no date)
- **THEN** the build fails and the error output identifies which entry and which field is missing

### Requirement: Listings ordered newest first
The system SHALL order news, fair-year, and activity listings by their date field, most recent first, unless a listing explicitly overrides ordering.

#### Scenario: News listing shows most recent first
- **WHEN** the news listing is rendered
- **THEN** entries appear in descending order by date
