import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFileSync, readFileSync } from 'node:fs';

// Writes dist/_redirects (Cloudflare Pages) from the database, so every domain Franck forwards to
// https://francedomaine.fr/r/<domain> lands on its own page, tagged ?via=redirect for the arrival event.
function redirectsFile() {
  return {
    name: 'fd-redirects',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const db = JSON.parse(readFileSync(new URL('./src/data/domains.json', import.meta.url), 'utf8'));
        const lines = ['# Generated at build from src/data/domains.json (astro.config.mjs). Do not edit by hand.'];
        for (const d of db) {
          if (d.status === 'masque') continue;
          const to = `/domaines/${d.id.replace(/\./g, '-')}/?via=redirect`;
          lines.push(`/r/${d.id}  ${to}  302`, `/r/${d.id}/*  ${to}  302`);
        }
        lines.push('/r/*  /a-vendre/?nom=:splat&via=redirect  302', '/r  /  302');
        writeFileSync(new URL('_redirects', dir), lines.join('\n') + '\n');
      },
    },
  };
}

export default defineConfig({
  site: 'https://francedomaine.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (p) => !p.includes('/a-vendre/') }),
    redirectsFile(),
  ],
});
