// WCAG 2.2 AA checks (axe) + keyboard-only flows (PHILOSOPHY §7 additions, brief §13).
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/servicios/',
  '/servicios/sitios-web/',
  '/servicios/plataformas-a-la-medida/',
  '/servicios/posicionamiento-en-google/',
  '/servicios/contenido-y-marca/',
  '/servicios/mantenimiento-web/',
  '/servicios/asesoria-digital/',
  '/como-trabajamos/',
  '/proyectos/',
  '/nosotros/',
  '/contacto/',
  '/no-existe/',
];

for (const path of pages) {
  for (const width of [390, 1440]) {
    test(`axe: ${path} at ${width}px has no serious or critical issues`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      for (const v of violations) console.log(`  ${path} @${width} [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
      const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => v.id)).toEqual([]);
    });
  }
}

test('skip link is the first stop and moves focus to the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('mobile menu: opens from the keyboard, Esc closes it and focus returns', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.nav__toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#menu')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  // The page behind the modal sheet is inert: Tab never reaches it (it may leave for the browser UI).
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(() => {
      const el = document.activeElement;
      return !el || el === document.body || Boolean(el.closest('#menu'));
    });
    expect(ok).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.locator('#menu')).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('services menu: opens from the keyboard, Esc closes it and focus returns', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const button = page.locator('.nav__menu-btn');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#nav-services')).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('#nav-services a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#nav-services')).toBeHidden();
  await expect(button).toBeFocused();
});

test('process tabs: arrow keys switch steps, autoplay can be paused', async ({ page }) => {
  await page.goto('/');
  const tabs = page.locator('[data-tabs] [role="tab"]');
  await expect(page.locator('[data-tabs]')).toHaveAttribute('data-ready', '');
  await page.locator('.tabs__pause').click();
  await expect(page.locator('[data-tabs]')).toHaveAttribute('data-stopped', '');
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#step-panel-1')).toBeVisible();
  await expect(page.locator('#step-panel-0')).toBeHidden();
  await page.keyboard.press('End');
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
});

test('contact form: keyboard only, errors announced, then accepted', async ({ page }) => {
  await page.goto('/contacto/');
  await page.locator('#contact-form button[type=submit]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#f-name')).toBeFocused();
  await expect(page.locator('#f-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#f-name-err')).toBeVisible();

  await page.keyboard.type('Ana Pérez');
  await page.locator('#f-email').focus();
  await page.keyboard.type('ana@empresa.com');
  await page.locator('#f-type').focus();
  await page.keyboard.press('ArrowDown');
  await page.locator('#f-message').focus();
  await page.keyboard.type('Quiero rediseñar mi sitio.');
  await page.locator('#f-consent').focus();
  await page.keyboard.press('Space');
  await page.locator('#contact-form button[type=submit]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#form-status')).toBeFocused();
  await expect(page.locator('#form-status')).toContainText('Vista previa');
});
