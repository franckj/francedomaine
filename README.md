# FranceDomaine.fr

Domain marketplace for Franck's .fr and .com names: catalog, one landing page per domain, every forwarded domain counted.
Astro 7, static, Cloudflare Pages. Light theme only, official French State colours (DSFR 1.15.4: Bleu France #000091, Rouge Marianne #E1000F). Owner: COMPANY 1972 (Franck).

## State (2026-11-06)

- **LIVE 2026-11-06** on Cloudflare Pages, project `francedomaine` (Templatery account), production branch `main` (Franck: "deploy"). francedomaine.fr and www (301 to apex, `functions/_middleware.js`) point to `francedomaine.pages.dev`. DNS before the switch: ops `domains/francedomaine/dns-before-2026-11-06.txt`.
- Mail DNS: the Hostinger DKIM, autodiscover and autoconfig CNAMEs were proxied (DKIM could not resolve); set to DNS only 2026-11-06. MX, SPF, DMARC, Google TXT untouched.
- Deploys: the first ones ran locally (`cf-run.sh npx wrangler@4 pages deploy dist --project-name francedomaine --branch main`, Node >= 22.23.4). Repo secrets set 2026-11-06 (Franck ran `~/.config/claude/bin/set-francedomaine-secrets.sh`); GitHub deploys work (`gh workflow run deploy.yml` or a `[deploy]` commit).
- The old Hostinger hosting still exists, serving nothing on this domain; cancelling it is Franck's call.
- 190 names listed after the 2026-11-06 additions (10 categories incl. IA, France, Éducation & Formation). Tech & Business was split on 2026-11-06. 1 hidden: infracloud.fr (redemption, deleted 2026-10-18). velobox.fr was unregistered in the morning of 2026-11-06 and registered again the same day to Franck (RDAP registrant), so it is listed.
- Sold names: the VENDU section (end of /domaines/, 8 on the home page, red rubber stamp) shows only the list Franck gives: all sold .fr except the adult name JouetSexuel.fr (Franck 2026-11-06: "all sold .fr for now, except adult"), plus LeTacos.com and Prix-Immobilier.com (Franck, same day): 21 names from DOMAINS Portfolio › SALES. Add each as `status: vendu` with `display` and `sold_on`; never a price.
- Home page rewritten 2026-11-06 as a French sales page (copy in `src/data/home.ts`): hero, problem, 8 reasons (confusion, category, .fr, short, brand, phone test, e-mail, asset), for whom, selection, how to buy, FAQ, final CTA.

## Layout

| Path | What |
|---|---|
| `src/data/domains.json` | **The database**: one row per domain (below) |
| `src/data/home.ts` | Home page copy (French): edit the words there |
| `data/config.json` | Scheduled-job settings (`audit_autoship`) |
| `data/AUDIT.md` | Monthly audit log |
| `data/redirects.json` | Domains forwarded here that are not in the catalog |
| `data/status.json`, `data/STATUS.md` | Written daily by the check: expiry, registrar, forwarding OK or not |
| `src/content.config.ts` | Schema: the build fails on a bad row |
| `src/pages/` | `/`, `/domaines/`, `/domaines/<domain-with-dashes>/`, `/categories/<cat>/`, `/a-vendre/` (unknown forwarded names), `/contact/`, legal, `robots.txt`, `llms.txt` |
| `src/components/Seo.astro` | Title, description, canonical, OG/Twitter, JSON-LD (Organization, WebSite + page graph) |
| `src/components/Tracking.astro` | Events counter + redirect arrival event |
| `astro.config.mjs` | Sitemap + writes `dist/_redirects` from the database |
| `scripts/` | `check-domains.mjs`, `audit-catalog.mjs`, `indexnow.mjs`, `test-build.mjs` |
| `tasks/` | Prompts for Claude sessions and scheduled tasks |

## Database: `src/data/domains.json`

```json
{
  "id": "aurae.fr",               // the domain, lowercase (unique)
  "category": "Luxe & Lifestyle", // free text; each category gets a page
  "display": "Aurae.fr",          // required: word capitalization (Franck 2026-11-06); ask him when the split is unclear
  "status": "disponible",         // disponible | reserve (en négociation) | vendu (VENDU section) | masque (not on the site)
  "featured": true,               // "Premium" badge, shown on the home page
  "price_eur": null,              // integer € HT, or null = "Prix sur demande"
  "description": "…",             // public pitch, 20+ characters, French
  "uses": [],                     // optional public list of use ideas
  "redirect": true,               // Franck forwards this domain to /r/<domain>; the daily check expects it
  "added": "2026-01-19",
  "sold_on": "2026-10-06",        // vendu only: shown as "Vendu en 2026"
  "notes": ""                     // internal, never shown
}
```

Add, sell or hide a domain by editing this file (Claude: `tasks/add-domain.md`). A price is only ever Franck's number.

## Redirect tracking

Every domain Franck owns is forwarded (301 or 302, at the registrar or in Cloudflare) to:

```
https://francedomaine.fr/r/<domain>
```

- In the catalog → `/domaines/<domain>/?via=redirect` (rules generated into `_redirects` at build).
- Not in the catalog → `/r/*` serves `/a-vendre/` (200 rewrite: Pages does not fill `:splat` inside a query string), and `Tracking.astro` rewrites the URL to `/a-vendre/?nom=<domain>` (generic "ce nom est à vendre" page, not indexed).
- The page records `Redirect: Arrival` `{domain, known}` in the events counter, then cleans the URL.
- `scripts/check-domains.mjs` tests each domain daily and flags any that doesn't reach `/r/<domain>`.

## Tracking (ops `events/README.md`)

Cookie-free counter at e.franckj.com, page views on (`data-pageviews="always"`). Events: `Redirect: Arrival {domain, known}`, `Contact: Click {domain, kind}`, `Search {q}` (searches with no result). Read from ops:

```
python3 -I events/q.py "SELECT json_extract(props,'$.domain') AS d, count(*) n FROM events WHERE site='francedomaine.fr' AND name='Redirect: Arrival' AND day >= ? GROUP BY 1 ORDER BY n DESC" 2026-11-01
```

## Scheduled

| What | Where | When |
|---|---|---|
| Domain check (expiry + forwarding) | `.github/workflows/check-domains.yml` | daily 05:23 UTC, commits `data/` only |
| Catalog audit: hides listed names that can't be sold (unregistered, redemption, pending delete, .fr registrant not Franck); relists hidden .fr names registered to Franck again | `.github/workflows/audit-catalog.yml` → `data/AUDIT.md` | monthly, 1st 06:41 UTC; ships at once (`data/config.json` `audit_autoship`: true, Franck 2026-11-06 "Yes, ship it") and alerts on Telegram ("Ship and alert"; repo secret `TELEGRAM_BOT_TOKEN`) |
| Build + test | `.github/workflows/deploy.yml` | every push to main and PR |
| Deploy + IndexNow | same | commits with `[deploy]`, or run by hand |
| Weekly report | `tasks/weekly-report.md` (Claude scheduled task) | Mondays |

## Commands

```
npm run dev | build | check | test | domains:check | indexnow
```

## Email

contact@francedomaine.fr on Hostinger Email (MX already Hostinger). Setup and DNS: `docs/email.md`.
