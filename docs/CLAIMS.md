# Claims register

*Every number or factual claim in the site copy, with its source (brief §7). Updated 2026-10-19 for the CP1 pages. A claim without a ✅ source doesn't go to production.*

| Claim (as published) | Where | Source | Status |
|---|---|---|---|
| Horario: lunes a viernes, 9:00–17:00, hora de Monterrey; sin fines de semana ni feriados | everywhere (`{{horario}}`) | David; PHILOSOPHY §6 | ✅ |
| Te respondemos en 1 día hábil / tú en 3 días hábiles | Inicio, Cómo trabajamos, Contacto | Q8 | ✅ |
| Llamada de 30 minutos | Inicio, Servicio, Cómo trabajamos, Contacto | Q16 default | 🟡 |
| Precio fijo por proyecto; no cobramos por hora; no publicamos precios genéricos | Inicio FAQ, Servicio, Cómo trabajamos | Q6 | ✅ |
| Pagos 40% / 30% (al aprobar el diseño) / 30% (antes del lanzamiento); MXN + IVA | Inicio, Servicio, Cómo trabajamos | Q7 | ✅ |
| Facturas vencen a los 15 días | Cómo trabajamos | contract §2.3 | ✅ |
| Gastos de terceros sólo con aprobación previa por escrito | Cómo trabajamos | contract §2.2 | ✅ |
| Un pago atrasado pausa el proyecto hasta recibirlo | Cómo trabajamos | Q10 | ✅ |
| Una ronda de revisión por etapa | Inicio, Servicio, Cómo trabajamos | Q9 | ✅ |
| Rondas adicionales se cotizan como un cambio | Cómo trabajamos | my reading of Q9 | 🟡 |
| Cambios: por escrito → costo e impacto → aprobación → se agenda | Inicio FAQ, Cómo trabajamos | Q20 (CONTRACT_INSIGHTS §3.5) | ✅ (contract text pending) |
| 15 días para reportar diferencias; después se da por aceptada | Cómo trabajamos | contract §4 | ✅ |
| Garantía de 30 días + 1 sesión de capacitación | Inicio FAQ, Servicio, Cómo trabajamos | Q11 | ✅ |
| Dominio y cuentas a tu nombre desde el primer día; cesión de derechos con el pago final; derecho de portafolio; herramientas previas licenciadas; licencias de terceros | Inicio, Servicio, Cómo trabajamos | PHILOSOPHY §4.6; Q20 (CONTRACT_INSIGHTS §3.6, §3.8) | ✅ (contract text pending) |
| Accesos compartidos con un gestor de contraseñas | Cómo trabajamos | PHILOSOPHY §4.6 | ✅ |
| Cancelación con 15 días de aviso; pagas el trabajo realizado | Cómo trabajamos | contract §3 | ✅ |
| Anticipo no reembolsable; si cancelamos, reembolso o crédito; pausas sin costo | Cómo trabajamos | CONTRACT_INSIGHTS §3.7; Q10 | 🟡 |
| Trabajamos con negocios de todo México y de Estados Unidos | Inicio FAQ, footer | Q3, Q4 | ✅ |
| Nuestro estándar: contenido principal en 2.5 s o menos en celular | Inicio (problemas) | PHILOSOPHY §7 #3 (LCP ≤ 2.5 s) | ✅ |
| Probamos cada página desde la pantalla de celular más angosta | Inicio (problemas) | PHILOSOPHY §7 #15 (320 px); `npm run screenshots` | ✅ |
| Medimos la velocidad con herramientas de Google antes de publicar | Servicio | PHILOSOPHY §7 #3 (Lighthouse / PageSpeed) | ✅ |
| Te dejamos el contenido en un formato editable | Servicio | PHILOSOPHY §7 additions (handover) | ✅ |
| Conservamos tus direcciones (URL) al rediseñar | Servicio | standard redesign practice; not yet in PHILOSOPHY | 🟡 |
| Hemos construido sitios con Astro, Next.js y WordPress | Servicio FAQ | Vista (Astro), LOGOS (Next.js), FERREMAG (WordPress): brief §3 | ✅ |
| Este sitio: Lighthouse 100 / 100 / 100 / 100, contenido principal en ≤ 1.5 s | Inicio (estándar) | `src/data/site-scores.json`, measured 2026-10-19 on the local preview | 🟡 re-measure on the deployed site |
| Vista Consulting: Lighthouse 97 / 100 / 100 / 100 | Inicio, Servicio | `src/data/vista-scores.json`, measured 2026-10-19 on vistaconsulting.mx | ✅ |
| Vista: "diseñamos y desarrollamos el sitio completo" | Inicio, Servicio | David, Q12 (2026-10-19) | ✅ (Vista's written OK 🟡) |
| Vista: hecho con Astro, publicado en Cloudflare | Inicio, Servicio | HTTP inspection 2026-10-19 (`Server: cloudflare`, Astro markup) | ✅ |
| Ves los horarios en tu propia zona horaria | Contacto | Cal.com behavior (Q16) | ✅ |
