# Test portfolio-proof-index

## From a phone or computer

1. Sign in to GitHub and open this repository.
2. Open **Actions** and choose the test workflow in the left sidebar.
3. Tap **Run workflow**, select **main**, then tap the green **Run workflow** button.
4. Open the new run. Each version-matrix job must finish successfully.
5. Expand the test step for individual test results and **Run sample scenario** for the demo output.

Tests and the sample scenario run on GitHub's runner, not on your device. No service credentials are needed. A green result verifies the checks implemented in this repository; it does not establish untested hardware or live-service behavior.

Each push, pull-request run and manual run also uploads an offline browser app under **Artifacts**. Download a `portfolio-browser-node-*` artifact, extract it and open `index.html` to explore the catalogue.

## Locally

Follow README.md for the supported runtime and test command. The manual scenario runs these commands in a fresh checkout:

```bash
npm run summary
npm run build
```

Demo inputs are synthetic and local. Keep the documented platform and verification limits in mind.

## HTML and CSS projects

- [Fieldwork HTML/CSS lab](https://github.com/sumiEmpire001/accessibility-regression-kit): native themes, disclosure, checklist and form validation. Download `html-css-demo-and-browser-evidence` from a successful Actions run, extract it and open `dist/index.html` with `styles.css` alongside it.
- [Object / Supply catalogue](https://github.com/sumiEmpire001/accessible-catalog): search, category/saved filters, sorting and three-item comparison. Download `catalogue-demo-and-browser-evidence`, extract it and open `dist/index.html`; that HTML file is self-contained.

The artifacts also include `artifacts/browser-results.json` and screenshots at 320, 390, 768 and 1280 pixels. Fieldwork passed 12 Chromium browser scenarios; the catalogue passed 13. Their 12 local checks each are counted separately. These checks do not replace Safari/Firefox or screen-reader verification. Product records and form examples are synthetic; there is no checkout or form-submission backend.
