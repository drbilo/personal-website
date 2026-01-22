import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chrisbennett.online',
  output: 'static',
  trailingSlash: 'never',
  build: {
    assets: 'assets'
  }
});
