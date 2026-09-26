import { describe, expect, it } from 'vitest';
import { locales, translations } from './i18n';

describe('i18n translation completeness', () => {
  it('has the same set of keys in every locale', () => {
    const [first, ...rest] = locales;
    const referenceKeys = Object.keys(translations[first]).sort();

    for (const locale of rest) {
      const keys = Object.keys(translations[locale]).sort();
      expect(keys, `locale "${locale}" key set does not match "${first}"`).toEqual(referenceKeys);
    }
  });
});
