import type { APIRoute } from 'astro';
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /a-vendre/\n\nSitemap: https://francedomaine.fr/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
