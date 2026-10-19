# AuraNova: studio website brief (prompt for Claude Code)

> **How to use:** open `Desktop/CLAUDE-PLOCAL/Projects/AuraNova site/` in Claude Code (or VS Code) and say:
> *"Read `WEBSITE_PROMPT.md` end to end, plus every file it tells you to read, then start Phase 0. Stop at every CHECKPOINT."*

---

## 0. Your role and the mission

You are the **lead designer, front-end engineer and es-MX copywriter** for David's own web-development studio site. You work with David (the owner, and your only stakeholder) through checkpoints.

**Mission.** Build the site that sells David's professional web-development services, and make the site itself the proof. It must pass every standard it promises clients (the 15 non-negotiables). Visitors should understand within seconds:

- **what** David builds and for whom,
- **how** working with him goes (process, hours, payments, ownership: everything in writing),
- **how to start**: book a call.

**Site goals, in order** (🟡 confirm at CP0):
1. Qualified prospects book a call. This is the primary conversion.
2. Prospects arrive already aligned on process and terms, which means less friction and less scope creep later.
3. Show real, permitted work.

---

## 1. How this brief handles blanks (read this first)

This brief is **deliberately incomplete**. David asked for a brief whose blanks get filled *as they come up*. Known facts are stated plainly. Everything else is tagged:

- ✅ **confirmed** by David.
- 🟡 **`[[CONFIRMAR: …]]`**: a proposed default. Build with it, but it's not approved.
- 🔴 **`[[PENDIENTE: …]]`**: unknown. David must supply it.

**Protocol:**

1. **Never invent business facts.** That covers prices, client names, testimonials, stats, years of experience, project counts, certifications, addresses, phone numbers, legal-entity data and response-time promises. If you need one and it isn't ✅, it's a blank.
2. When you hit a blank, do all three:
   - put a visible `[[PENDIENTE: question]]` in the content, styled with `.pending`, so preview builds still render;
   - log it in `docs/OPEN_QUESTIONS.md` with: ID, question, what it blocks, your **recommended default**, the options, status, answer and date;
   - **keep working** on everything it doesn't block.
3. **Ask in batches at checkpoints**, not one question at a time. Put the most blocking first, ≤ 10 per batch, and give each one a recommended answer so David can reply "Q1 yes, Q6 B, …". Interrupt mid-phase only if a blank blocks *all* progress.
4. **When David answers**, update the single source of truth:
   - business facts (name, hours, contacts, prices, links) go in `src/content/business.ts` (or `.json`);
   - philosophy and terms go in `docs/PHILOSOPHY.md`;
   - status goes in §16 of this brief and in `OPEN_QUESTIONS.md` (✅ + date).

   The UI reads from those files, so an answer propagates everywhere.
5. **Production builds must fail** if any `[[PENDIENTE` or `[[CONFIRMAR` remains in the output (a `check:pending` script). Preview builds allow them.
6. Decisions with real options go to `docs/DECISIONS.md` as short ADRs: decision, options, why.
7. When this brief and reality disagree, **say so** at the next checkpoint. Don't work around it silently.

---

## 2. What's in this folder (read all of it)

```
Desktop/CLAUDE-PLOCAL/
├── Projects/AuraNova site/              ← repo root: you work here
│   ├── WEBSITE_PROMPT.md                  ← this brief
│   ├── docs/PHILOSOPHY.md                 ← mission, vision, 7 values, two-sided responsibilities,
│   │                                         operating terms, the 15 non-negotiables made measurable,
│   │                                         "lo que no hacemos", voice. READ FULLY. It is the content spine.
│   └── research/
│       ├── CONTRACT_INSIGHTS.md           ← David's contract template, clause by clause + video insights
│       │                                     + the contract changes needed before "Cómo trabajamos" goes live
│       └── INSPIRATION.md                 ← backdoor.com.mx (CONTENT) + atomato.co (DESIGN) teardown
└── Resources/
    ├── Web Design Agreement Template.pdf  ← the contract template (source of the terms)
    └── AuraNova/                          ← brand masters: DO NOT MODIFY
        ├── Brand Colors.pdf, spectdesign_logo.ai / .svg, Font Title/ (Roboto), Font Text/ (Montserrat)
        └── Design System/                 ← READ DESIGN_SYSTEM.md, then open specimen.html
            ├── tokens.css, components.css, specimen.html
            ├── fonts/ (5 woff2 subsets)   logo/ (web mark, favicons, PWA icons)
```

