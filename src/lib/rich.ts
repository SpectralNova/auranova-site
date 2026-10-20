// Turns the small markup used in src/content into HTML (see src/content/README.md):
//   {{key}}                 a fact from business.ts (renders a marker while it is 🟡/🔴)
//   ==phrase==              the highlighted phrase of a heading (.hl), once per heading
//   **text**                strong
//   [label](/path/)         link (relative, #anchor, mailto: or https:)
//   [[PENDIENTE: …]] / [[CONFIRMAR: …]]   visible blank (.pending); production builds fail on these
import { factText, textFacts, type Lang, type TextFactKey } from '../content/business';

const escape = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const MARKER = /\[\[(PENDIENTE|CONFIRMAR):\s*([^\]]+?)\]\]/g;

/** Replaces {{key}} with the fact's text (markers included). Unknown keys fail the build. */
export function interpolate(src: string, lang: Lang): string {
  return src.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    if (!(key in textFacts)) throw new Error(`Unknown fact {{${key}}} in content`);
    return factText(textFacts[key as TextFactKey], lang);
  });
}

/** Content markup → HTML string, for `<Fragment set:html={rich(text, lang)} />`. */
export function rich(src: string | undefined, lang: Lang): string {
  if (!src) return '';
  let html = escape(interpolate(src, lang));
  html = html.replace(MARKER, (_, kind: string, body: string) => `<span class="pending">[[${kind}: ${body}]]</span>`);
  html = html.replace(/==(.+?)==/g, '<span class="hl">$1</span>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(((?:\/|#|mailto:|https:\/\/)[^)\s]*)\)/g, '<a href="$2">$1</a>');
  return html;
}

/** Content markup → plain text (titles, meta descriptions, JSON-LD). Markers stay as text. */
export function plain(src: string | undefined, lang: Lang): string {
  if (!src) return '';
  return interpolate(src, lang)
    .replace(/==(.+?)==/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
}
