// Build-time environment (static build: this runs in Node, never in the browser). See ADR-002.
export const SITE_ENV = process.env.SITE_ENV ?? 'preview';
export const PRODUCTION = SITE_ENV === 'production';
export const INDEXABLE = PRODUCTION || process.env.SITE_INDEXABLE === '1';
// Turnstile site key for the contact form (public by design; the secret lives only in Cloudflare).
// Until David creates the widget, Cloudflare's always-pass test key; TURNSTILE_SITE_KEY overrides it
// (local tests use the test key against the test secret).
export const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA';
