# Changelog

## 2026-11-06 — Launch on Cloudflare Pages (LIVE, Franck: "deploy")

- `main` is now the Astro rebuild (old Feb 2026 GitHub Pages `main` kept in history through an "ours" merge); default branch `main`; GitHub Pages site deleted.
- Pages project `francedomaine` created (API), deployed from Franck's machine; custom domains francedomaine.fr + www active.
- DNS: Hostinger apex A/AAAA and www CNAME replaced by proxied CNAMEs to francedomaine.pages.dev. DKIM a/b/c, autodiscover, autoconfig switched from proxied to DNS only.
- Fix found live: `/r/exemple.fr` landed on `nom=:splat` (Pages leaves placeholders in a query string literal). Now a 200 rewrite to `/a-vendre/` plus a URL rewrite in `Tracking.astro`. Tested on a preview and live with Playwright.
- www → apex 301 (`functions/_middleware.js`, same as franckj.com).
- Repo secrets set by Franck; GitHub deploy run 42221527684 green. Search Console sitemap submitted (Franck added the service account).
