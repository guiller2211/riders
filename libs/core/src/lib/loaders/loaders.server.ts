import type { Locale, Meta } from '@ducati/types';

import type { Registry } from '..';
import { MetaUtils } from '../utils/meta.utils';
import {
  CacheService,
  ConfigService,
  I18nService,
  SessionService,
} from '../services';
import { CacheUtils } from '../utils';

export declare type LoaderParams<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

export declare type LoaderResult<DATA> = {
  data: DATA;
  meta: Meta;
  locale: Locale;
  labels: Map<string, any>;
  response: ResponseInit;
};

export interface Loader<DATA> {
  load(request: Request, appRegistry: Registry): Promise<LoaderResult<DATA>>;
}

export abstract class AbstractLoader<DATA> {
  protected async generateResult(
    data: DATA,
    request: Request,
    appRegistry: Registry,
    cacheNS: string | null,
    metaCallback?: (meta: Meta) => void,
  ): Promise<LoaderResult<DATA>> {
    const cacheService: CacheService = appRegistry.getService<CacheService>(
      CacheService.TYPE,
    );
    const i18nService: I18nService = appRegistry.getService<I18nService>(
      I18nService.TYPE,
    );
    const sessionService: SessionService =
      appRegistry.getService<SessionService>(SessionService.TYPE);
    const session = await sessionService.getSession(request);

    const meta: Meta = await MetaUtils.pageMeta(
      appRegistry.getService<ConfigService>(ConfigService.TYPE),
      request,
    );
    metaCallback ? metaCallback(meta) : meta;
    const cacheHeader = cacheNS
      ? CacheUtils.getCacheHeader(cacheService.getCacheConfig(cacheNS))
      : 'no-cache';

    return {
      data,
      meta,
      locale: session.locale,
      labels: i18nService.getTranslations(
        ['product', 'layout'],
        session.locale,
      ),
      response: {
        headers: { 'Cache-Control': cacheHeader },
      },
    };
  }
}
