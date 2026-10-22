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
  '/aviso-de-privacidad/',
  '/terminos/',
  '/no-existe/',
];

// Stand-ins for Turnstile and the Worker: the form tests never leave this machine.
const TURNSTILE_STUB =
  "window.turnstile = { render(el, o) { setTimeout(() => o.callback('XXXX.DUMMY.TOKEN.XXXX'), 50); return 'w'; }, reset() {} };";
const stubTurnstile = (page: import('@playwright/test').Page) =>
  page.route('https://challenges.cloudflare.com/**', (route) => route.fulfill({ contentType: 'text/javascript', body: TURNSTILE_STUB }));

for (const path of pages) {
  for (const width of [390, 1440]) {
    test(`axe: ${path} at ${width}px has no serious or critical issues`, async ({ page }) => {
      // Audit the settled frame: with motion, axe can sample a fade halfway and report its passing colour as a
      // contrast failure. Reduced motion shows every demo and screen in its final, readable state.
      await page.emulateMedia({ reducedMotion: 'reduce' });
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

test('animated demos: the pause button stops the animation and says what it will do next (WCAG 2.2.2)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/servicios/posicionamiento-en-google/');
  const demo = page.locator('.svc-demo');
  await demo.scrollIntoViewIfNeeded();
  await expect(demo).toHaveAttribute('data-playing', 'true');
  const toggle = demo.locator('.demo-toggle');
  await expect(toggle).toHaveAttribute('aria-label', 'Pausar animación');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(demo).toHaveAttribute('data-playing', 'false');
  await expect(toggle).toHaveAttribute('aria-label', 'Reproducir animación');
});

test('animated demos: nothing plays and no pause button shows with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-demo]').first()).toHaveAttribute('data-playing', 'false');
  await expect(page.locator('.demo-toggle').first()).toBeHidden();
});

test('roadmap: pinned on desktop, tabs jump to a step from the keyboard; plain timeline on phones', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/como-trabajamos/');
  const roadmap = page.locator('[data-roadmap]');
  await expect(roadmap).toHaveAttribute('data-pinned', '');
  await page.locator('.rm__tab').nth(3).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.rm__cur')).toHaveText('03');
  await expect(page.locator('.rm__tab').nth(3)).toHaveAttribute('aria-current', 'step');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(roadmap).not.toHaveAttribute('data-pinned', '');
  await expect(page.locator('.rm__step').nth(4)).toBeVisible();
});

test('contact form: keyboard only, errors announced, then sent (Turnstile only after the first interaction)', async ({ page }) => {
  const thirdParty: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://localhost')) thirdParty.push(request.url());
  });
  await stubTurnstile(page);
  let sent = '';
  await page.route('**/api/contacto', (route) => {
    sent = route.request().postData() ?? '';
    return route.fulfill({ json: { ok: true } });
  });
  await page.goto('/contacto/');
  expect(thirdParty).toEqual([]);
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
  await expect(page.locator('#form-status')).toContainText('Recibimos tu mensaje');
  expect(sent).toContain('XXXX.DUMMY.TOKEN.XXXX');
  expect(sent).toContain('sitio_web');
  await expect(page.locator('#f-name')).toHaveValue('');
});

test('contact form: when Turnstile asks for its checkbox, the send says so and waits for it', async ({ page }) => {
  // This stand-in asks for the checkbox and hands out the token only when the test "ticks" it.
  await page.route('https://challenges.cloudflare.com/**', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: "window.turnstile = { render(el, o) { setTimeout(() => o['before-interactive-callback'](), 50); window.__tick = () => { o['after-interactive-callback'](); o.callback('XXXX.DUMMY.TOKEN.XXXX'); }; return 'w'; }, reset() {} };",
    }),
  );
  await page.route('**/api/contacto', (route) => route.fulfill({ json: { ok: true } }));
  await page.goto('/contacto/');
  await page.locator('#f-name').fill('Ana Pérez');
  await page.locator('#f-email').fill('ana@empresa.com');
  await page.locator('#f-type').selectOption('sitio_web');
  await page.locator('#f-message').fill('Quiero un sitio.');
  await page.locator('#f-consent').check();
  await page.locator('#contact-form button[type=submit]').click();
  await expect(page.locator('#form-status')).toContainText('completa la verificación');
  await page.evaluate(() => (window as unknown as { __tick: () => void }).__tick());
  await expect(page.locator('#form-status')).toContainText('Recibimos tu mensaje');
});

test('contact form: a failed send says so, offers the email and keeps what was typed', async ({ page }) => {
  await stubTurnstile(page);
  await page.route('**/api/contacto', (route) => route.fulfill({ status: 502, json: { ok: false, error: 'delivery' } }));
  await page.goto('/contacto/');
  await page.locator('#f-name').fill('Ana Pérez');
  await page.locator('#f-email').fill('ana@empresa.com');
  await page.locator('#f-type').selectOption('asesoria');
  await page.locator('#f-message').fill('Necesito una asesoría.');
  await page.locator('#f-consent').check();
  await page.locator('#contact-form button[type=submit]').click();
  await expect(page.locator('#form-status')).toContainText('contacto@auranova.mx');
  await expect(page.locator('#f-message')).toHaveValue('Necesito una asesoría.');
});
