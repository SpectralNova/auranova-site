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
  '/estandar/',
  '/recursos/',
  '/aprende/',
  '/aprende/auditoria-pagina-web-celular/',
  '/diagnostico-gratis/',
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

test('diagnosis form: needs the business and a real site address, then posts to /api/diagnostico', async ({ page }) => {
  await stubTurnstile(page);
  let sent = '';
  await page.route('**/api/diagnostico', (route) => {
    sent = route.request().postData() ?? '';
    return route.fulfill({ json: { ok: true } });
  });
  await page.goto('/diagnostico-gratis/');
  await page.locator('#diagnosis-form button[type=submit]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#d-name')).toBeFocused();
  for (const id of ['d-name', 'd-email', 'd-company', 'd-website', 'd-goal', 'd-consent']) {
    await expect(page.locator(`#${id}`)).toHaveAttribute('aria-invalid', 'true');
  }

  await page.keyboard.type('Ana Pérez');
  await page.locator('#d-email').focus();
  await page.keyboard.type('ana@empresa.com');
  await page.locator('#d-company').focus();
  await page.keyboard.type('Pastelería Ana');
  // Not a site address: the field says so, in words, before anything is sent.
  await page.locator('#d-website').focus();
  await page.keyboard.type('no tengo');
  await page.locator('#d-goal').focus();
  await page.keyboard.type('Que me contacten más clientes.');
  await page.locator('#d-consent').focus();
  await page.keyboard.press('Space');
  await page.locator('#diagnosis-form button[type=submit]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#d-website')).toBeFocused();
  await expect(page.locator('#d-website-err')).toContainText('minegocio.com');
  expect(sent).toBe('');

  // Without https://, as most people type it.
  await page.locator('#d-website').fill('pasteleriaana.mx');
  await page.locator('#diagnosis-form button[type=submit]').focus();
  await page.keyboard.press('Enter');
  const status = page.locator('#diagnosis-form .form__status');
  await expect(status).toBeFocused();
  await expect(status).toContainText('Recibimos tu solicitud');
  expect(sent).toContain('pasteleriaana.mx');
  expect(sent).toContain('XXXX.DUMMY.TOKEN.XXXX');
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

// Cookie banner. A stand-in for Cloudflare Zaraz's consent API records what the banner hands it.
const ZARAZ_STUB = `window.zaraz = { calls: [], consent: { APIReady: true,
  setAll(v) { window.zaraz.calls.push('setAll:' + v); }, sendQueuedEvents() { window.zaraz.calls.push('sendQueued'); } },
  track(name) { window.zaraz.calls.push('track:' + name); } };`;
const zarazCalls = (page: import('@playwright/test').Page) =>
  page.evaluate(() => (window as unknown as { zaraz: { calls: string[] } }).zaraz.calls);

test('cookie banner: asks once, early in the keyboard order, and hands the choice to Zaraz', async ({ page }) => {
  await page.addInitScript(ZARAZ_STUB);
  await page.goto('/');
  const banner = page.locator('#cookie-consent');
  await expect(banner).toBeVisible();
  await page.keyboard.press('Tab'); // skip link
  await page.keyboard.press('Tab');
  await expect(banner.getByRole('link', { name: 'aviso de privacidad' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(banner.getByRole('button', { name: 'Aceptar' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(banner).toBeHidden();
  await expect(page.locator('#main')).toBeFocused();
  expect(await zarazCalls(page)).toEqual(['setAll:true', 'sendQueued']);
  // Next page: no banner, and the stored choice reaches Zaraz again (plus that page's queued events).
  await page.goto('/nosotros/');
  await expect(banner).toBeHidden();
  expect(await zarazCalls(page)).toEqual(['setAll:true', 'sendQueued']);
});

test('cookie banner: «Preferencias de cookies» reopens it with the current choice; Esc keeps it, Rechazar changes it', async ({ page }) => {
  await page.addInitScript(ZARAZ_STUB);
  await page.goto('/');
  await page.locator('#cookie-consent').getByRole('button', { name: 'Aceptar' }).click();
  const prefs = page.getByRole('button', { name: 'Preferencias de cookies' });
  await prefs.click();
  const banner = page.locator('#cookie-consent');
  await expect(banner).toBeFocused();
  await expect(banner).toContainText('las aceptaste');
  await page.keyboard.press('Escape');
  await expect(banner).toBeHidden();
  await expect(prefs).toBeFocused();
  await prefs.click();
  await banner.getByRole('button', { name: 'Rechazar' }).click();
  await expect(prefs).toBeFocused();
  expect((await zarazCalls(page)).at(-1)).toBe('setAll:false');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('au_consent') ?? '{}').ads)).toBe(false);
});

test('events: a sent form reports form_submit to Zaraz (which applies the consent)', async ({ page }) => {
  await page.addInitScript(ZARAZ_STUB);
  await stubTurnstile(page);
  await page.route('**/api/contacto', (route) => route.fulfill({ json: { ok: true } }));
  await page.goto('/contacto/');
  await page.locator('#cookie-consent').getByRole('button', { name: 'Rechazar' }).click();
  await page.locator('#f-name').fill('Ana Pérez');
  await page.locator('#f-email').fill('ana@empresa.com');
  await page.locator('#f-type').selectOption('sitio_web');
  await page.locator('#f-message').fill('Quiero un sitio.');
  await page.locator('#f-consent').check();
  await page.locator('#contact-form button[type=submit]').click();
  await expect(page.locator('#form-status')).toContainText('Recibimos tu mensaje');
  expect(await zarazCalls(page)).toContain('track:form_submit');
});

test('social links and the checklist: real profiles, YouTube waits for its link, the PDF downloads', async ({ page, request }) => {
  await page.goto('/recursos/');
  const footer = page.locator('.site-footer .social');
  await expect(footer.getByRole('link', { name: 'AuraNova en Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/auranova.mx/');
  await expect(footer.getByRole('link', { name: 'AuraNova en Facebook' })).toHaveAttribute('href', /facebook\.com\/profile\.php\?id=61595699520565/);
  // No channel yet: a dimmed placeholder in previews (production builds leave it out), never a dead link.
  await expect(footer.getByRole('img', { name: 'YouTube (próximamente)' })).toBeVisible();
  await expect(footer.getByRole('link', { name: /YouTube/ })).toHaveCount(0);

  const download = page.getByRole('link', { name: 'Descargar la lista (PDF)' });
  const href = await download.getAttribute('href');
  const pdf = await request.get(href!);
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
