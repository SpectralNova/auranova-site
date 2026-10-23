---
name: AuraNova
description: A dark night sky, a faint measurement grid and one bright star. Web design for small and mid-size businesses, where the shine is earned by method.
colors:
  nova-lime: "#D8FD34"
  nova-lime-hover: "#B4D32A"
  lime-ink: "#151A01"
  lime-deep: "#52620E"
  aura-violet: "#5934FD"
  violet-mist: "#9DA4FE"
  violet-haze: "#CBD0FE"
  violet-ink: "#3C05BB"
  violet-night: "#1E016B"
  starlight-paper: "#FBFBFF"
  night-sky: "#191B1C"
  night-surface: "color-mix(in oklab, #191B1C, white 4%)"
  night-surface-raised: "color-mix(in oklab, #191B1C, white 8%)"
  night-hairline: "color-mix(in oklab, #191B1C, white 12%)"
  graphite: "#383B3D"
  slate: "#595F61"
  steel: "#7B8285"
  comet-gray: "#9BA3A8"
  frost: "#EDEFF0"
  paper-white: "#FFFFFF"
  signal-red-dark: "#FF7A7A"
  signal-red-light: "#C4122F"
typography:
  display:
    fontFamily: "Roboto Condensed, Roboto, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3.2vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Roboto Condensed, Roboto, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.6rem + 1.8vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  stat:
    fontFamily: "Roboto Condensed, Roboto, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2rem + 5vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
  title:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.9vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
  subtitle:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.2
  lead:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
  eyebrow:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  mono:
    fontFamily: "ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
  space-9: "96px"
  space-10: "128px"
  section-y: "clamp(4rem, 3rem + 5vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.nova-lime}"
    textColor: "{colors.lime-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.nova-lime-hover}"
    textColor: "{colors.lime-ink}"
  button-primary-on-light:
    backgroundColor: "{colors.night-sky}"
    textColor: "{colors.nova-lime}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.frost}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.night-surface-raised}"
  button-ghost:
    textColor: "{colors.nova-lime}"
    typography: "{typography.label}"
    padding: "12px 8px"
  eyebrow-chip:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.frost}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  tag:
    textColor: "{colors.violet-mist}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "2px 12px"
  card:
    backgroundColor: "{colors.night-surface}"
    rounded: "{rounded.lg}"
    padding: "32px"
  input:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.frost}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: "48px"
  nav:
    rounded: "{rounded.lg}"
    padding: "8px 8px 8px 24px"
---

# Design System: AuraNova

> Derived from the brand master, `Resources/AuraNova/Design System/` (DESIGN_SYSTEM.md v1.4, tokens.css, components.css), which `npm run sync:ds` copies into `src/styles/`. **The master wins any disagreement.** Change it upstream, bump its changelog, sync, then refresh this file.

## Overview

**Creative North Star: "The Night Observatory"**

AuraNova looks at the web the way an observatory looks at the sky. The field is dark (night sky, `night-sky`), a faint engineering grid fades out behind each hero like the reticle of an instrument, and one bright body draws the eye: the lime of the primary call to action. The name says the rest. A *nova* is a star that suddenly becomes far brighter and is seen from far away; an *aura* is the presence something gives off before anyone reads a word. The shine is earned by method, not added as decoration, so everything around the one bright thing stays calm, measured and legible.

The system is built for small and mid-size business owners, in Spanish (es-MX). Density is moderate: generous section rhythm, body text at 16 px or more, one primary action per view. Light sections (`starlight-paper`) break up long pages and carry reading-heavy content such as legal pages and case studies; a deep violet band can close a page at most once. The visual reference was atomato.co (dark base, single neon accent, floating pill nav, eyebrow chip with a dot), but the site must read as AuraNova at a glance, never as a clone: different fonts, copy, illustrations and layouts.

