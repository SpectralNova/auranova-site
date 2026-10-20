# Page brief · Contacto (`/contacto`)

| | |
|---|---|
| **Goal** | Book a call, or write. |
| **Audience** | An owner ready to talk, plus those who prefer to write first. |
| **Primary CTA** | **Agenda una llamada** (Cal.com, ADR-004). Alternatives: the form, the business email (Q15). |
| **Success metric** | `booking_open` · `form_submit` per session. |
| **SEO** | Title "Contacto: agenda una llamada · AuraNova". `BreadcrumbList`. |
| **Blanks** | Q6 budget brackets · Q16 Cal.com link (call length ✅ 30 min; email ✅ contacto@auranova.mx) |

## Outline

| # | Section | Theme | Content |
|---|---|---|---|
| 1 | Hero + booking | dark | H1 "Agenda una llamada" + lead (30 minutes, Q16) + [Agenda una llamada] + hours ✅ + "Qué pasa después" in 3 numbered steps (🟡) |
| 2 | Formulario | light | "¿Prefieres escribirnos?" + the form (below) |
| 3 | Otros canales | dark | Business email (Q15) + hours ✅ + response time ✅ (1 día hábil). No WhatsApp, phone or address at launch. The page's end CTA is here; no violet band, because the booking block already leads the page. |

## Form

| Field | Type | Required | Notes |
|---|---|---|---|
| Nombre | text, `autocomplete="name"` | yes | |
| Correo | email, `autocomplete="email"` | yes | |
| Empresa | text, `autocomplete="organization"` | no | |
| Sitio actual | url | no | |
| Tipo de proyecto | select | yes | Sitio web · Plataforma a la medida · Mantenimiento · No estoy seguro |
| Presupuesto | select | no | Brackets 🔴 (Q6): MXN on the Spanish form; USD on the English form if Q27 says so |
| Mensaje | textarea | yes | |
| Consentimiento | checkbox | yes | "Leí el aviso de privacidad" with a link to /aviso-de-privacidad |
| (honeypot) | hidden from people and from assistive tech | — | ADR-003 |

- Visible labels, never a placeholder used as the label; errors through `aria-invalid` + `aria-describedby`; works with the keyboard only.
- Success: an inline confirmation message (focus moves to it) + the auto-reply email.
- **Auto-reply (es-MX, and en-US for the English form):** thanks · what happens next · hours ✅ · "te respondemos el siguiente día hábil" ✅ · a link to book directly.
