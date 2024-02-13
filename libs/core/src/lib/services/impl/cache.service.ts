import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import type { CacheConfig } from '@ducati/types';

import { CacheService } from '../cache.service';
import { CacheUtils } from '../../utils';

export class InMemoryCacheService extends CacheService {
  protected cacheContainers: Map<string, CacheContainer>;

  constructor(configs: CacheConfig[]) {
    super(configs);
    this.cacheContainers = new Map<string, CacheContainer>();
  }

  async executeWithCache<T>(
    fn: () => T,
    container: string,
    key: object,
  ): Promise<T> {
    const strKey = CacheUtils.getCacheKey(key);
    return this.get<T>(container, strKey).then((cachedResult) => {
      if (cachedResult) {
        return cachedResult;
      }
      const result: T = fn();
      this.set(container, strKey, result);
      return result;
    });
  }

  async get<T>(
    container: string,
    key: string | object,
  ): Promise<T | undefined> {
    const cacheContainer: CacheContainer | undefined =
      this.cacheContainers.get(container);
    if (cacheContainer !== undefined) {
      return cacheContainer.getItem<T>(CacheUtils.getCacheKey(key));
    }
    return undefined;
  }

  async set<T>(
    container: string,
    key: string | object,
    value: T,
  ): Promise<void> {
    const strKey = CacheUtils.getCacheKey(key);
    const ttl: number = CacheUtils.getCacheTTL(
      this.getCacheConfig(container),
      strKey,
      0,
    );

    // 0 TTL indicates no caching
    if (ttl) {
      const cacheContainer: CacheContainer =
        this.cacheContainers.get(container) ??
        (this.cacheContainers
          .set(container, new CacheContainer(new MemoryStorage()))
          .get(container) as CacheContainer);
      await cacheContainer?.setItem(strKey, value, { ttl });
    }
  }

  async clear(container: string): Promise<void> {
    const cacheContainer: CacheContainer | undefined =
      this.cacheContainers.get(container);
    if (cacheContainer !== undefined) {
      await cacheContainer.clear();
    }
  }
}
