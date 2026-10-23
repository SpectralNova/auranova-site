// Worker tests (npm run test:worker). Turnstile, HubSpot and Resend are mocked: nothing leaves this machine.
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import worker, { type Env } from './index.ts';

interface Call {
  url: string;
  method: string;
  body: any;
}
type Handler = (call: Call) => Response | undefined;

let calls: Call[] = [];
let handler: Handler = () => undefined;
const realFetch = globalThis.fetch;

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/** Happy-path answers from the three services; a test's handler can override any of them. */
function defaultResponse({ url, method }: Call): Response {
  if (url.includes('turnstile')) return json({ success: true });
  if (url.includes('api.resend.com')) return json({ id: 'email_1' });
  if (method === 'PATCH' && url.includes('/contacts/')) return json({ message: 'resource not found' }, 404);
  if (url.endsWith('/crm/v3/objects/contacts')) return json({ id: '101' }, 201);
  if (url.endsWith('/crm/v3/objects/deals')) return json({ id: '202' }, 201);
  if (url.endsWith('/crm/v3/objects/notes')) return json({ id: '303' }, 201);
  throw new Error(`unexpected fetch ${method} ${url}`);
}

beforeEach(() => {
  calls = [];
  handler = () => undefined;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const raw = init?.body;
    const body = raw instanceof URLSearchParams ? Object.fromEntries(raw) : typeof raw === 'string' ? JSON.parse(raw) : raw;
    const call = { url, method: init?.method ?? 'GET', body };
    calls.push(call);
    return handler(call) ?? defaultResponse(call);
  }) as typeof fetch;
  mock.method(console, 'error', () => {});
  mock.method(console, 'warn', () => {});
});
afterEach(() => {
  globalThis.fetch = realFetch;
  mock.restoreAll();
});

const env: Env = {
  ASSETS: { fetch: async () => new Response('static page') },
  LEAD_TO: 'contacto@auranova.mx',
  MAIL_FROM: 'AuraNova <contacto@auranova.mx>',
  HUBSPOT_PORTAL_ID: '52196836',
  TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
  RESEND_API_KEY: 're_test',
  HUBSPOT_SERVICE_KEY: 'test-key',
};

function form(overrides: Record<string, string | null> = {}): FormData {
  const fields: Record<string, string | null> = {
    nombre: 'Ana Pérez López',
    correo: 'Ana@Empresa.com',
    empresa: 'Pastelería Ana',
    sitio: 'pasteleriaana.mx',
    tipo: 'sitio_web',
    presupuesto: '$20,000 a $35,000',
    mensaje: 'Quiero rediseñar mi sitio.',
    consentimiento: 'on',
    novedades: 'on',
    sitio_web_2: '',
    t: String(Date.now() - 60_000),
    'cf-turnstile-response': 'XXXX.DUMMY.TOKEN.XXXX',
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: 'lanzamiento',
    utm_content: 'anuncio-a',
    landing: '/servicios/sitios-web/',
    referrer: 'https://l.facebook.com/',
    ...overrides,
  };
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) if (value !== null) data.set(key, value);
  return data;
}

async function send(body: FormData, headers: Record<string, string> = {}, e: Env = env, path = '/api/contacto') {
  const pending: Promise<unknown>[] = [];
  const request = new Request(`https://auranova.mx${path}`, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json', Origin: 'https://auranova.mx', ...headers },
  });
  const res = await worker.fetch(request, e, { waitUntil: (p) => pending.push(p) });
  await Promise.all(pending);
  return res;
}

const to = (call: Call) => call.body.to.join(',');
const emails = () => calls.filter((c) => c.url.includes('api.resend.com'));
const hubspotCalls = () => calls.filter((c) => c.url.includes('api.hubapi.com'));

describe('routing', () => {
  it('serves everything outside /api/ from the static assets', async () => {
    const res = await worker.fetch(new Request('https://auranova.mx/contacto/'), env, { waitUntil() {} });
    assert.equal(await res.text(), 'static page');
  });
  it('rejects anything but POST', async () => {
    const res = await worker.fetch(new Request('https://auranova.mx/api/contacto'), env, { waitUntil() {} });
    assert.equal(res.status, 405);
  });
  it('sends a post without JavaScript back to the form', async () => {
    const res = await send(form(), { Accept: 'text/html' });
    assert.equal(res.status, 303);
    assert.equal(res.headers.get('Location'), 'https://auranova.mx/contacto/#escribenos');
    assert.equal(calls.length, 0);
  });
});

