import * as fsPromise from 'fs/promises';

import { AbstractDataSource } from '.';

export class LocalFileJsonDataSource<T> extends AbstractDataSource<T> {
  private file: string;

  constructor(file: string) {
    super('LocalJSON');
    this.file = file;
  }

  override get(): Promise<T> {
    try {
      return fsPromise.readFile(this.file, { encoding: 'utf-8' }) as Promise<T>;
    } catch (error) {
      throw new Error('Unable to retrieve local JSON file');
    }
  }
}
