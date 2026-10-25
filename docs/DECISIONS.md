# Decisions (ADRs)

*Short records: decision, options, why. "Proposed" = waiting for David at a checkpoint; "Accepted" = approved.*

---

## ADR-001 · Stack: Astro, static output
- **Status:** Proposed (CP0) · 2026-10-19
- **Decision:** Astro (current stable, 7.x) with static output, TypeScript, content collections (services, projects, FAQ) and MDX. Plain CSS on top of the design system's `tokens.css` + `components.css`, copied into `src/styles/`. No UI framework. The little JavaScript the site needs (mobile menu sheet, booking click tracking, form enhancement) is small vanilla scripts.
- **Options:**
  - **Astro** ✓: zero JS by default; typed content schemas; `astro:assets` makes AVIF/WebP with dimensions; static HTML that any host serves.
  - **Next.js** (the LOGOS stack): David knows it, but the React runtime alone exceeds the 30 KB JS budget per page (brief §13). Only worth it if a feature needs a server, and none does.
  - **Eleventy / hand-written HTML:** also zero-JS, but no typed content collections or image pipeline out of the box.
- **Why:** speed is part of the pitch; Lighthouse ≥ 95 ×4 and ≤ 30 KB JS are easiest with HTML-first output. Content in Markdown lets David edit copy without touching components.

