# Page brief · Servicio (template, `/servicios/{slug}`)

*v3 · 2026-10-20 (CP1.1 feedback: "dynamic, animated, TypeSomething-like; prioritize generations; make each one unique"). v2 · 2026-10-19: six services. Content: `src/content/services/es/*.yaml`.*

| | |
|---|---|
| **Goal** | Convince an owner that this service solves their problem, show everything it covers, and get them to book. |
| **Audience** | A small or mid-sized business owner with one specific need. |
| **Primary CTA** | **Agenda una llamada** (hero; closing line in the FAQ section). Secondary in the hero: *Ver qué incluye*. |
| **Success metric** | `cta_click` (location = servicio-{slug}) ÷ page sessions. |
| **SEO** | One keyword per page, no city (title + H1). `FAQPage` + `BreadcrumbList`. |
| **Blanks** | Each page's "Qué incluye" lists are 🟡 until David confirms the scope (Q31). Maintenance plans 🔴 (Q11). |

## Outline (themes alternate automatically; optional sections skip cleanly)

1. **Hero** (dark): the service's generated background (`bg/<art>.webp`, follows the pointer, recedes on scroll) · eyebrow · H1 with the outcome · lead · CTA + *Ver qué incluye*
2. **En acción** (light): the service's **signature demo**, a coded, pausable dark product window that grows into place on scroll (`ServiceDemo`): Sitios web, code → live preview → published · Plataformas, users, roles and a permissions drawer · Posicionamiento, an analyst's dashboard (KPIs counting, weekly chart, searches, Core Web Vitals; **"Datos de ejemplo"** + footnote) · Contenido, a reel in the editor (timeline, subtitles, covers, palette) · Mantenimiento, terminal checks + heartbeat monitor ("Ejemplo", no frequency promised, Q11) · Asesoría, impact × cost matrix → Ahora / Después / Más adelante, one option set aside
3. **Lo que hacemos**: a huge scroll-linked ticker of the capability names, then every capability as an icon tile (6–9), + an optional note
4. **Este sitio, medido** (Sitios web only): what Lighthouse measures, in plain words, next to THIS site's real report (bars fill on scroll)
5. **Qué incluye**: Incluye / Tú aportas / No incluye (mini Anexo A) with a `[[CONFIRMAR]]`
6. **Herramientas** (optional): the tools this service uses (Simple Icons)
7. **Proceso**: the 4 stages on a rail that fills with the scroll → /como-trabajamos
8. **Prueba** (optional): Vista Consulting case with measured scores
9. **Precio**: fixed price, written quote, priced for a small business, 40/30/30 MXN + IVA (shared copy)
10. **Preguntas frecuentes** + closing call to action (the page's `cta.title`, the button, `cta.text`); no violet band (ADR-010)

## The six pages

| Slug | H1 | Capabilities (summary) | Tools | Proof |
|---|---|---|---|---|
| `sitios-web` | Sitios web hechos para **que te contacten** | Informative sites, landing pages, stores/catalogs (WooCommerce), redesigns + migrations, forms and booking, custom design, speed, easy editing, accessibility | Astro, Next.js, WordPress, WooCommerce, Cloudflare | Vista |
| `plataformas-a-la-medida` | Portales y sistemas **hechos para tu forma de trabajar** | Portals with accounts, admin panels, roles and permissions, bookings, automations, integrations, dashboards, security | Next.js, Render, Cloudflare, GitHub, Cal.com | — |
| `posicionamiento-en-google` | Que tus clientes **te encuentren en Google** | Technical SEO, Google Business Profile, speed, Search Console, analytics, SEO audit, plain reports; note: no ranking promises | Search Console, Analytics, Google, Cloudflare | — |
| `contenido-y-marca` | Contenido que **habla por tu negocio** | Copywriting, AI images, video and reels, subtitles, thumbnails, visual identity, presentations | — | — |
| `mantenimiento-web` | Tu sitio, **siempre al día** | Updates and security, backups, changes, domain and hosting, business email, monitoring, migrations, support; plans 🔴 Q11 | Cloudflare, WordPress, GitHub | — |
| `asesoria-digital` | Decisiones digitales **sin gastar de más** | Site audit, digital plan, choosing tools, competitor analysis (ads + content), reviewing other quotes, ongoing advice | — | — |
