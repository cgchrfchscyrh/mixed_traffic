# Accessibility review — 11 October 2026

Target: WCAG 2.1 Level A and AA. This is a technical review record, not an ADA/WCAG certification or institutional brand approval.

## Current revision and verification status

The 11 October 2026 revision reorganizes the homepage into seven sections: problem, existing work, knowledge gap, method, experiments, results, and conclusion with limitations. The narrative uses only the ground-traffic material from slides 15–23 of the authors’ `Proposal_defense_narrow.pptx`; quantitative results continue to follow the published mixed-traffic paper.

The method diagram from slide 18 and the signalized (S) / unsignalized (U) intersection illustration from slide 19 include alt text, complete HTML explanations, and source slide numbers. Original scientific diagram colors are retained as research content, not adopted as UF interface branding; labels and text explain the distinctions without requiring color identification. The original PPT is unchanged, and the complete presentation is not published as an attachment.

The existing local Waymo excerpt remains a 20-second silent context video with native playback controls, no autoplay or loop, a full visual alternative, and timed descriptions. It illustrates real-world autonomous driving and is not presented as a real-vehicle test of the paper’s controller.

The 11 October production build passed lint, Astro/TypeScript checks, 11 axe scans, and 95 functional checks with zero violations or check errors. Desktop and 320 CSS-pixel screenshots were reviewed. The new method and intersection images retain complete labels; full text explanations supplement small or low-contrast scientific annotations. Native video controls now remain visible from initial load, alongside the keyboard-operable play/pause/replay button. Source and numeric checks are recorded in `reports/presentation-content-review.json`; asset provenance is in `reports/presentation-assets.json`.

## Automated results — 11 October 2026

The current local production build with its GitHub Pages base path passed **11 axe scans and 95 additional checks, with zero violations or check errors**. The workflow repeats these checks before publishing; `reports/axe-wcag21aa.json` records the current local run.

Coverage includes the homepage, research guide, result tables, accessibility page, and 404 page at desktop and mobile sizes; the traffic website also scans its alternate result-tab state. Keyboard checks cover the first skip link, visible focus, main-content focus, result tab keys where applicable, video playback/pause/end/replay, copying BibTeX, and scrolling wide tables. The tests check 320 CSS-pixel reflow, increased text spacing, no autoplay/loop, media descriptions, no-JavaScript content, reduced-motion visits, heading hierarchy, unique IDs, and internal anchors.

## Previous visual and content checks — 4 October 2026

- Desktop and 320-pixel screenshots inspected. Long DOI wrapping and lazy-image layout reservation were corrected.
- Original figure crops checked for complete labels and boundaries. Original scientific colors remain intact; textual descriptions and HTML data tables explain the comparisons without relying on color.
- All data tables have captions and scoped row/column headers. CSV values were checked against the same data used by the HTML tables; see `reports/content-verification.json`.
- The source PDF hash matches the original uploaded file. No manuscript text, numbers, or original PDF files were changed.
- The MP4 has only a video stream; `ffprobe` evidence is in `reports/media-review.json`. The excerpt has no speech or meaningful audio requiring captions. Its full visual description, a timed VTT track, original source, and distinction from the authors’ experiment are provided.
- The initial explicit Play button reveals native controls when playback begins, avoiding a browser loading indicator over the still poster. With JavaScript disabled, native controls remain present from the start.
- Every page, including 404, retains the UF non-endorsement disclaimer. There is no UF logo or UF blue/orange interface palette. Affiliations are preserved as text.

## Current axe items requiring interpretation

Remaining incomplete rules: color-contrast, video-caption.

`video-caption`: the video-only file has no audio track. The visual alternative includes on-screen text where present; captions of nonexistent speech would be misleading.

`color-contrast`: remaining automatically indeterminate nodes are decorative arrow spans marked `aria-hidden`. They inherit the high-contrast foreground color; all their meaning is present in the surrounding link text or explicit before/after values. Original raster figure contrast still needs to be considered with its accompanying textual alternative.

## Limits and pending human assessment

The supplied mixed-traffic publisher PDF is untagged. Semantic structure, reading order, mathematical accessibility, and assistive-technology usability of external PDFs have not been fully verified. The original publisher PDF is not republished here. External papers remain clearly identified; the local research guide is a companion, not a complete full-text replacement. The site also links to the full arXiv preprint in HTML, which is not guaranteed to be identical to the published version. The original presentation is not offered as a downloadable attachment; selected diagrams have HTML text alternatives on the website.

Manual testing with multiple screen readers and users with disabilities, full remediation of external scholarly PDFs, and UF institutional accessibility/brand approval have not been completed. A neutral palette or disclaimer does not grant an exemption from applicable institutional requirements.

For official requirements, consult [UF Web Standards](https://brandcenter.ufl.edu/web-standards/) and [UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/). Contact for access barriers: liusongyang@ufl.edu.

## Waymo video update

On 4 October 2026, the generic street time-lapse was replaced with official Waymo Los Angeles autonomous-driving B-roll, using source time 01:08–01:28. The selected excerpt is video-only, has no autoplay or loop, and is paired with a complete visual alternative and a synchronized description track. The original shot boundaries (4.546 s and 13.221 s within the excerpt) were checked for the VTT cues. Attribution appears next to the player and in the media-credit section. New asset filenames ensure previous browser caches cannot display the old clip with the new description. Details are in `reports/media-review.json`.

## Published build verification — 11 October 2026

GitHub Actions run [38170438150](https://github.com/cgchrfchscyrh/mixed_traffic/actions/runs/38170438150) deployed content commit `37ba3cde11385dce5111848bb60d187b0b0e88c1` after 11 axe scans and 95 functional checks passed with zero violations or errors. CI also passed the dependency audit, lint, and Astro/TypeScript build.

The live check verified five pages, 25 linked resources, 41 internal fragment links, the custom 404 response, HTTPS enforcement, and video byte-range support. Published asset hashes match the local sources, including all three new presentation figures. Browser checks confirmed the seven research sections, complete figure descriptions, keyboard video playback/pause, result-tab navigation, and no page-level horizontal overflow at 320 CSS pixels. No browser errors were observed.

GitHub Pages returned HSTS; CSP and referrer policy were verified in each generated page. HTTP CSP, X-Frame-Options, and X-Content-Type-Options response headers were absent and remain provider-controlled limitations. See `reports/deployment.json`, `reports/ci/axe-wcag21aa.json`, `reports/live-deployment.json`, and `reports/live-browser.json`. These technical checks do not constitute full WCAG, ADA, or institutional certification.
