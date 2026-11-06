#!/usr/bin/env node
// Daily domain check (GitHub Actions: .github/workflows/check-domains.yml, or `npm run domains:check`).
// For every domain in src/data/domains.json and data/redirects.json:
//   - expiry date and registrar from RDAP (rdap.org routes to the registry: AFNIC for .fr, Verisign for .com)
//   - whether http://<domain>/ ends up on https://francedomaine.fr/r/<domain> (the forwarding Franck sets up)
// Writes data/status.json (machine) and data/STATUS.md (to read). Never changes the site.
import { readFileSync, writeFileSync } from 'node:fs';

const SITE = 'francedomaine.fr';
const EXPIRY_WARN_DAYS = 45;
const catalog = JSON.parse(readFileSync('src/data/domains.json', 'utf8'));
const extra = JSON.parse(readFileSync('data/redirects.json', 'utf8')).domains || [];
const rows = [
  ...catalog.map((d) => ({ domain: d.id, in_catalog: d.status !== 'masque', status: d.status, expect_redirect: d.redirect })),
  ...extra.filter((x) => !catalog.some((d) => d.id === x)).map((x) => ({ domain: x, in_catalog: false, status: 'hors catalogue', expect_redirect: true })),
];
const UA = 'FranceDomaine-check/1.0 (+https://francedomaine.fr)';
const timeout = (ms) => AbortSignal.timeout(ms);

async function rdap(domain) {
  try {
    const tldBase = { fr: 'https://rdap.nic.fr/', com: 'https://rdap.verisign.com/com/v1/', net: 'https://rdap.verisign.com/net/v1/' }[domain.split('.').pop()] || 'https://rdap.org/';
    let r;
    for (let i = 0; i < 4; i++) {
      r = await fetch(`${tldBase}domain/${domain}`, { headers: { accept: 'application/rdap+json', 'user-agent': UA }, signal: timeout(20000) });
      if (r.status !== 429) break;
      await new Promise((ok) => setTimeout(ok, 5000 * (i + 1)));
    }
    if (r.status === 404) return { rdap_error: 'not registered (RDAP 404)', unregistered: true, unsellable: 'not registered' };
    if (!r.ok) return { rdap_error: `HTTP ${r.status}` };
    const j = await r.json();
    const ev = (a) => (j.events || []).find((e) => e.eventAction === a)?.eventDate?.slice(0, 10) || null;
    const reg = (j.entities || []).find((e) => (e.roles || []).includes('registrar'));
    const fn = (e) => e?.vcardArray?.[1]?.find((v) => v[0] === 'fn')?.[3] || null;
    const name = fn(reg);
    // .fr shows the registrant's name when it is not redacted; .com (thin registry) never does.
    const holder = fn((j.entities || []).find((e) => (e.roles || []).includes('registrant')));
    // Privacy services (Dynadot "DEUP Privacy Service", Infomaniak "Ano Nymous", REDACTED…) hide the owner: unknown, not someone else.
    const masked = !holder || /privacy|ano nymous|redacted|anonym|non publi|whois|proxy/i.test(holder);
    const mine = masked ? null : /jankowski|company\s*1972/i.test(holder);
    const st = (j.status || []).map((x) => String(x).toLowerCase());
    const dead = st.filter((x) => /redemption|pending delete|pendingdelete|pending restore|pendingrestore/.test(x));
    return { expires: ev('expiration'), registered: ev('registration'), registrar: name, holder, holder_is_franck: mine, rdap_status: st, deleted: ev('deletion'),
      ...(dead.length ? { unsellable: dead.join(', ') } : mine === false ? { unsellable: `registrant is ${holder}` } : {}) };
  } catch (e) { return { rdap_error: String(e.message || e).slice(0, 120) }; }
}

async function follow(domain) {
  const hops = [];
  let url = `http://${domain}/`;
  try {
    for (let i = 0; i < 8; i++) {
      const r = await fetch(url, { redirect: 'manual', headers: { 'user-agent': UA }, signal: timeout(15000) });
      hops.push(`${r.status} ${url}`);
      const loc = r.headers.get('location');
      if (r.status >= 300 && r.status < 400 && loc) { url = new URL(loc, url).href; continue; }
      break;
    }
  } catch (e) { hops.push(`error ${String(e.message || e).slice(0, 100)}`); }
  const onSite = hops.filter((h) => { try { return new URL(h.split(' ')[1]).hostname.replace(/^www\./, '') === SITE; } catch { return false; } });
  const viaR = onSite.some((h) => new URL(h.split(' ')[1]).pathname.toLowerCase().startsWith(`/r/${domain}`));
  return { redirect: viaR ? 'ok' : onSite.length ? 'to-site-untracked' : 'no', hops };
}

const today = new Date();
const out = { checked: today.toISOString().slice(0, 16) + 'Z', domains: [] };
for (const row of rows) {
  const [a, b] = await Promise.all([rdap(row.domain), follow(row.domain)]);
  await new Promise((ok) => setTimeout(ok, 1500)); // registries rate-limit
  const days = a.expires ? Math.round((new Date(a.expires) - today) / 864e5) : null;
  const alerts = [];
  if (a.unsellable) alerts.push(`INVENDABLE (${a.unsellable})`);
  if (days !== null && days <= EXPIRY_WARN_DAYS) alerts.push(`expire dans ${days} j`);
  if (row.expect_redirect && b.redirect !== 'ok') alerts.push(b.redirect === 'no' ? 'ne redirige pas vers /r/' : 'arrive sur le site sans /r/ (non compté)');
  out.domains.push({ ...row, ...a, days_left: days, ...b, alerts });
}
writeFileSync('data/status.json', JSON.stringify(out, null, 2) + '\n');

const md = [
  `# Domain status, ${out.checked}`, '',
  'Generated by `scripts/check-domains.mjs` (daily, GitHub Actions). Expected forwarding for every domain: `https://francedomaine.fr/r/<domain>`.', '',
  '| Domain | Catalog | Expires | Days | Registrar | Redirect | Alerts |', '|---|---|---|---|---|---|---|',
  ...out.domains.map((d) => `| ${d.domain} | ${d.status} | ${d.expires || d.rdap_error || '?'} | ${d.days_left ?? ''} | ${d.registrar || ''} | ${d.redirect} | ${d.alerts.join('; ')} |`),
  '',
];
writeFileSync('data/STATUS.md', md.join('\n'));
const n = out.domains.filter((d) => d.alerts.length).length;
console.log(`${out.domains.length} domains checked, ${n} with alerts`);
