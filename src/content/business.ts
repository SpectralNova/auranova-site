// Single source of truth for business facts (ADR-006). David's answers land HERE first,
// then every page, the footer, JSON-LD and the auto-reply pick them up.
//
//   ok(value)             ✅ confirmed by David
//   confirm(value, ref)   🟡 proposed default: renders as [[CONFIRMAR: value]]
//   pending(question)     🔴 unknown: renders as [[PENDIENTE: question]]
//
// A production build fails while any [[CONFIRMAR / [[PENDIENTE marker is rendered (npm run check:pending).
// Log: docs/OPEN_QUESTIONS.md

export type Lang = 'es' | 'en';
export type Localized<T> = T | { es: T; en: T };

export type Fact<T = string> =
  | { status: 'ok'; value: Localized<T> }
  | { status: 'confirm'; value: Localized<T>; ref: string }
  | { status: 'pending'; question: Localized<string> };

export const ok = <T>(value: Localized<T>): Fact<T> => ({ status: 'ok', value });
export const confirm = <T>(value: Localized<T>, ref: string): Fact<T> => ({ status: 'confirm', value, ref });
export const pending = <T = string>(question: Localized<string>): Fact<T> => ({ status: 'pending', question });

export const business = {
  name: ok('AuraNova'),
  // Legal identity (Q2): shown only on legal pages; marketing pages speak as a company (Q13).
  legalForm: ok({ es: 'persona física', en: 'sole proprietor (persona física)' }),
  legalName: ok('David Rodrigo Contreras Morales'), // as on his Constancia de Situación Fiscal (David, 2026-10-21)
  // Q2 (David, 2026-10-21): the public notice uses a VIRTUAL OFFICE address; his fiscal/home address is never published.
  // Still open, and no longer rendered: David launches before hiring it (2026-10-24), so the notice shows the
  // location and the contact email for notifications until the address exists (ADR-021).
  domicilio: pending({ es: 'domicilio de la oficina virtual para el aviso de privacidad (Q2)', en: 'virtual office address for the privacy notice (Q2)' }),

  siteUrl: ok('https://auranova.mx'), // Q19; registered 2026-10-20 (Cloudflare Registrar)
  // The city: Nosotros (CP1 feedback 2026-10-19) and the footer's full location (David, 2026-10-20).
  city: ok({ es: 'Monterrey, N.L.', en: 'Monterrey, Mexico' }),
  location: ok({ es: 'Monterrey, Nuevo León, México', en: 'Monterrey, Nuevo León, Mexico' }),
  areaServed: ok(['México']), // Q3; US on hold (Q4)
  languages: ok(['es']), // English on hold (Q4, Q26)
  timezone: ok('America/Monterrey'),
  hours: ok({ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' }),

  email: ok('contacto@auranova.mx'), // Q15 ✅ Zoho Mail, set up 2026-10-20
  bookingUrl: ok('https://cal.com/auranova-cal/llamada-inicial'), // Q16 ✅ (David, 2026-10-20; synced to Zoho Calendar)

  // Social profiles (Q15, David, 2026-10-22): links only, no embeds or scripts (SocialLinks.astro).
  social: {
    instagram: ok('https://www.instagram.com/auranova.mx/'),
    facebook: ok('https://www.facebook.com/profile.php?id=61595699520565'),
    // The channel isn't set up yet: its icon shows in previews and stays out of production until the link exists.
    youtube: pending({ es: 'liga del canal de YouTube (Q15)', en: 'YouTube channel link (Q15)' }),
  },
};

// Facts that copy can use as {{key}} (see src/content/README.md).
export const textFacts = {
  horario: ok({
    es: 'de lunes a viernes, de 9:00 a 17:00 (hora del centro)',
    en: 'Monday to Friday, 9 a.m. to 5 p.m. Monterrey time (UTC−6)',
  }),
  horarioCorto: ok({ es: 'Lunes a viernes · 9:00 a 17:00', en: 'Mon–Fri · 9 a.m.–5 p.m. (UTC−6)' }),
  // Stands alone (footer), so no leading "de" (David, 2026-10-20).
  horarioPie: ok({
    es: 'Lunes a viernes de 9:00 a 17:00 (hora del centro)',
    en: 'Monday to Friday, 9 a.m. to 5 p.m. Monterrey time (UTC−6)',
  }),
  respuesta: ok({ es: '1 día hábil', en: '1 business day' }), // Q8
  respuestaCliente: ok({ es: '3 días hábiles', en: '3 business days' }), // Q8
  duracionLlamada: ok({ es: '30 minutos', en: '30 minutes' }), // Q16 ✅ (David, 2026-10-20)
  pagos: ok({
    es: '40% para apartar tu fecha, 30% al aprobar el diseño y 30% antes del lanzamiento',
    en: '40% to book your start date, 30% at design approval and 30% before launch',
  }), // Q7
  moneda: ok({ es: 'pesos mexicanos más IVA', en: '[[PENDIENTE: currency and taxes for US clients (Q27)]]' }), // Q7
  vigencia: ok({ es: '15 días', en: '15 days' }), // how long a quote is valid (David, 2026-10-21)
  garantia: ok({ es: '30 días hábiles', en: '30 business days' }), // Q11; business days (David, 2026-10-20)
  // Free diagnoses a month, the ads' offer (archive DEC-0005, David, 2026-10-23). Kept by hand: David confirms each slot.
  diagnosticosAlMes: ok('4'),
  correo: business.email,
  ciudad: business.city,
  ubicacion: business.location,
  // Legal pages only (Q2).
  nombreLegal: business.legalName,
  domicilio: business.domicilio,
} satisfies Record<string, Fact<string>>;

export type TextFactKey = keyof typeof textFacts;

/** Resolves a fact to display text; 🟡 and 🔴 facts come back as visible markers. */
export function factText(fact: Fact<string>, lang: Lang): string {
  const pick = <T>(v: Localized<T>): T =>
    typeof v === 'object' && v !== null && 'es' in v && 'en' in v ? (v as { es: T; en: T })[lang] : (v as T);
  if (fact.status === 'ok') return pick(fact.value);
  if (fact.status === 'confirm') return `[[CONFIRMAR: ${pick(fact.value)}]]`;
  return `[[PENDIENTE: ${pick(fact.question)}]]`;
}

/** The value of a confirmed fact, or undefined while it is 🟡/🔴 (for URLs and attributes). */
export function factValue<T>(fact: Fact<T>, lang: Lang): T | undefined {
  if (fact.status !== 'ok') return undefined;
  const v = fact.value as Localized<T>;
  return typeof v === 'object' && v !== null && 'es' in v && 'en' in v ? (v as { es: T; en: T })[lang] : (v as T);
}