**Key Characteristics:**
- Dark-first, with alternating dark and light sections to separate topics.
- One accent (`nova-lime`) and one glowing element per view.
- Condensed, heavy display type over a calm geometric body face.
- Pills for everything you press or that labels (buttons, eyebrows, tags); generous rounded cards with hairline borders.
- Measured, never claimed: real numbers with sources, no invented stats, testimonials or logos.
- Calm motion (opacity and transform only), always pausable, zero under reduced motion.

## Colors

One neon star against a near-black night, with violet as the atmosphere around it and cool grays for everything that should not compete.

### Primary
- **Nova Lime** (`nova-lime`): the brand primary and the single accent on dark. Primary CTA fill, highlighted words in headings, stat numbers, the eyebrow dot and the focus ring on dark. On light sections it is never text: only a marker behind dark text (the `.hl` highlight) or a fill.
- **Nova Lime, pressed** (`nova-lime-hover`): primary CTA hover.
- **Lime Ink** (`lime-ink`): text on lime fills (15.3:1).
- **Deep Lime** (`lime-deep`): lime-family text on light sections, when lime meaning must be kept (6.5:1).

### Secondary
- **Aura Violet** (`aura-violet`): the brand secondary. Fills, badges, step numbers and the eyebrow dot on light sections; links and focus on light (6.1:1). Never text on dark (2.7:1).
- **Violet Mist** (`violet-mist`): links and tag text on dark (7.6:1).
- **Violet Haze** (`violet-haze`): link hover on dark; muted text in the violet band.
- **Violet Ink** (`violet-ink`): link hover and tag text on light (≈ 8:1).
- **Violet Night** (`violet-night`): the background of the closing violet band (at most once per page).

### Neutral
- **Night Sky** (`night-sky`): the default page background; also the ink of the primary button on light sections.
- **Night Surface** / **Raised** / **Hairline** (`night-surface`, `night-surface-raised`, `night-hairline`): cards, hover states and decorative borders on dark, mixed from Night Sky and white (4 / 8 / 12%) so no new hue enters.
- **Graphite** (`graphite`): dark panels inside light sections and primary-button hover on light.
- **Slate** (`slate`): muted text on light (6.3:1).
- **Steel** (`steel`): input borders and other UI boundaries only (4.4:1 on dark); never small text.
- **Comet Gray** (`comet-gray`): muted text on dark (6.8:1).
- **Frost** (`frost`): body text on dark (15.0:1); borders on light.
- **Starlight Paper** (`starlight-paper`): the light-section background.
- **Paper White** (`paper-white`): card surfaces on light sections.
- **Signal Red** (`signal-red-dark`, `signal-red-light`): form errors only, outside the brand palette by design.

### Named Rules
**The One Star Rule.** Nova Lime is the only accent on dark, and one element per view glows. If two things compete for the eye, one of them loses its color.

**The Daylight Rule.** On light sections lime is never text and violet is never washed out: lime becomes a highlighter mark, violet becomes the link color.

**The Logo-Only Gradient Rule.** The lime → violet gradient (`--brand-gradient`) belongs to the logo, the hero orb and at most one decorative divider per page. Never on text or buttons.

**The Token Rule.** Every color in code is a token. A raw hex outside `tokens.css` fails review.

## Typography

**Display Font:** Roboto Condensed 800 (with Roboto, Arial Narrow)
**Heading Font:** Roboto 700 (with system-ui)
**Body Font:** Montserrat 400 / 600, plus 400 italic (with system-ui)
**Mono:** the system monospace, only for code or terminal text inside product mockups and the preview-only «PENDIENTE» marker (never downloaded, not a brand family)

**Character:** a tall, compressed, heavy display face that reads like instrument labeling, over a wide, friendly geometric body face. Engineering at the top, approachability in the reading.

