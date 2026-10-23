// The free checklist (Q17): public/recursos/revisa-tu-sitio-auranova.pdf, US Letter, made from the same data as
// /estandar/ (estandar.yaml), plus a cover preview for /recursos/ and a record of what it was made from.
// Run after editing the 15 or the pdf block: node scripts/checklist-pdf.mjs
import { chromium } from '@playwright/test';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { loadChecklist, RECORD } from './checklist-data.mjs';

const { groups, pdf, hash } = await loadChecklist();
const out = `public${pdf.file}`;
const cover = 'src/assets/generated/checklist-cover.png';
const SITE = 'https://auranova.mx';

const b64 = async (path) => (await readFile(path)).toString('base64');
const font = async (family, weight, file) =>
  `@font-face{font-family:"${family}";font-weight:${weight};src:url(data:font/woff2;base64,${await b64(`public/fonts/${file}`)}) format("woff2");}`;
const fonts = [
  await font('Roboto Condensed', 800, 'roboto-condensed-800.woff2'),
  await font('Montserrat', 400, 'montserrat-400.woff2'),
  await font('Montserrat', 600, 'montserrat-600.woff2'),
].join('');
const mark = `data:image/svg+xml;base64,${await b64('public/auranova-mark.svg')}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const link = (text) => {
  const [label, url] = text.includes(': ') ? text.split(': ') : ['', text];
  const a = `<a href="${SITE}/${url.replace(/^auranova\.mx\/?/, '')}/">${esc(url)}</a>`;
  return label ? `${esc(label)}: ${a}` : a;
};

// Numbered in reading order (the YAML's `n` is the principle's number in PHILOSOPHY §7).
let n = 0;
const body = groups
  .map(
    (g, gi) => `<section class="group">
      <h2><span class="badge">${gi + 1}</span>${esc(g.title)}</h2>
      <ol>${g.items
        .map((it) => `<li value="${++n}"><span class="box"></span><div><strong>${n}. ${esc(it.title)}</strong><p>${esc(it.check)}</p></div></li>`)
        .join('')}</ol>
    </section>`,
  )
  .join('');

// Tokens v1.3 as hex (a standalone render: no site CSS). Light paper, so it prints well.
const html = `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><title>${esc(pdf.title)} · AuraNova</title><style>${fonts}
@page { size: letter; margin: 0.55in 0.6in 0.7in; }
* { box-sizing: border-box; margin: 0; }
body { font: 400 10.5pt/1.5 Montserrat, sans-serif; color: #191B1C; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: #5934FD; text-decoration: none; }
.top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14pt; border-bottom: 1.5pt solid #191B1C; }
.lockup { display: flex; align-items: center; gap: 7pt; font: 800 17pt/1 "Roboto Condensed", sans-serif; }
.lockup img { width: 24pt; height: 24pt; }
.url { font-size: 9pt; color: #595F61; }
h1 { margin-top: 20pt; font: 800 30pt/1.05 "Roboto Condensed", sans-serif; letter-spacing: -0.01em; }
.subtitle { margin-top: 6pt; font: 600 12pt/1.3 Montserrat, sans-serif; color: #5934FD; }
.intro { margin-top: 10pt; max-width: 34em; color: #383B3D; }
.group { margin-top: 18pt; }
h2 { display: flex; align-items: center; gap: 8pt; margin-bottom: 6pt; font: 800 14pt/1.2 "Roboto Condensed", sans-serif; break-after: avoid; }
.badge { display: inline-grid; place-items: center; width: 18pt; height: 18pt; border-radius: 50%; background: #D8FD34; font: 800 10pt/1 "Roboto Condensed", sans-serif; }
ol { list-style: none; padding: 0; }
li { display: flex; gap: 10pt; padding: 7pt 0; border-bottom: 0.75pt solid #C2C9CC; break-inside: avoid; }
.box { flex: none; width: 12pt; height: 12pt; margin-top: 2pt; border: 1.25pt solid #595F61; border-radius: 2.5pt; }
li strong { font-weight: 600; }
li p { color: #383B3D; }
.closing { margin-top: 20pt; padding: 14pt 16pt; border-radius: 10pt; background: #191B1C; color: #EDEFF0; break-inside: avoid; }
.closing h2 { color: #D8FD34; }
.closing a { color: #D8FD34; font-weight: 600; }
.closing p + p { margin-top: 6pt; }
</style></head><body>
  <div class="top"><div class="lockup"><img src="${mark}" alt="">AuraNova</div><div class="url">auranova.mx</div></div>
  <h1>${esc(pdf.title)}</h1>
  <p class="subtitle">${esc(pdf.subtitle)}</p>
  <p class="intro">${esc(pdf.intro)}</p>
  ${body}
  <div class="closing">
    <h2>${esc(pdf.closingTitle)}</h2>
    <p>${esc(pdf.closing)} <a href="${SITE}/contacto/#agenda">${esc(pdf.closingLink)}</a></p>
    <p>${link(pdf.standardLink)}</p>
  </div>
</body></html>`;

await mkdir(dirname(out), { recursive: true });
await mkdir(dirname(cover), { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: out,
  format: 'Letter',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;padding:0 0.6in;font:8px Arial,sans-serif;color:#595F61;display:flex;justify-content:space-between">' +
    '<span>AuraNova · auranova.mx</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
});
// Cover preview for /recursos/: the top of page 1 at the page's width (8.5 in at 96 px per inch).
await page.setViewportSize({ width: 816, height: 1056 });
await page.emulateMedia({ media: 'print' });
await page.addStyleTag({ content: 'body { padding: 0.55in 0.6in; }' });
await page.screenshot({ path: cover, clip: { x: 0, y: 0, width: 816, height: 1056 } });
await browser.close();

const pages = ((await readFile(out, 'latin1')).match(/\/Type\s*\/Page[^s]/g) ?? []).length;
const { size } = await stat(out);
await writeFile(RECORD, JSON.stringify({ file: pdf.file, sourceHash: hash, pages, bytes: size, generatedAt: new Date().toISOString() }, null, 2) + '\n');
console.log(`Saved ${out} (${pages} pages, ${Math.round(size / 1024)} KB), ${cover} and ${RECORD}`);