**Design-system rule:** `Resources/AuraNova/Design System/` is **upstream**. Copy `tokens.css`, `components.css`, `fonts/` and `logo/` into the repo (`src/styles/`, `public/fonts/`, `public/`). Never link across folders. Need a token change? Propose it at a checkpoint. After approval, change it upstream first (and bump the changelog), then re-copy.

---

## 3. The business (summary; the full version is `docs/PHILOSOPHY.md`)

- **Who.** David Contreras Morales, a professional web developer. Official business name ✅ **AuraNova** (exact casing: capital A, capital N, one word). Based in 🟡 Monterrey, N.L. (Q3). The logo masters are still named `spectdesign_logo.*` from an old working name; ignore that file name, never show it.
- **Proposed brand idea** (🟡): **Aura + Nova.** A nova is a star that suddenly shines far brighter; an aura is the presence something gives off at first glance. AuraNova makes businesses **shine online**, and the shine is earned through method (purpose, everything in writing, measured quality), not decoration. Tagline candidates are in PHILOSOPHY §1, e.g. *"Sitios web que hacen brillar a tu negocio."*
- **Mission** (🟡): *"Diseñamos y desarrollamos sitios web con un propósito de negocio claro: rápidos, fáciles de usar, accesibles y medibles. Trabajamos con un proceso transparente en el que ves tu sitio desde el principio y siempre sabes qué sigue, cuánto cuesta y quién es responsable de qué."*
- **Values** (🟡): Propósito antes que decoración · Diseñamos para quien te visita · Primero lo ves · Todo por escrito · Calidad que se mide · Lo tuyo es tuyo · Respeto al tiempo, en ambos sentidos.
- **Work hours** ✅: **Monday to Friday, 9:00–17:00**, Mexico central time (`America/Monterrey`). No weekends or official holidays. These hours have to show up **consistently** in:
  - booking availability,
  - the contact page,
  - the footer,
  - JSON-LD `openingHoursSpecification`,
  - form auto-reply copy ("te respondemos el siguiente día hábil"),
  - the "Cómo trabajamos" page.
- **Services, grounded in real projects so far** (🟡 final list and packaging = Q5):
  - **Sitios web y rediseños para empresas.** Example: FERREMAG, a WordPress/WooCommerce digital catalogue redesign (currently a **local demo only**, not live).
  - **Plataformas a la medida.** Example: LOGOS Asesorías, a public site plus a student/teacher/admin portal (Next.js, live preview on Render).
  - **Mantenimiento y soporte técnico.** David maintains LOGOS.
- **Signature process** (from how David actually runs projects): CP0 Descubrimiento → **CP1 "Primero lo ves"** (real-stack design preview at a private link, before the deep build) → CP2 Construcción → CP3 Lanzamiento medido (the non-negotiables report, then handover).

---

## 4. Audience (🟡 proposal; write a 1-page profile at CP0, Q4)

Owners and managers of **small and mid-sized businesses in Monterrey / Mexico**. Examples: industrial distributors (FERREMAG), education and services (LOGOS). Typically:

- non-technical, phone-first, WhatsApp-native;
- the owner decides;
- they compare 2–3 quotes.

**Pains to speak to:**

- the site looks dated and brings no leads;
- the last agency vanished, or still holds the domain;
- quotes are vague and the scope keeps changing;
- the WordPress site is slow;
- nobody explains anything in plain Spanish.

**Open:** startups? B2B tech? international/English clients? (Q4)

---

## 5. Non-negotiables (this site must pass all of them)

The full measurable table is in **PHILOSOPHY §7**: the 15 Kindling principles with thresholds, plus the additions (WCAG 2.2 AA, technical SEO, privacy, security, handover). Highlights:

