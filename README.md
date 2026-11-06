# FranceDomaine.fr

Domain marketplace for Franck's .fr and .com names: catalog, one landing page per domain, every forwarded domain counted.
Astro 7, static, Cloudflare Pages. Light theme only. Owner: COMPANY 1972 (Franck).

## State (2026-11-06)

- Rebuilt from scratch on branch `ccr-238aa4b4-ca2w6g`. **Waits for Franck: "deploy"** (the move to Cloudflare Pages runs from his machine: ops `domains/francedomaine/CC-TASK-launch-2026-11-06.md`).
- Live today: an older single page on Hostinger (Plausible tag, which is cancelled). It is replaced at the DNS switch.
- 14 domains listed, 1 hidden: infracloud.fr (redemption, deleted 2026-10-18). velobox.fr was unregistered in the morning of 2026-11-06 and registered again the same day to Franck (RDAP registrant), so it is listed.
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
  "status": "disponible",         // disponible | reserve (en négociation) | vendu | masque (not on the site)
  "featured": true,               // "Premium" badge, shown on the home page
  "price_eur": null,              // integer € HT, or null = "Prix sur demande"
  "description": "…",             // public pitch, 20+ characters, French
  "uses": [],                     // optional public list of use ideas
  "redirect": true,               // Franck forwards this domain to /r/<domain>; the daily check expects it
  "added": "2026-01-19",
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
- Not in the catalog → `/a-vendre/?nom=<domain>` (generic "ce nom est à vendre" page, not indexed).
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
| Catalog audit: hides listed names that can't be sold (unregistered, redemption, pending delete, .fr registrant not Franck); relists hidden .fr names registered to Franck again | `.github/workflows/audit-catalog.yml` → `data/AUDIT.md` | monthly, 1st 06:41 UTC; ships at once only if `data/config.json` `audit_autoship` is true |
| Build + test | `.github/workflows/deploy.yml` | every push to main and PR |
| Deploy + IndexNow | same | commits with `[deploy]`, or run by hand |
| Weekly report | `tasks/weekly-report.md` (Claude scheduled task) | Mondays |

## Commands

```
npm run dev | build | check | test | domains:check | indexnow
```

## Email

contact@francedomaine.fr on Hostinger Email (MX already Hostinger). Setup and DNS: `docs/email.md`.
