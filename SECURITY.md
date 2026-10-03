# Security review — 3 October 2026

This is a static GitHub Pages site. Only the `dist/` artifact is deployed. Node.js, Astro, ESLint, and their dependency trees are build tools, not a running application server. There are no accounts, forms, analytics, remote-image transformations, or shared authenticated caches. Fonts and media are served locally. A restrictive hash-based Content Security Policy is added to every generated HTML page.

## Dependency advisory retained for review

The registry currently provides no patched version for [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp), affecting `http-cache-semantics` through 4.2.0. Astro imports this package in `dist/assets/build/remote.js` for its remote-image build cache. The source uses local public images and never imports `astro:assets`. There is no request-time shared cache, user authentication, or Node server in the deployed artifact, so the described cross-user cache scenario is not reachable through this site's public pages under the reviewed configuration.

This is a scoped exposure assessment, **not a claim that the dependency is patched or that npm audit reports zero findings**. The raw audit remains in `reports/security-audit.json`. `npm run audit:security` fails for every unreviewed advisory, changes to the reviewed dependency version, dynamic server/image/fetch usage, or expiration of this review on 3 November 2026. Reassess and update the dependency when a fix is published. Do not downgrade Astro to the old version suggested by `npm audit --force`.

The initially inherited `braces` advisory was removed from the new projects by upgrading the Astro ESLint plugin/parser and pruning unused template packages. The original HOIST dependency tree was not changed.

## Deployment checks

Check HTTPS, repository base paths, media/figure/CSV links, CSP, and response headers after publishing. GitHub Pages controls HTTP response headers; HTML can provide CSP and referrer policy, but cannot impose HSTS, X-Frame-Options, or HTTP-only CSP directives. Record the actual live responses rather than claiming every header is configurable. No secrets or original licensed manuscript PDFs belong in this repository.
