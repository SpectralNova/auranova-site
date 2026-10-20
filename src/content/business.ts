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
  legalName: ok('David Contreras Morales'),
  domicilio: pending({ es: 'domicilio para el aviso de privacidad (Q2)', en: 'address for the privacy notice (Q2)' }),

  siteUrl: ok('https://auranova.mx'), // Q19 approved; not bought yet
  // The city appears only on Nosotros (David, CP1 feedback 2026-10-19).
  city: ok({ es: 'Monterrey, N.L.', en: 'Monterrey, Mexico' }),
  areaServed: ok(['México']), // Q3; US on hold (Q4)
  languages: ok(['es']), // English on hold (Q4, Q26)
  timezone: ok('America/Monterrey'),
  hours: ok({ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' }),

  email: pending({ es: 'correo del negocio, tras comprar el dominio (Q15)', en: 'business email, after the domain purchase (Q15)' }),
  bookingUrl: pending({ es: 'liga de Cal.com (Q16)', en: 'Cal.com link (Q16)' }),
};

// Facts that copy can use as {{key}} (see src/content/README.md).
export const textFacts = {
  horario: ok({
    es: 'de lunes a viernes, de 9:00 a 17:00 (hora del centro)',
    en: 'Monday to Friday, 9 a.m. to 5 p.m. Monterrey time (UTC−6)',
  }),
  horarioCorto: ok({ es: 'Lunes a viernes · 9:00 a 17:00', en: 'Mon–Fri · 9 a.m.–5 p.m. (UTC−6)' }),
  respuesta: ok({ es: '1 día hábil', en: '1 business day' }), // Q8
  respuestaCliente: ok({ es: '3 días hábiles', en: '3 business days' }), // Q8
  duracionLlamada: ok({ es: '30 minutos', en: '30 minutes' }), // Q16 ✅ (David, 2026-10-20)
  pagos: ok({
    es: '40% para apartar tu fecha, 30% al aprobar el diseño y 30% antes del lanzamiento',
    en: '40% to book your start date, 30% at design approval and 30% before launch',
  }), // Q7
  moneda: ok({ es: 'pesos mexicanos más IVA', en: '[[PENDIENTE: currency and taxes for US clients (Q27)]]' }), // Q7
  garantia: ok({ es: '30 días', en: '30 days' }), // Q11
  correo: business.email,
  ciudad: business.city,
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
