import type { RequestDecorator } from '../server';
import { TheUndecoratorDecorator } from '../server';
import type { AppService } from '../services';
import type { AppStrategy } from '../strategies';
import { Registry } from './registry';

export class RegistryBuilder {
  private services: Map<string, AppService> = new Map<string, AppService>();

  private strategies: Map<string, AppStrategy<unknown, unknown>> = new Map<
    string,
    AppStrategy<unknown, unknown>
  >();

  private readonly requestDecorator: RequestDecorator;

  constructor(requestDecorator?: RequestDecorator, registry?: Registry) {
    this.requestDecorator =
      requestDecorator ??
      registry?.getRequestDecorator() ??
      new TheUndecoratorDecorator();
    if (registry) {
      registry
        .getServices()
        .forEach((service) => this.services.set(service.TYPE, service));
      registry
        .getStrategies()
        .forEach((strategy) => this.strategies.set(strategy.TYPE, strategy));
    }
  }

  registerService(service: AppService): RegistryBuilder {
    if (service) this.services.set(service.TYPE, service);
    return this;
  }

  registerStrategy(strategy: AppStrategy<unknown, unknown>): RegistryBuilder {
    if (strategy) this.strategies.set(strategy.TYPE, strategy);
    return this;
  }

  build(): Registry {
    return new Registry(this.requestDecorator, {
      services: this.services,
      strategies: this.strategies,
    });
  }
}
