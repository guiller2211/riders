export interface DataSource<T> {
  TYPE: string;
  getType(): string;
  get(): Promise<T>;
}

export abstract class AbstractDataSource<T> implements DataSource<T> {
  TYPE: string;

  constructor(type: string) {
    this.TYPE = type;
  }

  getType(): string {
    return this.TYPE;
  }

  abstract get(): Promise<T>;
}
