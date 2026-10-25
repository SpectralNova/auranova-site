import { getCollection } from 'astro:content';
import type { Lang } from '../content/business';

/**
 * Projects cleared for the site (Q12), in display order. A project with `visible: false` is hidden
 * everywhere at once: /proyectos/, the services' proof sections, the nav, the footer and the sitemap
 * (ADR-021). With none visible, /proyectos/ shows its holding text and is noindex.
 */
export async function visibleProjects(lang: Lang) {
  return (await getCollection('projects', (p) => p.id.startsWith(`${lang}/`) && p.data.visible)).sort((a, b) => a.data.order - b.data.order);
}
