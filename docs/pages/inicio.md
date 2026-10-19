# Page brief · Inicio (`/`)

| | |
|---|---|
| **Goal** | Within 5 seconds the visitor knows what AuraNova builds, for whom, and how to start; then books a call. |
| **Audience** | The SMB owner (AUDIENCE.md) on a phone, arriving from Google ("diseño web en Monterrey") or a link shared on WhatsApp. |
| **Primary CTA** | **Agenda una llamada** (ADR-004). Secondary: *Cómo trabajamos*. |
| **Success metric** | Share of sessions with `cta_click` → `booking_open`; compare the hero and final-band locations. |
| **SEO** | Title "Diseño y desarrollo web en Monterrey · AuraNova" (Q3). JSON-LD: `ProfessionalService` + `FAQPage`. |
| **Blanks** | Q3 city · Q5 services · Q6 cost · Q8 response time · Q12 projects · Q14 voice · Q25 timelines |

## Outline

| # | Section | Theme | Content | Serves |
|---|---|---|---|---|
| 1 | Hero | dark, `.bg-grid` + `.orb` | Eyebrow "Diseño y desarrollo web · [Q3]" → H1 with one `.hl` (🟡 tagline: "Sitios web que **hacen brillar** a tu negocio") → lead (the short mission) → [Agenda una llamada] + [Cómo trabajamos] → microcopy "Lunes a viernes, 9:00–17:00 · Respuesta en [[CONFIRMAR: 1 día hábil]]" | #1, #14 |
| 2 | ~~Proof strip~~ | — | **Skipped until permitted client logos exist** (Q12). The measured scores appear once, in section 7. | — |
| 3 | Problemas | light | "Por qué tu sitio no te trae clientes": 4 cards, each a problem in the owner's words + how the standard fixes it: tarda en cargar (#3) · no queda claro qué hacer (#1, #14) · en el teléfono se ve mal (#15) · no es tuyo: la agencia tiene tu dominio (*Lo tuyo es tuyo*). Link → /estandar | #2, #11 |
| 4 | Servicios | dark | 3 cards (Q5): who it's for + the outcome in one line → /servicios/{slug} | #6 |
| 5 | Proceso | dark | 4 step cards 01–04 (Descubrimiento · **Primero lo ves** · Construcción · Lanzamiento medido); CP1 gets the emphasis. Link → /como-trabajamos | value 4.3 |
| 6 | Proyectos | light | 2–3 case cards with real results. **Not rendered until Q12 grants permission.** | proof |
| 7 | Estándar | dark | 3 stat cards with this site's measured scores (ADR-005) + "Medido el {fecha}" → /estandar | #3, value 4.5 |
| 8 | Todo por escrito | light | 3 short items: horario ✅ · pagos (Q6, Q7) · lo tuyo es tuyo (Q20) → /como-trabajamos | value 4.4 |
| 9 | Preguntas frecuentes | light | 6–8 questions (below) + `FAQPage` JSON-LD | #12 |
| 10 | CTA final | violet (once) | H2 with one `.hl` + [Agenda una llamada] + hours | #14 |

## FAQ pool (answers drafted at CP1)

1. ¿Cuánto cuesta un sitio web? (Q6)
2. ¿Cuánto tarda? (Q25)
3. ¿El sitio, el dominio y el código son míos? (Q20)
4. ¿Qué pasa si quiero cambiar algo a mitad del proyecto? (Q9)
5. ¿Dan mantenimiento después del lanzamiento? (Q11)
6. ¿En qué horario atienden? ✅
7. ¿Trabajan con negocios fuera de Monterrey? (Q3)
8. ¿Qué necesito tener listo para empezar? (PHILOSOPHY §5)
