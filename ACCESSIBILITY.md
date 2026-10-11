# Accessibility review — 11 October 2026

Target: WCAG 2.1 Level A and AA. This is a technical review record, not an ADA/WCAG certification or institutional brand approval.

## Current revision and verification status

The 11 October 2026 revision reorganizes the homepage into seven sections: problem, existing work, knowledge gap, method, experiments, results, and conclusion with limitations. The narrative uses only the ground-traffic material from slides 15–23 of the authors’ `Proposal_defense_narrow.pptx`; quantitative results continue to follow the published mixed-traffic paper.

The method diagram from slide 18 and the signalized (S) / unsignalized (U) intersection illustration from slide 19 include alt text, complete HTML explanations, and source slide numbers. Original scientific diagram colors are retained as research content, not adopted as UF interface branding; labels and text explain the distinctions without requiring color identification. The original PPT is unchanged, and the complete presentation is not published as an attachment.

The title now overlays two local videos on desktop: the unchanged 20-second Waymo context excerpt on the left and a continuous 22-second SUMO excerpt on the right. The SUMO viewing copy uses source time 00:24–00:46 from the user-supplied `Videos/mixed_traffic/TL_medium.mp4`, at 1080p and the recording’s original speed. Its digitally silent audio track is removed; the original source file is unchanged. The filename and video alone do not establish which controller or RV penetration rate is shown, and the excerpt is not labeled as proof of learned-policy performance. The Waymo footage continues to illustrate real-world autonomous driving, not a real-vehicle test of the paper’s controller.

Both players retain native controls from initial load and have no autoplay or loop. The shared title control offers Play both clips, Pause clips, and Replay both clips. The desktop Show full video frames control provides an uncropped view outside the title overlay. At widths up to 1000 CSS pixels, the title is placed before the complete video frames; at widths up to 700 CSS pixels, the videos stack vertically. Both silent clips have complete HTML visual alternatives and WebVTT description tracks. Native playback and text alternatives remain available without JavaScript.

The dual-video production build passed lint and Astro/TypeScript checks, 11 axe scans, and 115 functional checks with zero violations or check errors. Both players passed keyboard playback/pause/end/replay, native-control state synchronization, description-track loading, full-frame switching, no-JavaScript and reduced-motion checks. Desktop, complete-frame and 320 CSS-pixel layouts were visually reviewed. See `reports/axe-wcag21aa.json`, `reports/hero-visual-review.json`, and `reports/simulation-media-review.json`.

Axe cannot automatically determine contrast over video. The title overlay was checked against a worst-case white video pixel; the minimum computed contrast for title, author, affiliation and action text was 6.89:1. Text bounds remain inside the overlay. The recordings are video-only and have HTML descriptions plus timed description tracks; no speech captions are needed. Decorative arrows and original research raster figures retain their existing review limitations. The source video was read-only; its decoded audio samples are all zero. The complete 22-second web file decoded successfully and contains no audio stream.

## Previous automated results — presentation revision, 11 October 2026

The preceding local production build with its GitHub Pages base path passed **11 axe scans and 95 additional checks, with zero violations or check errors**. The workflow repeats these checks before publishing; `reports/axe-wcag21aa.json` must be refreshed for the dual-video revision.

That production build also passed lint and Astro/TypeScript checks. Desktop and 320 CSS-pixel screenshots were reviewed. The method and intersection images retained complete labels; full text explanations supplemented small or low-contrast scientific annotations. Native video controls remained visible from initial load, alongside the keyboard-operable play/pause/replay button. Source and numeric checks are recorded in `reports/presentation-content-review.json`; asset provenance is in `reports/presentation-assets.json`.

Coverage includes the homepage, research guide, result tables, accessibility page, and 404 page at desktop and mobile sizes; the traffic website also scans its alternate result-tab state. Keyboard checks cover the first skip link, visible focus, main-content focus, result tab keys where applicable, video playback/pause/end/replay, copying BibTeX, and scrolling wide tables. The tests check 320 CSS-pixel reflow, increased text spacing, no autoplay/loop, media descriptions, no-JavaScript content, reduced-motion visits, heading hierarchy, unique IDs, and internal anchors.

## Previous visual and content checks — 4 October 2026

