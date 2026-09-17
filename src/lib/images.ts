import type { ImageMetadata } from 'astro';

/**
 * Obrazy treściowe trzymamy w `src/assets/images/`, żeby Astro mogło je
 * optymalizować (AVIF/WebP, skalowanie, hashowane nazwy). W `public/`
 * zostają tylko pliki o stałych adresach: favicony i manifest.
 *
 * Dane w JSON-ach (np. `business.json`) nadal opisują obraz ścieżką
 * w stylu `/images/about/profile.jpg`. Ten helper tłumaczy taką ścieżkę
 * na zaimportowany zasób, a gdy pliku jeszcze nie ma — podstawia placeholder.
 */
const assets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,webp,avif,svg}',
  { eager: true },
);

const PLACEHOLDER_KEY = '/src/assets/images/shared/placeholder.svg';

const normalize = (path: string): string => {
  const withoutBase = path.replace(/^https?:\/\/[^/]+/, '');
  const relative = withoutBase.replace(/^\/?(images\/)?/, '');
  return `/src/assets/images/${relative}`;
};

/** Zwraca zasób spod podanej ścieżki albo placeholder, jeśli pliku brak. */
export function resolveImage(path?: string): ImageMetadata {
  const key = path ? normalize(path) : PLACEHOLDER_KEY;
  return (assets[key] ?? assets[PLACEHOLDER_KEY]).default;
}

/** `true`, gdy pod ścieżką jest prawdziwy plik, a nie placeholder. */
export function hasImage(path?: string): boolean {
  return Boolean(path && assets[normalize(path)]);
}
