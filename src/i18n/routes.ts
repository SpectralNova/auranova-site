import type { Lang } from '../content/business';

// Every page's URL in each language (SITEMAP.md). Slugs are translated; trailing slash always.
export const routes = {
  inicio: { es: '/', en: '/en/' },
  servicios: { es: '/servicios/', en: '/en/services/' },
  'servicios/sitios-web': { es: '/servicios/sitios-web/', en: '/en/services/websites/' },
  'servicios/plataformas-a-la-medida': { es: '/servicios/plataformas-a-la-medida/', en: '/en/services/custom-platforms/' },
  'servicios/posicionamiento-en-google': { es: '/servicios/posicionamiento-en-google/', en: '/en/services/seo/' },
  'servicios/contenido-y-marca': { es: '/servicios/contenido-y-marca/', en: '/en/services/content-and-brand/' },
  'servicios/mantenimiento-web': { es: '/servicios/mantenimiento-web/', en: '/en/services/website-maintenance/' },
  'servicios/asesoria-digital': { es: '/servicios/asesoria-digital/', en: '/en/services/digital-consulting/' },
  como: { es: '/como-trabajamos/', en: '/en/how-we-work/' },
  proyectos: { es: '/proyectos/', en: '/en/projects/' },
  'proyectos/vista-consulting': { es: '/proyectos/vista-consulting/', en: '/en/projects/vista-consulting/' },
  nosotros: { es: '/nosotros/', en: '/en/about/' },
  estandar: { es: '/estandar/', en: '/en/standard/' },
  recursos: { es: '/recursos/', en: '/en/resources/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
  aviso: { es: '/aviso-de-privacidad/', en: '/en/privacy/' },
  terminos: { es: '/terminos/', en: '/en/terms/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

// Pages that exist in each language. Drives the language link and hreflang, so they never point
// to a missing page. Add a key here when its page is built. (English on hold: Q4, Q26.)
export const built: Record<Lang, readonly RouteKey[]> = {
  es: [
    'inicio',
    'servicios',
    'servicios/sitios-web',
    'servicios/plataformas-a-la-medida',
    'servicios/posicionamiento-en-google',
    'servicios/contenido-y-marca',
    'servicios/mantenimiento-web',
    'servicios/asesoria-digital',
    'como',
    'proyectos',
    'nosotros',
    'contacto',
    'aviso',
  ],
  en: [],
};

export const href = (key: RouteKey, lang: Lang): string => routes[key][lang];
export const isBuilt = (key: RouteKey, lang: Lang): boolean => built[lang].includes(key);
