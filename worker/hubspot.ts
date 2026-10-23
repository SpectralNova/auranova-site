// Writes a form lead to HubSpot Free with the CRM API (ADR-003, update 2): the contact by email (updated if it
// exists), a deal in «Pipeline de ventas» → «Nuevo lead», and the message as a note on both. Authenticated by
// the service key (scopes: contacts and deals, read and write).
import { DIAGNOSIS, serviceLabel, type Lead } from './lead.ts';

const API = 'https://api.hubapi.com';
const PIPELINE = 'default'; // «Pipeline de ventas»
const STAGE_NEW_LEAD = '1464204206'; // «Nuevo lead»
// HubSpot-defined association types: deal → contact, note → contact, note → deal.
const DEAL_TO_CONTACT = 3;
const NOTE_TO_CONTACT = 202;
const NOTE_TO_DEAL = 214;

export interface SyncResult {
  contactId?: string;
  dealId?: string;
  /** The note is extra (the deal's description already has the message), so its failure is only reported. */
  noteError?: string;
  error?: string;
}

class HubSpotError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function hubspot(key: string, method: string, path: string, body?: object): Promise<{ id: string }> {
  const res = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) {
    // Errors reach Workers Logs: the visitor's email (in the contact's URL) never does.
    const where = path.split('?')[0].replace(/\/contacts\/[^/]*%40[^/]*/, '/contacts/{correo}');
    throw new HubSpotError(res.status, `HubSpot ${res.status} on ${method} ${where}: ${data.message ?? res.statusText}`);
  }
  return { id: String(data.id) };
}

const assoc = (id: string, typeId: number) => ({ to: { id }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: typeId }] });

/** Only the fields the visitor filled: an empty field never erases what HubSpot already knows. */
function contactProperties(lead: Lead): Record<string, string> {
  const [firstname, ...rest] = lead.nombre.split(/\s+/);
  const website = lead.sitio && !/^https?:\/\//i.test(lead.sitio) ? `https://${lead.sitio}` : lead.sitio;
  const props: Record<string, string> = {
    firstname,
    lastname: rest.join(' '),
    company: lead.empresa,
    website,
    servicio_de_interes: lead.tipo,
    presupuesto_aproximado: lead.presupuesto,
    message: lead.mensaje,
    utm_source: lead.utm.source,
    utm_medium: lead.utm.medium,
    utm_campaign: lead.utm.campaign,
    utm_content: lead.utm.content,
    // Secondary purpose (aviso §3.2): recorded only when the visitor ticks the box.
    acepta_novedades: lead.novedades ? 'true' : '',
  };
  return Object.fromEntries(Object.entries(props).filter(([, value]) => value));
}

async function upsertContact(key: string, lead: Lead): Promise<string> {
  const properties = contactProperties(lead);
  const byEmail = `/crm/v3/objects/contacts/${encodeURIComponent(lead.correo)}?idProperty=email`;
  try {
    return (await hubspot(key, 'PATCH', byEmail, { properties })).id;
  } catch (error) {
    if (!(error instanceof HubSpotError && error.status === 404)) throw error;
  }
  try {
    return (await hubspot(key, 'POST', '/crm/v3/objects/contacts', { properties: { email: lead.correo, ...properties } })).id;
  } catch (error) {
    // Created by a parallel submission in the meantime: update it instead.
    if (error instanceof HubSpotError && error.status === 409) return (await hubspot(key, 'PATCH', byEmail, { properties })).id;
    throw error;
  }
}

export async function syncLead(lead: Lead, key: string): Promise<SyncResult> {
  const service = serviceLabel(lead);
  const contactId = await upsertContact(key, lead);
  // A diagnosis is named after the business (one per business), so the month's requests are easy to count.
  const dealname = lead.kind === 'diagnostico' ? `${DIAGNOSIS} · ${lead.empresa}` : `${lead.nombre} · ${service}`;
  const deal = await hubspot(key, 'POST', '/crm/v3/objects/deals', {
    properties: {
      dealname: dealname.slice(0, 200),
      pipeline: PIPELINE,
      dealstage: STAGE_NEW_LEAD,
      description: lead.mensaje,
    },
    associations: [assoc(contactId, DEAL_TO_CONTACT)],
  });
  const result: SyncResult = { contactId, dealId: deal.id };
  try {
    await hubspot(key, 'POST', '/crm/v3/objects/notes', {
      properties: { hs_timestamp: new Date().toISOString(), hs_note_body: noteBody(lead, service) },
      associations: [assoc(contactId, NOTE_TO_CONTACT), assoc(deal.id, NOTE_TO_DEAL)],
    });
  } catch (error) {
    result.noteError = error instanceof Error ? error.message : String(error);
    console.warn('contacto: HubSpot note failed', result.noteError);
  }
  return result;
}

const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function noteBody(lead: Lead, service: string): string {
  const diagnosis = lead.kind === 'diagnostico';
  const rows = [
    ['Servicio', service],
    ['Presupuesto', diagnosis ? '' : lead.presupuesto || 'Prefirió no decir'],
    ['Empresa', lead.empresa],
    ['Sitio actual', lead.sitio],
    ['Novedades por correo', lead.novedades ? 'Sí, aceptó' : 'No'],
    ['Campaña', [lead.utm.source, lead.utm.medium, lead.utm.campaign, lead.utm.content].filter(Boolean).join(' / ')],
    ['Página de llegada', lead.landing],
  ].filter(([, value]) => value);
  return (
    `<p><strong>${diagnosis ? 'Solicitud de diagnóstico gratis' : 'Formulario del sitio'}</strong></p><p>${esc(lead.mensaje).replaceAll('\n', '<br>')}</p>` +
    `<p>${rows.map(([label, value]) => `<strong>${label}:</strong> ${esc(value)}`).join('<br>')}</p>`
  );
}
