import { ConfigurationError } from '@riders/types';

import { AbstractService } from './service';

export abstract class ConfigService extends AbstractService {
  static TYPE = 'configService';

  static APP_CONFIG_TYPE = 'app';

  protected constructor(type?: string) {
    super(type ?? ConfigService.TYPE);
  }

  abstract getValue<T>(
    propertyName: string,
    configType?: string,
  ): T | undefined;

  getRequiredValue<T>(propertyName: string, configType?: string): T {
    const value: T | undefined = this.getValue<T>(propertyName, configType);
    if (!value) {
      throw new ConfigurationError(
        `Configuration property '${propertyName}' is not set!`,
      );
    }
    return value;
  }

  abstract getConfig(configType?: string): any | undefined;

  getRequiredConfig(configType?: string): any {
    const config: any | undefined = this.getConfig(configType);
    if (!config) {
      throw new ConfigurationError(
        `Configuration Type [${configType}] not found!`,
      );
    }
    return config;
  }
}
