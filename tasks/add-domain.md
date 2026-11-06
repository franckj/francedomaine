# Task: add, update or sell a domain

1. `git pull` on main. Open `src/data/domains.json`.
2. Add / change the row (schema in README "Database"). Rules:
   - `display` is required: the name with each word capitalized (LeMillion.com, Prix-Immobilier.com). If the word split is unclear, ask Franck (2026-11-06: "keep word capitalization for all names, ask me if you don't know").
   - `price_eur` only from Franck's own words or his Pricing tab (DOMAINS Portfolio sheet); otherwise `null`.
   - Description: French, factual about the name, no invented traffic, history or valuation.
   - Sold: `"status": "vendu"` (page stays, says sold, points to available names). Lost or dropped: `"masque"` + reason in `notes`.
3. `npm run build && npm test`. Both must pass.
4. Commit to main. Text/data only → no `[deploy]` unless Franck said "deploy" in the session.
5. After a deploy: `npm run indexnow -- https://francedomaine.fr/domaines/<slug>/ https://francedomaine.fr/domaines/`.
6. Tell Franck the forwarding to set for a new domain: `https://francedomaine.fr/r/<domain>`.
