import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import vue from "@astrojs/vue";
import react from '@astrojs/react';
import relativeLinks from 'astro-relative-links';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  //HTMLを圧縮しない
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  server: {
    port: 1234,
    host: false //ネットワーク全てのif空の接続を許可
  },
  integrations: [vue(), relativeLinks(), react(), svelte()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});