## ADR-002 · Hosting: Cloudflare Pages
- **Status:** **Accepted** (Q19, 2026-10-19). Note: vistaconsulting.mx, David's own published build, is already Astro served by Cloudflare.
- **Decision:** host the static build on Cloudflare Pages (free plan). The build reads `SITE_ENV`, which **defaults to `preview`**. Any build that isn't explicitly `SITE_ENV=production` adds `<meta name="robots" content="noindex">` and writes `X-Robots-Tag: noindex` into `_headers` (the LOGOS `SITE_NOINDEX` idea, made fail-safe: forgetting the variable can't make a preview indexable). Security headers (HSTS, CSP, Referrer-Policy, Permissions-Policy) also live in `_headers`. Production only at CP3.
- **Options:**
  - **Cloudflare Pages** ✓: static sites don't spin down; `_headers` file; Pages Functions for the form endpoint (ADR-003); Turnstile in the same account if spam appears.
  - **Render static** (the brief's default): David already uses Render, and its static sites support custom headers. But static sites can't run server code, so the form would need an extra third-party service.
  - **Netlify:** comparable; no advantage here over Cloudflare.
- **Why:** one free account covers hosting, headers and the form function. The domain can be registered anywhere and pointed at it.
- **Needs from David:** a Cloudflare account (free) connected to the GitHub repo. That's a dashboard step; there's no CLI on this machine.
- **Update 2026-10-20:** David connected the repo as a Cloudflare **Workers** project (deploy command `npx wrangler deploy`), the successor to Pages. With no config in the repo, Wrangler auto-installed Astro's server adapter, and its prerender crashed. Fix: a committed `wrangler.jsonc` declares a **static-assets-only Worker** (`assets.directory: ./dist`, `404-page`, `force-trailing-slash`), so nothing gets added. Verified locally with `wrangler deploy --dry-run` and `wrangler dev`: headers from `_headers` applied, 404 page with a 404 status, `/x` → `/x/`.

## ADR-003 · Contact form: own function + transactional email
- **Status:** Proposed (CP0) · 2026-10-19 · depends on Q15, Q19
- **Decision:** the form posts to a Pages Function (`/api/contacto`) that validates the fields, checks a honeypot and a minimum fill time, rate-limits per IP, then sends two emails through a transactional email API (e.g., Resend): the lead to David, and the es-MX auto-reply to the visitor. **No database**: the data lives only in David's inbox and in the provider's delivery logs. Turnstile is added only if spam appears.
- **Options:**
  - **Own function + email API** ✓: no third-party form branding; data minimization; the auto-reply copy is ours.
  - **Form service (Formspree, Web3Forms…)**: works with any host, but stores submissions with a third party, and auto-replies usually sit on paid tiers.
  - **mailto: only**: rejected; the brief requires a form with consent and validation.
- **Why:** less personal data held in fewer places (non-negotiable #13 and the aviso). The aviso lists Cloudflare and the email provider as processors (encargados).
- **Needs:** the destination email (Q15); the domain (Q19) for the sender's SPF/DKIM records. Sign-up waits for David's OK and an MXN cost check.
- **Update (2026-10-20, setup checklist):** the function runs on the Cloudflare Worker (ADR-002 deploy) and, besides the two emails (Resend, from contacto@auranova.mx ✅), it submits each lead to **HubSpot Free** through the Forms API (portal **52196836**, form ID pending), so leads can be followed up and matched to Meta ads. HubSpot therefore becomes a processor (encargado) with an international transfer: the aviso de privacidad must list it. Field map (site → HubSpot): nombre → firstname + lastname (split on the first space), correo → email, empresa → company, sitio → website, tipo → `servicio_de_interes` (dropdown; values `sitio_web`, `plataforma`, `posicionamiento`, `contenido_marca`, `mantenimiento`, `asesoria`, `no_seguro`, in the site's option order), presupuesto → `presupuesto_aproximado` (text until Q6), mensaje → message, and the landing URL's UTM tags → `utm_source` / `utm_medium` / `utm_campaign` / `utm_content`. No phone field (the site doesn't ask for one). Created through the HubSpot connector on 2026-10-20 (David approved), along with the deal pipeline "Pipeline de ventas": Nuevo lead `1464204206` → Llamada agendada `1464204207` → Propuesta enviada `1464204208` → Ganado `1464204209` / Perdido `1464204210`.
- **Update 2 (2026-10-20):** HubSpot's form editor needs a paid plan, and new accounts can no longer create legacy private apps (HubSpot changelog, sunset 2026-09-28 for accounts created after that date). New plan: the Worker writes leads with the **CRM API** (upsert the contact by email, then create a deal in "Nuevo lead" with the message as a note), authenticated by a HubSpot **service key** (scopes: contacts read/write, deals read/write) stored as the Cloudflare secret `HUBSPOT_SERVICE_KEY`; David creates it and pastes it only in Cloudflare. Service key ✅ created by David on 2026-10-20 (free plan has them); account currency switched to MXN ✅.
- **Update 3 (2026-10-21, built after the pre-launch audit):** `worker/` (index, lead, hubspot, email) runs only for `/api/*` (`run_worker_first`); everything else stays static. Checks, in order: same origin, size, honeypot, minimum fill time (3 s), fields, **Turnstile** (added now: an auto-reply to any typed address is an abuse path). Then HubSpot (contact upsert by email, deal in «Nuevo lead», note), the lead email to contacto@ (linking the deal, or saying to add it by hand) and the auto-reply (template 1 + the Contacto signature; greets by first name only when it looks like one, never repeats free text). The visitor sees success if the lead reached the inbox **or** HubSpot. Turnstile loads on the first interaction with the form, never on page load; the CSP allows only `challenges.cloudflare.com` for it. Optional «novedades» box (aviso §3.2) → contact property `acepta_novedades`. The visit's origin (utm_*, landing page, referrer) is kept in sessionStorage by the layout. **Rate limiting:** the Workers binding's Free-plan availability isn't documented, so it's left out; at launch, one zone rate-limiting rule on `/api/contacto` (Free plan includes one). Tests: `npm run test:worker` (mocked services) + the Playwright form tests (stubbed Turnstile and Worker); verified end to end with `wrangler dev` and Cloudflare's Turnstile test keys. Local secrets go in `.dev.vars` (git-ignored).
- **Live (2026-10-21):** David created the Resend domain + key, the Turnstile widget (Managed; site key in `src/lib/env.ts`) and the three Cloudflare secrets; HubSpot property `acepta_novedades` created (David approved).

## ADR-004 · Booking: link out at launch
- **Status:** Proposed (CP0) · 2026-10-19 · tool ✅ Cal.com (Q16)
- **Decision:** every "Agenda una llamada" CTA opens the Cal.com booking page directly, with `cta_click` + `booking_open` tracked on our side. No third-party script on any page, so the CSP stays tight. Cal.com shows each visitor the slots in their own time zone (useful for US clients). Until the account exists, CTAs go to `/contacto/#agenda`.
- **Options:** **link-out** ✓ · embed loaded on click (adds JS and a CSP exception, but keeps visitors on the site and can report `booking_complete`).
- **Why:** start minimal. If the data later shows drop-off between `booking_open` and a booked call, switch to the on-click embed.
- **Trade-off:** no `booking_complete` event at launch; count bookings in Cal.com instead.
- **Update (David, 2026-10-20):** every "Agenda una llamada" CTA now goes to `/contacto/#agenda` (`cta_click`). That block offers two choices: **Agenda una llamada** (lime, opens Cal.com, `booking_open`) *o* **Envíanos un correo** (dark, `mailto:contacto@auranova.mx`, `email_click`). Call slots in Cal.com: Mon 13:00–15:00; Tue–Fri 10:00–12:00 and 13:00–15:00 (Mexico City), 30-minute buffer.

## ADR-005 · "Nuestro estándar" scores are measured, never typed
- **Status:** Proposed (CP0) · 2026-10-19
- **Decision:** an `npm run measure` script runs Lighthouse (mobile, 3 runs, median) against the deployed preview for Inicio, a Servicio, Cómo trabajamos and Contacto, and writes `src/data/scores.json` with the URL, date and Lighthouse version. The page renders that file and prints "Medido el {fecha}". A production build fails if the file is older than 30 days or any published score is below what the page claims.
- **Why:** a page can't measure itself while it's being built, so we measure the last deploy and print the date. That's honest and checkable.
- **Note:** INP is a field metric that Lighthouse can't measure in the lab (it reports TBT). The page says so, and adds field data after launch once there's enough traffic.

## ADR-006 · One source of truth for facts and blanks
- **Status:** Proposed (CP0) · 2026-10-19
- **Decision:** `src/content/business.ts` exports every business fact (name, hours, timezone, channels, legal identity, service area). A fact is either a confirmed value, `confirm(value, note)` (🟡) or `pending(question)` (🔴). A `<Fact>` component renders 🟡/🔴 values as `.pending` markers (`[[CONFIRMAR: …]]` / `[[PENDIENTE: …]]`). Footer, contact page, JSON-LD, the auto-reply and Cómo trabajamos all read hours from the same object. `check:pending` scans `dist/` and fails a production build on any marker.
- **Why:** an answer from David changes one line and propagates everywhere, and no unapproved fact can ship.

## ADR-007 · Bilingual site: Spanish at `/`, English at `/en/`
- **Status:** ⏸ **On hold** (David, CP1 feedback 2026-10-19: English and US work on hold). The routing stays wired, with no English pages built, so it costs nothing until it's needed.
- **Decision:** Astro's built-in i18n routing, with `es` as the default locale (no prefix) and `en` under `/en/`. English slugs are translated (`/en/how-we-work`). Each page declares its counterpart, so the language link and the `hreflang` pairs (`es-MX`, `en-US`, `x-default` → Spanish) always point to the real equivalent. Copy lives in one content file per page per language; facts (hours, email, services) come from `business.ts` with a label per language. There's no redirect by browser language: it annoys visitors and confuses crawlers.
- **Options:** **one domain, path prefix** ✓ · subdomain (`en.`) · a separate English domain. The prefix keeps one site, one deploy and one domain's authority (see Q28 on .mx and US search).
- **Hours in English:** "Mon–Fri, 9 a.m.–5 p.m. Monterrey time (UTC−6)". Monterrey has no daylight saving time since 2022, so it matches US Central only in winter; Cal.com converts slots for each visitor.
- **Timing:** Q26. The routes are wired at CP1; English copy comes at CP2.

## ADR-008 · Media and motion (CP1 feedback: "more images, icons and animations, like atomato.co")
- **Status:** Implemented for CP1.1 · 2026-10-19 · **CP1.2:** the 3D art and the floating motion are retired (David); see ADR-011 and docs/ASSETS.md.
- **Images:** brand illustrations generated with Artlist (GPT Image 2.5, transparent backgrounds) in one 3D glass/ceramic style and the brand palette. They're served as AVIF/WebP at the needed sizes (`docs/ASSETS.md`). No stock photos, no AI people or fake places.
- **Icons:** Lucide (UI) and Simple Icons (tool logos), inlined at build time. That adds 0 KB of JavaScript.
- **Motion:** only `transform` and `opacity` (DESIGN_SYSTEM §5), all disabled with `prefers-reduced-motion`:
  - floating art;
  - "buffer" bars that fill to the real measured values;
  - section reveal driven by scroll position (pure CSS; browsers without support simply show everything);
  - mockups animated inside the process tabs.
- **Autoplay:** the process tabs auto-advance only while visible. They have a progress bar, a pause button and keyboard support; choosing a step stops autoplay (WCAG 2.2.2, non-negotiable #13). There's no autoplay video anywhere.
- **Cost:** the whole site ships about 3 KB of JavaScript. Lighthouse stays at 100 ×4 (`src/data/site-scores.json`).

## ADR-009 · A short home; one page per service
- **Status:** Implemented for CP1.1 · 2026-10-19 (David's CP1 feedback)
- **Decision:** the home has only the essentials, like backdoor.com.mx: hero → what we do (6 service cards) → how we do it (process tabs) → book a call. The problems, the standard, "todo por escrito" and the FAQ moved to the service pages and Cómo trabajamos. The nav's "Servicios" opens a menu with each service's page.
- **Positioning:** small and mid-sized business owners looking for fast, affordable, reliable websites **and advice**. The city appears only on Nosotros; the hero carries no city or country.

## ADR-010 · The violet CTA band is retired
- **Status:** Implemented for CP1.2 · 2026-10-20 (David's CP1.1 feedback)
- **Decision:** no page ends in a violet band. The closing call to action lives inside the last section (`CtaBlock`: an optional title line, the button, a short note). On the home it replaces the "Conoce todos los detalles" link, with "Te decimos qué necesitas y qué no." under it.
- **Consequence:** the DS still has `.theme-violet`; the site no longer uses it. Section.astro keeps the option.

## ADR-011 · Scroll storytelling without scroll-jacking; every demo pausable
- **Status:** Implemented for CP1.2 · 2026-10-20 (David: TypeSomething's product page for Servicios, piergorelli.com for Cómo trabajamos)
- **Native scroll, always:** effects follow the scroll position through CSS scroll-driven animations (`src/styles/motion.css`): rise-ins, the mosaic that grows into place, parallax art, the process rail that fills. (The capability ticker was removed in CP1.4: it repeated the titles of the tiles below it.) (The word-reveal statement on Cómo trabajamos was removed in CP1.3 at David's request.) They move only when the visitor scrolls. Browsers without support and `prefers-reduced-motion` get the static layout.
- **The roadmap pins, it doesn't hijack:** on desktop (≥1024 × ≥700 px, JavaScript on) Cómo trabajamos keeps a stage in view with `position: sticky` while the page scrolls past it; the step follows the scroll position. The page never moves by itself; the stage tabs are buttons that jump to a step. Phones, short screens and no-JS get a plain timeline with every step.
- **Timed animation = pausable:** the hero and service demos loop, so each one plays only while on screen, has a pause button whose label says what it will do (WCAG 2.2.2), and shows its final frame with reduced motion (`src/lib/demo.ts`). Nothing else runs longer than 5 s: the Nosotros stars twinkle ~4.5 s and rest; its sky moves with the pointer and the scroll only.
- **Honesty:** demos use a generic "Tu negocio". Any demo with numbers is labelled "Datos de ejemplo"/"Ejemplo" and carries a footnote (docs/CLAIMS.md). The quality report on Sitios web is the only real number set, and it comes from `npm run measure`.
- **Cost:** about 6 KB of JavaScript in total (demos, roadmap, parallax, menu, tabs). Lighthouse mobile: 99–100 performance on every page.

## ADR-012 · Design system v1.3 (and v1.4)
- **Status:** Approved by David (CP1.2 review, "Q30: Recommended") and applied 2026-10-20: changed upstream first (`Resources/AuraNova/Design System/`, changelog bumped), then `npm run sync:ds`. The local stand-ins are gone.
  1. **`.tag` on light backgrounds** measured 4.43:1 (violet-5 on its own 20% tint, 12 px) → text in `--color-link-hover` (violet-6), ≈ 8:1.
  2. **`.theme-dark` utility**: the dark semantic tokens inside a light section (the service demos are dark product windows).
  3. **`--font-mono`**: the system monospace, never downloaded, only for code and terminal text inside mockups. The 3-family rule is unchanged.
- **v1.4 (2026-10-23, Q37, approved by David):** found by Impeccable, applied upstream first and then synced the same way.
  1. `--measure` goes from 68ch to 54ch, so body lines hold 60–75 characters (non-negotiable #7).
  2. `.skip-link:hover` keeps lime-7 (it was 1.3:1).
  3. `p, li { text-wrap: pretty; }`.

## ADR-013 · Options decided; the alternatives are retired
- **Status:** Implemented for CP1.3 · 2026-10-20
- **Decision:** hero animation **A** (Q34) and illustration style **A** (Q35). HeroWorks keeps only A, the illustrations live at `src/assets/generated/services/<art>.webp`, and the preview-only `/opciones/` page is gone, with hero variants B/C and styles B/C. Git history keeps all of it.

## ADR-014 · 4K-sharp backgrounds by local AI upscaling
- **Status:** Implemented for CP1.3 · 2026-10-20 (David: "the banners are blurry in high resolutions")
- **Decision:** the six service backgrounds and the Nosotros constellation were upscaled ×4 locally with Real-ESRGAN x4plus (ONNX on the CPU, tiled), from the original generations. The art stays identical and no credits were spent; banners are 4352 × 2432 and the constellation 4608 × 3072, enough for a 4K screen at 2×. Astro serves AVIF/WebP from 640 px up, so phones still download small files; Lighthouse stays at 99–100.

## ADR-015 · Cookie consent: our own banner, Zaraz's consent API
- **Status:** Built (preview) · 2026-10-21 · wires up at launch (step 07)
- **Decision:** `CookieConsent.astro`: one optional purpose, **«Publicidad»** (the Meta Pixel, which runs only through Cloudflare Zaraz, Q18). Small, non-blocking card at the bottom (full width on phones, right on desktop), no overlay; «Aceptar» and «Rechazar» the same size; «Preferencias de cookies» in the footer reopens it with the current choice. The choice is kept in `localStorage` (`au_consent`, versioned: bump `VERSION` to ask again) and handed to Zaraz with `zaraz.consent.setAll()` + `sendQueuedEvents()`. Events go through `window.auTrack` → `zaraz.track()`: `booking_open` (the Cal.com button on /contacto/) and `form_submit` (form sent); Zaraz drops them without consent. No personal data in events.
- **Why not Zaraz's own modal:** the site's design and accessibility bar (tested: keyboard order, focus return, Esc), and Nosotros promises no pop-up tricks. Site analytics stay cookieless (Q18), so they need no consent.
- **Step 07 (launch, Zaraz on auranova.mx):** enable Consent management with **one** purpose, «Publicidad» (`setAll` assumes one: add purpose ids if more appear), and hide Zaraz's default modal; add the Facebook Pixel tool (dataset 2078766606859398 + Conversions API token pasted by David) under that purpose; triggers: Pageview → PageView, event `booking_open` → Schedule, event `form_submit` → Lead. Check that Zaraz's injected script passes the CSP (`script-src 'self'`).

## ADR-016 · Social profiles: plain links, never a dead one
- **Status:** Built (preview) · 2026-10-22
- **Decision:** `SocialLinks.astro` renders AuraNova's profiles from `business.ts` (`social`, Q15) as plain links with Simple Icons glyphs.
  - **Where:** in the nav bar from 1200 px, in the menu sheet below 1024 px, and in the footer. The JSON-LD organization lists them in `sameAs`.
  - **Size:** 44 px round targets (PHILOSOPHY §7 #15).
  - **No third parties:** no embeds, widgets or scripts, so the CSP and the «no third-party script on page load» rule are untouched.
  - **Missing link:** a profile whose link is still 🔴 (YouTube) shows as a dimmed «próximamente» placeholder in previews. Indexable and production builds leave it out instead of failing, so the live site never has a dead link.
  - **Clicks** fire `social_click`, which Zaraz ignores unless it's mapped.

## ADR-017 · The checklist PDF is generated from the standard's data
- **Status:** Built (preview) · 2026-10-22
- **Decision:** the 15 are written once, in `src/content/pages/es/estandar.yaml`. Each item has `forYou`, `how` (with the PHILOSOPHY §7 thresholds) and `check` (the owner's yes/no question).
  - **Pages:** /estandar/ and /recursos/ read the file at build time.
  - **PDF:** `npm run checklist` (`scripts/checklist-pdf.mjs`, Playwright + Edge, like the OG image) writes three things:
    - the PDF, to `public/recursos/`;
    - a cover preview, to `src/assets/generated/`;
    - a fingerprint of the data, to `src/data/checklist.json`.
  - **Guard:** `npm run build` starts with `check-checklist.mjs`, which fails when the YAML changed after the PDF was made. The page and the PDF can't drift apart (the brief: "the two never disagree").
  - **Why committed:** Cloudflare's build has no browser to print the PDF.

## ADR-018 · Impeccable: design detector and DESIGN.md
- **Status:** Adopted · 2026-10-23
- **Decision:** Impeccable 4.7.0 (pbakaus/impeccable, Apache-2.0) is installed as a **global** Claude skill (`~/.claude/skills/impeccable`, with its 4 agents in `~/.claude/agents`). Its automatic **hook runs in this project only**.
  - **Registration:** `.claude/settings.local.json` (git-ignored) calls the global launcher through `$HOME`, so the 22 MB skill isn't copied into the repo.
  - **When it runs:** after each Edit/Write on UI files it reports mechanical problems (overflow, contrast, glow, drift from the design system); at the end of each turn it runs a deeper pass. It reports and never blocks.
  - **Turn it off:** `/impeccable hooks off`.
- **Design context:** `DESIGN.md` (root) and `.impeccable/design.json` describe the incumbent system, derived from the brand master in `Resources/AuraNova/Design System` v1.3, which wins any disagreement. Creative north star: «The Night Observatory» (David, 2026-10-23).
- **Exceptions** (`.impeccable/config.json`, each with its reason): the three brand fonts, and the hero grid in `components.css`. Nothing else is silenced.
- **Calibration (2026-10-23):** in a real browser, its contrast and padding warnings didn't reproduce (axe agrees). The useful findings went to Q37. Its taste rules flag brand choices on purpose (lime glow, eyebrow chips, icon tiles): treat those as advisory, never as orders.

## ADR-019 · The free diagnosis: a second form on the same pipeline
- **Status:** Built (preview) · 2026-10-23 · archive DEC-0005
- **What it is:** `/diagnostico-gratis/` is the ads' offer: 4 a month, presented in the free 30-minute call, then a PDF.
  - Not in the nav: ads and chosen links lead there.
  - Its form posts to **`/api/diagnostico`**, the same Worker pipeline as `/api/contacto`: origin, size, honeypot, fill time, fields, Turnstile → HubSpot → lead email → auto-reply.
  - `worker/lead.ts` gains a `kind`. A diagnosis requires the business and a website address (with or without https://, the same rule in the browser and the Worker), and is filed under `asesoria`, where audits live.
- **No HubSpot changes:** the deal is «Diagnóstico gratis · {negocio}» in the existing «Nuevo lead» stage. A dedicated stage can come later, with David's approval.
- **The monthly cap is kept by hand:**
  - David confirms each slot (email template 23) or holds next month's first one (template 24). The page says so, with no counter and no fake urgency.
  - The auto-reply has no booking link: the call is booked once the slot is confirmed.
- **Shared form logic:** the contact page's form script moved to `src/lib/lead-form.ts`, scoped to its own `<form>` (status, Turnstile slot), and both forms use it. `form_submit` now carries `{ form: 'contacto' | 'diagnostico' }`; Zaraz maps both to Lead at launch.
- **Reports** are made in the business archive: `diagnostico-medir.mjs` (Lighthouse 13.5, the median of 3 runs on phone and desktop, plus the basics) and the generator's `diagnostico` type, which reads the 15 from this repo's `estandar.yaml`.
- **Also fixed:** with Edge 155, chrome-launcher can't read a dynamic debugging port. `scripts/lighthouse.mjs` now picks a free port first.

## ADR-020 · Production only from `main` behind a launch switch; every other branch is a preview
- **Status:** Built · 2026-10-24 · flips at CP3 (docs/LAUNCH.md)
- **Decision:** `site-env.mjs` holds the one rule. `astro.config.mjs`, `src/lib/env.ts` and `scripts/check-pending.mjs` read it.
  - **Production** needs both the `main` branch (Workers Builds sets `WORKERS_CI_BRANCH`) and `SITE_ENV=production`, a build variable David sets on the Worker at CP3. Until then `main` keeps building the noindex preview.
  - **Any other branch** builds a preview, whatever `SITE_ENV` says. Local builds have no branch variable and follow `SITE_ENV` as before.
  - **`SITE_INDEXABLE`** is for local Lighthouse runs only and is ignored on Cloudflare.
  - **The production canonical** is always `https://auranova.mx`, even if a `SITE_URL` build variable is left over from the preview days.
- **Why:**
  - After launch every push to `main` goes live, so changes need a hidden place to be reviewed first.
  - Build variables apply to every branch, so no setting can be allowed to publish a branch or index a preview.
- **Previews after launch:**
  - Work on the `preview` branch, or any other.
  - With «Enable Preview Builds» on (Worker → Settings → Build → Branch control), Cloudflare builds the branch and serves it on a workers.dev Version URL, noindex.
  - Cloudflare's branch previews are new and have open bug reports (October 2026). If they misbehave, review locally (`npm run build` + `npm run preview` or `npm run screenshots`), then merge.
- **Tested 2026-10-24:**
  - An 8-case matrix of branch × `SITE_ENV` × `SITE_INDEXABLE`.
  - A real branch build with `SITE_ENV=production` came out as a preview: `X-Robots-Tag: noindex`, robots `Disallow: /`, a noindex meta, no HSTS.
  - `main` with `SITE_ENV=production` is refused while the 4 legal blanks remain.
