# Page brief · Servicio (template, `/servicios/{slug}`)

*v2 · 2026-10-19: six services (CP1 feedback: "report all of the things you can help me do"). Content: `src/content/services/es/*.yaml`.*

| | |
|---|---|
| **Goal** | Convince an owner that this service solves their problem, show everything it covers, and get them to book. |
| **Audience** | A small or mid-sized business owner with one specific need. |
| **Primary CTA** | **Agenda una llamada** (hero, price, final band). |
| **Success metric** | `cta_click` (location = servicio-{slug}) ÷ page sessions. |
| **SEO** | One keyword per page, no city (title + H1). `FAQPage` + `BreadcrumbList`. |
| **Blanks** | Each page's "Qué incluye" lists are 🟡 until David confirms the scope (Q31). Maintenance plans 🔴 (Q11). |

## Outline (themes alternate automatically; optional sections skip cleanly)

1. **Hero** (dark): eyebrow · H1 with the outcome · lead · CTA · the service's 3D illustration (floating)
2. **Lo que hacemos**: every capability as an icon tile (6–9 per service), + an optional note (e.g., "no prometemos el primer lugar")
3. **Qué incluye**: Incluye / Tú aportas / No incluye (mini Anexo A) with a `[[CONFIRMAR]]`
4. **Herramientas** (optional): the tools this service uses (Simple Icons)
5. **Proceso**: 4 compact steps → /como-trabajamos
6. **Prueba** (optional): Vista Consulting case with measured scores
7. **Precio**: fixed price, written quote, priced for a small business, 40/30/30 MXN + IVA (shared copy)
8. **Preguntas frecuentes**: 3–5
9. **CTA** (violet)

## The six pages

| Slug | H1 | Capabilities (summary) | Tools | Proof |
|---|---|---|---|---|
| `sitios-web` | Sitios web hechos para **que te contacten** | Informative sites, landing pages, stores/catalogs (WooCommerce), redesigns + migrations, forms and booking, custom design, speed, easy editing, accessibility | Astro, Next.js, WordPress, WooCommerce, Cloudflare | Vista |
| `plataformas-a-la-medida` | Portales y sistemas **hechos para tu forma de trabajar** | Portals with accounts, admin panels, roles and permissions, bookings, automations, integrations, dashboards, security | Next.js, Render, Cloudflare, GitHub, Cal.com | — |
| `posicionamiento-en-google` | Que tus clientes **te encuentren en Google** | Technical SEO, Google Business Profile, speed, Search Console, analytics, SEO audit, plain reports; note: no ranking promises | Search Console, Analytics, Google, Cloudflare | — |
| `contenido-y-marca` | Contenido que **habla por tu negocio** | Copywriting, AI images, video and reels, subtitles, thumbnails, visual identity, presentations | — | — |
| `mantenimiento-web` | Tu sitio, **siempre al día** | Updates and security, backups, changes, domain and hosting, business email, monitoring, migrations, support; plans 🔴 Q11 | Cloudflare, WordPress, GitHub | — |
| `asesoria-digital` | Decisiones digitales **sin gastar de más** | Site audit, digital plan, choosing tools, competitor analysis (ads + content), reviewing other quotes, ongoing advice | — | — |
