# Accessibility review — 3 October 2026

Target: WCAG 2.1 Level A and AA. This is a technical review record, not an ADA/WCAG certification or institutional brand approval.

## Automated results

`reports/axe-wcag21aa.json`: **11 axe scans, 95 additional checks, zero violations, zero check errors** on the final local production build with its GitHub Pages base path. The deployment workflow repeats these checks before publishing.

Coverage includes the homepage, research guide, result tables, accessibility page, and 404 page at desktop and mobile sizes; the traffic website also scans its alternate result-tab state. Keyboard checks cover the first skip link, visible focus, main-content focus, result tab keys where applicable, video playback/pause/end/replay, copying BibTeX, and scrolling wide tables. The tests check 320 CSS-pixel reflow, increased text spacing, no autoplay/loop, media descriptions, no-JavaScript content, reduced-motion visits, heading hierarchy, unique IDs, and internal anchors.

## Visual and content checks

- Desktop and 320-pixel screenshots inspected. Long DOI wrapping and lazy-image layout reservation were corrected.
- Original figure crops checked for complete labels and boundaries. Original scientific colors remain intact; textual descriptions and HTML data tables explain the comparisons without relying on color.
- All data tables have captions and scoped row/column headers. CSV values were checked against the same data used by the HTML tables; see `reports/content-verification.json`.
- The source PDF hash matches the original uploaded file. No manuscript text, numbers, or original PDF files were changed.
- The MP4 has only a video stream; `ffprobe` evidence is in `reports/media-review.json`. The excerpt has no speech or meaningful audio requiring captions. Its full visual description, a timed VTT track, original source, and distinction from the authors’ experiment are provided.
- The initial explicit Play button reveals native controls when playback begins, avoiding a browser loading indicator over the still poster. With JavaScript disabled, native controls remain present from the start.
- Every page, including 404, retains the UF non-endorsement disclaimer. There is no UF logo or UF blue/orange interface palette. Affiliations are preserved as text.

## Axe items requiring interpretation

Remaining incomplete rules: color-contrast, video-caption.

`video-caption`: the video-only file has no audio track. The visual alternative includes on-screen text where present; captions of nonexistent speech would be misleading.

`color-contrast`: remaining automatically indeterminate nodes are decorative arrow spans marked `aria-hidden`. They inherit the high-contrast foreground color; all their meaning is present in the surrounding link text or explicit before/after values. Original raster figure contrast still needs to be considered with its accompanying textual alternative.

## Limits and pending human assessment

The supplied mixed-traffic publisher PDF is untagged; the supplied eVTOL PDF reports tags, but tag presence is not a verification of semantic structure, reading order, mathematical accessibility, or assistive-technology usability. The original publisher PDFs are not republished here. External papers remain clearly identified; the local research guide is a companion, not a complete full-text replacement. The mixed-traffic site also links to the full arXiv preprint in HTML.

Manual testing with multiple screen readers and users with disabilities, full remediation of external scholarly PDFs, and UF institutional accessibility/brand approval have not been completed. A neutral palette or disclaimer does not grant an exemption from applicable institutional requirements.

For official requirements, consult [UF Web Standards](https://brandcenter.ufl.edu/web-standards/) and [UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/). Contact for access barriers: liusongyang@ufl.edu.

## Published build verification

The [successful deployment workflow](https://github.com/cgchrfchscyrh/mixed_traffic/actions/runs/37144901012) scanned 11 page states and passed 95 additional checks. Its report is saved in `reports/ci/axe-wcag21aa.json`. Live verification checked 5 pages and 22 unique page/resource URLs, confirmed public-media bytes match the source assets, tested video playback and pause, and checked 320 CSS-pixel reflow. Details are in `reports/live-deployment.json` and `reports/live-browser.json`.
