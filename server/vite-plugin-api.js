import apiApp from './api.js';

/**
 * Vite plugin mounting the Express CMS API on Vite's development server.
 * @returns {import('vite').Plugin}
 */
export function apiPlugin() {
  return {
    name: 'vite-plugin-assist-cms-api',
    configureServer(server) {
      server.middlewares.use(apiApp);
    }
  };
}
