import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aismarttools.com',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  compressHTML: true,
  prefetch: { prefetchAll: true },
});
