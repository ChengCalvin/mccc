import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type EntryKind = 'activity' | 'troupe' | 'news' | 'fair';

export interface RecentEntry {
  kind: EntryKind;
  id: string;
  title: string;
  date: Date;
  image?: string;
  tag?: string;
}

type CardCollection = CollectionEntry<'activities' | 'troupe' | 'news'>;

function localize(locale: Locale, zh: string, en?: string, fr?: string): string {
  if (locale === 'en') return en ?? zh;
  if (locale === 'fr') return fr ?? zh;
  return zh;
}

function toRecentEntry(kind: EntryKind, locale: Locale) {
  return (entry: CardCollection): RecentEntry => ({
    kind,
    id: entry.id,
    title: localize(locale, entry.data.title, entry.data.titleEn, entry.data.titleFr),
    date: entry.data.date,
    image: entry.data.image,
    tag: entry.data.tag && localize(locale, entry.data.tag, entry.data.tagEn, entry.data.tagFr),
  });
}

function toRecentEntryFromFairYear(locale: Locale) {
  return (entry: CollectionEntry<'fair-years'>): RecentEntry => ({
    kind: 'fair',
    id: entry.id,
    title: localize(locale, entry.data.title, entry.data.titleEn, entry.data.titleFr),
    date: entry.data.date,
    image: entry.data.thumbnail,
    tag: localize(locale, entry.data.edition, entry.data.editionEn, entry.data.editionFr),
  });
}

/** Merges activities/troupe/news/fair-years into one feed, tagged by kind, sorted newest-first. */
export async function getRecentEntries(locale: Locale): Promise<RecentEntry[]> {
  const [activities, troupe, news, fairYears] = await Promise.all([
    getCollection('activities'),
    getCollection('troupe'),
    getCollection('news'),
    getCollection('fair-years'),
  ]);

  const merged = [
    ...activities.map(toRecentEntry('activity', locale)),
    ...troupe.map(toRecentEntry('troupe', locale)),
    ...news.map(toRecentEntry('news', locale)),
    ...fairYears.map(toRecentEntryFromFairYear(locale)),
  ];

  return merged.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
