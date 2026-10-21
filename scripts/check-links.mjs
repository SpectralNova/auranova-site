// Fails any build that links to a page or file missing from dist/ (pre-launch audit H1: footer links to
// pages that weren't built yet). Checks every same-origin href/src in the HTML; /api/ is the Worker's.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const SKIP = /^\/(api|cdn-cgi)\//;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const exists = (path) => stat(path).then(() => true, () => false);

const missing = new Map();
for await (const file of walk('dist')) {
  const page = '/' + relative('dist', file).split(sep).join('/').replace(/index\.html$/, '');
  const html = await readFile(file, 'utf8');
  for (const [, url] of html.matchAll(/\s(?:href|src)="(\/(?!\/)[^"#?]*)/g)) {
    if (SKIP.test(url)) continue;
    const target = join('dist', decodeURIComponent(url), url.endsWith('/') ? 'index.html' : '');
    if (!(await exists(target))) missing.set(url, (missing.get(url) ?? new Set()).add(page));
  }
}

if (missing.size === 0) {
  console.log('check:links: every internal link resolves.');
} else {
  console.error(`check:links: ${missing.size} internal links point to nothing:`);
  for (const [url, pages] of missing) console.error(`  ${url}  (on ${[...pages].join(', ')})`);
  process.exit(1);
}
