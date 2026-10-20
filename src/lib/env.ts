// Build-time environment (static build: this runs in Node, never in the browser). See ADR-002.
export const SITE_ENV = process.env.SITE_ENV ?? 'preview';
export const PRODUCTION = SITE_ENV === 'production';
export const INDEXABLE = PRODUCTION || process.env.SITE_INDEXABLE === '1';
