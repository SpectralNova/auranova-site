# Contract insights: your template vs. the video

*2026-10-19 · inputs: `Resources/Web Design Agreement Template.pdf` (5 pages) and Danbee Shin, "Non-negotiable clauses you NEED in your web design contract" (YouTube `vfnR-VTYbYA`, 14:18, auto-captions)*

> **Not legal advice.** These are a developer's notes for building the "Cómo trabajamos" page and for the conversation with your lawyer. Have a Mexican lawyer review any contract changes, and the Spanish version you'll sign with Mexican clients.

---

## 1. What your template says today (clause by clause)

| § | Clause | What it says | Problem / note |
|---|---|---|---|
| — | Parties | "[Sender.Company]" (the Designer) and the client; the website is described in **Exhibit A**. | **Exhibit A doesn't exist** in the template, yet every clause depends on it. The recitals also say "the Company and [Sender.Company]": "Company" is never defined. "Spectral Nova" sits in the sender-name field; **[Sender.Company] should read "AuraNova"**, the official business name. |
| 1 | Web design services | Deliver everything required by Exhibit A. | Fine, if Exhibit A is a real itemized scope (see §3). |
| 2.1 | Fees | **Hourly rate** plus a **retainer**, paid by the 15th day after each monthly invoice. | Your real practice is **fixed price per project** with milestone options (LOGOS: A 100% / B 50-50 / C 40-30-30). Pick one model. |
| 2.2 | Expenses | Reimbursable, with the client's **prior approval**. | ✅ Good. Keep it. |
| 2.3 | Invoicing | Invoice in the first 5 business days of the month; drawn first from the retainer; due in **15 days**. | Only fits the hourly model. A fixed-price model needs milestone invoices instead. |
| 3 | Term & termination | The client may terminate **for any reason with 15 days' notice** and pays the costs incurred; the Designer may withhold deliverables until paid. | No **non-refundable deposit**. No Designer-side termination right. No **pause** rule. |
| 4 | Delivery | The client has **15 days** after delivery to report non-conformity with Exhibit A in writing; after that, the work is deemed accepted. | ✅ Good. This is your acceptance window. |
| 5 | Change in specifications | The Designer uses "best efforts" to make changes **at no additional expense and without delay**. If that's impossible, the parties confer and **the client decides**. | ⚠ **This invites scope creep.** The default should be that every change is estimated in writing and approved before work starts. |
| 6 | Proprietary rights | The client owns everything ("Work Made For Hire" under the **US Copyright Act**); the Designer assigns all rights without further compensation. | ⚠ Cites **US law**. No **portfolio right**, so legally you can't show client work. No carve-out for your pre-existing code, tools, or templates, or for third-party licenses (fonts, plugins, stock). Rights transfer on signing, not **on full payment**. |
| 7 | IP warranty | Both sides warrant they won't infringe; the client indemnifies the Designer for content it supplies. | ✅ Good. Keep it. |
| 8 | Jurisdiction | "State or federal courts" of [Sender.State]/[Sender.Country]. | US phrasing. Needs Mexican courts (e.g., Monterrey, N.L.) and Mexican law. |
| 9 | No waiver / modification | Changes need consent signed by both parties. | ✅ Good. |
| — | Signature | "…executed this **Stock Subscription Agreement**…" | ⚠ **Copy-paste error** from another template. Fix it before anyone signs. |

**Missing entirely:**

- Project schedule and responsiveness
- Business hours and communication channels
- Payment schedule and late fees
- Revision rounds
- Pause and restart terms
- Cancellation and deposit
- Hosting and domain ownership
- Post-launch warranty and maintenance
- Confidentiality
- Limitation of liability
- Content deadlines
- Handling of credentials and access
- Personal-data handling (LFPDPPP)
- Taxes (IVA) and currency (MXN)
- Electronic signature

---

## 2. What the video adds (paraphrased, with timestamps)

