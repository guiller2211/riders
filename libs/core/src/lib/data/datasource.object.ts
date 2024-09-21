import { AbstractDataSource } from './datasource';

export class ObjectDataSource<T> extends AbstractDataSource<T> {
  private readonly data: T;

  constructor(data: T) {
    super('Object');
    this.data = data;
  }

  get(): Promise<T> {
    return Promise.resolve(this.data);
  }
}
