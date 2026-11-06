#!/usr/bin/env node
// Submits URLs to IndexNow (Bing, Yandex, Seznam, Naver…). Key file: public/<key>.txt.
// Usage: node scripts/indexnow.mjs            → every URL in dist/sitemap-0.xml (run after a build)
//        node scripts/indexnow.mjs <url> ...  → only these
import { readFileSync, readdirSync } from 'node:fs';
const HOST = 'francedomaine.fr';
const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
const key = keyFile.replace('.txt', '');
let urls = process.argv.slice(2);
if (!urls.length) urls = [...readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URL(s), HTTP ${r.status}`);
if (r.status >= 400) process.exit(1);
