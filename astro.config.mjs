// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

// Preview or production, the noindex switch and the canonical base all come from site-env.mjs (ADR-002, ADR-020):
// any build not explicitly production is noindex, and only `main` can be production.
import { INDEXABLE, PRODUCTION, SITE_URL } from './site-env.mjs';

// /proyectos/ leaves the sitemap while no project is visible (ADR-021: it's noindex then, and out of the nav).
const projectsDir = new URL('./src/content/projects/es/', import.meta.url);
const anyProjectVisible = readdirSync(projectsDir)
  .filter((f) => f.endsWith('.yaml'))
  .some((f) => parse(readFileSync(new URL(f, projectsDir), 'utf8')).visible !== false);

/** Writes Cloudflare Pages `_headers` and `robots.txt` for the current SITE_ENV. */
function siteFiles() {
  return {
    name: 'auranova-site-files',
    hooks: {
      /** @param {{ dir: URL }} options */
      'astro:build:done': async ({ dir }) => {
        // Third-party scripts, both Cloudflare's: Turnstile (contact form) loads on the first interaction with
        // the form and draws its check in its own frame; Web Analytics (Q18, cookieless) is the one script on
        // every page (David, 2026-10-21), injected by Cloudflare on auranova.mx at launch.
        const turnstile = 'https://challenges.cloudflare.com';
        const csp = [
          "default-src 'self'",
          `script-src 'self' ${turnstile} https://static.cloudflareinsights.com`,
          // YouTube's privacy-enhanced player, loaded only when a visitor presses play on an «Aprende» video (ADR-022).
          `frame-src ${turnstile} https://www.youtube-nocookie.com`,
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self' https://cloudflareinsights.com",
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
      filter: (page) => anyProjectVisible || !new URL(page).pathname.startsWith('/proyectos/'),
    }),
    siteFiles(),
  ],
  // Never inline scripts or assets: the CSP allows only same-origin files (script-src 'self').
  vite: { build: { assetsInlineLimit: 0 } },
});
