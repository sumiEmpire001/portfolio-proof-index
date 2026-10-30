# Lord_Sumi · Portfolio Proof Index

A searchable catalogue of **100 separate GitHub project repositories** with implementation status, required checks, commit evidence and verified CI links. This repository is itself a working catalogue application and CLI.

The catalogue deliberately separates repository existence from working implementations. Most projects remain planned. Test counts and CI links are dated evidence, not a promise of perfect behavior or live monitoring.

## Run

Node.js 20+; no package installation is required.

```bash
git clone https://github.com/sumiEmpire001/portfolio-proof-index.git
cd portfolio-proof-index
npm test
npm run validate
npm run summary
node src/cli.mjs search durable queue
npm run build
```

Open `dist/index.html` in your browser for a self-contained offline view. It embeds the catalogue and application code, so it works without a server. Alternatively serve the repository root using a static server to use the modular source page at `index.html`.

## Features

- Text search combining all search words, category filtering and code-status filtering.
- Links to all 100 verified repositories, project-specific scopes and required checks.
- Separate totals for repositories, implementations, local tests and verified CI runs.
- Commit and workflow evidence links for implemented projects when recorded.
- Explicit empty results, reset filters, visible load/validation errors and a no-JavaScript data link.
- Responsive layout, native labelled controls, keyboard focus styles and a skip link.
- JSON catalogue validation that rejects duplicate identities, mismatched links and planned projects claiming implementation evidence.

## Data and evidence

`projects.json` is the source of truth for the catalogue snapshot. `repository_verified` records that repository existence was checked; it does not mean its code works. `implementation: published` requires an implementation commit and passing local checks. `ci_url` is added only after the linked workflow result is checked. The portfolio's own commit points to an earlier implementation revision to avoid a self-referential commit hash.

New code and test evidence must be verified before updating its record. A generated README, scaffold or project plan does not qualify as an implemented project. The underlying builds still need their project-specific manual, integration or physical-device checks where relevant.

## Architecture

`src/catalog.mjs` provides pure validation, filtering and summary functions. The CLI and browser use the same logic. `src/app.mjs` renders text with DOM APIs rather than interpreting catalogue strings as HTML. `src/build.mjs` creates the portable offline page. No user accounts, analytics, external APIs or remote dependencies are used.

## Verification

Local checks on 30 October 2026: **11 tests passed**, covering the 100-record manifest, identity uniqueness, evidence consistency, search/filter composition, statistics, CLI subprocesses and the offline build's embedded data and JavaScript syntax. These tests do not constitute a full browser accessibility or screen-reader audit. Interactive browser verification is pending because the available browser cannot open local file previews. GitHub Actions runs the same suite separately.

## Limitations

The catalogue is a dated snapshot. It does not continuously poll GitHub or automatically promote projects to completed status. Structural URL checks do not replace live link verification. External repository contents can change after verification. Offline builds must be rebuilt after editing the JSON data. No hosted website deployment is included.

MIT license; see [LICENSE](LICENSE).
