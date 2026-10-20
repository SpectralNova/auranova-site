// Lighthouse results written by `npm run measure` (ADR-005). Never typed by hand.
import type { Lang } from '../content/business';

export interface PageScore {
  path: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  lcpMs: number;
  cls: number;
  tbtMs: number;
}
export interface Scores {
  measuredAt: string;
  baseUrl: string;
  lighthouseVersion: string;
  formFactor: string;
  runs: number;
  note?: string;
  pages: PageScore[];
}

const files = import.meta.glob<Scores>('../data/*.json', { eager: true, import: 'default' });

export function loadScores(name: string): Scores | undefined {
  return files[`../data/${name}.json`];
}

/** The lowest score per category across the measured pages (the honest number to publish). */
export function lowest(scores: Scores) {
  const min = (k: keyof Omit<PageScore, 'path'>) => Math.min(...scores.pages.map((p) => p[k]));
  const max = (k: keyof Omit<PageScore, 'path'>) => Math.max(...scores.pages.map((p) => p[k]));
  return {
    performance: min('performance'),
    accessibility: min('accessibility'),
    bestPractices: min('bestPractices'),
    seo: min('seo'),
    lcpMs: max('lcpMs'),
    cls: max('cls'),
  };
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Monterrey',
  }).format(new Date(iso));
}

export const seconds = (ms: number, lang: Lang) =>
  `${(ms / 1000).toLocaleString(lang === 'es' ? 'es-MX' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;
