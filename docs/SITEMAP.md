# Sitemap and navigation

*v3 · 2026-10-19, after the CP1 feedback: a short home, one page per service, the city only on Nosotros, English on hold. Page briefs are in `docs/pages/`.*

## Tree (Spanish, `es-MX`)

| URL | Page | Status |
|---|---|---|
| `/` | Inicio: hero (animated "tu sitio trabaja para ti") · qué hacemos · cómo lo hacemos + CTA | built |
| `/servicios/` | Servicios: hero + mosaic · one row per service · "ayúdame a elegir" chat · tools · process · price + CTA | built |
| `/servicios/sitios-web/` | Sitios web (nuevos, rediseños, tiendas) | built |
| `/servicios/plataformas-a-la-medida/` | Plataformas a la medida | built |
| `/servicios/posicionamiento-en-google/` | Posicionamiento en Google (SEO y analítica) | built |
| `/servicios/contenido-y-marca/` | Contenido y marca (textos, imágenes, video, identidad) | built |
| `/servicios/mantenimiento-web/` | Mantenimiento y soporte | built |
| `/servicios/asesoria-digital/` | Asesoría digital | built |
| `/como-trabajamos/` | Cómo trabajamos: statement · scroll roadmap (call + 4 stages) · así te cuidamos · contract summary · FAQ + CTA | built |
| `/proyectos/` | Proyectos (Vista Consulting) | built |
| `/nosotros/` | Nosotros: **the only page that names the city** | built |
| `/contacto/` | Contacto (form interface; delivery in Phase 2) | built |
| `/estandar/`, `/recursos/`, `/aviso-de-privacidad/`, `/terminos/` | Footer pages | Phase 2 |
| 404 | Recovery page | built |
| `/opciones/` | **Preview only** (CP1.2): hero-animation and illustration options side by side (Q34, Q35). Never built in production; excluded from the sitemap; noindex like every preview | built (preview) |

English (`/en/…`) is on hold (Q4, ADR-007); the routes stay reserved. `/blog` stays reserved (Q22).

**URL rules:** lowercase slugs without accents; a trailing slash on every page; one canonical per page; sitemap.xml at build.

## Primary nav

Logo · **Servicios ▾** · Cómo trabajamos · Proyectos · Nosotros · **[Agenda una llamada]**

- **Servicios ▾** opens a panel with the 6 service pages (icon + name + one line) and "Ver todos los servicios". It's a disclosure button: click or Enter opens it; Esc, clicking outside or tabbing away closes it.
- Below 1024 px everything moves into the menu sheet, where Servicios is an expandable group.
- "Agenda una llamada" goes to Cal.com once the link exists (ADR-004); until then it goes to `/contacto/#agenda`.

## Footer (every page)

| Sitio | Confianza | Contacto |
|---|---|---|
| Inicio · Servicios · Cómo trabajamos · Proyectos · Nosotros · Contacto | Nuestro estándar · Recursos · Aviso de privacidad · Términos de uso | Business email (Q15) · **lunes a viernes, de 9:00 a 17:00 (hora del centro)** ✅ |

The footer tagline has no city: "Sitios web, contenido y asesoría digital para pequeños y medianos negocios."

## Click depth

Every page is 1 click from home (nav or footer); each service is 1 click through the Servicios menu, or 2 through /servicios/.

## Structured data

- **Site-wide:** `ProfessionalService` (`areaServed` México, `openingHoursSpecification` Mo–Fr 09:00–17:00). Its invisible `address` keeps the city (Monterrey, N.L.) for local search, even though visible copy only names it on Nosotros.
- **Every service page + Cómo trabajamos:** `FAQPage`.
- **Every page except Inicio:** `BreadcrumbList`.
