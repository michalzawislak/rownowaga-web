/**
 * Prefiksuje ścieżkę o Astro `base` (np. `/rownowaga-web/` na GitHub Pages).
 * Lokalnie i na domenie produkcyjnej `base` to `/`, więc nic się nie zmienia.
 */
export function withBase(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;

  return base ? `${base}${normalized}` : normalized;
}
