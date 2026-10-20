import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Copy that David can edit lives in YAML, one file per page per language (src/content/README.md).
// Entry ids are "<lang>/<name>", e.g. "es/inicio".

const link = z.object({ label: z.string(), route: z.string() });

const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
  // Each page has its own sections; the page component reads them. Shared fields are checked here.
  schema: z.looseObject({ title: z.string(), description: z.string() }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/services' }),
  schema: z.looseObject({
    order: z.number(),
    route: z.string(),
    name: z.string(),
    kicker: z.string(),
    summary: z.string(),
    // The full service page; services without it get only a card (CP1 builds one service page).
    page: z.looseObject({ title: z.string(), description: z.string() }).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    client: z.string(),
    sector: z.string(),
    city: z.string(),
    url: z.url(),
    summary: z.string(),
    tags: z.array(z.string()),
    stack: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    scores: z.string().optional(),
    link: link.optional(),
  }),
});

export const collections = { pages, services, projects };
