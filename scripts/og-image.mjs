// Share image for links (Open Graph / X): public/og/auranova.jpg, 1200×630 (pre-launch audit M1).
// The art is the Facebook cover's horizon (brand/og/og-art.jpg, cropped from the original), with the hero
// headline in brand type. Run after changing the headline or the art: node scripts/og-image.mjs
import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';

const b64 = async (path) => (await readFile(path)).toString('base64');
const font = async (family, weight, file) =>
  `@font-face{font-family:"${family}";font-weight:${weight};src:url(data:font/woff2;base64,${await b64(`public/fonts/${file}`)}) format("woff2");}`;
const fonts = [
  await font('Roboto Condensed', 800, 'roboto-condensed-800.woff2'),
  await font('Montserrat', 400, 'montserrat-400.woff2'),
  await font('Montserrat', 600, 'montserrat-600.woff2'),
].join('');
const art = `data:image/jpeg;base64,${await b64('brand/og/og-art.jpg')}`;
const mark = `data:image/svg+xml;base64,${await b64('public/auranova-mark.svg')}`;

// Tokens v1.3 as hex (a standalone render: no site CSS).
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${fonts}
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: #191B1C url(${art}) center / cover no-repeat;
  color: #EDEFF0; font-family: Montserrat, sans-serif; text-align: center; }
.top { position: absolute; left: 0; right: 0; top: 74px; }
.eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 9px 20px; border: 1px solid #383B3D; border-radius: 999px;
  background: rgba(34, 36, 38, 0.85); font: 600 16px/1 Montserrat, sans-serif; letter-spacing: 0.14em; text-transform: uppercase; }
.eyebrow::before { content: ""; width: 9px; height: 9px; border-radius: 50%; background: #D8FD34; box-shadow: 0 0 14px rgba(216, 253, 52, 0.7); }
h1 { margin-top: 26px; font: 800 76px/1.04 "Roboto Condensed", sans-serif; letter-spacing: -0.01em; }
.hl { color: #D8FD34; }
.lockup { position: absolute; left: 0; right: 0; bottom: 70px; display: flex; justify-content: center; align-items: center; gap: 12px;
  font: 800 38px/1 "Roboto Condensed", sans-serif; }
.lockup img { width: 46px; height: 46px; }
.url { position: absolute; left: 0; right: 0; bottom: 34px; font: 400 18px/1 Montserrat, sans-serif; color: #9BA3A8; letter-spacing: 0.04em; }
</style></head><body>
  <div class="top">
    <span class="eyebrow">Sitios web · Contenido · Asesoría digital</span>
    <h1>Un sitio web que<br><span class="hl">trabaja tanto como tú</span></h1>
  </div>
  <div class="lockup"><img src="${mark}" alt="">AuraNova</div>
  <div class="url">auranova.mx</div>
</body></html>`;

await mkdir('public/og', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og/auranova.jpg', type: 'jpeg', quality: 90 });
await browser.close();
console.log('Saved public/og/auranova.jpg');
