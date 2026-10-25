// The one place that decides whether a build is the public site or a preview (ADR-002, ADR-020).
// Read by astro.config.mjs, src/lib/env.ts and scripts/check-pending.mjs.
//
// Production needs BOTH the production branch and SITE_ENV=production:
// - Cloudflare Workers Builds sets WORKERS_CI_BRANCH. Any branch other than `main` builds a preview, whatever
//   SITE_ENV says, so a branch can never publish the site.
// - On `main`, SITE_ENV stays unset (preview) until launch; at CP3 David sets the build variable
//   SITE_ENV=production on the Worker. Local builds have no branch variable and follow SITE_ENV as before.
// - SITE_INDEXABLE=1 is for local Lighthouse measurement only and is ignored on Cloudflare.
// - The production canonical is always https://auranova.mx, even if a SITE_URL build variable is left over
//   from the preview days.

export const PRODUCTION_BRANCH = 'main';
export const PRODUCTION_URL = 'https://auranova.mx';

const env = process.env;
const ci = Boolean(env.WORKERS_CI);
const branch = env.WORKERS_CI_BRANCH;

export const SITE_ENV = branch && branch !== PRODUCTION_BRANCH ? 'preview' : (env.SITE_ENV ?? 'preview');
export const PRODUCTION = SITE_ENV === 'production';
export const INDEXABLE = PRODUCTION || (!ci && env.SITE_INDEXABLE === '1');
export const SITE_URL = PRODUCTION ? PRODUCTION_URL : (env.SITE_URL ?? PRODUCTION_URL);
