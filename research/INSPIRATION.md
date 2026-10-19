# Inspiration teardown

*Captured 2026-10-19 in a browser. Use these as **reference only**: copy structure and principles, never copy text, images, fonts, or layouts one-for-one.*

---

## A. backdoor.com.mx: CONTENT reference

A Monterrey digital-marketing agency (marketing, web development, branding). Spanish, local-SEO driven.

### What they do well (take these)

| Pattern | How they do it | Our version |
|---|---|---|
| **Geo-keyword positioning** | The title and H1 carry "Marketing Digital en Monterrey"; the service page is titled "Diseño y Desarrollo Web en Monterrey". | Title and H1 pattern "Diseño y desarrollo web en [[ciudad]]" (Q3). Every service page targets one local query. |
| **One CTA, everywhere** | "HAZ UNA CITA" in the header and after every section; secondary "Recibe una consultoría gratuita / Programa una llamada". | One verb-led primary CTA ("Agenda una llamada"), repeated at the end of every section and page. |
| **Lead magnet** | eBook: *5 obstáculos en tu página web que impiden el crecimiento de tus ventas y cómo resolverlos*. | Our own: a checklist built from the **15 no negociables** (Q17). Same "here's what's wrong with your site" angle, but in our words and grounded in our standard. |
| **Proof stack** | Google Partner certification, 3 big stats, a press feature, a wall of about 40 client logos. | Proof only from real things: client logos and case studies **with permission** (Q12), this site's own measured scores, real numbers (Q21). No proof we don't have. |
| **Services trio** | Three cards (MKT digital / Desarrollo web / Branding), each linking to its own page. | 3–4 service cards → `/servicios/{slug}` (Q5). |
| **Service-page narrative** | Problem ("Superando los desafíos…") → guide ("Tu aliado…") → services, each with a one-line benefit → CTA → results ("Transformaciones digitales exitosas") → urgency ("No permitas que tu negocio se quede atrás") → CTA → contact form. | Same story arc, plus what they lack: **what's included (mini Anexo A), the process, pricing guidance, and an FAQ.** |
| **SEO FAQ** | Five questions phrased the way people search ("¿Qué es…?", "¿Por qué elegir…?", "¿Qué servicios…?", "¿Cómo puede ayudar…?", "¿Cómo mide el éxito…?"). | 6–8 real client questions (timeline, cost, ownership, changes, maintenance, hours) + FAQPage JSON-LD. |
| **Contact block on every page** | Email, phone, address, 6 social icons, and a form. | A compact contact block + hours (Mon–Fri 9–17) in the footer of every page. |
| **Navigation** | Servicios (3) · Dr. Brand · Nosotros · Portafolio · Blog · Vacantes · Contenido gratuito · Contacto · EN | Ours is leaner: ≤ 5 top-level items (non-negotiable #6). |

### What not to copy (their weak spots)

- **ALL-CAPS paragraphs** and ALL-CAPS slogans. They hurt readability (non-negotiables #10 and #12).
- **Generic, unverifiable claims** ("convierte tu visión empresarial en una realidad digital"). Every claim we make has to be specific and checkable.
- **The "Nosotros" page is only names and job titles.** Ours carries the philosophy: mission, values, what we don't do, and the standard.
- Six social icons repeated in several places. Show only the channels you actually use (Q15).

---

## B. atomato.co: DESIGN reference

A Shopify on-site messaging app. English, dark UI. Measured in the browser:

| Element | Atomato | Our equivalent (see `Resources/AuraNova/Design System`) |
|---|---|---|
| Base | Near-black background, off-white text `#F6F6F6` | `--gray-7` `#191B1C` background, `--gray-1` text |
| Accent | **`#D8FD34`**, the same as your brand lime | `--lime-1` |
| Display type | VG5000, 60/70 px H1, 36–48 px H2 | **Roboto Condensed 800** (yours), 40→72 px H1 |
| Body / UI type | Outfit 14–17 px; buttons 14 px, 700, uppercase, ~0.06–0.08em tracking | **Montserrat** 16→18 px body; buttons 14 px, 600, uppercase, 0.08em |
| Primary CTA | Pill (100 px radius), lime fill, near-black text, soft lime glow + white inset highlight | `.btn--primary` (same idea, our own values) |
| Nav | Floating rounded bar, logo left, CTA right, menu icon | `.nav` floating pill, sticky; collapses below 768 px |
| Hero | Eyebrow chip with a dot → H1 with a **lime-highlighted phrase** → lead → 2 CTAs → rating microcopy → client-logo strip | Same rhythm: eyebrow → H1 with `.hl` → lead → CTA pair → hours/response microcopy → logos (with permission) |
| Background | Faint grid lines behind the hero | `.bg-grid` + one gradient `.orb` (our logo gradient) |
| Case carousel | Photo cards with a big lime stat + label + "SEE ALL CASE STUDIES"; **has a pause button** | Case cards with **real** results; a grid, or a carousel only with a pause control |
| Feature steps | Numbered 01–04 cards with mini UI mockups | `.step__num` cards for the 4 checkpoints |
| Section flow | Hero → case results → "what stores see after" → 5 features → numbered modules → analytics → integrations → "live in five minutes" (4 steps) → FAQ → final CTA | Hero → proof → problems → services → process (4 steps) → projects → standard → terms teaser → FAQ → final CTA |

### Don't copy

- Their fonts (VG5000, Outfit).
- Their copy, mockups, photos, tomato logo, or icon set.
- Any section verbatim.

The overlap in accent color is a coincidence to exploit, not a clone to build.
