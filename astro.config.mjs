// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import features from './src/data/features.json';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages
    ? 'https://michalzawislak.github.io'
    : 'https://rownowaga-dietyka.pl',
  base: isGitHubPages ? '/rownowaga-web' : '/',
  devToolbar: { enabled: false },
  
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
    }
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => features.blog || !page.includes('/blog'),
    })
  ]
});
