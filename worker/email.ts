// The form's two emails, sent with Resend from contacto@auranova.mx: the lead to the inbox, and the auto-reply
// to the visitor (template 1, «Respuesta del formulario», from AuraNova Documentos/00 Plantillas/Correos).
// Facts (response time, call length, booking link) come from business.ts, like the site's copy.
import type { Env } from './index.ts';
import { SERVICES, type Lead } from './lead.ts';
import type { SyncResult } from './hubspot.ts';
import { business, factValue, textFacts } from '../src/content/business.ts';

const RESEND = 'https://api.resend.com/emails';

interface Message {
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail(env: Pick<Env, 'RESEND_API_KEY' | 'MAIL_FROM'>, msg: Message): Promise<void> {
  const res = await fetch(RESEND, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.MAIL_FROM, to: msg.to, reply_to: msg.replyTo, subject: msg.subject, html: msg.html, text: msg.text }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

const esc = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
/** One line, no header tricks: for subjects. */
const oneLine = (s: string, max: number) => s.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

const fact = (key: keyof typeof textFacts) => factValue(textFacts[key], 'es') ?? '';
const BOOKING = factValue(business.bookingUrl, 'es') ?? '';

// Email-safe styles (tokens v1.3 as hex; brand fonts fall back to system faces, as in the signatures).
const BODY = "font-family:Montserrat,'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:24px;color:#191B1C;";
const MUTED = 'color:#595F61;';
const LINK = 'color:#5934FD;';

const page = (inner: string) =>
  `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>` +
  `<body style="margin:0;padding:24px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;">${inner}</table></body></html>`;

/* ---------- Lead → contacto@ ---------- */

export function leadEmail(lead: Lead, crm: SyncResult, portalId: string): Omit<Message, 'to' | 'replyTo'> {
  const service = SERVICES[lead.tipo];
  const campaign = [lead.utm.source, lead.utm.medium, lead.utm.campaign, lead.utm.content].filter(Boolean).join(' / ');
  const when = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Monterrey' }).format(new Date());
  const rows: [string, string][] = [
    ['Nombre', lead.nombre],
    ['Correo', lead.correo],
    ['Empresa', lead.empresa],
    ['Sitio actual', lead.sitio],
    ['¿Qué necesita?', service],
    ['Presupuesto', lead.presupuesto || 'Prefirió no decir'],
    ['Novedades por correo', lead.novedades ? 'Sí, aceptó recibirlas' : 'No'],
  ];
  const origin: [string, string][] = [
    ['Campaña', campaign],
    ['Página de llegada', lead.landing],
    ['Llegó desde', lead.referrer],
  ];
  const dealUrl = crm.dealId ? `https://app.hubspot.com/contacts/${portalId}/record/0-3/${crm.dealId}` : '';
  const crmText = crm.dealId
    ? `Registrado en HubSpot: contacto y trato en «Nuevo lead»${crm.noteError ? ' (sin nota)' : ''}.`
    : `No se pudo registrar en HubSpot (${crm.error ?? 'error desconocido'}). Agrégalo a mano.`;

  const table = (list: [string, string][]) =>
    list
      .filter(([, value]) => value)
      .map(([label, value]) => `<tr><td style="${BODY}${MUTED}padding:4px 16px 4px 0;vertical-align:top;white-space:nowrap;">${label}</td><td style="${BODY}padding:4px 0;">${esc(value)}</td></tr>`)
      .join('');
  const html = page(
    `<tr><td style="${BODY}"><p style="margin:0 0 16px;font-size:18px;font-weight:600;">Nuevo mensaje del formulario del sitio</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0">${table(rows)}</table>` +
      `<p style="margin:20px 0 6px;${MUTED}">Mensaje</p>` +
      `<div style="${BODY}white-space:pre-wrap;padding:12px 16px;background:#EDEFF0;border-radius:8px;">${esc(lead.mensaje)}</div>` +
      (origin.some(([, v]) => v) ? `<p style="margin:20px 0 6px;${MUTED}">Origen</p><table role="presentation" cellpadding="0" cellspacing="0" border="0">${table(origin)}</table>` : '') +
      `<p style="margin:20px 0 0;">${esc(crmText)}${dealUrl ? ` <a href="${dealUrl}" style="${LINK}">Abrir el trato</a>` : ''}</p>` +
      `<p style="margin:20px 0 0;${MUTED}font-size:13px;">Recibido el ${esc(when)}. Responde a este correo para contestarle directamente.</p></td></tr>`,
  );
  const text = [
    'Nuevo mensaje del formulario del sitio',
    '',
    ...rows.filter(([, v]) => v).map(([label, value]) => `${label}: ${value}`),
    '',
    'Mensaje:',
    lead.mensaje,
    '',
    ...origin.filter(([, v]) => v).map(([label, value]) => `${label}: ${value}`),
    '',
    crmText + (dealUrl ? ` ${dealUrl}` : ''),
    `Recibido el ${when}. Responde a este correo para contestarle directamente.`,
  ].join('\n');
  return { subject: oneLine(`Nuevo mensaje del sitio: ${lead.nombre}`, 120), html, text };
}

/* ---------- Auto-reply → visitor ---------- */

/** The greeting uses the first name only when it looks like one: the auto-reply goes to any address typed
 *  in the form, so it never repeats free text (no links or messages smuggled into our emails). */
function greeting(nombre: string): string {
  const first = nombre.split(/\s+/)[0] ?? '';
  return /^\p{L}[\p{L}\p{M}'’-]{0,29}$/u.test(first) ? `Hola, ${first}:` : 'Hola:';
}

export function autoReply(lead: Lead, siteOrigin: string): Omit<Message, 'to' | 'replyTo'> {
  const hello = greeting(lead.nombre);
  const p1 = `Gracias por escribirnos. Recibimos tu mensaje y te respondemos en ${fact('respuesta')} (de lunes a viernes, de 9:00 a 17:00, hora del centro).`;
  const p2 = `Si prefieres platicarlo de una vez, agenda una llamada de ${fact('duracionLlamada')}, sin costo:`;
  const html = page(
    `<tr><td style="${BODY}"><p style="margin:0 0 16px;">${esc(hello)}</p><p style="margin:0 0 16px;">${esc(p1)}</p>` +
      `<p style="margin:0 0 16px;">${esc(p2)}<br><a href="${esc(BOOKING)}" style="${LINK}">${esc(BOOKING.replace(/^https:\/\//, ''))}</a></p>` +
      `<p style="margin:0 0 24px;">Saludos,</p></td></tr>` +
      `<tr><td>${signature(`${siteOrigin}/firma/`)}</td></tr>`,
  );
  const text = [hello, '', p1, '', p2, BOOKING, '', 'Saludos,', '', 'AuraNova · Contacto', 'contacto@auranova.mx'].join('\n');
  return { subject: 'Recibimos tu mensaje', html, text };
}

/** The «Contacto» signature, light version (brand/firmas/firma-contacto-clara.html), with its images served
 *  by this same site (public/firma/). */
const signature = (base: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="424" style="border-collapse:separate;"><tr><td style="padding:8px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="424" style="border-collapse:collapse;"><tr><td valign="middle" width="168" style="width:168px;padding:0 20px 0 0;white-space:nowrap;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td valign="middle" style="padding:0 10px 0 0;"><img src="${base}auranova-firma-mark.png" width="40" height="40" alt="" style="display:block;border:0;width:40px;height:40px;"></td><td valign="middle" style="font-family:'Roboto Condensed','Arial Narrow','HelveticaNeue-CondensedBold','Helvetica Neue',Arial,sans-serif;font-size:22px;line-height:24px;font-weight:800;letter-spacing:-0.2px;color:#191B1C;white-space:nowrap;">AuraNova</td></tr></table></td><td valign="middle" width="2" style="width:2px;padding:0;"><img src="${base}firma-vertical.png" width="2" height="56" alt="" style="display:block;border:0;width:2px;height:56px;"></td><td valign="middle" style="padding:0 0 0 20px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td style="font-family:'Roboto Condensed','Arial Narrow','HelveticaNeue-CondensedBold','Helvetica Neue',Arial,sans-serif;font-size:19px;line-height:23px;font-weight:800;color:#191B1C;">Contacto</td></tr><tr><td style="padding:8px 0 0 0;font-family:Montserrat,'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;"><a href="mailto:contacto@auranova.mx" style="color:#5934FD;text-decoration:none;">contacto@auranova.mx</a></td></tr></table></td></tr><tr><td colspan="3" style="padding:16px 0 0 0;font-size:0;line-height:0;">&nbsp;</td></tr><tr><td colspan="3" style="font-family:Montserrat,'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:11px;line-height:16px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#595F61;"><span style="color:#5934FD;font-size:10px;">&#9679;</span>&nbsp; SOLUCIONES DIGITALES PARA TU NEGOCIO</td></tr></table></td></tr></table>`;
