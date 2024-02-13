import type { Locale, Page } from '@ducati/types';

import type { LocalizedDataMapper } from './mapper';

export abstract class PageMapper implements LocalizedDataMapper<Page, any> {
  static ACTION = 'page2page';

  abstract normalize(page: any, locale: Locale): Page;

  abstract serialize(page: Page, locale: Locale): any;
}