- **Speed:** mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- **Lighthouse:** **≥ 95 in all four categories** on this site. The client standard is ≥ 90, but this site is the showcase.
- **Brand:** logo top-left on every page.
- **Navigation:** ≤ 7 top-level items (this site uses ≤ 5), every page ≤ 3 clicks from home.
- **Type:** ≤ 3 font families, body ≥ 16 px.
- **Contrast:** ≥ 4.5:1.
- **Annoyances:** no entry pop-ups, no autoplay, no scroll-jacking.
- **CTAs:** one primary CTA per view, plus one in the first viewport and one at the end of every page.
- **Layout:** works at 320 px with no horizontal scroll.

The site will **publish this standard** ("Nuestro estándar"), so anything we claim, we must measurably pass. At CP3 you deliver the table filled in with evidence.

---

## 6. Information architecture (proposal: confirm at CP0)

**Primary nav (≤ 5):** Servicios · Cómo trabajamos · Proyectos · Nosotros · **[Agenda una llamada]**
**Footer:** all pages + Nuestro estándar · Recursos · Aviso de privacidad · Términos · contacto · **horario**.
All slugs are in Spanish.

| Page | URL | Goal | Primary CTA | Notes |
|---|---|---|---|---|
| Inicio | `/` | Understand the offer and book | Agenda una llamada | Section order in §7 |
| Servicios | `/servicios` | Route to the right service | Ver servicio / Agenda | 3–4 cards (Q5) |
| Servicio (×N) | `/servicios/{slug}` | Convince for one service | Agenda una llamada | Template in §7; one local keyword each |
| Cómo trabajamos | `/como-trabajamos` | Pre-align on process and terms | Agenda una llamada | 4 checkpoints, hours, response times, the two-sided responsibilities table, payments, changes, revisions, IP and ownership, cancellation, warranty (PHILOSOPHY §5–6). **Must match the signed contract** (§11). |
| Proyectos | `/proyectos`, `/proyectos/{slug}` | Prove it | Agenda / next case | Case study: context → problem → approach (checkpoints) → result (**real** numbers) → stack → screenshots. **Only with written permission** (Q12). |
| Nosotros | `/nosotros` | Trust in the person and the philosophy | Agenda una llamada | David's story + photo (Q13), mission, values, "lo que no hacemos". |
| Nuestro estándar | `/estandar` | Differentiate | Agenda una llamada | The 15 non-negotiables explained for clients, plus **this site's own live scores** (measured at build, never typed by hand). |
| Recursos | `/recursos` | Lead magnet (optional) | Descargar | Checklist of the 15 (Q17). |
| Contacto | `/contacto` | Book or write | Agenda una llamada | Booking + form + channels + hours (§9). |
| Aviso de privacidad | `/aviso-de-privacidad` | Legal | — | §11 |
| Términos de uso | `/terminos` | Legal | — | Site terms, **not** the client contract. |
| 404 | — | Recover | Ir al inicio | Links to the key pages. |
| Blog | later | — | — | Not at launch (Q22). Keep the routes ready. |

Before designing any page, write its **page brief** in `docs/pages/{slug}.md`: goal, audience, primary CTA, success metric and outline. Non-negotiable #1.

---

## 7. Content direction (Backdoor-inspired; see `research/INSPIRATION.md` §A)

**Home, in order (proposal):**
1. **Hero.** Eyebrow (service · city) → H1 with **one** highlighted phrase (the promise) → lead (the short mission) → `Agenda una llamada` + `Cómo trabajamos` → microcopy with hours and response time.
2. **Proof strip.** Client logos *with permission*. Until then, this site's measured scores.
3. **Problems.** "Por qué tu sitio no te trae clientes": 3–5 common problems, each mapped to a non-negotiable. The same angle as Backdoor's eBook, in our own words.
4. **Services.** 3–4 cards → service pages.
5. **Process.** 4 numbered checkpoints (Atomato-style step cards). Emphasize **"Primero lo ves"**.
6. **Projects.** 2–3 real case cards. Use a grid, or a carousel only with a pause control.
7. **Standard.** A teaser of the 15 → `/estandar`.
8. **"Todo por escrito."** Hours, payments, ownership → `/como-trabajamos`.
9. **FAQ.** 6–8 real questions: timeline, cost, ownership, changes, maintenance, hours. Add FAQPage JSON-LD.
10. **Final CTA band** (`.theme-violet`, once per page): `Agenda una llamada` + hours.

