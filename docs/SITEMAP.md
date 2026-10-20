# Sitemap and navigation

*v2 · 2026-10-19, after the CP0 answers (bilingual per Q4; Proyectos kept per Q12; email-only contact per Q15). Page briefs with each page's content outline are in `docs/pages/`.*

## Tree

| Spanish (default, `es-MX`) | English (`en-US`, ADR-007) | Brief |
|---|---|---|
| `/` | `/en/` | pages/inicio.md |
| `/servicios` | `/en/services` | pages/servicios.md |
| `/servicios/sitios-web` | `/en/services/websites` | pages/servicio.md |
| `/servicios/plataformas-a-la-medida` | `/en/services/custom-platforms` | pages/servicio.md |
| `/servicios/mantenimiento-web` | `/en/services/website-maintenance` | pages/servicio.md |
| `/como-trabajamos` | `/en/how-we-work` | pages/como-trabajamos.md |
| `/proyectos` | `/en/projects` | pages/proyectos.md |
| `/proyectos/vista-consulting` | `/en/projects/vista-consulting` | pages/proyectos.md (LOGOS and FERREMAG added once published) |
| `/nosotros` | `/en/about` | pages/nosotros.md |
| `/estandar` | `/en/standard` | pages/estandar.md |
| `/recursos` | `/en/resources` | pages/recursos.md |
| `/contacto` | `/en/contact` | pages/contacto.md |
| `/aviso-de-privacidad` | `/en/privacy` | pages/aviso-de-privacidad.md |
| `/terminos` | `/en/terms` | pages/terminos.md |
| 404 (bilingual message) | — | pages/404.md |

Reserved, not built at launch: `/blog` (Q22).

**URL rules:** lowercase slugs without accents (`rediseno`, not `rediseño`); a trailing slash on every page URL (`/servicios/`); one canonical per page plus `hreflang` pairs (`es-MX`, `en-US`, `x-default` → Spanish); a sitemap.xml generated at build. No automatic redirect by browser language: the visitor picks with the language link.

## Primary nav (4 links + language + 1 CTA)

Logo (→ home) · **Servicios** · **Cómo trabajamos** · **Proyectos** · **Nosotros** · `EN` · **[Agenda una llamada]**

- English: Services · How we work · Projects · About · `ES` · **[Book a call]**.
- The language link goes to the same page in the other language. It's a plain link labeled with the language's name for screen readers ("English" / "Español"), not a dropdown.
- "Agenda una llamada" opens the Cal.com booking page (ADR-004). Until that account exists, it goes to `/contacto/#agenda`.
- The current page is marked with `aria-current="page"`.

## Footer (every page)

| Sitio | Confianza | Contacto |
|---|---|---|
| Inicio · Servicios · Cómo trabajamos · Proyectos · Nosotros · Contacto | Nuestro estándar · Recursos · Aviso de privacidad · Términos de uso | Business email (Q15, after the domain) · **Lunes a viernes, 9:00–17:00, hora de Monterrey (UTC−6)** ✅ |

Plus the logo, a one-line description, and © {año} AuraNova. No WhatsApp, phone, street address or social icons at launch (Q15).

## Click depth (non-negotiable #6: ≤ 3)

| Page | Clicks from home | Path |
|---|---|---|
| Servicios, Cómo trabajamos, Proyectos, Nosotros, Contacto | 1 | nav |
| Estándar, Recursos, Aviso, Términos | 1 | footer |
| Each service, each case study | 2 | Servicios / Proyectos → card |
| The other language's version of any page | +1 | language link |

## Structured data

- **Site-wide:** `ProfessionalService` (name, url, logo, `areaServed` Monterrey · México · United States, `openingHoursSpecification` Mo–Fr 09:00–17:00, `contactPoint` email once it exists, `availableLanguage` es, en).
- **Inicio + each service page:** `FAQPage`.
- **Every page except Inicio:** `BreadcrumbList`.
