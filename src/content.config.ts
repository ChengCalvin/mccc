import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cardFields = {
  title: z.string(),
  titleEn: z.string().optional(),
  titleFr: z.string().optional(),
  date: z.coerce.date(),
  image: z.string().optional(),
  tag: z.string().optional(),
  tagEn: z.string().optional(),
  tagFr: z.string().optional(),
  /** Original mtlccc.net URL, kept as provenance only — not a card destination. */
  sourceUrl: z.string().url().optional(),
};

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object(cardFields),
});

const fairYears = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fair-years' }),
  schema: z.object({
    year: z.number(),
    edition: z.string(),
    editionEn: z.string().optional(),
    editionFr: z.string().optional(),
    title: z.string(),
    titleEn: z.string().optional(),
    titleFr: z.string().optional(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
    sourceUrl: z.string().url().optional(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/activities' }),
  schema: z.object(cardFields),
});

const troupe = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/troupe' }),
  schema: z.object(cardFields),
});

const heroSlides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hero-slides' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    titleFr: z.string().optional(),
    image: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  news,
  'fair-years': fairYears,
  activities,
  troupe,
  'hero-slides': heroSlides,
};
