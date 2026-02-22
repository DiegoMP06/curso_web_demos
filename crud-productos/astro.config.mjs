// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from 'astro-icon';

import vue from '@astrojs/vue';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [db(), react(), icon(), vue()],

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',

  image: {
    domains: ['res.cloudinary.com'],
  },

  adapter: vercel(),
});