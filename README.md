# AuraNova site

The studio's own website. Brief: `WEBSITE_PROMPT.md` · decisions: `docs/DECISIONS.md` · open questions: `docs/OPEN_QUESTIONS.md` · editing copy: `src/content/README.md`.

Astro (static) + plain CSS on the AuraNova design system (synced from `Resources/AuraNova/Design System`).

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Preview build (noindex) + blank report. `SITE_ENV=production` builds for launch and **fails** while any `[[PENDIENTE` / `[[CONFIRMAR` remains. |
| `npm run sync:ds` | Re-copy tokens, components, fonts and logos from the upstream design system |
| `npm run check:tokens` | No raw colors, px or durations outside the tokens |
| `npm run test:a11y` | axe (WCAG 2.2 AA) + keyboard tests in Edge (build first) |
| `npm run test:lh` | Lighthouse mobile, fails below 95 (build first) |
| `npm run measure` | Same, and writes the scores shown on the site (`SITE_INDEXABLE=1 npm run build` first, then rebuild) |
| `npm run screenshots` | Full-page screenshots at 320/375/390/768/1024/1440 + overflow check |

Deploy: Cloudflare Workers Builds runs `npm run build`, then `npx wrangler deploy` (static assets only, see `wrangler.jsonc`). `main` is the production branch; other branches are previews.

Environment (ADR-020, `site-env.mjs`): `SITE_ENV` (`preview` by default; `production` only counts on `main`, set as a Cloudflare build variable at launch) · `SITE_URL` (canonical base for previews; production is always https://auranova.mx). Launch steps: `docs/LAUNCH.md`. Windows + Git Bash: prefix commands that take `/paths` with `MSYS_NO_PATHCONV=1`.
