# Page brief · Cómo trabajamos (`/como-trabajamos`)

| | |
|---|---|
| **Goal** | Prospects arrive at the call already aligned on process and terms, which means less friction and less scope creep. |
| **Audience** | An owner comparing quotes, especially one burned by a previous agency. |
| **Primary CTA** | **Agenda una llamada**. |
| **Success metric** | Share of booked calls whose session included this page; qualitatively, fewer basic-terms questions on calls and fewer change disputes. |
| **SEO** | Title "Cómo trabajamos: proceso, pagos y propiedad de tu sitio · AuraNova". `BreadcrumbList`. |
| **Blanks** | Q10 (cancellation and client-requested pauses, 🟡) · Q11 maintenance plans · Q20 contract version + date · Q27 (English page: USD, law) |
| **Rule** | **Must match the signed contract** (brief §11). The page source carries `<!-- Contrato: versión [[PENDIENTE]] · fecha [[PENDIENTE]] -->`. Each term cites its contract clause in `docs/CLAIMS.md`. Can't go to production before Q20. |

*v3 · 2026-10-20 (CP1.1 feedback: "a scroll-based, true roadmap experience, piergorelli.com is the PERFECT inspiration; sell the call and show how clients are taken care of").*

## Outline (sections alternate dark/light; on-page index with anchors)

| # | Anchor | Content | Source / status |
|---|---|---|---|
| 1 | — | Dark hero: H1 ("Así trabajamos: todo por escrito") + lead + **[Agenda una llamada]** + "Una llamada de 30 minutos, sin costo… te decimos qué necesitas y qué no" + contract version + index | — |
| 2 | `#proceso` | **Scroll roadmap** (ADR-011): 00 La llamada + the 4 contract stages. Each: what happens · what you approve · what you pay · **cómo te cuidamos**. Desktop: a pinned stage with a big counter (00/04), tabs with progress, a "pagado" meter that fills 0 → 40 → 70 → 70 → 100% and one screen per step (booking card · proposal "Aprobada" · private-link phone · build bars + 1 review round · real quality report + handover). Phones / no JS: a vertical timeline. | ✅ (the call is free, Q36) |
| 2b | `#cuidamos` | Así te cuidamos: 6 commitments with icons (response time, todo por escrito, primero lo ves, no surprise costs, lo tuyo es tuyo, 30-day warranty) | ✅ (contract summary below) |
| 3 | `#horario` | Lunes a viernes 9:00–17:00, hora del centro; no weekends or holidays; absences announced in advance · our response ≤ 1 día hábil · yours ≤ 3 días hábiles, or the schedule moves | ✅ |
| 4 | `#responsabilidades` | Two-sided table (PHILOSOPHY §5), shown as two stacked cards on mobile | 🟡 mixed |
| 5 | `#pagos` | Fixed price per project · 40/30/30 · MXN + IVA · invoices due in 15 days · **a late payment pauses the project until it arrives** | ✅ (Q6, Q7, Q10) · contract §2.3 |
| 6 | `#cambios` | Change request in 4 numbered steps (written request → estimate of cost and date → your approval → scheduled) · **1 revision round per phase** · "fuera de alcance → lo agendamos después del lanzamiento" | ✅ (Q9, Q20) |
| 7 | `#propiedad` | Rights transfer on final payment · portfolio right · accounts in your name from day one · the handover kit | ✅ (Q20) |
| 8 | `#cancelacion` | Client-requested pauses (no restart fee, 🟡) · cancellation with 15 days' notice · non-refundable deposit once onboarding starts (🟡) | Q10 · contract §3 |
| 9 | `#garantia` | Acceptance: 15 days to report differences against Anexo A · 30-day warranty ✅ · 1 training session ✅ · maintenance plans 🔴 | contract §4 ✅ · Q11 |
| 10 | `#preguntas` | FAQ + closing call to action ("¿Te hace sentido? Platiquemos."); no violet band (ADR-010) | — |

Sections 3–9 sit together under "Los detalles · El resumen de nuestro contrato" (`#detalles`).

**Marking rule (Q20):** terms David approved are written as plain text. One page-level `[[PENDIENTE: versión y fecha del contrato]]` marker blocks production until the updated contract exists; terms still 🟡 carry their own `[[CONFIRMAR]]` marker.
