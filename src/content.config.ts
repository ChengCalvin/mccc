import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cardFields = {
  title: z.string(),
  date: z.coerce.date(),
  image: z.string().optional(),
  tag: z.string().optional(),
  link: z.string().url().optional(),
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
    title: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
    link: z.string().url().optional(),
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

export const collections = {
  news,
  'fair-years': fairYears,
  activities,
  troupe,
};
