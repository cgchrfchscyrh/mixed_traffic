# Security review — 11 October 2026

This is a static GitHub Pages site. Only the `dist/` artifact is deployed. Node.js, Astro, ESLint, and their dependency trees are build tools, not a running application server. There are no accounts, forms, analytics, remote-image transformations, or shared authenticated caches. Fonts and media are served locally. A restrictive hash-based Content Security Policy is added to every generated HTML page.

## Dependencies

The 11 October 2026 dependency audit reports zero vulnerabilities. The unused `@eslint/markdown` checker was removed together with its transitive KaTeX dependency after [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) was reported. The site has no Markdown or MDX source pages; JavaScript, TypeScript, Astro, CSS, and JSON linting remain enabled. No unrelated dependency versions were changed. The previously affected transitive dependency `http-cache-semantics` remains patched at 4.3.0. The audit script has no advisory exceptions: any audit failure or reported vulnerability blocks deployment. Raw findings and the dated summary are in `reports/security-audit.json` and `reports/security-review.json`. This is a point-in-time check, not a guarantee against future vulnerabilities.

## Deployment checks

Check HTTPS, repository base paths, media/figure/CSV links, CSP, and response headers after publishing. GitHub Pages controls HTTP response headers; HTML can provide CSP and referrer policy, but cannot impose HSTS, X-Frame-Options, or HTTP-only CSP directives. Record the actual live responses rather than claiming every header is configurable. No secrets or original licensed manuscript PDFs belong in this repository.

## Observed production response

The 11 October 2026 live check for the presentation-based revision verified five pages and 25 resources and confirmed HTTPS enforcement, GitHub Pages hosting, and `Strict-Transport-Security: max-age=31556952`. Every generated page has the intended HTML CSP, and the layout sets a strict-origin-when-cross-origin referrer policy. MP4 byte-range requests return 206 Partial Content. No HTTP `X-Frame-Options`, `X-Content-Type-Options`, or CSP response header was returned; these provider-controlled header limitations are recorded rather than claimed to be configured. See `reports/live-deployment.json`.
