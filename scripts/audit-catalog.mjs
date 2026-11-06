#!/usr/bin/env node
// Monthly catalog audit (.github/workflows/audit-catalog.yml; Franck 2026-11-06: "I want you to monitor this, on a monthly basis").
// Reads data/status.json (run scripts/check-domains.mjs first). A listed domain (disponible / reserve) that can no
// longer be sold, per its registry's RDAP (not registered, redemption period, pending delete/restore), is set to
// "masque" with the reason and date in its notes. A hidden domain that the audit hid earlier and that is active again
// is relisted when the .fr RDAP names Franck as registrant, otherwise only reported (.com hides the owner).
// A listed .fr whose RDAP registrant is someone else is hidden too.
// Appends to data/AUDIT.md; prints HIDDEN=<n> for the workflow.
import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';

const day = new Date().toISOString().slice(0, 10);
const dbPath = 'src/data/domains.json';
const db = JSON.parse(readFileSync(dbPath, 'utf8'));
const status = JSON.parse(readFileSync('data/status.json', 'utf8'));
const by = Object.fromEntries(status.domains.map((d) => [d.domain, d]));
const hidden = [], recheck = [], relisted = [], unknown = [];

for (const d of db) {
  const s = by[d.domain ?? d.id];
  if (!s) continue;
  if ((d.status === 'disponible' || d.status === 'reserve') && s.unsellable) {
    d.status = 'masque';
    d.notes = `Hidden ${day} by the monthly audit: RDAP says ${s.unsellable}${s.deleted ? `, deleted ${s.deleted}` : ''}. ${d.notes || ''}`.trim();
    hidden.push(`${d.id} (${s.unsellable})`);
  } else if (d.status === 'masque' && !s.unsellable && !s.rdap_error && /monthly audit|Hidden 2026-11-06/.test(d.notes || '') && s.holder_is_franck === true) {
    d.status = 'disponible';
    d.notes = `Relisted ${day} by the monthly audit: RDAP registrant ${s.holder}, registrar ${s.registrar || '?'}. ${d.notes || ''}`.trim();
    relisted.push(`${d.id} (registrant ${s.holder})`);
  } else if (d.status === 'masque' && !s.unsellable && !s.rdap_error && /monthly audit|Hidden 2026-11-06/.test(d.notes || '')) {
    recheck.push(`${d.id} (registered again, registrar ${s.registrar || '?'}: check who owns it before relisting)`);
  } else if (s.rdap_error && !s.unsellable) {
    unknown.push(`${d.id} (${s.rdap_error})`);
  }
}
if (hidden.length || relisted.length) writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n');

if (!existsSync('data/AUDIT.md')) writeFileSync('data/AUDIT.md', '# Monthly catalog audit\n\nWritten by `scripts/audit-catalog.mjs` (1st of each month). Newest at the bottom.\n');
const listedCount = db.filter((d) => d.status === 'disponible' || d.status === 'reserve').length;
appendFileSync('data/AUDIT.md', [
  `\n## ${day}`, '',
  `- Checked: ${status.domains.length} domains (RDAP ${status.checked}); listed after the audit: ${listedCount}`,
  `- Hidden now: ${hidden.length ? hidden.join('; ') : 'none'}`,
  `- Relisted (registrant is Franck): ${relisted.length ? relisted.join('; ') : 'none'}`,
  `- Active again, waits for Franck before relisting: ${recheck.length ? recheck.join('; ') : 'none'}`,
  `- RDAP not readable (retried next month): ${unknown.length ? unknown.join('; ') : 'none'}`, '',
].join('\n'));
console.log(`HIDDEN=${hidden.length + relisted.length}`);
console.log(hidden.concat(relisted, recheck, unknown).join('\n') || 'nothing to change');
