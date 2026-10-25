// Fails a PRODUCTION build while any [[PENDIENTE / [[CONFIRMAR marker is left in dist/ (brief §1.5).
// Preview builds only report them.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { PRODUCTION } from '../site-env.mjs';

const MARKER = /\[\[(PENDIENTE|CONFIRMAR):\s*([^\]]+?)\]\]/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(html|xml|json|txt|js|webmanifest)$/.test(entry.name)) yield path;
  }
}

const found = new Map();
for await (const file of walk('dist')) {
  const page = '/' + relative('dist', file).split(sep).join('/');
  for (const [, kind, body] of (await readFile(file, 'utf8')).matchAll(MARKER)) {
    const key = `[[${kind}: ${body.trim()}]]`;
    found.set(key, (found.get(key) ?? new Set()).add(page));
  }
}

if (found.size === 0) {
  console.log('check:pending: no blanks left.');
} else {
  console.log(`check:pending: ${found.size} distinct blanks in the build:`);
  for (const [marker, files] of found) console.log(`  ${marker}  (${[...files].join(', ')})`);
  if (PRODUCTION) {
    console.error('Production build blocked: resolve every blank (docs/OPEN_QUESTIONS.md).');
    process.exit(1);
  }
}
