import type { CollectionEntry } from 'astro:content';

// Shared by /aprende/ and each piece's page (ADR-021).

const covers = import.meta.glob<ImageMetadata>('../assets/aprende/*', { eager: true, import: 'default' });

/** The piece's cover from src/assets/aprende/ (fails the build if the file is missing). */
export function aprendeCovers(file: string): ImageMetadata {
  const image = covers[`../assets/aprende/${file}`];
  if (!image) throw new Error(`Missing cover src/assets/aprende/${file}`);
  return image;
}

/** "Video · 1 min" (or "Artículo"), from the labels in pages/es/aprende.yaml. */
export function pieceMeta(p: CollectionEntry<'aprende'>['data'], labels: Record<string, string>): string {
  const kind = labels[p.kind] ?? p.kind;
  return p.duration ? `${kind} · ${Math.max(1, Math.round(p.duration / 60))} ${labels.minutes}` : kind;
}

/** The publication date in Spanish ("24 de octubre de 2026"); dates are calendar days, so format in UTC. */
export const pieceDate = (d: Date): string => new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'UTC' }).format(d);
