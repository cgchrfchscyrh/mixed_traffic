# Accessibility review — 18 October 2026

The site targets WCAG 2.1 A/AA. Automated checks and manual inspection do not constitute complete ADA or WCAG certification.

## Current presentation

The homepage uses Abstract, Method, Results and Citation. Research-guide and results-index navigation, statistics, numerical result cards, tables and quantitative plots are removed. Method, intersection and network-setting figures retain alt text and complete descriptions. Original data, figures, CSV files and manuscript materials are preserved. Old paper/results routes are noindex compatibility pages linking to the relevant homepage section.

The title and author names sit above two full-frame videos. Affiliations and the institutional disclaimer are not rendered. The interface remains charcoal, gray and off-white without institutional logos.

Five local videos are silent, muted and inline, with native play/pause controls and timed visual-description tracks. There is no separate global playback button. Media plays through JavaScript only while visible. Reduced-motion or data-saving preferences prevent automatic playback; explicit native playback remains available. Scrolling away or hiding the document pauses playback. A manual pause is remembered on re-entry, including while the media is buffering. Without JavaScript, videos are initially still and retain native controls.

The Waymo recording is independent industry context. Four SUMO excerpts (one title clip and three body clips) come from the same original recording. They illustrate the setting without establishing a controller, robot-vehicle rate or performance. The body excerpts are distributed across Abstract, Method and Results, with complete expandable descriptions. Their source intervals and read-only provenance are recorded in `public/media/mixed-clips.json` and `reports/clip-review.json`.

## Current local verification — 18 October 2026

Lint and the Astro/TypeScript build pass. The five-route browser suite completed **11 axe scans and 188 functional checks with zero violations and zero errors**. Tests cover real Tab/Space operation of native players, pause persistence, offscreen pause, loops, reduced-motion/data-saving preferences and explicit native play, dynamic preference changes, pending-buffer pause, descriptions and resource loading, no-JavaScript fallback, keyboard disclosures, citation copy, visible focus, 320/768 CSS-pixel reflow and text spacing. Desktop and 320 CSS-pixel screenshots were inspected. All three new MP4 files passed complete decoding; each has no audio stream and retains the original recording speed and full frame. No dependencies were changed.

The deployment workflow runs its own lint, build, security audit and axe suite. Local automated success is not a complete ADA or WCAG certification.

## Earlier published-site verification (before this content revision)

The visual revision was published to https://cgchrfchscyrh.github.io/mixed_traffic/ on 18 October 2026 from content commit `ea0336240cd594adfaf0d495f4010c8e789d12ce`. [GitHub Actions run 39156508443](https://github.com/cgchrfchscyrh/mixed_traffic/actions/runs/39156508443) passed, including strict dependency auditing, lint, build, 11 axe scans and 116 functional checks. Its downloaded report is saved in `reports/ci/axe-wcag21aa.json`.

The deployed site independently passed the same 11 scans and 116 functional checks with zero violations and zero check errors. Five routes and 28 linked resources returned HTTP 200; 16 public assets matched their source SHA-256 hashes. All 31 checked internal fragment links resolved, both MP4 range requests returned HTTP 206, and the custom missing-page route returned HTTP 404 with noindex. HTTPS enforcement and the actual HSTS response header were verified. CSP and referrer policy are present in the HTML; GitHub Pages does not expose configured HTTP CSP, X-Frame-Options or X-Content-Type-Options headers, and these are not claimed as configured.

Online browser checks confirmed visible silent autoplay, keyboard play/pause, persistent manual pause, reduced-motion protection, result-tab operation, no visible institutional introduction or disclaimer, and complete stacked video frames at 320 CSS pixels without horizontal page overflow. The full online suite also checks data-saving preferences, native controls and no-JavaScript fallback. See `reports/live-deployment.json`, `reports/live-browser.json` and `reports/live-axe-wcag21aa.json` for the actual observations.

## Remaining limits

Original scientific raster figures have full text alternatives; automatic tools cannot certify every embedded label or contrast combination. The supplied publisher PDF is untagged and unchanged. External PDFs, mathematical reading order, multiple screen-reader workflows and review with disabled users have not been fully verified. Original CSV data remain in the repository, while numerical tables are no longer rendered on the website. Security-response headers are controlled partly by GitHub Pages; prior observed headers are recorded above, and publication requires a fresh deployment/resource check.

See reports/ for actual checks and limitations. Contact: liusongyang@ufl.edu.
