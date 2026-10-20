// Copies the upstream design system into the repo (brief §2: never link across folders).
// Upstream is the source of truth: change it there first (with a changelog bump), then run `npm run sync:ds`.
// The only transform: font URLs become root-relative, because the fonts are served from /fonts/.
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const upstream = join(root, '..', '..', 'Resources', 'AuraNova', 'Design System');

const banner = (file) =>
  `/* Synced from Resources/AuraNova/Design System/${file} by scripts/sync-design-system.mjs.\n   Do not edit here: change upstream, bump its changelog, then run \`npm run sync:ds\`. */\n`;

await mkdir(join(root, 'src', 'styles'), { recursive: true });
await mkdir(join(root, 'public', 'fonts'), { recursive: true });

for (const file of ['tokens.css', 'components.css']) {
  let css = await readFile(join(upstream, file), 'utf8');
  if (file === 'tokens.css') css = css.replaceAll('url("fonts/', 'url("/fonts/');
  await writeFile(join(root, 'src', 'styles', file), banner(file) + css);
}

for (const font of await readdir(join(upstream, 'fonts'))) {
  if (font.endsWith('.woff2')) await copyFile(join(upstream, 'fonts', font), join(root, 'public', 'fonts', font));
}

const logos = ['auranova-mark.svg', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512-maskable.png'];
for (const logo of logos) await copyFile(join(upstream, 'logo', logo), join(root, 'public', logo));

console.log(`Design system synced from ${upstream}`);
