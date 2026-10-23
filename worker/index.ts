// The site's Worker (ADR-002, ADR-003, ADR-019). Static pages are served by Cloudflare's assets layer and never
// reach this code: wrangler.jsonc runs it first only for /api/*. Two endpoints, one pipeline:
//
// POST /api/contacto     the contact form
// POST /api/diagnostico  a free diagnosis request (/diagnostico-gratis/, archive DEC-0005)
//   → checks (origin, size, honeypot, fill time, fields, Turnstile) → HubSpot (contact + deal in «Nuevo lead»
//   + note) → lead email to contacto@ → auto-reply to the visitor (after responding).
// Secrets live only in Cloudflare (Settings → Variables and Secrets): TURNSTILE_SECRET_KEY, RESEND_API_KEY,
// HUBSPOT_SERVICE_KEY. Nothing is stored here: the lead lives in the inbox and in HubSpot.
import { parseLead, type Kind } from './lead.ts';
import { syncLead, type SyncResult } from './hubspot.ts';
import { autoReply, leadEmail, sendEmail } from './email.ts';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Where leads go, who sends the emails and the HubSpot account for record links (wrangler.jsonc vars). */
  LEAD_TO: string;
  MAIL_FROM: string;
  HUBSPOT_PORTAL_ID: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  HUBSPOT_SERVICE_KEY?: string;
}

interface Ctx {
  waitUntil(promise: Promise<unknown>): void;
}

const MAX_BODY = 32 * 1024;
const MIN_FILL_MS = 3000;
const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
/** Each form's endpoint, and where a post without JavaScript is sent back to. */
const FORMS: Record<string, { kind: Kind; page: string }> = {
  '/api/contacto': { kind: 'contacto', page: '/contacto/#escribenos' },
  '/api/diagnostico': { kind: 'diagnostico', page: '/diagnostico-gratis/#solicitalo' },
};

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const { pathname } = new URL(request.url);
    const form = FORMS[pathname.replace(/\/$/, '')];
    if (form) return submit(request, env, ctx, form.kind, form.page);
    if (pathname.startsWith('/api/')) return json({ ok: false, error: 'not_found' }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function submit(request: Request, env: Env, ctx: Ctx, kind: Kind, page: string): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405, { Allow: 'POST' });

  // The form sends with JavaScript (Turnstile needs it). A plain post, without JavaScript, goes back to the
  // form, whose <noscript> note offers the email instead.
  if (!(request.headers.get('Accept') ?? '').includes('application/json')) {
    return Response.redirect(new URL(page, request.url).href, 303);
  }

  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, error: 'origin' }, 403);
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY) return json({ ok: false, error: 'too_large' }, 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'invalid', fields: [] }, 400);
  }

  // Bots: a filled honeypot or a form sent faster than a person can type get a quiet "ok" and nothing else.
  // A missing `t` counts as a bot too (the page's script always sets it; Number(null) would be 0, i.e. 1970).
  const elapsed = Date.now() - Number(form.get('t') || NaN);
  if (String(form.get('sitio_web_2') ?? '').trim() || !(elapsed >= MIN_FILL_MS)) return json({ ok: true });

  const { lead, invalid } = parseLead(form, kind);
  if (invalid.length) return json({ ok: false, error: 'invalid', fields: invalid }, 400);

  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.HUBSPOT_SERVICE_KEY) {
    // Names only, never values: Workers Logs then says exactly which secret to add.
    const missing = (['TURNSTILE_SECRET_KEY', 'RESEND_API_KEY', 'HUBSPOT_SERVICE_KEY'] as const).filter((name) => !env[name]);
    console.error(`${kind}: missing secrets: ${missing.join(', ')}`);
    return json({ ok: false, error: 'config' }, 503);
  }

  const token = String(form.get('cf-turnstile-response') ?? '').slice(0, 4096);
  if (!(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, request))) return json({ ok: false, error: 'challenge' }, 403);

  // HubSpot first, so the lead email can link to the deal (or say it must be added by hand).
  let crm: SyncResult;
  try {
    crm = await syncLead(lead, env.HUBSPOT_SERVICE_KEY);
  } catch (error) {
    console.error(`${kind}: HubSpot sync failed`, error);
    crm = { error: error instanceof Error ? error.message : String(error) };
  }

  let mailed = true;
  try {
    await sendEmail(env, { to: [env.LEAD_TO], replyTo: lead.correo, ...leadEmail(lead, crm, env.HUBSPOT_PORTAL_ID) });
  } catch (error) {
    mailed = false;
    console.error(`${kind}: lead email failed`, error);
  }
  // The lead is safe if it reached the inbox or HubSpot; only when both failed does the visitor try again.
  if (!mailed && !crm.dealId) return json({ ok: false, error: 'delivery' }, 502);

  ctx.waitUntil(
    sendEmail(env, { to: [lead.correo], replyTo: env.LEAD_TO, ...autoReply(lead, new URL(request.url).origin) }).catch((error) =>
      console.error(`${kind}: auto-reply failed`, error),
    ),
  );
  return json({ ok: true });
}

async function verifyTurnstile(secret: string, token: string, request: Request): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body, signal: AbortSignal.timeout(8000) });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) console.warn('contacto: Turnstile rejected', data['error-codes']);
    return data.success === true;
  } catch (error) {
    console.error('contacto: Turnstile unreachable', error);
    return false;
  }
}

function json(body: object, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
}
