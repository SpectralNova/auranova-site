# Page brief · Contacto (`/contacto`)

| | |
|---|---|
| **Goal** | Book a call, or write. |
| **Audience** | An owner ready to talk, plus those who prefer to write first. |
| **Primary CTA** | **Agenda una llamada** (booking, ADR-004). Alternatives: the form, WhatsApp (Q15). |
| **Success metric** | `booking_open` · `form_submit` · `whatsapp_click` per session. |
| **SEO** | Title "Contacto: agenda una llamada · AuraNova". `BreadcrumbList`. |
| **Blanks** | Q5 project types · Q6 budget ranges · Q8 response time · Q15 channels · Q16 booking |

## Outline

| # | Section | Theme | Content |
|---|---|---|---|
| 1 | Hero + booking | dark | H1 "Agenda una llamada" + lead (30 minutes, Q16) + [Agenda una llamada] + hours ✅ + "Qué pasa después" in 3 numbered steps (🟡) |
| 2 | Formulario | light | "¿Prefieres escribirnos?" + the form (below) |
| 3 | Otros canales | dark | Email + WhatsApp `wa.me` button (Q15) + hours ✅ + response time (Q8). The page's end CTA is here; no violet band, because the booking block already leads the page. |

## Form

| Field | Type | Required | Notes |
|---|---|---|---|
| Nombre | text, `autocomplete="name"` | yes | |
| Correo | email, `autocomplete="email"` | yes | |
| Empresa | text, `autocomplete="organization"` | no | |
| Sitio actual | url | no | |
| Tipo de proyecto | select | yes | Services from Q5 + "No estoy seguro" |
| Presupuesto | select | no | Ranges from Q6; dropped if Q6 says no ranges |
| Mensaje | textarea | yes | |
| Consentimiento | checkbox | yes | "Leí el aviso de privacidad" with a link to /aviso-de-privacidad |
| (honeypot) | hidden from people and from assistive tech | — | ADR-003 |

- Visible labels, never a placeholder used as the label; errors through `aria-invalid` + `aria-describedby`; works with the keyboard only.
- Success: an inline confirmation message (focus moves to it) + the auto-reply email.
- **Auto-reply (es-MX, 🟡):** thanks · what happens next · hours ✅ · "te respondemos el siguiente día hábil" (Q8) · a link to book directly.