describe('protection', () => {
  it('refuses posts from another site', async () => {
    const res = await send(form(), { Origin: 'https://evil.example' });
    assert.equal(res.status, 403);
    assert.equal(calls.length, 0);
  });
  it('quietly drops a filled honeypot', async () => {
    const res = await send(form({ sitio_web_2: 'https://spam.example' }));
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(calls.length, 0);
  });
  it('quietly drops a form sent in under 3 seconds', async () => {
    const res = await send(form({ t: String(Date.now() - 500) }));
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(calls.length, 0);
  });
  it('quietly drops a form posted without the page (no fill time)', async () => {
    const res = await send(form({ t: null }));
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(calls.length, 0);
  });
  it('refuses a failed Turnstile check before touching HubSpot or email', async () => {
    handler = (c) => (c.url.includes('turnstile') ? json({ success: false, 'error-codes': ['invalid-input-response'] }) : undefined);
    const res = await send(form());
    assert.equal(res.status, 403);
    assert.equal(hubspotCalls().length + emails().length, 0);
  });
  it('says so when the secrets are missing', async () => {
    const res = await send(form(), {}, { ...env, RESEND_API_KEY: undefined });
    assert.equal(res.status, 503);
  });
});

describe('validation', () => {
  it('names every field to fix', async () => {
    const res = await send(form({ correo: 'ana@', tipo: 'toString', mensaje: '  ', consentimiento: null }));
    assert.equal(res.status, 400);
    assert.deepEqual((await res.json()).fields, ['correo', 'tipo', 'mensaje', 'consentimiento']);
    assert.equal(calls.length, 0);
  });
});

describe('a valid lead', () => {
  it('creates the contact, the deal and the note, emails the lead and replies to the visitor', async () => {
    const res = await send(form());
    assert.deepEqual(await res.json(), { ok: true });

    const verify = calls.find((c) => c.url.includes('turnstile'))!;
    assert.equal(verify.body.response, 'XXXX.DUMMY.TOKEN.XXXX');

    const create = calls.find((c) => c.method === 'POST' && c.url.endsWith('/contacts'))!;
    assert.deepEqual(create.body.properties, {
      email: 'ana@empresa.com',
      firstname: 'Ana',
      lastname: 'Pérez López',
      company: 'Pastelería Ana',
      website: 'https://pasteleriaana.mx',
      servicio_de_interes: 'sitio_web',
      presupuesto_aproximado: '$20,000 a $35,000',
      message: 'Quiero rediseñar mi sitio.',
      utm_source: 'facebook',
      utm_medium: 'paid_social',
      utm_campaign: 'lanzamiento',
      utm_content: 'anuncio-a',
      acepta_novedades: 'true',
    });

    const deal = calls.find((c) => c.url.endsWith('/deals'))!;
    assert.equal(deal.body.properties.pipeline, 'default');
    assert.equal(deal.body.properties.dealstage, '1464204206');
    assert.equal(deal.body.properties.dealname, 'Ana Pérez López · Sitio web nuevo, rediseño o tienda');
    assert.deepEqual(deal.body.associations[0], { to: { id: '101' }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] });

    const note = calls.find((c) => c.url.endsWith('/notes'))!;
    assert.deepEqual(note.body.associations.map((a: any) => [a.to.id, a.types[0].associationTypeId]), [['101', 202], ['202', 214]]);

    const [lead, reply] = emails();
    assert.equal(to(lead), 'contacto@auranova.mx');
    assert.equal(lead.body.reply_to, 'ana@empresa.com');
    assert.equal(lead.body.subject, 'Nuevo mensaje del sitio: Ana Pérez López');
    assert.match(lead.body.html, /record\/0-3\/202/);
    assert.match(lead.body.text, /Campaña: facebook \/ paid_social \/ lanzamiento \/ anuncio-a/);

    assert.equal(to(reply), 'ana@empresa.com');
    assert.equal(reply.body.reply_to, 'contacto@auranova.mx');
    assert.equal(reply.body.subject, 'Recibimos tu mensaje');
    assert.match(reply.body.text, /^Hola, Ana:/);
    assert.match(reply.body.text, /1 día hábil/);
    assert.match(reply.body.text, /https:\/\/cal\.com\/auranova-cal\/llamada-inicial/);
    assert.match(reply.body.html, /https:\/\/auranova\.mx\/firma\/auranova-firma-mark\.png/);
  });

  it('updates a contact that already exists instead of creating it', async () => {
    handler = (c) => (c.method === 'PATCH' ? json({ id: '555' }) : undefined);
    await send(form({ novedades: null, utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '' }));
    assert.equal(calls.filter((c) => c.method === 'POST' && c.url.endsWith('/contacts')).length, 0);
    const patch = calls.find((c) => c.method === 'PATCH')!;
    assert.match(patch.url, /contacts\/ana%40empresa\.com\?idProperty=email$/);
    // Empty fields never erase what HubSpot already has (an earlier campaign, an earlier opt-in).
    assert.equal('utm_source' in patch.body.properties, false);
    assert.equal('acepta_novedades' in patch.body.properties, false);
  });

  it('still emails the lead when HubSpot is down, and says to add it by hand', async () => {
    handler = (c) => (c.url.includes('api.hubapi.com') ? json({ message: 'Internal error' }, 500) : undefined);
    const res = await send(form());
    assert.deepEqual(await res.json(), { ok: true });
    assert.match(emails()[0].body.text, /No se pudo registrar en HubSpot .*Agrégalo a mano/);
    // The error (which also reaches the logs) names no visitor email.
    assert.match(emails()[0].body.text, /contacts\/\{correo\}/);
    assert.doesNotMatch(emails()[0].body.text, /ana%40/);
  });

  it('keeps the lead when only the note fails', async () => {
    handler = (c) => (c.url.endsWith('/notes') ? json({ message: 'missing scope' }, 403) : undefined);
    const res = await send(form());
    assert.deepEqual(await res.json(), { ok: true });
    assert.match(emails()[0].body.text, /«Nuevo lead» \(sin nota\)/);
  });

  it('asks the visitor to try again only when both HubSpot and email failed', async () => {
    handler = (c) => (c.url.includes('turnstile') ? undefined : json({ message: 'down' }, 500));
    const res = await send(form());
    assert.equal(res.status, 502);
    assert.equal(emails().length, 1); // the lead email was tried; no auto-reply
  });
});

