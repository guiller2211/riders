import type {
  ContentEntry,
  ContentQuery,
  Locale,
  Page,
  PageEntry,
} from '@ducati/types';

import { AbstractService } from './service';

export abstract class CmsService extends AbstractService {
  static TYPE = 'cmsService';

  protected constructor(type?: string) {
    super(type ?? CmsService.TYPE);
  }

  abstract getPage(locale: Locale, slug: string): Promise<Page | null>;

  abstract getPageList(
    locale: Locale,
    query: ContentQuery,
  ): Promise<PageEntry[]>;

  abstract getEntry(locale: Locale, key: string): Promise<ContentEntry | null>;

  abstract getEntries(
    locale: Locale,
    query: ContentQuery,
  ): Promise<ContentEntry[]>;

  abstract getEntryOfType<T>(
    type: string,
    locale: Locale,
    id?: string,
  ): Promise<T | null>;

  abstract getEntriesOfType<T>(
    type: string,
    locale: Locale,
    query: ContentQuery,
  ): Promise<T[]>;
}