### Hierarchy
- **Display** (800, 40 → 72 px fluid, 1.04): H1 only, one per page.
- **Headline** (800, 32 → 48 px, 1.04): H2, one per section, under its eyebrow.
- **Stat** (800, 48 → 96 px, 1, tabular lining numerals): measured numbers in stat cards, each with a source.
- **Title** (Roboto 700, 24 → 32 px, 1.2): H3, group titles, card titles.
- **Subtitle** (Roboto 700, 20 → 24 px, 1.2): H4.
- **Lead** (400, 18 → 20 px, 1.6): the intro paragraph under a section heading, in muted color.
- **Body** (400, 16 → 18 px, 1.6): running text, never below 16 px, never wider than the measure (`--measure`, 54ch). In Montserrat that is 60–75 characters per line, as /estandar/ promises (measured: median 67, 90% of lines at 73 or fewer). Paragraphs and list items use `text-wrap: pretty`, so no single word sits alone on a last line.
- **Label** (600, 14 px, 0.08em, uppercase): buttons.
- **Eyebrow** (600, 12 px, 0.08em, uppercase): eyebrow chips, tags and small field labels; also legal fine print.

### Named Rules
**The Three Families Rule.** Roboto Condensed, Roboto and Montserrat. A fourth family never ships.

**The Sentence Case Rule.** Headlines are sentence case. Uppercase is allowed only on buttons, eyebrows and tags.

**The One Highlight Rule.** At most one highlighted phrase per headline, and it carries the promise ("que ==trabajan para tu negocio==").

## Layout

A 1200 px container (`--container-max`) with a fluid side gutter of 16 → 32 px, a 12-column grid with a 16 → 24 px gap, and mobile-first breakpoints at 480, 768, 1024 and 1280 px. Spacing comes only from the 4 px scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Sections breathe with 64 → 128 px of vertical padding (`--section-y`) and alternate dark and light to separate topics. Heroes and final calls to action are centered or split 7/5; card grids use 2, 3 or 4 equal columns, never masonry. The floating nav collapses into a full-height menu sheet below 1024 px. Every page is tested at 320, 375, 768, 1024 and 1440 px with no horizontal scroll.

**The No Twins Rule.** Never two identical sections back to back.

**The Even Rows Rule.** Lists that don't fill a grid evenly become ledger rows, not cards with orphans.

## Elevation & Depth