describe('a free diagnosis request (/api/diagnostico, archive DEC-0005)', () => {
  // The diagnosis form has no service or budget fields; its message is the visitor's goal.
  const diagnosis = (overrides: Record<string, string | null> = {}) =>
    form({ tipo: null, presupuesto: null, mensaje: 'Que me contacten más clientes.', ...overrides });
  const request = (overrides: Record<string, string | null> = {}, headers: Record<string, string> = {}) =>
    send(diagnosis(overrides), headers, env, '/api/diagnostico');

  it('needs the business and a website address to review', async () => {
    const res = await request({ empresa: ' ', sitio: 'no tengo' });
    assert.equal(res.status, 400);
    assert.deepEqual((await res.json()).fields, ['empresa', 'sitio']);
    assert.equal(calls.length, 0);
  });

  it('accepts an address with or without https://, and ignores a service sent anyway', async () => {
    for (const sitio of ['pasteleriaana.mx', 'https://www.pasteleriaana.mx/menu']) {
      calls = [];
      assert.deepEqual(await (await request({ sitio, tipo: 'plataforma', presupuesto: 'Más de $50,000' })).json(), { ok: true });
      const contact = calls.find((c) => c.method === 'POST' && c.url.endsWith('/contacts'))!;
      assert.equal(contact.body.properties.servicio_de_interes, 'asesoria');
      assert.equal('presupuesto_aproximado' in contact.body.properties, false);
    }
  });

  it('files it in HubSpot by business, tells David to confirm the slot, and replies without a booking link', async () => {
    const res = await request();
    assert.deepEqual(await res.json(), { ok: true });

    const deal = calls.find((c) => c.url.endsWith('/deals'))!;
    assert.equal(deal.body.properties.dealname, 'Diagnóstico gratis · Pastelería Ana');
    assert.equal(deal.body.properties.dealstage, '1464204206');
    const note = calls.find((c) => c.url.endsWith('/notes'))!;
    assert.match(note.body.properties.hs_note_body, /Solicitud de diagnóstico gratis/);
    assert.doesNotMatch(note.body.properties.hs_note_body, /Presupuesto/);

    const [lead, reply] = emails();
    assert.equal(lead.body.subject, 'Nueva solicitud de diagnóstico: Ana Pérez López');
    assert.match(lead.body.text, /Confírmale su lugar del mes \(hacemos 4 al mes\)/);
    assert.match(lead.body.text, /Objetivo:\nQue me contacten más clientes\./);
    assert.match(lead.body.text, /¿Qué necesita\?: Diagnóstico gratis \(Asesoría digital\)/);

    assert.equal(to(reply), 'ana@empresa.com');
    assert.equal(reply.body.subject, 'Recibimos tu solicitud de diagnóstico');
    assert.match(reply.body.text, /^Hola, Ana:/);
    assert.match(reply.body.text, /Hacemos 4 diagnósticos al mes/);
    assert.doesNotMatch(reply.body.text, /cal\.com/);
  });

  it('sends a post without JavaScript back to the diagnosis form', async () => {
    const res = await request({}, { Accept: 'text/html' });
    assert.equal(res.status, 303);
    assert.equal(res.headers.get('Location'), 'https://auranova.mx/diagnostico-gratis/#solicitalo');
  });
});

describe('what the visitor can put in our emails', () => {
  it('escapes the message in the lead email', async () => {
    await send(form({ mensaje: '<script>alert(1)</script>' }));
    assert.match(emails()[0].body.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.doesNotMatch(emails()[0].body.html, /<script>/);
  });
  it('never repeats free text in the auto-reply', async () => {
    await send(form({ nombre: 'www.spam.example Gana dinero ya' }));
    const reply = emails()[1];
    assert.match(reply.body.text, /^Hola:/);
    assert.doesNotMatch(reply.body.html + reply.body.text, /spam\.example|Gana dinero/);
  });
  it('keeps the subject on one line', async () => {
    await send(form({ nombre: 'Ana\r\nBcc: x@y.z' }));
    assert.doesNotMatch(emails()[0].body.subject, /[\r\n]/);
  });
});
