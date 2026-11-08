# Changelog

## 2026-11-08 · Session closed (Dynadot forwarding attempt)

No site change. Tried to automate the Dynadot forwarding to /r/<name> through Dynadot's official MCP (mcp.dynadot.com, OAuth). Added to Claude Code user config as `dynadot`; Franck's sign-in failed on Dynadot's login page ("missing or unresolvable redirect_uri", then /auth/login?error=verification_failed). Franck said "stop". The entry stays, marked "Needs authentication". Forwarding of the 181 Dynadot names is still to do (manual steps: Manage Domains → Action → DNS Settings → Dynadot Forwarding, target `https://francedomaine.fr/r/$domain$`, leave out PizzaRustica.fr, CampingPorto.fr, ExpertsRenovation.fr, CabaretParis.fr).

## 2026-11-07 · Session closed

Live: brand rebuild, copy round 1, 190 names in 10 categories (deploy 71a4a48), /r/ forwarding in the middleware, alternating home sections. ModeIA.fr ownership confirmed by Franck ("Mine, keep it"). Check first next session: `data/STATUS.md`. Waiting on Franck: Dynadot forwarding for the new names, the 9 featured picks, LinkedIn copy. Queued: nothing new.

## 2026-11-06 · 119 names from Franck's third list; France and Éducation & Formation categories

- 118 names added, and AquaBar.fr moved from the sold list back to the catalogue (Franck listed it; RDAP: Dynadot, DEUP privacy, so his). 190 names listed, 20 sold.
- New category France (Franck: "also add a France category, I have several 'France' domains"): FranceMed.fr moved in, plus FranceCompta, FranceEntrepreneurs.com, FranceProxy, FranceSociete, FranceTours, FranceTrampoline, ToitureFrance. 8 names.
- New category Éducation & Formation: CampusLab, CampusLink, CloudCampus, VirtualCampus, StartupCampus, CreatorAcademy, CreaFormation.com. 7 names.
- RDAP 2026-11-06 on all 119: 116 at Dynadot (102 behind DEUP privacy, 14 in Franck's name; 3 .com with no holder shown), ModeIA.fr at IONOS (holder anonymised), VitaBoost.fr at Key-Systems (COMPANY 1972). Earliest expiry 2027-01-19.
- `redirect: false` (no /r/ forwarding expected): PizzaRustica.fr, CampingPorto.fr, ExpertsRenovation.fr (live sites), ModeIA.fr and VitaBoost.fr (not at Dynadot).

## 2026-11-06 · Home sections on alternating backgrounds; /r/ redirect fix

- Home: each section is a full-width band, white and paper (#F9F6F2) in turn, after the paper hero. Franck: "alternate bg colors for section". Preview https://bands.francedomaine.pages.dev
- Bug found on the live site: Cloudflare Pages applied only about the first 100 lines of `_redirects`. /r/<name> for names past line ~102 (NeoCycles.com, PoolTech.fr and 30 more) and every old category 301 answered 404.
- Fix: `functions/_middleware.js` now sends /r/<name>[/path] for every listed name to its page (302, ?via=redirect, case-insensitive). `_redirects` keeps only the category 301s and the /r/* fallback (17 lines); the build fails past 90 lines.
- Tested on the preview: /r/neocycles.com, /r/pooltech.fr, /r/Aurae.fr/page 302 to their pages; /r/inconnu.fr 200 (a-vendre); /categories/tech-et-business/ and /categories/sante/ 301.

## 2026-11-06 · Tech & Business split

- Tech & Business (29 names) split into 3 categories: Tech & Numérique (11, 10 shown), Conseil & Finance (9), Énergie & Industrie (9). Franck: "split Tech & Business into broader catégories".
- /categories/tech-et-business/ and the older tech slugs 301 to /categories/tech-et-numerique/; /categories/industrie/ now 301s to Énergie & Industrie.

## 2026-11-06 — 35 more names (LIVE, Franck: "deploy")

- From Franck's list, all registered at Dynadot behind DEUP privacy (RDAP 2026-11-06): InovAI.fr, HyperBot.fr, DataFusion.fr (IA); HarmonyOS.fr, Episcope.fr, CapitalEnergie.fr, CityNews.fr, DataFact.fr, MovePay.fr, CyberCompany.fr, OpenSourceAcademy.fr, AtlasConstruction.fr, EasyProtect.fr, AgriConnect.fr, SuperRecharge.fr, PoolTech.fr, Energetiques.fr, AquaProtect.fr, GlobalSecurity.fr, Apura.fr, DarwinCapital.fr (Tech & Business); ErgoPro.fr, SkinCenter.fr, InstantBeaute.fr (Santé & Bien-être); DirectTransport.fr, CabaretParis.fr (Tourisme & Territoires); DroneZone.fr, NeoCycles.com (Sport & Loisirs); Joies.fr, Colocate.fr, RockShop.fr, Convertibles.fr, EcoVert.fr, Sucres.fr, PrimaPizza.fr (Commerce & Lifestyle).
- CabaretParis.fr is Franck's live guide site: `redirect: false`, no /r/ forwarding expected. HarmonyOS.fr shares the name of Huawei's OS (trademark risk told to Franck; listed on his "deploy").

## 2026-11-06 — Experience line: "Plus de 25 ans d'expertise" everywhere

- Hero said 27+ (counted from 1999), footer said 25. Franck: "plus de 25 ans d'expertise". One constant `SITE.experience` feeds both.
- Copy fixes 2 to 5 from the review (repeated "une fois vendu" line, 3 unsourced promises, luxury words, 22 descriptions with the same opening): proposed; Franck "Not now" (2026-11-06), recorded once in ops _context/decisions.md, not asked again.

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
