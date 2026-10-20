# Assets and licenses

*Every non-code asset on the site, with its source and license (brief §11). Updated 2026-10-19.*

## Fonts and icons

| Asset | Where | License | Notes |
|---|---|---|---|
| Roboto Condensed 800, Roboto 700, Montserrat 400/600/400 italic (woff2 subsets) | `public/fonts/`, synced from the design system | SIL Open Font License 1.1 | Self-hosted |
| Lucide icons (`lucide-static`) | UI icons, inlined at build (`src/components/Icon.astro`) | ISC | One icon set only (DESIGN_SYSTEM §7) |
| Simple Icons (`simple-icons`) | Tool logos in the "Herramientas" grids (`src/components/BrandIcon.astro`) | CC0 1.0 | The logos are trademarks of their owners. Used only to say which tools we work with (nominative use), monochrome, never implying endorsement. |
| AuraNova mark, favicons, PWA icons | `public/` | AuraNova's own | Synced from `Resources/AuraNova/Design System/logo/` |

## Generated images (AI)

Generated 2026-10-19 with **Artlist** (model: GPT Image 2.5, Flare, high quality, 1K) on David's AI Suite plan; 720 credits in total. Originals were converted to WebP (q90, alpha kept) in `src/assets/generated/`; the build serves AVIF/WebP at the sizes each page needs.

| File | Used on | Prompt (summary) | Generation ID |
|---|---|---|---|
| `hero-orb.webp` | Home hero | Dark planet, white cratered crescent, lime→violet aura, tiny stars, transparent | 01a157b1-8066-7f8a-add9-cde7a4ebea43 (output 1) |
| `orb-alt.webp` | /servicios/ hero | Same prompt, the other take | 01a157b1-8066-7f8a-add9-cde7a4ebea43 (output 0) |
| `svc-sitios-web.webp` | Sitios web | Browser window + phone with a website layout, 3D glass/ceramic, brand palette | 01a157b1-8058-7773-819b-dc5221efa4c4 |
| `svc-plataformas.webp` | Plataformas a la medida | Login card with padlock, user card, bar-chart panel | 01a157b1-8070-7834-a311-a4f4ae77939a |
| `svc-posicionamiento.webp` | Posicionamiento en Google | Magnifying glass over a rising bar chart with a map pin | 01a157b1-8061-7985-ae32-f6990eea576e |
| `svc-contenido.webp` | Contenido y marca | Camera lens, play tile, color swatches, pen nib | 01a157b1-805f-76f8-8c7f-066401e70b60 |
| `svc-mantenimiento.webp` | Mantenimiento y soporte | Shield with checkmark, wrench and gear | 01a157b1-809c-772e-aed8-64c9beaa9cf9 |
| `svc-asesoria.webp` | Asesoría digital | Compass + speech bubble with a lightbulb | 01a157b1-80c3-7c0b-b2e2-6c9e21baf32f |
| `constelacion.webp` | Nosotros | Constellation network, lime→violet, nova burst | 01a157b1-80af-7dab-b7c8-78d321c3f046 |

- **License:** 🟡 to confirm in Artlist's AI terms that generated images may be used commercially on the site (Q33). Same question for the "imágenes con IA" we offer clients.
- **Honesty rule:** generated images are brand illustrations only. They never depict clients, people presented as staff, results or places as if they were real.

## Screenshots of client work

| File | Source | Permission |
|---|---|---|
| `src/assets/projects/vista-consulting-desktop.png` | vistaconsulting.mx, captured 2026-10-19 with `scripts/capture-project.mjs` (cookie banner dismissed, "Solo lo necesario") | David, Q12 (2026-10-19); Vista's OK in writing 🟡 |
