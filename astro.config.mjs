// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

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

/**
 * Strony bloga żyją poza `src/pages`, więc powstają wyłącznie wtedy,
 * gdy `features.blog` jest włączone. Przy wyłączonej fladze nie ma
 * ani `/blog/`, ani wpisów — nie da się ich otworzyć ani zaindeksować.
 *
 * @returns {import('astro').AstroIntegration}
 */
function blogRoutes() {
  return {
    name: 'rownowaga:blog-routes',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        if (!features.blog) return;

        injectRoute({ pattern: '/blog', entrypoint: './src/routes/blog/index.astro' });
        injectRoute({ pattern: '/blog/[slug]', entrypoint: './src/routes/blog/[slug].astro' });
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? 'https://michalzawislak.github.io' : 'https://rownowaga-dietetyka.pl',
  base: isGitHubPages ? '/rownowaga-web' : '/',
  devToolbar: { enabled: false },

  image: {
    remotePatterns: [{ protocol: 'https' }],
  },

  /**
   * Fonty pobierane w czasie builda i serwowane z własnej domeny.
   * Subset `latin-ext` jest konieczny dla polskich znaków diakrytycznych.
   */
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-heading-family',
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-body-family',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.SITE_INDEXABLE': JSON.stringify(isIndexable),
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },

  integrations: [react(), blogRoutes(), ...(isIndexable ? [sitemap()] : [])],
});
