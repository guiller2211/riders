import type { Locale, PageEntry } from '@ducati/types';

import type { LocalizedDataMapper } from './mapper';

export abstract class PageEntryMapper
  implements LocalizedDataMapper<PageEntry, any>
{
  static ACTION = 'pageEntry2pageEntry';

  abstract normalize(entry: any, locale: Locale): PageEntry;

  abstract serialize(entry: PageEntry, locale: Locale): any;
}
