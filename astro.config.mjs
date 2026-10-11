import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://wrightgames.org',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
