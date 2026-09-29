import { getCollection } from 'astro:content';
import type { Locale } from './i18n';

export type DetailCollection = 'activities' | 'troupe' | 'news' | 'fair-years';

export interface DetailEntry {
  id: string;
  collection: DetailCollection;
  title: string;
  date: Date;
  image?: string;
  tag?: string;
  body?: string;
}

function localize(locale: Locale, zh: string, en?: string, fr?: string): string {
  if (locale === 'en') return en ?? zh;
  if (locale === 'fr') return fr ?? zh;
  return zh;
}

export async function getDetailEntries(collection: DetailCollection, locale: Locale): Promise<DetailEntry[]> {
  const entries = await getCollection(collection);

  const normalized = entries.map((entry): DetailEntry => {
    if (collection === 'fair-years') {
      const data = entry.data as Extract<typeof entry.data, { edition: string }>;
      return {
        id: entry.id,
        collection,
        title: localize(locale, data.title, data.titleEn, data.titleFr),
        date: data.date,
        image: data.thumbnail,
        tag: localize(locale, data.edition, data.editionEn, data.editionFr),
        body: entry.body,
      };
    }
    const data = entry.data as Extract<typeof entry.data, { title: string; image?: string }>;
    return {
      id: entry.id,
      collection,
      title: localize(locale, data.title, data.titleEn, data.titleFr),
      date: data.date,
      image: data.image,
      tag: data.tag ? localize(locale, data.tag, data.tagEn, data.tagFr) : undefined,
      body: entry.body,
    };
  });

  return normalized.sort((a, b) => a.date.valueOf() - b.date.valueOf());
}

export interface DetailStaticPath {
  params: { collection: DetailCollection; id: string };
  props: { entry: DetailEntry; prev: DetailEntry | null; next: DetailEntry | null };
}

const ALL_COLLECTIONS: DetailCollection[] = ['activities', 'troupe', 'news', 'fair-years'];

/** Enumerates every entry across all four collections for one locale's detail routes. */
export async function getDetailStaticPaths(locale: Locale): Promise<DetailStaticPath[]> {
  const paths: DetailStaticPath[] = [];
  for (const collection of ALL_COLLECTIONS) {
    const entries = await getDetailEntries(collection, locale);
    entries.forEach((entry, index) => {
      paths.push({
        params: { collection, id: entry.id },
        props: {
          entry,
          prev: index > 0 ? entries[index - 1] : null,
          next: index < entries.length - 1 ? entries[index + 1] : null,
        },
      });
    });
  }
  return paths;
}
