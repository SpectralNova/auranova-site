// Build-time environment (static build: this runs in Node, never in the browser). See ADR-002 and ADR-020;
// the preview/production rule lives in site-env.mjs.
export { INDEXABLE, PRODUCTION, SITE_ENV } from '../../site-env.mjs';
// Turnstile site key for the contact form (public by design; the secret lives only in Cloudflare).
// Widget created by David on 2026-10-21 for auranova.mx and the workers.dev preview. For `wrangler dev`,
// build with TURNSTILE_SITE_KEY=1x00000000000000000000AA (Cloudflare's always-pass test key; .dev.vars
// has the matching test secret), since the real key doesn't accept localhost.
export const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY ?? '0x4AAAAAAFf6Qy2jTTTczgjs';
