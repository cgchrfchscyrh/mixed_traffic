# Accessibility review — 18 October 2026

The site targets WCAG 2.1 A/AA. Automated checks and manual inspection do not constitute complete ADA or WCAG certification.

## Current presentation

The overview uses Abstract, Method, Experiments, Results and Citation sections. Full figure explanations, experimental details, adverse results and scope limitations remain available through native details/summary disclosures or the research guide and complete data tables. Every informative image retains alt text. Original paper data, figures and downloadable CSV files are preserved.

The title and author names sit above two full-frame videos. Affiliations and the institutional disclaimer are no longer rendered, following the user’s 18 October request. The interface remains charcoal, gray and off-white without institutional logos.

Both local videos are silent, muted and inline, with native controls and timed visual-description tracks. They autoplay through JavaScript only while the media area is visible, with looping and an obvious Pause videos / Play videos button. Reduced-motion or data-saving preferences prevent automatic playback. Scrolling away or hiding the document pauses playback. Manual pause prevents an automatic restart on re-entry. Without JavaScript, the videos are initially still and retain native controls.

The Waymo recording is independent industry context. The SUMO recording illustrates the simulation setting and does not establish a particular controller, robot-vehicle rate or quantitative performance. Complete media descriptions and original sources are on the accessibility page and in a homepage disclosure.

## Verification

Local verification on 18 October 2026 passed lint, Astro/TypeScript build and the strict dependency audit (zero vulnerabilities, no exceptions). The five-route browser suite completed 11 axe scans and 116 functional checks with zero violations and zero check errors. Desktop, method-figure and 320 CSS-pixel screenshots were visually inspected. The visible homepage has 433 English words, including authors, navigation, citation and footer; its Abstract through Results narrative has 257 words. The deployment workflow runs lint, build, a strict dependency audit and axe. The functional suite verifies automatic playback, keyboard pause/resume, native-control synchronization, persistent manual pause, reduced motion, data saving, offscreen pause, description tracks, no-JavaScript playback controls, visible focus, result tabs, table scrolling, 320 CSS-pixel reflow and text spacing.

## Remaining limits

Original scientific raster figures are supplemented by full text and numeric tables; automatic tools cannot certify every embedded label. The supplied publisher PDF is untagged and unchanged. External PDFs, mathematical reading order, multiple screen-reader workflows and review with disabled users have not been fully verified. Table 1 and Table 2 are available as structured HTML and CSV. Security-response headers are controlled partly by GitHub Pages and must be checked after publishing.

See the generated reports in reports/ for actual checks and limitations. Contact: liusongyang@ufl.edu.
