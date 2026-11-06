import { getCollection, type CollectionEntry } from 'astro:content';

export type Domain = CollectionEntry<'domains'>['data'];

export const slug = (name: string) => name.replace(/\./g, '-');
export const tld = (name: string) => name.slice(name.indexOf('.'));
export const catSlug = (cat: string) =>
  cat.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, 'et').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const order = { disponible: 0, reserve: 1, vendu: 2, masque: 3 } as const;

const all = async () => (await getCollection('domains')).map((e) => e.data);

/** Domains for sale (disponible + reserve): they get a page, a category, a /r/ redirect. */
export async function listed(): Promise<Domain[]> {
  return (await all()).filter((d) => d.status === 'disponible' || d.status === 'reserve')
    .sort((a, b) => order[a.status] - order[b.status] || Number(b.featured) - Number(a.featured) || a.id.localeCompare(b.id));
}

/** Sold domains, newest first: shown at the end of the catalog with a VENDU stamp, no page of their own. */
export async function sold(): Promise<Domain[]> {
  return (await all()).filter((d) => d.status === 'vendu').sort((a, b) => (b.sold_on || '').localeCompare(a.sold_on || ''));
}

export const shown = (d: Domain) => d.display || d.id;

export async function categories() {
  const ds = await listed();
  const map = new Map<string, Domain[]>();
  for (const d of ds) map.set(d.category, [...(map.get(d.category) ?? []), d]);
  return [...map.entries()].map(([name, items]) => ({ name, slug: catSlug(name), items })).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

export const statusLabel = { disponible: 'Disponible', reserve: 'En négociation', vendu: 'Vendu', masque: '' } as const;

export const priceLabel = (d: Domain) =>
  d.price_eur ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(d.price_eur) + ' HT' : 'Prix sur demande';

/** Subject and body of the prefilled email for a domain. */
export const mailFor = (name: string, kind: 'offre' | 'info' = 'info') => ({
  subject: kind === 'offre' ? `Offre pour ${name}` : `Intérêt pour le nom de domaine ${name}`,
  body:
    kind === 'offre'
      ? `Bonjour,\n\nJe souhaite faire une offre pour le nom de domaine ${name}.\n\nMon offre : ... €\nMon projet : ...\n\nCordialement,\n`
      : `Bonjour,\n\nJe suis intéressé(e) par le nom de domaine ${name}. Pouvez-vous m'indiquer le prix et les conditions ?\n\nCordialement,\n`,
});
