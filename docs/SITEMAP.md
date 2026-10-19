# Sitemap and navigation

*CP0 proposal · 2026-10-19. Page briefs, with the content outline for each page, are in `docs/pages/`.*

## Tree

```
/                                  Inicio                     pages/inicio.md
├── /servicios                     Servicios                  pages/servicios.md
│   ├── /servicios/sitios-web                                 pages/servicio.md (template + per-service notes)
│   ├── /servicios/plataformas-a-la-medida
│   └── /servicios/mantenimiento-web          (slugs follow Q5)
├── /como-trabajamos               Cómo trabajamos            pages/como-trabajamos.md
├── /proyectos                     Proyectos                  pages/proyectos.md   (built only once ≥ 1 case is permitted, Q12)
│   └── /proyectos/{slug}
├── /nosotros                      Nosotros                   pages/nosotros.md
├── /estandar                      Nuestro estándar           pages/estandar.md
├── /recursos                      Recursos                   pages/recursos.md    (Q17)
├── /contacto                      Contacto                   pages/contacto.md
├── /aviso-de-privacidad           Aviso de privacidad        pages/aviso-de-privacidad.md
├── /terminos                      Términos de uso            pages/terminos.md
└── 404                                                       pages/404.md

Reserved, not built at launch: /blog (Q22) · /en/ (Q4)
```

**URL rules:** lowercase Spanish slugs without accents (`rediseno`, not `rediseño`); one canonical form per URL; a sitemap.xml generated at build.

## Primary nav (4 links + 1 CTA)

Logo (→ `/`) · **Servicios** · **Cómo trabajamos** · **Proyectos\*** · **Nosotros** · **[Agenda una llamada]**

\* Until a project is permitted (Q12), **Nuestro estándar** takes that slot: it's our strongest proof until then, and the nav never links to an empty page.

"Agenda una llamada" opens the booking page directly (ADR-004). The current page is marked with `aria-current="page"`.

## Footer (every page)

| Sitio | Confianza | Contacto |
|---|---|---|
| Inicio · Servicios · Cómo trabajamos · Proyectos* · Nosotros · Contacto | Nuestro estándar · Recursos · Aviso de privacidad · Términos de uso | Email + WhatsApp (Q15) · **Lunes a viernes, 9:00–17:00 (hora del centro de México)** ✅ |

Plus the logo, a one-line description, and © {año} AuraNova (legal name per Q2).

## Click depth (non-negotiable #6: ≤ 3)

| Page | Clicks from home | Path |
|---|---|---|
| Servicios, Cómo trabajamos, Nosotros, Proyectos / Estándar, Contacto | 1 | nav |
| Estándar (when Proyectos is in the nav), Recursos, Aviso, Términos | 1 | footer |
| Each service, each case study | 2 | Servicios / Proyectos → card |

## Structured data

- **Site-wide:** `ProfessionalService` (name, url, logo, `areaServed` Q3, `openingHoursSpecification` Mo–Fr 09:00–17:00, `contactPoint` Q15).
- **Inicio + each service page:** `FAQPage`.
- **Every page except Inicio:** `BreadcrumbList`.