| Time | Insight | How it maps to you |
|---|---|---|
| 0:00 | Use a contract from the **very first** client. Its real value is preventing problems by setting expectations, not suing. A freelancer rarely litigates. | Matches the "Todo por escrito" value. The site can say this plainly. |
| 2:30 | **Scope creep** usually happens because the client genuinely doesn't know what's included. Fix it with an itemized **Services clause**. When something new comes up mid-project, park it until after launch so launch stays on time. | Write an **Exhibit A / Anexo A template** (pages, features, revision rounds, what the client supplies, what's excluded). Use a polite "fuera de alcance → lo agendamos después del lanzamiento" script. |
| 4:30 | **Client delays** quietly kill profitability (a 4-week project that drags to 6 weeks pays the same). | Add a **project schedule clause**. |
| 6:00 | Her schedule clause: the designer follows a **client-approved schedule**; **both** reply within **3 business days** (Mon–Fri, holidays announced in advance); if the client is silent, the designer may **shift the schedule** and **charge for extra time**. A client who wants to **pause** pays a **restart fee** ($500 USD in her case). | Your hours (Mon–Fri 9–17) slot straight in. Propose ≤ 1 business day for you and ≤ 3 for the client; pause fee amount = Q10. |
| 7:30 | Late payments strain cash flow **and** the relationship. Her structure: **30% deposit** to reserve a spot in the production calendar, **35% before kickoff**, **35% before the launch call** (where ownership transfers). | Your LOGOS option C is **40/30/30** tied to milestones. Both work; tie each payment to a checkpoint (CP0 / CP1 / launch). |
| 9:00 | The cost clause needs the **total**, a **dated payment schedule**, and **late fees**: a percentage of the outstanding amount after N days, which can grow daily. | Late-fee % and days = Q10. |
| 9:50 | She uses a paid template (The Contract Shop, affiliate link in the video description). | Optional resource; your lawyer is the better path for Mexico. |
| 10:20 | Without an explicit IP clause, ownership and **portfolio use** turn into a fight. Her approach: the client gets **full ownership** of design, copy, and branding, and the designer **keeps the right to showcase** the work in a portfolio and marketing. | Your §6 transfers everything **but omits the portfolio right**. Add it, or you can't legally show LOGOS or FERREMAG. |
| 11:30 | **Cancellation clause:** if the client cancels, all outstanding fees are due immediately and **fees paid are non-refundable**. If the designer cancels: refund **or** credit. This let her keep a deposit of more than $2,000 USD after a client walked away before work started, which covered onboarding and planning time. | Your §3 lets the client cancel with 15 days' notice; add "anticipo no reembolsable una vez iniciado el onboarding". |
---

## 3. Recommended changes before the site publishes "Cómo trabajamos"

1. **Choose the pricing model.** Fixed price per project with milestone payments (recommended; it matches your proposals) or hourly + retainer. Rewrite §2 accordingly. *(Q6)*
2. **Create Anexo A**, a scope template. It lists:
   - deliverables (pages and templates by name, features, integrations)
   - revision rounds per phase
   - client-supplied items with due dates
   - what's excluded
   - launch criteria (the 15 non-negotiables)
   - hosting and domain responsibilities
3. **Add a project schedule clause.** Business hours Mon–Fri 9:00–17:00 (America/Monterrey); response times; the schedule shifts when the client is late; a pause/restart fee. *(Q8, Q10)*
4. **Add a payment schedule.** For example 40% to reserve / 30% at design approval (CP1) / 30% before launch, plus a late fee. *(Q7, Q10)*
5. **Replace §5 with a change-request process.** Written request → written estimate (cost + date impact) → client approval → scheduled. Small changes inside agreed revision rounds stay free.
6. **Amend §6.**
   - Rights transfer **on full payment**.
   - **Portfolio right** for the Designer.
   - Your pre-existing tools and code are licensed, not assigned.
   - Third-party assets stay under their own licenses.
   - Reference Mexico's **Ley Federal del Derecho de Autor** (a commissioned work, *obra por encargo*) instead of the US Copyright Act. Have the lawyer confirm the right article.
7. **Cancellation:** deposit non-refundable once onboarding starts; work done is billable; Designer cancels → refund or credit.
8. **Ownership of accounts:** the domain, hosting, and third-party accounts are registered **in the client's name**. Credentials are shared through a password manager and handed over at launch.
9. **Warranty and support:** for example, a 30-day bug-fix period after launch; a maintenance plan is a separate agreement. *(Q11)*
10. **Mexico-specific items:**
    - Spanish version
    - MXN + IVA
    - CFDI invoices
    - electronic signature
    - jurisdiction in Monterrey, N.L. courts (or arbitration)
    - a personal-data clause (LFPDPPP)
11. **Fix the errors:** "Stock Subscription Agreement", the undefined "Company", the unused "Designer" definition, and the "as of date" placeholder. Fill `[Sender.Company]` with **AuraNova** everywhere.

**Rule for the website:** the public page summarizes the contract in plain Spanish and **must never promise something the signed contract doesn't say**. Until the contract is updated, terms that only exist in the proposal stay marked 🟡 in preview builds. *(Q20)*
