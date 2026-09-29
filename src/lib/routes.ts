import type { Locale } from './i18n';
import type { EntryKind } from './recentEntries';

export const kindToCollection: Record<EntryKind, 'activities' | 'troupe' | 'news' | 'fair-years'> = {
  activity: 'activities',
  troupe: 'troupe',
  news: 'news',
  fair: 'fair-years',
};

export const collectionToKind: Record<'activities' | 'troupe' | 'news' | 'fair-years', EntryKind> = {
  activities: 'activity',
  troupe: 'troupe',
  news: 'news',
  'fair-years': 'fair',
};

const localePrefix = (locale: Locale) => (locale === 'zh' ? '' : `/${locale}`);

export function detailHref(locale: Locale, kind: EntryKind, id: string): string {
  return `${localePrefix(locale)}/${kindToCollection[kind]}/${id}`;
}

export function postsPath(locale: Locale): string {
  return `${localePrefix(locale)}/posts`;
}

export function aboutPath(locale: Locale): string {
  return `${localePrefix(locale)}/about`;
}
