import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFileSync } from 'node:fs';

// Writes dist/_redirects (Cloudflare Pages) from the database, so every domain Franck forwards to
// https://francedomaine.fr/r/<domain> lands on its own page, tagged ?via=redirect for the arrival event.
function redirectsFile() {
  return {
    name: 'fd-redirects',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const lines = ['# Generated at build from src/data/domains.json (astro.config.mjs). Do not edit by hand.'];
        // Listed names (/r/<domain> → its page) are handled in functions/_middleware.js: Pages applied only
        // about the first 100 lines of this file. Keep this file short; the build fails past 90 lines.
        // Categories merged 2026-11-06 (Franck: "less Catégories, way too many, find broader"): old pages 301 to the new ones.
        for (const [from, to] of [
          // Tech & Business split 2026-11-06 (Franck: "split Tech & Business into broader catégories").
          ['tech-et-business', 'tech-et-numerique'],
          ['business-et-tech', 'tech-et-numerique'],
          ['tech-et-cloud', 'tech-et-numerique'],
          ['tech-et-saas', 'tech-et-numerique'],
          ['tech-et-communication', 'tech-et-numerique'],
          ['sante', 'sante-et-bien-etre'],
          ['sante-et-nutrition', 'sante-et-bien-etre'],
          ['sport-et-mobilite', 'sport-et-loisirs'],
          ['sport-et-coaching', 'sport-et-loisirs'],
          ['luxe-et-lifestyle', 'commerce-et-lifestyle'],
          ['finance-et-luxe', 'commerce-et-lifestyle'],
          ['e-commerce-et-creatif', 'commerce-et-lifestyle'],
          ['industrie', 'energie-et-industrie'],
          ['hotellerie', 'tourisme-et-territoires'],
          ['geographique', 'tourisme-et-territoires'],
        ]) lines.push(`/categories/${from}/  /categories/${to}/  301`);
        // Pages does not fill :splat inside a query string, so /r/<any> serves /a-vendre/ (200 rewrite) and
        // Tracking.astro turns the path into ?nom=<domain>&via=redirect before anything reads it.
        lines.push('/r/*  /a-vendre/  200', '/r  /  302');
        if (lines.length > 90) throw new Error(`_redirects has ${lines.length} lines; Pages ignored lines past ~100 (2026-11-06)`);
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
