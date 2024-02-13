import type { CacheConfig, CacheTTLConfig } from '@ducati/types';

export class CacheUtils {
  static getCacheKey(obj: string | object): string {
    if (typeof obj === 'string') return obj;
    return JSON.stringify(obj);
  }

  static getCacheTTL(
    cacheConfig: CacheConfig | undefined,
    key?: string,
    fallbackTTL?: number,
  ): number {
    const cacheContainerTTL: CacheTTLConfig | undefined = cacheConfig?.ttl;

    if (cacheContainerTTL) {
      return key
        ? cacheContainerTTL[key]
          ? cacheContainerTTL[key]
          : cacheContainerTTL.defaultTTL
        : cacheContainerTTL.defaultTTL;
    }
    return fallbackTTL ?? 0;
  }

  static getCacheHeader(
    cacheConfig: CacheConfig | undefined,
    key?: string,
  ): string {
    const ttl = CacheUtils.getCacheTTL(cacheConfig, key);
    if (ttl) {
      return `${cacheConfig?.public ? 'public' : 'private'}, max-age=${ttl}`;
    }
    return 'no-cache';
  }
}
