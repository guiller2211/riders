import type { Registry } from '../registries';

export interface AppStrategy<P, R> {
  TYPE: string;

  execute(appRegistry?: Registry, params?: P): Promise<R>;
}

export abstract class AbstractStrategy<P, R> implements AppStrategy<P, R> {
  TYPE: string;

  protected constructor(type: string) {
    this.TYPE = type;
  }

  abstract execute(appRegistry?: Registry, params?: P): Promise<R>;
}

export abstract class AbstractCompositeStrategy<
  P,
  R,
  C,
> extends AbstractStrategy<P, C> {
  private strategies: AppStrategy<P, R>[];

  constructor(type: string, strategies: AppStrategy<P, R>[]) {
    super(type);
    this.strategies = strategies;
  }

  async execute(appRegistry?: Registry, params?: P): Promise<C> {
    const ret = this.generateResult(appRegistry, params);
    this.strategies.forEach(async (strategy: AppStrategy<P, R>) => {
      this.reduce(ret, strategy, await strategy.execute(appRegistry, params));
    });

    return ret;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected generateResult(appRegistry?: Registry, params?: P): C {
    // Default implementation
    return {} as C;
  }

  abstract reduce(ret: C, strategy: AppStrategy<P, R>, result: R): C;
}
