# Open questions

*Seeded 2026-10-19 (Phase 0) from `WEBSITE_PROMPT.md` §16, plus new items found along the way. Batch 1 answered 2026-10-19; CP1 feedback received 2026-10-19 (CP1.1 built); CP1.1 feedback received 2026-10-20 (CP1.2 built).*
*Protocol: brief §1. When David answers, update the source of truth first (facts → `src/content/business.ts`; terms → `docs/PHILOSOPHY.md`), then the status here and in brief §16.*

✅ answered · 🟡 proposed default (build with it, not approved) · 🔴 unknown (David must supply)

## Index

| ID | Topic | Status | Next ask |
|---|---|---|---|
| Q1 | Brand name / wordmark | ✅ | — |
| Q2 | Legal identity | ✅ persona física · 🔴 domicilio | CP1.1 |
| Q3 | City and service area | ✅ (city only on Nosotros) | — |
| Q4 | Audience scope + language | ⏸ EN + US on hold | — |
| Q5 | Services list | ✅ 6 services (CP1) | — |
| Q6 | Pricing model | ✅ model · 🔴 budget brackets | CP1.1 |
| Q7 | Payment schedule + IVA | ✅ | — |
| Q8 | Response times | ✅ | — |
| Q9 | Revision rounds | ✅ | — |
| Q10 | Late payment, pause, cancellation | ✅ late payment · 🟡 rest | CP1.1 |
| Q11 | Warranty, training, maintenance | ✅ warranty/training · 🔴 plans | CP2 |
| Q12 | Portfolio permissions | ✅ · 🟡 Vista in writing | CP1.1 |
| Q13 | Photos | ✅ none; company, not person | — |
| Q14 | Voice | ✅ nosotros | — |
| Q15 | Channels | ✅ email · 🟡 my reading | CP1.1 |
| Q16 | Booking tool | ✅ Cal.com · ✅ 30 min · 🟡 buffers | CP1.2 |
| Q17 | Lead magnet | ✅ | — |
| Q18 | Analytics | 🔴 TBD | before CP2 |
| Q19 | Domain + hosting | ✅ (purchase after Q23) | — |
| Q20 | Contract update | ✅ will update · 🔴 version | CP2 |
| Q21 | Social-proof numbers | ✅ omit | — |
| Q22 | Blog at launch | ✅ no | — |
| Q23 | Trademark check | ✅ run | see result |
| Q24 | Upstream docs: logo file names | ✅ fixed | — |
| Q25 | Typical timelines | ✅ interim answer · 🔴 details later | — |
| Q26 | English: when | ⏸ on hold | — |
| Q27 | US clients: currency, contract, invoicing | ⏸ on hold | — |
| Q28 | Domain vs. US search | ⏸ on hold (keep .mx) | — |
| Q29 | US positioning | ⏸ on hold | — |
| Q30 | Design-system fixes found in the build | ✅ done (DS v1.2) | — |
| Q31 | Service scopes and drafted policies | 🟡 new | CP1.1 |
| Q32 | Hero tagline + service H1s | ✅ kept (CP1.1 review raised no change) | — |
| Q33 | AI image license (Artlist) | 🟡 | CP1.2 |
| Q34 | Home hero animation (A / B / C) | 🟡 new · A in place | CP1.2 |
| Q35 | Service illustration style (A / B / C) | 🟡 new · A in place | CP1.2 |
| Q36 | Is the 30-minute call free? | 🔴 new | CP1.2 |

**Batch for CP1.2** (most blocking first): Q34, Q35, Q36, Q31, Q12, Q15, Q10, Q6, Q2, Q33. Before CP2 as well: Q18 (analytics) and Q11 (maintenance plans).

---

## Q1 · Brand name and wordmark
- **Question:** Designed wordmark, or "AuraNova" set in type beside the mark?
- **Status:** ✅ · **Answer:** AuraNova (one word, capital A and N); type lockup in Roboto Condensed 800 beside the mark (`.nav__logo`). · **Date:** 2026-10-19

