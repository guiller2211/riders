import type { Language } from '@riders/types';

export class LocalizationUtils {
  static getLocalizedValue(
    language: Language,
    localizedValues?: { [isocode: string]: any },
  ): string {
    return localizedValues
      ? localizedValues[language.isocode] ?? undefined
      : undefined;
  }
}
