# Accessibility review — 18 October 2026

The site targets WCAG 2.1 A/AA. Automated checks and manual inspection do not constitute complete ADA or WCAG certification.

## Current presentation

The overview uses Abstract, Method, Experiments, Results and Citation sections. Full figure explanations, experimental details, adverse results and scope limitations remain available through native details/summary disclosures or the research guide and complete data tables. Every informative image retains alt text. Original paper data, figures and downloadable CSV files are preserved.

The title and author names sit above two full-frame videos. Affiliations and the institutional disclaimer are no longer rendered, following the user’s 18 October request. The interface remains charcoal, gray and off-white without institutional logos.

Both local videos are silent, muted and inline, with native controls and timed visual-description tracks. They autoplay through JavaScript only while the media area is visible, with looping and an obvious Pause videos / Play videos button. Reduced-motion or data-saving preferences prevent automatic playback. Scrolling away or hiding the document pauses playback. Manual pause prevents an automatic restart on re-entry. Without JavaScript, the videos are initially still and retain native controls.

The Waymo recording is independent industry context. The SUMO recording illustrates the simulation setting and does not establish a particular controller, robot-vehicle rate or quantitative performance. Complete media descriptions and original sources are on the accessibility page and in a homepage disclosure.

## Verification

Local verification on 18 October 2026 passed lint, Astro/TypeScript build and the strict dependency audit (zero vulnerabilities, no exceptions). The five-route browser suite completed 11 axe scans and 116 functional checks with zero violations and zero check errors. Desktop, method-figure and 320 CSS-pixel screenshots were visually inspected. The visible homepage has 433 English words, including authors, navigation, citation and footer; its Abstract through Results narrative has 257 words. The deployment workflow runs lint, build, a strict dependency audit and axe. The functional suite verifies automatic playback, keyboard pause/resume, native-control synchronization, persistent manual pause, reduced motion, data saving, offscreen pause, description tracks, no-JavaScript playback controls, visible focus, result tabs, table scrolling, 320 CSS-pixel reflow and text spacing.

## Published-site verification

The visual revision was published to https://cgchrfchscyrh.github.io/mixed_traffic/ on 18 October 2026 from content commit `ea0336240cd594adfaf0d495f4010c8e789d12ce`. [GitHub Actions run 39156508443](https://github.com/cgchrfchscyrh/mixed_traffic/actions/runs/39156508443) passed, including strict dependency auditing, lint, build, 11 axe scans and 116 functional checks. Its downloaded report is saved in `reports/ci/axe-wcag21aa.json`.

The deployed site independently passed the same 11 scans and 116 functional checks with zero violations and zero check errors. Five routes and 28 linked resources returned HTTP 200; 16 public assets matched their source SHA-256 hashes. All 31 checked internal fragment links resolved, both MP4 range requests returned HTTP 206, and the custom missing-page route returned HTTP 404 with noindex. HTTPS enforcement and the actual HSTS response header were verified. CSP and referrer policy are present in the HTML; GitHub Pages does not expose configured HTTP CSP, X-Frame-Options or X-Content-Type-Options headers, and these are not claimed as configured.

Online browser checks confirmed visible silent autoplay, keyboard play/pause, persistent manual pause, reduced-motion protection, result-tab operation, no visible institutional introduction or disclaimer, and complete stacked video frames at 320 CSS pixels without horizontal page overflow. The full online suite also checks data-saving preferences, native controls and no-JavaScript fallback. See `reports/live-deployment.json`, `reports/live-browser.json` and `reports/live-axe-wcag21aa.json` for the actual observations.

## Remaining limits

Original scientific raster figures are supplemented by full text and numeric tables; automatic tools cannot certify every embedded label. The supplied publisher PDF is untagged and unchanged. External PDFs, mathematical reading order, multiple screen-reader workflows and review with disabled users have not been fully verified. Table 1 and Table 2 are available as structured HTML and CSV. Security-response headers are controlled partly by GitHub Pages; the actual available headers are recorded above and in the live deployment report.

See the generated reports in reports/ for actual checks and limitations. Contact: liusongyang@ufl.edu.
