# Open questions

*Seeded 2026-10-19 (Phase 0) from `WEBSITE_PROMPT.md` §16, plus Q23–Q25 found during discovery.*
*Protocol: brief §1. When David answers, update the source of truth first (facts → `src/content/business.ts`; terms → `docs/PHILOSOPHY.md`), then the status here and in brief §16.*

✅ answered · 🟡 proposed default (build with it, not approved) · 🔴 unknown (David must supply)

## Index

| ID | Topic | Status | Batch |
|---|---|---|---|
| Q1 | Brand name / wordmark | ✅ name · 🟡 wordmark | — |
| Q2 | Legal identity | 🔴 | 1 |
| Q3 | City and service area | 🟡 | 1 |
| Q4 | Audience scope + language | 🟡 | 2 |
| Q5 | Services list | 🟡 | 1 |
| Q6 | Pricing model | 🔴 | 1 |
| Q7 | Payment schedule + IVA | 🟡 | 2 |
| Q8 | Response times | 🟡 | 2 |
| Q9 | Revision rounds | 🟡 | 2 |
| Q10 | Late fee, pause, cancellation | 🔴 | 2 |
| Q11 | Warranty, training, maintenance | 🟡 / 🔴 | 2 |
| Q12 | Portfolio permissions | 🔴 | 1 |
| Q13 | Photos + short bio | 🔴 | 2 |
| Q14 | Voice: "nosotros" or "yo" | 🔴 | 1 |
| Q15 | Channels | 🔴 | 1 |
| Q16 | Booking tool | 🟡 | 2 |
| Q17 | Lead magnet | 🟡 | 2 |
| Q18 | Analytics | 🟡 ⚠ | 2 |
| Q19 | Domain + hosting | 🔴 | 1 |
| Q20 | Contract update | 🔴 | 1 |
| Q21 | Social-proof numbers | 🔴 | 2 |
| Q22 | Blog at launch | 🟡 | 2 |
| Q23 | Name conflict / trademark check | 🔴 new | 1 |
| Q24 | Upstream docs: logo file names | 🟡 new | report |
| Q25 | Typical project timelines | 🔴 new | 2 |

---

## Q1 · Brand name and wordmark
- **Question:** Name answered. Still open: does the logo need a designed wordmark, or is "AuraNova" set in type beside the mark enough?
- **Blocks:** logo lockup, OG images.
- **Recommended:** A. The type lockup the design system already defines (`.nav__logo`, Roboto Condensed 800).
- **Options:** A type lockup · B a designed wordmark (later; regenerate assets).
- **Status:** ✅ name · 🟡 wordmark · **Answer:** AuraNova (one word, capital A and N) · **Date:** 2026-10-19

