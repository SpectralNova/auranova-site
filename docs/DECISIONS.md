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

## ADR-003 · Contact form: own function + transactional email
- **Status:** Proposed (CP0) · 2026-10-19 · depends on Q15, Q19
- **Decision:** the form posts to a Pages Function (`/api/contacto`) that validates the fields, checks a honeypot and a minimum fill time, rate-limits per IP, then sends two emails through a transactional email API (e.g., Resend): the lead to David, and the es-MX auto-reply to the visitor. **No database**: the data lives only in David's inbox and in the provider's delivery logs. Turnstile is added only if spam appears.
- **Options:**
  - **Own function + email API** ✓: no third-party form branding; data minimization; the auto-reply copy is ours.
  - **Form service (Formspree, Web3Forms…)**: works with any host, but stores submissions with a third party, and auto-replies usually sit on paid tiers.
  - **mailto: only**: rejected; the brief requires a form with consent and validation.
- **Why:** less personal data held in fewer places (non-negotiable #13 and the aviso). The aviso lists Cloudflare and the email provider as processors (encargados).
- **Needs:** the destination email (Q15); the domain (Q19) for the sender's SPF/DKIM records. Sign-up waits for David's OK and an MXN cost check.

## ADR-004 · Booking: link out at launch
- **Status:** Proposed (CP0) · 2026-10-19 · tool ✅ Cal.com (Q16)
- **Decision:** every "Agenda una llamada" CTA opens the Cal.com booking page directly, with `cta_click` + `booking_open` tracked on our side. No third-party script on any page, so the CSP stays tight. Cal.com shows each visitor the slots in their own time zone (useful for US clients). Until the account exists, CTAs go to `/contacto/#agenda`.
- **Options:** **link-out** ✓ · embed loaded on click (adds JS and a CSP exception, but keeps visitors on the site and can report `booking_complete`).
- **Why:** start minimal. If the data later shows drop-off between `booking_open` and a booked call, switch to the on-click embed.
- **Trade-off:** no `booking_complete` event at launch; count bookings in Cal.com instead.

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
- **Status:** Implemented for CP1.1 · 2026-10-19
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
