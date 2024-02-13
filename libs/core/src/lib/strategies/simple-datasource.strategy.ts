import type { DataSource } from '../data/datasource';
import { AbstractStrategy } from './strategy';

export class SimpleDataSourceStrategy<R> extends AbstractStrategy<void, R> {
  private datasource: DataSource<R>;

  constructor(type: string, datasource: DataSource<R>) {
    super(type);
    this.datasource = datasource;
  }

  async execute(): Promise<R> {
    return this.datasource.get();
  }
}
