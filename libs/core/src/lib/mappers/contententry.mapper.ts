import type { ContentEntry, Locale } from '@ducati/types';

import type { LocalizedDataMapper } from './mapper';

export abstract class ContentEntryMapper
  implements LocalizedDataMapper<ContentEntry, any>
{
  static ACTION = 'contentEntry2contentEntry';

  abstract normalize(entry: any, locale: Locale): ContentEntry;

  abstract serialize(entry: ContentEntry, locale: Locale): any;
}
