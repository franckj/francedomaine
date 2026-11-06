// The database: src/data/domains.json, one object per domain. The build fails if a row breaks this schema,
// so a bad edit by Claude, a task or by hand never reaches the live site. Field guide: README.md "Database".
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const domains = defineCollection({
  loader: file('src/data/domains.json'),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/, 'nom de domaine en minuscules, ex. aurae.fr'),
    display: z.string().optional(), // brand casing for display, e.g. "OpenBeer.com"
    category: z.string().default(''),
    status: z.enum(['disponible', 'reserve', 'vendu', 'masque']),
    featured: z.boolean().default(false),
    price_eur: z.number().int().positive().nullable().default(null),
    description: z.string().default(''),
    uses: z.array(z.string()).default([]),
    redirect: z.boolean().default(true),
    added: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    sold_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    notes: z.string().default(''),
  }).refine((d) => d.status === 'vendu' || (d.description.length >= 20 && d.category.length >= 2), {
    message: 'un domaine en vente a besoin d’une catégorie et d’une description (20 caractères min.)',
  }),
});

export const collections = { domains };