## Q2 · Legal identity
- **Question:** Persona física or moral? Name or razón social, address for legal notices?
- **Answer:** ✅ **persona física**. (2026-10-19)
- **Still open 🔴:** tax regime (for invoices; not published) and a **domicilio** for the aviso de privacidad.
- **Consequence:** as a persona física, the aviso and the términos name **you** (David Contreras Morales) as the responsible party, with "AuraNova" as the commercial name, even though every marketing page speaks as a company (Q13, Q14). The lawyer confirms the exact wording.

## Q3 · City and service area
- **Status:** ✅ · **Answer:** Monterrey, N.L. + remote across Mexico. · **Date:** 2026-10-19
- **CP1 feedback (2026-10-19):** the city and country appear **only on Nosotros**: not in the hero, titles, service H1s, footer or FAQ. The invisible JSON-LD address keeps Monterrey for local search. Hours say "hora del centro".

## Q4 · Audience scope and language
- **Answer (CP0):** Spanish and English, MX and US clients. · **Update (CP1 feedback, 2026-10-19):** ⏸ **English and everything US-related are on hold**, because the .mx domain is Mexico-targeted (Q28).
- **Consequence:** the site is es-MX only. The `/en/` routing stays wired with no pages (ADR-007 on hold). Audience: owners of small and mid-sized businesses in Mexico.

## Q5 · Services list
- **Answer (CP0):** three services. · **Update (CP1 feedback, 2026-10-19):** ✅ "include our whole capabilities". There are now **six services**, each with its own page and a place in the nav menu:
  1. Sitios web (nuevos, rediseños, tiendas)
  2. Plataformas a la medida
  3. Posicionamiento en Google
  4. Contenido y marca
  5. Mantenimiento y soporte
  6. Asesoría digital (the "counsel")
- **Positioning ✅:** small and mid-sized business owners looking for fast, affordable, reliable quality websites and advice. No big corporate clients.

## Q6 · Pricing model
- **Answer:** ✅ fixed price per project against Anexo A; budget ranges in the form; no public prices at launch. (2026-10-19)
- **Still open 🔴:** the budget brackets for the form, in MXN, and in USD for the English form if Q27 says USD.

## Q7 · Payment schedule and IVA
- **Status:** ✅ · **Answer:** 40% to reserve / 30% at design approval (CP1) / 30% before launch; amounts in MXN + IVA. (US clients: Q27.) · **Date:** 2026-10-19

## Q8 · Response times
- **Status:** ✅ · **Answer:** ≤ 1 business day (us) / ≤ 3 business days (client; otherwise the schedule moves). · **Date:** 2026-10-19

## Q9 · Revision rounds
- **Status:** ✅ · **Answer:** **1 round per phase** as the base. · **Date:** 2026-10-19
- **My reading (🟡):** extra rounds are possible and go through the change-request process (estimate → approval).

## Q10 · Late payment, pause and cancellation
- **Answer:** ✅ if a payment is late, **the project pauses until the payment arrives**. (2026-10-19)
  - *Internal only, never published:* for referrals or people David knows personally, this can be relaxed case by case. The site states only the rule.
- **Still 🟡, to confirm at CP1:**
  - No late-fee percentage: the pause replaces it. Recommended: yes.
  - Client-requested pauses: no restart fee; a new date is agreed when they're ready. Recommended: yes, keep it simple.
  - Cancellation: 15 days' notice, work done is billed, and the 40% deposit is non-refundable once onboarding starts (contract §3 + CONTRACT_INSIGHTS §3.7). Recommended: yes.

## Q11 · Warranty, training, maintenance
- **Answer:** ✅ 30-day bug-fix warranty after launch + 1 training session. (2026-10-19)
- **Still open 🔴:** maintenance plans (scope, price, response time). Needed before the Mantenimiento page is written (CP2).

## Q12 · Portfolio permissions
- **Answer:** ✅ (2026-10-19)
  - **vistaconsulting.mx:** published; 100% David's work. Can be shown now. (Built with Astro, served by Cloudflare.)
  - **LOGOS** and **FERREMAG:** can be shown (logos and cases) **once each is published**.
- **Consequence:** /proyectos is built at launch with Vista Consulting, and "Proyectos" stays in the main nav.
- **To confirm 🟡:** Vista's OK in writing (an email or WhatsApp message from them is enough), covering their name, logo, screenshots and the measured numbers.

