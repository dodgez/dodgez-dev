// @ts-check
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [tailwind(), react(), sitemap()],
  output: 'server',
  site: 'https://www.dodgez.dev',
});
