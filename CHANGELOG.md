# Changelog

## 2026-11-06 — Experience line: "Plus de 25 ans d'expertise" everywhere

- Hero said 27+ (counted from 1999), footer said 25. Franck: "plus de 25 ans d'expertise". One constant `SITE.experience` feeds both.
- Copy fixes 2 to 5 from the review (repeated "une fois vendu" line, 3 unsourced promises, luxury words, 22 descriptions with the same opening): proposed, not applied, wait for Franck.

## 2026-11-06 — 22 names added, IA category, selection of 9, .com section, favicon (LIVE, Franck: "push it live!")

- Added from Franck's list (RDAP 2026-11-06: all registered at Dynadot behind DEUP privacy; the monthly audit treats a masked holder as unknown, never hides on it): LaMovida.fr, ExpertiseMarketing.fr, AIcampus.fr, MyToy.fr, DermaPro.fr, EcoFactory.fr, NeoVita.fr, CoachUp.fr, HappyPark.fr, Sinergia.fr, NeoCard.fr, InfinityLabs.fr, Quizzy.fr, Ramoneurs.fr, NovaDoc.fr, FirstConsulting.fr, PrestaDrone.fr, Opora.fr, ABCgestion.fr, QuantumLab.fr, ProParking.fr, DomaineMouton.com. Already listed: IntelligencePhysique.com, MySticker.fr, MyTherapy.fr.
- New category IA: AIcampus.fr, InfinityLabs.fr, QuantumLab.fr, NextChat.fr (moved). 6 categories.
- Notre sélection: 9 names. `featured: true` in the database is Franck's pick; unpicked slots fill from the catalogue, with at least one .com.
- /domaines/: .fr first, then "Noms de domaine en .com" below.
- Final block button: "Nous écrire" → "Sécuriser votre nom de domaine".
- Favicon: "FD" in Passion One, Bleu France on white (SVG with the font embedded; ICO 16/32/48, PNG 32/180/192/512).

## 2026-11-06 — New brand on the site (preview https://brand.francedomaine.pages.dev, branding OK by Franck; LIVE 2026-11-06 with the entry above)

- Palette 1 "Papier et Bleu France" (design-direction.md, Franck: "keep, that's super clean and elegant"): paper #F9F6F2 bands, ink #161616, Bleu France for names and buttons, red only for VENDU and the underline. Radius 4px everywhere, no gradients.
- Tricolour line under the header removed (Franck: "remove bleu blanc rouge stuff").
- Logo: FRANCE over DOMAINE in Passion One (the original LinkedIn wordmark's font, no flag) in header and footer. Fonts self-hosted (@fontsource Public Sans 400/600/800, Passion One 700), no Google Fonts call.
- Hero headline (Franck's words): "Votre marque mérite le nom de domaine parfait." with "parfait" underlined in red.
- Nav "Domaines" → "Noms de domaine" (rule: never "domaine" for "nom de domaine").
- og.png redrawn in the brand (`scripts/og.cjs`).
- Copy round 1 (Franck 2026-11-06, his lines): nav "Le nom de domaine parfait"; hero lead "Un nom de domaine clair, en .fr … avant même d'avoir visité votre site"; "Pourquoi le nom de domaine compte"; "Un nom de domaine approximatif vous coûte des clients. Sans que vous le sachiez."; final block "Chaque nom de domaine est unique." + his paragraph.
- Rule applied on every page, descriptions included: no bare "nom" or "domaine", only "nom de domaine" ("stop with 'nom' too"); nothing sold on being short ("Court, donc mémorable" → "Facile à retenir", the "N lettres · Court" point removed from name pages). Built-text scan: 0 left.
- Categories 15 → 5 (Franck: "less Catégories, way too many, find broader"): Tech & Business, Santé & Bien-être, Sport & Loisirs, Commerce & Lifestyle, Tourisme & Territoires. Old /categories/ pages 301 to the new ones.

## 2026-11-06 — Launch on Cloudflare Pages (LIVE, Franck: "deploy")

- `main` is now the Astro rebuild (old Feb 2026 GitHub Pages `main` kept in history through an "ours" merge); default branch `main`; GitHub Pages site deleted.
- Pages project `francedomaine` created (API), deployed from Franck's machine; custom domains francedomaine.fr + www active.
- DNS: Hostinger apex A/AAAA and www CNAME replaced by proxied CNAMEs to francedomaine.pages.dev. DKIM a/b/c, autodiscover, autoconfig switched from proxied to DNS only.
- Fix found live: `/r/exemple.fr` landed on `nom=:splat` (Pages leaves placeholders in a query string literal). Now a 200 rewrite to `/a-vendre/` plus a URL rewrite in `Tracking.astro`. Tested on a preview and live with Playwright.
- www → apex 301 (`functions/_middleware.js`, same as franckj.com).
- Repo secrets set by Franck; GitHub deploy run 42221527684 green. Search Console sitemap submitted (Franck added the service account).