- Desktop and 320-pixel screenshots inspected. Long DOI wrapping and lazy-image layout reservation were corrected.
- Original figure crops checked for complete labels and boundaries. Original scientific colors remain intact; textual descriptions and HTML data tables explain the comparisons without relying on color.
- All data tables have captions and scoped row/column headers. CSV values were checked against the same data used by the HTML tables; see `reports/content-verification.json`.
- The source PDF hash matches the original uploaded file. No manuscript text, numbers, or original PDF files were changed.
- The MP4 has only a video stream; `ffprobe` evidence is in `reports/media-review.json`. The excerpt has no speech or meaningful audio requiring captions. Its full visual description, a timed VTT track, original source, and distinction from the authors’ experiment are provided.
- The initial explicit Play button reveals native controls when playback begins, avoiding a browser loading indicator over the still poster. With JavaScript disabled, native controls remain present from the start.
- Every page, including 404, retains the UF non-endorsement disclaimer. There is no UF logo or UF blue/orange interface palette. Affiliations are preserved as text.

## Previous axe items requiring interpretation

Remaining incomplete rules: color-contrast, video-caption.

`video-caption`: the video-only file has no audio track. The visual alternative includes on-screen text where present; captions of nonexistent speech would be misleading.

`color-contrast`: remaining automatically indeterminate nodes are decorative arrow spans marked `aria-hidden`. They inherit the high-contrast foreground color; all their meaning is present in the surrounding link text or explicit before/after values. Original raster figure contrast still needs to be considered with its accompanying textual alternative.

## Limits and pending human assessment

The supplied mixed-traffic publisher PDF is untagged. Semantic structure, reading order, mathematical accessibility, and assistive-technology usability of external PDFs have not been fully verified. The original publisher PDF is not republished here. External papers remain clearly identified; the local research guide is a companion, not a complete full-text replacement. The site also links to the full arXiv preprint in HTML, which is not guaranteed to be identical to the published version. The original presentation is not offered as a downloadable attachment; selected diagrams have HTML text alternatives on the website.

Manual testing with multiple screen readers and users with disabilities, full remediation of external scholarly PDFs, and UF institutional accessibility/brand approval have not been completed. A neutral palette or disclaimer does not grant an exemption from applicable institutional requirements.

For official requirements, consult [UF Web Standards](https://brandcenter.ufl.edu/web-standards/) and [UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/). Contact for access barriers: liusongyang@ufl.edu.

## Waymo video update

On 4 October 2026, the generic street time-lapse was replaced with official Waymo Los Angeles autonomous-driving B-roll, using source time 01:08–01:28. The selected excerpt is video-only, has no autoplay or loop, and is paired with a complete visual alternative and a synchronized description track. The original shot boundaries (4.546 s and 13.221 s within the excerpt) were checked for the VTT cues. Attribution appears next to the player and in the media-credit section. New asset filenames ensure previous browser caches cannot display the old clip with the new description. Details are in `reports/media-review.json`.

## Previous published build verification — presentation revision, 11 October 2026

GitHub Actions run [38170438150](https://github.com/cgchrfchscyrh/mixed_traffic/actions/runs/38170438150) deployed content commit `37ba3cde11385dce5111848bb60d187b0b0e88c1` after 11 axe scans and 95 functional checks passed with zero violations or errors. CI also passed the dependency audit, lint, and Astro/TypeScript build.

This was the presentation-based revision before the dual-video title change; it does not verify the current two-player interaction or the new SUMO media asset.

The live check verified five pages, 25 linked resources, 41 internal fragment links, the custom 404 response, HTTPS enforcement, and video byte-range support. Published asset hashes match the local sources, including all three new presentation figures. Browser checks confirmed the seven research sections, complete figure descriptions, keyboard video playback/pause, result-tab navigation, and no page-level horizontal overflow at 320 CSS pixels. No browser errors were observed.

GitHub Pages returned HSTS; CSP and referrer policy were verified in each generated page. HTTP CSP, X-Frame-Options, and X-Content-Type-Options response headers were absent and remain provider-controlled limitations. See `reports/deployment.json`, `reports/ci/axe-wcag21aa.json`, `reports/live-deployment.json`, and `reports/live-browser.json`. These technical checks do not constitute full WCAG, ADA, or institutional certification.

## Published dual-video verification — 11 October 2026

GitHub Actions run [38171063817](https://github.com/cgchrfchscyrh/mixed_traffic/actions/runs/38171063817) deployed content commit `e64740b7cddca2bffb1e683bd4fce3e09494eff4`. CI passed lint, dependency audit, Astro/TypeScript build, 11 axe scans and 115 functional checks, with zero violations or check errors.

The live verification checked five pages, 28 resources, 40 internal fragment links, custom 404 behavior and byte-range responses for both videos. Published media hashes match the checked local assets. Browser checks confirmed the 20.02-second Waymo and 22-second SUMO videos, initially paused playback, keyboard control of both players, full-frame switching, result-tab navigation and complete vertically stacked frames at 320 CSS pixels. No browser errors were found. HTTPS enforcement and actual response headers were rechecked; the provider-controlled header limitations above remain. The current deployment and browser reports identify this content commit.
