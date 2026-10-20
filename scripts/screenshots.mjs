// Full-page screenshots of the built site at every test width (brief §10 + PHILOSOPHY §7 #15),
// plus a horizontal-overflow check. Output: screenshots/<page>-<width>.png (git-ignored).
//   npm run build && npm run screenshots [-- --paths /,/contacto/ --widths 320,1440]
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { startPreview } from './preview-server.mjs';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const paths = opt(
  'paths',
  '/,/servicios/,/servicios/sitios-web/,/servicios/plataformas-a-la-medida/,/servicios/posicionamiento-en-google/,/servicios/contenido-y-marca/,/servicios/mantenimiento-web/,/servicios/asesoria-digital/,/como-trabajamos/,/proyectos/,/nosotros/,/contacto/,/no-existe/',
).split(',');
const widths = opt('widths', '320,375,390,768,1024,1440').split(',').map(Number);
const name = (path) => (path === '/' ? 'inicio' : path.replace(/^\/|\/$/g, '').replaceAll('/', '_'));

await mkdir('screenshots', { recursive: true });
const preview = await startPreview(4330);
const browser = await chromium.launch({ channel: 'msedge' });
let overflow = 0;
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    for (const path of paths) {
      await page.goto(new URL(path, preview.base).href, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Lazy images below the fold: load them so the full-page shot is complete.
      await page.evaluate(async () => {
        for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager';
        await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((done) => (img.onload = img.onerror = done)))));
        await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
        // Scroll through once so every region is painted before the full-page capture.
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((r) => requestAnimationFrame(() => r()));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(3000); // let entrance animations (bars, mockups) finish
      const scroll = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (scroll > 0) {
        overflow++;
        console.error(`Horizontal scroll: ${path} at ${width}px (${scroll}px too wide)`);
      }
      await page.screenshot({ path: `screenshots/${name(path)}-${width}.png`, fullPage: true });
    }
    await page.close();
  }
  console.log(`${paths.length * widths.length} screenshots in screenshots/; horizontal overflow: ${overflow ? `${overflow} cases` : 'none'}`);
  if (overflow) process.exitCode = 1;
} finally {
  await browser.close();
  preview.stop();
}