## Q13 · Photos
- **Status:** ✅ · **Answer:** no headshot or workspace photos. AuraNova presents itself as a company, not a person. · **Date:** 2026-10-19
- **Consequence:** Nosotros is about the studio (mission, values, method), not a personal story. David's name appears only where the law requires it (Q2).

## Q14 · Voice
- **Status:** ✅ · **Answer:** "nosotros" (studio voice); clients addressed as "tú". · **Date:** 2026-10-19

## Q15 · Channels
- **Answer:** ✅ the website's channel is a **business email on the domain**, set up once the domain is bought. WhatsApp is an option later in the relationship. (2026-10-19)
- **My reading (🟡, confirm at CP1):** the site shows **no WhatsApp button** at launch, only the email + booking + form. No phone, no street address, and no social networks at launch (you didn't name any).
- **Consequence:** the `whatsapp_click` event is dropped.

## Q16 · Booking tool
- **Answer:** ✅ Cal.com. (2026-10-19) ✅ The call lasts **30 minutes** (2026-10-20; `duracionLlamada` in `business.ts`).
- **Still 🟡:** 15-minute buffers, Mon–Fri 9:00–17:00 `America/Monterrey`; link out at launch (ADR-004). Cal.com shows each visitor the slots in their own time zone, which matters for US clients. You create the free account in Phase 2.

## Q17 · Lead magnet
- **Status:** ✅ · **Answer:** yes, ungated, generated from the same data as /estandar; in both languages (Q4). · **Date:** 2026-10-19

## Q18 · Analytics
- **Status:** 🔴 TBD (David, 2026-10-19). Decide before CP2: it determines the events and the aviso's wording.
- **Meanwhile:** the build calls a `track()` helper that does nothing until a tool is chosen. Options stay as before: Umami Cloud (free tier, cookieless, custom events) or Plausible (paid). Cloudflare Web Analytics has no custom events.

## Q19 · Domain and hosting
- **Status:** ✅ · **Answer:** domain **auranova.mx**; host **Cloudflare Pages** (ADR-002). · **Date:** 2026-10-19
- **Before buying:** the Q23 search, a fresh availability + price check (in MXN), and your explicit OK. See Q28 for the effect on US search.
- **Domain findings (2026-10-19):** taken: auranova.com (since 2021), auranova.com.mx (since 2026-05-24, "Coming Soon"), auranova.dev, auranova.studio and other .com variants. auranova.mx appeared free in NIC México WHOIS.

## Q20 · Contract update
- **Answer:** ✅ David will update the contract per `CONTRACT_INSIGHTS.md` §3. (2026-10-19)
- **Still open 🔴:** the version + date to cite in Cómo trabajamos (production can't ship without it), and an English version for US clients (Q27).
- **Build rule:** terms David approved here are written as plain text; one page-level `[[PENDIENTE: versión del contrato]]` marker blocks production until the updated contract exists.

## Q21 · Social-proof numbers
- **Status:** ✅ · **Answer:** omit until real. · **Date:** 2026-10-19

## Q22 · Blog at launch
- **Status:** ✅ · **Answer:** no; routes reserved for later. · **Date:** 2026-10-19

## Q23 · Trademark check
- **Status:** ✅ run 2026-10-19 (IMPI MARCia, quick search "AURANOVA" and "AURA NOVA", filtered by Nice class). Not a legal opinion.
- **Result:**
  - **"AURANOVA" is registered**, reg. 2465719 (application 2757090), owner Rocío Guadalupe Bolívar Cime, valid until 19/10/2032, **class 5 only**: pharmaceuticals, medicines, supplements, medical supplies. Different field from ours.
  - **Class 42 (web design/development): no "AuraNova" or "Aura Nova" mark.** Several plain "AURA" marks exist (e.g., Salesforce, Aura Systems, Aura Blockchain Consortium, one individual's registration to 2035).
  - **Class 35:** "AURA NOVA CANCÚN BY LAK'IN" and "AURA NOVA PLAYA DEL CARMEN BY EDÉN" are registered to CADU Inmobiliaria (real-estate developments; valid to 2036).
- **Reading:** no blocker for a web-development studio. The main protection target is class 42; class 35 is crowded with "AURA NOVA" names.
- **Recommended next step (🟡):** have a trademark agent or lawyer confirm, then file "AuraNova" in **class 42**. Check IMPI's current fee per class before filing. Buying auranova.mx doesn't depend on the filing.

## Q24 · Upstream docs: logo file names
- **Status:** ✅ · **Answer:** approved and done 2026-10-19: DESIGN_SYSTEM.md v1.1.1 (docs only), brief §2/§3 and PHILOSOPHY now say `auranova_logo.*`.

## Q25 · Typical project timelines
- **Answer:** ✅ interim: the FAQ says the schedule is agreed in writing in each proposal; timelines vary by project. (2026-10-19)
- **Later 🔴:** David will add more detailed ranges.

## Q26 · English: when
- ⏸ **On hold** (David, CP1 feedback 2026-10-19: English/US work paused; keep .mx).
- **Question:** English is in scope (Q4). When should the English copy be written?
- **Blocks:** the scope of CP1 vs. CP2.
- **Recommended:** the bilingual routes, hreflang and language switcher are wired now. **CP1 is reviewed in Spanish.** English is written at CP2 from the *approved* Spanish copy, adapted for US readers rather than translated word for word, so the voice gets fixed once, not twice.
- **Options:** A English at CP2 (recommended) · B English pages already at CP1.
- **Status:** 🟡

## Q27 · US clients: currency, contract, invoicing
- ⏸ **On hold** (David, CP1 feedback 2026-10-19: English/US work paused; keep .mx).
- **Question:** For US clients: quote in USD? Contract in English, under which law? How do you invoice a foreign client?
- **Blocks:** English Cómo trabajamos (payments, law), English form budget ranges, the English terms.
- **Recommended:** quote in USD; an English version of the updated contract, governed by Mexican law (the lawyer confirms); your accountant confirms the CFDI and IVA treatment for clients abroad. The English pages say "USD" and don't mention IVA until that's confirmed.
- **Status:** 🔴

## Q28 · Domain vs. US search
- ⏸ **On hold** (David, CP1 feedback 2026-10-19: English/US work paused; keep .mx).
- **Question:** Google treats .mx as a Mexico-targeted domain, so English pages on auranova.mx rank less well in US search than on a generic domain. Keep auranova.mx anyway?
- **Blocks:** nothing yet (purchase waits for Q23).
- **Recommended:** keep **auranova.mx**. Most clients are in Mexico, and US clients are more likely to arrive through referrals than through search. Revisit a generic domain if US search becomes a goal (auranova.com is taken; auranova.co appeared free).
- **Status:** 🟡

## Q29 · US positioning
- ⏸ **On hold** (David, CP1 feedback 2026-10-19: English/US work paused; keep .mx).
- **Question:** Which US clients are we talking to?
- **Blocks:** the English hero, service-page angles, English keywords.
- **Recommended:** US small businesses that need a bilingual (EN/ES) site or serve Spanish-speaking customers, plus the practical angle: a Monterrey studio working in US-friendly hours (UTC−6, the same as US Central in winter, one hour behind in summer). No price claims.
- **Status:** 🟡

## Q30 · Design-system fixes found in the build
- **Status:** ✅ approved and done 2026-10-19: DESIGN_SYSTEM v1.2 (`.site-header` sticky wrapper; nav collapses below 1024 px), re-synced; local overrides removed.

<details><summary>Original question</summary>

- **Question:** Building the real nav surfaced two issues in `components.css`. They're fixed locally in `src/styles/site.css`; OK to move the fixes upstream (DESIGN_SYSTEM v1.2)?
  1. **Collapse point.** With 4 links + "Agenda una llamada", the nav doesn't fit between 768 and 1023 px. The site collapses to the menu below **1024 px** instead of 768.
  2. **Sticky nav.** `.nav` is sticky inside `<header>`, but a sticky element only sticks within its parent, so it never sticks. The site makes the header wrapper sticky instead.
- **Blocks:** nothing (fixed locally); upstream accuracy.
- **Recommended:** yes to both, as a v1.2 component change.

</details>

## Q31 · Service scopes and drafted policies (new)
- **Question:** The six service pages list what each service **includes / what you provide / what's not included**, and I drafted three policies. All are marked `[[CONFIRMAR]]`. Do they match how you want to sell?
  - Asesoría: "no te obliga a contratarnos; el plan es tuyo".
  - Mantenimiento: "sí damos soporte a sitios que no hicimos, después de revisarlos".
  - Contenido: "imágenes con IA con uso comercial, nunca presentadas como fotos reales" (license: Q33).
- **Blocks:** production (the markers).
- **Recommended:** review each page's "Qué incluye" block and reply with changes; the policies as drafted.
- **Status:** 🟡

## Q32 · Hero tagline and service H1s (new)
- **Question:** OK with the new home H1, "Un sitio web que **trabaja tanto como tú**", and the service H1s (see `docs/pages/servicio.md`)?
- **Alternatives for the home:** "Tu negocio, **en línea y sin complicaciones**" · "Sitios web profesionales, **sin pagar de más**".
- **Recommended:** keep the current one; it speaks to the owner, not to the technology.
- **Status:** ✅ kept: the CP1.1 review (2026-10-20) changed the hero animation, not the headline.

## Q33 · AI image license (new)
- **Question:** The site's illustrations were generated with Artlist (GPT Image 2.5) on your AI Suite plan. Can you confirm in your Artlist account terms that AI generations can be used commercially (on our site and in client work)?
- **Blocks:** the images in production; the "imágenes con IA" offer on Contenido y marca.
- **Recommended:** confirm (it's your account); I log it in `docs/ASSETS.md`.
- **Status:** 🟡

## Q34 · Home hero animation (new, CP1.2)
- **Question:** Which animation shows "your site works for you" best? Compare them live at **`/opciones/`** on the preview (that page never reaches production).
  - **A · Tu sitio atiende:** a business site takes a quote request while notifications arrive (quote, appointment, message).
  - **B · Tu sitio no cierra:** a phone goes from day to night and keeps receiving clients at every hour.
  - **C · Del clic al cliente:** search on Google → the site → a new client's message.
- **Recommended:** **A**, the most immediate; it is what the home shows now. Changing it is one line (`hero.variant` in `src/content/pages/es/inicio.yaml`).
- **Status:** 🟡

## Q35 · Service illustration style (new, CP1.2)
- **Question:** Which 2D style replaces the 3D art on the service cards and the /servicios/ rows? All three are at **`/opciones/`**: **A** Plano bicolor (flat violet + lime, dark outline), **B** Línea y acento (monoline violet, lime accents), **C** Degradado aura (soft lime → violet gradients).
- **Recommended:** **A**: fully 2D and the sharpest at card size; B is the cleanest; C is the most "aura" but loses detail when small. Changing it is one line (`illustration` in `src/content/pages/es/servicios.yaml`).
- **Status:** 🟡

## Q36 · Is the 30-minute call free? (new, CP1.2)
- **Question:** The roadmap on /como-trabajamos/ says what you pay at each stage. For the first call it reads "[[CONFIRMAR: Nada: la llamada no tiene costo.]]". Is the call free, always?
- **Blocks:** production (the marker); "sin costo" could also go on the CTA note if true.
- **Status:** 🔴

---

## Brief vs. reality (reported at CP0)

| # | The brief says | Reality | Handling |
|---|---|---|---|
| 1 | Logo masters are `spectdesign_logo.*` | Files are `auranova_logo.ai` / `.svg` | ✅ fixed (Q24) |
| 2 | Default host Render static; forms via "the host's serverless function" | Render static sites have no functions | ✅ Cloudflare Pages (Q19) |
| 3 | Default analytics Cloudflare Web Analytics + custom events | It has no custom events | Q18 |
| 4 | "Proyectos" is a primary nav item | ✅ resolved: Vista Consulting is published and permitted (Q12) | Proyectos stays |
| 5 | Home proof strip + Standard teaser both show the scores | Same numbers twice | Strip skipped until client logos exist |
| 6 | Screenshot widths 320/390/768/1024/1440 vs. PHILOSOPHY's 320/375/… | Two lists | Capture both: 320/375/390/768/1024/1440 |
| 7 | AuraNova domain to be chosen | auranova.com and auranova.com.mx are held by others | Q23, Q28 |
| 8 | Aviso "under the current LFPDPPP" | A new LFPDPPP replaced the 2010 law in March 2025 | Lawyer review (Phase 2) |
| 9 | i18n: es-MX only at launch | Q4 said ES + EN; then on hold (CP1) | ADR-007 on hold |