**Service-page template:** problem → guide (us, and how) → **what's included** (a mini Anexo A: deliverables, revision rounds, what the client provides, what's excluded) → process → proof → pricing guidance (Q6) → FAQ → CTA.

**Copy rules:**
- es-MX, using **tú**. Voice per PHILOSOPHY §9: clear, direct, warm.
- **"Nosotros" vs "yo" = Q14.** Decide before writing final copy.
- Headlines promise outcomes. Paragraphs ≤ 4 lines.
- **No ALL-CAPS paragraphs.** Uppercase only on buttons, eyebrows and tags.
- Every claim must be specific and verifiable. Log each number or claim with its source in `docs/CLAIMS.md`.
- Local SEO phrasing should read naturally ("diseño web en Monterrey", Q3).
- **You write the copy.** Draft it from PHILOSOPHY and mark the unknown facts.

---

## 8. Design direction

- **Use the design system as-is**: `Resources/AuraNova/Design System/DESIGN_SYSTEM.md`. That covers:
  - the dark default theme;
  - the light theme for reading-heavy sections (alternate one every 2–3 sections);
  - the violet band, once, for the final CTA;
  - Roboto Condensed 800 for display, Roboto 700 for headings, Montserrat for body;
  - lime as the single accent;
  - pill CTAs with a glow;
  - the floating nav;
  - eyebrow chips;
  - numbered step cards;
  - stat cards (real numbers only).
