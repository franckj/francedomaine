# Changelog

## 2026-11-06 — New brand on the site (preview https://brand.francedomaine.pages.dev, waits for Franck: "deploy")

- Palette 1 "Papier et Bleu France" (design-direction.md, Franck: "keep, that's super clean and elegant"): paper #F9F6F2 bands, ink #161616, Bleu France for names and buttons, red only for VENDU and the underline. Radius 4px everywhere, no gradients.
- Tricolour line under the header removed (Franck: "remove bleu blanc rouge stuff").
- Logo: FRANCE over DOMAINE in Passion One (the original LinkedIn wordmark's font, no flag) in header and footer. Fonts self-hosted (@fontsource Public Sans 400/600/800, Passion One 700), no Google Fonts call.
- Hero headline (Franck's words): "Votre marque mérite le nom de domaine parfait." with "parfait" underlined in red.
- Nav "Domaines" → "Noms de domaine" (rule: never "domaine" for "nom de domaine").
- og.png redrawn in the brand (`scripts/og.cjs`).
- Body copy unchanged: it waits for Franck's text ("all copy is wrong").

## 2026-11-06 — Launch on Cloudflare Pages (LIVE, Franck: "deploy")

- `main` is now the Astro rebuild (old Feb 2026 GitHub Pages `main` kept in history through an "ours" merge); default branch `main`; GitHub Pages site deleted.
- Pages project `francedomaine` created (API), deployed from Franck's machine; custom domains francedomaine.fr + www active.
- DNS: Hostinger apex A/AAAA and www CNAME replaced by proxied CNAMEs to francedomaine.pages.dev. DKIM a/b/c, autodiscover, autoconfig switched from proxied to DNS only.
- Fix found live: `/r/exemple.fr` landed on `nom=:splat` (Pages leaves placeholders in a query string literal). Now a 200 rewrite to `/a-vendre/` plus a URL rewrite in `Tracking.astro`. Tested on a preview and live with Playwright.
- www → apex 301 (`functions/_middleware.js`, same as franckj.com).
- Repo secrets set by Franck; GitHub deploy run 42221527684 green. Search Console sitemap submitted (Franck added the service account).
