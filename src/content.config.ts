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
    /** Lucide icon for the nav menu. */
    navIcon: z.string(),
    /** Art slug: the 2D illustration (src/assets/generated/services/<art>.webp) and the hero background
     *  (src/assets/generated/bg/<art>.webp). */
    art: z.string(),
    /** Simple Icons slugs shown in the page's tools grid (labels live in pages/es/servicios.yaml). */
    tools: z.array(z.string()).optional(),
    /** Show the published projects on this service page. */
    proof: z.boolean().optional(),
    page: z.looseObject({ title: z.string(), description: z.string() }),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    /** false hides the project everywhere until the client's OK in writing arrives (Q12, ADR-021). */
    visible: z.boolean().default(true),
    client: z.string(),
    sector: z.string(),
    city: z.string(),
    url: z.url(),
    summary: z.string(),
    /** Technical description ("Lo que hicimos"), shown on /proyectos/ only: a summary line, what we did,
     *  and a few key figures from the project (each one sourced, docs/CLAIMS.md). */
    details: z
      .object({
        intro: z.string(),
        items: z.array(z.string()),
        facts: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
      })
      .optional(),
    tags: z.array(z.string()),
    stack: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    scores: z.string().optional(),
    link: link.optional(),
  }),
});

// «Aprende» (Q22, ADR-021): videos and articles, one YAML per piece; the file name is the URL slug.
const aprende = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/aprende' }),
  schema: z.object({
    /** Publication date; the list shows the newest first. */
    date: z.coerce.date(),
    kind: z.enum(['video', 'articulo']),
    title: z.string(),
    /** Meta description and the page's lead. */
    description: z.string(),
    /** The card's text on /aprende/. */
    summary: z.string(),
    /** The series cover in src/assets/aprende/ (1080×1920): the video's poster; cards show its 3:4 centre,
     *  the same crop as the Instagram grid. */
    cover: z.string(),
    /** Self-hosted video under public/ (H.264, faststart) and its length in seconds. */
    video: z.string().optional(),
    duration: z.number().optional(),
    takeaways: z.array(z.string()),
    test: z.object({ title: z.string(), items: z.array(z.string()) }).optional(),
    /** What is said, paragraph by paragraph (the spoken words, not the script). */
    transcript: z.array(z.string()).optional(),
    sources: z.array(z.object({ label: z.string(), url: z.url() })),
    /** Required credits, e.g. a CC BY music licence. */
    credits: z.array(z.string()).optional(),
  }),
});

export const collections = { pages, services, projects, aprende };
