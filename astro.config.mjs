// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rownowaga-dietyka.pl',
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
    sitemap()
  ]
});