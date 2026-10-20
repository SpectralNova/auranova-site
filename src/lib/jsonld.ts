import { plain } from './rich';
import type { Lang } from '../content/business';

export const faqJsonLd = (items: { q: string; a: string }[], lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({
    '@type': 'Question',
    name: plain(i.q, lang),
    acceptedAnswer: { '@type': 'Answer', text: plain(i.a, lang) },
  })),
});

export const breadcrumbJsonLd = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
});
