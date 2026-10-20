// Lighthouse, mobile profile (default config), median of N runs per page (ADR-005).
//
//   npm run test:lh                 serve dist/ locally, print scores, fail if any category < 95 (brief §5)
//   npm run measure                 same, and write src/data/site-scores.json for "Nuestro estándar"
//   node scripts/lighthouse.mjs --base https://example.com --paths / --out example-scores
//
// For this site's own scores, measure an indexable local build (preview builds are noindex, which
// Lighthouse's SEO audit penalizes):  SITE_INDEXABLE=1 npm run build && npm run measure && npm run build
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { startPreview } from './preview-server.mjs';
import { writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const external = opt('base');
const out = opt('out', args.includes('--write-scores') ? 'site-scores' : undefined);
const runs = Number(opt('runs', '3'));
const paths = (opt('paths') ?? '/,/como-trabajamos/,/servicios/sitios-web/,/contacto/').split(',');
const BUDGET = 95;
const EDGE = process.env.CHROME_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 4329;

async function runOnce(url) {
  const chrome = await chromeLauncher.launch({ chromePath: EDGE, chromeFlags: ['--headless=new', '--no-first-run', '--disable-extensions'] });
  try {
    const { lhr } = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error' });
    const c = lhr.categories;
    return {
      performance: Math.round(c.performance.score * 100),
      accessibility: Math.round(c.accessibility.score * 100),
      bestPractices: Math.round(c['best-practices'].score * 100),
      seo: Math.round(c.seo.score * 100),
      lcpMs: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
      cls: Number(lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
      tbtMs: Math.round(lhr.audits['total-blocking-time'].numericValue),
      failing: Object.values(lhr.audits)
        .filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary')
        .map((a) => a.id),
    };
  } finally {
    await chrome.kill();
  }
}

const preview = external ? undefined : await startPreview(PORT);
const base = external ?? preview.base;
try {
  const pages = [];
  for (const path of paths) {
    const results = [];
    for (let i = 0; i < runs; i++) results.push(await runOnce(new URL(path, base).href));
    results.sort((a, b) => a.performance - b.performance);
    const median = results[Math.floor(results.length / 2)];
    // Non-performance categories are deterministic enough; keep the median run's values.
    pages.push({ path, ...median });
    console.log(
      `${path.padEnd(28)} perf ${median.performance}  a11y ${median.accessibility}  bp ${median.bestPractices}  seo ${median.seo}  LCP ${median.lcpMs}ms  CLS ${median.cls}  TBT ${median.tbtMs}ms` +
        (median.failing.length ? `\n${''.padEnd(28)} failing: ${median.failing.join(', ')}` : ''),
    );
  }

  if (out) {
    const require = createRequire(import.meta.url);
    const local = base.startsWith('http://localhost');
    const scores = {
      measuredAt: new Date().toISOString(),
      baseUrl: base,
      lighthouseVersion: require('lighthouse/package.json').version,
      formFactor: 'mobile',
      runs,
      ...(local ? { note: '[[CONFIRMAR: medido en la vista previa local; se vuelve a medir en el sitio publicado]]' } : {}),
      pages: pages.map(({ failing, ...p }) => p),
    };
    await mkdir('src/data', { recursive: true });
    await writeFile(`src/data/${out}.json`, JSON.stringify(scores, null, 2) + '\n');
    console.log(`Wrote src/data/${out}.json`);
  }

  if (!external) {
    const low = pages.filter((p) => ['performance', 'accessibility', 'bestPractices', 'seo'].some((k) => p[k] < BUDGET));
    if (low.length) {
      console.error(`Below the ${BUDGET} budget: ${low.map((p) => p.path).join(', ')}`);
      process.exitCode = 1;
    }
  }
} finally {
  preview?.stop();
}
