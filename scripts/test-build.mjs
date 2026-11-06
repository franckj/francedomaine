#!/usr/bin/env node
// Checks dist/ after `npm run build`. Run by the deploy workflow before anything ships.
import { readFileSync, existsSync } from 'node:fs';
const db = JSON.parse(readFileSync('src/data/domains.json', 'utf8'));
let fail = 0;
const ok = (c, m) => { console.log(`${c ? 'ok  ' : 'FAIL'} ${m}`); if (!c) fail++; };
const page = (p) => readFileSync(`dist${p}index.html`, 'utf8');
const listed = db.filter((d) => d.status === 'disponible' || d.status === 'reserve');
const soldRows = db.filter((d) => d.status === 'vendu');
ok(new Set(db.map((d) => d.id)).size === db.length, 'no duplicate domain in the database');
for (const d of db) ok(typeof d.display === 'string' && d.display.toLowerCase() === d.id, `${d.id} has its capitalized display name`);
for (const d of listed) {
  const p = `/domaines/${d.id.replace(/\./g, '-')}/`;
  ok(existsSync(`dist${p}index.html`), `page ${p}`);
  const h = page(p);
  ok(h.includes(`<link rel="canonical" href="https://francedomaine.fr${p}">`), `canonical ${p}`);
  ok(h.includes(`data-arrival="${d.id}"`), `arrival marker ${d.id}`);
}
for (const d of db.filter((d) => d.status === 'masque' || d.status === 'vendu')) ok(!existsSync(`dist/domaines/${d.id.replace(/\./g, '-')}/`), `hidden ${d.id} has no page`);
const red = readFileSync('dist/_redirects', 'utf8');
// /r/<name> for listed names is handled by functions/_middleware.js (Pages ignored _redirects past ~100 lines).
const mw = readFileSync('functions/_middleware.js', 'utf8');
ok(mw.includes("domains.json") && mw.includes('/domaines/') && mw.includes('via=redirect'), 'middleware sends listed /r/<name> to its page');
ok(red.trim().split('\n').length <= 90, `_redirects short enough for Pages (${red.trim().split('\n').length} lines)`);
ok(red.includes('/categories/tech-et-business/  /categories/tech-et-numerique/  301'), 'old Tech & Business page 301');
ok(/\/r\/\*\s+\/a-vendre\/\s+200/.test(red), 'catch-all /r/* rewrite');
for (const p of ['/', '/domaines/', '/contact/', '/a-vendre/', '/mentions-legales/', '/confidentialite/']) {
  const h = page(p);
  ok(!/[a-z]+@francedomaine\.fr/.test(h), `no plain email address in ${p}`);
  ok(h.includes('e.franckj.com/s.js'), `events counter on ${p}`);
  ok(!h.includes('plausible.io'), `no Plausible on ${p}`);
  ok(h.includes('content="light"') && !h.includes('prefers-color-scheme: dark'), `light only on ${p}`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(m[1]); } catch { ok(false, `JSON-LD parses on ${p}`); } }
}
{ const h = page('/domaines/'); ok(soldRows.every((d) => h.includes(`data-search="${d.id} vendu"`)), `${soldRows.length} sold names on /domaines/ with stamp`); ok(!/\$\s?\d|€\s?\d|\d\s?€/.test(h.slice(h.indexOf('id="vendus"'))), 'no price in the sold section'); }
ok(page('/a-vendre/').includes('noindex'), '/a-vendre/ is noindex');
ok(!readFileSync('dist/sitemap-0.xml', 'utf8').includes('a-vendre'), 'sitemap has no /a-vendre/');
ok(existsSync('dist/llms.txt') && existsSync('dist/robots.txt') && existsSync('dist/og.png'), 'llms.txt, robots.txt, og.png');
console.log(fail ? `\n${fail} failure(s)` : '\nall checks passed');
process.exit(fail ? 1 : 0);
