# Launch runbook (CP3): auranova.mx

The order to take the site from the workers.dev preview to https://auranova.mx. Nothing here runs without David's explicit go on the day: going live and touching DNS are his calls. The rules behind it are in ADR-002, ADR-015, ADR-020 and Q18.

**Already done, nothing to do at launch:**
- the domain (Cloudflare Registrar);
- email (Zoho: MX, SPF, DKIM, DMARC);
- Resend (its DNS records are on the domain);
- the HubSpot service key, Cal.com, the Meta domain verification;
- the Turnstile widget, created for auranova.mx and the workers.dev preview (`src/lib/env.ts`).

## 0. Before the day: blockers (David)

A production build refuses to run while any of these remains (`npm run build` lists them):

1. Lawyer's review of the privacy notice (`aviso-de-privacidad.yaml` → `review`).
2. Lawyer's review of the terms of use (`terminos.yaml` → `review`). The same review confirms or changes the courts clause (Q3), and the contract date the site cites, 1 November 2026.
3. The virtual office's address for the notice (`business.ts` → `domicilio`, Q2). David's home address never goes on the site.

And one that isn't a build blank but must not be skipped:

4. Vista's written OK to show their case (Q12). Without it, take the case off /proyectos/ before launch.

## 1. Clear the blanks (Claude)

- Write the lawyer's changes and the address into the content files.
- Commit to `main`, then confirm the preview build reports `check:pending: no blanks left`.

## 2. Flip the switch (David, ~1 min)

- Cloudflare → Workers & Pages → `auranova-site` → Settings → Build → **Build variables and secrets** → add `SITE_ENV` = `production`.
- Then **Retry deployment** on the latest `main` build, or push any commit.
- The build now produces the indexable site. Its canonical is https://auranova.mx no matter what `SITE_URL` says.
- Check on the workers.dev URL that it built, before the domain points at it.

## 3. Connect the domain (David, ~2 min)

- Same Worker → Settings → **Domains & Routes** → Add → **Custom domain** → `auranova.mx`.
  - Cloudflare creates the DNS record and the certificate.
  - The email records (MX, TXT) are not touched.
- **www:**
  - Rules → **Redirect Rules** → template «Redirect from WWW to Root» (301, keep the path and query).
  - It needs a proxied DNS record for `www`; Claude gives the exact record on the day.

## 4. Meta Pixel through Zaraz (David, with Claude's values)

Per ADR-015, step 07:
- Zaraz on auranova.mx → Consent: one purpose, «Publicidad», and Zaraz's own modal hidden.
- Facebook Pixel tool:
  - dataset `2078766606859398`;
  - Conversions API token pasted by David;
  - assigned to «Publicidad».
- Triggers:
  - Pageview → PageView;
  - `booking_open` → Schedule;
  - `form_submit` → Lead.

## 5. Web Analytics (David)

- Cloudflare → Web Analytics → add `auranova.mx` with automatic setup (Q18).
- If the beacon doesn't appear on the pages, switch to manual setup. The snippet then goes in the layout, production builds only.

## 6. Verify (Claude)

- **HTTPS + headers** on https://auranova.mx: no `X-Robots-Tag`, HSTS present, the CSP unchanged; Zaraz's script loads from `/cdn-cgi/` (same origin).
- **Crawl:** `robots.txt` says `Allow: /` with the sitemap; canonicals and `og:url` point at auranova.mx; www → apex is a 301.
- **Privacy:** David's home address appears nowhere in `dist/`.
  - Search for its street name.
  - The address lives only in the archive's `privado/negocio/prestador.json`, never in this repo.
- **Lighthouse** on the live pages; record the numbers.
- **Both forms end to end** (/contacto/ and /diagnostico-gratis/), with David's OK:
  - it creates a real HubSpot contact and deal and sends real emails;
  - David deletes the test deal afterwards.
- **Cookie banner:** «Aceptar» fires the Pixel; «Rechazar» doesn't.

## 7. Google Search Console (together)

- Add a **Domain** property for auranova.mx. Claude gives the TXT value and David adds it in Cloudflare DNS.
- Once it's verified, submit `https://auranova.mx/sitemap-index.xml`.

## 8. Right after launch

- **Email signatures:**
  - regenerate them with the production base: `python brand/firmas/build_firmas.py "<DS>/logo/auranova-mark-1024.png" brand/firmas https://auranova.mx/firma/ a vertical`;
  - David re-pastes both in Zoho (Insert HTML).
- **Instagram and Facebook:** change the profile link from Cal.com to https://auranova.mx.
- **The business archive:** log the first production release with the live scores (`negocio/sitio/versiones.md`, next WEB id from `archivo.py siguiente WEB`).
- **Keep workers.dev on:** Cloudflare's branch previews (Version URLs) depend on it. The production build's canonical keeps search engines on auranova.mx.
- **From now on:** changes go to the `preview` branch first (ADR-020). Merge to `main` = live.
