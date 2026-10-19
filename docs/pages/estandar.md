# Page brief · Nuestro estándar (`/estandar`)

| | |
|---|---|
| **Goal** | Differentiate: show the standard every delivery passes, and prove this site passes it. |
| **Audience** | An owner comparing quotes who wants to know what "bien hecho" means and how to check it. |
| **Primary CTA** | **Agenda una llamada**. Secondary: download the checklist (Q17). |
| **Success metric** | `cta_click` + `resource_download` from this page. |
| **SEO** | Title "Nuestro estándar: 15 no negociables de un buen sitio web · AuraNova". `BreadcrumbList`. |
| **Blanks** | Q17 · live scores (ADR-005) |

## Outline

| # | Section | Theme | Content |
|---|---|---|---|
| 1 | Hero | dark | H1 (🟡 "15 no negociables que medimos en cada sitio") + lead: the client standard, and this site at an even higher bar (Lighthouse ≥ 95) |
| 2 | Este sitio, medido | dark | Stat cards from `scores.json` (Lighthouse ×4, LCP, CLS) + "Medido el {fecha} en {URL}" + a one-line note that INP is measured with real visitors (ADR-005) |
| 3 | Los 15 | light | Grouped in 5 blocks (Propósito y contenido · Velocidad · Diseño y marca · Navegación y móvil · Respeto a tus visitantes). Each item: what it means for you (plain Spanish) + how we measure it (PHILOSOPHY §7) |
| 4 | Además | light | Accessibility (WCAG 2.2 AA) · technical SEO · privacy · security · handover |
| 5 | Llévatelo | dark | The checklist download (Q17); omitted if Q17 = no |
| 6 | CTA final | violet | [Agenda una llamada] |

**Recommendation for CP1:** credit the Kindling article as the origin of the 15 principles ("Basado en…"); the thresholds are ours. It fits the honesty values and avoids presenting someone else's list as our own.