- **What we take from Atomato, and what we must not copy:** DESIGN_SYSTEM §8 and INSPIRATION §B.
- **Hero visual:** the logo-gradient orb plus the faint grid, or a device mockup of a real, permitted project. **No stock photos** of handshakes or laptops.
- **Contrast traps** (already solved in the tokens; don't undo them):
  - lime is never text on light backgrounds (1.1:1);
  - violet `#5934FD` is never text on dark (2.7:1); use violet-3.
- **Motion:** opacity and transform only. Honor `prefers-reduced-motion`. One glowing element per view.

---

## 9. Conversion: booking, contact, WhatsApp

- **Book a call** (primary). Tool: Q16 (Cal.com / Calendly / Google Calendar appointment schedules).
  - Slots only Mon–Fri 9:00–17:00 `America/Monterrey`, with buffers.
  - Call length 🟡 30 min.
  - **Load the embed on click** (or link out). No third-party script on page load: performance and privacy, non-negotiables #3 and #13.
- **Contact form fields:**
  - name, email, company, current website (optional);
  - project type (select, from the services);
  - budget range (select, Q6);
  - message;
  - **privacy-consent checkbox** linked to the aviso.
- **Form behavior:**
  - honeypot + rate limit; add Turnstile only if spam appears;
  - delivers to 🔴 `[[PENDIENTE: email]]`;
  - es-MX **auto-reply**: thanks, what happens next, hours, response time.
- **WhatsApp** (Q15): normal in this market (LOGOS works over WhatsApp only).
  - If yes: a `wa.me` button in the contact sections and the footer.
  - **No floating bubble covering content.**
- **Analytics events:** `cta_click` (with location), `booking_open`, `booking_complete` (if the tool exposes it), `form_submit`, `whatsapp_click`, `resource_download`.

---

## 10. Technical architecture (proposal: confirm with an ADR at CP0)

**Stack.**
- **Default:** **Astro** (current stable) with static output, TypeScript, content collections (services, projects, FAQ) and MDX.
  - Use plain CSS with the design-system tokens. Tailwind only if you map it 1:1 to the tokens (no raw values).
  - **Why:** it's a content site whose speed is part of the pitch, so near-zero JS and Lighthouse 100 are realistic.
- **Alternative:** Next.js (David's LOGOS stack), only if a feature truly needs it. Write the ADR.

**Hosting.** 🟡 Render **static site** (David already uses Render, and static sites don't spin down like LOGOS's free web service), or Cloudflare Pages / Netlify. Q19 covers hosting and the domain.

**Forms on a static site.** Either the host's serverless function or a form service. Decide in an ADR, weighing privacy and where the data lives.

**Repo** (follow the LOGOS pattern):
- Private repo on GitHub account **SpectralNova**.
- Set the git identity for this repo only.
- **Gotcha:** Git Credential Manager has David's *other* account cached (DavidContrerasMKT). Set the remote as `https://SpectralNova@github.com/...`.
- The machine has **no gh, Vercel or Render CLIs**.

**Preview vs production.**
- Every preview deploy is **noindex** (meta tag + `X-Robots-Tag`; the LOGOS pattern is `SITE_NOINDEX=1`).
- Production goes live only at CP3.

**Headers.** HSTS, a strict CSP (allow the booking domain only if it's used), Referrer-Policy, Permissions-Policy.

**Assets.**
- Images: `astro:assets` → AVIF/WebP with explicit dimensions; lazy-load below the fold.
- Fonts: self-hosted from the design system. Preload `montserrat-400` and `roboto-condensed-800` only.
- Favicons and PWA icons come from `logo/`.

**Analytics** (Q18). 🟡 Cookieless (Cloudflare Web Analytics, Plausible or Umami), which means **no cookie banner**. Use GA4 only if David asks, and then add a consent banner.

**SEO.**
- Unique title and description per page; canonical URLs; sitemap; robots.
- **OG images generated at build**: dark background, logo, page title in Roboto Condensed.
- JSON-LD:
  - `ProfessionalService` (name, url, logo, areaServed, `openingHoursSpecification` Mo–Fr 09:00–17:00, contactPoint);
  - `FAQPage`;
  - `BreadcrumbList`.
- Google Business Profile for local SEO (Q3 / Q15).

**i18n.** es-MX only at launch, unless Q4 says otherwise. Structure routes so `/en/` can be added later.

**Scripts** (npm):
- `check:pending`: fails a production build on `[[PENDIENTE` / `[[CONFIRMAR`.
- `check:tokens`: no raw hex, px or ms outside the tokens.
- `test:a11y`: axe via Playwright.
- `test:lh`: Lighthouse budgets.
- `screenshots`: 320 / 390 / 768 / 1024 / 1440.

**Environment notes.** This is a Windows machine.
- Playwright with `channel: 'msedge'` works (Edge is installed).
- Use `python`, **not** `python3`, which is a broken Store stub.
- Shells are PowerShell and Git Bash.

---

## 11. Legal and compliance (Mexico)

- **Aviso de privacidad** under the current LFPDPPP, required because the form collects personal data. Contents:
  - responsible party's identity and address (Q2);
  - data collected and purposes;
  - ARCO-rights procedure;
  - contact;
  - transfers to processors (form and booking providers);
  - how changes are announced.

  Draft it and mark it for **lawyer review**.
- **Términos de uso** for the website. These are not the client contract.
- **"Cómo trabajamos" must never promise something the signed contract doesn't say.** `research/CONTRACT_INSIGHTS.md` lists the template's problems:
  - the missing Anexo A;
  - §5 invites scope creep;
  - no portfolio right;
  - US law references;
  - the "Stock Subscription Agreement" copy-paste error.

  Terms that only exist in proposals stay 🟡 until David updates the contract (Q20).
- **Prices.** If shown, state MXN and whether IVA is included (Q6, Q7).
- **Client work.** No client logos, screenshots or case studies without **written permission** (Q12). FERREMAG is a local demo that isn't deployed, so ask before even mentioning it.
- **Licenses.** Roboto and Montserrat are OFL ✓; Lucide icons are ISC ✓. Record any other asset's license in `docs/ASSETS.md`.

---

## 12. Phases and CHECKPOINTS (stop at each one and wait for David)

| Phase | Deliverables | Checkpoint |
|---|---|---|
| **0 · Discovery** | Read everything in §2. `git init` (`.gitignore` excluding `.env*` and `Documentos/`). Seed `docs/OPEN_QUESTIONS.md` from §16, plus anything new. Audience profile. Sitemap + one page brief per page (`docs/pages/`). Content outline per page. Stack + hosting + forms ADRs. Report anything in this brief that contradicts reality. | **CP0:** David answers question batch 1 |
| **1 · Design preview** ("primero lo ves", David's standard way to run projects) | Design system wired in. **Inicio, Cómo trabajamos, one Servicio, Contacto** (form UI only), with draft es-MX copy and visible `.pending` markers. Deployed to a **noindex preview URL**. Screenshots at 5 widths. First Lighthouse + axe pass. | **CP1:** David approves the look, structure and voice |
| **2 · Full build** | All pages. Case studies (permitted ones only). Booking + form + auto-reply. Legal pages. SEO / JSON-LD / OG. Analytics events. 404. Lead magnet (if Q17). Every blank resolved or removed. | **CP2:** content review, zero blanks |
| **3 · QA + launch** | **The 15 non-negotiables report** (pass/fail + evidence). Lighthouse ≥ 95 ×4. axe with 0 serious issues. Keyboard-only booking and form. Cross-browser: Edge, Chrome, Firefox, Safari iOS. Form-delivery test (only to an address David gives you). Domain / DNS / HTTPS / HSTS. noindex removed. Search Console + sitemap. Google Business Profile. | **CP3:** David says "go" |

**At every checkpoint, report:** what was done, screenshots, decisions and why, the remaining blanks, risks, and the **next question batch** (≤ 10, each with a recommended answer).

---

## 13. Acceptance criteria (definition of done)

- [ ] Every row of PHILOSOPHY §7 (the 15 + additions) passes, with evidence, in `docs/STANDARD_REPORT.md`.
- [ ] Lighthouse mobile ≥ 95 in all four categories on Inicio, a Servicio, Cómo trabajamos and Contacto.
- [ ] Lab LCP ≤ 2.5 s and CLS ≤ 0.1 on throttled mobile. Content pages ship ≤ 30 KB of JS (the booking embed loads only on demand).
- [ ] axe reports 0 serious/critical issues. Keyboard-only: book a call and submit the form. No horizontal scroll at 320 px. Works at 200% zoom.
- [ ] **Zero `[[PENDIENTE` / `[[CONFIRMAR`** in production. Every number and claim has a source in `docs/CLAIMS.md`. No invented testimonials, logos or stats.
- [ ] Hours (Mon–Fri 9–17) identical in the contact page, footer, JSON-LD, booking slots, auto-reply and Cómo trabajamos.
- [ ] Cómo trabajamos matches the **signed contract version** (version and date noted in the page source).
- [ ] Logo top-left on every page, linked home. Favicon, apple-touch icon and web manifest present.
- [ ] Forms are labeled, validated, spam-protected, carry privacy consent, are delivery-tested and have an es-MX auto-reply.
- [ ] The aviso de privacidad is published and linked from every form and the footer.
- [ ] `check:tokens` passes. Max 3 font families. Fonts are self-hosted.
- [ ] Preview deploys were noindex. Production is indexable and the sitemap is submitted.

---

## 14. Working rules for you (the build agent)

- **Chat with David in English. All site copy is in Spanish (es-MX).** This is his standing preference.
- Read before writing. Make small, reviewable commits and write ADRs for real decisions.
- **Never invent facts** (§1). A visible blank beats a confident guess.
- **Ask before anything outward-facing or irreversible:**
  - deploying to the production domain;
  - DNS changes;
  - sending email to real addresses (tests go only to addresses David provides);
  - signing up for any paid service (state the monthly cost in MXN);
  - publishing anything.
- **Start minimal.** David cuts clutter. Every section has to serve its page's goal (non-negotiable #1), so remove the ones that don't.
- Keep content in Markdown/MDX collections so David can edit copy without touching components.

---

## 15. Reference summary

- **Content model: backdoor.com.mx.** Geo-keyword positioning, one repeated CTA ("Haz una cita"), a lead-magnet eBook about website problems, a proof stack, a services trio, a problem→guide→services→results→urgency service-page arc, an SEO FAQ, and a contact block on every page. **Avoid:** ALL-CAPS paragraphs, vague claims, a "Nosotros" page with only names.
- **Design model: atomato.co.** A dark UI with **the same lime `#D8FD34`**, floating pill nav, glowing pill CTAs, eyebrow chips, a highlighted H1 phrase, a faint grid, numbered step cards, big stat cards, and a carousel *with a pause button*. **Avoid:** their fonts, copy, mockups and layouts.
- **Contract model:** the template + video analysis are in `research/CONTRACT_INSIGHTS.md`.

---

## 16. Open questions: seed list (copy into `docs/OPEN_QUESTIONS.md` in Phase 0)

**Batch 1 for CP0** = Q2, Q3, Q5, Q6, Q12, Q14, Q15, Q19, Q20 (Q1 is answered). Ask the rest as they become blocking.

| ID | Question | Blocks | Recommended default | Status |
|---|---|---|---|---|
| Q1 | Brand name. **Answered: AuraNova** (David, 2026-10-19). Still open: does the logo need a designed wordmark, or is "AuraNova" set in type beside the mark enough? | Logo lockup, OG images | "AuraNova" in Roboto Condensed 800 beside the mark | ✅ name · 🟡 wordmark |
| Q2 | Legal identity: persona física (which tax regime) or moral? Razón social, fiscal address? (The RFC is not published.) | Aviso de privacidad, footer, invoices | — | 🔴 |
| Q3 | Base city and service area: Monterrey? all of Mexico, remote? international? | SEO, hero eyebrow, `areaServed` | Monterrey, N.L. + remote across Mexico | 🟡 |
| Q4 | Audience details and language: es-MX only, or English too? | IA, i18n, copy | es-MX at launch; `/en/` later | 🟡 |
| Q5 | Final services list, and which one leads. | Servicios pages, nav, form | Sitios web · Rediseños · Plataformas a la medida · Mantenimiento | 🟡 |
| Q6 | Pricing model: fixed per project (how you priced LOGOS) or hourly + retainer (contract §2.1)? Show "desde $X MXN" publicly, or only budget ranges in the form? | Service pages, form budget field, contract | Fixed per project; budget ranges in the form; no public prices at launch | 🔴 |
| Q7 | Payment schedule, and IVA. | Cómo trabajamos | 40% reserve / 30% at CP1 / 30% before launch; MXN + IVA | 🟡 |
| Q8 | Response times: yours and the client's. | Hero microcopy, terms | ≤ 1 business day (you) / ≤ 3 business days (client) | 🟡 |
| Q9 | Revision rounds per phase. | Terms, Anexo A | 2 rounds per phase | 🟡 |
| Q10 | Late fee (% after N days), pause/restart fee, cancellation details. | Terms | Values must come from you or your lawyer | 🔴 |
| Q11 | Post-launch warranty, training, maintenance plans (scope + price). | Terms, Mantenimiento page | 30-day bug fixes + 1 training session; plans TBD | 🟡 / 🔴 |
| Q12 | Portfolio permissions: can we show LOGOS? FERREMAG (local demo, not live)? Other past work? Any testimonials? | Proyectos, proof strip | Ask both clients in writing; until then, no names | 🔴 |
| Q13 | Photos: a headshot and workspace photos? | Nosotros, hero | — | 🔴 |
| Q14 | Voice: "nosotros" (studio) or "yo" (personal brand)? Is it only you, or are there partners/collaborators? | All copy | — (decide before CP1 copy) | 🔴 |
| Q15 | Channels: business email (on the domain?), WhatsApp number, phone, which social networks, show a physical address? | Contacto, footer, JSON-LD | Domain email + WhatsApp button; no street address | 🔴 |
| Q16 | Booking tool and call length. | Contacto | Cal.com, 30 min, Mon–Fri 9–17 slots | 🟡 |
| Q17 | Lead magnet (the 15 no negociables checklist PDF)? Gated by email or not? | Recursos | Yes, ungated at launch | 🟡 |
| Q18 | Analytics. | Consent / cookie banner | Cookieless (Cloudflare Web Analytics) | 🟡 |
| Q19 | Domain name, and hosting. Does David already own an AuraNova domain (.com / .mx / .com.mx)? If not, check availability and present options; buying one needs his OK. | Deploy, emails | Render static + an AuraNova domain | 🔴 |
| Q20 | Will you update the contract per `CONTRACT_INSIGHTS.md` §3 before launch? Which version is canonical (a lawyer-reviewed Spanish version)? | Cómo trabajamos | Yes; Spanish version for Mexican clients | 🔴 |
| Q21 | Real numbers for social proof: years in web development, projects delivered? | Proof strip | Omit until real | 🔴 |
| Q22 | Blog at launch? | IA | No; add it later | 🟡 |
