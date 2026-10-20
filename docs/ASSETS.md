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

All generated with **Artlist** (model: GPT Image 2.5, Flare, high quality, 1K) on David's AI Suite plan. The build serves AVIF/WebP at the sizes each page needs.

### In use

| File (`src/assets/generated/…`) | Used on | Prompt (summary) | Generation ID |
|---|---|---|---|
| `constelacion.webp` | Nosotros banner background | Constellation network, lime→violet, nova burst | 01a157b1-80af-7dab-b7c8-78d321c3f046 |
| `services/*.webp` (6) | Service cards (home) and /servicios/ rows: **style A, Plano bicolor** (Q35 ✅) | 2D flat, violet fills + lime accents, dark outline; one subject per service (browser + phone · admin panel with locks · search bar + rising path + pin · video + pen + swatches · shield + wrench + refresh · compass + bulb + flag) | sitios-web 01a1582d-389f-7808-befb-9fd1c3449f22 · plataformas 01a1582d-389b-790f-9667-98a8acbeb5d6 · posicionamiento 01a1582d-38a4-7be8-b8fd-65927ca14f4a · contenido 01a1582d-389d-71ed-b202-77e10ab69652 · mantenimiento 01a1582d-38a0-7e17-bad5-604dbb8b89fa · asesoria 01a1582d-38ed-7d29-a0ff-893bf9209756 |
| `bg/*.webp` (6) | Each service page's hero background, and the /servicios/ mosaic | Dark charcoal, thin glowing lime→violet line art weighted to the right: wireframe browser + code panels · node/server diagram · rising charts + radar rings · film frames + waveform · shield + heartbeat · dotted path to a star + compass | sitios-web 01a1582d-3d1f-790e-b981-40b94612be13 · plataformas 01a1583b-95b1-7a70-8ab3-1aea62f11bfc · posicionamiento 01a1583b-95aa-790c-a245-ea2c1adf304f · contenido 01a1582d-3d25-7b9a-9959-322c7d870d6e · mantenimiento 01a1582d-3d24-7c63-92c0-1ecdfc8ae712 · asesoria 01a1583b-95ab-7b6a-86c2-0eb7e5b2293d |

- **CP1.2 batch (2026-10-20):** 24 images, **1,920 credits** (approved by David). Four failed on Artlist's side, were refunded and re-run; the total stayed at 1,920.
- **Processing** (script kept in the session scratchpad, reproducible): 2D art trimmed to the artwork (stray specks ignored) and centred on a square, 720 px WebP q90 with alpha. Backgrounds: black point lifted to `--gray-7` so they melt into the section, upscaled 1.5× (Lanczos + light sharpening) to 1632 × 912, WebP q88. **CP1.3:** the backgrounds and `constelacion.webp` were upscaled ×4 locally with Real-ESRGAN x4plus (ONNX, CPU, tiled; ADR-014) from the original generations, then finished the same way: banners 4352 × 2432 (WebP q86, 67–170 KB), constellation 4608 × 3072 (125 KB). Sharp on a 4K screen at 2×.

### Retired

- **CP1.3 (Q35 = A):** illustration styles B (Línea y acento) and C (Degradado aura), 12 images, removed with /opciones/; in git history. IDs — B: sitios-web 01a1582d-38ec-7d1e-a917-705ab1c7c6cf · plataformas 01a1582d-38e7-7127-b77a-c2ae2ee0252c · posicionamiento 01a1582d-38f1-7e0d-af77-31295ba7a9f9 · contenido 01a1582d-3935-7b0e-891e-a09880db8400 · mantenimiento 01a1582d-392f-75ad-abf8-082ec73f00a1 · asesoria 01a1582d-3937-7c70-a361-1348eba8c721; C: sitios-web 01a1582d-3938-76bf-aba5-24dbf4f315d4 · plataformas 01a1582d-3933-7e56-82d4-fff95bc368a4 · posicionamiento 01a1582d-397e-7bd2-8022-7b43bdc576c3 · contenido 01a1582d-39d2-7a49-b860-dcebbee618db · mantenimiento 01a1583b-95b2-741b-bac5-9617f89830a0 · asesoria 01a1582d-3989-78d4-bfed-ba9603887d6b.
- **CP1.2 (David preferred 2D over the 3D style):**

`hero-orb.webp`, `orb-alt.webp` and the six `svc-*.webp` (CP1.1, 720 credits) were removed from the site; they remain in git history. Their IDs: hero-orb/orb-alt 01a157b1-8066-7f8a-add9-cde7a4ebea43 · sitios-web 01a157b1-8058-7773-819b-dc5221efa4c4 · plataformas 01a157b1-8070-7834-a311-a4f4ae77939a · posicionamiento 01a157b1-8061-7985-ae32-f6990eea576e · contenido 01a157b1-805f-76f8-8c7f-066401e70b60 · mantenimiento 01a157b1-809c-772e-aed8-64c9beaa9cf9 · asesoria 01a157b1-80c3-7c0b-b2e2-6c9e21baf32f.

- **License:** ✅ (Q33, David, 2026-10-20) commercial use covers all social platforms, websites, client work, paid ads, podcasts, and broadcast & TV. The site never names the generation platform (David).
- **Tool names on Contenido y marca:** Adobe apps and image models are named as tools we use (nominative). Simple Icons has no Adobe or OpenAI logos, so those cells use a Lucide line icon; brand logos appear only where Simple Icons has the accurate one (Google, Google Gemini, ByteDance, Kuaishou, Qwen, Alibaba Cloud, Meta).
- **Honesty rule:** generated images are brand illustrations only. They never depict clients, people presented as staff, results or places as if they were real.

## Screenshots of client work

| File | Source | Permission |
|---|---|---|
| `src/assets/projects/vista-consulting-desktop.png` | vistaconsulting.mx, captured 2026-10-19 with `scripts/capture-project.mjs` (cookie banner dismissed, "Solo lo necesario") | David, Q12 (2026-10-19); Vista's OK in writing 🟡 |
