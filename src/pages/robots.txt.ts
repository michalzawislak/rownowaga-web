import type { APIRoute } from 'astro';

const indexableRobots = (sitemapUrl: URL): string => `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

/**
 * Podgląd celowo NIE blokuje crawlowania: Google musi móc pobrać stronę,
 * żeby zobaczyć `noindex`. Blokada w robots.txt skutkowałaby indeksacją
 * samych adresów (bez treści). Brak sitemapy — nie zgłaszamy URL-i podglądu.
 */
const previewRobots = `User-agent: *
Allow: /
`;

export const GET: APIRoute = ({ site }) => {
  const isIndexable = import.meta.env.SITE_INDEXABLE;
  const sitemapUrl = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site);
  const body = isIndexable ? indexableRobots(sitemapUrl) : previewRobots;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
