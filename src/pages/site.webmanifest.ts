import type { APIRoute } from 'astro';
import business from '../data/business.json';
import { withBase } from '../lib/paths';

/**
 * Manifest generujemy, a nie trzymamy jako plik statyczny, bo `start_url`,
 * `scope` i ścieżki ikon muszą uwzględniać `base` (na GitHub Pages
 * to `/rownowaga-web/`). Statyczny plik zawsze wskazywałby „/”.
 */
export const GET: APIRoute = () => {
  const manifest = {
    name: business.alternateName,
    short_name: business.shortName,
    description: business.description,
    lang: 'pl-PL',
    id: withBase('/'),
    start_url: withBase('/'),
    scope: withBase('/'),
    display: 'standalone',
    theme_color: '#4A6D59',
    background_color: '#FEFEFE',
    icons: [
      {
        src: withBase('/images/favicon/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: withBase('/images/favicon/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: withBase('/images/favicon/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
