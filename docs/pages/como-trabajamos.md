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

## Outline (light theme: reading-heavy; on-page index with anchors)

| # | Anchor | Content | Source / status |
|---|---|---|---|
| 1 | — | Dark hero: H1 (🟡 "Así trabajamos: todo por escrito") + lead + index of the sections below | — |
| 2 | `#proceso` | The 4 checkpoints: what happens · what you approve · what you pay at each one (40% to start · 30% at CP1 · 30% before launch) | ✅ |
| 3 | `#horario` | Lunes a viernes 9:00–17:00, hora de Monterrey; no weekends or holidays; absences announced in advance · our response ≤ 1 día hábil · yours ≤ 3 días hábiles, or the schedule moves | ✅ |
| 4 | `#responsabilidades` | Two-sided table (PHILOSOPHY §5), shown as two stacked cards on mobile | 🟡 mixed |
| 5 | `#pagos` | Fixed price per project · 40/30/30 · MXN + IVA · invoices due in 15 days · **a late payment pauses the project until it arrives** | ✅ (Q6, Q7, Q10) · contract §2.3 |
| 6 | `#cambios` | Change request in 4 numbered steps (written request → estimate of cost and date → your approval → scheduled) · **1 revision round per phase** · "fuera de alcance → lo agendamos después del lanzamiento" | ✅ (Q9, Q20) |
| 7 | `#propiedad` | Rights transfer on final payment · portfolio right · accounts in your name from day one · the handover kit | ✅ (Q20) |
| 8 | `#cancelacion` | Client-requested pauses (no restart fee, 🟡) · cancellation with 15 days' notice · non-refundable deposit once onboarding starts (🟡) | Q10 · contract §3 |
| 9 | `#garantia` | Acceptance: 15 days to report differences against Anexo A · 30-day warranty ✅ · 1 training session ✅ · maintenance plans 🔴 | contract §4 ✅ · Q11 |
| 10 | — | Violet CTA band | — |

**Marking rule (Q20):** terms David approved are written as plain text. One page-level `[[PENDIENTE: versión y fecha del contrato]]` marker blocks production until the updated contract exists; terms still 🟡 carry their own `[[CONFIRMAR]]` marker.
