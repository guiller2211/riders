import type { RequestDecorator } from '../server';
import { TheUndecoratorDecorator } from '../server';
import type { AppService } from '../services';
import type { AppStrategy } from '../strategies';

export interface Registration {
  services?: Map<string, AppService>;
  strategies?: Map<string, AppStrategy<unknown, unknown>>;
}

export class Registry {
  private readonly services: Map<string, AppService>;

  private readonly strategies: Map<string, AppStrategy<unknown, unknown>>;

  private readonly requestDecorator: RequestDecorator;

  constructor(
    requestDecorator?: RequestDecorator,
    registration?: Registration,
  ) {
    this.services = registration?.services ?? new Map<string, AppService>();
    this.strategies =
      registration?.strategies ??
      new Map<string, AppStrategy<unknown, unknown>>();
    this.requestDecorator = requestDecorator ?? new TheUndecoratorDecorator();
  }

  getService<S extends AppService>(serviceType: string): S {
    const service: AppService | undefined = this.services.get(serviceType);
    if (!service) {
      throw new Error(`No service is registered for type: ${serviceType}`);
    }
    return service as S;
  }

  getStrategy<P, R, S extends AppStrategy<P, R>>(strategyType: string): S {
    const strategy: AppStrategy<P, R> | undefined = this.strategies.get(
      strategyType,
    ) as AppStrategy<P, R>;
    if (!strategy) {
      throw new Error(`No strategy is registered for type: ${strategyType}`);
    }
    return strategy as S;
  }

  getRequestDecorator(): RequestDecorator {
    return this.requestDecorator;
  }

  getServices(): Map<string, AppService> {
    return this.services;
  }

  getStrategies(): Map<string, AppStrategy<unknown, unknown>> {
    return this.strategies;
  }
}
