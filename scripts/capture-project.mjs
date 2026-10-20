// Captures a permitted project's screenshot for its case card (DESIGN_SYSTEM §7: 1440×900 desktop, same tool every time).
// Usage: node scripts/capture-project.mjs <url> <name>   →  src/assets/projects/<name>-desktop.png
import { chromium } from '@playwright/test';

const [url, name] = process.argv.slice(2);
if (!url || !name) throw new Error('Usage: node scripts/capture-project.mjs <url> <name>');
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'es-MX' });
await page.goto(url, { waitUntil: 'networkidle' });
// Dismiss a cookie banner with the least-consent option, so it doesn't cover the shot.
const dismiss = page.getByRole('button', { name: /solo lo necesario|rechazar|only necessary|reject/i }).first();
if (await dismiss.isVisible().catch(() => false)) await dismiss.click();
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);
await page.screenshot({ path: `src/assets/projects/${name}-desktop.png` });
await browser.close();
console.log(`Saved src/assets/projects/${name}-desktop.png`);