Depth comes mostly from tone and hairlines, not shadows: cards sit one step lighter than the night (`night-surface`) with a 1 px hairline border that strengthens on hover. Shadows appear where something floats or is a physical object: the floating nav (translucent background plus a 14 px backdrop blur), product mockups and the primary button on light sections.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 18px 40px -12px rgb(0 0 0 / 0.75)`; on light `0 18px 40px -16px rgb(25 27 28 / 0.25)`): mockup windows, report cards, the ink button on light.
- **Lime aura** (`box-shadow: 0 0 28px -4px rgb(216 253 52 / 0.35)`, with an inset `0 1.5px 0 rgb(255 255 255 / 0.45)` highlight on buttons): the primary CTA, the eyebrow dot and the active step of the roadmap.
- **Violet aura** (`box-shadow: 0 0 40px -6px rgb(89 52 253 / 0.45)`): product mockup frames only (service demo windows, the quality report card, the checklist cover).

### Named Rules
**The Focused Aura Rule.** An aura is focused, not everywhere: the lime glow marks the one action, the violet glow marks a product object. Never glow the logo, text, or ordinary cards. (The brand master names only the CTA and the eyebrow dot; the violet mockup glow is the established exception from the service demos.)

## Shapes

Soft, generous rounding with a clear hierarchy by size: 8 px for inputs and small chips, 16 px for small cards and images, 24 px for cards and the floating nav, 32 px for feature panels, and full pills for buttons, eyebrows, tags and round icon buttons. Every card has a 1 px border. Circles mark sequence and identity: step numbers, group badges and social icons are 40–44 px round. The decorative vocabulary is the logo's own: the orb and the grid, never unrelated illustration styles.

## Components

### Buttons
Confident and tactile, the brightest thing on the page.
- **Shape:** full pill (999px), at least 48 px tall.
- **Primary:** Nova Lime fill with Lime Ink label, uppercase Montserrat 600 at 14 px with 0.08em tracking, 12 × 32 px padding, lime aura plus an inset top highlight. One per view; labels start with a verb, 1–4 words.
- **Primary on light:** inverts to a Night Sky ink button with a lime label and the float shadow.
- **Hover / Focus:** hover steps the fill to the pressed lime; press nudges 1 px down; focus shows a 2 px ring 3 px out (lime on dark, violet on light).
- **Secondary:** Night Surface fill, Frost label, hairline border; hover raises to the next surface. Used for downloads and alternatives next to a primary.
- **Ghost:** no fill, lime label on dark and violet on light, usually with a trailing arrow for "see more" links.

### Chips
- **Eyebrow:** a pill with a hairline border on Night Surface, uppercase 12 px label and a 6 px dot (lime with its aura on dark, flat violet on light). One per section, above the H2, 2–5 words.
- **Tag:** violet text on a 20% violet tint, uppercase 12 px, for categories on case studies and articles.

### Cards / Containers
- **Corner Style:** 24 px.
- **Background:** Night Surface on dark, Paper White on light.
- **Shadow Strategy:** none at rest (see Elevation); interactive cards lift 2 px and strengthen the border on hover.
- **Border:** 1 px hairline.
- **Internal Padding:** 32 px.

### Inputs / Fields
- **Style:** Night Surface field, Steel 1 px border (a real UI boundary at 4.4:1), 8 px radius, 48 px tall, a visible label above (never a placeholder used as the label).
- **Focus:** the global focus ring.
- **Error:** Signal Red border and message, announced through `aria-invalid` and `aria-describedby`.

### Navigation
A floating pill bar, 12 px from the top: the logo mark with the name set in Roboto Condensed on the left, links in Montserrat 600 at 14 px (current page and hover in lime), social icons from 1200 px, and one primary CTA on the right. Its background is the page color at 85% with a 14 px backdrop blur. Below 1024 px the links collapse into a round 44 px toggle that opens a full-height sheet with large display-type links, the CTA, hours and social icons; Esc closes it and focus is trapped.

### Signature: product demo windows
Coded, pausable product mockups on each service page (a document, a dashboard, a store): a dark window (`.theme-dark` inside light sections), 32 px radius, float shadow and violet aura. Their numbers are sample data and are always labelled as an example. With reduced motion they show their final state and no pause control.

### Signature: ledger rows
For values and standards: a numbered or iconed head on the left and the explanation on the right, separated by hairlines instead of boxed in cards.

## Do's and Don'ts

### Do:
- **Do** keep Nova Lime as the single accent on dark, with one primary CTA per view.
- **Do** alternate dark and light sections, and use light sections for reading-heavy pages.
- **Do** use tokens for every value: color, size, space, radius, shadow and duration.
- **Do** keep body text at 16 px or more, line-height 1.6, within the measure.
- **Do** keep touch targets at 44 × 44 px for primary controls (24 × 24 minimum anywhere).
- **Do** use one icon set, Lucide, inline and inheriting `currentColor`; brand logos only as monochrome Simple Icons.
- **Do** self-host the woff2 subsets and preload only Montserrat 400 and Roboto Condensed 800.
- **Do** animate only opacity and transform, and give every moving demo a pause control.

### Don't:
- **Don't** set lime text on light backgrounds, or violet-5 text on dark.
- **Don't** put two lime buttons side by side.
- **Don't** use gradient text or gradient buttons.
- **Don't** add a fourth font family or load the Google Fonts CDN.
- **Don't** invent stats, testimonials or client logos; show client logos only with written permission.
- **Don't** add entry pop-ups, autoplay with sound, scroll-jacking, parallax on text, or carousels without a pause button.
- **Don't** recolor, re-angle, glow or stretch the logo mark, or place it on lime or violet-5 fills.
