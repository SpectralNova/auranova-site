// Non-negotiable #4 (consistency): no raw colors, px or durations outside the design-system tokens.
// Scans our own CSS (src/**/*.css) and the <style> blocks / style="" attributes of .astro files.
// Skipped: the synced upstream copies (tokens.css, components.css).
// Allowed literals: media-query lines (CSS variables can't be used there), 0, 1px/2px hairlines and focus rings,
// and the 3px focus-ring offset (DESIGN_SYSTEM §9).
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const UPSTREAM = new Set(['src/styles/tokens.css', 'src/styles/components.css']);
const RULES = [
  { name: 'raw hex color', re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: 'raw rgb/hsl color', re: /\b(?:rgb|rgba|hsl|hsla)\(/g },
  { name: 'raw px', re: /(?<![\w.-])(\d*\.?\d+)px\b/g, allow: (m) => ['0', '1', '2', '3'].includes(m[1]) },
  { name: 'raw duration', re: /(?<![\w.-])\d*\.?\d+m?s\b/g },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(css|astro)$/.test(entry.name)) yield path;
  }
}

/** Returns [lineNumber, cssText] pairs to check. */
function cssLines(file, text) {
  const lines = text.split('\n');
  if (file.endsWith('.css')) return lines.map((l, i) => [i + 1, l]);
  const out = [];
  let inStyle = false;
  lines.forEach((line, i) => {
    if (/<style[\s>]/.test(line)) inStyle = true;
    if (inStyle) out.push([i + 1, line]);
    else for (const m of line.matchAll(/style="([^"]*)"/g)) out.push([i + 1, m[1]]);
    if (/<\/style>/.test(line)) inStyle = false;
  });
  return out;
}

const problems = [];
for await (const path of walk('src')) {
  const file = relative('.', path).split(sep).join('/');
  if (UPSTREAM.has(file)) continue;
  for (const [n, raw] of cssLines(file, await readFile(path, 'utf8'))) {
    const line = raw.replace(/\/\*.*?\*\//g, ''); // ignore comments
    if (/^\s*@media/.test(line)) continue;
    for (const rule of RULES) {
      for (const m of line.matchAll(rule.re)) {
        if (rule.allow?.(m)) continue;
        problems.push(`${file}:${n}  ${rule.name} "${m[0]}"`);
      }
    }
  }
}

if (problems.length) {
  console.error(`check:tokens: ${problems.length} raw values outside the tokens:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log('check:tokens: every value comes from the tokens.');
