// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';

// SITE_ENV defaults to "preview": any build not explicitly marked production is noindex (ADR-002).
// SITE_INDEXABLE=1 drops noindex for a LOCAL measurement build only (Lighthouse SEO); never deploy it.
const SITE_ENV = process.env.SITE_ENV ?? 'preview';
const PRODUCTION = SITE_ENV === 'production';
const INDEXABLE = PRODUCTION || process.env.SITE_INDEXABLE === '1';
// Domain approved (Q19) but not bought yet; previews override SITE_URL with their own URL.
const SITE_URL = process.env.SITE_URL ?? 'https://auranova.mx';

/** Writes Cloudflare Pages `_headers` and `robots.txt` for the current SITE_ENV. */
function siteFiles() {
  return {
    name: 'auranova-site-files',
    hooks: {
      /** @param {{ dir: URL }} options */
      'astro:build:done': async ({ dir }) => {
        const csp = [
          "default-src 'self'",
          "script-src 'self'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "form-action 'self'",
          "base-uri 'self'",
          "frame-ancestors 'none'",
          "object-src 'none'",
        ].join('; ');
        const headers = [
          '/*',
          `  Content-Security-Policy: ${csp}`,
          '  X-Content-Type-Options: nosniff',
          '  Referrer-Policy: strict-origin-when-cross-origin',
          '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          '  X-Frame-Options: DENY',
          ...(PRODUCTION ? ['  Strict-Transport-Security: max-age=31536000; includeSubDomains'] : []),
          ...(INDEXABLE ? [] : ['  X-Robots-Tag: noindex, nofollow']),
          '/fonts/*',
          '  Cache-Control: public, max-age=31536000, immutable',
          '/_astro/*',
          '  Cache-Control: public, max-age=31536000, immutable',
          '',
        ].join('\n');
        const robots = INDEXABLE
          ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', SITE_URL)}\n`
          : 'User-agent: *\nDisallow: /\n';
        await writeFile(new URL('_headers', dir), headers);
        await writeFile(new URL('robots.txt', dir), robots);
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-MX', en: 'en-US' } },
      // /opciones/ is a preview-only review page (never built in production); keep it out regardless.
      filter: (page) => !page.includes('/opciones/'),
    }),
    siteFiles(),
  ],
  // Never inline scripts or assets: the CSP allows only same-origin files (script-src 'self').
  vite: { build: { assetsInlineLimit: 0 } },
});
