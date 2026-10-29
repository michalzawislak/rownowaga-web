import type { APIRoute } from 'astro';

/**
 * Boty, które zbierają treści do trenowania modeli AI. Blokada nie wpływa
 * na widoczność w wyszukiwarkach ani w odpowiedziach AI: Googlebot,
 * Bingbot, Applebot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
 * Claude-User czy PerplexityBot dalej mają pełny dostęp przez grupę `*`.
 * `Google-Extended` i `Applebot-Extended` to nie osobne crawlery, tylko
 * tokeny zgody na trening - Googlebot i Applebot nadal indeksują stronę.
 */
const AI_TRAINING_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
  'Bytespider',
];

/**
 * `Content-Signal` (contentsignals.org) deklaruje, do czego wolno użyć
 * treści: wyszukiwanie i odpowiedzi AI na bieżąco - tak, trening - nie.
 */
const indexableRobots = (sitemapUrl: URL): string => `${AI_TRAINING_BOTS.map(
  (bot) => `User-agent: ${bot}`,
).join('\n')}
Disallow: /

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

Sitemap: ${sitemapUrl.href}
`;

/**
 * Podgląd celowo NIE blokuje crawlowania: Google musi móc pobrać stronę,
 * żeby zobaczyć `noindex`. Blokada w robots.txt skutkowałaby indeksacją
 * samych adresów (bez treści). Brak sitemapy - nie zgłaszamy URL-i podglądu.
 */
const previewRobots = `User-agent: *
Allow: /
`;

export const GET: APIRoute = ({ site }) => {
  const isIndexable = import.meta.env.SITE_INDEXABLE;
  const sitemapUrl = new URL(
    `${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`,
    site,
  );
  const body = isIndexable ? indexableRobots(sitemapUrl) : previewRobots;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
