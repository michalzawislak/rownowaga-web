// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import features from './src/data/features.json';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

/**
 * Indeksowanie dopuszczamy wyłącznie dla buildu na domenę produkcyjną.
 * Podgląd na GitHub Pages (i każdy inny build z GITHUB_PAGES=true) dostaje
 * `<meta name="robots" content="noindex">`, nie ma canonicala ani sitemapy —
 * żeby nie powstał duplikat treści w Google.
 */
const isIndexable = !isGitHubPages;

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages
    ? 'https://michalzawislak.github.io'
    : 'https://rownowaga-dietetyka.pl',
  base: isGitHubPages ? '/rownowaga-web' : '/',
  devToolbar: { enabled: false },
  
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.SITE_INDEXABLE': JSON.stringify(isIndexable),
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
    }
  },

  integrations: [
    react(),
    ...(isIndexable
      ? [
          sitemap({
            filter: (page) => features.blog || !page.includes('/blog'),
          }),
        ]
      : []),
  ]
});
