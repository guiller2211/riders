import type { Store } from '@ducati/types';
import { ConfigurationError } from '@ducati/types';
import * as fs from 'fs';
import * as path from 'path';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import { StoreService } from '..';
import type { DataMapper } from '../../mappers';

export class FileSystemStoreService extends StoreService {
  protected storeMapper: DataMapper<Store, { [index: string]: object }>;

  private logger: Logger<ILogObj> = new Logger({
    name: 'FileSystemStoreService',
  });

  private stores: Store[];

  constructor(
    storeDataDir: string,
    storeMapper: DataMapper<Store, { [index: string]: object }>,
  ) {
    super();
    this.storeMapper = storeMapper;
    this.stores = this.loadStores(storeDataDir);
  }

  private loadStores(storeDataDir: string): Store[] {
    const stores: Store[] = [];
    try {
      fs.readdirSync(storeDataDir, { withFileTypes: true })
        .filter((file: fs.Dirent) => {
          return file.isFile() && path.extname(file.name) === '.json';
        })
        .forEach((file: fs.Dirent) => {
          const storeJson: any = JSON.parse(
            fs.readFileSync(path.resolve(storeDataDir, file.name), 'utf8'),
          );
          const store: Store = this.storeMapper.normalize(storeJson);
          stores.push(store);
        });

      return stores;
    } catch (e: unknown) {
      this.logger.error(
        `Could not load store data files from directory '${storeDataDir}' as the directory does not exist.`,
        e,
      );
      throw e;
    }
  }

  getStoreById(storeId: string): Store | undefined {
    const filteredStores: Store[] = this.stores.filter(
      (store: Store) => store.id === storeId,
    );
    if (filteredStores.length === 1) {
      return filteredStores[0];
    }
    return undefined;
  }

  getRequiredStoreById(storeId: string): Store {
    const store: Store | undefined = this.getStoreById(storeId);
    if (store) {
      return store;
    }
    throw new ConfigurationError(`Store with id ${storeId} not found`);
  }
}
