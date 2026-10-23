// The site's lead forms (ADR-003, ADR-019): accessible validation, then the Worker at the form's `action`
// (/api/contacto or /api/diagnostico). Turnstile (anti-spam) loads on the first interaction with the form,
// never on page load. Everything is scoped to one <form>, so a page could hold more than one.
//
// The form needs: data-* messages (error-summary, sending, sent, verify, challenge, failed), data-sitekey,
// data-form (the event's name for Zaraz), a `.form__status` live region and a `.form__turnstile` slot.
// Required fields show `#<id>-err` when invalid.
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
interface Turnstile {
  render(el: HTMLElement, options: object): string;
  reset(id: string): void;
}

export function initLeadForm(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('.form__status');
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]');
  if (!status || !submit) return;
  const msg = form.dataset;
  const fields = Array.from(form.querySelectorAll<Field>('[required]'));
  const showError = (field: Field, valid = field.checkValidity()) => {
    const err = document.getElementById(`${field.id}-err`);
    field.setAttribute('aria-invalid', String(!valid));
    if (err) {
      err.hidden = valid;
      err.textContent = valid ? '' : (err.dataset.msg ?? '');
    }
    return valid;
  };
  fields.forEach((field) => field.addEventListener('blur', () => field.getAttribute('aria-invalid') && showError(field)));

  // Hidden fields: when the form appeared, and the visit's origin saved by the layout on its first page.
  const setHidden = (name: string, value: string) => {
    const input = form.elements.namedItem(name);
    if (input instanceof HTMLInputElement) input.value = value;
  };
  const fillHidden = () => {
    setHidden('t', String(Date.now()));
    let origin: Record<string, string> = {};
    try {
      origin = JSON.parse(sessionStorage.getItem('au_origin') ?? '{}');
    } catch {}
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'landing', 'referrer']) setHidden(name, origin[name] ?? '');
  };
  fillHidden();

  // Turnstile: one token per send. `waiting` resolves the next token, or '' on error or timeout. Usually it
  // checks silently; when it needs the visitor (interactive), it shows its checkbox and the send waits for it.
  const slot = form.querySelector<HTMLElement>('.form__turnstile');
  let widget: string | undefined;
  let token = '';
  let interactive = false;
  let waiting: ((value: string) => void)[] = [];
  const settle = (value: string) => {
    token = value;
    waiting.forEach((resolve) => resolve(value));
    waiting = [];
  };
  const turnstile = () => (window as unknown as { turnstile?: Turnstile }).turnstile;
  let loading = false;
  const loadTurnstile = () => {
    if (loading || !slot) return;
    loading = true;
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.addEventListener('load', () => {
      widget = turnstile()?.render(slot, {
        sitekey: msg.sitekey,
        language: 'es',
        theme: 'light',
        size: 'flexible',
        appearance: 'interaction-only',
        callback: settle,
        'expired-callback': () => (token = ''),
        'error-callback': () => settle(''),
        'before-interactive-callback': () => {
          interactive = true;
          if (waiting.length) status.textContent = msg.verify ?? '';
        },
        'after-interactive-callback': () => (interactive = false),
      });
    });
    script.addEventListener('error', () => settle(''));
    document.head.append(script);
  };
  form.addEventListener('focusin', loadTurnstile, { once: true });
  form.addEventListener('pointerdown', loadTurnstile, { once: true });
  // Gives up after 20 s of silent checking, or after 3 minutes while the visitor is asked to tick the box.
  const getToken = () =>
    token
      ? Promise.resolve(token)
      : new Promise<string>((resolve) => {
          const started = Date.now();
          const timer = setInterval(() => {
            if (Date.now() - started > (interactive ? 180000 : 20000)) done('');
          }, 1000);
          const done = (value: string) => {
            clearInterval(timer);
            resolve(value);
          };
          waiting.push(done);
          if (interactive) status.textContent = msg.verify ?? '';
          loadTurnstile();
        });

  const say = (text = '') => {
    status.textContent = text;
    status.focus();
  };
  const busy = (on: boolean) => {
    form.setAttribute('aria-busy', String(on));
    submit.textContent = on ? (msg.sending ?? '') : (submit.dataset.label ?? '');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return; // one send at a time
    const invalid = fields.filter((field) => !showError(field));
    if (invalid.length) {
      status.textContent = msg.errorSummary ?? '';
      invalid[0].focus();
      return;
    }
    busy(true);
    status.textContent = msg.sending ?? '';
    try {
      const pass = await getToken();
      if (!pass) return say(msg.challenge);
      status.textContent = msg.sending ?? '';
      const data = new FormData(form);
      data.set('cf-turnstile-response', pass);
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
      if (res.ok && body.ok) {
        // Meta «Lead» through Zaraz, only with consent (Layout); no form data goes with it, only which form.
        (window as unknown as { auTrack?: (name: string, props: object) => void }).auTrack?.('form_submit', { form: msg.form ?? 'contacto' });
        form.reset();
        fields.forEach((field) => field.removeAttribute('aria-invalid'));
        fillHidden();
        return say(msg.sent);
      }
      if (body.error === 'invalid' && body.fields?.length) {
        // The server disagreed with the browser: mark its fields the same way.
        const marked = body.fields.map((name) => form.elements.namedItem(name)).filter((el): el is Field => fields.includes(el as Field));
        marked.forEach((field) => showError(field, false));
        status.textContent = msg.errorSummary ?? '';
        return marked[0]?.focus();
      }
      say(body.error === 'challenge' ? msg.challenge : msg.failed);
    } catch {
      say(msg.failed);
    } finally {
      // Tokens are single-use: get a fresh one for the next send.
      token = '';
      if (widget !== undefined) turnstile()?.reset(widget);
      busy(false);
    }
  });
}
