# Page brief · Inicio (`/`)

| | |
|---|---|
| **Goal** | Within 5 seconds the visitor knows what AuraNova builds, for whom, and how to start; then books a call. |
| **Audience** | The SMB owner (AUDIENCE.md) on a phone, arriving from Google ("diseño web en Monterrey") or a link shared on WhatsApp. English version: US small businesses (Q29). |
| **Primary CTA** | **Agenda una llamada** (ADR-004). Secondary: *Cómo trabajamos*. |
| **Success metric** | Share of sessions with `cta_click` → `booking_open`; compare the hero and final-band locations. |
| **SEO** | Title "Diseño y desarrollo web en Monterrey · AuraNova" (Q3). JSON-LD: `ProfessionalService` + `FAQPage`. |
| **Blanks** | Q6 budget brackets · Q12 Vista in writing · Q25 detailed timelines · Q29 (English hero) |

## Outline

| # | Section | Theme | Content | Serves |
|---|---|---|---|---|
| 1 | Hero | dark, `.bg-grid` + `.orb` | Eyebrow "Diseño y desarrollo web · Monterrey" → H1 with one `.hl` (🟡 tagline: "Sitios web que **hacen brillar** a tu negocio") → lead (the short mission) → [Agenda una llamada] + [Cómo trabajamos] → microcopy "Lunes a viernes, 9:00–17:00 · Te respondemos en 1 día hábil" ✅ | #1, #14 |
| 2 | ~~Proof strip~~ | — | **Skipped until permitted client logos exist** (Q12). The measured scores appear once, in section 7. | — |
| 3 | Problemas | light | "Por qué tu sitio no te trae clientes": 4 cards, each a problem in the owner's words + how the standard fixes it: tarda en cargar (#3) · no queda claro qué hacer (#1, #14) · en el teléfono se ve mal (#15) · no es tuyo: la agencia tiene tu dominio (*Lo tuyo es tuyo*). Link → /estandar | #2, #11 |
| 4 | Servicios | dark | 3 cards (Q5): who it's for + the outcome in one line → /servicios/{slug} | #6 |
| 5 | Proceso | dark | 4 step cards 01–04 (Descubrimiento · **Primero lo ves** · Construcción · Lanzamiento medido); CP1 gets the emphasis. Link → /como-trabajamos | value 4.3 |
| 6 | Proyectos | light | Case card(s): **Vista Consulting** now (Q12); LOGOS and FERREMAG once published. Screenshot + what we did + measured numbers with a date. | proof |
| 7 | Estándar | dark | 3 stat cards with this site's measured scores (ADR-005) + "Medido el {fecha}" → /estandar | #3, value 4.5 |
| 8 | Todo por escrito | light | 3 short items: horario ✅ · pagos 40/30/30 en MXN + IVA ✅ · lo tuyo es tuyo ✅ → /como-trabajamos | value 4.4 |
| 9 | Preguntas frecuentes | light | 6–8 questions (below) + `FAQPage` JSON-LD | #12 |
| 10 | CTA final | violet (once) | H2 with one `.hl` + [Agenda una llamada] + hours | #14 |

## FAQ pool (answers drafted at CP1)

1. ¿Cuánto cuesta un sitio web? ✅ fixed price per project, quoted in writing after the call (Q6)
2. ¿Cuánto tarda? ✅ interim: agreed in writing in each proposal (Q25)
3. ¿El sitio, el dominio y el código son míos? ✅
4. ¿Qué pasa si quiero cambiar algo a mitad del proyecto? ✅ 1 round per phase + change requests
5. ¿Dan mantenimiento después del lanzamiento? ✅ 30-day warranty; plans 🔴 (Q11)
6. ¿En qué horario atienden? ✅
7. ¿Trabajan con negocios fuera de Monterrey? ✅ all of Mexico, and the US
8. ¿Qué necesito tener listo para empezar? (PHILOSOPHY §5)
