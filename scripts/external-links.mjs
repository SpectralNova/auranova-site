// Every link to another website opens in a new tab (David, 2026-10-24, ADR-023), with rel="noopener" and a hint
// for screen readers, so the new tab is never a surprise (WCAG technique G201). It runs over the built HTML, so it
// covers links from every source: YAML copy, components and markdown alike. Our own pages, mailto: and tel: links
// are left alone.

const HINT = { es: 'se abre en una pestaña nueva', en: 'opens in a new tab' };

/** Marks the external <a> elements of one HTML page. `ownHosts` are the hosts that count as this site. */
export function markExternalLinks(html, ownHosts) {
  const hint = /<html[^>]*\blang="en/.test(html) ? HINT.en : HINT.es;
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (whole, attrs, inner) => {
    const href = /\bhref="([^"]*)"/.exec(attrs)?.[1];
    if (!href || !/^https?:\/\//i.test(href)) return whole;
    let host;
    try {
      host = new URL(href).host;
    } catch {
      return whole;
    }
    if (ownHosts.includes(host)) return whole;

    let a = attrs;
    if (!/\btarget=/.test(a)) a += ' target="_blank"';
    const rel = /\brel="([^"]*)"/.exec(a);
    if (!rel) a += ' rel="noopener"';
    else if (!/\bnoopener\b/.test(rel[1])) a = a.replace(rel[0], `rel="${rel[1]} noopener"`);

    // An aria-label replaces the link's text for screen readers, so the hint goes there; otherwise, hidden text.
    const label = /\baria-label="([^"]*)"/.exec(a);
    if (label) {
      if (!label[1].includes(hint)) a = a.replace(label[0], `aria-label="${label[1]} (${hint})"`);
      return `<a${a}>${inner}</a>`;
    }
    if (inner.includes(hint)) return `<a${a}>${inner}</a>`;
    return `<a${a}>${inner}<span class="sr-only"> (${hint})</span></a>`;
  });
}
