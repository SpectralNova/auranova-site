// A contact-form lead: its fields and the server-side checks (the browser's checks are never trusted).

/** «¿Qué necesitas?» options: value → label. Same values as HubSpot's `servicio_de_interes` and the form
 *  (src/content/pages/es/contacto.yaml; the page fails its build if they drift apart). */
export const SERVICES = {
  sitio_web: 'Sitio web nuevo, rediseño o tienda',
  plataforma: 'Plataforma a la medida',
  posicionamiento: 'Posicionamiento en Google',
  contenido_marca: 'Contenido y marca',
  mantenimiento: 'Mantenimiento y soporte',
  asesoria: 'Asesoría digital',
  no_seguro: 'No estoy seguro',
} as const;
export type Service = keyof typeof SERVICES;

/** Which form sent it: the contact form, or a free diagnosis request (the ads' offer; archive DEC-0005).
 *  A diagnosis is always about the visitor's current site, so it is filed under «Asesoría digital». */
export type Kind = 'contacto' | 'diagnostico';
export const DIAGNOSIS = 'Diagnóstico gratis';

export const serviceLabel = (lead: Lead) => (lead.kind === 'diagnostico' ? `${DIAGNOSIS} (Asesoría digital)` : SERVICES[lead.tipo]);

export interface Lead {
  kind: Kind;
  nombre: string;
  correo: string;
  empresa: string;
  sitio: string;
  tipo: Service;
  presupuesto: string;
  mensaje: string;
  novedades: boolean;
  utm: { source: string; medium: string; campaign: string; content: string };
  landing: string;
  referrer: string;
}

const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
/** A website address, with or without https://: a host with a dot, then an optional path. */
const WEBSITE = /^(https?:\/\/)?[^\s/@]+\.[^\s/@]{2,}(\/\S*)?$/i;

/** Reads and checks the form. `invalid` lists the fields to fix, by name, in the form's order. */
export function parseLead(form: FormData, kind: Kind = 'contacto'): { lead: Lead; invalid: string[] } {
  const field = (name: string, max: number) => String(form.get(name) ?? '').trim().slice(0, max);
  const diagnosis = kind === 'diagnostico';
  const lead: Lead = {
    kind,
    nombre: field('nombre', 100),
    correo: field('correo', 254).toLowerCase(),
    empresa: field('empresa', 120),
    sitio: field('sitio', 200),
    // The diagnosis form doesn't ask what they need or their budget.
    tipo: (diagnosis ? 'asesoria' : field('tipo', 40)) as Service,
    presupuesto: diagnosis ? '' : field('presupuesto', 40),
    mensaje: field('mensaje', 5000),
    novedades: form.get('novedades') === 'on',
    utm: {
      source: field('utm_source', 120),
      medium: field('utm_medium', 120),
      campaign: field('utm_campaign', 200),
      content: field('utm_content', 200),
    },
    landing: field('landing', 300),
    referrer: field('referrer', 300),
  };
  const invalid: string[] = [];
  if (!lead.nombre) invalid.push('nombre');
  if (!EMAIL.test(lead.correo)) invalid.push('correo');
  if (diagnosis) {
    // One diagnosis per business, and there must be a site to review.
    if (!lead.empresa) invalid.push('empresa');
    if (!WEBSITE.test(lead.sitio)) invalid.push('sitio');
  } else if (!Object.hasOwn(SERVICES, lead.tipo)) invalid.push('tipo');
  if (!lead.mensaje) invalid.push('mensaje');
  if (form.get('consentimiento') !== 'on') invalid.push('consentimiento');
  return { lead, invalid };
}
