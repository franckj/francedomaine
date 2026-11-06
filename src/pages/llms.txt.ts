import type { APIRoute } from 'astro';
import { listed, sold, shown, slug, priceLabel, statusLabel } from '../lib/domains';
import { SITE } from '../lib/site';
export const GET: APIRoute = async () => {
  const all = await listed();
  const done = await sold();
  const lines = [
    '# FranceDomaine.fr', '',
    `> ${SITE.description}`, '',
    `Éditeur : ${SITE.legal.company} (${SITE.legal.rcs}). Achat : e-mail depuis la fiche du nom de domaine, paiement par escrow, transfert sous 24 à 72 heures.`, '',
    '## Noms de domaine', '',
    ...all.map((d) => `- [${shown(d)}](${SITE.url}/domaines/${slug(d.id)}/): ${statusLabel[d.status]}, ${d.status === 'vendu' ? '' : priceLabel(d) + ', '}${d.category}. ${d.description}`),
    '', '## Déjà vendus', '', done.map(shown).join(', '),
    '', '## Pages', '',
    `- [Catalogue](${SITE.url}/domaines/)`, `- [Contact](${SITE.url}/contact/)`, `- [Mentions légales](${SITE.url}/mentions-legales/)`, '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
