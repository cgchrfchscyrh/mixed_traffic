# Accessibility review — 18 October 2026


## Proposal-deck narrative — 5 November 2026

At the author's request, the homepage follows the proposal defense deck: Background, Methodology, and the experiment setup (the Problem section was later removed at the author's request). The opening is now one full-width silent video, converted from the slide-14 city traffic animation, with a timed description track and a text alternative. The Waymo clip, the SUMO excerpts, the data tiles, and the numerical results were removed; the retired `/results/` page links to the Experiment section and the paper. Deck images are WebP files with alt text; the red-to-green bar in the background figure is decorative and its meaning is in text labels. Build, lint, and the browser suite passed: **10 axe scans and 138 functional checks**, with no violations or failures, at desktop, 390, and 320 CSS pixels. This is not full ADA/WCAG certification.

## Opening pair and evidence tiles — 5 November 2026

The opening now shows Waymo's footage beside our SUMO simulation, at one height, with the title below. Four text-only evidence tiles with named source links cover intersection safety, congestion, and driverless miles. At the author's request, the homepage has no top bar or footer, and the collapsed media notes were removed; full video descriptions and credits remain on the accessibility page, linked from the citation, and every video keeps its text alternative for screen readers. The full simulation video now appears only in the opening; its excerpts remain in the results.

## Opening video and shorter text — 4 November 2026

The homepage now opens with the Waymo video at full width, with the title on a dark gradient and the credit Waymo requires shown on the video. Narrow screens crop the sides of the frame. The vision diagram and the longer explanations were removed at the author's request, and short bubbles now explain the method figure, the study map, and each clip. The study map keeps its image alternative, and its full description moved to the media notes. Statements about what the footage does not show remain in the media notes, not beside the videos. The result charts and tables stay in the paper. Existing PDF and screen-reader limitations still apply.

## Light vision presentation — 27 October 2026

Vision sections now share the surrounding light page background, dark type, and dark SVG linework. Evidence imagery uses a white surface; focus outlines, concept badges, and diagram relationships remain visible without relying on color.

Build, lint, dependency security audit, and the existing browser suite passed: **11 axe scans and 186 functional checks**, with no violations or failures. Desktop and 320 CSS-pixel layouts were reviewed. Original media and attachments are unchanged. Existing PDF and screen-reader limitations still apply; this is not full ADA/WCAG certification.


## Visual vision review — 27 October 2026

The project opening now uses a compact display headline while the formal paper title, author information, and citations remain intact. Each Vision section presents existing research imagery, three specific gaps paired with collaborating disciplines, and an original SVG drawing of a future system. Solid current-evidence badges and dashed “Future concept” badges distinguish demonstrated scope from proposed integration. The diagrams have concise image alternatives and a complete text equivalent; mobile layouts follow a top-to-bottom path. Original source figures remain available in keyboard-operable disclosures where applicable.

Build, lint, and security audit passed (zero reported dependency vulnerabilities). The updated browser suite passed **11 axe scans and 186 functional checks**, with zero violations or failures. Desktop views and 320 CSS-pixel layouts were inspected in the browser; all eight project headlines and vision maps fit without horizontal overflow. Native media controls, reduced-motion and data-saving preferences, manual-pause persistence, source credits, and media alternatives remain in place. See `reports/vision-review.json` and `reports/axe-wcag21aa.json`. No original attachment or research media was edited.

These checks do not constitute complete ADA/WCAG certification. PDF reading order, scientific-image legibility at every magnification, and multi-screen-reader usability still need separate review. The implementation does not claim clinical, field, or complete-system validation for future concepts.


## Current review — 27 October 2026

This revision replaces introductory topic subtitles with a title-led opening, removes visible text beneath each video, and connects a concrete research task to a larger collaborative vision. Full silent-video alternatives remain linked through `aria-describedby`, with timed WebVTT descriptions and complete descriptions/credits consolidated in the end-of-page media notes. Native controls, viewport playback, remembered manual pauses, reduced-motion and data-saving preferences remain available.

The current build and lint pass. The browser suite passed **11 axe scans and 185 functional checks**, with zero violations and errors. Desktop and 320 CSS-pixel layouts were visually reviewed after loading all figures. Dependency audit reports zero vulnerabilities. Original media and paper assets are unchanged. See `reports/story-review.json` and `reports/axe-wcag21aa.json`. This current review supersedes earlier descriptions of per-player captions or the previous section structure.

Automated checks are not complete ADA/WCAG certification. External PDF reading order, detailed scientific-artwork contrast, and multi-screen-reader usability still require separate review.


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
