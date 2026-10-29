// One Lighthouse mobile run per page, printing what the LCP element is and where its time goes (ADR-024):
// the element, its timing, render-blocking files, main-thread work and every request.
//
//   node scripts/lcp-diagnose.mjs --base https://auranova.mx --paths /,/servicios/sitios-web/
//   node scripts/lcp-diagnose.mjs --base https://localhost:4443 --insecure --block-rum   (with scripts/h2-serve.mjs)
//
// --insecure accepts h2-serve's self-signed certificate; --block-rum keeps a local run from reporting a visit to
// Cloudflare Web Analytics (the beacon itself still loads).
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { createServer } from 'node:net';

const freePort = () =>
  new Promise((resolve, reject) => {
    const server = createServer().once('error', reject).listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const base = opt('base', 'https://auranova.mx');
const paths = opt('paths', '/servicios/sitios-web/').split(',');
const EDGE = process.env.CHROME_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

for (const path of paths) {
  const flags = ['--headless=new', '--no-first-run', '--disable-extensions'];
  if (args.includes('--insecure')) flags.push('--ignore-certificate-errors');
  if (args.includes('--block-rum')) flags.push('--host-resolver-rules=MAP cloudflareinsights.com ~NOTFOUND');
  const chrome = await chromeLauncher.launch({ port: await freePort(), chromePath: EDGE, chromeFlags: flags });
  try {
    const { lhr } = await lighthouse(new URL(path, base).href, { port: chrome.port, output: 'json', logLevel: 'error' });
    const a = lhr.audits;
    console.log(`\n=== ${path}  perf ${Math.round(lhr.categories.performance.score * 100)}  LCP ${Math.round(a['largest-contentful-paint'].numericValue)}ms  FCP ${Math.round(a['first-contentful-paint'].numericValue)}ms`);
    const el = a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node;
    if (el) console.log('LCP element:', el.nodeLabel, '\n  ', el.snippet, '\n  ', el.selector);
    const breakdown = a['lcp-breakdown-insight']?.details?.items ?? a['largest-contentful-paint-element']?.details?.items ?? [];
    for (const table of breakdown)
      for (const p of table.items ?? [])
        if (p.subpart ?? p.phase) console.log(`  ${String(p.label ?? p.subpart ?? p.phase).padEnd(26)} ${Math.round(p.duration ?? p.timing)}ms`);
    const lcpReq = a['lcp-discovery-insight'] ?? a['prioritize-lcp-image'];
    if (lcpReq?.details) console.log('discovery:', JSON.stringify(lcpReq.details).slice(0, 600));
    const rb = a['render-blocking-insight'] ?? a['render-blocking-resources'];
    for (const r of rb?.details?.items ?? []) console.log('render-blocking:', r.url, Math.round(r.wastedMs ?? r.totalBytes ?? 0));
    for (const r of a['mainthread-work-breakdown']?.details?.items ?? []) console.log(`  main thread ${String(r.groupLabel).padEnd(28)} ${Math.round(r.duration)}ms`);
    console.log('  dom size', a['dom-size']?.numericValue ?? a['dom-size-insight']?.numericValue);
    const reqs = (a['network-requests']?.details?.items ?? []).filter((r) => r.resourceType !== 'Other');
    console.log('requests:');
    for (const r of reqs)
      console.log(`  ${String(Math.round(r.networkRequestTime)).padStart(5)}→${String(Math.round(r.networkEndTime)).padStart(5)}ms  ${String(Math.round((r.transferSize ?? 0) / 1024)).padStart(4)}KB  ${(r.priority ?? '').padEnd(8)} ${r.resourceType.padEnd(10)} ${r.url.replace(base, '')}`);
  } finally {
    await chrome.kill();
  }
}