## Q2 · Legal identity
- **Question:** Persona física (which tax regime) or persona moral? Name or razón social, and the address for legal notices? (The RFC is never published.)
- **Blocks:** aviso de privacidad, términos, footer ©, invoices (CFDI).
- **Recommended:** — (from you or your accountant). Note: the aviso normally has to name the responsible party and a domicilio for data requests, even if the site shows no street address elsewhere (Q15). The lawyer confirms what the 2025 LFPDPPP requires.
- **Options:** persona física (e.g., RESICO or actividad empresarial y profesional) · persona moral (e.g., S.A.S.).
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q3 · City and service area
- **Question:** Base city and service area?
- **Blocks:** hero eyebrow, titles and H1 keywords, JSON-LD `areaServed`, the vision statement, Google Business Profile.
- **Recommended:** A.
- **Options:** A Monterrey, N.L. + remote across Mexico · B Monterrey metro only · C all of Mexico, no city · D A + international.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q4 · Audience scope and language
- **Question:** es-MX only, or English too? Are startups or B2B tech clients in scope?
- **Blocks:** IA, i18n, copy.
- **Recommended:** es-MX at launch; routes ready for `/en/` later; SMBs first.
- **Options:** A es-MX only · B es-MX + en at launch.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q5 · Services list
- **Question:** Final services, and which one leads?
- **Blocks:** /servicios, the service pages, the form's "tipo de proyecto" field.
- **Recommended:** A. **Three** services, led by Sitios web: (1) Sitios web, nuevos y rediseños · (2) Plataformas a la medida · (3) Mantenimiento y soporte. A new site and a redesign share the same process and deliverables; splitting them makes two thin pages. "Rediseño" stays a section inside page 1.
- **Options:** A three (above) · B four, as in the brief (Sitios web · Rediseños · Plataformas a la medida · Mantenimiento) · C other.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q6 · Pricing model
- **Question:** Fixed price per project (how you priced LOGOS) or hourly + retainer (contract §2.1)? Public "desde $X MXN", or only budget ranges in the form? If ranges, which brackets?
- **Blocks:** service pages (pricing guidance), form budget field, FAQ "¿Cuánto cuesta?", contract §2.
- **Recommended:** fixed price per project against Anexo A; budget ranges in the form (you give the brackets); no public prices at launch.
- **Options:** model: A fixed · B hourly + retainer. Display: i no public prices · ii "desde $X MXN + IVA" per service.
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q7 · Payment schedule and IVA
- **Question:** Payment milestones, and are amounts quoted + IVA?
- **Blocks:** Cómo trabajamos (#pagos).
- **Recommended:** 40% to reserve / 30% at design approval (CP1) / 30% before launch; MXN + IVA.
- **Options:** A 40/30/30 · B 30/35/35 (video) · C 50/50 · D 100% upfront.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q8 · Response times
- **Question:** Your response time and the client's?
- **Blocks:** hero microcopy, Cómo trabajamos, auto-reply.
- **Recommended:** ≤ 1 business day (you) / ≤ 3 business days (client; otherwise the schedule moves).
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q9 · Revision rounds
- **Question:** Revision rounds per phase?
- **Blocks:** Cómo trabajamos, Anexo A, "qué incluye" on service pages.
- **Recommended:** 2 rounds per phase (design / content / pre-launch).
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q10 · Late fee, pause and cancellation
- **Question:** Late fee (% after N days), pause/restart fee and threshold, cancellation details?
- **Blocks:** Cómo trabajamos (#pagos, #cancelacion).
- **Recommended:** — (values must come from you or your lawyer).
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q11 · Warranty, training, maintenance
- **Question:** Post-launch warranty, training, and maintenance plans (scope + price)?
- **Blocks:** Cómo trabajamos (#garantia), the Mantenimiento service page.
- **Recommended:** 30-day bug-fix warranty + 1 training session; maintenance plans TBD.
- **Status:** 🟡 warranty/training · 🔴 plans · **Answer:** — · **Date:** —

## Q12 · Portfolio permissions
- **Question:** Can we show LOGOS (is it launched, or still a preview)? FERREMAG (local demo, not live)? Other past work? Any testimonials?
- **Blocks:** /proyectos, the home "Proyectos" section, any client logo.
- **Recommended:** ask both clients in writing (I can draft the request in Spanish). Until a permission arrives: no client names anywhere, /proyectos is not built, and "Nuestro estándar" takes its nav slot (see `SITEMAP.md`).
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q13 · Photos and short bio
- **Question:** A headshot and workspace photos? And 3–5 facts for your story on Nosotros (background, how you got into web development, why AuraNova)?
- **Blocks:** Nosotros, possibly the hero.
- **Recommended:** — (real photos only; no stock).
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q14 · Voice: "nosotros" or "yo"
- **Question:** Does the site speak as a studio ("nosotros") or as you ("yo")? Is it only you, or are there regular collaborators?
- **Blocks:** all copy (decide before CP1 copy).
- **Recommended:** B if you work alone; A if you have regular collaborators. "Yo" matches the honesty values and the audience's main fear (an agency that vanished): a named person signs and answers. The brand stays AuraNova either way. PHILOSOPHY's drafts are in "nosotros" and would be reworded.
- **Options:** A "nosotros" · B "yo".
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q15 · Channels
- **Question:** Business email (on the domain?), WhatsApp number, phone, which social networks, show a physical address?
- **Blocks:** Contacto, footer, JSON-LD `contactPoint`, form delivery address, auto-reply sender.
- **Recommended:** a domain email (e.g., contacto@ + the Q19 domain); a WhatsApp Business `wa.me` button (no floating bubble); no phone line beyond WhatsApp; no street address on pages (the aviso may still need one, see Q2); only the social networks you actually post on.
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q16 · Booking tool
- **Question:** Booking tool and call length?
- **Blocks:** Contacto, every "Agenda una llamada" link.
- **Recommended:** Cal.com, 30-minute call, Mon–Fri 9:00–17:00 `America/Monterrey`, 15-minute buffers; link out at launch (ADR-004).
- **Options:** Cal.com · Calendly · Google Calendar appointment schedules.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q17 · Lead magnet
- **Question:** A checklist PDF of the 15 no negociables? Gated by email or not?
- **Blocks:** /recursos.
- **Recommended:** yes, ungated, generated from the same data as /estandar.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q18 · Analytics
- **Question:** Which analytics tool?
- **Blocks:** consent banner (or none), the analytics events in brief §9.
- **⚠ Finding:** the brief's default, Cloudflare Web Analytics, is cookieless but has **no custom events**, so it can't record `cta_click`, `booking_open`, `form_submit`, `whatsapp_click` or `resource_download`.
- **Recommended:** a cookieless tool with custom events: Umami Cloud (has a free tier, to verify at sign-up) or Plausible (paid). No cookie banner either way. GA4 only if you ask, plus a consent banner.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q19 · Domain and hosting
- **Question:** Do you already own an AuraNova domain? If not, which one should we buy? And which host?
- **Blocks:** preview deploy (host), production deploy, domain email, form email (SPF/DKIM), canonical URLs.
- **Domain findings (read-only RDAP/WHOIS lookups, 2026-10-19):**
  - Taken: **auranova.com** (registered 2021, GoDaddy) · **auranova.com.mx** (registered 2026-05-24, shows "Coming Soon"; is it yours?) · auranova.dev · auranova.studio · auranovadesign.com · auranovaweb.com · auranovastudio.com · auranovadigital.com.
  - Appear free: **auranova.mx** (NIC México WHOIS: not found) · estudioauranova.com · somosauranova.com · auranovamx.com · auranovamty.com · auranovasites.com. Unconfirmed: auranova.co, auranova.io.
  - Availability and price are re-checked at the registrar before buying; buying needs your OK.
- **Recommended:** domain **auranova.mx** (the exact name, local). Host: **Cloudflare Pages** (ADR-002), because Render static sites have no server functions, so the form would need an extra third-party service.
- **Options:** domain: auranova.mx · one of the free .com names · one you own. Host: A Cloudflare Pages · B Render static + a form service.
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q20 · Contract update
- **Question:** Will you update the contract per `CONTRACT_INSIGHTS.md` §3 before launch? Which version is canonical?
- **Blocks:** publishing Cómo trabajamos (it must match the signed contract).
- **Recommended:** yes; a lawyer-reviewed Spanish version for Mexican clients. Until then the page is built in preview with 🟡 markers on every term not already in the template.
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q21 · Social-proof numbers
- **Question:** Real numbers: years in web development, projects delivered?
- **Blocks:** proof sections, Nosotros.
- **Recommended:** omit until real.
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q22 · Blog at launch
- **Question:** Blog at launch?
- **Blocks:** IA.
- **Recommended:** no; routes reserved for later.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q23 · Name conflict and trademark check (new)
- **Question:** Other parties hold auranova.com (since 2021) and auranova.com.mx (since May 2026, "Coming Soon" page). Before buying a domain, setting up Google Business Profile or printing anything, should we search IMPI's trademark database (MARCia) for "AuraNova"?
- **Blocks:** domain purchase, Google Business Profile, anything printed.
- **Recommended:** yes, search Nice classes 42 (web design and development) and 35 this week; if there's no conflicting mark, consider filing your own. I can run the search in the browser if you want.
- **Status:** 🔴 · **Answer:** — · **Date:** —

## Q24 · Upstream docs: logo file names (new)
- **Question:** The masters are now `auranova_logo.ai` / `.svg`, but `DESIGN_SYSTEM.md` (intro and file note), the brief (§2, §3) and `PHILOSOPHY.md` (header) still call them `spectdesign_logo.*`. OK to correct that text? Docs only; no asset changes.
- **Blocks:** nothing (accuracy only).
- **Recommended:** yes; bump the design system to v1.2 in its changelog.
- **Status:** 🟡 · **Answer:** — · **Date:** —

## Q25 · Typical project timelines (new)
- **Question:** How many weeks does each type of project usually take (e.g., how long LOGOS and FERREMAG took per phase)?
- **Blocks:** FAQ "¿Cuánto tarda?", service pages, Cómo trabajamos.
- **Recommended:** — (needs your real numbers). Until then the FAQ answer stays at "el calendario se acuerda por escrito en tu propuesta" (🟡).
- **Status:** 🔴 · **Answer:** — · **Date:** —

---

## Brief vs. reality (reported at CP0)

| # | The brief says | Reality | Handling |
|---|---|---|---|
| 1 | Logo masters are `spectdesign_logo.*` (§2, §3; also PHILOSOPHY, DESIGN_SYSTEM.md) | Files are `auranova_logo.ai` / `.svg` | Q24 |
| 2 | Default host Render static; forms via "the host's serverless function" (§10) | Render static sites have no functions | ADR-002, ADR-003, Q19 |
| 3 | Default analytics Cloudflare Web Analytics + custom events (§9, §10) | It has no custom events | Q18 |
| 4 | "Proyectos" is a primary nav item (§6) | No project is permitted yet (Q12) | Conditional nav slot (SITEMAP) |
| 5 | Home proof strip shows "this site's measured scores" until logos exist (§7.2), and the Standard teaser shows them again (§7.7) | Same numbers twice | Skip the strip until permitted logos exist |
| 6 | Screenshot widths 320/390/768/1024/1440 (§10) | PHILOSOPHY §7 #15 says 320/375/768/1024/1440 | Capture both: 320/375/390/768/1024/1440 |
| 7 | AuraNova domain to be chosen (Q19) | auranova.com and auranova.com.mx are held by others | Q23 |
| 8 | Aviso de privacidad "under the current LFPDPPP" (§11) | A new LFPDPPP replaced the 2010 law in March 2025; older templates are outdated | Lawyer review (draft in Phase 2) |
