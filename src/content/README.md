# Editing the site's copy

All page copy lives here, one YAML file per page per language. Edit the text between quotes and the site updates on the next build. You never need to touch the components.

| Folder | What's inside |
|---|---|
| `pages/es/` | Inicio, Cómo trabajamos, Contacto, 404 |
| `services/es/` | One file per service (card + full page) |
| `projects/es/` | One file per published project |
| `business.ts` | **Facts** (hours, response times, email, payments…). Change a fact here and every page updates. |

## Markup you can use inside the text

| Write | You get |
|---|---|
| `==frase==` | The highlighted phrase of a heading (lime on dark, marker on light). **Once per heading.** |
| `**texto**` | Bold |
| `[texto](/como-trabajamos/)` | A link |
| `{{horario}}` | A fact from `business.ts` (e.g. `{{respuesta}}`, `{{pagos}}`, `{{duracionLlamada}}`) |
| `[[PENDIENTE: pregunta]]` | A visible blank for something we don't know yet |
| `[[CONFIRMAR: texto]]` | A proposal waiting for your OK |

A production build **fails** while any `[[PENDIENTE` or `[[CONFIRMAR` is left, so nothing unapproved can go live.

Rules from the brief: es-MX with "tú", "nosotros" for AuraNova, paragraphs of 4 lines at most, no ALL-CAPS sentences, and every number or claim backed by a source in `docs/CLAIMS.md`.
