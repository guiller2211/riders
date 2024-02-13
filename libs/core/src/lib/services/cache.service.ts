import type { CacheConfig } from '@ducati/types';

import { AbstractService } from './service';

export abstract class CacheService extends AbstractService {
  static TYPE = 'cacheService';

  private configs = new Map<string, CacheConfig>();

  protected constructor(cacheConfig?: CacheConfig[], type?: string) {
    super(type ?? CacheService.TYPE);
    cacheConfig?.forEach((config) => {
      this.configs.set(config.container, config);
    });
  }

  abstract executeWithCache<T>(
    fn: () => T,
    container: string,
    key: string | object,
  ): Promise<T>;

  abstract get<T>(
    container: string,
    key: string | object,
  ): Promise<T | undefined>;

  abstract set<T>(
    container: string,
    key: string | object,
    value: T,
  ): Promise<void>;

  abstract clear(container: string): Promise<void>;

  getCacheConfig(container: string): CacheConfig | undefined {
    return this.configs.get(container);
  }
}
