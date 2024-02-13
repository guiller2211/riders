import type { Store } from '@ducati/types';

import { AbstractService } from './service';

export abstract class StoreService extends AbstractService {
  static TYPE = 'storeService';

  protected constructor(type?: string) {
    super(type ?? StoreService.TYPE);
  }

  abstract getStoreById(storeId: string): Store | undefined;

  abstract getRequiredStoreById(storeId: string): Store;
}
